import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing, type Locale } from "@/i18n/routing";

const i18n = createMiddleware(routing);

// The answer pages exist in Italian only (lib/landing): their /en address leads to the Italian
// one, and the Italian one is served as it is whatever language the visitor prefers.
const ITALIAN_ONLY =
  /^\/(settori|guide|confronti)(\/[^/]+)?$|^\/(domande|metodo|agenzie-partner|gestionale-su-misura|agenti-ai-per-aziende|automazione-processi-aziendali|software-house-treviso)$/;

const isLocale = (value: string | null | undefined): value is Locale =>
  (routing.locales as readonly string[]).includes(value ?? "");

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // ?lang=it|en forces the language: remember it and drop it from the address.
  const lang = url.searchParams.get("lang");
  if (isLocale(lang)) {
    url.searchParams.delete("lang");
    const response = NextResponse.redirect(url);
    const { name, maxAge } = routing.localeCookie as {
      name: string;
      maxAge: number;
    };
    response.cookies.set(name, lang, { maxAge, path: "/", sameSite: "lax" });
    return response;
  }

  const { pathname } = url;
  if (pathname.startsWith("/en/") && ITALIAN_ONLY.test(pathname.slice(3))) {
    url.pathname = pathname.slice(3);
    return NextResponse.redirect(url);
  }
  if (ITALIAN_ONLY.test(pathname)) {
    url.pathname = `/it${pathname}`;
    return NextResponse.rewrite(url);
  }

  return i18n(request);
}

export const config = {
  // everything except API routes, Next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
