import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppIcon } from "@/components/contact-page/whatsapp-icon";
import { Mail, Phone } from "@/components/icons";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("contact");

const link = "underline decoration-1 underline-offset-4 hover:decoration-2";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const channels = [
    {
      href: `tel:${company.phoneHref}`,
      label: t("phone"),
      icon: <Phone size={22} strokeWidth={2} aria-hidden="true" />,
    },
    {
      href: `https://wa.me/${company.phoneHref.replace("+", "")}`,
      label: "WhatsApp",
      icon: <WhatsAppIcon />,
      external: true,
    },
    {
      href: `mailto:${company.email}`,
      label: "Email",
      icon: <Mail size={22} strokeWidth={2} aria-hidden="true" />,
    },
  ];

  return (
    <>
      <PageHero title={t("title")} intro={t("intro")} />
      <Container className="relative z-2 -mt-18 pb-24 md:-mt-22 md:pb-32">
        <div className="grid overflow-hidden rounded-18 bg-white shadow-surface-3 lg:grid-cols-[1.7fr_1fr]">
          <div className="p-8 md:p-12">
            <p className="text-14 font-medium text-ink/60">{t("chooseChannel")}</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {channels.map(({ href, label, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col items-center justify-center gap-2.5 rounded-14 border border-sg/15 bg-white px-1.5 py-5 text-sg transition-colors hover:border-sg hover:bg-sg hover:text-white sm:px-3"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-pale text-sg transition-colors group-hover:bg-white/15 group-hover:text-white">
                    {icon}
                  </span>
                  <span className="text-13 font-semibold sm:text-14.5">{label}</span>
                </a>
              ))}
            </div>
            <div className="my-9 flex items-center gap-4 text-13 text-ink/45">
              <span className="h-px flex-1 bg-sg/12" />
              {t("orWriteHere")}
              <span className="h-px flex-1 bg-sg/12" />
            </div>
            <ContactForm />
          </div>
          <aside className="border-t border-sg/10 bg-pale p-8 md:p-12 lg:border-t-0 lg:border-l">
            <p className="text-19 font-semibold text-sg">{company.legalName}</p>
            <address className="mt-5 space-y-5 text-15 leading-1.7 text-ink/70 not-italic">
              <p>
                Email
                <br />
                <a href={`mailto:${company.email}`} className={`${link} break-all`}>
                  {company.email}
                </a>
              </p>
              <p>
                {t("phone")}
                <br />
                <a href={`tel:${company.phoneHref}`} className={`${link} whitespace-nowrap`}>
                  {company.phone}
                </a>
              </p>
              <p>
                {company.street}
                <br />
                {company.zip} {company.city} ({company.province})
              </p>
              <p>
                PEC
                <br />
                <a href={`mailto:${company.pec}`} className={`${link} break-all`}>
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
    </>
  );
}
