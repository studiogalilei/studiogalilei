import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing, type Locale } from "@/i18n/routing";

const i18n = createMiddleware(routing);

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

  // Locales are internal route segments only: /en/servizi -> /servizi.
  const [, first, ...rest] = url.pathname.split("/");
  if (isLocale(first)) {
    url.pathname = `/${rest.join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  return i18n(request);
}

export const config = {
  // everything except API routes, Next internals and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
