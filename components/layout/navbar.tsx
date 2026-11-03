"use client";

import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Briefcase,
  ChevronRight,
  Globe,
  House,
  LayoutGrid,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Plane,
  UserPlus,
  Users,
  X,
} from "@/components/icons";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { LogoTree, LogoWordmark } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { Link, usePathname } from "@/i18n/navigation";
import { company } from "@/lib/company";
import { cn } from "@/lib/cn";

const desktopNav = [
  { key: "about", href: "/chi-siamo" },
  { key: "services", href: "/servizi" },
  { key: "caseStudies", href: "/casi-studio" },
  { key: "tourOperator", href: "/tour-operator" },
] as const;

const mobileNav = [
  { key: "home", href: "/", icon: House },
  { key: "about", href: "/chi-siamo", icon: Users },
  { key: "services", href: "/servizi", icon: LayoutGrid },
  { key: "caseStudies", href: "/casi-studio", icon: Briefcase },
  { key: "tourOperator", href: "/tour-operator", icon: Plane },
  { key: "careers", href: "/lavora-con-noi", icon: UserPlus },
  { key: "privateArea", href: "/area-partner", icon: Lock },
] as const;

type NavKey = (typeof desktopNav)[number]["key"];

/** The pages whose hero reaches up behind the navbar, transparent over it at the top. */
const heroPages = new Set<string>(["/", "/chi-siamo", "/casi-studio", "/tour-operator"]);

/**
 * The site's one navigation bar, rendered by the root layout on every page. On the pages with a
 * hero (heroPages) it floats transparent over it until the page scrolls or the menu opens; from
 * then on it is the same white bar, with the same soft shadow, as on every other page.
 */
export function Navbar() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // On the hero pages the bar floats over the hero (it does not take up room above it) and is
  // transparent there, the "sky" look, only while the page is at the top and the menu closed.
  const overHero = heroPages.has(pathname);
  const sky = overHero && !scrolled && !menuOpen;

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    // a new page opens at the top: arriving on a hero page, the transition already captures the
    // transparent bar (the scroll listener corrects this right after if it is not at the top)
    setScrolled(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Hero pages: the bar turns white past the hero's top. Other pages: it lifts with a soft shadow
  // as soon as the page scrolls under it.
  useEffect(() => {
    // only tell React when the state flips: a setState per scroll event re-renders the header
    let last: boolean | undefined;
    const onScroll = () => {
      const next = window.scrollY > (overHero ? 24 : 4);
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero, pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const activeKey = desktopNav.find(({ href }) => isActive(href))?.key;
  // Where a click is taking the page: the bar shows its link as the current one at once (or no
  // link, for home or contacts), without waiting for the new page to load. It clears when the
  // router arrives there; a later click replaces it, back/forward drops it.
  const [pendingKey, setPendingKey] = useState<NavKey | "none" | null>(null);
  const pendingArrived = pendingKey === (activeKey ?? "none");
  if (pendingKey && pendingArrived) setPendingKey(null);
  const shownKey =
    pendingKey && !pendingArrived ? (pendingKey === "none" ? undefined : pendingKey) : activeKey;

  useEffect(() => {
    // capture phase: next/link cancels the default once its own handler has run
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const match = (href: string) => url.pathname === href || url.pathname.startsWith(href + "/");
      setPendingKey(desktopNav.find(({ href }) => match(href))?.key ?? "none");
    };
    const drop = () => setPendingKey(null);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", drop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", drop);
    };
  }, []);
  // a navigation that never arrives (cancelled, failed) gives the underline back to the page
  useEffect(() => {
    if (!pendingKey) return;
    const timer = setTimeout(() => setPendingKey(null), 8000);
    return () => clearTimeout(timer);
  }, [pendingKey]);

  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const [indicatorReady, setIndicatorReady] = useState(false);
  useIndicator(nav, indicator, shownKey, () => setIndicatorReady(true));
  const privateArea = t("privateArea");
  // the Platform prototype is a full-screen app with its own chrome
  if (pathname === "/platform" || pathname.startsWith("/platform/")) return null;

  return (
    // On navigation the pages fade under the bar (template.tsx). The bar is its own view
    // transition group, painted above them and shown live: its CSS transitions ease link
    // colours and its home/white look, while its current-page underline slides.
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-[350ms] ease-[ease] [view-transition-name:site-navbar]",
        overHero && "-mb-[73px]",
        sky ? "border-b-transparent bg-transparent" : "border-sg/10 bg-white",
        scrolled && "shadow-[0_8px_24px_-16px_rgba(6,23,115,.35)]",
      )}
    >
      {/* three groups with equal space between them: the links sit in the middle of the room
          between the logo and the language switcher */}
      <Container className="flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        {/* the tree symbol, transparent, drawn in currentColor: the link carries the same colour
            as the nav links in every state (white over the hero sky, ink on the white bar). On
            mobile, where the bar has room beside it, the wordmark follows in the same colour. */}
        <Link
          href="/"
          aria-label={t("backToHome")}
          className={cn(
            "flex flex-none items-center gap-2.5 transition-colors duration-300 ease-[ease]",
            sky ? "text-white/80 hover:text-white" : "text-ink/80 hover:text-sg",
          )}
        >
          <LogoTree className="block h-10 w-auto md:h-11" />
          <LogoWordmark className="hidden h-[15px] w-auto min-[340px]:block md:h-[17px] lg:hidden" />
        </Link>
        <nav
          ref={nav}
          aria-label={t("mainNavigation")}
          className="relative hidden h-full items-stretch gap-7 lg:flex"
        >
          {desktopNav.map(({ key, href }) => {
            const active = key === shownKey;
            return (
              <Link
                key={key}
                href={href}
                data-nav={key}
                aria-current={key === activeKey ? "page" : undefined}
                className={cn(
                  "group/nav relative inline-flex h-full items-center gap-1 text-15 font-medium transition-colors duration-300",
                  sky ? "text-white/80 hover:text-white" : "text-ink/80 hover:text-sg",
                  // the current page in navy, or white over the hero sky (About us)
                  active && (sky ? "text-white" : "text-sg"),
                  // before hydration the current link draws its own underline
                  active &&
                    !indicatorReady &&
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px]",
                  active && !indicatorReady && (sky ? "after:bg-white" : "after:bg-sg"),
                )}
              >
                {t(key)}
                {/* hover: a faint line grows from the centre (a transform: compositor only);
                    on the current link it shrinks away under the underline */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-[2px] scale-x-0 transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)]",
                    !active && "group-hover/nav:scale-x-100",
                    sky ? "bg-white/45" : "bg-sg/25",
                  )}
                />
              </Link>
            );
          })}
          {/* The current page's underline: one element for all the links, moved by
              useIndicator (translate and scale only, so the compositor animates it smoothly while
              the new page renders). Its colour follows the bar's, at the bar's pace. */}
          <span
            ref={indicator}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 origin-left opacity-0 transition-[background-color] duration-[350ms] ease-[ease]",
              sky ? "bg-white" : "bg-sg",
            )}
          />
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher tone={sky ? "sky" : "default"} />
          <Link
            href="/contatti"
            className={cn(
              "rounded-10 px-5 py-2.5 text-15 font-medium transition-[background-color,color,box-shadow] duration-[350ms] ease-[ease]",
              sky
                ? "bg-white text-sg shadow-[0_8px_24px_-10px_#ffffff80] hover:bg-[#e4e7ed]"
                : "bg-sg text-white hover:bg-sg-deep",
            )}
          >
            {t("contactUs")}
          </Link>
          <Link
            href="/area-partner"
            aria-label={privateArea}
            title={privateArea}
            className={cn(
              "inline-flex items-center gap-1.5 text-14 leading-none font-medium whitespace-nowrap transition-colors duration-[350ms] ease-[ease]",
              sky ? "text-white" : "text-ink/62 hover:text-sg",
            )}
          >
            <Lock size={14} strokeWidth={2.2} aria-hidden="true" className="flex-none opacity-85" />
            {privateArea}
          </Link>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/area-partner"
            aria-label={privateArea}
            title={privateArea}
            className={cn(
              "grid size-10 place-items-center rounded-10 transition-colors duration-[350ms] active:bg-pale",
              sky ? "text-white" : "text-sg/70",
            )}
          >
            <Lock size={19} strokeWidth={2} aria-hidden="true" className="flex-none opacity-85" />
          </Link>
          <button
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-lg transition-colors duration-[350ms]",
              sky ? "text-white" : "text-sg",
            )}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* the two icons cross-fade with a quarter turn */}
            <span className="relative grid size-6 [&>svg]:col-start-1 [&>svg]:row-start-1 [&>svg]:transition-[opacity,rotate,scale] [&>svg]:duration-300 [&>svg]:ease-[cubic-bezier(.2,.7,.2,1)]">
              <Menu size={24} className={cn(menuOpen && "scale-75 rotate-90 opacity-0")} />
              <X size={24} className={cn(!menuOpen && "scale-75 -rotate-90 opacity-0")} />
            </span>
          </button>
        </div>
      </Container>
      {menuOpen && (
        <div className="max-h-[calc(100dvh-72px)] animate-menu-in overflow-y-auto overscroll-contain border-t border-sg/10 bg-white lg:hidden">
          <Container className="pt-2.5 pb-[22px]">
            <nav aria-label={t("mainMenu")}>
              <ul className="m-0 grid list-none gap-0.5 p-0">
                {mobileNav.map(({ key, href, icon: Icon }) => {
                  const active =
                    href !== "/area-partner" &&
                    href !== "/tour-operator" &&
                    (href === "/" ? pathname === "/" : isActive(href));
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center gap-3.5 rounded-14 px-2 py-[9px] text-[16.5px] font-medium text-sg transition-[background] duration-150 ease-[ease] active:bg-pale",
                          active && "bg-pale",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-10 flex-none place-items-center rounded-xl",
                            active ? "bg-sg text-white" : "bg-pale text-sg",
                          )}
                        >
                          <Icon size={19} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">{t(key)}</span>
                        <ChevronRight
                          size={18}
                          className="flex-none text-sg/30"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                {
                  href: `tel:${company.phoneHref}`,
                  label: t("call"),
                  icon: Phone,
                },
                {
                  href: `https://wa.me/${company.phoneHref.replace("+", "")}`,
                  label: "WhatsApp",
                  icon: MessageSquare,
                  external: true,
                },
                { href: `mailto:${company.email}`, label: "Email", icon: Mail },
              ].map(({ href, label, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex flex-col items-center gap-1.5 rounded-14 border border-sg/12 px-1 py-3 text-13 font-semibold text-sg active:bg-pale"
                >
                  <Icon size={19} strokeWidth={2} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-14 bg-mist py-2.5 pr-3 pl-4">
              <span className="inline-flex items-center gap-2.5 text-15 font-medium text-sg">
                <Globe size={18} strokeWidth={2} aria-hidden="true" />
                {t("language")}
              </span>
              <LanguageSwitcher />
            </div>
            <Link
              href="/contatti"
              className="mt-3.5 block rounded-xl bg-sg p-[15px] text-center text-16 font-semibold text-white"
            >
              {t("contactUs")}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

/** Where the underline is drawn: its left edge in the nav, its width, its opacity. */
type Place = { x: number; w: number; o: number };

/**
 * Moves the one underline of the desktop nav to the link `key` (none: it leaves):
 * - between two links it slides, its ends easing together from one link's edges to the other's;
 * - arriving from a page with no link (home, contacts) it grows from the link's centre out to
 *   its edges, and leaving it shrinks back into its centre;
 * - a move that starts while another is running starts from where the underline is on screen,
 *   so a quick second click bends its path instead of jumping;
 * - on the first render, and whenever a label changes width (the font arrives, the window
 *   resizes), it is simply set in place.
 *
 * At rest the underline is a plain box with the link's own width, its edges on whole device
 * pixels just outside the link's (so it always spans all of it, crisp). A move is a Web
 * Animation of translate and scale only (compositor, smooth through the page's view
 * transition), FLIP style: the box takes its new width at once and the scale starts from the
 * old width's ratio, ending at exactly 1. (Stretching a 1px box instead blurs it into a
 * gradient on the GPU.) With reduced motion it is set in place every time.
 */
function useIndicator(
  nav: React.RefObject<HTMLElement | null>,
  indicator: React.RefObject<HTMLSpanElement | null>,
  key: string | undefined,
  onPlaced: () => void,
) {
  // false until the first render has set the underline in place
  const placed = useRef(false);
  const animation = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const bar = indicator.current;
    const links = nav.current;
    if (!bar || !links) return;
    const target = (): Place | null => {
      const link = key ? links.querySelector<HTMLElement>(`[data-nav="${key}"]`) : null;
      if (!link) return null;
      // the link's edges, out to the device pixels around them
      const dpr = window.devicePixelRatio || 1;
      const origin = links.getBoundingClientRect().left;
      const box = link.getBoundingClientRect();
      const left = Math.floor((box.left - origin) * dpr + 0.01) / dpr;
      const right = Math.ceil((box.right - origin) * dpr - 0.01) / dpr;
      return { x: left, w: right - left, o: 1 };
    };
    // the box at rest: its own width, unscaled (or scaled to nothing, hidden)
    const rest = (place: Place, hidden = false) => {
      animation.current?.cancel();
      animation.current = null;
      Object.assign(bar.style, {
        width: `${place.w}px`,
        translate: `${place.x}px 0`,
        scale: hidden ? "0 1" : "none",
        opacity: String(place.o),
      });
    };
    // where the underline is on screen right now, mid-animation included
    const current = (): Place => {
      const box = bar.getBoundingClientRect();
      return {
        x: box.left - links.getBoundingClientRect().left,
        w: box.width,
        o: parseFloat(getComputedStyle(bar).opacity) || 0,
      };
    };
    const animate = (frames: Keyframe[], timing: KeyframeAnimationOptions) => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      animation.current = bar.animate(frames, { ...timing, composite: "replace" });
    };
    const at = (x: number, scale: number, opacity: number): Keyframe => ({
      translate: `${x}px 0`,
      scale: `${scale} 1`,
      opacity: String(opacity),
    });

    const to = target();
    if (!placed.current) {
      // first render: in place, exactly where the server-drawn underline was
      if (to) rest(to);
      else rest({ x: 0, w: 0, o: 0 }, true);
      placed.current = true;
    } else {
      const now = current();
      const visible = now.o > 0.05 && now.w > 0.5;
      if (to && visible) {
        // slide: both ends travel together, quick to leave and soft to land
        rest(to);
        animate([at(now.x, now.w / to.w, now.o), at(to.x, 1, 1)], {
          duration: 480,
          easing: "cubic-bezier(.45,0,.15,1)",
        });
      } else if (to) {
        // appear: grow from the link's centre, fading in over the first part of the growth
        rest(to);
        animate([at(to.x + to.w / 2, 0, 0), { opacity: 1, offset: 0.4 }, at(to.x, 1, 1)], {
          duration: 420,
          easing: "cubic-bezier(.2,.75,.25,1)",
        });
      } else if (visible) {
        // leave: shrink into the centre of where it is, fading out at the end
        const width = now.w;
        rest({ x: now.x + width / 2, w: width, o: 0 }, true);
        animate(
          [at(now.x, 1, now.o), { opacity: now.o, offset: 0.55 }, at(now.x + width / 2, 0, 0)],
          {
            duration: 300,
            easing: "cubic-bezier(.5,0,.75,0)",
          },
        );
      } else {
        rest({ x: 0, w: 0, o: 0 }, true);
      }
    }
    onPlaced();

    // A label changes width when the font arrives or the window resizes: follow in place. (Only
    // on a real change: an observer also reports once when it starts, which would cut a move
    // short.)
    const widths = new Map<Element, number>();
    const observer = new ResizeObserver((entries) => {
      let changed = false;
      for (const { target: el } of entries) {
        const w = el.getBoundingClientRect().width;
        if (widths.has(el) && widths.get(el) !== w) changed = true;
        widths.set(el, w);
      }
      const place = changed ? target() : null;
      if (place) rest(place);
    });
    for (const link of links.querySelectorAll("[data-nav]")) {
      widths.set(link, link.getBoundingClientRect().width);
      observer.observe(link);
    }
    observer.observe(links);
    widths.set(links, links.getBoundingClientRect().width);
    return () => observer.disconnect();
    // onPlaced only flips a flag once: the underline moves when the key does
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nav, indicator]);
}
