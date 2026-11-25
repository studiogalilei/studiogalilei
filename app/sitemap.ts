import type { MetadataRoute } from "next";
import { LANDING_UPDATED, landings, sectorLandings } from "@/lib/landing/pages";
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
  const answers = [
    ...landings.map((p) => p.path),
    "/settori",
    ...sectorLandings.map((p) => p.path),
  ].map((path) => ({
    url: abs(path),
    lastModified: LANDING_UPDATED,
    priority: path.startsWith("/settori/") ? 0.8 : 0.9,
  }));
  return [...translated, ...answers];
}
