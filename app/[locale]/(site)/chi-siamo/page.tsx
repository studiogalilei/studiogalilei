import { useTranslations } from "next-intl";
import { PrincipleIcon } from "@/components/about/principle-icon";
import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("about");

type Principle = { title: string; desc: string };

export default function AboutPage() {
  const t = useTranslations("About");
  const common = useTranslations("Common");
  const principles = t.raw("principles") as Principle[];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-field-navy text-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative background, sized by CSS */}
        <img
          src="/images/chi-siamo.webp"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute right-[-14%] -bottom-[6%] -z-10 h-[108%] w-auto max-w-none opacity-[0.13] select-none md:right-[2%] md:opacity-[0.16]"
        />
        <Container className="flex min-h-[52vh] flex-col justify-center py-24 md:min-h-[58vh] md:py-32">
          <figure className="max-w-[54rem]">
            <blockquote className="text-[2.1rem] leading-1.15 font-semibold -tracking-3 text-balance md:text-[3.4rem]">
              {t("quote")}
            </blockquote>
            <figcaption className="mt-8 text-15 font-semibold tracking-[0.18em] text-white/60 uppercase">
              Galileo Galilei
            </figcaption>
          </figure>
        </Container>
      </section>
      <Section tone="pale">
        <Container className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <SectionHeading title={t("responsibilityTitle")} />
            <p className="mt-5 text-17 leading-1.7 text-ink/65">{t("responsibilityText")}</p>
            <ButtonLink href="/contatti" className="mt-8">
              {t("talkToUs")}
            </ButtonLink>
          </div>
          <div className="self-start">
            <p className="text-14 font-semibold tracking-widest text-sg/60 uppercase">
              {t("method")}
            </p>
            <ul className="mt-2 divide-y divide-sg/10">
              {principles.map((principle, i) => (
                <li key={principle.title} className="py-7 first:pt-5">
                  <h3 className="flex items-center gap-3 text-18 font-semibold text-sg">
                    <PrincipleIcon index={i} />
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-15.5 leading-1.7 text-ink/65">{principle.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <section className="relative isolate bg-field-navy py-20 text-white md:py-28">
        <Container>
          <h2 className="text-2rem leading-1.1 font-semibold -tracking-3 text-white md:text-2.6rem">
            {common("caffeOVideochiamata")}
          </h2>
          <p className="mt-4 max-w-[38rem] text-17 leading-1.7 text-white/75">
            {common("siamoQuiPerAscoltartiUnCaffeOUna")}
          </p>
          <div className="mt-10 grid overflow-hidden rounded-18 bg-white text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)] lg:grid-cols-[1.7fr_1fr]">
            <div className="p-8 md:p-12">
              <ContactForm />
            </div>
            <aside className="border-t border-sg/10 bg-pale p-8 md:p-12 lg:border-t-0 lg:border-l">
              <p className="text-19 font-semibold text-sg">{company.legalName}</p>
              <address className="mt-5 space-y-5 text-15 leading-1.7 text-ink/70 not-italic">
                <p>
                  {company.street}
                  <br />
                  {company.zip} {company.city} ({company.province})
                </p>
                <p>
                  PEC
                  <br />
                  <a
                    href={`mailto:${company.pec}`}
                    className="break-all underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    {company.pec}
                  </a>
                </p>
                <p>
                  {t("vatAndTaxCode")} {company.vat}
                </p>
              </address>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
