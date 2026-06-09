const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : "";

export function withBasePath(path?: string | null): string {
  if (!path) return "";
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBasePath}${normalizedPath}`;
}
