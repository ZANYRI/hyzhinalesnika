import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/news",
        permanent: true,
      },
      {
        source: "/putevoditeli-marshruty",
        destination: "/news",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
