import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { EmailLink, WhatsAppLink } from "./context";
import { MailIcon, TapIcon, WhatsAppIcon } from "./icons";
import { PainChecklist } from "./pain-checklist";
import { button, ctaDot, ctaNote, fieldNavy, h2, kicker, lead, reveal, section, wrap } from "./ui";

const stripIcon = (path: React.ReactNode) => (
  <span className="grid size-10 flex-none place-items-center rounded-xl bg-pale text-sg max-tour-sm:size-[34px] max-tour-sm:rounded-10">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 max-tour-sm:size-[17px]"
    >
      {path}
    </svg>
  </span>
);

/** Four highlights under the hero. */
export function Strip() {
  const t = useTranslations("TourOperator");
  const items = [
    {
      icon: (
        <>
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </>
      ),
      title: t("texasEItalia"),
      text: t("dallasSanAntonioVenezia"),
    },
    {
      icon: <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />,
      title: t("collegatoAlBooking"),
      text: t("esFareharborNessunCambio"),
    },
    {
      icon: <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12Z" />,
      title: "WhatsApp + SMS",
      text: t("conInvioDiRiservaAutomatico"),
    },
    {
      icon: (
        <>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </>
      ),
      title: t("desktopEMobile"),
      text: t("ufficioAutistiEGuide"),
    },
  ];
  return (
    <section aria-label="Highlights" className="relative border-b border-sg/10 bg-white">
      <div className={wrap}>
        <ul className="grid list-none grid-cols-4 max-tour-md:grid-cols-2">
          {items.map(({ icon, title, text }, i) => (
            <li
              key={i}
              data-reveal
              className={cn(
                reveal(i as 0 | 1 | 2 | 3),
                "flex items-center gap-3.5 border-sg/10 px-[22px] py-[26px] text-14 leading-[1.4] text-ink/70 max-tour-md:nth-3:border-l-0 max-tour-md:nth-[n+3]:border-t max-tour-sm:flex-col max-tour-sm:items-start max-tour-sm:gap-2.5 max-tour-sm:px-3.5 max-tour-sm:py-[18px] max-tour-sm:text-12.5",
                i > 0 && "border-l",
              )}
            >
              {stripIcon(icon)}
              <span>
                <b className="block text-15 font-semibold text-sg max-tour-sm:text-13.5">{title}</b>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Where it starts": the interactive pain-point checklist. */
export function Pain() {
  const t = useTranslations("TourOperator");
  return (
    <section className={cn(section, "bg-white")}>
      <div
        className={cn(
          wrap,
          "grid grid-cols-[1fr_1.1fr] items-start gap-16 max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:gap-9",
        )}
      >
        <div data-reveal className={reveal()}>
          <p className={kicker}>{t("ilPuntoDiPartenza")}</p>
          <h2 className={cn(h2, "mb-[22px]")}>{t("laGiornataReggeMaSoloPerche")}</h2>
          <p className={lead}>{t("iProcessiDiUnTourOperatorDi")}</p>
          <p className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-pale px-4 py-3 text-14.5 font-medium text-sg">
            <TapIcon className="size-[18px]" />
            {t("toccaIPuntiInCuiTiRiconosci")}
          </p>
        </div>
        <div
          data-reveal
          className={cn(
            reveal(1),
            "rounded-22 bg-white p-3.5 shadow-surface-2 max-tour-sm:rounded-18 max-tour-sm:p-2",
          )}
        >
          <PainChecklist
            label={t("tiRiconosciIn")}
            items={[
              {
                title: t("painTitle1"),
                text: t("daRiconciliareAManoMentreNe"),
              },
              {
                title: t("painTitle2"),
                text: t("daPreparareEsportareEMandareAlle"),
              },
              {
                title: t("painTitle3"),
                text: t("assegnatiSuFogliDiCalcoloAppunti"),
              },
              {
                title: t("painTitle4"),
                text: t("suWhatsappESmsCheDipendonoDaChi"),
              },
              {
                title: t("painTitle5"),
                text: t("cheNessunoVedeFincheNonDiventano"),
              },
            ]}
            cta={
              <>
                <b>{t("alloraQuestaPaginaEPerTe")}</b>
                {t("sonoEsattamenteIPuntiCheAbbiamo")}
              </>
            }
            ctaButton={t("invialiSuWhatsapp")}
          />
        </div>
      </div>
    </section>
  );
}

/** Navy call-to-action band after the case studies. */
export function Band() {
  const t = useTranslations("TourOperator");
  return (
    <div className="bg-mist pb-28 max-tour-sm:pb-16">
      <div className={wrap}>
        <div
          data-reveal
          className={cn(
            reveal(),
            fieldNavy,
            "grid grid-cols-[1fr_auto] items-center gap-10 overflow-hidden rounded-3xl p-14 max-tour-md:grid-cols-1 max-tour-md:px-9 max-tour-md:py-11 max-tour-sm:rounded-20 max-tour-sm:px-[22px] max-tour-sm:py-[34px]",
          )}
        >
          <div>
            <h3 className="text-2.2rem leading-1.15 font-semibold -tracking-2 text-white max-tour-sm:text-[1.7rem]">
              {t("vuoiLaStessaVisibilitaSullaTua")}
            </h3>
            <p className="mt-3.5 max-w-[560px] leading-1.7 text-white/75">
              {t("raccontaciComeLavoriOggiTi")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <WhatsAppLink className={button({ kind: "whatsapp" })}>
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </WhatsAppLink>
            <EmailLink className={button({ kind: "email", dark: true, delayGlow: true })}>
              <MailIcon />
              <span>Email</span>
            </EmailLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "What carries over": the eight modules and where they are live. */
export function Modules() {
  const t = useTranslations("TourOperator");
  const live = t("attivoPer");
  const modules = [
    {
      title: t("dashboardOperativa"),
      text: t("statoDiPrenotazioniListeE"),
      at: "BeaVita",
    },
    {
      title: t("calendarioECapienza"),
      text: t("vistaPerGiornoEProdottoCapienza"),
      at: "FunDallas, BeaVita",
    },
    {
      title: t("dispatchDiAutistiEMezzi"),
      text: t("assegnazioniCondiviseControllo"),
      at: "FunDallas",
    },
    {
      title: t("listePasseggeriInPdf"),
      text: t("generazioneVersioniStatoDell"),
      at: "FunDallas, BeaVita",
    },
    {
      title: t("appPerAutistiEGuide"),
      text: t("tourAssegnatiPasseggeriPdfE"),
      at: "FunDallas",
    },
    {
      title: t("messaggiAiClienti"),
      text: t("flussiWhatsappSmsDiRiservaAvvisi"),
      at: "BeaVita",
    },
    {
      title: t("analisiOperative"),
      text: t("andamentoPrenotazioniPressione"),
    },
    {
      title: t("recensioniEQr"),
      text: t("linkAlleRecensioniQrPer"),
    },
  ];
  return (
    <section id="modules" className={cn(section, "bg-white")}>
      <div className={wrap}>
        <div data-reveal className={reveal()}>
          <p className={kicker}>{t("cosaSiPortaDaUnTourOperatorAll")}</p>
          <h2 className={cn(h2, "mb-5")}>{t("nonCopiamoLAppRiusiamoLoSchema")}</h2>
          <p className={lead}>{t("ogniTourOperatorHaLaSua")}</p>
        </div>
        <div className="mt-12 grid grid-cols-4 gap-4 max-tour-md:grid-cols-2 max-tour-sm:mt-[30px] max-tour-sm:gap-2.5">
          {modules.map(({ title, text, at }, i) => (
            <div
              key={i}
              data-reveal
              className={cn(
                reveal(),
                "group relative rounded-2xl bg-white px-6 py-[26px] shadow-surface-1 hover:-translate-y-1 hover:shadow-surface-2 max-tour-sm:rounded-14 max-tour-sm:px-3.5 max-tour-sm:py-4",
              )}
            >
              <div className="mb-[18px] grid size-9 place-items-center rounded-10 bg-pale text-13 font-semibold text-sg [transition:background_.3s,color_.3s] group-hover:bg-sg group-hover:text-white max-tour-sm:mb-3 max-tour-sm:size-7 max-tour-sm:rounded-lg max-tour-sm:text-11.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 text-17 leading-[1.3] font-semibold text-sg max-tour-sm:text-14.5">
                {title}
              </h3>
              <p className="text-14.5 leading-1.65 text-ink/70 max-tour-sm:text-13 max-tour-sm:leading-[1.55]">
                {text}
              </p>
              <span
                className={cn(
                  "mt-3.5 inline-flex items-center gap-1.5 text-12 font-semibold before:size-1.5 before:rounded-full before:bg-current before:content-[''] max-tour-sm:mt-2.5 max-tour-sm:text-11",
                  at ? "text-sw" : "text-ink/55",
                )}
              >
                {at ? (
                  <>
                    <span>{live}</span> {at}
                  </>
                ) : (
                  <span>{t("suRichiesta")}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "How we start": four steps and the contact buttons. */
export function Steps() {
  const t = useTranslations("TourOperator");
  const steps = [
    {
      title: t("mappiamo"),
      text: t("comeGestisciOggiPrenotazioni"),
    },
    {
      title: t("troviamoIPuntiCritici"),
      text: t("iPassaggiManualiCheCreanoPiu"),
    },
    {
      title: t("costruiamoIlPrimoModulo"),
      text: t("ilPrimoSistemaUtileAttornoAi"),
    },
    {
      title: t("aggiungiamoSoloCioCheServe"),
      text: t("automazioniEReportSoloDoveFanno"),
    },
  ];
  return (
    <section id="how" className={cn(section, "bg-pale")}>
      <div className={wrap}>
        <div data-reveal className={reveal()}>
          <p className={kicker}>{t("comePartiamo")}</p>
          <h2 className={h2}>{t("quattroPassiPrimaIlTuoFlusso")}</h2>
        </div>
        <ol className="mt-12 grid grid-cols-4 gap-4 max-tour-md:grid-cols-2 max-tour-sm:mt-[30px] max-tour-sm:grid-cols-1 max-tour-sm:gap-2.5">
          {steps.map(({ title, text }, i) => (
            <li
              key={i}
              data-reveal
              className={cn(
                reveal(i as 0 | 1 | 2 | 3),
                "relative list-none rounded-2xl bg-white px-6 py-7 shadow-surface-1 max-tour-sm:grid max-tour-sm:grid-cols-[36px_1fr] max-tour-sm:gap-x-3.5 max-tour-sm:px-4 max-tour-sm:py-[18px]",
              )}
            >
              <b className="mb-[18px] grid size-9 place-items-center rounded-10 bg-sg text-15 text-white max-tour-sm:row-span-2 max-tour-sm:m-0">
                {i + 1}
              </b>
              <h3 className="mb-2 text-18 leading-[1.3] font-semibold text-sg max-tour-sm:mb-1 max-tour-sm:text-16">
                {title}
              </h3>
              <p className="text-15 leading-1.65 text-ink/70 max-tour-sm:text-14.5">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-11 flex flex-wrap gap-3.5">
          <WhatsAppLink className={button({ kind: "whatsapp", lightGlow: true })}>
            <WhatsAppIcon />
            <span>{t("parliamoneSuWhatsapp")}</span>
          </WhatsAppLink>
          <EmailLink className={button({ kind: "email", delayGlow: true, lightGlow: true })}>
            <MailIcon />
            <span>{t("scriviciUnaEmail")}</span>
          </EmailLink>
        </div>
      </div>
    </section>
  );
}

/** Questions and answers before getting in touch. */
export function Faq() {
  const t = useTranslations("TourOperator");
  const faqs = [
    [t("devoCambiarePiattaformaDi"), t("noIlSistemaSiCollegaAQuellaChe")],
    [t("eUnSoftwareProntoOCostruitoSu"), t("suMisuraSuUnaBaseGiaCollaudataIn")],
    [t("autistiEGuidePossonoUsarloDal"), t("siNelCasoFundallasGliAutisti")],
    [t("quantoCosta"), t("dipendeDaiModuliCheServono")],
    [t("lavorateAncheFuoriDallItalia"), t("siLavoriamoInItaliaENegliStati")],
  ];
  return (
    <section id="faq" className={cn(section, "bg-white")}>
      <div
        className={cn(
          wrap,
          "grid grid-cols-[0.8fr_1.2fr] gap-16 max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:gap-9",
        )}
      >
        <div data-reveal className={reveal()}>
          <p className={kicker}>{t("domandeFrequenti")}</p>
          <h2 className={h2}>{t("primaDiScriverci")}</h2>
        </div>
        <div data-reveal className={reveal(1)}>
          {faqs.map(([question, answer], i) => (
            <details key={i} className="group border-b border-sg/10 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-17 font-semibold text-sg max-tour-sm:py-[18px] max-tour-sm:text-16 [&::-webkit-details-marker]:hidden">
                {question}
                <span
                  aria-hidden="true"
                  className="grid size-[30px] flex-none place-items-center rounded-full bg-pale [transition:transform_.3s_cubic-bezier(.2,.7,.2,1),background-color_.2s] group-open:rotate-45 group-open:bg-[#e1e6f5]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#061773"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className="size-3.5"
                  >
                    <path d="M12 6v12M6 12h12" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[680px] pb-[22px] leading-1.75 text-ink/70 group-open:animate-fade-up-fast">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Closing navy call to action. */
export function Final() {
  const t = useTranslations("TourOperator");
  return (
    <div className="bg-white pb-28 max-tour-sm:pb-16">
      <div className={wrap}>
        <section
          id="final"
          data-reveal
          className={cn(
            reveal(),
            fieldNavy,
            "overflow-hidden rounded-[28px] px-10 py-[88px] text-center max-tour-sm:rounded-22 max-tour-sm:px-5 max-tour-sm:py-14",
          )}
        >
          <p className={cn(kicker, "text-cream")}>{t("ilPassoSuccessivo")}</p>
          <h2 className="mx-auto mb-5 max-w-[820px] text-[3.2rem] leading-[1.08] font-semibold tracking-[-0.035em] text-white max-tour-sm:text-2rem">
            {t("laTuaGiornataOperativaInUnUnica")}
          </h2>
          <p className="mx-auto mb-10 max-w-[640px] text-18 leading-1.7 text-white/78 max-tour-sm:mb-[30px] max-tour-sm:text-16">
            {t("unaPrimaConversazionePerMappare")}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <WhatsAppLink className={button({ kind: "whatsapp", size: "final" })}>
              <WhatsAppIcon />
              <span>{t("scriviciSuWhatsapp")}</span>
            </WhatsAppLink>
            <EmailLink
              className={button({ kind: "email", size: "final", dark: true, delayGlow: true })}
            >
              <MailIcon />
              <span>{t("scriviciUnaEmail")}</span>
            </EmailLink>
          </div>
          <p className={cn(ctaNote, "justify-center text-white/70")}>
            <i aria-hidden="true" className={ctaDot} />
            {t("rispondiamoInItalianoEInInglese")}
          </p>
          <div className="mt-[26px] flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-15 max-tour-sm:flex-col max-tour-sm:gap-2">
            <WhatsAppLink className="text-white/85 no-underline hover:text-white">
              WhatsApp +39 371 116 9430
            </WhatsAppLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export function TourFooter() {
  const t = useTranslations("TourOperator");
  return (
    <footer className="border-t border-sg/10 bg-[#e4e7ed] text-ink max-tour-sm:pb-[84px]">
      <div className="border-t border-sg/10">
        <div
          className={cn(
            wrap,
            "flex flex-wrap justify-between gap-3 pt-[22px] pb-[26px] text-12.5 text-ink/55",
          )}
        >
          <span>© 2026 · {t("softwareSuMisuraPerTourOperator")}</span>
          <span>
            <WhatsAppLink className="no-underline hover:text-sg">WhatsApp</WhatsAppLink> ·{" "}
            <EmailLink className="no-underline hover:text-sg">Email</EmailLink>
          </span>
        </div>
      </div>
    </footer>
  );
}
