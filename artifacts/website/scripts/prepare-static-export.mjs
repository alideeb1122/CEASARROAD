import { writeFile, access } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", "out");

try {
  await access(outDir);
} catch {
  console.error(`Static export directory not found: ${outDir}`);
  process.exit(1);
}

await writeFile(path.join(outDir, ".nojekyll"), "");
