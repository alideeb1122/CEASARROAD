import type { NextConfig } from "next";

const rawBasePath = process.env.BASE_PATH?.trim() ?? "";
const basePath =
  rawBasePath && rawBasePath !== "/"
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
    : undefined;

const nextConfig: NextConfig = {
  output: "export",
  distDir: process.env.PORT ? `.next-${process.env.PORT}` : ".next",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
  trailingSlash: true,
  allowedDevOrigins: ["*.riker.replit.dev", "*.replit.dev", "*.worf.replit.dev"],
};

export default nextConfig;
