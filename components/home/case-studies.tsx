import { useTranslations } from "next-intl";
import { ItalianFlag } from "@/components/case-studies/backdrops";
import { CaseScreen } from "@/components/case-studies/case-screen";
import { ChevronRight } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

const CASES = [
  {
    key: "danInk",
    href: "/casi-studio/dan-ink",
    image: "/images/casi-studio/dan-ink.webp",
    logo: "/images/logos/dan-ink-esteso.webp",
    logoAlt: "Dän Ink",
  },
  {
    key: "onlySolutions",
    href: "/casi-studio/onlysolutions",
    image: "/images/casi-studio/onlysolutions.webp",
    logo: "/images/logos/only-solutions-esteso.webp",
    logoAlt: "Only Solutions",
  },
  {
    key: "tourOperator",
    href: "/casi-studio/tour-operator",
    image: null,
    logo: "/images/logos/beavita-tours-esteso.webp",
    logoAlt: "BeaVita Tours",
  },
] as const;

/** Case studies teaser: banner photo and the three cases (a swipeable row on phones). */
export function CaseStudies() {
  const t = useTranslations("Home.cases");
  return (
    <section className="bg-white py-[72px] md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-22 bg-ink after:absolute after:inset-0 after:bg-linear-to-t after:from-[rgba(4,15,77,.9)] after:via-[rgba(4,15,77,.25)] after:via-60% after:to-[rgba(4,15,77,.05)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
          <img
            src="/images/casi-studio/banner.webp"
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="block h-[240px] w-full object-cover object-[50%_58%] md:h-[380px]"
          />
          <div className="absolute inset-x-0 bottom-0 z-1 p-6 text-white md:p-10">
            <p className="m-0 text-14 font-medium text-cream">{t("kicker")}</p>
            <h2 className="mt-2 max-w-[34rem] text-[1.7rem] leading-1.15 font-semibold -tracking-2 md:text-[2.5rem]">
              {t("title")}
            </h2>
          </div>
        </div>
        <div
          data-no-tilt
          className="-mx-6 mt-[18px] flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-3.5 overflow-x-auto px-6 pt-1 pb-2.5 md:mx-0 md:mt-6 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
        >
          {CASES.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group flex w-[82%] flex-none snap-start flex-col overflow-hidden rounded-18 border border-sg/10 bg-white shadow-[0_16px_34px_-26px_rgba(6,23,115,.55)] transition-[transform,box-shadow] duration-200 ease-[ease] hover:[transform:translateY(-2px)] hover:shadow-[0_22px_40px_-24px_rgba(6,23,115,.6)] md:w-auto"
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
        <div className="mt-7 flex justify-center">
          <ButtonLink href="/casi-studio" variant="outline">
            {t("all")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
