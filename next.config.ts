import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        source: "/area-partner",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; frame-src https://workspace.studiogalilei.com",
          },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      // the tour operator landing page used to be a standalone HTML file
      ...["/tour-operator-v2.html", "/tour-operator-v2", "/tour-operator.html"].map((source) => ({
        source,
        destination: "/tour-operator",
        permanent: true,
      })),
      // Old Private Area bookmarks open the current sign-in page.
      { source: "/platform", destination: "/area-partner", permanent: false },
    ];
  },
};

export default createNextIntlPlugin()(nextConfig);
