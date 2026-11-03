"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Check } from "@/components/icons";
import { countries, workedIn } from "@/lib/geo/world";
import {
  createGlobeLoop,
  createGlobeRenderer,
  SIZE,
  TILT,
  type GlobeMessage,
  type GlobeReady,
} from "./globe-render";

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
 * Slowly rotating globe with the places we work in. The first frame is server-rendered SVG; the
 * rotation is then drawn on a canvas laid over it, by a worker where the browser can hand it
 * an OffscreenCanvas (the projection maths never touches the main thread), only while on screen.
 */
export function Globe() {
  const t = useTranslations("Services");
  const places = useTranslations("WorldMap");
  const ref = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const first = draw(0);

  useEffect(() => {
    const root = svg.current;
    const box = stage.current;
    if (!root || !box || !ref.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const live = root.querySelector<SVGGElement>("[data-live]")!;
    // a fresh canvas each time: once handed to a worker, a canvas cannot be drawn on again
    const surface = document.createElement("canvas");
    surface.setAttribute("aria-hidden", "true");
    surface.className = "pointer-events-none absolute inset-0 size-full";
    surface.hidden = true;
    box.append(surface);
    // the canvas takes over from the server-rendered SVG shapes once it has drawn a frame
    const takeOver = () => {
      live.setAttribute("display", "none");
      surface.hidden = false;
    };

    // backing store at the device resolution (at most 2x: the globe is small and soft)
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(surface.getBoundingClientRect().width * dpr));
      return { width, scale: width / SIZE };
    };

    let run: (on: boolean) => void;
    let resize: () => void;
    let dispose: () => void;
    let worker: Worker | undefined;
    if ("transferControlToOffscreen" in surface) {
      // preferred: a worker draws, the main thread stays free for scrolling and input
      try {
        worker = new Worker(new URL("./globe.worker.ts", import.meta.url), { type: "module" });
      } catch {
        worker = undefined;
      }
    }
    if (worker) {
      const offscreen = surface.transferControlToOffscreen();
      const post = (message: GlobeMessage, transfer: Transferable[] = []) =>
        worker.postMessage(message, transfer);
      // A worker without its own frame callbacks gets the page's: one tiny message a refresh.
      let forward = false;
      let on = false;
      let frame = 0;
      const pump = (time: number) => {
        post({ type: "frame", time });
        frame = requestAnimationFrame(pump);
      };
      const pumping = (next: boolean) => {
        cancelAnimationFrame(frame);
        if (next && forward) frame = requestAnimationFrame(pump);
      };
      worker.onmessage = (event: MessageEvent<GlobeReady>) => {
        forward = !event.data.paced;
        pumping(on);
        takeOver();
      };
      post({ type: "init", canvas: offscreen, ...size() }, [offscreen]);
      run = (next) => {
        on = next;
        post({ type: "run", on });
        pumping(on);
      };
      resize = () => post({ type: "resize", ...size() });
      dispose = () => {
        pumping(false);
        worker.terminate();
      };
    } else {
      const ctx = surface.getContext("2d");
      if (!ctx) return;
      const render = createGlobeRenderer(ctx);
      let scale = 1;
      const loop = createGlobeLoop((angle) => render(angle, scale));
      resize = () => {
        const next = size();
        surface.width = surface.height = next.width;
        scale = next.scale;
        loop.redraw();
      };
      resize();
      takeOver();
      run = (on) => (on ? loop.start() : loop.stop());
      dispose = loop.stop;
    }

    let width = surface.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const next = surface.getBoundingClientRect().width;
      if (next === width) return;
      width = next;
      resize();
    });
    observer.observe(surface);
    const io = new IntersectionObserver(([entry]) => run(entry.isIntersecting));
    io.observe(ref.current);
    return () => {
      io.disconnect();
      observer.disconnect();
      dispose();
      surface.remove();
      live.removeAttribute("display");
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <p className="text-center text-15 font-semibold tracking-[0.18em] text-sg/70 uppercase">
        We Work WorldWide
      </p>
      <div ref={stage} className="relative mt-8 w-full max-w-[440px]">
        <svg
          ref={svg}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block h-auto w-full"
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
          <g data-live>
            <path
              d={first.graticule}
              fill="none"
              stroke="#061773"
              strokeOpacity={0.1}
              strokeWidth="0.8"
            />
            {countries.map((country, i) => (
              <path
                key={i}
                d={first.countries[i]}
                fill={highlighted.has(String(country.id)) ? "rgb(6,23,115)" : "rgb(168,182,222)"}
                stroke="#FFFFFF"
                strokeWidth="0.5"
              />
            ))}
            {workedIn.map((place, i) => (
              <g
                key={place.key}
                transform={first.pins[i] ?? undefined}
                visibility={first.pins[i] ? "visible" : "hidden"}
              >
                <circle r="21" fill="url(#pin-glow)" />
                <circle r="6.5" fill="#061773" stroke="#FFFFFF" strokeWidth="2" />
              </g>
            ))}
          </g>
        </svg>
      </div>
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
