import { useTranslations } from "next-intl";
import {
  Bullets,
  ExternalLink,
  GOOGLE_PERMISSIONS,
  GOOGLE_USER_DATA_POLICY,
  PrivacyEmail,
  PrivacySection,
} from "@/components/privacy/privacy-parts";
import { SmoothAnchor } from "@/components/privacy/smooth-anchor";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("privacy");

const SECTIONS = [
  ["titolari", "01"],
  ["dati", "02"],
  ["finalita", "03"],
  ["uso-limitato", "04"],
  ["conservazione", "05"],
  ["destinatari", "06"],
  ["extra-ue", "07"],
  ["diritti", "08"],
  ["cookie", "09"],
  ["modifiche", "10"],
  ["contatti", "11"],
] as const;

type Controller = { name: string; vat: string; address: string; services: string };

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const section = (id: (typeof SECTIONS)[number][0]) => ({
    id,
    n: SECTIONS.find(([s]) => s === id)![1],
    label: t(`sections.${id}`),
  });
  const h3 = "text-17 font-semibold text-sg";

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        intro={t("hero.intro")}
      >
        <p className="text-14 text-white/70 md:text-right">{t("hero.meta")}</p>
      </PageHero>
      <Container className="relative z-2 -mt-18 pb-24 md:-mt-22 md:pb-28">
        <div className="grid gap-10 rounded-18 bg-white p-7 shadow-surface-3 md:p-12 lg:grid-cols-[15rem_1fr] lg:gap-14">
          <nav aria-label={t("indice")} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-13 font-semibold tracking-widest text-sg/60 uppercase">
              {t("indice")}
            </p>
            <ol className="mt-4 space-y-2 text-14.5">
              {SECTIONS.map(([id, n]) => (
                <li key={id}>
                  <SmoothAnchor target={id} className="flex gap-2 text-ink/70 hover:text-sg">
                    <span className="w-6 flex-none text-sg/45">{n}</span>
                    {t(`sections.${id}`)}
                  </SmoothAnchor>
                </li>
              ))}
            </ol>
          </nav>
          <div className="min-w-0">
            <PrivacySection {...section("titolari")} title={t("chiTrattaITuoiDati")}>
              <p>{t("ilMarchioStudioGalileiE")}</p>
              <div className="grid gap-4 pt-2 md:grid-cols-2">
                {(t.raw("controllers") as Controller[]).map((c) => (
                  <div key={c.name} className="rounded-14 border border-sg/12 bg-mist p-6">
                    <p className="text-18 font-semibold text-sg">{c.name}</p>
                    <p className="mt-1 text-14.5 text-ink/60">
                      {c.vat}
                      <br />
                      {c.address}
                    </p>
                    <p className="mt-4 text-12.5 font-semibold tracking-8 text-sg/60 uppercase">
                      {t("servizi")}
                    </p>
                    <p className="mt-1 text-15 leading-1.7">{c.services}</p>
                  </div>
                ))}
              </div>
              <p>
                {t("perQualsiasiRichiestaRelativaAl")}
                <PrivacyEmail />.
              </p>
            </PrivacySection>

            <PrivacySection {...section("dati")} title={t("qualiDatiRaccogliamo")}>
              <h3 className={h3}>{t("datiFornitiVolontariamente")}</h3>
              <p>{t("datiDiContattoNomeEmailTelefono")}</p>
              <h3 className={`pt-3 ${h3}`}>{t("datiDegliAccountGoogleDeiPartner")}</h3>
              <p>{t("nellAmbitoDeiServiziDiGestione")}</p>
              <Bullets items={t.raw("googleData") as string[]} />
              <p>
                {t("taliDatiAppartengonoAllAccount")}
                <ExternalLink href={GOOGLE_PERMISSIONS}>
                  {t("permessiDelProprioAccountGoogle")}
                </ExternalLink>
                .
              </p>
              <h3 className={`pt-3 ${h3}`}>{t("datiDiNavigazioneECookie")}</h3>
              <p>
                {t("duranteLaNavigazioneDelSito")}
                <SmoothAnchor
                  target="cookie"
                  className="font-medium text-sg underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  {t("paragrafo09")}
                </SmoothAnchor>
                .
              </p>
            </PrivacySection>

            <PrivacySection {...section("finalita")} title={t("percheTrattiamoIDati")}>
              <Bullets items={t.raw("purposes") as string[]} />
            </PrivacySection>

            <PrivacySection
              {...section("uso-limitato")}
              title={t("comeUsiamoIDatiDelleApiDiGoogle")}
            >
              <div className="relative isolate rounded-2xl bg-field-navy p-6 text-white shadow-surface-dark md:p-8">
                <p className="text-12.5 font-semibold tracking-widest text-cream uppercase">
                  Limited Use Disclosure
                </p>
                <p className="mt-3 text-[16.5px] leading-1.75 text-white">
                  {t("lUsoEIlTrasferimentoDaParteDi")}{" "}
                  <a
                    href={GOOGLE_USER_DATA_POLICY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    Google API Services User Data Policy
                  </a>
                  ,{t("inclusiIRequisitiDiUsoLimitato")}
                </p>
              </div>
              <p className="pt-2">{t("inParticolare")}</p>
              <Bullets items={t.raw("limitedUse") as string[]} />
            </PrivacySection>

            <PrivacySection {...section("conservazione")} title={t("comeTrattiamoEPerQuanto")}>
              <p>{t("iDatiSonoTrattatiConStrumenti")}</p>
            </PrivacySection>

            <PrivacySection {...section("destinatari")} title={t("chiPuoAccedereAiDati")}>
              <p>
                {t("iDatiPossonoEssereTrattatiDa")}
                <PrivacyEmail />.
              </p>
            </PrivacySection>

            <PrivacySection {...section("extra-ue")} title={t("datiFuoriDalloSpazioEconomico")}>
              <p>{t("alcuniFornitoriTraCuiGoogle")}</p>
            </PrivacySection>

            <PrivacySection {...section("diritti")} title={t("iTuoiDiritti")}>
              <p>
                {t("aiSensiDegliArtt1522DelGdprL")}
                <PrivacyEmail />.
              </p>
            </PrivacySection>

            <PrivacySection {...section("cookie")} title={t("cookieETracciamenti")}>
              <p>{t("ilSitoUtilizzaCookieTecniciE")}</p>
            </PrivacySection>

            <PrivacySection {...section("modifiche")} title={t("aggiornamentiDellInformativa")}>
              <p>{t("studioGalileiSiRiservaDi")}</p>
            </PrivacySection>

            <PrivacySection {...section("contatti")} title={t("haiUnaDomandaSuiTuoiDati")}>
              <p>
                {t("perQualsiasiRichiestaRelativa")}
                <PrivacyEmail />.
              </p>
            </PrivacySection>

            <p className="border-t border-sg/10 pt-8 text-13 text-ink/45">{t("hero.footer")}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
