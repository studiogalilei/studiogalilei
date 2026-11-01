import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // TEMP (migration): parallel dev servers in one checkout, no dev badge in screenshots
  distDir: process.env.NEXT_DIST_DIR || ".next",
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      // the tour operator landing page used to be a standalone HTML file
      ...["/tour-operator-v2.html", "/tour-operator-v2", "/tour-operator.html"].map((source) => ({
        source,
        destination: "/tour-operator",
        permanent: true,
      })),
      // "Area Privata" points to the Platform while it is a prototype
      { source: "/area-partner", destination: "/platform", permanent: false },
    ];
  },
};

export default createNextIntlPlugin()(nextConfig);
