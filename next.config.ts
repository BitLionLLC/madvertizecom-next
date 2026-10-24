import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inlined at build time: Cache Components rejects `new Date()` during a
  // prerender, and the footer only needs the year the site was built.
  env: {
    buildYear: String(new Date().getFullYear()),
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
};

export default nextConfig;
