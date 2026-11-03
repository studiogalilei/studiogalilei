import type { Metadata, Viewport } from "next";
import { CardTilt } from "@/components/effects/card-tilt";
import { Footer } from "@/components/layout/footer";
import { company } from "@/lib/company";

// titles and previews: the root layout's template and each page's pageMetadata()
export const metadata: Metadata = { twitter: null };

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
