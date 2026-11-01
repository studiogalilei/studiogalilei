"use client";

import { useEffect } from "react";
import { afterHydration } from "@/components/effects/after-hydration";
import { usePathname } from "@/i18n/navigation";

/*
 * Cards on every page lean slightly towards the pointer and ease in when they scroll into
 * view. A "card" is a rounded (14–22px) surface no wider than 640px inside <main>; nested
 * cards only move the innermost ones. Containers marked data-no-tilt are left alone.
 */

const CARD_RADIUS = /\brounded-(14|2xl|18|20|22|\[(15|17|19|21)px\])(?=\s|$)/;
const CARD_SURFACE = /\b(shadow-surface-\d|shadow-surface-dark|bg-white|bg-pale|bg-mist|border)\b/;

const CARD = [
  "[transform:perspective(900px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))_translateY(var(--tilt-lift,0px))]",
  "[transition:transform_.5s_cubic-bezier(.2,.7,.2,1),filter_.5s_ease]",
  "data-hover:[--tilt-lift:-5px] data-hover:drop-shadow-[0_18px_24px_#06177324]",
  "data-hover:[transition:transform_.15s_ease-out,filter_.3s_ease]",
  "data-[reveal=hidden]:translate-y-[22px] data-[reveal=hidden]:opacity-0",
  "data-[reveal=shown]:[transition:opacity_.7s_ease,translate_.7s_cubic-bezier(.2,.7,.2,1),transform_.5s_cubic-bezier(.2,.7,.2,1)]",
].join(" ");

export function CardTilt() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pointer = matchMedia("(hover: hover)").matches;
    const main = document.querySelector("main");
    if (!main) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    function move(this: HTMLElement, e: PointerEvent) {
      const r = this.getBoundingClientRect();
      this.style.setProperty(
        "--tilt-y",
        `${(((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2)}deg`,
      );
      this.style.setProperty(
        "--tilt-x",
        `${(-((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2)}deg`,
      );
      this.dataset.hover = "";
    }
    function leave(this: HTMLElement) {
      this.style.removeProperty("--tilt-x");
      this.style.removeProperty("--tilt-y");
      delete this.dataset.hover;
    }

    function enhance() {
      const candidates = Array.from(main!.querySelectorAll<HTMLElement>("div, li, a")).filter(
        (el) => {
          const c = typeof el.className === "string" ? el.className : "";
          if (el.dataset.tilt || !CARD_RADIUS.test(c) || !CARD_SURFACE.test(c)) return false;
          if (c.includes("#0A2391") || el.closest("[data-no-tilt]")) return false;
          return el.offsetWidth > 0 && el.offsetWidth <= 640;
        },
      );
      for (const el of candidates) {
        if (candidates.some((other) => other !== el && el.contains(other))) continue;
        el.dataset.tilt = "on";
        el.classList.add(...CARD.split(" "));
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.dataset.reveal = "hidden";
          reveal.observe(el);
        }
        if (pointer) {
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
        }
      }
    }

    // cards can appear later (client state, lazy sections): re-check on DOM changes
    let timer = 0;
    const schedule = () => {
      clearTimeout(timer);
      timer = window.setTimeout(enhance, 30);
    };
    const observer = new MutationObserver(schedule);
    // cards still waiting to ease in (e.g. after this effect re-ran) are observed again
    main.querySelectorAll('[data-reveal="hidden"]').forEach((el) => reveal.observe(el));
    // cards are server-rendered: enhance them only once React has hydrated them
    const cancel = afterHydration(() => {
      observer.observe(main, { childList: true, subtree: true });
      enhance();
    });
    return () => {
      cancel();
      clearTimeout(timer);
      observer.disconnect();
      reveal.disconnect();
    };
  }, [pathname]);

  return null;
}
