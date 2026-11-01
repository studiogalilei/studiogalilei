import { useTranslations } from "next-intl";
import { ArrowUpRight, Code, Megaphone, Sparkles } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

const SERVICES = [
  { slug: "marketing", color: "#D21205", icon: Megaphone },
  { slug: "intelligenza-artificiale", color: "#0689FF", icon: Sparkles },
  { slug: "sviluppo-software", color: "#2F6B33", icon: Code },
] as const;

/** "What we do": the three services as coloured cards. */
export function ServicesGrid() {
  const t = useTranslations("Home.services");
  return (
    <section className="bg-white pt-[72px] pb-2 md:pt-[104px] md:pb-6">
      <Container>
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="mt-9 grid gap-3.5 md:mt-12 md:grid-cols-3 md:gap-5">
          {SERVICES.map(({ slug, color, icon: Icon }) => (
            <Link
              key={slug}
              href={`/servizi/${slug}`}
              style={{ "--service": color } as React.CSSProperties}
              className="group relative isolate flex items-start gap-4 overflow-hidden rounded-18 bg-(--service) py-[22px] pr-12 pl-5 text-white shadow-[0_18px_36px_-22px_var(--service)] transition-[transform,box-shadow] duration-200 ease-[ease] after:absolute after:inset-0 after:-z-1 after:bg-[radial-gradient(120%_90%_at_100%_0%,rgba(255,255,255,.22),transparent_55%)] hover:[transform:translateY(-2px)] md:min-h-[250px] md:flex-col md:gap-[22px] md:px-[30px] md:pt-[30px] md:pb-8"
            >
              <span className="grid size-12 flex-none place-items-center rounded-14 bg-white/16">
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-19 leading-[1.25] font-semibold">
                  {t(`${slug}.name`)}
                </span>
                <span className="mt-1.5 block text-14.5 leading-[1.6] text-white/86">
                  {t(`${slug}.short`)}
                </span>
              </span>
              <ArrowUpRight
                size={20}
                aria-hidden="true"
                className="absolute top-5 right-[18px] opacity-75 transition-transform duration-200 ease-[ease] group-hover:[transform:translate(2px,-2px)]"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
