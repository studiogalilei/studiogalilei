import { useLocale, useTranslations } from "next-intl";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { AppTabs, CasePanel, CaseSwitch, CountUp } from "./case-controls";
import { CheckIcon, CrossIcon, ZoomIcon } from "./icons";
import { fieldNavy, h2, kicker, lead, reveal, section, wrap } from "./ui";

const richTags = { b: (chunks: React.ReactNode) => <b>{chunks}</b> };
const img = (name: string) => `/images/tour-operator/${name}.webp`;

const badge =
  "inline-block rounded-full bg-pale px-3 py-[5px] text-12 font-semibold tracking-8 text-sg uppercase";
const blockGrid =
  "grid items-center gap-14 py-10 max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:gap-9 max-tour-sm:gap-[22px] max-tour-sm:py-[30px]";
const blockH3 =
  "my-3.5 text-1.75rem leading-[1.2] font-semibold -tracking-2 text-sg max-tour-sm:text-[1.45rem]";
const blockP = "leading-1.75 text-ink/70 max-tour-sm:text-15.5";

function ZoomLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute right-3 bottom-3 z-2 inline-flex translate-y-1 items-center gap-1.5 rounded-[9px] bg-sg/90 px-[11px] py-[7px] text-12 font-medium text-white opacity-0 transition-[opacity,translate] duration-250 group-hover/shot:translate-y-0 group-hover/shot:opacity-100 max-tour-sm:right-2.5 max-tour-sm:bottom-2.5 max-tour-sm:translate-y-0 max-tour-sm:opacity-100">
      <ZoomIcon className="size-3.5" />
      {children}
    </span>
  );
}

function Shot({
  src,
  alt,
  width,
  height,
  zoom,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  zoom: React.ReactNode;
}) {
  return (
    <div
      data-zoom
      className="group/shot relative cursor-zoom-in overflow-hidden rounded-2xl bg-white shadow-surface-3"
    >
      <ZoomLabel>{zoom}</ZoomLabel>
      {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="transition-transform duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/shot:scale-[1.015]"
      />
    </div>
  );
}

function ShotCaption({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  const locale = useLocale();
  return (
    <div className="mt-3 flex justify-between text-12.5 text-ink/55 max-tour-sm:text-12">
      {/* On phones the original hid the right part, and with it the English left part too
          (`.shot-cap span:last-child` also matched the inner .en span): kept for parity. */}
      <span className={cn(locale === "en" && "max-tour-sm:hidden")}>{left}</span>
      <span className="max-tour-sm:hidden">{right}</span>
    </div>
  );
}

function Points({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-6 grid list-none gap-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="grid grid-cols-[30px_1fr] gap-2.5 text-15.5 leading-1.65 text-ink/70 max-tour-sm:text-15 [&_b]:block [&_b]:text-16 [&_b]:font-semibold [&_b]:text-sg"
        >
          <span className="mt-px grid size-6 place-items-center rounded-full bg-sg text-white">
            <CheckIcon className="size-[13px]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseHead({
  number,
  label,
  title,
  text,
  logo,
  meta,
}: {
  number: string;
  label: string;
  title: string;
  text: string;
  logo: React.ReactNode;
  meta: [React.ReactNode, React.ReactNode][];
}) {
  return (
    <div className="mb-10 grid grid-cols-[1.3fr_0.7fr] items-end gap-12 max-tour-md:grid-cols-[minmax(0,1fr)] max-tour-md:gap-9 max-tour-sm:mb-6 max-tour-sm:gap-6">
      <div>
        <p className={kicker}>
          <span className="grid h-7 min-w-7 place-items-center rounded-lg bg-pale px-1.5 text-12.5 font-semibold text-sg">
            {number}
          </span>
          {label}
        </p>
        <h2 className={cn(h2, "mb-5")}>{title}</h2>
        <p className={lead}>{text}</p>
      </div>
      <div className="rounded-18 bg-white px-7 py-[26px] shadow-surface-2 max-tour-sm:p-5">
        {logo}
        <dl className="grid grid-cols-[auto_1fr] gap-x-[18px] gap-y-[9px] text-14 max-tour-sm:gap-x-3.5 max-tour-sm:gap-y-[7px] max-tour-sm:text-13.5">
          {meta.map(([term, value], i) => (
            <div key={i} className="contents">
              <dt className="text-ink/55">{term}</dt>
              <dd className="font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function FunDallas() {
  const t = useTranslations("TourOperator");
  const rich = (key: string) => t.rich(key, richTags);
  const zoom = t("toccaPerIngrandire");
  const appScreen = t("schermataDellApp");
  return (
    <CasePanel index={0} id="fundallas">
      <CaseHead
        number="01"
        label={t("casoStudioFundallasTours")}
        title={t("pianificazioneDeiTourEDispatch")}
        text={t("unaWebAppPerGestirePrenotazioni")}
        logo={
          // eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page
          <img
            src={img("logo-fundallas-case")}
            alt="FunDallas Tours"
            width={403}
            height={69}
            className="mb-5 h-9 w-auto max-tour-sm:mb-3.5 max-tour-sm:h-7"
          />
        }
        meta={[
          [t("dove"), "Dallas, San Antonio (Texas)"],
          [t("cosa"), t("webAppDesktopEMobile")],
          ["Booking", t("collegataAFareharbor")],
          [t("lavoro"), t("designESviluppo")],
        ]}
      />

      <div className={cn(blockGrid, "grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]")}>
        <div data-reveal className={reveal()}>
          <Shot
            src={img("screen-planning")}
            alt="Tour planning calendar"
            width={1400}
            height={761}
            zoom={zoom}
          />
          <ShotCaption left={t("ilCalendarioDiPianificazione")} right={appScreen} />
        </div>
        <div data-reveal className={reveal(1)}>
          <span className={badge}>{t("pianificare")}</span>
          <h3 className={blockH3}>{t("unCalendarioPerPianificareOgni")}</h3>
          <p className={blockP}>{t("laVistaMensileMostraLAttivita")}</p>
          <Points
            items={[
              rich("bSpaziSeparatiPerCittaBDallasE"),
              rich("bStatoDelDispatchBQualiTourVanno"),
              rich("bDettaglioDellaPartenzaB"),
            ]}
          />
        </div>
      </div>

      <div
        className={cn(
          blockGrid,
          // the original's reversed block kept the tablet gap on phones
          "grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] max-tour-sm:gap-9",
        )}
      >
        <div data-reveal className={cn(reveal(), "order-2 max-tour-md:order-none")}>
          <Shot
            src={img("screen-assignment")}
            alt="Driver and vehicle assignment"
            width={1200}
            height={667}
            zoom={zoom}
          />
          <ShotCaption left={t("assegnazioneDiAutistaEMezzo")} right={appScreen} />
        </div>
        <div data-reveal className={reveal(1)}>
          <span className={badge}>{t("assegnareEAutomatizzare")}</span>
          <h3 className={blockH3}>{t("assegnazioniCondivise")}</h3>
          <p className={blockP}>{t("leNuovePrenotazioniCompatibili")}</p>
          <Points
            items={[rich("bAutistaEMezzoCondivisiBTour"), rich("bControlloManualeSemprePossibile")]}
          />
        </div>
      </div>

      <div
        data-reveal
        className={cn(
          fieldNavy,
          reveal(),
          "my-2 grid grid-cols-3 overflow-hidden rounded-20 max-tour-sm:grid-cols-1",
        )}
      >
        {[
          [t("laSeraPrima"), t("dispatchSerale"), t("preparaEInviaLeListePerITourDel")],
          [t("primaDellaPartenza"), t("aggiornamentoDelMattino"), t("portaNelPianoLePrenotazioni")],
          [
            t("duranteIlGiorno"),
            t("aggiornamentiInGiornata"),
            t("inviaLeModificheDentroLaFinestra"),
          ],
        ].map(([when, title, text], i) => (
          <div
            key={i}
            className={cn(
              "relative px-7 pt-7 pb-[30px] max-tour-sm:px-[22px] max-tour-sm:py-5",
              i > 0 && "border-l border-white/15 max-tour-sm:border-t max-tour-sm:border-l-0",
            )}
          >
            <small className="flex items-center gap-2 text-14 font-medium text-cream">
              <i className="grid size-[22px] place-items-center rounded-full bg-[rgba(235,220,190,0.16)] text-11.5 not-italic">
                {i + 1}
              </i>
              {when}
            </small>
            <b className="mt-2 mb-1.5 block text-18 font-semibold">{title}</b>
            <p className="text-15 leading-1.7 text-white/75">{text}</p>
          </div>
        ))}
      </div>

      <div className={cn(blockGrid, "grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]")}>
        <div
          data-reveal
          className={cn(
            reveal(),
            "grid grid-cols-[0.62fr_1fr] items-start gap-[26px] max-tour-sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] max-tour-sm:items-center max-tour-sm:gap-3",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page */}
          <img
            src={img("driver-app")}
            alt="Driver app on the phone"
            width={560}
            height={953}
            loading="lazy"
            className="max-w-[280px] overflow-hidden rounded-[30px] border-8 border-[#0b1440] shadow-surface-3 max-tour-sm:w-full max-tour-sm:max-w-none max-tour-sm:rounded-20 max-tour-sm:border-[5px]"
          />
          <div>
            <Shot
              src={img("passenger-list-pdf")}
              alt="Passenger list PDF excerpt"
              width={900}
              height={1165}
              zoom={zoom}
            />
            <ShotCaption left={t("listaTourEPasseggeri")} right="PDF" />
          </div>
        </div>
        <div data-reveal className={reveal(1)}>
          <span className={badge}>{t("lEsperienzaDellAutista")}</span>
          <h3 className={blockH3}>{t("leInformazioniDelTourSulTelefono")}</h3>
          <p className={blockP}>{t("gliAutistiVedonoIProssimiTourI")}</p>
          <Points
            items={[rich("bPrenotazioniCombinateBOgni"), rich("bInvioEConfermaTracciatiBOgniPdf")]}
          />
        </div>
      </div>
      <p className="mt-7 text-13 text-ink/55">{t("schermateEDocumentiUsanoDati")}</p>
    </CasePanel>
  );
}

function BeaVita() {
  const t = useTranslations("TourOperator");
  const locale = useLocale();
  const en = locale === "en";
  const before = t("prima");
  const after = t("dopo");
  const appTitle =
    "mt-3.5 mb-3 text-1.6rem leading-[1.2] font-semibold -tracking-2 text-sg max-tour-sm:text-[1.35rem]";
  const areas = [
    {
      tab: "Dashboard",
      image: en ? "beavita-dashboard-en" : "beavita-dashboard-it",
      alt: "Dashboard",
      title: t("loStatoDellOperativitaInUna"),
      text: t("statoDeiMessaggiDelleListe"),
    },
    {
      tab: t("calendario"),
      image: en ? "beavita-calendar-en" : "beavita-calendar-it",
      title: t("prenotazioniECapienzaPerData"),
      text: t("prenotazioniCapienzaNoteTotaliE"),
    },
    {
      tab: t("painTitle2"),
      image: en ? "beavita-lists-en" : "beavita-lists-it",
      title: t("statoDeiReportEAccessoSicuroAi"),
      text: t("statoDeiReportPerDataEProdotto"),
    },
    {
      tab: t("risorse"),
      image: en ? "beavita-resources-en" : "beavita-resources-it",
      title: t("assegnazioniDiGuideEAutisti"),
      text: t("assegnazioniPerDataEProdottoCon"),
    },
    {
      tab: t("tabMessages"),
      image: en ? "beavita-messages-en" : "beavita-messages-it",
      title: t("whatsappSmsDiRiservaEAvvisi"),
      text: t("comunicazioneAiClientiPerDataDi"),
    },
  ];
  const changes = [
    [t("perOsservareUnaGiornataServiva"), t("unaSolaSchermataMostraTutto")],
    [t("seUnMessaggioAUnClienteNon"), t("iMessaggiNonConsegnatiSuWhatsapp")],
    [t("leListePasseggeriSiPreparavanoA"), t("leListeDiventanoUnPdf")],
    [t("perAvvisareIClientiDiUnCambio"), t("dallaDashboardSiMandaUnSmsAi")],
    [t("qualeGuidaEQualeAutistaSeguivano"), t("guideEAutistiSiAssegnanoNel")],
  ];
  const stats = [
    { end: 5, text: t("areeOperativeCollegate") },
    { end: 1, text: t("dashboardPrivataPerTuttoIlTeam") },
    { end: 2, text: t("finestreDiInvioMonitorateSeraE") },
    { end: 24, suffix: "h", text: t("durataDeiLinkSicuriAlleListe") },
  ];
  const label =
    "hidden max-tour-sm:mb-1 max-tour-sm:block max-tour-sm:text-12 max-tour-sm:font-semibold max-tour-sm:tracking-8 max-tour-sm:uppercase";

  return (
    <CasePanel index={1} id="beavita">
      <CaseHead
        number="02"
        label={t("casoStudioBeavitaTours")}
        title={t("tuttaLaGiornataDiUnTourOperator")}
        text={t("prenotazioniCapienzaListe")}
        logo={
          // eslint-disable-next-line @next/next/no-img-element -- same markup as the legacy page
          <img
            src={img("logo-beavita-case")}
            alt="BeaVita Tours"
            width={600}
            height={195}
            className="mb-3.5 h-[60px] w-auto max-tour-sm:mb-2.5 max-tour-sm:h-12"
          />
        }
        meta={[
          [t("dove"), t("veneziaEVenetoItalia")],
          [t("cosa"), t("dashboardWebPrivata")],
          [t("canali"), "WhatsApp, SMS, PDF"],
          [t("lavoro"), t("designESviluppo")],
        ]}
      />

      <div className="mb-14 grid grid-cols-4 overflow-hidden rounded-18 bg-white shadow-surface-2 max-tour-sm:mb-10 max-tour-sm:grid-cols-2">
        {stats.map(({ end, suffix, text }, i) => (
          <div
            key={i}
            className={cn(
              "px-7 py-[30px] max-tour-sm:px-[18px] max-tour-sm:py-5",
              i > 0 && "border-l border-sg/10",
              i === 2 && "max-tour-sm:border-l-0",
              i >= 2 && "max-tour-sm:border-t",
            )}
          >
            <CountUp
              end={end}
              suffix={suffix}
              className="block text-2.4rem leading-none font-semibold -tracking-3 text-sg max-tour-sm:text-[1.9rem]"
            />
            <span className="mt-3 block text-14 leading-[1.45] text-ink/55 max-tour-sm:text-13">
              {text}
            </span>
          </div>
        ))}
      </div>

      <h3
        className={cn(
          h2,
          "mb-2 text-2rem leading-1.1 max-tour-sm:text-2rem max-tour-sm:leading-1.15",
        )}
      >
        {t("leCinqueAreeDellApp")}
      </h3>
      <p className={cn(lead, "mb-7")}>{t("leSchermateQuiSottoSonoViste")}</p>
      <AppTabs
        tabs={areas.map((a) => a.tab)}
        panes={areas.map((a) => ({ src: img(a.image), alt: a.alt ?? a.tab }))}
        zoom={<ZoomLabel>{t("toccaPerIngrandire")}</ZoomLabel>}
        texts={areas.map((a) => (
          <Fragment key={a.image}>
            <span className={badge}>{a.tab}</span>
            <h3 className={appTitle}>{a.title}</h3>
            <p className="leading-1.75 text-ink/70">{a.text}</p>
          </Fragment>
        ))}
      />

      <h3
        className={cn(
          h2,
          "mt-20 text-2rem leading-1.1 max-tour-sm:mt-14 max-tour-sm:text-1.6rem max-tour-sm:leading-1.15",
        )}
      >
        {t("cosaECambiatoInPratica")}
      </h3>
      <div className="mt-8 overflow-hidden rounded-18 bg-white shadow-surface-2 max-tour-sm:mt-[22px]">
        <div className="grid grid-cols-2 border-b border-sg/10 bg-pale max-tour-sm:hidden">
          {[before, after].map((heading, i) => (
            <div
              key={heading}
              className={cn(
                "py-4 pr-8 pl-[72px] text-12 font-semibold tracking-8 text-sg uppercase",
                i > 0 && "border-l border-sg/10",
              )}
            >
              {heading}
            </div>
          ))}
        </div>
        {changes.map(([was, now], i) => (
          <div
            key={i}
            className="grid grid-cols-2 border-b border-sg/10 transition-colors duration-200 last:border-b-0 hover:bg-mist max-tour-sm:grid-cols-1"
          >
            <div className="flex gap-4 px-8 py-5 max-tour-sm:px-5 max-tour-sm:py-[18px]">
              <span className="mt-px grid size-6 flex-none place-items-center rounded-full bg-ink/7 text-ink/45">
                <CrossIcon className="size-3.5" />
              </span>
              <p className="text-15.5 leading-1.65 text-ink/60">
                <span className={cn(label, "text-sg/60")}>{before}</span>
                {was}
              </p>
            </div>
            <div className="flex gap-4 border-l border-sg/10 px-8 py-5 max-tour-sm:border-l-0 max-tour-sm:px-5 max-tour-sm:pt-0 max-tour-sm:pb-[18px]">
              <span className="mt-px grid size-6 flex-none place-items-center rounded-full bg-sg text-white">
                <CheckIcon className="size-3.5" />
              </span>
              <p className="text-15.5 leading-1.65 font-medium text-ink/85">
                <span className={cn(label, "text-sg")}>{after}</span>
                {now}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CasePanel>
  );
}

export function Cases() {
  const t = useTranslations("TourOperator");
  return (
    <section id="cases" className={cn(section, "bg-mist")}>
      <div className={wrap}>
        <div data-reveal className={reveal()}>
          <p className={kicker}>{t("dueProgettiUnMetodo")}</p>
          <h2 className={h2}>{t("dueTourOperatorDueMercatiLa")}</h2>
        </div>
        <CaseSwitch
          cases={[
            { name: "FunDallas Tours", detail: t("texasDispatchAutisti") },
            { name: "BeaVita Tours", detail: t("italiaDashboardOperativa") },
          ]}
        />
        <FunDallas />
        <BeaVita />
      </div>
    </section>
  );
}
