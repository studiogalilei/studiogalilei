import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

/*
 * Page titles, the same everywhere: "<page name> | Studio Galilei". The name comes from the
 * "Metadata" messages (`<key>.title`), in sentence case (capitals only for proper names);
 * case studies are "Caso studio: <subject>" / "Case study: <subject>". The suffix is the
 * root layout's title template, so pages outside the site layout follow it too.
 */
export const SITE_NAME = "Studio Galilei";
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
export const fullTitle = (name: string) => TITLE_TEMPLATE.replace("%s", name);

/** Per-page title and description from the "Metadata" messages, as `<key>.title` / `<key>.description`. */
export async function pageMetadata(key: string): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();
  const name = t(`${key}.title`);
  const description = t(`${key}.description`);
  return {
    title: name,
    description,
    // the shared preview (link cards) carries the page's own title, not the home page's
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle(name),
      description,
      locale: locale === "en" ? "en_US" : "it_IT",
    },
  };
}
