import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { LANDING_AUTHOR, LANDING_UPDATED, landingByPath, type Landing } from "@/lib/landing/pages";
import { SITE_NAME, fullTitle } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "./json-ld";

/*
 * An "answer page" (see lib/landing/pages.ts): the direct answer first, then the reasoning,
 * prices, method and the questions people actually ask, each also given to search engines
 * as structured data.
 */

const ORG_ID = `${SITE_URL}/#organization`;

export async function landingMetadata(path: string): Promise<Metadata> {
  const page = landingByPath(path);
  const locale = await getLocale();
  return {
    title: { absolute: page.metaTitle.length > 48 ? page.metaTitle : fullTitle(page.metaTitle) },
    description: page.description,
    // Italian only: the copy under /en points here
    alternates: { canonical: page.path, languages: { it: page.path, "x-default": page.path } },
    openGraph: {
      type: page.kind === "guide" || page.kind === "method" ? "article" : "website",
      siteName: SITE_NAME,
      url: page.path,
      title: page.metaTitle,
      description: page.description,
      locale: "it_IT",
    },
    ...(locale === "en" ? { robots: { index: false, follow: true } } : {}),
  };
}

function updatedLabel() {
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${LANDING_UPDATED}T12:00:00Z`));
}

function structuredData(page: Landing) {
  const url = `${SITE_URL}${page.path}`;
  const author = {
    "@type": "Person",
    name: LANDING_AUTHOR.name,
    jobTitle: "Co-founder",
    worksFor: { "@id": ORG_ID },
  };
  const crumbs = [
    { name: "Home", item: SITE_URL },
    ...(page.kind === "sector"
      ? [{ name: "Settori", item: `${SITE_URL}/settori` }]
      : page.kind === "guide" || page.kind === "method"
        ? []
        : [{ name: "Servizi", item: `${SITE_URL}/servizi` }]),
    { name: page.title, item: url },
  ];
  const main =
    page.kind === "guide" || page.kind === "method"
      ? {
          "@type": "Article",
          headline: page.title,
          description: page.description,
          inLanguage: "it",
          datePublished: LANDING_UPDATED,
          dateModified: LANDING_UPDATED,
          author,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: url,
        }
      : {
          "@type": "Service",
          name: page.title,
          description: page.description,
          serviceType: page.kicker,
          provider: { "@id": ORG_ID },
          areaServed:
            page.kind === "local"
              ? [
                  { "@type": "City", name: "Treviso" },
                  { "@type": "AdministrativeArea", name: "Veneto" },
                  { "@type": "Country", name: "Italia" },
                ]
              : { "@type": "Country", name: "Italia" },
          url,
        };
  return {
    "@context": "https://schema.org",
    "@graph": [
      main,
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
    ],
  };
}

const h2 =
  "text-1.75rem leading-1.15 font-semibold -tracking-2 text-balance text-sg before:mb-5 before:block before:h-1 before:w-12 before:rounded-full before:bg-sand-deep md:text-2.2rem";
const panel = "-mx-2 rounded-18 bg-sand px-6 py-9 md:-mx-10 md:px-10 md:py-12";
const prose = "text-16 leading-1.75 text-ink/75 md:text-17";

export function LandingPage({ path }: { path: string }) {
  const page = landingByPath(path);
  return (
    // the texts are Italian whatever the site language
    <div lang="it">
      <JsonLd data={structuredData(page)} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          ...(page.kind === "sector"
            ? [{ label: "Settori", href: "/settori" }]
            : page.kind === "guide" || page.kind === "method"
              ? []
              : [{ label: "Servizi", href: "/servizi" }]),
          { label: page.title },
        ]}
        kicker={page.kicker}
        title={page.title}
      />
      <Container className="relative z-2 -mt-18 md:-mt-22">
        <div className="rounded-18 border-l-[6px] border-sand-deep bg-white p-7 shadow-surface-3 md:p-12">
          <p className="max-w-[52rem] text-18 leading-1.7 font-medium text-ink md:text-22 md:leading-[1.6]">
            {page.answer}
          </p>
          <p className="mt-6 text-13 text-ink/55">
            Aggiornato il {updatedLabel()}. Scritto da {LANDING_AUTHOR.name}, {LANDING_AUTHOR.role}.
          </p>
        </div>
      </Container>

      {page.image && (
        <Container className="pt-10 md:pt-14">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element -- a static screenshot, already sized and compressed */}
            <img
              src={page.image.src}
              alt={page.image.alt}
              width={1800}
              height={1125}
              className="block h-auto w-full rounded-14 border border-sg/10 shadow-surface-3 md:rounded-18"
            />
            <figcaption className="mt-3 text-13 text-ink/55">
              Esempio di interfaccia. Nomi e dati sono di fantasia.
            </figcaption>
          </figure>
        </Container>
      )}

      {page.stats && (
        <Container className="pt-10 md:pt-14">
          <ul className="grid gap-px overflow-hidden rounded-18 bg-line shadow-surface-1 sm:grid-cols-2 lg:grid-cols-4">
            {page.stats.map((stat) => (
              <li key={stat.value} className="border-t-4 border-sand-deep bg-white p-7">
                <p className="text-[2.6rem] leading-none font-semibold -tracking-3 text-sg md:text-[3rem]">
                  {stat.value}
                </p>
                <p className="mt-3 text-15 leading-1.65 text-ink/75">{stat.label}</p>
                <p className="mt-3 text-13 text-ink/50">{stat.source}</p>
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="py-16 md:py-24">
        <div className="max-w-[46rem] space-y-16 md:space-y-20">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className={h2}>{section.title}</h2>
              {section.bullets && (
                <ul className="mt-6 space-y-3.5">
                  {section.bullets.map((item) => (
                    <li key={item} className={`flex gap-3.5 ${prose}`}>
                      <span
                        aria-hidden="true"
                        className="mt-[0.62em] size-2 flex-none rounded-[2px] bg-sand-deep"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.body?.map((p) => (
                <p key={p} className={`mt-5 ${prose}`}>
                  {p}
                </p>
              ))}
            </section>
          ))}

          {page.steps && (
            <section className={panel}>
              <h2 className={h2}>{page.steps.title}</h2>
              <ol className="mt-8 space-y-7">
                {page.steps.items.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="grid size-9 flex-none place-items-center rounded-10 bg-cream text-15 font-semibold text-sg"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-18 font-semibold text-sg">{step.title}</h3>
                      <p className={`mt-1.5 ${prose}`}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {page.prices && (
            <section className={panel}>
              <h2 className={h2}>{page.prices.title}</h2>
              <p className={`mt-5 ${prose}`}>{page.prices.intro}</p>
              <div className="mt-7 overflow-hidden rounded-14 bg-white shadow-surface-1">
                <table className="w-full text-left">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Progetto</th>
                      <th scope="col">Fascia di prezzo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.prices.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="flex flex-col border-b border-line last:border-0 md:table-row"
                      >
                        <th scope="row" className="p-5 pb-2 align-top font-normal md:p-6">
                          <span className="block text-16 font-semibold text-sg">{row.label}</span>
                          <span className="mt-1 block text-14 leading-1.65 text-ink/60">
                            {row.note}
                          </span>
                        </th>
                        <td className="px-5 pb-5 align-top text-17 font-semibold whitespace-nowrap text-ink md:p-6 md:text-right md:text-18">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`mt-6 ${prose}`}>{page.prices.note}</p>
            </section>
          )}

          {page.caseStudy && (
            <section>
              <h2 className={h2}>Un software nostro, in uso ogni giorno</h2>
              <p className={`mt-5 ${prose}`}>
                Per due tour operator, FunDallas Tours in Texas e BeaVita Tours in Italia, abbiamo
                costruito un&apos;app che tiene insieme tutta la giornata: prenotazioni, partenze,
                autisti, guide, liste passeggeri e messaggi ai clienti. Prima il team apriva
                prenotazioni, chat e fogli di calcolo uno per uno; ora una schermata mostra tutto.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-16 font-medium">
                <Link
                  href="/casi-studio/tour-operator"
                  className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Leggi il caso studio
                </Link>
                <Link
                  href="/tour-operator"
                  className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Software per tour operator
                </Link>
              </p>
            </section>
          )}

          <section className={panel}>
            <h2 className={h2}>Domande frequenti</h2>
            <dl className="mt-6 divide-y divide-sand-deep/30 border-y border-sand-deep/30">
              {page.faqs.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <dt>
                    <h3 className="text-18 font-semibold text-sg">{q}</h3>
                  </dt>
                  <dd className={`mt-2.5 ${prose}`}>{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {page.sources && (
            <section>
              <h2 className="text-18 font-semibold text-sg">Fonti</h2>
              <ul className="mt-5 space-y-3">
                {page.sources.map((source) => (
                  <li key={source.url} className="text-15 leading-1.65 text-ink/70">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-1 underline-offset-4 hover:text-sg"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Pagine collegate">
            <h2 className="text-18 font-semibold text-sg">Continua a leggere</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.related.map((href) => {
                const other = landingByPath(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group block h-full rounded-14 bg-white p-5 shadow-surface-1"
                    >
                      <span className="block text-13 text-ai">{other.kicker}</span>
                      <span className="mt-1 block text-16 font-semibold text-sg group-hover:underline">
                        {other.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
      <CtaBand
        title="Parliamone guardando il tuo caso"
        text="Una chiamata conoscitiva di 45 minuti, oppure un caffè nella nostra sede di Treviso. Guardiamo il problema insieme, e se non siamo le persone giuste te lo diciamo."
        href="/#sg-prenota"
        label="Prenota una chiamata"
      />
    </div>
  );
}
