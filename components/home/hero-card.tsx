"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { LogoTree, LogoWordmark } from "@/components/logo";
import { Link } from "@/i18n/navigation";

/**
 * The hero's single card: the "StudioGalilei Software & AI" mark. On desktop it tilts towards
 * the pointer and a soft light follows it; on touch screens it floats on its own. It opens the
 * services page. (It replaced the three service tiles on 25/11/2026.)
 */
export function HeroCard() {
  const t = useTranslations("Home.hero");
  const card = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = card.current;
    const section = el?.closest("section");
    if (!el || !section || !matchMedia("(hover: hover)").matches) return;
    const vars = ["--card-rx", "--card-ry", "--card-lx", "--card-ly"];
    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--card-ry", `${(mx * 10).toFixed(2)}deg`);
      el.style.setProperty("--card-rx", `${(-my * 8).toFixed(2)}deg`);
      el.style.setProperty("--card-lx", `${(50 + mx * 40).toFixed(1)}%`);
      el.style.setProperty("--card-ly", `${(40 + my * 40).toFixed(1)}%`);
    };
    const leave = () => vars.forEach((v) => el.style.removeProperty(v));
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-7">
      <Link
        href="/servizi"
        className="text-14 font-semibold tracking-[0.18em] text-cream uppercase hover:text-white"
      >
        {t("exploreServices")}
      </Link>
      <div data-no-tilt className="perspective-[1600px]">
        <Link
          ref={card}
          href="/servizi"
          aria-label="StudioGalilei Software & AI"
          className="group relative isolate flex aspect-[21/20] w-[min(78vw,340px)] [transform:rotateX(var(--card-rx,6deg))_rotateY(var(--card-ry,-14deg))] flex-col items-center justify-center overflow-hidden rounded-[28px] bg-sg text-white shadow-[inset_0_1px_#ffffff40,0_0_0_1px_#ebdcbe59,0_60px_100px_-30px_#01041ed9] will-change-transform [transition:transform_.5s_cubic-bezier(.2,.7,.2,1),box-shadow_.3s] hover:shadow-[inset_0_1px_#ffffff59,0_0_0_1.5px_#ebdcbe,0_70px_110px_-30px_#01041e] md:w-[380px] [@media(hover:none)]:animate-bob"
        >
          {/* a soft light that follows the pointer */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-1 bg-[radial-gradient(60%_55%_at_var(--card-lx,70%)_var(--card-ly,15%),#ffffff2e,#0000_70%)]"
          />
          {/* a sheen crossing the card on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-full -z-1 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-[left] duration-700 ease-out group-hover:left-[130%]"
          />
          <LogoTree className="h-[52%] w-auto" />
          <LogoWordmark className="mt-[5%] h-[8.5%] w-auto" />
          <span className="mt-[2.5%] text-[clamp(17px,5vw,25px)] leading-none font-semibold tracking-[0.2em] md:text-[27px]">
            Software &amp; AI
          </span>
        </Link>
      </div>
    </div>
  );
}
