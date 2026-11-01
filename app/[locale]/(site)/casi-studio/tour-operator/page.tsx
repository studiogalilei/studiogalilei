import { useTranslations } from "next-intl";
import { CaseScreen, type ScreenName } from "@/components/case-studies/case-screen";
import { Flag, type FlagCode } from "@/components/case-studies/tour-operator/flag";
import { WorldBackdrop } from "@/components/case-studies/tour-operator/world-backdrop";
import { ArrowDown, Check, X } from "@/components/icons";
import { ApplyCta } from "@/components/sections/apply-cta";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("caseTourOperator");

const places: { code: FlagCode; key: string }[] = [
  { code: "tr", key: "turkey" },
  { code: "ch", key: "switzerland" },
  { code: "nl", key: "netherlands" },
  { code: "by", key: "belarus" },
  { code: "tx", key: "texas" },
  { code: "it", key: "italy" },
];

type AppScreen = { screen: ScreenName; tag: string; title: string; desc: string };

export default function TourOperatorCasePage() {
  const t = useTranslations("CaseTourOperator");
  const placeName = useTranslations("WorldMap");
  const screens = t.raw("app.screens") as AppScreen[];
  const beforeAfter = t.raw("results.beforeAfter") as [string, string][];
  const br = () => <br />;
  const label = "mb-1 block text-12 font-semibold tracking-8 uppercase md:hidden";

  return (
    <>
      <section className="bg-white pt-6 pb-8 md:pt-10 md:pb-10">
        <Container className="flex flex-col items-center text-center">
          <div className="relative grid w-full max-w-[68rem] place-items-center md:aspect-[960/500]">
            <WorldBackdrop />
            <div className="relative py-14 md:py-0">
              <p className="mx-auto max-w-[40rem] text-[20px] leading-[1.5] font-semibold -tracking-1 text-sg [text-shadow:0_0_18px_#fff,0_0_8px_#fff] md:text-[28px]">
                {t("intro")}
              </p>
              <ul className="mx-auto mt-8 flex max-w-[44rem] flex-wrap items-start justify-center gap-x-6 gap-y-5 md:mt-10 md:gap-x-9">
                {places.map(({ code, key }) => (
                  <li key={code} className="flex w-[4.75rem] flex-col items-center gap-2 md:w-auto">
                    <Flag code={code} className="h-[24px] w-[36px] md:h-[28px] md:w-[42px]" />
                    <span className="text-12.5 leading-tight font-medium text-sg/80 [text-shadow:0_0_10px_#fff,0_0_4px_#fff] md:text-13.5">
                      {placeName(key)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="relative isolate bg-field-navy text-white">
        <Container className="py-12 text-center md:py-14">
          <p className="mx-auto max-w-[46rem] text-17 leading-1.7 text-white/90 md:text-19">
            {t.rich("below", {
              highlight: (chunks) => (
                <span className="font-semibold whitespace-nowrap text-[#3FA9FF]">
                  <ArrowDown
                    aria-hidden="true"
                    size={18}
                    strokeWidth={2.6}
                    className="mr-1 inline-block -translate-y-px align-middle"
                  />
                  {chunks}
                </span>
              ),
            })}
          </p>
        </Container>
      </section>
      <section className="bg-white pt-16 pb-14 md:pt-24 md:pb-20">
        <Container className="flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
            <img
              src="/images/logos/beavita-tours-esteso.webp"
              alt="BeaVita Tours"
              className="block h-[72px] w-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
            <img
              src="/images/logos/fundallas-tours-esteso.webp"
              alt="FunDallas Tours"
              className="block h-[50px] w-auto"
            />
          </div>
          <h1 className="mt-8 max-w-[56rem] text-2rem leading-1.15 font-semibold -tracking-3 text-balance text-ink md:text-2.8rem">
            {t.rich("title", { br })}
          </h1>
        </Container>
      </section>
      <Section tone="mist">
        <Container>
          <h2 className="text-2rem leading-1.1 font-semibold -tracking-3 text-sg md:text-2.6rem">
            {t("app.title")}
          </h2>
          <p className="mt-4 max-w-[40rem] text-16 leading-1.7 text-ink/60">{t("app.text")}</p>
          <div className="mt-14 space-y-14 md:space-y-20">
            {screens.map((s, i) => (
              <figure
                key={s.tag}
                className={
                  i % 2
                    ? "grid items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:[&>*:first-child]:order-2"
                    : "grid items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-14"
                }
              >
                <div className="overflow-hidden rounded-2xl bg-white shadow-surface-3">
                  <CaseScreen screen={s.screen} />
                </div>
                <figcaption>
                  <span className="inline-block rounded-full bg-pale px-3 py-1 text-12 font-semibold tracking-8 text-sg uppercase">
                    {s.tag}
                  </span>
                  <h3 className="mt-4 text-22 leading-snug font-semibold -tracking-1.5 text-sg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-16 leading-1.7 text-ink/70">{s.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>
      <section className="bg-mist pb-10 md:pb-16">
        <Container>
          <div className="mx-auto max-w-[44rem] pt-4 text-center md:pt-8">
            <h2 className="text-[1.8rem] leading-1.15 font-semibold tracking-tight text-balance text-sg md:text-2.4rem">
              {t.rich("digitalise", { br })}
            </h2>
            <p className="mt-4 text-[16.5px] leading-1.7 text-ink/65 md:text-[17.5px]">
              {t("taxCredits")}
            </p>
          </div>
          <div className="-mt-4 md:-mt-6">
            <ApplyCta label={t("recoverCta")} />
          </div>
        </Container>
      </section>
      <Section tone="white">
        <Container>
          <h2 className="text-2rem leading-1.1 font-semibold -tracking-3 text-sg md:text-2.6rem">
            {t("results.title")}
          </h2>
          <div className="mt-12 overflow-hidden rounded-18 bg-white shadow-surface-2">
            <div className="hidden grid-cols-2 border-b border-sg/10 bg-pale text-12 font-semibold tracking-8 text-sg uppercase md:grid">
              <p className="py-4 pr-8 pl-[4.5rem]">{t("before")}</p>
              <p className="border-l border-sg/10 py-4 pr-8 pl-[4.5rem]">{t("after")}</p>
            </div>
            {beforeAfter.map(([before, after]) => (
              <div
                key={before}
                className="grid border-b border-sg/10 last:border-b-0 md:grid-cols-2"
              >
                <div className="flex gap-4 px-6 py-5 md:px-8">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-ink/[0.07] text-ink/45"
                  >
                    <X size={14} strokeWidth={2.8} />
                  </span>
                  <p className="text-15.5 leading-1.65 text-ink/60">
                    <span className={`${label} text-sg/60`}>{t("before")}</span>
                    {before}
                  </p>
                </div>
                <div className="flex gap-4 px-6 pb-5 md:border-l md:border-sg/10 md:px-8 md:py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 flex-none place-items-center rounded-full bg-sg text-white"
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <p className="text-15.5 leading-1.65 font-medium text-ink/85">
                    <span className={`${label} text-sg`}>{t("after")}</span>
                    {after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <section className="bg-white pt-6 pb-12 md:pt-10 md:pb-16">
        <Container>
          <ul className="mx-auto w-fit max-w-full space-y-4 md:space-y-5">
            {[t("automate"), t("taxIncentives")].map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 text-[1.2rem] leading-[1.4] font-semibold -tracking-1.5 text-sg md:text-[1.55rem]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-7 flex-none place-items-center rounded-full bg-sg text-white md:mt-1 md:size-8"
                >
                  <Check size={17} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="-mt-4 md:-mt-6">
            <ApplyCta label={t("analysisCta")} />
          </div>
        </Container>
      </section>
    </>
  );
}
