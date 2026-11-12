import { getLocale, getTranslations } from "next-intl/server";
import { PrivateAreaSignIn } from "@/components/private-area-sign-in";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("privateArea");

export default async function PrivateAreaPage() {
  const locale = await getLocale();
  const t = await getTranslations("PrivateArea");
  return <PrivateAreaSignIn locale={locale} title={t("signIn")} fallback={t("openWorkspace")} />;
}
