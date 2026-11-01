"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { LogoTile } from "@/components/logo";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { LockIcon, MenuIcon, UserIcon } from "./icons";
import { wrap } from "./ui";

const nav = [
  { key: "navAbout", href: "/chi-siamo" },
  { key: "navServices", href: "/servizi" },
  { key: "navCases", href: "/casi-studio" },
  { key: "navTourOperator", href: "/tour-operator" },
] as const;

function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const option = (value: Locale, label: string) => (
    <button
      type="button"
      aria-pressed={locale === value}
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: value, scroll: false }))
      }
      className={cn(
        "cursor-pointer rounded-[7px] border-0 bg-transparent px-2.5 py-1.5 text-13 leading-[1.6] font-semibold tracking-[inherit] text-ink/50 hover:text-ink max-tour-sm:px-2 max-tour-sm:py-[5px] max-tour-sm:text-12",
        locale === value && "bg-[#e4e7ed] text-ink",
      )}
    >
      {label}
    </button>
  );
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex gap-0.5 rounded-10 border border-[#dadee6] bg-white p-0.5 text-13 tracking-[0.04em] max-tour-sm:text-12",
        className,
      )}
    >
      {option("en", "EN")}
      {option("it", "ITA")}
    </div>
  );
}

const navLink =
  "relative inline-flex items-center text-ink/80 no-underline transition-colors duration-150 hover:text-sg";
const current = "text-sg after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-sg";
const mobileRow =
  "flex items-center justify-between border-b border-sg/10 py-4 text-17 font-medium text-sg no-underline";

export function TourHeader() {
  const t = useTranslations("TourOperator");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-sg/10 bg-white">
      <div
        className={cn(wrap, "flex h-[72px] items-center justify-between gap-6 max-tour-sm:h-16")}
      >
        <Link
          href="/"
          aria-label="Studio Galilei"
          className="inline-flex items-center gap-3 text-sg max-tour-sm:gap-[7px]"
        >
          <LogoTile className="size-[50px] rounded-xl shadow-[0_6px_16px_-8px_rgba(6,23,115,.55)] md:size-14 md:rounded-[13px]" />
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex gap-7 self-stretch text-15 font-medium max-lg:hidden"
        >
          {nav.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              aria-current={href === "/tour-operator" ? "page" : undefined}
              className={cn(navLink, href === "/tour-operator" && current)}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6 max-lg:gap-0">
          <LanguageToggle className="max-lg:hidden" />
          <Link
            href="/contatti"
            className="rounded-10 bg-sg px-5 py-2.5 text-15 font-medium text-white no-underline transition-colors duration-150 hover:bg-sg-deep max-lg:hidden"
          >
            {t("contactUs")}
          </Link>
          <Link
            href="/area-partner"
            className="flex flex-row items-center gap-1.5 text-14 leading-none font-medium whitespace-nowrap text-ink/62 no-underline hover:text-sg max-lg:hidden"
          >
            <LockIcon className="size-3.5 flex-none" />
            {t("privateArea")}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen(!open)}
            className="hidden size-11 cursor-pointer place-items-center border-0 bg-transparent text-sg max-lg:grid"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <div id="mnav" className="border-t border-sg/10 bg-white lg:hidden">
          <div className={wrap}>
            {nav.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={close}
                aria-current={href === "/tour-operator" ? "page" : undefined}
                className={mobileRow}
              >
                {t(key)}
              </Link>
            ))}
            <div className={mobileRow}>
              <span>{t("language")}</span>
              <LanguageToggle />
            </div>
            <Link href="/area-partner" onClick={close} className={mobileRow}>
              <span>{t("privateArea")}</span>
              <UserIcon className="size-5" />
            </Link>
            <Link
              href="/contatti"
              onClick={close}
              className="mt-6 mb-4 flex items-center justify-center rounded-10 bg-sg p-3.5 text-16 font-medium text-white no-underline"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
