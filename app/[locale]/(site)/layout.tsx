import type { Metadata, Viewport } from "next";
import { CardTilt } from "@/components/effects/card-tilt";
import { Footer } from "@/components/layout/footer";
import { company } from "@/lib/company";
import { SITE_URL } from "@/lib/site";

// titles and previews: the root layout's template and each page's pageMetadata()
export const metadata: Metadata = { twitter: null };

export const viewport: Viewport = { themeColor: "#061773" };

const organization = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Studio Galilei",
      legalName: company.legalName,
      alternateName: [company.legalName, "Studio Galilei S.r.l.", "StudioGalilei"],
      slogan: "Prima il sistema, poi l'AI",
      founder: { "@type": "Person", name: "Dramane Yigo", jobTitle: "Co-founder" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: company.email,
        telephone: company.phoneHref,
        availableLanguage: ["it", "en"],
        url: `${SITE_URL}/#sg-prenota`,
      },
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description:
        "Software house di Treviso: gestionali e software su misura, automazioni e agenti AI per le piccole e medie imprese.",
      foundingDate: "2024",
      vatID: `IT${company.vat}`,
      email: company.email,
      telephone: company.phoneHref,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: company.street,
        postalCode: company.zip,
        addressLocality: company.city,
        addressRegion: company.province,
        addressCountry: "IT",
      },
      areaServed: [
        { "@type": "City", name: "Treviso" },
        { "@type": "AdministrativeArea", name: "Veneto" },
        { "@type": "Country", name: "Italia" },
      ],
      makesOffer: [
        {
          "@type": "Offer",
          name: "Gestionali e software su misura",
          url: `${SITE_URL}/gestionale-su-misura`,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            minPrice: 5000,
            maxPrice: 80000,
          },
        },
        {
          "@type": "Offer",
          name: "Agenti AI e automazioni",
          url: `${SITE_URL}/agenti-ai-per-aziende`,
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "EUR",
            minPrice: 3000,
            maxPrice: 40000,
          },
        },
      ],
      knowsAbout: [
        "Sviluppo software su misura",
        "Gestionali su misura",
        "Agenti AI",
        "Automazione dei processi aziendali",
        "Intelligenza artificiale per le PMI",
      ],
      sameAs: [
        "https://www.linkedin.com/company/studio-galilei/",
        "https://www.instagram.com/studiogalilei/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Studio Galilei",
      inLanguage: ["it", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
