import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async headers() {
    return [
      {
        // Map tiles change only when scripts/build-tiles.sh is rerun.
        source: "/tiles/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
  partialPrefetching: true,
  // Workspace packages ship TypeScript source.
  transpilePackages: ["@tommahle/checkout"],
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
