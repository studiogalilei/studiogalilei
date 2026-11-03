/** Pale world map behind the intro text (a prerendered SVG file, see lib/geo/maps.ts). */
export function WorldBackdrop() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- a static SVG: nothing to optimize
    <img
      src="/maps/world-backdrop.svg"
      alt=""
      aria-hidden="true"
      width={960}
      height={500}
      decoding="async"
      className="pointer-events-none absolute inset-0 h-full w-full object-contain"
    />
  );
}
