"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** EN / ITA toggle. "sky" is the white-on-navy look of the home page header. */
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
  const [, startTransition] = useTransition();

  const option = (value: Locale, label: string) => {
    const active = locale === value;
    return (
      <button
        type="button"
        onClick={() =>
          startTransition(() => router.replace(pathname, { locale: value, scroll: false }))
        }
        aria-pressed={active}
        lang={value}
        className={cn(
          "rounded-[7px] px-2.5 py-1.5 transition-colors",
          tone === "sky"
            ? active
              ? "bg-white text-sg"
              : "bg-transparent text-white/55 hover:text-white"
            : active
              ? "bg-[#E4E7ED] text-ink"
              : "text-ink/50 hover:text-ink",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label={locale === "en" ? "Language" : "Lingua"}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-10 border p-0.5 text-13 font-semibold tracking-[0.04em]",
        tone === "sky" ? "border-white/25" : "border-[#DADEE6]",
        className,
      )}
    >
      {option("en", "EN")}
      {option("it", "ITA")}
    </div>
  );
}
