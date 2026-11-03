import type { Metadata, Viewport } from "next";
import { CardTilt } from "@/components/effects/card-tilt";
import { Footer } from "@/components/layout/footer";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: {
    template: "%s | Studio Galilei",
    default: "Studio Galilei | Marketing, AI e Software",
  },
  openGraph: {
    type: "website",
    siteName: "Studio Galilei",
    title: "Studio Galilei | Marketing, AI e Software",
    description: "Rendiamo visibile ciò che muove la crescita.",
    url: "https://studiogalilei.com/",
    locale: "it_IT",
  },
  twitter: null,
};

export const viewport: Viewport = { themeColor: "#061773" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: "https://studiogalilei.com",
  vatID: `IT${company.vat}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.zip,
    addressLocality: company.city,
    addressRegion: company.province,
    addressCountry: "IT",
  },
};

export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    // the navbar (root layout) is 73px tall: the footer still sits at the bottom of short pages
    <div className="flex min-h-[calc(100dvh-73px)] flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <main id="contenuto" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <CardTilt />
    </div>
  );
}
