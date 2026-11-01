import { useTranslations } from "next-intl";
import { cacheLife } from "next/cache";
import { LogoTree, LogoWordmark } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/company";

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/chi-siamo" },
  { key: "caseStudies", href: "/casi-studio" },
  { key: "careers", href: "/lavora-con-noi" },
] as const;

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  return <FooterContent year={await currentYear()} />;
}

function FooterContent({ year }: { year: number }) {
  const t = useTranslations("Footer");
  const nav = useTranslations("Header");
  return (
    <footer className="border-t border-sg/10 bg-[#E4E7ED] text-ink">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <Link
            href="/"
            aria-label={t("backToHome")}
            className="inline-flex flex-col items-center gap-5 text-[#CBD0DA] transition-colors hover:text-[#BCC2CF]"
          >
            <LogoTree className="h-[120px] w-auto md:h-[140px]" />
            <LogoWordmark className="h-auto w-[200px] md:w-[230px]" title="StudioGalilei" />
          </Link>
        </div>
        <nav aria-label="Studio Galilei">
          <p className="mb-4 text-14 font-semibold text-sg">Studio Galilei</p>
          <ul className="space-y-2.5">
            {links.map(({ key, href }) => (
              <li key={href}>
                <Link href={href} className="text-14 text-ink/65 hover:text-sg">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 text-14 font-semibold text-sg">{nav("contactUs")}</p>
          <address className="space-y-2.5 text-14 leading-relaxed text-ink/65 not-italic">
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-sg">
                {company.email}
              </a>
              <br />
              <a href={`tel:${company.phoneHref}`} className="whitespace-nowrap hover:text-sg">
                {company.phone}
              </a>
            </p>
            <p>
              {company.legalName}
              <br />
              {company.street}
              <br />
              {company.zip} {company.city} ({company.province})
            </p>
            <p>
              PEC
              <br />
              <a href={`mailto:${company.pec}`} className="whitespace-nowrap hover:text-sg">
                {company.pec}
              </a>
            </p>
            <p>
              <Link
                href="/contatti"
                className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {t("writeToUs")}
              </Link>
            </p>
          </address>
        </div>
      </Container>
      <div className="border-t border-sg/10">
        <Container className="flex flex-col gap-3 py-7 text-12.5 leading-relaxed text-ink/50 md:flex-row md:justify-between">
          <p>
            © {year} Studio Galilei. {t("allRightsReserved")}{" "}
            <Link href="/privacy" className="ml-3 underline-offset-4 hover:text-sg hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p className="md:text-right">
            {company.legalName}, {company.street}, {company.zip} {company.city} ({company.province}
            ). {t("vatAndTaxCode")} {company.vat}
          </p>
        </Container>
      </div>
    </footer>
  );
}
