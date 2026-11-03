"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SmallLockIcon } from "./icons";
import { livePing } from "./ui";

const DURATION = 5200;
const TOAST_SHOWN = 3400;
const TOAST_GAP = 900;
const SCREENS = [
  {
    src: "/images/tour-operator/screen-dispatch.webp",
    alt: "FunDallas Tours dispatch workspace",
    width: 1600,
    height: 1133,
    url: "FunDallas Tours · dispatch",
  },
  {
    src: "/images/tour-operator/beavita-dashboard-en.webp",
    alt: "BeaVita Tours operations dashboard",
    width: 1310,
    height: 812,
    url: "BeaVita Tours · dashboard",
  },
  {
    src: "/images/tour-operator/screen-planning.webp",
    alt: "Tour planning calendar",
    width: 1400,
    height: 761,
    url: "FunDallas Tours · planning",
  },
  {
    src: "/images/tour-operator/beavita-messages-en.webp",
    alt: "Customer messages",
    width: 1310,
    height: 812,
    url: "BeaVita Tours · messages",
  },
];

const toastIcons = {
  book: {
    color: "#0689FF",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
    width: 2.2,
  },
  ok: { color: "#061773", icon: <path d="m5 12.5 4.5 4.5L19 7.5" />, width: 2.6 },
  wa: {
    color: "#1DAA61",
    icon: <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12Z" />,
    width: 2.2,
  },
  pdf: {
    color: "#C2702A",
    icon: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    width: 2.2,
  },
};
const TOASTS = ["book", "ok", "wa", "pdf"] as const;

/** Product preview in the hero: four screens that rotate, with tabs and "live" notifications. */
export function Showcase() {
  const t = useTranslations("TourOperator");
  const locale = useLocale();
  const showRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [runId, setRunId] = useState(0);
  const [hover, setHover] = useState(false);
  const [toast, setToast] = useState({ index: 0, on: false });
  const go = useRef<(i: number) => void>(() => {});

  // screens: advance every DURATION while visible and not hovered
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { current: 0, inView: true, hover: false, timer: 0 };
    const schedule = () => {
      clearTimeout(state.timer);
      if (reduce || !state.inView || state.hover) return;
      state.timer = window.setTimeout(
        () => go.current((state.current + 1) % SCREENS.length),
        DURATION,
      );
    };
    go.current = (i: number) => {
      state.current = i;
      setCurrent(i);
      setRunId((n) => n + 1);
      schedule();
    };
    const show = showRef.current!;
    const enter = () => {
      state.hover = true;
      setHover(true);
      clearTimeout(state.timer);
    };
    const leave = () => {
      state.hover = false;
      setHover(false);
      go.current(state.current);
    };
    show.addEventListener("mouseenter", enter);
    show.addEventListener("mouseleave", leave);
    const io = new IntersectionObserver(([entry]) => {
      state.inView = entry.isIntersecting;
      if (state.inView) schedule();
      else clearTimeout(state.timer);
    });
    io.observe(show);
    go.current(0);
    return () => {
      clearTimeout(state.timer);
      io.disconnect();
      show.removeEventListener("mouseenter", enter);
      show.removeEventListener("mouseleave", leave);
    };
  }, []);

  // toasts: each one shows for TOAST_SHOWN, then the next one follows TOAST_GAP later
  const toastIndex = useRef(0);
  const toastLocale = useRef(locale);
  useEffect(() => {
    // with reduced motion the first toast simply stays
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const cycle = TOAST_SHOWN + TOAST_GAP;
    // The feed runs from the moment the page opened (performance.now() = 0), however late
    // hydration happens; switching language replays the current toast from the start.
    let phase = 0;
    if (reduce) toastIndex.current = 0;
    else if (toastLocale.current === locale) {
      const elapsed = performance.now();
      toastIndex.current = Math.floor(elapsed / cycle);
      phase = elapsed % cycle;
    }
    toastLocale.current = locale;
    const step = (at: number) => {
      const index = toastIndex.current;
      if (at < TOAST_SHOWN) {
        setToast({ index, on: true });
        if (!reduce) timer = window.setTimeout(() => step(TOAST_SHOWN), TOAST_SHOWN - at);
      } else {
        setToast({ index, on: false });
        timer = window.setTimeout(() => {
          toastIndex.current++;
          step(0);
        }, cycle - at);
      }
    };
    step(phase);
    return () => clearTimeout(timer);
  }, [locale]);

  const kind = TOASTS[toast.index % TOASTS.length];
  const icon = toastIcons[kind];
  const tabs = [t("tabDispatch"), t("tabDashboard"), t("tabPlanning"), t("tabMessages")];
  const captions = [
    t.rich("caption1", { b }),
    t.rich("caption2", { b }),
    t.rich("caption3", { b }),
    t.rich("caption4", { b }),
  ];

  return (
    <div
      ref={showRef}
      className="group/show relative [grid-area:show] max-tour-md:mx-auto max-tour-md:w-full max-tour-md:max-w-[760px] max-tour-sm:m-0"
    >
      <div className="relative pb-[26px] max-tour-sm:pb-[18px]">
        <div className="relative [transform:perspective(1600px)_rotateY(-5deg)_rotateX(2deg)] overflow-hidden rounded-2xl bg-white shadow-[0_50px_100px_-30px_rgba(1,4,30,0.85),0_0_0_1px_rgba(255,255,255,0.14)] transition-transform duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/show:[transform:perspective(1600px)_rotateY(0)_rotateX(0)] max-tour-sm:[transform:none] max-tour-sm:rounded-xl max-tour-sm:group-hover/show:[transform:none]">
          <div className="flex h-[34px] items-center gap-[7px] border-b border-[#e3e7f2] bg-[#f2f4f9] px-3 max-tour-sm:h-[26px] max-tour-sm:gap-[5px] max-tour-sm:px-[9px]">
            {[0, 1, 2].map((i) => (
              <i key={i} className="size-2.5 rounded-full bg-[#d3d8e6] max-tour-sm:size-[7px]" />
            ))}
            <span className="mx-2.5 flex h-5 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-md bg-white text-11 whitespace-nowrap text-[#7d869f] shadow-[inset_0_0_0_1px_#e3e7f2] max-tour-sm:mx-1.5 max-tour-sm:h-4 max-tour-sm:text-9.5">
              <SmallLockIcon className="size-2.5" />
              <span>{SCREENS[current].url}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-10.5 font-semibold tracking-[0.06em] text-[#1c8c52] uppercase max-tour-sm:text-[9px]">
              <i className={cn("size-[7px] rounded-full bg-[#2bc172]", livePing)} />
              Live
            </span>
          </div>
          <div data-zoom className="relative aspect-[1310/812] cursor-zoom-in bg-mist">
            {SCREENS.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                data-active={i === current || undefined}
                // the first screen is the hero picture; the others are only needed seconds later
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                className="absolute inset-0 size-full scale-[1.025] object-cover object-left-top opacity-0 [transition:opacity_.7s_ease,scale_1.2s_cubic-bezier(.2,.7,.2,1)] data-active:scale-100 data-active:opacity-100"
              />
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
        <img
          src="/images/tour-operator/driver-app.webp"
          alt="Driver app on the phone"
          width={560}
          height={953}
          className="absolute -right-[22px] -bottom-[6px] z-3 w-[24%] max-w-[150px] animate-bob overflow-hidden rounded-22 border-[5px] border-[#0b1440] shadow-[0_30px_60px_-18px_rgba(0,0,0,0.75)] max-tour-md:-right-2 max-tour-sm:-right-[2px] max-tour-sm:bottom-0 max-tour-sm:w-[25%] max-tour-sm:rounded-[13px] max-tour-sm:border-[3px]"
        />
        <div
          aria-live="polite"
          className={cn(
            "absolute top-[22%] -left-[26px] z-4 flex max-w-[270px] translate-y-[10px] scale-[.96] items-center gap-3 rounded-14 bg-white/97 py-[11px] pr-4 pl-[11px] text-13 leading-[1.35] text-ink opacity-0 shadow-[0_24px_48px_-16px_rgba(1,4,30,0.6),0_0_0_1px_rgba(6,23,115,0.06)] [transition:opacity_.45s_ease,translate_.45s_cubic-bezier(.2,.7,.2,1),scale_.45s_cubic-bezier(.2,.7,.2,1)] max-tour-md:-left-2 max-tour-sm:top-auto max-tour-sm:bottom-2.5 max-tour-sm:left-2 max-tour-sm:max-w-[68%] max-tour-sm:gap-[9px] max-tour-sm:rounded-xl max-tour-sm:py-2 max-tour-sm:pr-3 max-tour-sm:pl-2 max-tour-sm:text-11.5",
            toast.on && "translate-y-0 scale-100 opacity-100",
          )}
        >
          <span
            className="grid size-[34px] flex-none place-items-center rounded-10 text-white max-tour-sm:size-7 max-tour-sm:rounded-lg [&>svg]:size-[18px] max-tour-sm:[&>svg]:size-[15px]"
            style={{ background: icon.color }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={icon.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon.icon}
            </svg>
          </span>
          <span>
            <b className="block font-semibold text-sg">{t(`toast${toast.index % 4}Title`)}</b>
            <small className="text-12 text-ink/55 max-tour-sm:text-10.5">
              {t(`toast${toast.index % 4}Text`)}
            </small>
          </span>
        </div>
      </div>
      <div
        role="tablist"
        aria-label="Product preview"
        className="mt-1 flex w-max max-w-full [scrollbar-width:none] gap-1.5 overflow-x-auto rounded-14 border border-white/12 bg-white/7 p-[5px] max-tour-sm:-mx-[18px] max-tour-sm:mt-2 max-tour-sm:mb-0 max-tour-sm:w-auto max-tour-sm:rounded-none max-tour-sm:border-0 max-tour-sm:bg-transparent max-tour-sm:px-[18px] max-tour-sm:py-[5px] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((label, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            onClick={() => go.current(i)}
            className="relative cursor-pointer overflow-hidden rounded-10 border-0 bg-transparent px-3.5 py-[9px] text-13.5 leading-[1.6] font-medium whitespace-nowrap text-white/70 transition-[background,color] duration-200 hover:text-white aria-selected:bg-white aria-selected:text-sg max-tour-sm:flex-none max-tour-sm:bg-white/8 max-tour-sm:px-[13px] max-tour-sm:py-2 max-tour-sm:text-13 max-tour-sm:aria-selected:bg-white"
          >
            {label}
            <span
              key={i === current ? runId : undefined}
              aria-hidden="true"
              style={{ "--progress-duration": `${DURATION}ms` } as React.CSSProperties}
              className={cn(
                "absolute right-2.5 bottom-1 left-2.5 h-[2px] origin-left scale-x-0 rounded-[2px] bg-ai",
                i === current && "animate-progress",
                hover && "[animation-play-state:paused]",
              )}
            />
          </button>
        ))}
      </div>
      <p className="mt-3 min-h-[1.5em] text-13.5 text-white/66 max-tour-sm:hidden">
        {captions.map((caption, i) => (
          <span key={i} hidden={i !== current}>
            {caption}
          </span>
        ))}
      </p>
    </div>
  );
}

const b = (chunks: React.ReactNode) => <b className="font-medium text-white">{chunks}</b>;
