import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Eta dile je kono HTTPS URL er image load nibe
      },
      {
        protocol: 'http',
        hostname: '**', // HTTP URL er jonno (jodi lage)
      },
    ],
  },
};

export default nextConfig;
