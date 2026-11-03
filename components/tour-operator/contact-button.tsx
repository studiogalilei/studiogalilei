"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { EmailLink, WhatsAppLink } from "./context";
import { MailIcon, WhatsAppIcon } from "./icons";
import { button, type ButtonKind, type ButtonSize } from "./ui";

const ring = "[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]";

const SPEED = 160; // px per second along the border, the same on every button
const HOVER_RATE = 2; // twice as fast while the button is hovered
const STEP = 2; // px between keyframes along the border

/**
 * The light: a short comet of soft glows, head first, each `lag` px behind the head along
 * the border. Only the border ring shows them (the mask of the wrapper).
 */
const TRAIL = [
  { lag: 0, size: 26, color: "#ffffff" },
  { lag: 10, size: 34, color: "rgba(255,255,255,0.85)" },
  { lag: 24, size: 44, color: "var(--glow-2)" },
  { lag: 42, size: 52, color: "color-mix(in oklab, var(--glow-2) 70%, transparent)" },
  { lag: 64, size: 60, color: "color-mix(in oklab, var(--glow-2) 45%, transparent)" },
  { lag: 90, size: 64, color: "color-mix(in oklab, var(--glow-2) 25%, transparent)" },
];

/**
 * Points every STEP px along the centre line of a w × h border with corner radius r,
 * clockwise from the top left: straight sides and the corner arcs, so a light moved through
 * them keeps the same speed everywhere, corners included.
 */
function borderPath(w: number, h: number, r: number, inset: number) {
  const x0 = inset,
    y0 = inset,
    x1 = w - inset,
    y1 = h - inset;
  const rr = Math.max(0, Math.min(r - inset, (x1 - x0) / 2, (y1 - y0) / 2));
  type Piece = { length: number; at: (t: number) => [number, number] };
  const line = (ax: number, ay: number, bx: number, by: number): Piece => ({
    length: Math.hypot(bx - ax, by - ay),
    at: (t) => [ax + (bx - ax) * t, ay + (by - ay) * t],
  });
  const arc = (cx: number, cy: number, from: number): Piece => ({
    length: (Math.PI / 2) * rr,
    at: (t) => {
      const a = from + (Math.PI / 2) * t;
      return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
    },
  });
  const pieces = [
    line(x0 + rr, y0, x1 - rr, y0),
    arc(x1 - rr, y0 + rr, -Math.PI / 2),
    line(x1, y0 + rr, x1, y1 - rr),
    arc(x1 - rr, y1 - rr, 0),
    line(x1 - rr, y1, x0 + rr, y1),
    arc(x0 + rr, y1 - rr, Math.PI / 2),
    line(x0, y1 - rr, x0, y0 + rr),
    arc(x0 + rr, y0 + rr, Math.PI),
  ];
  const length = pieces.reduce((sum, piece) => sum + piece.length, 0);
  const count = Math.max(8, Math.round(length / STEP));
  const points: [number, number][] = [];
  for (let i = 0; i <= count; i++) {
    let d = (i / count) * length;
    let piece = pieces[0];
    for (piece of pieces) {
      if (d <= piece.length || piece === pieces[pieces.length - 1]) break;
      d -= piece.length;
    }
    points.push(piece.at(piece.length ? Math.min(1, d / piece.length) : 0));
  }
  return { points, length };
}

/**
 * A light travelling around the border at the same speed everywhere: each glow of the trail
 * moves along the border's own path (sides and rounded corners, sampled every STEP px), with
 * a compositor-only `translate` animation. (A conic gradient turning behind the border,
 * the previous light, moves by angle: on a wide button its light raced around the ends and
 * crawled along the sides, and no timing fixes that for the whole of its tail.) Hovering
 * doubles the playback rate, which keeps the light where it is.
 */
function Glow({ delay }: { delay: boolean }) {
  const trail = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const dots = trail.current.filter((dot): dot is HTMLSpanElement => !!dot);
    const button = dots[0]?.closest<HTMLElement>("a, button");
    if (!dots.length || !button || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let spins: Animation[] = [];
    let size = "";
    let rate = 1;
    let currentLap = 1;
    const build = () => {
      const { offsetWidth: w, offsetHeight: h } = button;
      if (!w || !h || `${w}x${h}` === size) return;
      size = `${w}x${h}`;
      const radius = parseFloat(getComputedStyle(button).borderTopLeftRadius) || 0;
      const { points, length } = borderPath(w, h, radius, 0.6);
      const lap = (length / SPEED) * 1000;
      // a new shape: the light carries on from the same share of the lap
      const share = spins[0] ? Number(spins[0].currentTime) / currentLap : delay ? 0.5 : 0;
      spins.forEach((spin) => spin.cancel());
      currentLap = lap;
      const keyframes = points.map(([x, y]) => ({
        translate: `${x.toFixed(2)}px ${y.toFixed(2)}px`,
      }));
      spins = dots.map((dot, i) => {
        const spin = dot.animate(keyframes, { duration: lap, iterations: Infinity });
        spin.currentTime = (((share * lap - (TRAIL[i].lag / SPEED) * 1000) % lap) + lap) % lap;
        spin.playbackRate = rate;
        return spin;
      });
    };
    build();
    const observer = new ResizeObserver(build);
    observer.observe(button);

    const setRate = (next: number) => {
      rate = next;
      spins.forEach((spin) => spin.updatePlaybackRate(next));
    };
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && setRate(HOVER_RATE);
    const leave = () => setRate(1);
    button.addEventListener("pointerenter", enter);
    button.addEventListener("pointerleave", leave);
    return () => {
      observer.disconnect();
      button.removeEventListener("pointerenter", enter);
      button.removeEventListener("pointerleave", leave);
      spins.forEach((spin) => spin.cancel());
    };
  }, [delay]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-2 overflow-hidden rounded-[inherit] p-[1.2px]",
        ring,
        "motion-reduce:bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_50%,rgba(143,208,255,0.6))]",
      )}
    >
      {TRAIL.map((glow, i) => (
        <span
          key={i}
          ref={(el) => {
            trail.current[i] = el;
          }}
          style={{
            width: glow.size,
            height: glow.size,
            marginLeft: -glow.size / 2,
            marginTop: -glow.size / 2,
            background: `radial-gradient(closest-side, ${glow.color}, transparent)`,
          }}
          className="absolute top-0 left-0 translate-[-999px] rounded-full motion-reduce:hidden"
        />
      ))}
    </span>
  );
}

/** WhatsApp or email conversion button of the tour operator page. */
export function ContactButton({
  kind,
  label,
  pain,
  size = "default",
  dark,
  delayGlow = false,
  lightGlow,
}: {
  kind: ButtonKind;
  label: React.ReactNode;
  /** WhatsApp only: include the pain points picked in the checklist in the message. */
  pain?: boolean;
  size?: ButtonSize;
  dark?: boolean;
  delayGlow?: boolean;
  lightGlow?: boolean;
}) {
  const className = button({ kind, size, dark, lightGlow });
  const content = (
    <>
      <Glow delay={delayGlow} />
      {kind === "whatsapp" ? <WhatsAppIcon /> : <MailIcon />}
      <span>{label}</span>
    </>
  );
  return kind === "whatsapp" ? (
    <WhatsAppLink pain={pain} className={className}>
      {content}
    </WhatsAppLink>
  ) : (
    <EmailLink className={className}>{content}</EmailLink>
  );
}
