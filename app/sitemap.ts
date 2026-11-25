import type { MetadataRoute } from "next";
import { LANDING_UPDATED, landings } from "@/lib/landing/pages";
import { SITE_URL, TRANSLATED_PATHS, localized } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const translated = TRANSLATED_PATHS.flatMap((path) => {
    const languages = { it: abs(path), en: abs(localized(path, "en")) };
    return (["it", "en"] as const).map((locale) => ({
      url: languages[locale],
      alternates: { languages },
      priority: path === "/" ? 1 : 0.6,
    }));
  });
  const answers = landings.map((page) => ({
    url: abs(page.path),
    lastModified: LANDING_UPDATED,
    priority: 0.9,
  }));
  return [...translated, ...answers];
}
