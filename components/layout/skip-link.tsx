"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Header");
  return (
    <button
      type="button"
      onClick={() => document.getElementById("contenuto")?.focus()}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sg"
    >
      {t("skipToContent")}
    </button>
  );
}
