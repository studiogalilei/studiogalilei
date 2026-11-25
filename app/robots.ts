import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everyone may read the public site, AI assistants' crawlers included (they are how the
// company gets quoted in AI answers); only the private areas stay out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/area-partner", "/platform"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
