import type { NextConfig } from "next";

/**
 * Production is deployed to GitHub Pages under a repository sub-path, while local
 * development is served from the root (http://localhost:3000).
 * Override with NEXT_PUBLIC_BASE_PATH (e.g. "" for a custom domain).
 */
const isProduction = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProduction ? "/tanvir-hasan-tamal" : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Static export has no image optimization server; assets are pre-optimized.
    unoptimized: true,
  },
};

export default nextConfig;
