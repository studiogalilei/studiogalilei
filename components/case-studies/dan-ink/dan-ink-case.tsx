import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, Funnel, Network, Scale, Target } from "@/components/icons";
import { ApplyCta } from "@/components/sections/apply-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/cn";

const ARTICLE_URL =
  "https://www.iltempo.it/general/2025/12/01/news/dan-ink-e-christopher-da-n-il-franchising-che-in-poco-piu-di-un-anno-si-impone-come-leader-nazionale-nel-settore-tattoo-45220136/";

const analysisIcons = { target: Target, scale: Scale, network: Network, funnel: Funnel };

type Stat = { value: string; label: string; short?: string };
type Intro = {
  lead: string;
  caption: string;
  articleDate: string;
  articleCta: string;
  articleCtaFull: string;
  startedOn: string;
  goalsTitle: string;
  goals: string[];
};
type Method = {
  problemsTitle: string;
  problems: { label: string; text: string }[];
  analysesTitle: string;
  analyses: { icon: keyof typeof analysisIcons; title: string; desc: string }[];
};
type Results = {
  title: string;
  text: string;
  beforeLabel: string;
  afterLabel: string;
  bars: { group: string; before: number; after: number }[];
  notesTitle: string;
  notes: string[];
  calculation: {
    title: string;
    intro: string;
    rows: { label: string; formula: string; value: string }[];
    unit: string;
    comparison: string;
    takeaway: string;
  };
  statusesTitle: string;
  statusesText: string;
  statuses: { title: string; desc: string }[];
};

const navyCard = "relative isolate bg-field-navy shadow-surface-dark";
const checkItem = "flex gap-3 text-15.5 leading-1.65 text-ink/75";

function CheckIcon() {
  return <Check size={18} className="mt-1 flex-none text-sg" aria-hidden="true" />;
}

/** Dän Ink case study: tattoo franchise lead generation. */
export function DanInkCase() {
  const t = useTranslations("CaseDanInk");
  const stats = t.raw("stats") as Stat[];
  return (
    <>
      <h1 className="sr-only">
        {t("ui.srTitle")} {t("clientName")}: {t("title")}
      </h1>
      <ClientSection />
      <section aria-label={t("ui.statsLabel")} className="bg-white pb-16 md:pb-20">
        <Container>
          <div className="-mt-6 mb-14 md:-mt-8 md:mb-20">
            <ApplyCta />
          </div>
          <ul className="grid grid-cols-2 justify-items-center gap-6 md:gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="grid aspect-square w-full max-w-[240px] place-items-center rounded-full bg-sg-deep bg-[radial-gradient(circle_at_32%_26%,#96b4ff73,#96b4ff00_45%),radial-gradient(circle_at_70%_80%,#0206288c,#02062800_60%),linear-gradient(#040f4d8c,#040f4d8c),url(/images/venezia-notte.jpg)] bg-cover bg-center p-6 text-center text-white shadow-[inset_0_-14px_30px_#01041e73,inset_0_10px_24px_#ffffff14,0_30px_50px_-22px_#040f4d8c]"
              >
                <div>
                  <p className="text-[2.1rem] leading-none font-semibold tracking-[-0.04em] md:text-2.8rem">
                    {stat.value}
                  </p>
                  <p className="mx-auto mt-3 max-w-[10rem] text-13 leading-snug text-white/80 md:text-14">
                    {stat.short ?? stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <MethodSection />
      <ResultsSection />
      <section className="bg-white pt-6 pb-20 md:pt-8 md:pb-28">
        <Container>
          <div
            className={cn(
              navyCard,
              "flex flex-col items-center overflow-hidden rounded-22 px-8 py-14 text-center text-white md:px-14 md:py-20",
            )}
          >
            <h2 className="max-w-[44rem] text-2rem leading-1.15 font-semibold -tracking-2 text-balance md:text-2.6rem">
              {t("cta.title")}
            </h2>
            <ButtonLink
              href="/contatti"
              variant="light"
              className="mt-10 rounded-14 px-8 py-5 text-18 md:px-12 md:py-6 md:text-[21px]"
            >
              {t("cta.button")}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function ClientSection() {
  const t = useTranslations("CaseDanInk");
  const intro = t.raw("intro") as Intro;
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 [&>*]:min-w-0">
          <div className="flex min-w-0 flex-col">
            <h2 className="text-2rem leading-[1.12] font-semibold tracking-tight text-balance md:text-2.6rem">
              <a
                href={ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline text-sg underline decoration-2 underline-offset-[6px] hover:decoration-[3px]"
              >
                {intro.articleCtaFull}
                <ArrowUpRight
                  className="ml-1 inline-block size-[0.8em] align-[-0.05em]"
                  aria-hidden="true"
                />
              </a>
            </h2>
            <p className="mt-4 text-15 font-medium text-ink/60">{intro.startedOn}</p>
            <p className="mt-8 text-18 leading-1.75 text-ink/85">{intro.lead}</p>
            <div className="flex flex-1 items-center justify-center py-10 lg:py-8">
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
              <img
                src="/images/logos/dan-ink-esteso.webp"
                alt={t("ui.logoAlt")}
                className="block h-auto w-[220px] max-w-full md:w-[260px]"
                loading="lazy"
              />
            </div>
            <div className="rounded-20 bg-pale px-7 py-8 md:px-9 md:py-9">
              <p className="text-15 text-ink/65">{intro.goalsTitle}</p>
              <ol className="mt-5 space-y-4">
                {intro.goals.map((goal, i) => (
                  <li key={goal} className="flex items-center gap-4">
                    <span className="grid size-9 flex-none place-items-center rounded-10 bg-sg text-16 font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0 text-[1.15rem] leading-snug font-semibold -tracking-1 [overflow-wrap:anywhere] text-sg min-[380px]:text-[1.3rem] md:text-1.5rem">
                      {goal}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figure className="self-start overflow-hidden rounded-18 border border-sg/12 bg-white shadow-[0_24px_48px_-24px_rgba(6,23,115,.18)]">
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={`${intro.articleCta} ${t("ui.articleOn")}, ${intro.articleDate}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
              <img
                src="/images/casi-studio/dan-ink.webp"
                alt={intro.caption}
                className="block h-auto w-full"
                loading="lazy"
              />
            </a>
            <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-sg/10 px-6 py-4">
              <span className="text-14.5 text-ink/65">Il Tempo, {intro.articleDate}</span>
              <a
                href={ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-sg pb-0.5 text-16 font-medium text-sg hover:border-b-2"
              >
                {intro.articleCta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

function MethodSection() {
  const t = useTranslations("CaseDanInk");
  const method = t.raw("method") as Method;
  return (
    <Section tone="white" className="pt-0 md:pt-4">
      <Container>
        <SectionHeading title={method.problemsTitle} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <ul className="space-y-5">
              {method.problems.map((problem) => (
                <li key={problem.label} className={checkItem}>
                  <CheckIcon />
                  <span>
                    <strong className="font-semibold text-sg">{problem.label}</strong>{" "}
                    {problem.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="sr-only">{method.analysesTitle}</h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {method.analyses.map((analysis) => {
                const Icon = analysisIcons[analysis.icon];
                return (
                  <li key={analysis.title} className={cn(navyCard, "rounded-2xl p-6 text-white")}>
                    <h4 className="flex items-center gap-2.5 text-16 font-semibold text-white">
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="flex-none text-white"
                        aria-hidden="true"
                      />
                      {analysis.title}
                    </h4>
                    <p className="mt-2 text-14.5 leading-1.65 text-white/75">{analysis.desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ResultsSection() {
  const t = useTranslations("CaseDanInk");
  const results = t.raw("results") as Results;
  const { calculation } = results;
  const max = Math.max(...results.bars.flatMap((bar) => [bar.before, bar.after]));
  return (
    <Section tone="white" className="pb-10 md:pb-12">
      <Container>
        <SectionHeading title={results.title} intro={results.text} />
        <div className="mt-12 rounded-18 bg-white p-6 shadow-surface-2 md:p-10">
          <div className="space-y-8">
            {results.bars.map((bar) => (
              <div key={bar.group} className="space-y-3">
                {(["before", "after"] as const).map((when) => (
                  <div
                    key={when}
                    className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-4 sm:grid-cols-[9rem_1fr_3.5rem]"
                  >
                    <span className="text-14 text-ink/70">
                      {bar.group}, {when === "before" ? results.beforeLabel : results.afterLabel}
                    </span>
                    <div className="h-8 w-full">
                      <div
                        className={cn(
                          "h-full rounded-[6px]",
                          when === "before" ? "border border-sg/60 bg-pale" : "bg-sg",
                        )}
                        style={{ width: `${(bar[when] / max) * 100}%` }}
                      />
                    </div>
                    <span className="text-right text-16 font-semibold text-sg">{bar[when]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 max-w-[56rem]">
          <h3 className="text-18 font-semibold text-sg">{results.notesTitle}</h3>
          <ul className="mt-6 space-y-5">
            {results.notes.map((note) => (
              <li key={note} className={checkItem}>
                <CheckIcon />
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={cn(
            navyCard,
            "mt-10 overflow-hidden rounded-20 px-6 py-10 text-white md:px-12 md:py-12",
          )}
        >
          <h3 className="text-[1.4rem] font-semibold -tracking-1.5">{calculation.title}</h3>
          <p className="mt-2 text-15 text-white/70">{calculation.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-stretch">
            {calculation.rows.map((row) => (
              <div
                key={row.label}
                className="rounded-14 border border-white/15 bg-white/[0.06] p-5"
              >
                <p className="text-12 font-semibold tracking-8 text-cream uppercase">{row.label}</p>
                <p className="mt-2 text-15 text-white/80">{row.formula}</p>
                <p className="mt-3 text-2rem leading-none font-semibold">{row.value}</p>
                <p className="mt-1 text-13 text-white/60">{calculation.unit}</p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-14 bg-white p-5 text-sg">
              <p className="text-12 font-semibold tracking-8 text-sg/60 uppercase">
                {t("ui.comparison")}
              </p>
              <p className="mt-2 text-15 text-ink/70">{calculation.comparison}</p>
              <p className="mt-3 text-2rem leading-none font-semibold">{t("ui.multiplier")}</p>
            </div>
          </div>
          <p className="mt-10 max-w-[44rem] text-1.5rem leading-snug font-semibold -tracking-1.5 md:text-1.75rem">
            {calculation.takeaway}
          </p>
        </div>
        <div className="mt-14">
          <h3 className="text-18 font-semibold text-sg">{results.statusesTitle}</h3>
          <p className="mt-3 text-15.5 leading-1.65 text-ink/65">{results.statusesText}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {results.statuses.map((status) => (
              <li key={status.title} className="rounded-14 bg-pale p-5">
                <h4 className="text-15.5 font-semibold text-sg">{status.title}</h4>
                <p className="mt-1 text-14 leading-snug text-ink/65">{status.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
