import { useTranslations } from "next-intl";
import {
  AdsBackdrop,
  CompassBackdrop,
  ItalianFlag,
  ItalyBackdrop,
} from "@/components/case-studies/backdrops";
import { CaseScreen } from "@/components/case-studies/case-screen";
import { CoffeeCta } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("caseStudies");

type Logo = { src: string; alt: string; height: number };

function CaseVisual({
  href,
  center,
  children,
}: {
  href: string;
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      tabIndex={-1}
      aria-hidden="true"
      className={cn(
        "group block overflow-hidden rounded-18 bg-white shadow-surface-2",
        center && "self-center",
      )}
    >
      {children}
    </Link>
  );
}

function CaseImage({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site
    <img
      src={src}
      alt=""
      className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
      loading="lazy"
    />
  );
}

function CaseStudy({
  href,
  wide,
  visual,
  backdrop,
  logos,
  line,
}: {
  href: string;
  wide?: boolean;
  visual: React.ReactNode;
  backdrop: React.ReactNode;
  logos: Logo[];
  line: React.ReactNode;
}) {
  const t = useTranslations("CaseStudies");
  return (
    <article
      className={cn(
        "grid items-center gap-10 md:gap-16",
        wide ? "md:grid-cols-[minmax(0,500px)_1fr]" : "md:grid-cols-[minmax(0,420px)_1fr]",
      )}
    >
      {visual}
      <div className="relative isolate flex min-h-[460px] flex-col items-center justify-center px-4 py-12 text-center md:min-h-[560px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,rgba(150,158,176,.36),rgba(150,158,176,.15)_55%,transparent)] blur-2xl" />
          {backdrop}
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-[-30%] inset-y-[-55%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,1),rgba(255,255,255,.85)_55%,transparent)] blur-md"
          />
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {logos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                style={{ height: logo.height }}
                className="block w-auto"
              />
            ))}
          </div>
        </div>
        <p className="mt-7 max-w-[36rem] text-[1.35rem] leading-snug font-semibold -tracking-1.5 text-balance text-ink md:text-1.6rem">
          {line}
        </p>
        <ButtonLink href={href} className="mt-8">
          {t("seeFullCaseStudy")}
        </ButtonLink>
      </div>
    </article>
  );
}

export default function CaseStudiesPage() {
  const t = useTranslations("CaseStudies");
  const br = () => <br />;
  return (
    <>
      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-ink text-white md:aspect-[3024/1207] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
        <img
          src="/images/casi-studio/banner.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_58%] md:bottom-auto md:h-auto md:-translate-y-[41.17%] md:object-fill"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/35 to-black/20"
          aria-hidden="true"
        />
        <Container className="pt-32 pb-16 md:pb-20">
          <h1 className="max-w-[46rem] text-2rem leading-[1.3] font-semibold -tracking-3 sm:text-2.4rem md:text-[3.6rem]">
            <span className="bg-sg/85 [box-decoration-break:clone] px-[0.18em] py-[0.04em] [-webkit-box-decoration-break:clone]">
              {t.rich("heroTitle", {
                muted: (chunks) => <span className="text-[#B4BAC6]">{chunks}</span>,
                br,
              })}
            </span>
          </h1>
        </Container>
      </section>
      <section className="overflow-x-clip bg-white py-20 md:py-28">
        <Container className="space-y-16 md:space-y-24">
          <CaseStudy
            href="/casi-studio/dan-ink"
            visual={
              <CaseVisual href="/casi-studio/dan-ink">
                <CaseImage src="/images/casi-studio/dan-ink.webp" />
              </CaseVisual>
            }
            backdrop={<ItalyBackdrop />}
            logos={[{ src: "/images/logos/dan-ink-esteso.webp", alt: "Dän Ink", height: 76 }]}
            line={t.rich("danInkLine", { flag: () => <ItalianFlag label={t("italy")} /> })}
          />
          <CaseStudy
            href="/casi-studio/onlysolutions"
            wide
            visual={
              <CaseVisual href="/casi-studio/onlysolutions" center>
                <CaseImage src="/images/casi-studio/onlysolutions.webp" />
              </CaseVisual>
            }
            backdrop={<AdsBackdrop />}
            logos={[
              {
                src: "/images/logos/only-solutions-esteso.webp",
                alt: "Only Solutions",
                height: 92,
              },
            ]}
            line={t.rich("onlySolutionsLine", { br })}
          />
          <CaseStudy
            href="/casi-studio/tour-operator"
            wide
            visual={
              <CaseVisual href="/casi-studio/tour-operator" center>
                <div className="transition-transform duration-500 group-hover:scale-[1.015]">
                  <CaseScreen screen="overview" />
                </div>
              </CaseVisual>
            }
            backdrop={<CompassBackdrop />}
            logos={[
              { src: "/images/logos/beavita-tours-esteso.webp", alt: "BeaVita Tours", height: 66 },
              {
                src: "/images/logos/fundallas-tours-esteso.webp",
                alt: "FunDallas Tours",
                height: 40,
              },
            ]}
            line={t.rich("tourOperatorLine", { br })}
          />
        </Container>
      </section>
      <CoffeeCta />
    </>
  );
}
