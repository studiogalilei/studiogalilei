"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { afterHydration } from "@/components/effects/after-hydration";
import { usePathname } from "@/i18n/navigation";

/*
 * Faint stars, a slowly turning spiral galaxy, an orbit with a small planet and a little
 * constellation behind every light section of the page. Each drawing is generated in the
 * section's real proportions with a seeded random sequence and keeps clear of text, cards
 * and images, so it is regenerated when the layout width changes.
 */

type Point = [number, number];
type Decor = {
  host: HTMLElement;
  w: number;
  h: number;
  dust: {
    x: number;
    y: number;
    r: number;
    opacity: number;
    delay: number;
    twinkle: boolean;
  }[];
  galaxy: {
    x: number;
    y: number;
    rotate: number;
    radius: number;
    color: string;
    stars: { x: number; y: number; r: number; opacity: string }[];
  };
  orbit: { x: number; y: number; rx: number } | null;
  constellation: Point[] | null;
};

const SKIP = /^\/lavora-con-noi/;
const OBSTACLES =
  "h1, h2, h3, h4, p, a, button, li, figure, img, iframe, form, ol, ul, table, [class*='rounded-']";

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function isLight(section: HTMLElement) {
  const m = getComputedStyle(section).backgroundColor.match(/\d+(\.\d+)?/g);
  if (!m || (m[3] !== undefined && +m[3] === 0)) return false;
  return +m[0] + +m[1] + +m[2] >= 3 * 225;
}

function plan(section: HTMLElement, n: number, host: HTMLElement): Decor {
  const rnd = seeded(n * 9301 + 49297);
  const w = Math.max(360, Math.round(section.offsetWidth));
  const h = Math.max(300, Math.round(section.offsetHeight));
  const narrow = w < 768;

  const base = section.getBoundingClientRect();
  const zones: [number, number, number, number][] = [];
  section.querySelectorAll(OBSTACLES).forEach((el) => {
    if (host.contains(el)) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    zones.push([
      r.left - base.left - 28,
      r.top - base.top - 28,
      r.right - base.left + 28,
      r.bottom - base.top + 28,
    ]);
  });
  const free = (x: number, y: number) =>
    zones.every(([l, t, r, b]) => !(x > l && x < r && y > t && y < b));

  const dust: Decor["dust"] = [];
  for (let i = 0; i < Math.round((w * h) / 14000); i++) {
    const x = rnd() * w,
      y = rnd() * h,
      r = 0.6 + rnd() * 1.1,
      opacity = 0.12 + rnd() * 0.2,
      delay = rnd() * 4;
    if (free(x, y)) dust.push({ x, y, r, opacity, delay, twinkle: i % 6 === 0 });
  }

  // a spiral galaxy on the outer edge, alternating sides, half outside the section
  const gx = (n % 2 ? -0.02 + rnd() * 0.04 : 0.98 + rnd() * 0.04) * w;
  const gy = (0.25 + rnd() * 0.5) * h;
  const rotate = rnd() * 180;
  const radius = (narrow ? 70 : 120) + rnd() * 50;
  const stars: Decor["galaxy"]["stars"] = [];
  for (let arm = 0; arm < 2; arm++) {
    for (let i = 0; i < 70; i++) {
      const th = (i / 70) * Math.PI * 3.2 + arm * Math.PI;
      const rr = 6 + Math.pow(i / 70, 1.1) * radius;
      const x = Math.cos(th) * rr + (rnd() - 0.5) * 7;
      const y = Math.sin(th) * rr + (rnd() - 0.5) * 7;
      stars.push({
        x,
        y,
        r: 0.6 + rnd() * 1.5,
        opacity: (0.7 * (1 - i / 80)).toFixed(2),
      });
    }
  }
  const galaxy = {
    x: gx,
    y: gy,
    rotate,
    radius,
    color: n % 3 === 1 ? "#0689ff" : "#061773",
    stars,
  };

  // an orbit with its planet on the opposite side
  const ox = (n % 2 ? 0.94 : 0.06) * w,
    oy = (0.7 + rnd() * 0.2) * h,
    orx = (narrow ? 60 : 120) + rnd() * 50;
  const orbit = free(ox, oy) ? { x: ox, y: oy, rx: orx } : null;

  // a small constellation, a nod to Galileo, only if it finds a free corner
  const step = narrow ? 30 : 48;
  let constellation: Point[] | null = null;
  for (let attempt = 0; attempt < 12 && !constellation; attempt++) {
    const cx = rnd() * (w - step * 5),
      cy = 18 + rnd() * (h - 60),
      points: Point[] = [];
    for (let i = 0; i < 5; i++)
      points.push([cx + i * step + (rnd() - 0.5) * 20, cy + (rnd() - 0.5) * 24]);
    if (points.every(([x, y]) => free(x, y) && y > 8 && y < h - 8)) constellation = points;
  }

  return { host, w, h, dust, galaxy, orbit, constellation };
}

function SpaceSvg({ decor: { w, h, dust, galaxy, orbit, constellation } }: { decor: Decor }) {
  const f = (v: number) => v.toFixed(0);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMin slice" className="block size-full">
      <defs>
        <radialGradient id="sg-nucleo">
          <stop offset="0" stopColor="#0689ff" stopOpacity=".35" />
          <stop offset="1" stopColor="#0689ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sg-pianeta" cx=".35" cy=".35">
          <stop offset="0" stopColor="#a9c7ff" stopOpacity=".45" />
          <stop offset="1" stopColor="#061773" stopOpacity=".22" />
        </radialGradient>
      </defs>
      {dust.map((s, i) => (
        <circle
          key={i}
          className={s.twinkle ? "animate-twinkle" : undefined}
          style={{ animationDelay: `${s.delay.toFixed(1)}s` }}
          cx={f(s.x)}
          cy={f(s.y)}
          r={s.r.toFixed(1)}
          fill="#061773"
          fillOpacity={s.opacity.toFixed(2)}
        />
      ))}
      <g
        transform={`translate(${f(galaxy.x)} ${f(galaxy.y)}) rotate(${f(galaxy.rotate)}) scale(1 .5)`}
      >
        <g className="animate-galaxy">
          <g fill={galaxy.color}>
            <ellipse rx={galaxy.radius * 0.32} ry={galaxy.radius * 0.32} fill="url(#sg-nucleo)" />
            {galaxy.stars.map((s, i) => (
              <circle
                key={i}
                cx={s.x.toFixed(1)}
                cy={s.y.toFixed(1)}
                r={s.r.toFixed(1)}
                fillOpacity={s.opacity}
              />
            ))}
          </g>
        </g>
      </g>
      {orbit && (
        <g transform={`translate(${orbit.x} ${f(orbit.y)}) rotate(-18)`}>
          <ellipse
            rx={f(orbit.rx)}
            ry={f(orbit.rx * 0.32)}
            fill="none"
            stroke="#061773"
            strokeOpacity=".14"
            strokeDasharray="2 6"
          />
          <g
            className="animate-orbit"
            style={{ "--orbit-rx": `${f(orbit.rx)}px` } as React.CSSProperties}
          >
            <circle r="7" fill="#0689ff" fillOpacity=".28" />
          </g>
          <circle r="15" fill="url(#sg-pianeta)" />
        </g>
      )}
      {constellation && (
        <>
          <polyline
            points={constellation.map(([x, y]) => `${f(x)},${f(y)}`).join(" ")}
            fill="none"
            stroke="#061773"
            strokeOpacity=".12"
            strokeWidth="1"
          />
          {constellation.map(([x, y], i) => (
            <circle key={i} cx={f(x)} cy={f(y)} r="1.8" fill="#061773" fillOpacity=".28" />
          ))}
        </>
      )}
    </svg>
  );
}

export function SpaceDecor() {
  const pathname = usePathname();
  const [decors, setDecors] = useState<Decor[]>([]);

  useEffect(() => {
    const hosts: HTMLElement[] = [];
    let width = window.innerWidth;
    let timer = 0;

    function draw() {
      hosts.splice(0).forEach((host) => host.remove());
      if (SKIP.test(pathname)) return setDecors([]);
      const next: Decor[] = [];
      document.querySelectorAll<HTMLElement>("main > section").forEach((section, i) => {
        if (!isLight(section)) return;
        // inserted first, like the original overlay, so the section's own children keep their order
        const host = document.createElement("div");
        host.setAttribute("aria-hidden", "true");
        host.className = "pointer-events-none absolute inset-0 -z-1 overflow-hidden";
        section.classList.add("relative", "isolate");
        section.prepend(host);
        hosts.push(host);
        next.push(plan(section, i + 1, host));
      });
      setDecors(next);
    }

    // after hydration (it edits server-rendered sections) and once fonts have settled
    let active = true;
    const cancel = afterHydration(() => document.fonts.ready.then(() => active && draw()));
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      clearTimeout(timer);
      timer = window.setTimeout(draw, 250);
    };
    window.addEventListener("resize", onResize);
    return () => {
      active = false;
      cancel();
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      hosts.forEach((host) => host.remove());
    };
  }, [pathname]);

  return decors.map((decor, i) => createPortal(<SpaceSvg decor={decor} />, decor.host, String(i)));
}
