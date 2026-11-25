import type { Metadata } from "next";
import { JsonLd } from "@/components/landing/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { compares } from "@/lib/landing/compare";
import { SITE_NAME, fullTitle } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

const TITLE = "Confronti: le scelte prima di un software su misura";
const DESCRIPTION =
  "Su misura o già pronto, agente AI o automazione, software house o freelance o team interno: i confronti onesti sulle scelte da fare prima di comprare software e AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/confronti",
    languages: { it: "/confronti", "x-default": "/confronti" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/confronti",
    title: fullTitle(TITLE),
    description: DESCRIPTION,
    locale: "it_IT",
  },
};

/** The comparisons hub (Italian only, like the pages it lists). */
export default function ComparesPage() {
  return (
    <div lang="it">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          itemListElement: compares.map((page, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: page.title,
            url: `${SITE_URL}${page.path}`,
          })),
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Confronti" }]}
        kicker="Confronti"
        title="Le scelte da fare prima di comprare software e AI"
        intro="Tre confronti scritti per chi deve decidere, con la strada che non vendiamo detta per prima quando è quella giusta."
      />
      <Container className="relative z-2 -mt-18 pb-20 md:-mt-22 md:pb-28">
        <ul className="grid gap-px overflow-hidden rounded-18 bg-line shadow-surface-3 lg:grid-cols-3">
          {compares.map((page) => (
            <li key={page.path} className="bg-white">
              <Link href={page.path} className="group block h-full p-7 md:p-8">
                <h2 className="text-18 leading-[1.35] font-semibold text-sg group-hover:underline">
                  {page.title}
                </h2>
                <p className="mt-3 text-14.5 leading-1.65 text-ink/65">{page.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-16 leading-1.7 text-ink/70">
          Le altre domande, da quanto costa a di chi è il codice, sono in{" "}
          <Link
            href="/domande"
            className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            tutte le domande di chi compra software e AI
          </Link>
          .
        </p>
      </Container>
      <CtaBand
        title="Non sai quale strada è la tua?"
        text="In 45 minuti guardiamo come lavori oggi e ti diciamo quale conviene, anche quando non siamo noi."
        href="/#sg-prenota"
        label="Prenota una chiamata"
      />
    </div>
  );
}
