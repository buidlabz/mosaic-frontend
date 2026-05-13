import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.it',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {},
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
};

export default nextConfig;
