import { useTranslations } from "next-intl";
import { Download } from "@/components/icons";
import { ButtonLink, DownloadLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { presentationPdf } from "@/lib/company";
import { HeroTiles } from "./hero-tiles";
import { ScrollToBooking } from "./scroll-to-booking";

export function Hero() {
  const t = useTranslations("Home.hero");
  return (
    // the header floats over the hero here, hence the extra 72px of top padding
    <section className="relative isolate overflow-hidden bg-sg-deep pt-[176px] pb-40 text-white md:pt-[208px] md:pb-56">
      {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
      <img
        src="/images/hero-venezia.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_88%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-sg-deep/90 via-sg-deep/80 to-sg-deep/60"
      />
      <Container className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
        <div className="max-w-[36rem]">
          <h1 className="text-2.6rem leading-[1.06] font-semibold tracking-[-0.035em] md:text-[3.9rem]">
            {t.rich("title", { partner: (chunks) => <span>{chunks}</span>, br: () => <br /> })}
          </h1>
          <p className="mt-7 text-18 leading-1.7 text-white/78">{t("intro")}</p>
          <div className="mt-10 flex flex-wrap gap-3 max-sm:grid">
            <DownloadLink
              href={presentationPdf.href}
              filename={presentationPdf.filename}
              variant="light"
              className="max-sm:w-full"
            >
              <Download size={17} strokeWidth={2.2} aria-hidden="true" />
              {t("download")}
            </DownloadLink>
            <ScrollToBooking>
              <ButtonLink href="/contatti" variant="ghost-light" className="max-sm:w-full">
                {t("bookCall")}
              </ButtonLink>
            </ScrollToBooking>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[520px] md:max-w-none md:pl-10">
          <HeroTiles />
        </div>
      </Container>
    </section>
  );
}
