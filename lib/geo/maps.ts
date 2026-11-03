import "server-only";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection } from "geojson";
import { countries, workedIn } from "./world";

/*
 * The flat world maps, as standalone SVG files (app/maps/*.svg, prerendered at build time).
 * Served as images rather than inlined, they stay out of the HTML and its RSC payload (≈180
 * country outlines, twice over), get cached by the browser and are rasterized once.
 */

const WIDTH = 960;
const HEIGHT = 500;
const land = countries.filter((c) => c.id !== "010"); // without Antarctica
const world: FeatureCollection = { type: "FeatureCollection", features: land };
const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));

function svg(body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">${body}</svg>`;
}

/** "We Work WorldWide" map: the countries and places we have worked in. */
export function worldMapSvg() {
  const projection = geoNaturalEarth1().fitExtent(
    [
      [6, 6],
      [WIDTH - 6, HEIGHT - 6],
    ],
    world,
  );
  const path = geoPath(projection).digits(2);
  const shapes = land
    .map(
      (country) =>
        `<path d="${path(country) ?? ""}" fill="${highlighted.has(String(country.id)) ? "#061773" : "#DCE1EC"}"/>`,
    )
    .join("");
  const pins = workedIn
    .map((place) => {
      const point = projection([place.lon, place.lat]);
      return point
        ? `<g transform="translate(${point[0].toFixed(2)},${point[1].toFixed(2)})"><circle r="13" fill="#0689FF" opacity="0.45" filter="url(#g)"/><circle r="5.5" fill="#061773" stroke="#FFFFFF" stroke-width="2"/></g>`
        : "";
    })
    .join("");
  return svg(
    `<defs><filter id="g" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter></defs>` +
      `<path d="${path(geoGraticule10()) ?? ""}" fill="none" stroke="#061773" stroke-opacity="0.05" stroke-width="0.8"/>` +
      `<g stroke="#FFFFFF" stroke-width="0.6">${shapes}</g>${pins}`,
  );
}

/** Pale world map behind the intro of the tour operator case study. */
export function worldBackdropSvg() {
  const path = geoPath(
    geoNaturalEarth1().fitExtent(
      [
        [4, 4],
        [WIDTH - 4, HEIGHT - 4],
      ],
      world,
    ),
  ).digits(2);
  return svg(`<path d="${path(world) ?? ""}" fill="#E4E7ED" stroke="#FFFFFF" stroke-width="0.6"/>`);
}

export function svgResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
