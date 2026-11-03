import { geoCentroid, geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { countries, workedIn } from "@/lib/geo/world";

/*
 * Draws the rotating globe on a 2D canvas (the same picture as the server-rendered SVG of
 * globe.tsx). Shared by the worker (globe.worker.ts), which keeps the projection maths off
 * the main thread, and by the main-thread fallback for browsers without OffscreenCanvas.
 */

export const SIZE = 440;
export const TILT = 28; // latitude facing the viewer
export const SPEED = 0.012; // degrees per millisecond
export const FRAME_MS = 30; // ~30 redraws a second: smooth at this speed, half the work of 60

const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));
const graticule = geoGraticule10();

/** Each country with the smallest cap around its centroid that holds it, to skip the far side. */
const shapes = countries.map((country) => {
  const center = geoCentroid(country);
  let radius = 0;
  const walk = (coords: unknown): void => {
    if (typeof (coords as number[])[0] === "number") {
      radius = Math.max(radius, geoDistance(center, coords as [number, number]));
    } else (coords as unknown[]).forEach(walk);
  };
  if ("coordinates" in country.geometry) walk(country.geometry.coordinates);
  return { country, center, radius, marked: highlighted.has(String(country.id)) };
});

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export function createGlobeRenderer(ctx: Context) {
  const projection = geoOrthographic()
    .scale(SIZE / 2 - 8)
    .translate([SIZE / 2, SIZE / 2])
    .clipAngle(90)
    .precision(0); // no adaptive resampling: the 110m outlines are dense enough at this size
  const path = geoPath(projection, ctx);
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 21); // same stops as the SVG #pin-glow
  glow.addColorStop(0, "rgba(6,137,255,0.45)");
  glow.addColorStop(0.45, "rgba(6,137,255,0.32)");
  glow.addColorStop(1, "rgba(6,137,255,0)");

  /** Draws the globe turned by `angle` degrees, at `scale` device pixels per SVG unit. */
  return function render(angle: number, scale: number) {
    const lon = 40 - angle;
    const facing: [number, number] = [lon, TILT];
    projection.rotate([-lon, -TILT]);
    const visible = shapes.filter((s) => geoDistance(s.center, facing) - s.radius < Math.PI / 2);

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = "rgba(6,23,115,0.1)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    // one fill per colour, then all the borders at once: a handful of draw calls per frame
    for (const marked of [false, true]) {
      ctx.beginPath();
      for (const s of visible) if (s.marked === marked) path(s.country);
      ctx.fillStyle = marked ? "rgb(6,23,115)" : "rgb(168,182,222)";
      ctx.fill();
    }
    ctx.beginPath();
    for (const s of visible) path(s.country);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    for (const place of workedIn) {
      const point = projection([place.lon, place.lat]);
      if (!point || geoDistance([place.lon, place.lat], facing) >= 1.25) continue;
      ctx.setTransform(scale, 0, 0, scale, point[0] * scale, point[1] * scale);
      ctx.beginPath();
      ctx.arc(0, 0, 21, 0, 2 * Math.PI);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 6.5, 0, 2 * Math.PI);
      ctx.fillStyle = "#061773";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();
    }
  };
}

/**
 * Runs the rotation: `start()` while the globe is on screen, `stop()` otherwise. Uses timers,
 * which (unlike requestAnimationFrame) exist in every browser's workers.
 */
export function createGlobeLoop(render: (angle: number) => void) {
  let angle = 0;
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const tick = () => {
    const now = performance.now();
    angle = (angle + (now - last) * SPEED) % 360;
    last = now;
    render(angle);
    timer = setTimeout(tick, FRAME_MS);
  };
  return {
    start() {
      if (timer !== undefined) return;
      last = performance.now();
      timer = setTimeout(tick, FRAME_MS);
    },
    stop() {
      clearTimeout(timer);
      timer = undefined;
    },
    redraw: () => render(angle),
  };
}

export type GlobeMessage =
  | { type: "init"; canvas: OffscreenCanvas; width: number; scale: number }
  | { type: "resize"; width: number; scale: number }
  | { type: "run"; on: boolean };
