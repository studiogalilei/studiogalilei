"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import { LogoTile } from "@/components/logo";
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
 * floats transparent over the hero sky and turns navy on scroll.
 */
export function Navbar() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // On the home page the bar sits transparent over the hero sky and turns navy on scroll.
  const sky = pathname === "/";
  const solidSky = sky && (scrolled || menuOpen);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!sky) return;
    // only tell React when the state flips: a setState per scroll event re-renders the header
    let last: boolean | undefined;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sky]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const privateArea = t("privateArea");
  // the Platform prototype is a full-screen app with its own chrome
  if (pathname === "/platform" || pathname.startsWith("/platform/")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        sky
          ? "-mb-[73px] border-b-transparent bg-transparent transition-[background-color,border-color] duration-[350ms] ease-[ease]"
          : "border-sg/10 bg-white",
        // near-opaque instead of a backdrop blur, which re-blurs the page on every scroll frame
        solidSky && "border-b-white/10 bg-[#061773f5]",
      )}
    >
      {/* three groups with equal space between them: the links sit in the middle of the room
          between the logo and the language switcher */}
      <Container className="flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        <Link href="/" aria-label={t("backToHome")} className="group flex-none">
          <LogoTile
            className={cn(
              "size-[50px] rounded-xl transition-[translate,box-shadow] duration-200 ease-[ease] group-hover:-translate-y-px md:size-14 md:rounded-[13px]",
              sky
                ? "shadow-[0_0_0_1px_rgba(255,255,255,.22),0_8px_20px_-10px_rgba(0,0,0,.6)]"
                : "shadow-[0_6px_16px_-8px_rgba(6,23,115,.55)] group-hover:shadow-[0_10px_22px_-10px_rgba(6,23,115,.7)]",
            )}
          />
        </Link>
        <nav aria-label={t("mainNavigation")} className="hidden h-full items-stretch gap-7 lg:flex">
          {desktopNav.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "relative inline-flex h-full items-center gap-1 text-15 font-medium transition-colors",
                sky ? "text-white/80 hover:text-white" : "text-ink/80 hover:text-sg",
                !sky &&
                  isActive(href) &&
                  "text-sg after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-sg",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher tone={sky ? "sky" : "default"} />
          <Link
            href="/contatti"
            className={cn(
              "rounded-10 px-5 py-2.5 text-15 font-medium",
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
              "inline-flex items-center gap-1.5 text-14 leading-none font-medium whitespace-nowrap transition-colors duration-150 ease-[ease]",
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
              "grid size-10 place-items-center rounded-10 active:bg-pale",
              sky ? "text-white" : "text-sg/70",
            )}
          >
            <Lock size={19} strokeWidth={2} aria-hidden="true" className="flex-none opacity-85" />
          </Link>
          <button
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-lg",
              sky ? "text-white" : "text-sg",
            )}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
