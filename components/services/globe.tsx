"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Check } from "@/components/icons";
import { countries, workedIn } from "@/lib/geo/world";

const SIZE = 440;
const TILT = 28; // latitude facing the viewer
const SPEED = 0.012; // degrees per millisecond
const FRAME_MS = 30; // ~30 redraws a second: smooth at this speed, half the work of 60
const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));
const graticule = geoGraticule10();

/** Path data of the globe turned by `angle` degrees. */
function draw(angle: number) {
  const lon = 40 - angle;
  const facing: [number, number] = [lon, TILT];
  const projection = geoOrthographic()
    .scale(SIZE / 2 - 8)
    .translate([SIZE / 2, SIZE / 2])
    .rotate([-lon, -TILT])
    .clipAngle(90)
    .precision(0); // no adaptive resampling: the 110m outlines are dense enough at this size
  // rounded so server and browser floating point produce the same markup
  const path = geoPath(projection).digits(1);
  return {
    graticule: path(graticule) ?? "",
    countries: countries.map((country) => path(country) ?? ""),
    pins: workedIn.map((place) => {
      const point = projection([place.lon, place.lat]);
      return point && geoDistance([place.lon, place.lat], facing) < 1.25
        ? `translate(${point[0].toFixed(2)},${point[1].toFixed(2)})`
        : null;
    }),
  };
}

/**
 * Slowly rotating globe with the places we work in. The first frame is server-rendered; the
 * rotation then updates the SVG directly (no React render per frame), only while on screen.
 */
export function Globe() {
  const t = useTranslations("Services");
  const places = useTranslations("WorldMap");
  const ref = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const first = draw(0);

  useEffect(() => {
    const root = svg.current;
    if (!root || !ref.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const grid = root.querySelector<SVGPathElement>("[data-graticule]")!;
    const shapes = root.querySelectorAll<SVGPathElement>("[data-country]");
    const pins = root.querySelectorAll<SVGGElement>("[data-pin]");
    const set = (el: Element, name: string, value: string) => {
      if (el.getAttribute(name) !== value) el.setAttribute(name, value);
    };

    let angle = 0;
    let frame = 0;
    let last = 0;
    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (last && now - last < FRAME_MS) return;
      if (last) {
        angle = (angle + (now - last) * SPEED) % 360;
        const next = draw(angle);
        set(grid, "d", next.graticule);
        shapes.forEach((shape, i) => set(shape, "d", next.countries[i]));
        pins.forEach((pin, i) => {
          const transform = next.pins[i];
          if (transform) set(pin, "transform", transform);
          set(pin, "visibility", transform ? "visible" : "hidden");
        });
      }
      last = now;
    }
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      last = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <p className="text-center text-15 font-semibold tracking-[0.18em] text-sg/70 uppercase">
        We Work WorldWide
      </p>
      <svg
        ref={svg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mt-8 block h-auto w-full max-w-[440px]"
        role="img"
        aria-label={t("globeLabel")}
      >
        <defs>
          <radialGradient id="globe-shade" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9EDF7" />
          </radialGradient>
          {/* soft halo (a gradient rather than a blur filter, which would repaint every frame) */}
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="#0689FF" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#0689FF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#0689FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={SIZE / 2 - 8}
          fill="url(#globe-shade)"
          stroke="rgb(150,165,215)"
          strokeWidth="1.2"
        />
        <path
          data-graticule
          d={first.graticule}
          fill="none"
          stroke="#061773"
          strokeOpacity={0.1}
          strokeWidth="0.8"
        />
        {countries.map((country, i) => (
          <path
            key={i}
            data-country
            d={first.countries[i]}
            fill={highlighted.has(String(country.id)) ? "rgb(6,23,115)" : "rgb(168,182,222)"}
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />
        ))}
        {workedIn.map((place, i) => (
          <g
            key={place.key}
            data-pin
            transform={first.pins[i] ?? undefined}
            visibility={first.pins[i] ? "visible" : "hidden"}
          >
            <circle r="21" fill="url(#pin-glow)" />
            <circle r="6.5" fill="#061773" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <ul className="mt-8 grid w-full max-w-[380px] grid-cols-2 gap-x-6 gap-y-3">
        {workedIn.map((place) => (
          <li
            key={place.key}
            className="flex items-center gap-2.5 text-15 font-medium text-sg transition-[color,opacity] duration-500"
          >
            <span
              className="grid size-5 flex-none place-items-center rounded-full bg-sg transition-colors duration-500"
              aria-hidden="true"
            >
              <Check size={12} strokeWidth={3} className="text-white" />
            </span>
            {places(place.key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
