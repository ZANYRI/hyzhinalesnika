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
        destination: "/#blog",
        permanent: true,
      },
      {
        source: "/putevoditeli-marshruty",
        destination: "/#blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
