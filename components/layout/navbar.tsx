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

/**
 * The site's one navigation bar, rendered by the root layout on every page. On the home page it
 * floats transparent over the hero sky until the page scrolls or the menu opens; from then on
 * it is the same white bar, with the same soft shadow, as on every other page.
 */
export function Navbar() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // On the home page the bar floats over the hero (it does not take up room above it) and is
  // transparent there, the "sky" look, only while the page is at the top and the menu closed.
  const home = pathname === "/";
  const sky = home && !scrolled && !menuOpen;

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    // a new page opens at the top: arriving on home, the transition already captures the
    // transparent bar (the scroll listener corrects this right after if it is not at the top)
    setScrolled(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Home: the bar turns navy past the hero's top. Other pages: it lifts with a soft shadow
  // as soon as the page scrolls under it.
  useEffect(() => {
    // only tell React when the state flips: a setState per scroll event re-renders the header
    let last: boolean | undefined;
    const onScroll = () => {
      const next = window.scrollY > (home ? 24 : 4);
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home, pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const activeKey = desktopNav.find(({ href }) => isActive(href))?.key;

  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const [indicatorReady, setIndicatorReady] = useState(false);
  const placed = useRef(false);
  useLayoutEffect(() => {
    const bar = indicator.current;
    const links = nav.current;
    if (!bar || !links) return;
    const link = activeKey ? links.querySelector<HTMLElement>(`[data-nav="${activeKey}"]`) : null;
    const place = (how: "slide" | "jump" | "fade-in") => {
      if (!link) {
        bar.style.opacity = "0"; // fades out where it is
        return;
      }
      // "jump": no transition at all; "fade-in": in place, only the opacity eases
      if (how !== "slide") bar.style.transition = how === "jump" ? "none" : "opacity 300ms ease";
      bar.style.translate = `${link.offsetLeft}px 0`;
      bar.style.scale = `${link.offsetWidth} 1`;
      if (how === "jump") void bar.offsetWidth; // commit the position before the opacity
      bar.style.opacity = "1";
      if (how !== "slide") {
        void bar.offsetWidth;
        setTimeout(() => (bar.style.transition = ""), how === "jump" ? 0 : 320);
      }
    };
    const visible = placed.current && bar.style.opacity === "1";
    place(!placed.current ? "jump" : visible ? "slide" : "fade-in");
    placed.current = true;
    setIndicatorReady(true);
    // labels change width when the font arrives: follow without sliding. (Only on a real
    // change: an observer also reports once when it starts, which would cut the slide short.)
    let width = links.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (links.offsetWidth === width) return;
      width = links.offsetWidth;
      place("jump");
    });
    observer.observe(links);
    return () => observer.disconnect();
  }, [activeKey]);
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
        home && "-mb-[73px]",
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
            const active = key === activeKey;
            return (
              <Link
                key={key}
                href={href}
                data-nav={key}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative inline-flex h-full items-center gap-1 text-15 font-medium transition-colors duration-300",
                  sky ? "text-white/80 hover:text-white" : "text-ink/80 hover:text-sg",
                  active && "text-sg",
                  // before hydration the current link draws its own underline
                  active &&
                    !indicatorReady &&
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-sg",
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
          {/* The current page's underline: one element for all the links, which moves to the
              new link on navigation (translate and scale only, so the compositor animates it
              smoothly while the new page renders) and fades in place to and from home. */}
          <span
            ref={indicator}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-px origin-left bg-sg opacity-0 transition-[translate,scale,opacity] duration-[450ms] ease-[cubic-bezier(.22,.8,.24,1)] motion-reduce:transition-none"
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
