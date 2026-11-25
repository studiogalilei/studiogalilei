import "server-only";
import { geoGraticule10, geoMercator, geoNaturalEarth1, geoOrthographic, geoPath } from "d3-geo";
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
const FONT = "Poppins,system-ui,-apple-system,Segoe UI,sans-serif";

/**
 * "We Work WorldWide" map, on a night-blue card. Europe is zoomed in, so the countries are
 * large enough to read, and a round window on the left shows North America: an arrow leaves
 * Treviso for each country abroad, and the long one crosses the Atlantic and lands in Texas.
 * The arrows draw themselves and then keep flowing (CSS inside the SVG: it runs when the file
 * is shown as an image too).
 */
export function worldMapSvg() {
  const europe = geoMercator().fitExtent(
    [
      [330, 20],
      [WIDTH - 24, HEIGHT - 20],
    ],
    {
      type: "MultiPoint",
      coordinates: [
        [-10, 35],
        [44, 59],
      ],
    },
  );
  const path = geoPath(europe).digits(2);
  const at = (lon: number, lat: number) => europe([lon, lat]) as [number, number];
  const shapes = land
    .map((country) => {
      const on = highlighted.has(String(country.id));
      return `<path d="${path(country) ?? ""}" fill="${on ? "#FFFFFF" : "#FFFFFF"}" fill-opacity="${on ? 0.95 : 0.13}"/>`;
    })
    .join("");

  // the window on North America
  const win = { x: 150, y: 262, r: 122 };
  const america = geoOrthographic()
    .rotate([97, -38])
    .scale(250)
    .translate([win.x, win.y])
    .clipAngle(90);
  const usa = geoPath(america).digits(2);
  const americaLand = land
    .map((country) => `<path d="${usa(country) ?? ""}" fill="#FFFFFF" fill-opacity="0.16"/>`)
    .join("");
  const texasPlace = workedIn.find((p) => p.key === "texas")!;
  const [tx, ty] = america([texasPlace.lon, texasPlace.lat]) as [number, number];

  const [hx, hy] = at(HOME.lon, HOME.lat);
  // a curve bulging to the left of its direction, ending just short of the pin
  const arc = (x: number, y: number, bend: number) => {
    const dx = x - hx;
    const dy = y - hy;
    const len = Math.hypot(dx, dy);
    const ex = x - (dx / len) * 13;
    const ey = y - (dy / len) * 13;
    const cx = (hx + ex) / 2 + dy * bend;
    const cy = (hy + ey) / 2 - dx * bend;
    return `M${hx.toFixed(1)},${hy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`;
  };
  const abroad = workedIn.filter((p) => p.key !== "italy" && p.key !== "texas");
  const line = (d: string, i: number) =>
    `<path class="g" d="${d}"/><path class="a" style="animation-delay:${(i * 0.25).toFixed(2)}s,${(1.7 + i * 0.25).toFixed(2)}s" d="${d}" marker-end="url(#h)"/>`;
  const arrows =
    abroad
      .map((place, i) => {
        const [x, y] = at(place.lon, place.lat);
        return line(arc(x, y, 0.24), i);
      })
      .join("") + line(arc(tx, ty, -0.3), abroad.length);

  const pin = (x: number, y: number) =>
    `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)})"><circle class="p" r="8" fill="none" stroke="#EBDCBE" stroke-width="1.5"/><circle r="6.5" fill="#EBDCBE" stroke="#040F4D" stroke-width="2.5"/></g>`;
  const pins =
    abroad
      .map((place) => {
        const [x, y] = at(place.lon, place.lat);
        return pin(x, y);
      })
      .join("") + pin(tx, ty);
  const label = (x: number, y: number, text: string, size = 15) =>
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${FONT}" font-size="${size}" font-weight="600" fill="#FFFFFF" stroke="#040F4D" stroke-width="4" paint-order="stroke">${text}</text>`;
  const home =
    `<g transform="translate(${hx.toFixed(2)},${hy.toFixed(2)})"><circle class="p" r="10" fill="none" stroke="#FFFFFF" stroke-width="2"/><circle r="9" fill="#FFFFFF" stroke="#C9AD74" stroke-width="4"/></g>` +
    label(hx + 16, hy + 26, "Treviso", 16);

  return svg(
    `<defs>` +
      `<radialGradient id="bg" cx="70%" cy="35%" r="90%"><stop offset="0" stop-color="#0A2391"/><stop offset="1" stop-color="#040F4D"/></radialGradient>` +
      `<radialGradient id="globe" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#1733B0"/><stop offset="1" stop-color="#061773"/></radialGradient>` +
      `<clipPath id="w"><circle cx="${win.x}" cy="${win.y}" r="${win.r}"/></clipPath>` +
      `<filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>` +
      `<marker id="h" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#EBDCBE"/></marker>` +
      `<style>.a{fill:none;stroke:#EBDCBE;stroke-width:3;stroke-linecap:round;stroke-dasharray:1400;stroke-dashoffset:1400;animation:d 1.5s cubic-bezier(.3,.6,.3,1) forwards,f 2.2s linear infinite}` +
      `.g{fill:none;stroke:#C9AD74;stroke-width:9;stroke-linecap:round;opacity:.35;filter:url(#b)}` +
      `@keyframes d{to{stroke-dashoffset:0}}@keyframes f{from{stroke-dasharray:15 10;stroke-dashoffset:25}to{stroke-dasharray:15 10;stroke-dashoffset:0}}` +
      `.p{animation:r 2.4s ease-out infinite}@keyframes r{from{r:8px;opacity:.9}to{r:28px;opacity:0}}` +
      `@media (prefers-reduced-motion:reduce){.a,.p{animation:none;stroke-dashoffset:0}}</style></defs>` +
      `<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>` +
      `<path d="${path(geoGraticule10()) ?? ""}" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="0.8"/>` +
      `<g stroke="#040F4D" stroke-width="0.9">${shapes}</g>` +
      // the window: its own little globe, with a ring around it
      `<circle cx="${win.x}" cy="${win.y}" r="${win.r + 10}" fill="#040F4D" fill-opacity="0.55"/>` +
      `<circle cx="${win.x}" cy="${win.y}" r="${win.r}" fill="url(#globe)"/>` +
      `<g clip-path="url(#w)"><path d="${usa(geoGraticule10()) ?? ""}" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="0.8"/><g stroke="#061773" stroke-width="0.8">${americaLand}</g></g>` +
      `<circle cx="${win.x}" cy="${win.y}" r="${win.r}" fill="none" stroke="#EBDCBE" stroke-opacity="0.7" stroke-width="2"/>` +
      `${arrows}${pins}${home}` +
      label(tx - 48, ty + 34, "Texas, USA", 17),
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
