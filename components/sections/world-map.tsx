import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { useTranslations } from "next-intl";
import { Check } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { countries, workedIn } from "@/lib/geo/world";

const WIDTH = 960;
const HEIGHT = 500;

// Rendered once at build time: no map code is shipped to the browser.
const land = countries.filter((c) => c.id !== "010"); // without Antarctica
const projection = geoNaturalEarth1().fitExtent(
  [
    [6, 6],
    [WIDTH - 6, HEIGHT - 6],
  ],
  { type: "FeatureCollection", features: land },
);
const path = geoPath(projection).digits(2);
const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));

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
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="block h-auto w-full"
            role="img"
            aria-label={t("mapLabel")}
          >
            <defs>
              <filter id="map-pin-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            <path
              d={path(geoGraticule10()) ?? ""}
              fill="none"
              stroke="#061773"
              strokeOpacity="0.05"
              strokeWidth="0.8"
            />
            {land.map((country, i) => (
              <path
                key={i}
                d={path(country) ?? ""}
                fill={highlighted.has(String(country.id)) ? "#061773" : "#DCE1EC"}
                stroke="#FFFFFF"
                strokeWidth="0.6"
              />
            ))}
            {workedIn.map((place) => {
              const point = projection([place.lon, place.lat]);
              return point ? (
                <g key={place.key} transform={`translate(${point[0]},${point[1]})`}>
                  <circle r="13" fill="#0689FF" opacity="0.45" filter="url(#map-pin-glow)" />
                  <circle r="5.5" fill="#061773" stroke="#FFFFFF" strokeWidth="2" />
                </g>
              ) : null;
            })}
          </svg>
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
