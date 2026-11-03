"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { EmailLink, WhatsAppLink } from "./context";
import { MailIcon, WhatsAppIcon } from "./icons";
import { button, type ButtonKind, type ButtonSize } from "./ui";

const ring = "[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]";

const LAP_MS = 3800; // one lap around the border
const HOVER_RATE = 2.1; // how much faster the light runs while the button is hovered
// Where the light points with no rotation, in screen degrees (0 = right, clockwise): the
// gradient's brightest stop is at 318°, counted from the top.
const LIGHT_AT = 318 - 90;

/**
 * Rotation keyframes that move the light at an even speed along a w × h border. A conic
 * gradient turning at a constant angle per second races around the short ends of a wide
 * button and crawls along the middle of its long sides (a pendulum); here each keyframe is
 * the turn that puts the light on the next equal stretch of the perimeter.
 */
function evenKeyframes(w: number, h: number, spacing = 3): Keyframe[] {
  const perimeter = 2 * (w + h);
  // the sides clockwise from the top left corner (screen y points down, so angles grow
  // clockwise), each cut into equal steps of about `spacing` px with a keyframe exactly on
  // every corner: a step across a corner would cut it, running unevenly there
  const corners: [number, number][] = [
    [-w / 2, -h / 2],
    [w / 2, -h / 2],
    [w / 2, h / 2],
    [-w / 2, h / 2],
  ];
  const frames: Keyframe[] = [];
  let previous = -Infinity;
  let travelled = 0;
  const add = (x: number, y: number) => {
    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    while (angle < previous) angle += 360;
    previous = angle;
    // turn the gradient so that its light, not its 0°, points at this spot
    frames.push({ rotate: `${(angle - LIGHT_AT).toFixed(3)}deg`, offset: travelled / perimeter });
  };
  corners.forEach(([x0, y0], side) => {
    const [x1, y1] = corners[(side + 1) % 4];
    const length = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(2, Math.round(length / spacing));
    for (let i = 0; i < steps; i++) {
      add(x0 + ((x1 - x0) * i) / steps, y0 + ((y1 - y0) * i) / steps);
      travelled += length / steps;
    }
  });
  add(...corners[0]); // back where it started, one turn on
  frames[frames.length - 1].offset = 1;
  return frames;
}

/**
 * A light travelling around the border: a conic gradient on a square covering the button
 * turns behind a mask that only shows the border. The turn is a compositor-only `rotate`
 * animation with keyframes from the button's size (an even speed all round); hovering
 * eases its playback rate up and back, which keeps its position: the light speeds up
 * evenly from where it is.
 */
function Glow({ delay }: { delay: boolean }) {
  const spinner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spinner.current;
    const button = el?.closest<HTMLElement>("a, button");
    if (!el || !button || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let spin: Animation | undefined;
    let size = "";
    const build = () => {
      const { offsetWidth: w, offsetHeight: h } = button;
      if (!w || !h || `${w}x${h}` === size) return;
      size = `${w}x${h}`;
      // a new shape: new keyframes, same place in the lap and same speed
      const time = spin ? Number(spin.currentTime) : delay ? LAP_MS / 2 : 0;
      const rate = spin?.playbackRate ?? 1;
      spin?.cancel();
      spin = el.animate(evenKeyframes(w, h), { duration: LAP_MS, iterations: Infinity });
      spin.currentTime = time;
      spin.playbackRate = rate;
    };
    build();
    const observer = new ResizeObserver(build);
    observer.observe(button);

    let frame = 0;
    const ease = (to: number) => {
      cancelAnimationFrame(frame);
      if (!spin) return;
      const from = spin.playbackRate;
      const start = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - start) / 450);
        spin!.playbackRate = from + (to - from) * (1 - (1 - k) ** 3);
        if (k < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && ease(HOVER_RATE);
    const leave = () => ease(1);
    button.addEventListener("pointerenter", enter);
    button.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      button.removeEventListener("pointerenter", enter);
      button.removeEventListener("pointerleave", leave);
      spin?.cancel();
    };
  }, [delay]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-2 rounded-[inherit] p-[1.2px]",
        ring,
        "motion-reduce:bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_50%,rgba(143,208,255,0.6))]",
      )}
    >
      <span
        ref={spinner}
        className="absolute top-1/2 left-1/2 aspect-square w-[120%] -translate-1/2 bg-[conic-gradient(transparent_0deg,transparent_200deg,var(--glow-2)_250deg,#fff_318deg,var(--glow-2)_338deg,transparent_360deg)] will-change-transform motion-reduce:hidden"
      />
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
