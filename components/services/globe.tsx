"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Check } from "@/components/icons";
import { countries, workedIn } from "@/lib/geo/world";

const SIZE = 440;
const TILT = 28; // latitude facing the viewer
const SPEED = 0.012; // degrees per millisecond
const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));
const graticule = geoGraticule10();

/** Slowly rotating globe with the places we work in; it pauses while off screen. */
export function Globe() {
  const t = useTranslations("Services");
  const places = useTranslations("WorldMap");
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    let visible = true;
    function tick(now: number) {
      if (last) {
        const step = (now - last) * SPEED;
        setAngle((a) => (a + step) % 360);
      }
      last = now;
      frame = visible ? requestAnimationFrame(tick) : 0;
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    frame = requestAnimationFrame(tick);
    if (ref.current) io.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const lon = 40 - angle;
  const projection = geoOrthographic()
    .scale(SIZE / 2 - 8)
    .translate([SIZE / 2, SIZE / 2])
    .rotate([-lon, -TILT])
    .clipAngle(90);
  // rounded so server and browser floating point produce the same markup
  const path = geoPath(projection).digits(2);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <p className="text-center text-15 font-semibold tracking-[0.18em] text-sg/70 uppercase">
        We Work WorldWide
      </p>
      <svg
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
          <filter id="pin-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
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
          d={path(graticule) ?? ""}
          fill="none"
          stroke="#061773"
          strokeOpacity={0.1}
          strokeWidth="0.8"
        />
        {countries.map((country, i) => (
          <path
            key={i}
            d={path(country) ?? ""}
            fill={highlighted.has(String(country.id)) ? "rgb(6,23,115)" : "rgb(168,182,222)"}
            stroke="#FFFFFF"
            strokeWidth="0.5"
          />
        ))}
        {workedIn.map((place) => {
          const point = projection([place.lon, place.lat]);
          const facing = geoDistance([place.lon, place.lat], [lon, TILT]) < 1.25;
          return point && facing ? (
            <g
              key={place.key}
              transform={`translate(${point[0].toFixed(2)},${point[1].toFixed(2)})`}
            >
              <circle r="14" fill="#0689FF" opacity="0.45" filter="url(#pin-glow)" />
              <circle r="6.5" fill="#061773" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          ) : null;
        })}
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
