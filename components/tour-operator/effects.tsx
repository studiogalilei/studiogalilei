"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { EmailLink, useTour, WhatsAppLink } from "./context";
import { MailIcon, WhatsAppIcon } from "./icons";
import { button } from "./ui";

/** Reveal-on-scroll for [data-reveal] blocks and click-to-zoom for [data-zoom] screenshots. */
export function TourEffects() {
  const { setLightbox, root } = useTour();

  // anchor and focus scrolling stop below the sticky header (the original's html scroll-padding)
  useEffect(() => {
    const html = document.documentElement;
    const phone = matchMedia("(max-width: 720px)");
    const apply = () => (html.style.scrollPaddingTop = phone.matches ? "70px" : "84px");
    apply();
    phone.addEventListener("change", apply);
    // the browser jumped to the #fragment before this padding existed: line it up again
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target && root.current?.contains(target)) target.scrollIntoView();
    return () => {
      phone.removeEventListener("change", apply);
      html.style.scrollPaddingTop = "";
    };
  }, [root]);

  useEffect(() => {
    const blocks = root.current!.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      blocks.forEach((el) => (el.dataset.in = ""));
      return;
    }
    const show = (el: Element) => {
      (el as HTMLElement).dataset.in = "";
      io.unobserve(el);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    blocks.forEach((el) => io.observe(el));
    // a fast scroll can jump over a block between two frames: reveal what is already above
    const onScroll = () =>
      blocks.forEach((el) => {
        if (!("in" in el.dataset) && el.getBoundingClientRect().bottom < 0) show(el);
      });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [root]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const box = (e.target as Element).closest<HTMLElement>("[data-zoom]");
      if (!box) return;
      const img =
        box.querySelector<HTMLImageElement>("img[data-active]") ??
        Array.from(box.querySelectorAll("img")).find((im) => im.offsetParent !== null);
      if (!img) return;
      const w = window.innerWidth;
      setLightbox({
        src: img.currentSrc || img.src,
        width: w <= 720 ? Math.round(Math.max(w * 2.1, 700)) : Math.min(1600, Math.round(w * 0.92)),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [setLightbox]);

  return null;
}

/** Full-screen, scrollable view of a screenshot. */
export function Lightbox() {
  const t = useTranslations("TourOperator");
  const { lightbox, setLightbox } = useTour();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, setLightbox]);

  if (!lightbox) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot"
      onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
      className="fixed inset-0 z-100 flex animate-[fade-up_.25s_ease] flex-col bg-[rgba(4,15,77,0.94)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 text-13 text-white/75">
        <span>{t("lightboxHint")}</span>
        <button
          type="button"
          aria-label="Close"
          onClick={() => setLightbox(null)}
          className="size-11 cursor-pointer rounded-xl border-0 bg-white text-[26px] leading-none font-normal text-sg"
        >
          &times;
        </button>
      </div>
      <div
        onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        className="flex flex-1 items-center justify-center-safe overflow-auto px-4 pb-6"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
        <img
          src={lightbox.src}
          alt=""
          style={{ width: lightbox.width }}
          className="h-auto max-w-none rounded-xl bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}

/** Mobile bar with the two contact buttons, shown once the hero buttons scroll away. */
export function StickyBar() {
  const { lightbox, root } = useTour();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = root.current!.querySelector("#hero-cta");
    const final = root.current!.querySelector("#final");
    if (!heroCta || !final) return;
    const onScroll = () => {
      const hero = heroCta.getBoundingClientRect();
      const past = hero.bottom < 0 || hero.top > window.innerHeight;
      const end = final.getBoundingClientRect();
      const atFinal = end.top < window.innerHeight && end.bottom > 0;
      setShow(past && !atFinal);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [root]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 hidden translate-y-[110%] gap-2.5 border-t border-white/10 bg-[rgba(4,15,77,0.9)] px-3.5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[14px] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] max-tour-sm:flex",
        show && !lightbox && "translate-y-0",
      )}
    >
      <WhatsAppLink className={button({ kind: "whatsapp", size: "sticky" })}>
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </WhatsAppLink>
      <EmailLink className={button({ kind: "email", size: "sticky", delayGlow: true })}>
        <MailIcon />
        <span>Email</span>
      </EmailLink>
    </div>
  );
}
