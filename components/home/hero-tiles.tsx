"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { LogoTree, LogoWordmark } from "@/components/logo";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

// Back to front; each tile drifts more the closer it is (parallax): `drift` is in em per unit of
// pointer offset, `depth` the CSS variable of its distance.
const TILES = [
  {
    label: "AI",
    color: "#0689FF",
    href: "/servizi/intelligenza-artificiale",
    className: "top-[1em] left-0",
    depth: "var(--tile-zb)",
    drift: -0.4,
  },
  {
    label: "Marketing",
    color: "#D21205",
    href: "/servizi/marketing",
    className: "top-[5.5em] left-[31%]",
    depth: "var(--tile-zm)",
    drift: 0.3,
  },
  {
    label: "Software",
    color: "#2F6B33",
    href: "/servizi/sviluppo-software",
    className: "top-[10em] left-[62%]",
    depth: "var(--tile-zf)",
    drift: 1,
  },
];

/**
 * The three 3D service tiles of the hero. On desktop they tilt with the pointer over the hero,
 * on touch screens they sway on their own (transform keyframes, so the compositor runs it);
 * each one opens its service page.
 */
export function HeroTiles() {
  const t = useTranslations("Home.hero");
  const router = useRouter();
  const label = useRef<HTMLAnchorElement>(null);
  const tiles = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const el = tiles.current;
    const section = el?.closest("section");
    if (!el || !section || !matchMedia("(hover: hover)").matches) return;
    const vars = ["--tile-rx", "--tile-ry", "--tile-mx", "--tile-my"];
    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const my = ((e.clientY - r.top) / r.height) * 2 - 1;
      el.style.setProperty("--tile-ry", `${(mx * 9).toFixed(2)}deg`);
      el.style.setProperty("--tile-rx", `${(-my * 7).toFixed(2)}deg`);
      el.style.setProperty("--tile-mx", mx.toFixed(3));
      el.style.setProperty("--tile-my", my.toFixed(3));
    };
    const leave = () => vars.forEach((v) => el.style.removeProperty(v));
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  // The tiles sit on a diagonal: centre the label on the tile group, not on the column.
  useEffect(() => {
    const center = () => {
      const a = label.current;
      const group = tiles.current?.querySelectorAll("[data-tile]");
      if (!a || !group?.length) return;
      let left = Infinity;
      let right = -Infinity;
      group.forEach((tile) => {
        const r = tile.getBoundingClientRect();
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
      });
      const r = a.getBoundingClientRect();
      setShift((current) => Math.round((left + right) / 2 - ((r.left + r.right) / 2 - current)));
    };
    center();
    const timer = setTimeout(center, 700);
    document.fonts.ready.then(center);
    let resize = 0;
    const onResize = () => {
      clearTimeout(resize);
      resize = window.setTimeout(center, 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      clearTimeout(resize);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Link
        ref={label}
        href="/servizi"
        style={{ translate: `${shift}px 0` }}
        className="mx-auto mb-1 block w-fit text-14 font-semibold tracking-[0.18em] text-white/85 uppercase hover:text-white"
      >
        {t("exploreServices")}
      </Link>
      <div
        data-no-tilt
        aria-hidden="true"
        className="w-full select-none perspective-[2000px] perspective-origin-[10%_30%]"
      >
        <div
          ref={tiles}
          className={cn(
            "pointer-events-none relative h-[27em] w-full text-[length:clamp(8px,1.05vw,15px)] transform-3d max-md:text-[length:clamp(8px,2.6vw,12px)]",
            "[--tile-bx:10deg] [--tile-by:-24deg] [--tile-bz:1.5deg] [--tile-zb:-150px] [--tile-zf:90px] [--tile-zm:-30px]",
            "max-md:[--tile-bx:7deg] max-md:[--tile-by:-14deg] max-md:[--tile-bz:1deg] max-md:[--tile-zb:-90px] max-md:[--tile-zf:60px]",
            "[transform:rotateX(calc(var(--tile-bx)+var(--tile-rx)))_rotateY(calc(var(--tile-by)+var(--tile-ry)))_rotate(var(--tile-bz))]",
            // the pointer sets the variables; the resulting transform eases on the compositor
            "will-change-transform [transition:transform_.5s_cubic-bezier(.2,.7,.2,1)]",
            "[@media(hover:none)]:animate-tile-sway",
          )}
        >
          {/* soft shadow: a wide radial falloff instead of a blur filter */}
          <div className="pointer-events-none absolute right-[-3%] -bottom-[2.6em] left-[7%] h-[7.2em] [transform:translateZ(-220px)] bg-[radial-gradient(closest-side,#01041e8c,#01041e47_50%,#01041e14_78%,#0000)]" />
          {TILES.map((tile) => (
            <div
              key={tile.label}
              data-tile
              onClick={() => router.push(tile.href)}
              style={
                {
                  background: tile.color,
                  "--tile-z": tile.depth,
                  "--tile-k": tile.drift,
                } as React.CSSProperties
              }
              className={cn(
                "pointer-events-auto absolute flex h-[15.5em] w-[12.5em] cursor-pointer flex-col items-center justify-center rounded-[1.2em] shadow-[inset_0_1px_#ffffff40,0_0_0_1px_#ffffff1f,0_60px_100px_-30px_#01041ebf] will-change-transform [-webkit-tap-highlight-color:transparent] [transition:transform_.45s_cubic-bezier(.2,.7,.2,1)] transform-3d",
                "[transform:translateZ(var(--tile-z))_translate3d(calc(var(--tile-mx)*var(--tile-k)*1em),calc(var(--tile-my)*var(--tile-k)*1em),0)]",
                "[@media(hover:none)]:animate-tile-drift",
                tile.className,
              )}
            >
              <LogoTree className="h-[40%] w-auto text-white" />
              <LogoWordmark className="mt-[1.1em] h-[1.05em] w-auto text-white" />
              <p className="mt-[0.35em] text-center text-[1.05em] leading-none font-semibold tracking-[0.04em] text-white">
                {tile.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
