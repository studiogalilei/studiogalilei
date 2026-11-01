import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const LOGOS = [
  { src: "sintesia", alt: "Sintesia", height: 35 },
  { src: "gr-box", alt: "GR Box", height: 36 },
  { src: "dan-ink", alt: "Dän Ink", height: 44 },
  { src: "beavita-tours", alt: "BeaVita Tours", height: 46 },
  { src: "vetreria-guarnieri", alt: "Vetreria Guarnieri", height: 60 },
  { src: "targa-racing", alt: "Targa Racing", height: 41 },
  { src: "marka", alt: "Marka, assistenza e vendita elettrodomestici", height: 31 },
  { src: "k01", alt: "K 01 Professional Diving Equipment", height: 35 },
  { src: "only-solutions", alt: "Only Solutions", height: 52 },
  { src: "fundallas-tours", alt: "FunDallas Tours", height: 40 },
];

function LogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        "flex min-h-16 items-center gap-[4.5rem] pr-[4.5rem] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0 max-md:gap-12 max-md:pr-12",
        duplicate && "motion-reduce:hidden",
      )}
    >
      {LOGOS.map((logo) => (
        <li key={logo.alt} className="flex flex-none items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy site */}
          <img
            src={`/images/logos/${logo.src}.webp`}
            alt={duplicate ? "" : logo.alt}
            style={{ height: logo.height }}
            className="block w-auto opacity-80 max-md:scale-[.8]"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}

/** "Some of the companies we have worked with": an endless logo strip over the hero edge. */
export function ClientLogos() {
  const t = useTranslations("Home.clients");
  return (
    <Container className="relative z-2 -mt-18 md:-mt-22">
      <section
        aria-label={t("label")}
        className="rounded-18 bg-white px-6 py-8 shadow-surface-3 md:px-10 md:py-10"
      >
        <p className="text-center text-14 text-ink/55">{t("title")}</p>
        <div className="mt-6">
          <div
            data-no-tilt
            className="group overflow-hidden [mask-image:linear-gradient(90deg,#0000,#000_7%,#000_93%,#0000)] motion-reduce:[mask-image:none]"
          >
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto">
              <LogoRow />
              <LogoRow duplicate />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
