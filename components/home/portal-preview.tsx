"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const POINTS = [62, 58, 59, 50, 48, 42, 40, 33, 30];
const WIDTH = 380;
const HEIGHT = 70;
const LINE = POINTS.map(
  (y, i) => `${i ? "L" : "M"}${(i * WIDTH) / (POINTS.length - 1)} ${y - 25}`,
).join(" ");
const COUNT_UP_MS = 1400;

type Phase = "static" | "armed" | "playing";

/** Animates the first number in each KPI ("+18%", "−9%", "7/9") from zero. */
function useCountUp(playing: boolean) {
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - start) / COUNT_UP_MS));
      setProgress(1 - Math.pow(1 - k, 3)); // ease-out cubic
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    let frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  return (value: string) =>
    progress >= 1
      ? value
      : value.replace(/\d+/, (n) => String(Math.round(parseInt(n, 10) * progress)));
}

/** Partner portal mock-up: KPIs count up and the chart draws itself when it scrolls into view. */
export function PortalPreview() {
  const t = useTranslations("Home.portal");
  const figure = useRef<HTMLElement>(null);
  const line = useRef<SVGPathElement>(null);
  const [phase, setPhase] = useState<Phase>("static");
  const [length, setLength] = useState(0);
  const count = useCountUp(phase === "playing");

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !figure.current) return;
    setLength(line.current?.getTotalLength() ?? 0);
    setPhase("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase("playing");
      },
      { threshold: 0.4 },
    );
    io.observe(figure.current);
    return () => io.disconnect();
  }, []);

  const armed = phase !== "static";
  const playing = phase === "playing";
  // the window dots and the sidebar bars grow from the left, one after the other
  const grow = (i: number, className: string) => ({
    style: playing ? { animationDelay: `${i * 0.08}s` } : undefined,
    className: cn(
      className,
      armed && "origin-left [transform:scaleX(0)]",
      playing && "animate-bar-grow",
    ),
  });
  const kpis = [
    ["Lead", "+18%"],
    ["CPL", "−9%"],
    [t("tasks"), "7/9"],
  ];

  return (
    <figure
      ref={figure}
      aria-label={t("label")}
      className="overflow-hidden rounded-18 border border-sg/10 bg-white shadow-[0_30px_60px_-30px_rgba(6,23,115,.25)]"
    >
      <div className="flex gap-2 border-b border-sg/10 px-5 py-4" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} {...grow(i, "size-2.5 rounded-full bg-sg/15")} />
        ))}
      </div>
      <div className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr]">
        <div className="space-y-3 bg-mist px-4 py-6" aria-hidden="true">
          {["w-4/5 bg-sg", "w-full bg-sg/12", "w-3/4 bg-sg/12", "w-4/5 bg-sg/12"].map((bar, i) => (
            <span key={i} {...grow(i, cn("block h-2.5 rounded-full", bar))} />
          ))}
        </div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {kpis.map(([label, value], i) => (
              <div
                key={label}
                style={playing ? { animationDelay: `${i * 0.1}s` } : undefined}
                className={cn(
                  "rounded-10 bg-pale px-3 py-3 sm:px-4",
                  armed && "translate-y-2.5 opacity-0",
                  playing && "animate-kpi-rise",
                )}
              >
                <p className="text-12 text-ink/60 sm:text-13">{label}</p>
                <p className="mt-1 text-16 font-semibold text-sg sm:text-18">{count(value)}</p>
              </div>
            ))}
          </div>
          <div className="@container relative mt-5">
            <svg
              viewBox={`-10 0 ${WIDTH + 20} ${HEIGHT}`}
              className="block w-full"
              aria-hidden="true"
            >
              {armed && (
                <>
                  <defs>
                    <linearGradient id="sg-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#0689FF" stopOpacity=".22" />
                      <stop offset="1" stopColor="#0689FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* The original area path broke right after the line ("L NaN 70"), so only the
                      line's own outline gets filled; the end dot likewise landed at x = 0. */}
                  <path
                    d={LINE}
                    fill="url(#sg-area)"
                    className={cn("opacity-0", playing && "animate-chart-area")}
                  />
                </>
              )}
              <path
                ref={line}
                d={LINE}
                fill="none"
                stroke="#0689FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={armed ? { strokeDasharray: length, strokeDashoffset: length } : undefined}
                className={cn(playing && "animate-chart-draw")}
              />
            </svg>
            {/* The end dot (at x = 0, see above) is an HTML element, not an SVG circle, so its
                endless pulse is a compositor animation instead of a repaint every frame. */}
            {armed && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[7.143%] left-[2.5%] size-[2.25cqw] -translate-1/2 rounded-full border-[0.5cqw] border-white bg-ai opacity-0",
                  "after:absolute after:-inset-[0.5cqw] after:rounded-full after:opacity-0 after:shadow-[0_0_5px_1px_#0689ffb3] after:content-['']",
                  playing && "animate-chart-dot after:animate-dot-glow",
                )}
              />
            )}
          </div>
          <figcaption className="mt-3 text-right text-12.5 text-ink/45">{t("caption")}</figcaption>
        </div>
      </div>
    </figure>
  );
}
