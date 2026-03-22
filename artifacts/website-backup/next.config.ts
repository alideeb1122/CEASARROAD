import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: process.env.PORT ? `.next-${process.env.PORT}` : ".next",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ["*.riker.replit.dev", "*.replit.dev"],
};

export default nextConfig;
