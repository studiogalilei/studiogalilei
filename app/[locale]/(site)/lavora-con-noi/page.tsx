import { useTranslations } from "next-intl";
import { BrushArrow, BrushUnderline } from "@/components/careers/brush";
import { CareersShell, ScrollToFormButton } from "@/components/careers/careers-shell";
import { MemberClubForm } from "@/components/careers/member-club-form/member-club-form";
import { WorldMap } from "@/components/sections/world-map";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("careers");

const VALUES = ["startingPoint", "workIsSeen", "growth", "howWeWork"] as const;

export default function CareersPage() {
  const t = useTranslations("Careers");

  const intro = (
    <>
      <section className="bg-white pt-20 pb-12 md:pt-28 md:pb-16">
        <Container>
          <h1 className="text-2.2rem leading-[1.05] font-semibold -tracking-3 text-sg md:text-2.8rem">
            {t("title")}
          </h1>
          <p className="mt-12 text-13 font-semibold tracking-14 text-ai uppercase md:mt-16">
            {t("mission.title")}
          </p>
          <p className="mt-4 max-w-[60rem] text-[1.7rem] leading-[1.25] font-semibold tracking-tight text-balance text-ink md:text-2.6rem">
            {t("mission.text")}
          </p>
        </Container>
      </section>
      <WorldMap />
    </>
  );

  const values = (
    <>
      <div className="grid gap-x-16 md:grid-cols-2">
        {VALUES.map((key) => (
          <div key={key} className="border-t border-sg/12 pt-7 pb-10">
            <h2 className="text-19 font-semibold text-sg">{t(`${key}.title`)}</h2>
            <p className="mt-4 max-w-[34rem] text-15.5 leading-1.75 text-ink/65">
              {t(`${key}.text`)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-col items-center text-center md:mt-24">
        <p className="font-marker text-[1.9rem] leading-[1.2] font-normal tracking-2 text-ink uppercase md:text-[2.7rem]">
          {t.rich("vision", { brush: (chunks) => <BrushUnderline>{chunks}</BrushUnderline> })}
        </p>
        <ScrollToFormButton label={t("goToForm")}>
          <BrushArrow />
        </ScrollToFormButton>
      </div>
    </>
  );

  return (
    <CareersShell
      intro={intro}
      values={values}
      form={<MemberClubForm />}
      formLabel={t("formLabel")}
      showPageLabel={t("showPage")}
    />
  );
}
