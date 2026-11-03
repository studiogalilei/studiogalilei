"use server";

import { cookies } from "next/headers";
import { routing, type Locale } from "./routing";

/**
 * Remembers the chosen language. Done in a Server Function on purpose: setting a cookie here
 * invalidates the whole client cache. The language is not in the URL, so a page prefetched or
 * visited before the switch is cached under the same address in the old language, and the
 * site kept showing it on later navigations until a reload.
 */
export async function setLocale(locale: Locale) {
  if (!(routing.locales as readonly string[]).includes(locale)) return;
  const { name, maxAge } = routing.localeCookie as { name: string; maxAge: number };
  (await cookies()).set(name, locale, { maxAge, path: "/", sameSite: "lax" });
}
