import { useLocale } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const TEXT = {
  it: {
    kicker: "Partner",
    title: "I tuoi clienti chiedono software e AI?",
    text: "Li costruiamo noi, in segnalazione o con il tuo marchio. Il cliente resta tuo, con un accordo scritto.",
    label: "Diventa partner",
  },
  en: {
    kicker: "Partners",
    title: "Are your clients asking for software and AI?",
    text: "We build it, by referral or under your brand. The client stays yours, with a written agreement.",
    label: "Become a partner",
  },
};

/** The home page's invitation to agencies, on sand so it does not read like the closing band. */
export function AgenciesBand() {
  const t = TEXT[useLocale() === "en" ? "en" : "it"];
  return (
    <section className="bg-white pb-16 md:pb-24">
      <Container>
        <div className="grid gap-7 rounded-22 border border-sand-deep/40 bg-sand px-8 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-14 md:py-12">
          <div className="max-w-[40rem]">
            <p className="mb-3 text-14 font-medium text-sand-ink">{t.kicker}</p>
            <h2 className="text-1.75rem leading-1.15 font-semibold -tracking-2 text-balance text-sg md:text-2.2rem">
              {t.title}
            </h2>
            <p className="mt-4 text-16 leading-1.7 text-ink/70">{t.text}</p>
          </div>
          <ButtonLink href="/agenzie-partner">{t.label}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
