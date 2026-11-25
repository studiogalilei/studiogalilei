import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { JsonLd } from "@/components/landing/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { sectorLandings } from "@/lib/landing/pages";
import { sectors } from "@/lib/landing/sectors";
import { SITE_NAME, fullTitle } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

const TITLE = "Software su misura per settore";
const DESCRIPTION =
  "I settori per cui sviluppiamo software su misura: manifatturiero, moda, alimentare, edilizia, logistica, retail, sanità, turismo e altri. Per ognuno: problemi tipici, cosa costruiamo, costi.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/settori", languages: { it: "/settori", "x-default": "/settori" } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: "/settori",
      title: fullTitle(TITLE),
      description: DESCRIPTION,
      locale: "it_IT",
    },
    ...((await getLocale()) === "en" ? { robots: { index: false, follow: true } } : {}),
  };
}

/** The industries hub: one card per industry page (Italian only, like the pages it lists). */
export default function SectorsPage() {
  return (
    <div lang="it">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITLE,
          itemListElement: sectorLandings.map((page, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: page.title,
            url: `${SITE_URL}${page.path}`,
          })),
        }}
      />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Settori" }]}
        kicker="Settori"
        title={TITLE}
        intro="Ogni settore ha i suoi problemi, e un software generico li copre a metà. Qui trovi, settore per settore, cosa si inceppa di solito, cosa sviluppiamo e quanto costa."
      />
      <Container className="relative z-2 -mt-18 pb-20 md:-mt-22 md:pb-28">
        <ul className="grid gap-px overflow-hidden rounded-18 bg-line shadow-surface-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li key={s.slug} className="bg-white">
              <Link href={`/settori/${s.slug}`} className="group block h-full p-7 md:p-8">
                <h2 className="text-18 font-semibold text-sg group-hover:underline">{s.name}</h2>
                <p className="mt-2 text-14.5 leading-1.65 text-ink/65">{s.product}</p>
              </Link>
            </li>
          ))}
          <li className="bg-white">
            <Link href="/tour-operator" className="group block h-full p-7 md:p-8">
              <h2 className="text-18 font-semibold text-sg group-hover:underline">Tour operator</h2>
              <p className="mt-2 text-14.5 leading-1.65 text-ink/65">
                In uso da FunDallas Tours e BeaVita Tours
              </p>
            </Link>
          </li>
        </ul>
      </Container>
      <CtaBand
        title="Il tuo settore non c'è?"
        text="Il metodo è lo stesso: partiamo dai tuoi processi, non da un elenco. Raccontaci come lavori."
        href="/#sg-prenota"
        label="Prenota una chiamata"
      />
    </div>
  );
}
