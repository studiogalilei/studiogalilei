import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // Italian lives at the plain address, English under /en: one address per language, so
  // search engines can index both. The cookie and Accept-Language only pick where "/" lands.
  localePrefix: "as-needed",
  localeCookie: { name: "sg-lang", maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];
