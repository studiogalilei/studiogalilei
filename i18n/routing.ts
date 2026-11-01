import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // The locale is never part of the URL: it comes from the cookie, then Accept-Language.
  localePrefix: "never",
  localeCookie: { name: "sg-lang", maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];
