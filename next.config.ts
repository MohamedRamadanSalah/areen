import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a parent lockfile exists on the machine).
  outputFileTracingRoot: __dirname,
  images: {
    // Provided brand assets and placeholder project images are served locally.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
