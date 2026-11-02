import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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
      // "Area Privata" shows a "coming soon" page; the Platform prototype is not public yet
      { source: "/platform", destination: "/area-partner", permanent: false },
    ];
  },
};

export default createNextIntlPlugin()(nextConfig);
