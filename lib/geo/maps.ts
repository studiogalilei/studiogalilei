import "server-only";
import { geoGraticule10, geoMercator, geoNaturalEarth1, geoPath } from "d3-geo";
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

// Where every arrow starts: Treviso.
const HOME = { lon: 12.24, lat: 45.67 };

/**
 * "We Work WorldWide" map. Zoomed on Europe, where most of the work is, so the countries are
 * large enough to read; an arrow leaves Veneto for each country abroad, and the one for Texas
 * runs off the western edge with its name. The arrows draw themselves and then keep flowing
 * (CSS inside the SVG: it runs when the file is shown as an image too).
 */
export function worldMapSvg() {
  const projection = geoMercator().fitExtent(
    [
      [150, 14],
      [WIDTH - 20, HEIGHT - 14],
    ],
    {
      type: "MultiPoint",
      coordinates: [
        [-11, 34.5],
        [45, 59.5],
      ],
    },
  );
  const path = geoPath(projection).digits(2);
  const at = (lon: number, lat: number) => projection([lon, lat]) as [number, number];
  const shapes = land
    .map(
      (country) =>
        `<path d="${path(country) ?? ""}" fill="${highlighted.has(String(country.id)) ? "#061773" : "#DCE1EC"}"/>`,
    )
    .join("");

  const [hx, hy] = at(HOME.lon, HOME.lat);
  // a curve bulging to the left of its direction, ending just short of the pin
  const arc = (x: number, y: number, bend = 0.22) => {
    const dx = x - hx;
    const dy = y - hy;
    const len = Math.hypot(dx, dy);
    const ex = x - (dx / len) * 12;
    const ey = y - (dy / len) * 12;
    const cx = (hx + ex) / 2 + dy * bend;
    const cy = (hy + ey) / 2 - dx * bend;
    return `M${hx.toFixed(1)},${hy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`;
  };
  const abroad = workedIn.filter((p) => p.key !== "italy" && p.key !== "texas");
  const arrows = abroad
    .map((place, i) => {
      const [x, y] = at(place.lon, place.lat);
      return `<path class="a" style="animation-delay:${(i * 0.25).toFixed(2)}s,${(1.6 + i * 0.25).toFixed(2)}s" d="${arc(x, y)}" marker-end="url(#h)"/>`;
    })
    .join("");
  // Texas is far off this map: its arrow crosses the Atlantic and leaves by the western edge
  const texas =
    `<path class="a" style="animation-delay:1s,2.6s" d="M${hx.toFixed(1)},${hy.toFixed(1)} C${(hx - 150).toFixed(1)},${(hy - 120).toFixed(1)} 230,${(hy - 70).toFixed(1)} 34,${(hy + 6).toFixed(1)}" marker-end="url(#h)"/>` +
    `<text x="30" y="${(hy + 40).toFixed(1)}" font-family="Poppins,system-ui,sans-serif" font-size="17" font-weight="600" fill="#061773">Texas, USA</text>`;
  const pins = abroad
    .map((place) => {
      const [x, y] = at(place.lon, place.lat);
      return `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)})"><circle r="15" fill="#0689FF" opacity="0.45" filter="url(#g)"/><circle r="6.5" fill="#061773" stroke="#FFFFFF" stroke-width="2.5"/></g>`;
    })
    .join("");
  const home =
    `<g transform="translate(${hx.toFixed(2)},${hy.toFixed(2)})"><circle class="p" r="9" fill="none" stroke="#C9AD74" stroke-width="2"/><circle r="8" fill="#C9AD74" stroke="#FFFFFF" stroke-width="2.5"/></g>` +
    `<text x="${(hx + 14).toFixed(1)}" y="${(hy + 24).toFixed(1)}" font-family="Poppins,system-ui,sans-serif" font-size="15" font-weight="600" fill="#FFFFFF" stroke="#061773" stroke-width="4" paint-order="stroke">Treviso</text>`;
  return svg(
    `<defs><filter id="g" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>` +
      `<marker id="h" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#C9AD74"/></marker>` +
      `<style>.a{fill:none;stroke:#C9AD74;stroke-width:3.2;stroke-linecap:round;stroke-dasharray:1200;stroke-dashoffset:1200;animation:d 1.4s cubic-bezier(.3,.6,.3,1) forwards,f 2.4s linear infinite}` +
      `@keyframes d{to{stroke-dashoffset:0}}@keyframes f{from{stroke-dasharray:14 9;stroke-dashoffset:23}to{stroke-dasharray:14 9;stroke-dashoffset:0}}` +
      `.p{animation:r 2.4s ease-out infinite}@keyframes r{from{r:9px;opacity:.9}to{r:30px;opacity:0}}` +
      `@media (prefers-reduced-motion:reduce){.a,.p{animation:none;stroke-dashoffset:0}}</style></defs>` +
      `<path d="${path(geoGraticule10()) ?? ""}" fill="none" stroke="#061773" stroke-opacity="0.05" stroke-width="0.8"/>` +
      `<g stroke="#FFFFFF" stroke-width="0.9">${shapes}</g>${arrows}${texas}${pins}${home}`,
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
