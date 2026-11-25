import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { localized } from "./site";

/*
 * Page titles, the same everywhere: "<page name> | Studio Galilei". The name comes from the
 * "Metadata" messages (`<key>.title`), in sentence case (capitals only for proper names);
 * case studies are "Caso studio: <subject>" / "Case study: <subject>". The suffix is the
 * root layout's title template, so pages outside the site layout follow it too.
 */
export const SITE_NAME = "Studio Galilei";
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
export const fullTitle = (name: string) => TITLE_TEMPLATE.replace("%s", name);

/** The title for search results: with the site name when the whole stays within 60 characters. */
export const seoTitle = (name: string) => (fullTitle(name).length <= 60 ? fullTitle(name) : name);

/** The description for search results: whole sentences (or clauses) up to 160 characters. */
export function seoDescription(text: string) {
  if (text.length <= 160) return text;
  let out = "";
  for (const sentence of text.split(/(?<=[.:])\s+/)) {
    if ((out + " " + sentence).trim().length > 160) break;
    out = (out + " " + sentence).trim();
  }
  if (out.length >= 90) return out.replace(/:$/, ".");
  const cut = text.slice(0, 159);
  return `${cut.slice(0, cut.lastIndexOf(","))}.`;
}

/** Where each "Metadata" key lives: gives every page its canonical address and its twin in the other language. */
const PATHS: Record<string, string> = {
  home: "/",
  about: "/chi-siamo",
  services: "/servizi",
  marketing: "/servizi/marketing",
  "intelligenza-artificiale": "/servizi/intelligenza-artificiale",
  "sviluppo-software": "/servizi/sviluppo-software",
  googleAds: "/servizi/google-ads",
  caseStudies: "/casi-studio",
  caseTourOperator: "/casi-studio/tour-operator",
  caseDanInk: "/casi-studio/dan-ink",
  caseOnlySolutions: "/casi-studio/onlysolutions",
  careers: "/lavora-con-noi",
  contact: "/contatti",
  privacy: "/privacy",
  tourOperator: "/tour-operator",
};

/** Canonical address plus the Italian/English pair, for a page that exists in both languages. */
export function alternates(path: string, locale: string): Metadata["alternates"] {
  return {
    canonical: localized(path, locale),
    languages: { it: path, en: localized(path, "en"), "x-default": path },
  };
}

/** Per-page title and description from the "Metadata" messages, as `<key>.title` / `<key>.description`. */
export async function pageMetadata(key: string): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();
  const name = t(`${key}.title`);
  const description = t(`${key}.description`);
  const path = PATHS[key];
  return {
    // the home page's title already starts with the company name
    title: { absolute: key === "home" ? name : seoTitle(name) },
    description: seoDescription(description),
    ...(path ? { alternates: alternates(path, locale) } : {}),
    // the shared preview (link cards) carries the page's own title, not the home page's
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      ...(path ? { url: localized(path, locale) } : {}),
      title: key === "home" ? name : fullTitle(name),
      description,
      locale: locale === "en" ? "en_US" : "it_IT",
    },
  };
}
