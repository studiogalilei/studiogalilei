import { useTranslations } from "next-intl";
import { PrincipleIcon } from "@/components/about/principle-icon";
import { JsonLd } from "@/components/landing/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const generateMetadata = () => pageMetadata("about");

type Principle = { title: string; desc: string };
type Fact = { label: string; value: string };

const about = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/chi-siamo`,
  name: "Studio Galilei Srl",
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

/** Who Studio Galilei Srl is, in plain facts: the page that tells us apart from namesakes. */
export default function AboutPage() {
  const t = useTranslations("About");
  const principles = t.raw("principles") as Principle[];
  const facts: Fact[] = [
    { label: t("facts.legalName"), value: company.legalName },
    {
      label: t("facts.office"),
      value: `${company.street}, ${company.zip} ${company.city} (${t("facts.province")})`,
    },
    { label: t("vatAndTaxCode"), value: company.vat },
    { label: t("facts.founded"), value: "2024" },
    { label: t("facts.ledBy"), value: t("facts.ledByValue") },
    { label: t("facts.does"), value: t("facts.doesValue") },
    { label: t("facts.forWhom"), value: t("facts.forWhomValue") },
    { label: t("facts.where"), value: t("facts.whereValue") },
    { label: t("facts.prices"), value: t("facts.pricesValue") },
  ];

  return (
    <>
      <JsonLd data={about} />
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Container className="relative z-2 -mt-18 md:-mt-22">
        <div className="overflow-hidden rounded-18 bg-white shadow-surface-3">
          <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white p-6 md:p-7">
                <dt className="text-13 font-medium text-sand-ink">{fact.label}</dt>
                <dd className="mt-1.5 text-16 leading-1.65 font-medium text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line bg-sand px-6 py-5 md:px-7">
            <ButtonLink href="/#sg-prenota">{t("book")}</ButtonLink>
            <p className="max-w-[40rem] text-14 leading-1.65 text-ink/65">{t("namesakes")}</p>
          </div>
        </div>
      </Container>

      <Section>
        <Container className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading title={t("responsibilityTitle")} />
            <p className="mt-5 text-17 leading-1.7 text-ink/65">{t("responsibilityText")}</p>
            <p className="mt-5 text-17 leading-1.7 text-ink/65">{t("story")}</p>
            <p className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-16 font-medium">
              {(
                [
                  ["/metodo", "linkMethod"],
                  ["/casi-studio", "linkCases"],
                  ["/servizi", "linkServices"],
                ] as const
              ).map(([href, key]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {t(key)}
                </Link>
              ))}
            </p>
          </div>
          <div className="self-start">
            <h2 className="text-14 font-semibold tracking-widest text-sg/60 uppercase">
              {t("method")}
            </h2>
            <ul className="mt-2 divide-y divide-sg/10">
              {principles.map((principle, i) => (
                <li key={principle.title} className="py-7 first:pt-5">
                  <h3 className="flex items-center gap-3 text-18 font-semibold text-sg">
                    <PrincipleIcon index={i} />
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-15.5 leading-1.7 text-ink/65">{principle.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <section className="bg-sand py-16 md:py-24">
        <Container>
          <figure className="max-w-[54rem]">
            <blockquote className="text-[1.9rem] leading-1.15 font-semibold -tracking-3 text-balance text-sg md:text-[2.8rem]">
              {t("quote")}
            </blockquote>
            <figcaption className="mt-6 text-16 leading-1.7 text-ink/65">
              {t("quoteNote")}
            </figcaption>
          </figure>
        </Container>
      </section>

      <CtaBand title={t("ctaTitle")} text={t("ctaText")} href="/#sg-prenota" label={t("book")} />
    </>
  );
}
