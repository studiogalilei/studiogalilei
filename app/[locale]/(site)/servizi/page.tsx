import { useLocale, useTranslations } from "next-intl";
import { CtaBand } from "@/components/sections/cta-band";
import { ClientMessages } from "@/components/client-messages";
import { Globe } from "@/components/services/globe";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("services");

type CatalogGroup = { title: string; items: string[] };

// where each group of the catalog is explained in full (the Italian answer pages)
const MORE = [
  "/gestionale-su-misura",
  "/servizi/sviluppo-software",
  "/automazione-processi-aziendali",
  "/agenti-ai-per-aziende",
  "/servizi/sviluppo-software",
  "/guide/bandi-software-ai",
];
const MORE_EN = [
  "/servizi/sviluppo-software",
  "/servizi/sviluppo-software",
  "/servizi/intelligenza-artificiale",
  "/servizi/intelligenza-artificiale",
  "/servizi/sviluppo-software",
  null,
];

export default function ServicesPage() {
  const t = useTranslations("Services");
  const catalog = t.raw("catalog") as CatalogGroup[];
  const more = useLocale() === "it" ? MORE : MORE_EN;

  return (
    <>
      <section className="bg-white pt-20 pb-20 md:pt-28 md:pb-24">
        <Container>
          <h1 className="text-2.2rem leading-none font-semibold -tracking-3 text-sg md:text-2.8rem">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[40rem] text-17 leading-1.7 text-ink/70">{t("intro")}</p>
          <ButtonLink href="/#sg-prenota" className="mt-7">
            {t("book")}
          </ButtonLink>
          <div className="mt-10 grid gap-16 md:mt-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-20">
            <ol className="max-w-[560px]">
              {catalog.map((group, i) => (
                <li key={group.title} className="border-t border-sg/12 pt-6 pb-8 last:border-b">
                  <h2 className="flex items-baseline gap-0 text-17 font-semibold text-sg">
                    {group.title}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-15 leading-snug text-ink/65">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {more[i] && (
                    <Link
                      href={more[i]}
                      className="mt-4 inline-block text-14 font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                    >
                      {group.title}: {t("more").toLowerCase()}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
            <div>
              <div className="lg:sticky lg:top-28">
                <ClientMessages namespaces={["Services", "WorldMap"]}>
                  <Globe />
                </ClientMessages>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} href="/#sg-prenota" label={t("book")} />
    </>
  );
}
