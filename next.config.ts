import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { qualities: [60, 75], formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{
      // Only content-addressed fonts are immutable. The manifest and full-font
      // fallback remain revalidatable, so later typography updates are visible.
      source: "/fonts/subsets/:name([a-z0-9-]+\\.[0-9a-f]{12}\\.woff2)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }, {
      source: "/images/home/hero-mobile.:hash([0-9a-f]{12}).:format(avif|webp)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
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
      ...[
        ["/house", "/dom-dlya-semi"],
        ["/barnhouse", "/dvuhetazhnyj-barnhouse"],
        ["/shale", "/shale-s-vidom-na-gory"],
        ["/user/agreement", "/users/agreement"],
      ].map(([source, destination]) => ({ source, destination: `https://hyzhinalesnika.ru${destination}`, permanent: true })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hyzhinalesnika.ru" }],
        destination: "https://hyzhinalesnika.ru/:path*",
        permanent: true,
      },
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
