import { useTranslations } from "next-intl";
import { ApplyCta } from "@/components/sections/apply-cta";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { StepNumber } from "@/components/ui/step-number";
import { cn } from "@/lib/cn";

type Translate = ReturnType<typeof useTranslations>;

function content(t: Translate) {
  return {
    kpi: [
      { value: t("revenueValue"), label: t("revenueLabel") },
      { value: t("adSpendValue"), label: t("adSpendLabel") },
      { value: t("ordersValue"), label: t("ordersLabel") },
      {
        value: t("roasValue"),
        label: t("roasLabel"),
      },
    ],
    kpi2: [
      { value: t("averageOrderValue"), label: t("averageOrderLabel") },
      {
        value: t("costPerOrderValue"),
        label: t("costPerOrderLabel"),
      },
      { value: t("googleAdsRoasValue"), label: t("googleAdsRoasLabel") },
      {
        value: "2/3",
        label: t("googleAdsShareLabel"),
      },
    ],
    context: [
      {
        title: t("contextTitle"),
        text: t("contextText"),
      },
      {
        title: t("situationTitle"),
        text: t("situationText"),
      },
      {
        title: t("goalTitle"),
        text: t("goalText"),
      },
    ],
    method: [
      {
        title: t("analysisTitle"),
        text: t("analysisText"),
      },
      {
        title: t("interventionTitle"),
        text: t("interventionText"),
      },
      {
        title: t("optimisationTitle"),
        text: t("optimisationText"),
      },
    ],
    platforms: [
      {
        name: "Shopify",
        image: "/images/casi-studio/onlysolutions-shopify.webp",
        alt: t("shopifyAlt"),
        caption: t("shopifyCaption"),
      },
      {
        name: "Google Ads",
        image: "/images/casi-studio/onlysolutions-google-ads.webp",
        alt: t("googleAdsAlt"),
        caption: t("googleAdsCaption"),
      },
    ],
  };
}

/** Grid cell borders: separators between the 2 columns (mobile) and the 4 columns (desktop). */
const kpiBorders = (i: number) =>
  cn(
    i % 2 && "border-l border-white/12",
    i > 1 && "border-t border-white/12 lg:border-t-0",
    i === 2 && "lg:border-l",
  );

const sectionTitle = "text-2rem leading-1.1 font-semibold -tracking-3 text-sg md:text-2.6rem";

/** Only Solutions case study: Google Ads and Meta Ads for a technology e-commerce. */
export function OnlySolutionsCase() {
  const t = useTranslations("CaseOnlySolutions");
  const data = content(t);
  return (
    <>
      <section className="bg-white pt-16 pb-14 md:pt-24 md:pb-16">
        <Container className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
          <img
            src="/images/logos/only-solutions-esteso.webp"
            alt="Only Solutions"
            className="block h-[84px] w-auto"
          />
          <h1 className="mt-8 max-w-[56rem] text-2rem leading-1.15 font-semibold -tracking-3 text-balance text-ink md:text-2.8rem">
            {t.rich("title", { br: () => <br /> })}
          </h1>
        </Container>
      </section>
      <section aria-label={t("resultsLabel")} className="bg-white pb-16 md:pb-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-22 bg-field-navy text-white shadow-surface-dark">
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {data.kpi.map((kpi, i) => (
                <div key={kpi.label} className={cn("px-5 py-9 md:px-8 md:py-11", kpiBorders(i))}>
                  <dd className="text-[1.45rem] leading-none font-semibold -tracking-3 whitespace-nowrap sm:text-1.75rem lg:text-1.75rem xl:text-[2.05rem]">
                    {kpi.value}
                  </dd>
                  <dt className="mt-3 text-14 leading-snug text-white/70">{kpi.label}</dt>
                </div>
              ))}
            </dl>
            <dl className="grid grid-cols-2 border-t border-white/12 bg-white/[0.04] lg:grid-cols-4">
              {data.kpi2.map((kpi, i) => (
                <div key={kpi.label} className={cn("px-6 py-6 md:px-9", kpiBorders(i))}>
                  <dd className="text-[1.3rem] leading-none font-semibold -tracking-2">
                    {kpi.value}
                  </dd>
                  <dt className="mt-2 text-13.5 leading-snug text-white/65">{kpi.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
      <Section tone="pale">
        <Container>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {data.context.map((item) => (
              <div key={item.title} className="border-t-2 border-sg pt-6">
                <h2 className="text-19 font-semibold text-sg">{item.title}</h2>
                <p className="mt-3 text-16 leading-1.75 text-ink/70">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <section className="bg-white pt-16 md:pt-20">
        <Container>
          <aside className="rounded-18 border border-sg/10 bg-white px-7 py-8 shadow-surface-2 md:px-10 md:py-10">
            <p className="text-13 font-semibold tracking-12 text-ai uppercase">
              {t("observation")}
            </p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-ink">
              <span className="text-2.4rem leading-none font-semibold -tracking-3 whitespace-nowrap text-sg md:text-[3rem]">
                {t("roi")}
              </span>
              <span className="text-[1.1rem] leading-snug text-ink/75 md:text-[1.25rem]">
                {t("roiText")}
              </span>
            </p>
            <div className="mt-8 rounded-14 border-2 border-sg bg-pale px-6 py-6 md:px-8 md:py-7">
              <p className="text-12 font-semibold tracking-14 text-sg/60 uppercase">
                {t("principleTitle")}
              </p>
              <p className="mt-2 text-[1.25rem] leading-snug font-semibold -tracking-1 text-balance text-sg md:text-1.5rem">
                {t("principleText")}
              </p>
            </div>
          </aside>
          <div className="mt-10 -mb-10 md:mt-12 md:-mb-16">
            <ApplyCta />
          </div>
        </Container>
      </section>
      <Section tone="white">
        <Container>
          <h2 className={sectionTitle}>{t("methodTitle")}</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {data.method.map((step, i) => (
              <li key={step.title} className="rounded-18 bg-white p-7 shadow-surface-2">
                <StepNumber n={i + 1} />
                <h3 className="mt-5 text-17 font-semibold text-sg">{step.title}</h3>
                <p className="mt-2 text-15 leading-1.7 text-ink/65">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <h2 className={sectionTitle}>{t("platformsTitle")}</h2>
          <div className="mt-12 grid gap-14">
            {data.platforms.map((platform) => (
              <figure key={platform.name}>
                <div className="overflow-hidden rounded-18 bg-white shadow-surface-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
                  <img
                    src={platform.image}
                    alt={platform.alt}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-5 grid gap-1 md:grid-cols-[14rem_1fr] md:gap-8">
                  <span className="text-15 font-semibold text-sg">{platform.name}</span>
                  <span className="text-15.5 leading-1.7 text-ink/70">{platform.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} label={t("ctaLabel")} />
    </>
  );
}
