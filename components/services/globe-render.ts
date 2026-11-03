import { geoCentroid, geoDistance } from "d3-geo";
import type { Geometry, MultiLineString, Position } from "geojson";
import { countries, workedIn } from "@/lib/geo/world";

/*
 * Draws the rotating globe on a 2D canvas (the same picture as the server-rendered SVG of
 * globe.tsx). Shared by the worker (globe.worker.ts), which keeps it off the main thread, and
 * by the main-thread fallback for browsers without OffscreenCanvas.
 *
 * The globe only turns around its polar axis, so every outline point is turned into a unit
 * vector once; a frame is then three dot products per point (an orthographic view needs
 * nothing else), instead of d3's per-point trigonometry, clipping and path streaming.
 */

export const SIZE = 440;
export const TILT = 28; // latitude facing the viewer
export const SPEED = 0.012; // degrees per millisecond
const MAX_STEP_MS = 50; // the most a single frame may advance the rotation

const RADIUS = SIZE / 2 - 8;
const CENTER = SIZE / 2;
const RAD = Math.PI / 180;
const PIN_LIMIT = Math.cos(1.25); // pins further than 1.25 rad from the centre are hidden

/** [lon, lat] points as x, y, z triples on the unit sphere. */
function vectors(points: Position[]) {
  const out = new Float64Array(points.length * 3);
  points.forEach(([lon, lat], i) => {
    const l = lon * RAD;
    const p = lat * RAD;
    out[i * 3] = Math.cos(p) * Math.cos(l);
    out[i * 3 + 1] = Math.cos(p) * Math.sin(l);
    out[i * 3 + 2] = Math.sin(p);
  });
  return out;
}

function rings(geometry: Geometry): Position[][] {
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  return [];
}

const highlighted = new Set<string>(workedIn.flatMap((p) => ("country" in p ? [p.country] : [])));

/**
 * Meridians and parallels every 10°, as d3's 10° graticule draws them (meridians stop at
 * ±80° except the four every 90°, which reach the poles), but with a point every 2°: lines
 * on screen are drawn straight between points, and d3's own graticule has as few as three
 * points on a meridian (pole, equator, pole), which then cut straight across the globe.
 */
export const graticuleLines: MultiLineString = (() => {
  const steps = (from: number, to: number) =>
    Array.from({ length: Math.round((to - from) / 2) + 1 }, (_, i) => from + i * 2);
  const meridians = Array.from({ length: 36 }, (_, i) => -180 + i * 10).map((lon) => {
    const pole = lon % 90 === 0 ? 90 : 80;
    return steps(-pole, pole).map((lat): Position => [lon, lat]);
  });
  const parallels = Array.from({ length: 17 }, (_, i) => -80 + i * 10).map((lat) =>
    steps(-180, 180).map((lon): Position => [lon, lat]),
  );
  return { type: "MultiLineString", coordinates: [...meridians, ...parallels] };
})();
const graticule = graticuleLines.coordinates.map(vectors);

/** Each country's rings, and the cap around its centroid that holds it (to skip the far side). */
const shapes = countries.map((country) => {
  const outline = rings(country.geometry);
  const centroid = geoCentroid(country);
  let radius = 0;
  for (const ring of outline)
    for (const point of ring)
      radius = Math.max(radius, geoDistance(centroid, point as [number, number]));
  return {
    rings: outline.map(vectors),
    center: vectors([centroid]),
    // visible while the centre is less than 90° + radius from the point facing the viewer
    limit: Math.cos(Math.min(Math.PI, Math.PI / 2 + radius)),
    marked: highlighted.has(String(country.id)),
  };
});
const pins = workedIn.map((place) => vectors([[place.lon, place.lat]]));

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export function createGlobeRenderer(ctx: Context) {
  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 21); // same stops as the SVG #pin-glow
  glow.addColorStop(0, "rgba(6,137,255,0.45)");
  glow.addColorStop(0.45, "rgba(6,137,255,0.32)");
  glow.addColorStop(1, "rgba(6,137,255,0)");

  // the view: f faces the viewer, e points east (screen right), n north (screen up)
  let fx = 0, fy = 0, fz = 0, ex = 0, ey = 0, nx = 0, ny = 0, nz = 0; // prettier-ignore

  /** Outline of a ring for filling: points on the far side lie on the rim, where they show. */
  function fillRing(ring: Float64Array) {
    for (let i = 0; i < ring.length; i += 3) {
      const x = ring[i], y = ring[i + 1], z = ring[i + 2]; // prettier-ignore
      let X = x * ex + y * ey;
      let Y = x * nx + y * ny + z * nz;
      if (x * fx + y * fy + z * fz < 0) {
        const k = 1 / (Math.hypot(X, Y) || 1);
        X *= k;
        Y *= k;
      }
      if (i) ctx.lineTo(CENTER + RADIUS * X, CENTER - RADIUS * Y);
      else ctx.moveTo(CENTER + RADIUS * X, CENTER - RADIUS * Y);
    }
    ctx.closePath();
  }

  /** The visible part of a line: only segments with both ends facing the viewer. */
  function strokeLine(line: Float64Array) {
    let drawing = false;
    for (let i = 0; i < line.length; i += 3) {
      const x = line[i], y = line[i + 1], z = line[i + 2]; // prettier-ignore
      if (x * fx + y * fy + z * fz < 0) {
        drawing = false;
        continue;
      }
      const sx = CENTER + RADIUS * (x * ex + y * ey);
      const sy = CENTER - RADIUS * (x * nx + y * ny + z * nz);
      if (drawing) ctx.lineTo(sx, sy);
      else ctx.moveTo(sx, sy);
      drawing = true;
    }
  }

  /** Draws the globe turned by `angle` degrees, at `scale` device pixels per SVG unit. */
  return function render(angle: number, scale: number) {
    const l = (40 - angle) * RAD;
    const p = TILT * RAD;
    fx = Math.cos(p) * Math.cos(l);
    fy = Math.cos(p) * Math.sin(l);
    fz = Math.sin(p);
    ex = -Math.sin(l);
    ey = Math.cos(l);
    nx = -Math.sin(p) * Math.cos(l);
    ny = -Math.sin(p) * Math.sin(l);
    nz = Math.cos(p);
    const visible = shapes.filter(
      ({ center: c, limit }) => c[0] * fx + c[1] * fy + c[2] * fz > limit,
    );

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.beginPath();
    graticule.forEach(strokeLine);
    ctx.strokeStyle = "rgba(6,23,115,0.1)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    // one fill per colour, then all the borders at once: a handful of draw calls per frame
    for (const marked of [false, true]) {
      ctx.beginPath();
      for (const shape of visible) if (shape.marked === marked) shape.rings.forEach(fillRing);
      ctx.fillStyle = marked ? "rgb(6,23,115)" : "rgb(168,182,222)";
      ctx.fill();
    }
    ctx.beginPath();
    for (const shape of visible) shape.rings.forEach(strokeLine);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    for (const [x, y, z] of pins) {
      if (x * fx + y * fy + z * fz <= PIN_LIMIT) continue;
      const sx = CENTER + RADIUS * (x * ex + y * ey);
      const sy = CENTER - RADIUS * (x * nx + y * ny + z * nz);
      ctx.setTransform(scale, 0, 0, scale, sx * scale, sy * scale);
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

type FrameScheduler = {
  request: (callback: (time: number) => void) => number;
  cancel: (handle: number) => void;
};

/** The display's frame callbacks of this global scope (window, or a worker that has them). */
export function frameScheduler(): FrameScheduler | undefined {
  const scope = globalThis as typeof globalThis & Partial<AnimationFrameProvider>;
  if (typeof scope.requestAnimationFrame !== "function") return undefined;
  return {
    request: (callback) => scope.requestAnimationFrame!(callback),
    cancel: (handle) => scope.cancelAnimationFrame!(handle),
  };
}

/**
 * Runs the rotation: `start()` while the globe is on screen, `stop()` otherwise.
 *
 * Frames are drawn on display refreshes, turned by the time since the previous drawn frame,
 * so the globe moves the same distance every frame. (A fixed timer — the former 30 ms — beats
 * against the 60/120 Hz refresh: frames stay on screen for 2 or 3 refreshes in turn, a
 * visible judder.) Without frame callbacks in this scope, `frame(time)` is called from the
 * outside on every refresh instead (globe.tsx forwards the main thread's).
 */
export function createGlobeLoop(
  render: (angle: number) => void,
  scheduler: FrameScheduler | undefined = frameScheduler(),
) {
  let angle = 0;
  let last = 0; // time of the last drawn frame
  let running = false;
  let handle = 0;
  // Cadence: draw on every `every`-th refresh. A device that cannot draw at the refresh rate
  // keeps an even rhythm (every 2nd refresh, say) rather than alternating short and long frames.
  let every = 1;
  let count = 0;
  let previous = 0; // time of the previous refresh
  let refresh = 1000 / 60; // averaged refresh interval
  let cost = 0; // averaged drawing time
  const onRefresh = (time: number) => {
    if (previous) refresh += (Math.min(time - previous, 100) - refresh) * 0.1;
    previous = time;
    if (++count % every) return;
    const started = performance.now();
    // a long pause (tab in the background, a busy device) resumes gently instead of leaping
    if (last) angle = (angle + Math.min(time - last, MAX_STEP_MS) * SPEED) % 360;
    last = time;
    render(angle);
    cost += (performance.now() - started - cost) * 0.2;
    // keep ~25% of each frame's budget free; change only after a clear margin (no flapping)
    const fits = Math.min(4, Math.max(1, Math.ceil(cost / (refresh * 0.75))));
    if (fits > every || (fits < every && cost < refresh * (every - 1) * 0.5)) every = fits;
  };
  const tick = (time: number) => {
    if (!running) return;
    onRefresh(time);
    handle = scheduler!.request(tick);
  };
  return {
    /** Whether the loop paces itself; otherwise `frame()` must be called on every refresh. */
    paced: !!scheduler,
    start() {
      if (running) return;
      running = true;
      last = previous = 0; // the first frame after a start does not move: no jump on resume
      if (scheduler) handle = scheduler.request(tick);
    },
    stop() {
      running = false;
      if (scheduler) scheduler.cancel(handle);
    },
    frame(time: number) {
      if (running) onRefresh(time);
    },
    redraw: () => render(angle),
  };
}

export type GlobeMessage =
  | { type: "init"; canvas: OffscreenCanvas; width: number; scale: number }
  | { type: "resize"; width: number; scale: number }
  | { type: "run"; on: boolean }
  /** a display refresh, forwarded by the page to a worker without frame callbacks */
  | { type: "frame"; time: number };

/** The worker's answer to "init": its first frame is drawn; `paced` as in createGlobeLoop. */
export type GlobeReady = { paced: boolean };
