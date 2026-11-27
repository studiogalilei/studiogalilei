import { useTranslations } from "next-intl";
import { Check } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { workedIn } from "@/lib/geo/world";

/** "We Work WorldWide": world map with the countries and places we have worked in. */
export function WorldMap() {
  const t = useTranslations("WorldMap");
  return (
    <section className="bg-white pt-4 pb-24 md:pb-32">
      <Container>
        <p className="flex items-center justify-center gap-3 text-15 font-semibold tracking-[0.18em] text-sg/70 uppercase lg:justify-start">
          <span
            className="grid size-7 flex-none place-items-center rounded-[7px] bg-sg"
            aria-hidden="true"
          >
            <Check size={16} strokeWidth={3} className="text-white" />
          </span>
          We Work WorldWide
        </p>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_260px] lg:gap-16">
          {/* a prerendered SVG file (lib/geo/maps.ts): no map markup in the page */}
          {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG: nothing to optimize */}
          <img
            src="/maps/world.svg"
            alt={t("mapLabel")}
            width={960}
            height={500}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          <ul className="mx-auto grid w-full max-w-[380px] grid-cols-2 gap-x-6 gap-y-4 lg:mx-0 lg:grid-cols-1">
            {workedIn.map((place) => (
              <li key={place.key} className="flex items-center gap-3 text-16 font-medium text-sg">
                <span
                  className="grid size-6 flex-none place-items-center rounded-full bg-sg"
                  aria-hidden="true"
                >
                  <Check size={14} strokeWidth={3} className="text-white" />
                </span>
                {t(place.key)}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
