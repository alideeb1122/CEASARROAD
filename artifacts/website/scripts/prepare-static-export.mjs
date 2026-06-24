import { writeFile, access, readdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", "out");
const siteUrl = "https://www.caesar-road.com";

try {
  await access(outDir);
} catch {
  console.error(`Static export directory not found: ${outDir}`);
  process.exit(1);
}

async function collectHtmlRoutes(currentDir, currentRoute = "") {
  const entries = await readdir(currentDir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    if (entry.name === "_next" || entry.name === "images" || entry.name === "videos" || entry.name === "branding") {
      continue;
    }

    const entryPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      const nestedRoute = `${currentRoute}/${entry.name}`;
      const indexHtmlPath = path.join(entryPath, "index.html");

      try {
        await access(indexHtmlPath);
        routes.push(nestedRoute);
      } catch {
        // Ignore directories without an index route.
      }

      routes.push(...(await collectHtmlRoutes(entryPath, nestedRoute)));
      continue;
    }

    if (entry.isFile() && entry.name === "index.html" && currentRoute === "") {
      routes.push("/");
    }
  }

  return routes;
}

const discoveredRoutes = Array.from(new Set(await collectHtmlRoutes(outDir)))
  .filter((route) => route !== "/404" && route !== "/not-found")
  .sort((a, b) => a.localeCompare(b));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${discoveredRoutes
  .map((route) => {
    const normalizedRoute = route === "/" ? "/" : `${route.replace(/\/+/g, "/").replace(/\/$/, "")}/`;
    return `  <url>
    <loc>${siteUrl}${normalizedRoute}</loc>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const htaccess = `DirectoryIndex index.html
Options -Indexes

<IfModule mod_rewrite.c>
  RewriteEngine On

  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^([^/]+)/?$ $1/index.html [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.+)/([^/]+)/?$ $1/$2/index.html [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.+)/(.+)/([^/]+)/?$ $1/$2/$3/index.html [L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Content-Security-Policy "upgrade-insecure-requests"
</IfModule>
`;

await writeFile(path.join(outDir, ".nojekyll"), "", "utf8");
await writeFile(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(outDir, "robots.txt"), robots, "utf8");
await writeFile(path.join(outDir, ".htaccess"), htaccess, "utf8");
