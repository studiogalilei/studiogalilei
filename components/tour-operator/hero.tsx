import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { CaseLink } from "./case-controls";
import { ContactButton } from "./contact-button";
import { Showcase } from "./showcase";
import { ctaDot, ctaNote } from "./ui";

const richTags = {
  b: (chunks: React.ReactNode) => <b>{chunks}</b>,
  em: (chunks: React.ReactNode) => <em>{chunks}</em>,
};

export function Hero() {
  const t = useTranslations("TourOperator");
  const rich = (key: string) => t.rich(key, richTags);
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-sg-deep pt-14 pb-[88px] text-white max-tour-md:pt-8 max-tour-md:pb-16 max-tour-sm:pt-[18px] max-tour-sm:pb-12"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
      <img
        src="/images/tour-operator/hero-bg.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-3 size-full object-cover object-[50%_88%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-2 bg-[radial-gradient(60%_70%_at_78%_30%,rgba(6,137,255,0.28),transparent_70%),linear-gradient(rgba(4,15,77,0.95),rgba(4,15,77,0.86)_55%,rgba(4,15,77,0.74))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-1 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:56px_56px] opacity-50 [mask:radial-gradient(70%_60%_at_70%_40%,#000,transparent)]"
      />
      <div
        className={cn(
          "mx-auto w-full max-w-[1320px] px-10 max-tour-sm:px-[18px]",
          "relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)] grid-rows-[auto_1fr] items-center gap-x-14 gap-y-0 [grid-template-areas:'head_show'_'cta_show']",
          "max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:grid-rows-[auto] max-tour-md:gap-x-11 max-tour-md:gap-y-8 max-tour-md:[grid-template-areas:'head'_'show'_'cta']",
          "max-tour-sm:gap-x-[22px] max-tour-sm:gap-y-5",
        )}
      >
        <div className="self-end [grid-area:head] max-tour-md:text-center max-tour-sm:text-left">
          <span className="mb-[22px] inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/6 py-1.5 pr-3.5 pl-1.5 text-13.5 text-white/86 max-tour-sm:hidden">
            <b className="rounded-full bg-cream px-2.5 py-[3px] text-12 font-semibold tracking-2 text-sg-deep">
              Live
            </b>
            {t("softwareSuMisuraPerTourOperator")}
          </span>
          <h1 className="mb-[22px] text-[3.15rem] leading-[1.05] font-semibold tracking-[-0.035em] text-white max-tour-md:text-[3rem] max-tour-sm:mb-3.5 max-tour-sm:text-[2.3rem] [&_em]:bg-[linear-gradient(90deg,#fff_0%,#bfe2ff_45%,var(--color-cream)_100%)] [&_em]:bg-clip-text [&_em]:text-transparent [&_em]:not-italic">
            {rich("tuttaLaGiornataDelTuoTour")}
          </h1>
          <p className="mb-8 max-w-[34rem] text-18 leading-1.7 text-white/78 max-tour-md:mx-auto max-tour-sm:mb-6 max-tour-sm:text-16">
            {t("prenotazioniPartenzeAutistiGuide")}
          </p>
        </div>
        <Showcase />
        <div className="self-start [grid-area:cta] max-tour-md:mx-auto max-tour-md:w-full max-tour-md:max-w-[760px]">
          <div id="hero-cta" className="flex flex-wrap gap-3">
            <ContactButton kind="whatsapp" label={t("scriviciSuWhatsapp")} size="hero" />
            <ContactButton kind="email" label={t("scriviciUnaEmail")} size="hero" dark delayGlow />
          </div>
          <p className={cn(ctaNote, "text-white/70")}>
            <i aria-hidden="true" className={ctaDot} />
            {t("primaConversazioneSenzaImpegno")}
          </p>
          <div className="mt-[34px] flex flex-wrap items-center gap-x-[22px] gap-y-3.5 border-t border-white/12 pt-[26px] max-tour-sm:mt-[26px] max-tour-sm:gap-x-4 max-tour-sm:gap-y-3 max-tour-sm:pt-5">
            <span className="max-w-24 text-12.5 leading-[1.35] text-white/60 max-tour-sm:w-full max-tour-sm:max-w-none">
              {t("giaInUsoOgniGiornoDa")}
            </span>
            <CaseLink index={0}>
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
              <img
                src="/images/tour-operator/flag-usa.webp"
                alt="USA"
                width={570}
                height={370}
                className="h-[22px] w-auto rounded-[3px] max-tour-sm:h-[18px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
              <img
                src="/images/tour-operator/logo-fundallas.webp"
                alt="FunDallas Tours"
                width={403}
                height={69}
                className="h-6 w-auto max-tour-sm:h-[22px]"
              />
            </CaseLink>
            <CaseLink index={1}>
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
              <img
                src="/images/tour-operator/flag-italy.webp"
                alt="Italia"
                width={450}
                height={370}
                className="h-[22px] w-auto rounded-[3px] max-tour-sm:h-[18px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
              <img
                src="/images/tour-operator/logo-beavita.webp"
                alt="BeaVita Tours"
                width={600}
                height={195}
                className="h-[38px] w-auto max-tour-sm:h-9"
              />
            </CaseLink>
          </div>
        </div>
      </div>
    </section>
  );
}
