/** The address search engines should know: the apex domain redirects here. */
export const SITE_URL = "https://www.studiogalilei.com";

/** Pages with both an Italian and an English version (English under /en). */
export const TRANSLATED_PATHS = [
  "/",
  "/chi-siamo",
  "/servizi",
  "/servizi/intelligenza-artificiale",
  "/servizi/sviluppo-software",
  "/servizi/marketing",
  "/servizi/google-ads",
  "/casi-studio",
  "/casi-studio/tour-operator",
  "/casi-studio/dan-ink",
  "/casi-studio/onlysolutions",
  "/tour-operator",
  "/contatti",
  "/lavora-con-noi",
  "/privacy",
] as const;

/** Address of a page in a language: "/servizi" -> "/en/servizi". */
export const localized = (path: string, locale: string) =>
  locale === "en" ? (path === "/" ? "/en" : `/en${path}`) : path;
