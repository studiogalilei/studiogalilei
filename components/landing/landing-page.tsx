import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import {
  LANDING_AUTHOR,
  LANDING_UPDATED,
  landingByPath,
  type Landing,
  type LandingFaq,
} from "@/lib/landing/pages";
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
      type: isArticle(page) ? "article" : "website",
      siteName: SITE_NAME,
      url: page.path,
      title: page.metaTitle,
      description: page.description,
      locale: "it_IT",
    },
    ...(locale === "en" ? { robots: { index: false, follow: true } } : {}),
  };
}

/** The pages above this one: Home, then the section it belongs to. */
function trail(page: Landing): { label: string; href: string }[] {
  const parent =
    page.kind === "sector"
      ? [{ label: "Settori", href: "/settori" }]
      : page.kind === "service" || page.kind === "local"
        ? [{ label: "Servizi", href: "/servizi" }]
        : page.kind === "compare"
          ? [{ label: "Confronti", href: "/confronti" }]
          : [];
  return [{ label: "Home", href: "/" }, ...parent];
}

const isArticle = (page: Landing) =>
  page.kind === "guide" || page.kind === "method" || page.kind === "compare";

function structuredData(page: Landing) {
  const url = `${SITE_URL}${page.path}`;
  const author = {
    "@type": "Person",
    name: LANDING_AUTHOR.name,
    jobTitle: "Co-founder",
    worksFor: { "@id": ORG_ID },
  };
  const crumbs = [
    ...trail(page).map((c) => ({
      name: c.label,
      item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
    })),
    { name: page.title, item: url },
  ];
  const faqs = [
    ...(page.objections?.items ?? []),
    ...page.faqs,
    ...(page.groups ?? []).flatMap((g) => g.items),
  ];
  const main = isArticle(page)
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
        mainEntity: faqs.map(({ q, a }) => ({
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
  "text-1.75rem leading-1.15 font-semibold -tracking-2 text-balance text-sg md:text-2.2rem";
const prose = "text-16 leading-1.75 text-ink/75";
/** A block: the heading on the left, the content on the right (stacked on a phone). */
const split = "grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14";

const BOOK = "/#sg-prenota";
const BOOK_LABEL = "Prenota una chiamata";

/** "Hosting: il server su cui gira" -> the part before the colon in bold, when it is a short label. */
function Bullet({ text }: { text: string }) {
  const clean = text.replace(/\.$/, "");
  const cut = clean.indexOf(": ");
  if (cut > 0 && cut <= 42) {
    return (
      <>
        <strong className="font-semibold text-sg">{clean.slice(0, cut)}</strong>
        <span className="mt-1 block">
          {clean.charAt(cut + 2).toUpperCase() + clean.slice(cut + 3)}
        </span>
      </>
    );
  }
  return <>{clean}</>;
}

/** Questions that open on click: the answers are in the page's HTML either way. */
function Questions({ items, open = 0 }: { items: LandingFaq[]; open?: number }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-18 bg-white shadow-surface-1">
      {items.map(({ q, a }, i) => (
        <details key={q} open={i < open} className="group">
          <summary className="flex cursor-pointer list-none items-start gap-4 p-5 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="flex-1 text-16 leading-[1.45] font-semibold text-sg md:text-17">{q}</h3>
            <span
              aria-hidden="true"
              className="relative mt-1 size-5 flex-none rounded-full bg-pale transition-transform duration-150 group-open:rotate-45"
            >
              <span className="absolute top-1/2 left-1/2 h-px w-2.5 -translate-1/2 bg-sg" />
              <span className="absolute top-1/2 left-1/2 h-2.5 w-px -translate-1/2 bg-sg" />
            </span>
          </summary>
          <p className={`max-w-[46rem] px-5 pb-6 md:px-7 ${prose}`}>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function LandingPage({ path }: { path: string }) {
  const page = landingByPath(path);
  // the first sentence is the answer in one line, the rest is the detail under it
  const stop = page.answer.indexOf(". ");
  const lead = stop > 0 ? page.answer.slice(0, stop + 1) : page.answer;
  const rest = stop > 0 ? page.answer.slice(stop + 2) : "";
  return (
    // the texts are Italian whatever the site language
    <div lang="it">
      <JsonLd data={structuredData(page)} />
      <PageHero
        crumbs={[...trail(page), { label: page.title }]}
        kicker={page.kicker}
        title={page.title}
      />
      {page.image && (
        <Container className="relative z-2 -mt-24 md:-mt-32">
          <figure className="overflow-hidden rounded-14 bg-white shadow-surface-3 ring-1 ring-sg/10 md:rounded-18">
            {/* the window the software runs in */}
            <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-2.5 md:px-5 md:py-3">
              <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
              <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
              <span className="size-2.5 rounded-full bg-[#E3E6EE]" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- a static screenshot, already sized and compressed */}
            <img
              src={page.image.src}
              alt={page.image.alt}
              width={1800}
              height={1125}
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </figure>
          <p className="mt-3 text-13 text-ink/50">
            Interfaccia d&apos;esempio, con dati dimostrativi.
          </p>
        </Container>
      )}

      {/* the answer, the numbers and the one thing to do next */}
      <Container className={page.image ? "pt-8 md:pt-12" : "relative z-2 -mt-18 md:-mt-22"}>
        <div className="grid overflow-hidden rounded-18 bg-white shadow-surface-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div className="p-7 md:p-11">
            <p className="text-19 leading-[1.5] font-medium text-ink md:text-22">{lead}</p>
            {rest && <p className={`mt-4 max-w-[44rem] ${prose}`}>{rest}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink href={BOOK}>{BOOK_LABEL}</ButtonLink>
              <span className="text-14 text-ink/55">45 minuti, senza impegno</span>
            </div>
          </div>
          {page.facts && (
            <dl className="grid content-center divide-y divide-line bg-sand max-lg:border-t max-lg:border-line sm:max-lg:grid-cols-3 lg:border-l lg:border-line">
              {page.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse bg-sand px-7 py-5 md:px-9 lg:py-6"
                >
                  <dt className="mt-1 text-14 leading-[1.5] text-ink/65">{fact.label}</dt>
                  <dd className="text-[1.7rem] leading-1.15 font-semibold -tracking-2 text-sg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>

      {page.groups && (
        <Container className="pt-8 md:pt-10">
          <nav aria-label="Argomenti" className="flex flex-wrap gap-2">
            {page.groups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full bg-white px-4 py-2 text-14 font-medium text-sg shadow-surface-1 hover:bg-pale"
              >
                {group.title}
              </a>
            ))}
          </nav>
        </Container>
      )}

      {page.stats && (
        <Container className="pt-8 md:pt-12">
          <ul className="grid gap-px overflow-hidden rounded-18 bg-line shadow-surface-1 sm:grid-cols-2 lg:grid-cols-4">
            {page.stats.map((stat) => (
              <li key={stat.value} className="bg-white p-7">
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

      {page.table && (
        <Container className="pt-14 md:pt-20">
          <h2 className={h2}>{page.table.title}</h2>
          <div className="mt-7 overflow-x-auto rounded-18 bg-white shadow-surface-1">
            <table className="w-full min-w-[640px] text-left text-15 leading-1.65">
              <thead>
                <tr className="bg-sand text-sg">
                  <td className="p-4 md:px-6" />
                  {page.table.columns.map((c) => (
                    <th key={c} scope="col" className="p-4 font-semibold md:px-6">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {page.table.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="p-4 align-top font-semibold text-sg md:px-6">
                      {row.label}
                    </th>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="p-4 align-top text-ink/75 md:px-6">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      )}

      <Container className="space-y-14 py-14 md:space-y-20 md:py-20">
        {page.sections.map((section) => (
          <section key={section.title} className={split}>
            <h2 className={h2}>{section.title}</h2>
            <div>
              {section.bullets && (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      className="rounded-14 bg-mist p-5 text-15 leading-1.65 text-ink/75"
                    >
                      <Bullet text={item} />
                    </li>
                  ))}
                </ul>
              )}
              {section.body?.map((p, i) => (
                <p
                  key={p}
                  className={`max-w-[44rem] ${prose} ${i > 0 || section.bullets ? "mt-5" : ""}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </Container>

      {page.steps && (
        <section className="bg-sand py-14 md:py-20">
          <Container>
            <h2 className={h2}>{page.steps.title}</h2>
            <ol
              className={`mt-9 grid gap-x-6 gap-y-8 sm:grid-cols-2 ${page.steps.items.length > 3 ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}
            >
              {page.steps.items.map((step, i) => (
                <li key={step.title}>
                  <span
                    aria-hidden="true"
                    className="block text-[2.2rem] leading-none font-semibold -tracking-3 text-sand-deep"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-17 font-semibold text-sg">{step.title}</h3>
                  <p className="mt-2 text-15 leading-1.65 text-ink/75">{step.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {page.prices && (
        <Container className="py-14 md:py-20">
          <section className={split}>
            <div>
              <h2 className={h2}>{page.prices.title}</h2>
              <p className={`mt-5 ${prose}`}>{page.prices.intro}</p>
            </div>
            <div>
              <table className="block w-full text-left">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Progetto</th>
                    <th scope="col">Fascia di prezzo</th>
                  </tr>
                </thead>
                <tbody className="grid gap-4 sm:grid-cols-2">
                  {page.prices.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="flex flex-col rounded-18 bg-white p-6 shadow-surface-1 md:p-7"
                    >
                      <th scope="row" className="font-normal">
                        <span className="block text-15 font-semibold text-sg">{row.label}</span>
                      </th>
                      <td className="mt-3 text-[1.5rem] leading-1.15 font-semibold -tracking-2 whitespace-nowrap text-ink min-[1100px]:text-[1.7rem]">
                        {row.value}
                      </td>
                      <td className="mt-3 text-14 leading-1.65 text-ink/60">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={`mt-6 max-w-[44rem] ${prose}`}>{page.prices.note}</p>
              <div className="mt-7">
                <ButtonLink href={BOOK}>{BOOK_LABEL}</ButtonLink>
              </div>
            </div>
          </section>
        </Container>
      )}

      {page.caseStudy && (
        <Container className="pb-14 md:pb-20">
          <section className="grid items-center gap-8 overflow-hidden rounded-18 bg-mist p-7 md:p-11 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className={h2}>Un software nostro, in uso ogni giorno</h2>
              <p className={`mt-5 ${prose}`}>
                Per due tour operator, FunDallas Tours in Texas e BeaVita Tours in Italia, abbiamo
                costruito un&apos;app che tiene insieme tutta la giornata: prenotazioni, partenze,
                autisti, guide, liste passeggeri e messaggi ai clienti. Prima il team apriva
                prenotazioni, chat e fogli di calcolo uno per uno, ora una schermata mostra tutto.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-16 font-medium">
                <Link
                  href="/casi-studio/tour-operator"
                  className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Leggi il caso studio dei tour operator
                </Link>
                <Link
                  href="/tour-operator"
                  className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  Software per tour operator
                </Link>
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- a static screenshot, already sized and compressed */}
            <img
              src="/images/tour-operator/beavita-dashboard-it.webp"
              alt="La schermata principale del software costruito per BeaVita Tours: messaggi inviati, liste passeggeri e prenotazioni della giornata"
              width={1310}
              height={812}
              loading="lazy"
              className="h-auto w-full rounded-14 shadow-surface-2"
            />
          </section>
        </Container>
      )}

      {page.objections && (
        <Container className="pb-14 md:pb-20">
          <section className={split}>
            <h2 className={h2}>{page.objections.title}</h2>
            <Questions items={page.objections.items} open={1} />
          </section>
        </Container>
      )}

      {page.faqs.length > 0 && (
        <Container className="pb-14 md:pb-20">
          <section className={split}>
            <div>
              <h2 className={h2}>Domande frequenti</h2>
              {
                <p className={`mt-5 ${prose}`}>
                  Soldi, tempi, proprietà del codice, dati, AI: le altre risposte sono in{" "}
                  <Link
                    href="/domande"
                    className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    tutte le domande di chi compra software e AI
                  </Link>
                  .
                </p>
              }
            </div>
            <Questions items={page.faqs} open={page.objections ? 0 : 1} />
          </section>
        </Container>
      )}

      {page.groups?.map((group) => (
        <Container key={group.id} className="pb-14 md:pb-20">
          <section id={group.id} className={`scroll-mt-24 ${split}`}>
            <div>
              <h2 className={h2}>{group.title}</h2>
              {group.intro && <p className={`mt-5 ${prose}`}>{group.intro}</p>}
            </div>
            <Questions items={group.items} />
          </section>
        </Container>
      ))}

      <Container className="space-y-12 pb-6 md:pb-10">
        {page.sources && (
          <section className={split}>
            <h2 className="text-18 font-semibold text-sg">Fonti</h2>
            <ul className="space-y-3">
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
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.related.map((href) => {
              const other = landingByPath(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group block h-full rounded-14 bg-white p-5 shadow-surface-1"
                  >
                    <span className="block text-13 text-sand-ink">{other.kicker}</span>
                    <span className="mt-1 block text-16 font-semibold text-sg group-hover:underline">
                      {other.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
      <CtaBand
        title="Parliamone guardando il tuo caso"
        text="Una chiamata conoscitiva di 45 minuti, oppure un caffè nella nostra sede di Treviso. Guardiamo il problema insieme, e se non siamo le persone giuste te lo diciamo."
        href={BOOK}
        label={BOOK_LABEL}
      />
    </div>
  );
}
