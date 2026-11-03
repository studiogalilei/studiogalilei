"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect, useOptimistic, useRef, useState, useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const OPTIONS = [
  { value: "en", label: "EN" },
  { value: "it", label: "ITA" },
] as const satisfies { value: Locale; label: string }[];

const SLIDE_MS = 300;

/**
 * Switching language swaps the whole page (the locale is the root segment), usually before
 * the pill has finished sliding: the new switcher picks the slide up from where the old one was.
 */
let slide: { translate: string; width: string; left: number; at: number } | null = null;

/**
 * EN / ITA toggle. "sky" is the white-on-navy look of the home page header.
 * A pill slides under the chosen language as soon as it is clicked, while the page loads its
 * texts in the background. Before hydration the active button paints the pill itself.
 */
export function LanguageSwitcher({
  tone = "default",
  className,
}: {
  tone?: "default" | "sky";
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  // The language the pill points at: the clicked one while the switch is under way, the
  // page's own otherwise. (Optimistic, so it cannot go stale: Next keeps the previous page
  // alive but hidden and shows it again when switching back, with whatever state it had.)
  const [selected, select] = useOptimistic<Locale, Locale>(locale, (_, next) => next);

  const group = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);
  const placed = useRef(false);

  // Leaving the screen (unmounted, or hidden by Next to be shown again later) mid-slide: hand
  // the slide over to the switcher that takes this one's place. Whenever this one shows
  // again, its pill is placed afresh, without sliding from where it was left.
  useLayoutEffect(() => {
    const el = pill.current;
    return () => {
      placed.current = false;
      const running = el?.getAnimations()[0];
      if (!el || !running || !el.isConnected) return;
      const style = getComputedStyle(el);
      const total = Number(running.effect?.getComputedTiming().duration ?? SLIDE_MS);
      slide = {
        translate: style.translate,
        width: style.width,
        left: total - Number(running.currentTime ?? 0),
        at: performance.now(),
      };
    };
  }, []);

  // place the pill under the selected button; it slides from there on, but not the first time
  useLayoutEffect(() => {
    const root = group.current;
    const el = pill.current;
    const button = root?.querySelector<HTMLElement>(`[lang="${selected}"]`);
    if (!root || !el || !button) return;
    const place = () => {
      const first = !placed.current;
      if (first) el.style.transition = "none";
      el.style.width = `${button.offsetWidth}px`;
      el.style.height = `${button.offsetHeight}px`;
      el.style.translate = `${button.offsetLeft}px ${button.offsetTop}px`;
      if (!first) return;
      void el.offsetWidth; // commit the position before transitions come back
      el.style.transition = "";
      placed.current = true;
      // finish a slide the previous switcher (before the remount) had started
      const left = slide ? slide.left - (performance.now() - slide.at) : 0;
      if (slide && left > 0) {
        el.animate(
          [
            { translate: slide.translate, width: slide.width },
            { translate: el.style.translate, width: el.style.width },
          ],
          { duration: left, easing: "cubic-bezier(.3,.6,.3,1)" },
        );
      }
      slide = null;
    };
    place();
    setReady(true);
    // the labels widen when Poppins arrives
    const observer = new ResizeObserver(place);
    observer.observe(button);
    return () => observer.disconnect();
  }, [selected]);

  const sky = tone === "sky";
  return (
    <div
      ref={group}
      role="group"
      aria-label={locale === "en" ? "Language" : "Lingua"}
      aria-busy={pending || undefined}
      className={cn(
        "relative isolate inline-flex items-center gap-0.5 rounded-10 border p-0.5 text-13 font-semibold tracking-[0.04em] transition-[border-color] duration-[350ms]",
        sky ? "border-white/25" : "border-[#DADEE6]",
        className,
      )}
    >
      <span
        ref={pill}
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 -z-1 rounded-[7px] transition-[translate,width,background-color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none",
          sky ? "bg-white" : "bg-[#E4E7ED]",
          !ready && "invisible",
        )}
      />
      {OPTIONS.map(({ value, label }) => {
        const active = selected === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => {
              if (value === selected) return;
              startTransition(async () => {
                select(value);
                // first the cookie (this also drops pages cached in the old language), then the
                // current page in the new language
                await setLocale(value);
                router.replace(pathname, { locale: value, scroll: false });
              });
            }}
            aria-pressed={active}
            lang={value}
            className={cn(
              "rounded-[7px] px-2.5 py-1.5 transition-colors duration-300",
              sky
                ? active
                  ? "text-sg"
                  : "text-white/55 hover:text-white"
                : active
                  ? "text-ink"
                  : "text-ink/50 hover:text-ink",
              active && !ready && (sky ? "bg-white" : "bg-[#E4E7ED]"),
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
