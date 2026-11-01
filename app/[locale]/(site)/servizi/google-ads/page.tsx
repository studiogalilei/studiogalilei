import { useTranslations } from "next-intl";
import { KeyRound, ShieldCheck } from "@/components/icons";
import { CoffeeCta } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("googleAds");

type Item = { title: string; desc: string };

export default function GoogleAdsPage() {
  const t = useTranslations("GoogleAds");
  const services = useTranslations("Service");
  const steps = t.raw("steps") as Item[];
  const trust = t.raw("trust") as Item[];

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: services("services"), href: "/servizi" },
          { label: "Google Ads" },
        ]}
        kicker={t("kicker")}
        title={t.rich("title", { br: () => <br /> })}
        intro={t("intro")}
      />
      <Container className="relative z-2 -mt-18 md:-mt-22">
        <ol className="grid gap-px overflow-hidden rounded-18 bg-white shadow-surface-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.title} className="bg-white p-8">
              <h2 className="text-19 font-semibold text-sg">{step.title}</h2>
              <p className="mt-2 text-15 leading-1.7 text-ink/65">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
      <Section tone="white">
        <Container className="grid gap-5 md:grid-cols-2">
          {trust.map((item, i) => {
            const Icon = i ? ShieldCheck : KeyRound;
            return (
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl bg-white p-8 shadow-surface-2"
              >
                <Icon size={22} className="mt-0.5 flex-none text-sg" aria-hidden="true" />
                <div>
                  <h3 className="text-17 font-semibold text-sg">{item.title}</h3>
                  <p className="mt-1.5 text-15 leading-1.7 text-ink/65">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
      <CoffeeCta />
    </>
  );
}
