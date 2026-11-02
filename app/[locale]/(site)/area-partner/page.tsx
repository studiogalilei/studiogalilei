import { useTranslations } from "next-intl";
import { LogoTile } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("comingSoon");

/** "Area Privata": the partner area is not open yet. */
export default function PrivateAreaPage() {
  const t = useTranslations("ComingSoon");
  return (
    <section className="flex min-h-[calc(100dvh-72px)] items-center justify-center bg-[radial-gradient(60%_50%_at_50%_0%,rgb(6_137_255/0.28),transparent_70%),radial-gradient(50%_40%_at_50%_100%,rgb(6_137_255/0.14),transparent_70%),linear-gradient(180deg,#061773_0%,#040f4d_100%)] px-6 py-18 text-center text-white">
      <div className="flex max-w-[36rem] flex-col items-center">
        <LogoTile className="size-28 rounded-[26px] shadow-[0_0_0_1px_rgb(255_255_255/0.18),0_24px_60px_-24px_rgb(0_0_0/0.7)]" />
        <p className="mt-8 text-[12.5px] font-semibold tracking-[0.28em] text-white/60 uppercase">
          {t("kicker")}
        </p>
        <h1 className="mt-3.5 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.03em] md:text-[3.6rem]">
          {t("title")}
        </h1>
        <p className="mt-4.5 text-17 leading-[1.7] text-white/75">{t("text")}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contatti" variant="light">
            {t("contact")}
          </ButtonLink>
          <ButtonLink href="/" variant="ghost-light">
            {t("home")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
