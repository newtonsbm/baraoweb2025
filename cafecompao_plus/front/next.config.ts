import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://localhost:8000/**')],
  },
};

export default nextConfig;
