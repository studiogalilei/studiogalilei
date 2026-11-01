"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useTour } from "./context";
import { reveal } from "./ui";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Logo link in the hero that opens a case study and scrolls to it. */
export function CaseLink({ index, children }: { index: number; children: React.ReactNode }) {
  const { openCase, root } = useTour();
  return (
    <a
      href={index === 0 ? "#fundallas" : "#beavita"}
      onClick={(e) => {
        e.preventDefault();
        openCase(index);
        root.current
          ?.querySelector("#cases")
          ?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
      }}
      className="inline-flex items-center gap-2.5 no-underline opacity-92 transition-[opacity,translate] duration-200 hover:-translate-y-px hover:opacity-100"
    >
      {children}
    </a>
  );
}

/** Two-way switch between the FunDallas and BeaVita case studies. */
export function CaseSwitch({ cases }: { cases: { name: string; detail: string }[] }) {
  const { caseIndex, openCase } = useTour();
  return (
    <div
      role="tablist"
      aria-label="Case studies"
      data-reveal
      className={cn(
        reveal(),
        "relative mt-9 mb-14 inline-grid grid-cols-2 rounded-18 bg-white p-1.5 shadow-surface-2 max-tour-sm:mt-[26px] max-tour-sm:mb-9 max-tour-sm:grid max-tour-sm:w-full",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-[13px] bg-sg shadow-[0_12px_24px_-10px_rgba(6,23,115,0.6)] transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]",
          caseIndex === 1 && "[transform:translateX(100%)]",
        )}
      />
      {cases.map(({ name, detail }, i) => (
        <button
          key={name}
          type="button"
          role="tab"
          aria-selected={caseIndex === i}
          onClick={() => openCase(i)}
          className="relative z-1 flex cursor-pointer items-center gap-3 rounded-[13px] border-0 bg-transparent px-[22px] py-3 text-left text-16 leading-[1.6] font-normal text-sg transition-colors duration-300 aria-selected:text-white max-tour-sm:gap-2 max-tour-sm:px-3 max-tour-sm:py-2.5"
        >
          <span className="block leading-[1.25]">
            <b className="block text-15 font-semibold max-tour-sm:text-14">{name}</b>
            <small className="text-12.5 opacity-70 max-tour-sm:text-11.5">
              <span className="block leading-[1.25]">{detail}</span>
            </small>
          </span>
        </button>
      ))}
    </div>
  );
}

/** A case study, shown when selected; its reveal-on-scroll blocks appear at once when opened. */
export function CasePanel({
  index,
  id,
  children,
}: {
  index: number;
  id: string;
  children: React.ReactNode;
}) {
  const { caseIndex } = useTour();
  const ref = useRef<HTMLDivElement>(null);
  const active = caseIndex === index;
  const wasActive = useRef(active);
  const hashHandled = useRef(false);

  useEffect(() => {
    const opened = active && !wasActive.current;
    wasActive.current = active;
    if (!opened || !ref.current) return;
    ref.current
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => (el.dataset.in = ""));
    // opened from the address (/tour-operator#beavita): the browser couldn't scroll to it while hidden
    if (!hashHandled.current && location.hash === `#${id}`) ref.current.scrollIntoView();
    hashHandled.current = true;
  }, [active, id]);

  return (
    <div ref={ref} id={id} role="tabpanel" className={active ? "block animate-fade-up" : "hidden"}>
      {children}
    </div>
  );
}

/** Number that counts up the first time it becomes visible. */
export function CountUp({
  end,
  suffix = "",
  className,
}: {
  end: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { caseIndex } = useTour();
  const [value, setValue] = useState<number | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current!;
    const run = () => {
      if (done.current || !el.getClientRects().length) return;
      done.current = true;
      if (reduceMotion()) return;
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 900, 1);
        setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    run();
    const io = new IntersectionObserver(([e]) => e.isIntersecting && run(), { threshold: 0.4 });
    io.observe(el.parentElement!.parentElement!);
    return () => io.disconnect();
  }, [end, caseIndex]);

  return (
    <b ref={ref} className={className}>
      {(value ?? end) + suffix}
    </b>
  );
}

/** BeaVita app tour: tabs switching the screenshot and its description. */
export function AppTabs({
  tabs,
  panes,
  texts,
  zoom,
}: {
  tabs: React.ReactNode[];
  panes: { src: string; alt: string }[];
  texts: React.ReactNode[];
  zoom: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div
        role="tablist"
        className="mb-[22px] flex flex-wrap gap-2 max-tour-sm:-mx-[18px] max-tour-sm:mb-4 max-tour-sm:[scrollbar-width:none] max-tour-sm:flex-nowrap max-tour-sm:overflow-x-auto max-tour-sm:px-[18px] max-tour-sm:pt-1 max-tour-sm:pb-2.5 max-tour-sm:[&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((label, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="cursor-pointer rounded-10 border-0 bg-white px-4 py-2.5 text-14.5 leading-[1.6] font-medium text-sg shadow-surface-1 transition-[background,color,box-shadow] duration-150 hover:bg-pale aria-selected:bg-sg aria-selected:text-white aria-selected:shadow-[0_10px_20px_-10px_rgba(6,23,115,0.6)] max-tour-sm:whitespace-nowrap"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-12 max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:gap-9 max-tour-sm:gap-5">
        <div
          data-zoom
          className="group/shot relative cursor-zoom-in overflow-hidden rounded-18 bg-white shadow-surface-3"
        >
          {zoom}
          {panes.map((pane, i) => (
            <div key={pane.src} className={i === active ? "block animate-fade-up-fast" : "hidden"}>
              {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
              <img
                src={pane.src}
                alt={pane.alt}
                width={1310}
                height={812}
                loading="lazy"
                className="w-full"
              />
            </div>
          ))}
        </div>
        <div>
          {texts.map((text, i) => (
            <div key={i} className={i === active ? "block animate-fade-up-fast" : "hidden"}>
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
