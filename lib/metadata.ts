import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/** Per-page title and description from the "Metadata" messages, as `<key>.title` / `<key>.description`. */
export async function pageMetadata(key: string): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const title = t(`${key}.title`);
  return {
    title: key === "home" ? { absolute: title } : title,
    description: t(`${key}.description`),
  };
}
