import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { locale } from "next/root-params";
import Script from "next/script";
import { ClientMessages } from "@/components/client-messages";
import { routing } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

const permanentMarker = localFont({
  src: "../fonts/permanent-marker.woff2",
  weight: "400",
  variable: "--font-permanent-marker",
  adjustFontFallback: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <html lang={await locale()} className={`${poppins.variable} ${permanentMarker.variable}`}>
      <body>
        {/* Links shared before the move to real URLs used hash routes: /#/servizi -> /servizi */}
        <Script id="legacy-hash-routes" strategy="beforeInteractive">
          {`if (location.hash.startsWith("#/")) location.replace(location.hash.slice(1) + (location.hash.indexOf("?") < 0 ? location.search : ""));`}
        </Script>
        <ClientMessages namespaces={["Header", "ContactForm"]}>{children}</ClientMessages>
      </body>
    </html>
  );
}
