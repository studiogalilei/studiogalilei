import { useTranslations } from "next-intl";
import {
  Eye,
  FileText,
  Info,
  KeyRound,
  Lock,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
} from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

const POLICY_URL = "https://developers.google.com/terms/api-services-user-data-policy";
const STEP_ICONS = [Wrench, Eye, SlidersHorizontal, FileText];
const TRUST_ICONS = [KeyRound, ShieldCheck, Lock];

type Item = { title: string; desc: string };

/** "Our Google Ads integration": how Studio Galilei uses the Google Ads API. */
export function GoogleAdsSection() {
  const t = useTranslations("Home.googleAds");
  const steps = t.raw("steps") as Item[];
  const trust = t.raw("trust") as Item[];
  return (
    <Section tone="pale" id="google-ads-api">
      <Container>
        <SectionHeading kicker={t("kicker")} title={t("title")} intro={t("intro")} />
        {/* the white surface (as on the original) hides the 1px gaps between the steps */}
        <ol className="mt-12 grid gap-px overflow-hidden rounded-18 bg-white shadow-surface-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title} className="bg-white p-7">
                <Icon size={22} strokeWidth={1.75} className="text-ai" aria-hidden="true" />
                <h3 className="mt-5 text-18 font-semibold text-sg">{step.title}</h3>
                <p className="mt-2 text-15 leading-1.7 text-ink/65">{step.desc}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {trust.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div
                key={item.title}
                className="relative isolate rounded-18 bg-field-navy p-7 text-white shadow-surface-dark"
              >
                <h3 className="flex items-center gap-2.5 text-17 font-semibold">
                  <Icon size={19} strokeWidth={2} className="flex-none" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="mt-3 text-15 leading-1.7 text-white/75">
                  {t.rich(`trust.${i}.desc`, {
                    policy: (chunks) => (
                      <a
                        href={POLICY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white underline decoration-1 underline-offset-4 hover:decoration-2"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-8 flex items-start gap-3 text-15 leading-1.65 text-ink/70">
          <Info size={19} className="mt-0.5 flex-none text-sg" aria-hidden="true" />
          <span>
            {t.rich("note", {
              privacy: (chunks) => (
                <Link
                  href="/privacy"
                  className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </p>
      </Container>
    </Section>
  );
}
