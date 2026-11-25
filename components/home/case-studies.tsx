import { useTranslations } from "next-intl";
import { ItalianFlag } from "@/components/case-studies/backdrops";
import { CaseScreen } from "@/components/case-studies/case-screen";
import { ChevronRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

const CASES = [
  {
    key: "tourOperator",
    href: "/casi-studio/tour-operator",
    image: null,
    logo: "/images/logos/beavita-tours-esteso.webp",
    logoAlt: "BeaVita Tours",
  },
] as const;

/** Case studies teaser: banner photo and our software cases (the marketing ones came out on 25/11/2026). */
export function CaseStudies() {
  const t = useTranslations("Home.cases");
  return (
    <section className="bg-white py-[72px] md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 text-14 font-medium text-sand-ink">{t("kicker")}</p>
            <h2 className="max-w-[34rem] text-2rem leading-[1.12] font-semibold tracking-tight text-balance text-sg md:text-2.6rem">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[36rem] text-17 leading-1.7 text-ink/65">{t("text")}</p>
            <ButtonLink href="/casi-studio" variant="outline" className="mt-8">
              {t("all")}
            </ButtonLink>
          </div>
          <div
            data-no-tilt
            className="-mx-6 mt-[18px] flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-3.5 overflow-x-auto px-6 pt-1 pb-2.5 md:mx-0 md:mt-0 md:grid md:grid-cols-1 md:gap-5 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
          >
            {CASES.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group flex w-full flex-none snap-start flex-col overflow-hidden rounded-18 border border-sg/10 bg-white shadow-[0_16px_34px_-26px_rgba(6,23,115,.55)] transition-[transform,box-shadow] duration-200 ease-[ease] hover:[transform:translateY(-2px)] hover:shadow-[0_22px_40px_-24px_rgba(6,23,115,.6)] md:w-auto"
              >
                <div
                  aria-hidden="true"
                  className="relative h-[190px] overflow-hidden border-b border-sg/8 bg-pale [&>:not(img)]:pointer-events-none"
                >
                  {item.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        className="block h-full w-full object-cover object-top transition-transform duration-500 ease-[ease] group-hover:[transform:scale(1.03)]"
                      />
                    </>
                  ) : (
                    <CaseScreen screen="overview" />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-5 pt-5 pb-[22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
                  <img
                    src={item.logo}
                    alt={item.logoAlt}
                    loading="lazy"
                    className="block h-[34px] w-auto max-w-[70%] object-contain object-left"
                  />
                  <p className="mt-3.5 mb-0 flex-1 text-15.5 leading-[1.55] font-medium text-sg">
                    {t.rich(item.key, {
                      br: () => <br />,
                      flag: () => <ItalianFlag label={t("flag")} />,
                    })}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-14 font-semibold text-ai">
                    {t("readCase")}
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
