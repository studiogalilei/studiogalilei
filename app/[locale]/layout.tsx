import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { locale } from "next/root-params";
import Script from "next/script";
import { ClientMessages } from "@/components/client-messages";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { routing } from "@/i18n/routing";
import { SITE_NAME, TITLE_TEMPLATE } from "@/lib/metadata";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const permanentMarker = localFont({
  src: "../fonts/permanent-marker.woff2",
  weight: "400",
  variable: "--font-permanent-marker",
  adjustFontFallback: false,
});

// every page's title is "<page name> | Studio Galilei" (see lib/metadata.ts)
export const metadata: Metadata = { title: { template: TITLE_TEMPLATE, default: SITE_NAME } };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <html lang={await locale()} className={`${poppins.variable} ${permanentMarker.variable}`}>
      <head>
        {/* The favicon is part of the layout, not of each page's metadata: metadata is streamed
            per page, and switching language left the tab without an icon until it arrived.
            Here it also covers the pages outside the site layout (tour operator). */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Links shared before the move to real URLs used hash routes: /#/servizi -> /servizi */}
        <Script id="legacy-hash-routes" strategy="beforeInteractive">
          {`if (location.hash.startsWith("#/")) location.replace(location.hash.slice(1) + (location.hash.indexOf("?") < 0 ? location.search : ""));`}
        </Script>
        <ClientMessages namespaces={["Header", "ContactForm"]}>
          <SkipLink />
          <Navbar />
          {children}
        </ClientMessages>
      </body>
    </html>
  );
}
