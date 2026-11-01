import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import { countries } from "@/lib/geo/world";

const WIDTH = 960;
const HEIGHT = 500;

// Drawn once at build time: a pale world map behind the intro text.
const world: FeatureCollection = {
  type: "FeatureCollection",
  features: countries.filter((c) => c.id !== "010"), // without Antarctica
};
const d =
  geoPath(
    geoNaturalEarth1().fitExtent(
      [
        [4, 4],
        [WIDTH - 4, HEIGHT - 4],
      ],
      world,
    ),
  )(world) ?? "";

export function WorldBackdrop() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={d} fill="#E4E7ED" stroke="#FFFFFF" strokeWidth="0.6" />
    </svg>
  );
}
