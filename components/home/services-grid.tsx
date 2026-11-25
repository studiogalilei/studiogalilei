import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Code, Cog, Sparkles } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

// What we build. The Italian cards open the answer pages; those exist in Italian only, so the
// English ones open the service pages.
const SERVICES = [
  {
    key: "software",
    color: "#2F6B33",
    icon: Code,
    it: "/gestionale-su-misura",
    en: "/servizi/sviluppo-software",
  },
  {
    key: "automation",
    color: "#0A2391",
    icon: Cog,
    it: "/automazione-processi-aziendali",
    en: "/servizi/intelligenza-artificiale",
  },
  {
    key: "agents",
    color: "#0689FF",
    icon: Sparkles,
    it: "/agenti-ai-per-aziende",
    en: "/servizi/intelligenza-artificiale",
  },
] as const;

/** "What we build": three cards, quiet until hovered, then filled with their colour. */
export function ServicesGrid() {
  const t = useTranslations("Home.services");
  const locale = useLocale() === "en" ? "en" : "it";
  return (
    <section className="bg-white pt-[72px] pb-2 md:pt-[104px] md:pb-6">
      <Container>
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="mt-9 grid gap-3.5 md:mt-12 md:grid-cols-3 md:gap-5">
          {SERVICES.map(({ key, color, icon: Icon, ...href }) => (
            <Link
              key={key}
              href={href[locale]}
              style={{ "--service": color } as React.CSSProperties}
              className="group relative isolate flex items-start gap-4 overflow-hidden rounded-18 bg-white py-[22px] pr-12 pl-5 text-sg shadow-surface-1 transition-[transform,box-shadow,background-color,color] duration-300 ease-[ease] hover:[transform:translateY(-3px)] hover:bg-(--service) hover:text-white hover:shadow-[0_22px_40px_-20px_var(--service)] md:min-h-[250px] md:flex-col md:gap-[22px] md:px-[30px] md:pt-[30px] md:pb-8"
            >
              <span className="grid size-12 flex-none place-items-center rounded-14 bg-sand text-sand-ink transition-colors duration-300 group-hover:bg-white/16 group-hover:text-white">
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-19 leading-[1.25] font-semibold">
                  {t(`${key}.name`)}
                </span>
                <span className="mt-1.5 block text-14.5 leading-[1.6] text-ink/65 transition-colors duration-300 group-hover:text-white/86">
                  {t(`${key}.short`)}
                </span>
              </span>
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="absolute top-5 right-[18px] text-sand-deep transition-[transform,color] duration-200 ease-[ease] group-hover:[transform:translate(2px,-2px)] group-hover:text-white"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
