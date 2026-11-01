import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import type { Locale } from "@/i18n/routing";

/** Per-page title and description from the "Metadata" messages, as `<key>.title` / `<key>.description`. */
export async function pageMetadata(key: string): Promise<Metadata> {
  const locale = (await rootLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t(`${key}.title` as never);
  return {
    title: key === "home" ? { absolute: title } : title,
    description: t(`${key}.description` as never),
  };
}
