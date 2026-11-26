/*
 * The "answer pages": one page per question a buyer asks a search engine or an AI assistant
 * (what is it, how much, how long, who does it near me). Italian only for now: under /en they
 * show the same text and point their canonical address at the Italian one.
 *
 * Rules for the texts: only facts we can stand behind (our own price ranges, our own method,
 * cases already public on the site), the number before the adjective, the limit said first.
 */

import { answers, grants } from "./answers";
import { compares } from "./compare";
import { SECTOR_OBJECTIONS } from "./sector-objections";
import { COMMON_DOUBTS, SECTOR_DOUBTS } from "./doubts";
import { SECTOR_SHOTS, sectors, type Sector } from "./sectors";

export type LandingFaq = { q: string; a: string };
export type LandingSection = {
  title: string;
  /** Shown before the bullets. */
  intro?: string;
  body?: string[];
  bullets?: string[];
  /** On a guided page: the anchor and the short name of the stop in the side guide. */
  id?: string;
  step?: string;
};
export type LandingStep = { title: string; text: string };
export type LandingFact = { value: string; label: string };
export type LandingPrice = { label: string; value: string; note: string };

export type Landing = {
  path: string;
  kind: "service" | "guide" | "local" | "sector" | "method" | "compare";
  kicker: string;
  title: string;
  metaTitle: string;
  description: string;
  /** The direct answer, first thing on the page: what an AI assistant would quote. */
  answer: string;
  sections: LandingSection[];
  steps?: { title: string; intro?: string; items: LandingStep[] };
  prices?: { title: string; intro: string; rows: LandingPrice[]; note: string };
  caseStudy?: boolean;
  /** The numbers a buyer looks for first (price, time), shown large next to the answer. */
  facts?: LandingFact[];
  /** A side-by-side comparison, shown right under the answer. */
  table?: { title: string; columns: string[]; rows: { label: string; cells: string[] }[] };
  /** Objections proper to this page's subject, shown before the general questions. */
  objections?: { title: string; items: LandingFaq[] };
  /** Further questions by theme (the page of all the answers). */
  groups?: { id: string; title: string; intro?: string; items: LandingFaq[] }[];
  /** An example screen of the software, shown under the answer. */
  image?: { src: string; alt: string };
  /** Figures from published studies, each with its source: shown large under the answer. */
  stats?: { value: string; label: string; source: string }[];
  /** The studies quoted on the page, linked. */
  sources?: { label: string; url: string }[];
  faqs: LandingFaq[];
  /** Title of the questions block: "Domande frequenti" when not set. */
  faqTitle?: string;
  related: string[];
  /**
   * A guided page: a side guide with the stops of the page and the call button always in view,
   * and an invitation to book halfway down, after the reader has seen what we build.
   */
  guide?: { midCta: { title: string; text: string } };
};

/** Shown on every page and in the structured data: bump it when the texts or prices change. */
export const LANDING_UPDATED = "2026-11-26";
export const LANDING_AUTHOR = { name: "Dramane Yigo", role: "co-founder di Studio Galilei" };

const SOFTWARE_RANGE = "da 5.000 a 80.000 €";
const AI_RANGE = "da 3.000 a 40.000 €";

const FACTS_SOFTWARE: LandingFact[] = [
  { value: "da 5.000 €", label: "un software su misura, fino a 80.000 € secondo persone e reparti" },
  { value: "8-10 settimane", label: "un progetto di media complessità" },
  { value: "A tappe", label: "la prima parte in uso dopo poche settimane, si paga una tappa alla volta" },
];
const FACTS_AI: LandingFact[] = [
  { value: "da 3.000 €", label: "un agente AI o un'automazione, fino a 40.000 €" },
  { value: "1 compito", label: "per cominciare, provato sui tuoi casi veri" },
  { value: "1 persona", label: "che approva sempre i passaggi delicati" },
];

const STEPS_SOFTWARE: LandingStep[] = [
  {
    title: "Studiamo la tua azienda",
    text: "Se lavori da solo guardiamo la tua giornata: cosa fai ogni giorno, cosa ripeti, cosa copi da un programma all'altro. Se avete più reparti studiamo ogni area e i passaggi da una all'altra, perché è lì che il lavoro si perde. Ne esce la mappa del tempo che oggi potete riprendervi.",
  },
  {
    title: "Mettiamo in ordine i passaggi e l'AI nei punti giusti",
    text: "Togliamo i passaggi che non servono e segniamo quelli che il sistema può fare da solo, come leggere le richieste, compilare i documenti e mandare promemoria e avvisi. Le decisioni che contano restano a una persona, che controlla e approva.",
  },
  {
    title: "Verifichiamo i bandi",
    text: "Prima di partire controlliamo se il progetto può rientrare nella finanza agevolata, come la Nuova Sabatini o i bandi delle Camere di Commercio per la digitalizzazione. Spesso così l'investimento costa meno di quanto si pensa.",
  },
  {
    title: "Costruiamo un sistema unico, a tappe",
    text: "Un solo sistema che collega persone e reparti, al posto di fogli, email e programmi che non si parlano. La prima parte la vedi funzionare dopo poche settimane con i tuoi dati veri, il resto arriva a tappe, senza fermare il lavoro. Il sistema resta dell'azienda e ne aumenta il valore.",
  },
  {
    title: "Restiamo con te",
    text: "Dopo il rilascio seguiamo noi il sistema, con correzioni, piccole modifiche e aggiornamenti, e quando l'azienda cresce lo facciamo crescere insieme a lei. Chi ti risponde è chi l'ha costruito.",
  },
];

/** Why the path is worth it to the owner: said once, before the steps of a software project. */
const STEPS_SOFTWARE_INTRO =
  "Vale per chi lavora da solo e per chi ha cento dipendenti. Alla fine hai un sistema unico che resta della tua azienda e ne aumenta il valore, il team lavora senza ricopiare niente e tu ti riprendi il tempo per le cose che contano davvero.";

const STEPS_AI: LandingStep[] = [
  {
    title: "Studiamo come lavorate",
    text: "Guardiamo la giornata di chi lavora da solo, o i reparti di un'azienda più grande, e segniamo i punti in cui il lavoro si ripete. È lì che l'AI fa risparmiare più tempo, e se in un punto non serve te lo diciamo.",
  },
  {
    title: "Prototipo su casi veri",
    text: "Lo proviamo su richieste, documenti e dati reali della tua azienda, non su esempi inventati.",
  },
  {
    title: "Misuriamo",
    text: "Contiamo quante volte fa giusto e quante sbaglia, e che tipo di errori fa. Si va avanti solo se i numeri reggono.",
  },
  {
    title: "In uso, con una persona al controllo",
    text: "All'inizio prepara e una persona approva. Sui passaggi delicati (soldi, contratti, reclami) l'approvazione resta sempre a una persona.",
  },
  {
    title: "Ampliamo",
    text: "Quando il primo compito funziona aggiungiamo il successivo, un pezzo alla volta.",
  },
];

export const landings: Landing[] = [
  {
    path: "/gestionale-su-misura",
    facts: FACTS_SOFTWARE,
    kind: "service",
    kicker: "Sviluppo software",
    title: "Gestionale su misura per la tua azienda",
    metaTitle: "Gestionale su misura: sviluppo, costi e tempi",
    description:
      "Gestionali su misura per PMI: studiamo come lavori, mettiamo in ordine i passaggi e l'AI nei punti giusti, il team approva. Da 5.000 a 80.000 €, con i bandi verificati prima.",
    answer: `Un gestionale su misura è un software fatto per la tua azienda, invece di adattare l'azienda a un programma già fatto. Prima mettiamo in ordine i passaggi, cioè chi fa cosa e quando, poi il software li porta avanti da solo e il tuo team controlla e approva. Si parte da uno studio di come lavori, da solo o con i tuoi reparti, e l'AI entra nei punti in cui il lavoro si ripete. I nostri progetti vanno ${SOFTWARE_RANGE}, secondo quante persone e quanti reparti coinvolgono, e il sistema resta tuo.`,
    sections: [
      {
        title: "Quando conviene un gestionale su misura",
        bullets: [
          "Lavori tra fogli Excel, email e più programmi che non si parlano, e gli stessi dati vengono ricopiati a mano.",
          "Hai un processo tuo (noleggi, partenze, turni, commesse, consegne) che i programmi standard coprono male.",
          "Paghi licenze per funzioni che non usi, e quella che ti serve non c'è.",
          "Vuoi che clienti, fornitori o collaboratori entrino in un'area riservata e vedano solo quello che li riguarda.",
        ],
        body: [
          "Non conviene quando un programma già pronto copre quasi tutto quello che fai: costa meno, si parte prima, e in quel caso te lo diciamo anche se il lavoro lo perdiamo noi.",
        ],
      },
      {
        title: "Cosa costruiamo",
        bullets: [
          "Dashboard operative: in un posto solo quello che oggi è sparso tra fogli, email e strumenti separati.",
          "Richieste, preventivi, ordini, consegne e fatture, collegati tra loro dall'inizio alla fine.",
          "Portali per i tuoi clienti: documenti, stato dei lavori, comunicazioni.",
          "Permessi per ruolo: ogni persona vede solo ciò che le serve.",
          "Integrazioni con i programmi che usi già, dalla contabilità alla fatturazione elettronica, senza obbligarti a cambiarli.",
          "AI dentro il gestionale: lettura di documenti ed email, riepiloghi, bozze di risposta, controlli automatici.",
        ],
      },
      {
        title: "Di chi è il software",
        body: [
          "È tuo: codice, documentazione, account e dati restano a tua disposizione, e se un giorno vuoi farlo seguire da qualcun altro puoi farlo.",
        ],
      },
    ],
    steps: { title: "Come lavoriamo", intro: STEPS_SOFTWARE_INTRO, items: STEPS_SOFTWARE },
    prices: {
      title: "Quanto costa",
      intro:
        "Le cifre qui sotto sono le fasce dei nostri progetti, IVA esclusa. Il preventivo preciso arriva dopo lo studio dell'azienda, quando sappiamo cosa serve davvero.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo quante persone e quanti reparti coinvolge e quanti programmi collega.",
        },
        {
          label: "AI e automazioni",
          value: AI_RANGE,
          note: "Da sole o dentro il gestionale.",
        },
      ],
      note: "Un progetto di media complessità richiede 8-10 settimane. Dopo il rilascio ci sono i costi di hosting e un canone di assistenza, che definiamo insieme prima di partire.",
    },
    caseStudy: true,
    faqs: [
      {
        q: "Quanto costa un gestionale su misura?",
        a: `I nostri progetti vanno ${SOFTWARE_RANGE}, IVA esclusa. Il prezzo dipende da quante persone e quanti reparti coinvolge, da quanti programmi va collegato e da quanto lavoro copre. Si paga a tappe, e prima di partire verifichiamo se il progetto rientra in un bando.`,
      },
      {
        q: "Quanto tempo serve per svilupparlo?",
        a: "Un progetto di media complessità richiede 8-10 settimane. Lavoriamo a tappe: la prima parte entra in uso prima della fine del progetto, il resto segue.",
      },
      {
        q: "Il codice resta mio?",
        a: "Sì, il software che costruiamo è tuo: codice, documentazione, account e dati restano a tua disposizione.",
      },
      {
        q: "Si collega ai programmi che uso già?",
        a: "Sì, quando quei programmi permettono di scambiare dati. Colleghiamo il gestionale a contabilità, fatturazione elettronica, e-commerce, fogli di calcolo e posta, senza obbligarti a sostituirli. Lo verifichiamo programma per programma durante la mappatura.",
      },
      {
        q: "Meglio un gestionale su misura o uno già pronto?",
        a: "Se un programma già pronto copre quasi tutto il tuo lavoro, conviene quello: costa meno e parte subito. Il su misura conviene quando il tuo processo è particolare, quando oggi ricopi dati a mano tra più strumenti o quando paghi licenze per funzioni che non usi.",
      },
      {
        q: "Dove entra l'intelligenza artificiale?",
        a: "Dove toglie lavoro ripetitivo: leggere documenti ed email e inserirli nel gestionale, preparare bozze di risposta o di preventivo, fare riepiloghi, segnalare anomalie. Prima costruiamo il sistema, poi aggiungiamo l'AI dove i numeri dicono che serve.",
      },
      {
        q: "Cosa succede dopo la consegna?",
        a: "Restiamo noi a seguire il software, con un canone di assistenza concordato prima di partire: correzioni, piccole modifiche e aggiornamenti. Chi ti risponde è chi l'ha costruito.",
      },
      {
        q: "Lavorate solo in Veneto?",
        a: "No, siamo a Treviso e incontriamo volentieri di persona le aziende del Veneto, ma lavoriamo in tutta Italia e all'estero: due nostri software sono in uso in Texas e in Italia.",
      },
    ],
    related: [
      "/guide/quanto-costa-un-gestionale-su-misura",
      "/confronti/gestionale-su-misura-o-gia-pronto",
      "/agenti-ai-per-aziende",
      "/metodo",
    ],
  },
  {
    path: "/agenti-ai-per-aziende",
    facts: FACTS_AI,
    kind: "service",
    kicker: "Intelligenza artificiale",
    title: "Agenti AI per aziende: cosa fanno e come li costruiamo",
    metaTitle: "Agenti AI per aziende e PMI: sviluppo su misura",
    description:
      "Costruiamo agenti AI su misura per le PMI, collegati ai programmi che usi già: leggono richieste e documenti, preparano risposte e azioni, con una persona al controllo, da 3.000 a 40.000 €.",
    answer: `Un agente AI è un software che usa un modello di intelligenza artificiale per portare a termine un compito: legge una richiesta, cerca i dati nei tuoi sistemi, prepara la risposta o compie l'azione, e passa la mano a una persona quando serve. Li costruiamo su misura, collegati ai programmi che usi già. I progetti di AI e automazione vanno ${AI_RANGE}.`,
    sections: [
      {
        title: "Cosa può fare un agente AI in una PMI",
        bullets: [
          "Rispondere alle richieste dei clienti usando i dati veri: ordini, disponibilità, stato di una pratica.",
          "Leggere email, PDF e documenti e inserire i dati nel gestionale al posto tuo.",
          "Preparare la bozza di un preventivo o di una risposta, che una persona controlla e manda.",
          "Smistare le richieste in arrivo a chi deve occuparsene.",
          "Fare ogni mattina il riepilogo di cosa è successo e di cosa aspetta una decisione.",
        ],
      },
      {
        title: "Cosa non fa, e i limiti da conoscere prima",
        body: [
          "Un agente sbaglia, e per questo lo misuriamo su casi veri prima di accenderlo e lo teniamo sotto controllo dopo.",
          "Non decide da solo sui passaggi delicati: prezzi, contratti, reclami e pagamenti restano a una persona che approva.",
          "Non sostituisce un processo che non esiste. Se oggi il lavoro è disordinato, prima si mette ordine con un sistema, poi si aggiunge l'AI.",
        ],
      },
      {
        title: "Agente AI e chatbot: la differenza",
        body: [
          "Un chatbot risponde a domande, mentre un agente fa un lavoro: entra nei tuoi sistemi, legge e scrive dati e porta il compito fino in fondo. Il chatbot ti dice gli orari, l'agente sposta la prenotazione.",
        ],
      },
      {
        title: "Li usiamo prima su di noi",
        body: [
          "Il primo agente lo abbiamo costruito per il nostro lavoro: leggeva le risposte dei clienti, preparava le bozze e un secondo modello le controllava prima che uscissero. Quello che proponiamo lo abbiamo già visto funzionare, e anche sbagliare, in casa nostra.",
        ],
      },
    ],
    steps: { title: "Come lavoriamo", items: STEPS_AI },
    prices: {
      title: "Quanto costa",
      intro:
        "Le fasce dei nostri progetti, IVA esclusa. Il preventivo preciso arriva dopo aver visto il compito e i dati.",
      rows: [
        {
          label: "Agenti AI e automazioni",
          value: AI_RANGE,
          note: "Secondo il numero di compiti, i sistemi da collegare e i controlli richiesti.",
        },
        {
          label: "Gestionale con l'AI dentro",
          value: SOFTWARE_RANGE,
          note: "Quando oltre all'agente serve il sistema su cui lavora.",
        },
      ],
      note: "Oltre allo sviluppo c'è il consumo del modello di AI, che si paga a utilizzo e dipende dai volumi: lo stimiamo insieme sul prototipo, prima di partire.",
    },
    faqs: [
      {
        q: "Quanto costa un agente AI per un'azienda?",
        a: `I nostri progetti di AI e automazione vanno ${AI_RANGE}, IVA esclusa. A questo si aggiunge il consumo del modello, che si paga a utilizzo e dipende da quante richieste gestisce. Si parte da un compito solo, così la spesa iniziale resta bassa.`,
      },
      {
        q: "Quali modelli di AI usate?",
        a: "Scegliamo il modello in base al compito, tra quelli dei principali fornitori come Anthropic (Claude), OpenAI (GPT) e Google (Gemini). Costruiamo l'agente in modo che il modello si possa cambiare, perché i migliori cambiano ogni pochi mesi.",
      },
      {
        q: "I dati della mia azienda vengono usati per addestrare l'AI?",
        a: "No, se si usano i servizi aziendali dei fornitori con le condizioni giuste. Lo verifichiamo per ogni progetto e lo mettiamo per iscritto, insieme a dove vengono conservati i dati.",
      },
      {
        q: "Si collega al mio gestionale?",
        a: "Sì, quando il gestionale permette di leggere e scrivere dati dall'esterno, cosa che verifichiamo all'inizio. Se non lo permette si lavora su esportazioni, email e documenti, oppure si valuta un gestionale su misura.",
      },
      {
        q: "Cosa chiede il regolamento europeo sull'AI?",
        a: "Tra le altre cose chiede trasparenza: chi parla con un sistema di AI deve saperlo. Lo prevediamo dall'inizio, insieme al controllo umano sui passaggi delicati e al rispetto del GDPR per i dati personali.",
      },
      {
        q: "E se l'agente sbaglia?",
        a: "Succede, e va messo in conto: per questo misuriamo gli errori su casi veri prima di accenderlo, all'inizio facciamo approvare tutto a una persona e teniamo traccia di ogni azione, così un errore si vede e si corregge.",
      },
      {
        q: "Da dove si comincia?",
        a: "Da un compito solo, quello ripetitivo che ti costa più ore: costruiamo un prototipo, lo proviamo sui tuoi casi veri e misuriamo, e se i numeri non reggono ci fermiamo lì.",
      },
    ],
    related: [
      "/guide/quanto-costa-un-agente-ai",
      "/confronti/agente-ai-o-automazione",
      "/automazione-processi-aziendali",
      "/metodo",
    ],
  },
  {
    path: "/automazione-processi-aziendali",
    facts: FACTS_AI,
    kind: "service",
    kicker: "Intelligenza artificiale",
    title: "Automazione dei processi aziendali con l'AI",
    metaTitle: "Automazione dei processi aziendali con l'AI per PMI",
    description:
      "Automatizziamo il lavoro ripetitivo delle PMI: dati ricopiati a mano, solleciti, report, passaggi tra programmi, con l'AI dove serve e una persona al controllo, da 3.000 a 40.000 €.",
    answer: `Automatizzare un processo vuol dire far fare al software il lavoro ripetitivo che oggi fanno le persone: ricopiare dati, mandare solleciti, preparare report, passare informazioni da un programma all'altro. Con l'AI si automatizzano anche i passaggi dove c'è da leggere e capire un testo. I nostri progetti vanno ${AI_RANGE}.`,
    sections: [
      {
        title: "Cosa si automatizza per primo",
        bullets: [
          "Dati che arrivano per email o PDF e vengono ricopiati a mano nel gestionale.",
          "Solleciti, promemoria e conferme ai clienti.",
          "Report che ogni settimana qualcuno costruisce a mano da più fonti.",
          "Passaggi tra programmi: l'ordine dell'e-commerce che deve arrivare in magazzino e in contabilità.",
          "Controlli ripetitivi: scadenze, documenti mancanti, dati che non tornano.",
        ],
      },
      {
        title: "Quando non conviene",
        body: [
          "Se un'attività capita poche volte al mese, o cambia ogni volta, automatizzarla costa più di quanto fa risparmiare. Prima di proporre qualcosa contiamo le ore che quel lavoro porta via: se sono poche, lo lasciamo com'è.",
        ],
      },
      {
        title: "Automazione semplice o agente AI",
        body: [
          "Un'automazione semplice segue regole fisse: quando succede questo, fai quello. Costa meno ed è la scelta giusta quando i casi sono sempre uguali.",
          "Un agente AI serve quando c'è da leggere e interpretare: un'email scritta a mano libera, un documento sempre diverso, una richiesta ambigua. Spesso il risultato migliore arriva mettendo insieme le due cose.",
        ],
      },
    ],
    steps: { title: "Come lavoriamo", items: STEPS_AI },
    prices: {
      title: "Quanto costa",
      intro: "La fascia dei nostri progetti, IVA esclusa.",
      rows: [
        {
          label: "AI e automazioni",
          value: AI_RANGE,
          note: "Secondo quanti processi, quanti programmi da collegare e quanta AI serve.",
        },
      ],
      note: "Se l'automazione usa un modello di AI c'è anche il suo consumo, a utilizzo, che stimiamo sul prototipo.",
    },
    faqs: [
      {
        q: "Quali processi aziendali si possono automatizzare?",
        a: "Quelli ripetitivi e frequenti: inserimento dati da email e documenti, solleciti e promemoria, report periodici, passaggio di dati tra programmi, controlli su scadenze e documenti. Con l'AI anche quelli in cui serve leggere e capire un testo.",
      },
      {
        q: "Quanto costa automatizzare un processo?",
        a: `I nostri progetti di AI e automazione vanno ${AI_RANGE}, IVA esclusa. Un'automazione a regole fisse su un solo processo sta nella parte bassa della fascia; più processi, più programmi da collegare e più AI la portano in alto.`,
      },
      {
        q: "Devo cambiare i programmi che uso?",
        a: "No, colleghiamo l'automazione agli strumenti che usi già. Cambiarli ha senso solo se sono loro a bloccare il lavoro, e in quel caso te lo diciamo prima.",
      },
      {
        q: "Le persone vengono sostituite?",
        a: "Viene sostituito il lavoro ripetitivo, non chi lo fa. Le persone restano sui passaggi dove serve giudizio e approvano quello che il sistema prepara.",
      },
      {
        q: "Come capisco se ne vale la pena?",
        a: "Contando le ore: durante la mappatura misuriamo quanto tempo porta via oggi quel lavoro e lo confrontiamo con il costo dell'automazione, e se il conto non torna non la facciamo.",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/confronti/agente-ai-o-automazione",
      "/guide/quanto-costa-un-agente-ai",
      "/gestionale-su-misura",
    ],
  },
  {
    path: "/software-house-treviso",
    facts: FACTS_SOFTWARE,
    kind: "local",
    kicker: "Treviso, Veneto",
    title: "Software house a Treviso: software su misura e agenti AI",
    metaTitle: "Software house a Treviso: gestionali su misura e AI",
    description:
      "Studio Galilei è una software house di Treviso: gestionali su misura, automazioni e agenti AI per le aziende del Veneto e di tutta Italia. Vieni a trovarci in sede o prenota una chiamata.",
    answer:
      "Studio Galilei è una software house di Treviso. Costruiamo gestionali su misura, automazioni e agenti AI per le piccole e medie imprese, partendo dai loro processi. Lavoriamo con aziende del Veneto, del resto d'Italia e dell'estero, e chi è in zona può passare a trovarci in sede.",
    sections: [
      {
        title: "Cosa facciamo",
        bullets: [
          "Gestionali e software su misura: dashboard operative, portali clienti, preventivi, ordini, noleggi, consegne.",
          "Agenti AI collegati ai tuoi programmi, con una persona al controllo sui passaggi delicati.",
          "Automazione del lavoro ripetitivo: dati, solleciti, report, passaggi tra programmi.",
          "Integrazioni con i software che usi già, senza obbligarti a cambiarli.",
        ],
      },
      {
        title: "Perché una software house vicina",
        body: [
          "Un gestionale si costruisce guardando come lavora l'azienda. Di persona si capisce in un'ora quello che in videochiamata richiede tre riunioni: per questo, con le aziende di Treviso e del Veneto, la prima mappatura la facciamo volentieri da te, in ufficio o in reparto.",
          "Non è un obbligo, perché seguiamo progetti anche a distanza: due nostri software per tour operator sono in uso ogni giorno in Texas e in Italia.",
        ],
      },
      {
        title: "Come siamo fatti",
        body: [
          "Siamo uno studio piccolo, nato nel 2024. Chi lavora al tuo progetto lo conosce per intero e ti risponde direttamente.",
          "Entriamo nel problema prima di proporre lo strumento, e se un progetto non ha senso lo diciamo, anche quando saremmo noi a farlo.",
          "Il software che costruiamo resta tuo: codice, documentazione, account e dati.",
        ],
      },
      {
        title: "Dove siamo",
        body: [
          "Siamo a Treviso, e la sede legale è a Crocetta del Montello (TV), in Via Francesco Baracca 81. Per venire a trovarci scrivici o prenota una chiamata: fissiamo un orario e ti aspettiamo con un caffè.",
        ],
      },
    ],
    prices: {
      title: "Quanto costa",
      intro: "Le fasce dei nostri progetti, IVA esclusa.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo persone, reparti e programmi da collegare.",
        },
        {
          label: "AI e automazioni",
          value: AI_RANGE,
          note: "Da sole o dentro il gestionale.",
        },
      ],
      note: "Ci occupiamo anche di finanza agevolata: durante la prima chiamata verifichiamo se il tuo progetto può rientrare in un bando.",
    },
    caseStudy: true,
    faqs: [
      {
        q: "Dove si trova Studio Galilei?",
        a: "A Treviso, con sede legale a Crocetta del Montello (TV), in Via Francesco Baracca 81. Riceviamo su appuntamento: basta scriverci o prenotare una chiamata dal sito.",
      },
      {
        q: "Lavorate solo con aziende di Treviso?",
        a: "No, lavoriamo con aziende di tutto il Veneto, del resto d'Italia e dell'estero, e con chi è in zona facciamo volentieri il primo incontro di persona.",
      },
      {
        q: "Che tipo di software sviluppate?",
        a: "Gestionali e software su misura, agenti AI e automazioni dei processi, più le integrazioni con i programmi che l'azienda usa già.",
      },
      {
        q: "Quanto costa un progetto?",
        a: `I gestionali e i software su misura vanno ${SOFTWARE_RANGE}, i progetti di AI e automazione ${AI_RANGE}, IVA esclusa. Prima di partire verifichiamo se il progetto rientra in un bando.`,
      },
      {
        q: "Posso passare in sede?",
        a: "Sì, su appuntamento: scrivici o prenota una chiamata conoscitiva dal sito e fissiamo un orario.",
      },
    ],
    related: [
      "/gestionale-su-misura",
      "/agenti-ai-per-aziende",
      "/confronti/software-house-freelance-o-team-interno",
      "/domande",
    ],
  },
  {
    path: "/guide/quanto-costa-un-gestionale-su-misura",
    facts: FACTS_SOFTWARE,
    kind: "guide",
    kicker: "Guida",
    title: "Quanto costa un gestionale su misura",
    metaTitle: "Quanto costa un gestionale su misura: fasce di prezzo 2026",
    description:
      "Un gestionale su misura costa da 5.000 a 80.000 € nei nostri progetti. Cosa fa salire il prezzo, quali costi ci sono dopo il rilascio e come spendere meno, bandi compresi.",
    answer: `Nei nostri progetti un gestionale su misura costa ${SOFTWARE_RANGE}, IVA esclusa. La differenza la fanno quante persone e quanti reparti coinvolge, quanto lavoro copre e quanti programmi va collegato. Dopo il rilascio ci sono l'hosting e un canone di assistenza. Si paga a tappe, e una parte può rientrare nella finanza agevolata.`,
    sections: [
      {
        title: "Cosa fa salire o scendere il prezzo",
        bullets: [
          "Quanto lavoro copre: preventivi, ordini, magazzino, noleggi, consegne, fatture. Ogni parte in più è lavoro in più.",
          "Le integrazioni: collegare contabilità, fatturazione elettronica, e-commerce o macchinari richiede tempo, e dipende da quanto quei programmi sono aperti.",
          "I ruoli: un software usato da tre persone con gli stessi permessi costa meno di uno con uffici, magazzino, agenti e clienti che vedono cose diverse.",
          "I dati da portare dentro: anni di storico su Excel vanno puliti e importati.",
          "L'app per il telefono: se serve per chi lavora fuori sede, è un pezzo in più.",
          "L'AI: lettura di documenti, bozze automatiche e agenti si aggiungono al sistema.",
        ],
      },
      {
        title: "I costi dopo il rilascio",
        bullets: [
          "Hosting: il server su cui gira il software.",
          "Assistenza: un canone per correzioni, piccole modifiche e aggiornamenti, concordato prima di partire.",
          "Consumo dell'AI, se c'è: si paga a utilizzo e dipende dai volumi.",
        ],
        body: [
          "Sono le voci che un preventivo serio deve mostrare prima della firma, e se non le vedi conviene chiederle.",
        ],
      },
      {
        title: "Su misura o in licenza: il confronto",
        body: [
          "Un programma in licenza costa poco all'inizio e si paga ogni mese, per sempre, spesso a utente. Conviene quando copre quasi tutto il tuo lavoro così com'è.",
          "Un gestionale su misura costa di più all'inizio e poi resta tuo: paghi hosting e assistenza, non una licenza a utente. Conviene quando il tuo processo è particolare o quando oggi tieni insieme più strumenti a mano.",
        ],
      },
      {
        title: "Come spendere meno",
        bullets: [
          "Fallo entrare in uso a tappe: paghi una tappa alla volta e vedi i risultati prima di andare avanti.",
          "Chiedi un prototipo prima dello sviluppo: correggere un'idea su un prototipo costa una frazione di quanto costa dopo.",
          "Tieni i programmi che funzionano e collegali, invece di rifare tutto.",
          "Verifica i bandi: una parte dell'investimento in software può rientrare nella finanza agevolata. Lo controlliamo insieme nella prima chiamata.",
        ],
      },
    ],
    prices: {
      title: "Le nostre fasce",
      intro: "Le fasce dei nostri progetti, IVA esclusa.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo persone, reparti e programmi da collegare.",
        },
        {
          label: "AI e automazioni",
          value: AI_RANGE,
          note: "Da sole o dentro il gestionale.",
        },
      ],
      note: "Un progetto di media complessità richiede 8-10 settimane.",
    },
    faqs: [
      {
        q: "Qual è il prezzo minimo di un gestionale su misura?",
        a: "I nostri progetti partono da 5.000 €, IVA esclusa, per un sistema piccolo e chiaro, come quello di chi lavora da solo o con pochi collaboratori.",
      },
      {
        q: "Perché due preventivi per lo stesso gestionale sono così diversi?",
        a: "Di solito perché descrivono cose diverse. Uno conta tutte le parti, le integrazioni e l'assistenza, l'altro solo la prima versione. Per confrontarli chiedi a tutti e due l'elenco di cosa copre, delle integrazioni e dei costi dopo il rilascio.",
      },
      {
        q: "Si paga tutto all'inizio?",
        a: "No, si lavora a rilasci, e i pagamenti seguono le tappe concordate nel preventivo.",
      },
      {
        q: "Quanto costa la manutenzione?",
        a: "Dipende da quanto il software cresce e da quante modifiche chiedi. È un canone che concordiamo prima di partire, insieme al costo dell'hosting, così sai quanto spendi anche dopo.",
      },
      {
        q: "Ci sono contributi per un gestionale su misura?",
        a: "In alcuni casi sì: una parte degli investimenti in software e digitalizzazione può rientrare in bandi e agevolazioni, che cambiano nel tempo e per regione. Verifichiamo il tuo caso nella prima chiamata.",
      },
    ],
    related: [
      "/gestionale-su-misura",
      "/confronti/gestionale-su-misura-o-gia-pronto",
      "/guide/bandi-software-ai",
      "/guide/quanto-costa-un-agente-ai",
    ],
  },
  {
    path: "/guide/quanto-costa-un-agente-ai",
    facts: FACTS_AI,
    kind: "guide",
    kicker: "Guida",
    title: "Quanto costa un agente AI per un'azienda",
    metaTitle: "Quanto costa un agente AI per un'azienda: prezzi 2026",
    description:
      "Un agente AI su misura costa da 3.000 a 40.000 € nei nostri progetti, più il consumo del modello. Cosa incide sul prezzo, i costi ricorrenti e come partire spendendo poco.",
    answer: `Nei nostri progetti un agente AI su misura costa ${AI_RANGE}, IVA esclusa. A questo si aggiunge il consumo del modello di AI, che si paga a utilizzo e dipende da quante richieste gestisce. Il prezzo sale con il numero di compiti, con i sistemi da collegare e con i controlli richiesti. Si parte da un compito solo.`,
    sections: [
      {
        title: "Le due voci di costo",
        body: [
          "La prima è lo sviluppo: capire il compito, costruire l'agente, collegarlo ai tuoi sistemi, provarlo su casi veri, e si paga una volta.",
          "La seconda è il consumo: ogni volta che l'agente lavora usa un modello di AI, che il fornitore fa pagare a utilizzo. Con pochi casi al giorno è una cifra piccola, con migliaia va stimata bene. La calcoliamo sul prototipo, prima di partire.",
        ],
      },
      {
        title: "Cosa incide sul prezzo",
        bullets: [
          "Quanti compiti deve svolgere: uno solo o un intero flusso.",
          "Quanti sistemi deve leggere e scrivere: posta, gestionale, CRM, documenti.",
          "Quanto sono ordinati i dati di partenza.",
          "Quanti controlli servono: approvazioni, registro delle azioni, un secondo modello che verifica il primo.",
          "Se sotto c'è già un sistema su cui lavorare, o se va costruito anche quello.",
        ],
      },
      {
        title: "Come capire se rende",
        body: [
          "Si contano le ore: se un compito porta via dieci ore a settimana e l'agente ne toglie la maggior parte, il conto si fa in fretta. Se ne porta via una, quasi mai conviene. Questo conto lo facciamo insieme prima del preventivo, e se non torna ci fermiamo.",
        ],
      },
      {
        title: "Come partire spendendo poco",
        bullets: [
          "Un compito solo, quello più ripetitivo.",
          "Un prototipo provato sui tuoi casi veri, con gli errori contati.",
          "All'inizio l'agente prepara e una persona approva: costa meno controlli e si impara cosa sbaglia.",
        ],
      },
    ],
    prices: {
      title: "Le nostre fasce",
      intro: "Le fasce dei nostri progetti, IVA esclusa.",
      rows: [
        {
          label: "Agenti AI e automazioni",
          value: AI_RANGE,
          note: "Sviluppo, collegamenti e prove su casi veri.",
        },
        {
          label: "Gestionale con l'AI dentro",
          value: SOFTWARE_RANGE,
          note: "Quando va costruito anche il sistema su cui l'agente lavora.",
        },
      ],
      note: "Il consumo del modello si paga a parte, a utilizzo, direttamente al fornitore o tramite noi.",
    },
    faqs: [
      {
        q: "Quanto costa al mese un agente AI?",
        a: "Dopo lo sviluppo restano due costi: il consumo del modello, che dipende da quante richieste gestisce l'agente, e l'assistenza. Li stimiamo sul prototipo e li scriviamo nel preventivo, così la cifra mensile la conosci prima di partire.",
      },
      {
        q: "Un agente AI costa meno di una persona?",
        a: "Non è il confronto giusto, perché l'agente toglie le ore ripetitive e le persone restano sui passaggi dove serve giudizio. Il conto da fare è quante ore di lavoro ripetitivo libera rispetto a quanto costa.",
      },
      {
        q: "Esistono agenti AI già pronti che costano meno?",
        a: "Sì, e per compiti generici vanno bene. Un agente su misura conviene quando deve entrare nei tuoi sistemi, seguire le tue regole e lavorare sui tuoi dati.",
      },
      {
        q: "Cosa succede se dopo il prototipo non funziona?",
        a: "Ci si ferma, e il prototipo serve proprio a questo: scoprire con una spesa piccola se il compito si presta, prima di investire nello sviluppo completo.",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/confronti/agente-ai-o-automazione",
      "/guide/bandi-software-ai",
      "/guide/quanto-costa-un-gestionale-su-misura",
    ],
  },
  {
    path: "/agenzie-partner",
    kind: "method",
    kicker: "Partner",
    title: "Porta software e AI ai tuoi clienti, senza costruire un reparto",
    metaTitle: "Agenzie partner: software e AI per i tuoi clienti",
    description:
      "Per agenzie di marketing, web agency e consulenti: i tuoi clienti chiedono gestionali, automazioni e agenti AI, noi li costruiamo. In segnalazione o con il tuo marchio, con un accordo scritto.",
    answer:
      "Se sei un'agenzia o un consulente, prima o poi un cliente ti chiede un gestionale, un'automazione o un agente AI. Puoi dire di no, improvvisare, oppure avere un partner che lo costruisce. Noi siamo quel partner: lavoriamo in segnalazione, o dietro il tuo marchio, con un accordo scritto su chi tiene il rapporto con il cliente e su come si divide il compenso.",
    sections: [
      {
        title: "Per chi è",
        bullets: [
          "Agenzie di marketing e comunicazione i cui clienti chiedono CRM, automazioni o strumenti interni.",
          "Web agency che fanno siti ed e-commerce e si fermano dove comincia il gestionale.",
          "Consulenti di direzione, commercialisti e studi che vedono da vicino i processi dei loro clienti.",
          "Rivenditori di software che ricevono richieste fuori dal loro prodotto.",
        ],
      },
      {
        title: "Due modi di lavorare insieme",
        bullets: [
          "In segnalazione: ci presenti il cliente e seguiamo noi il progetto dall'inizio alla fine, e a te va un compenso sul lavoro venduto, concordato prima.",
          "Con il tuo marchio: il cliente resta tuo e parla con te, noi costruiamo dietro le quinte e partecipiamo alle riunioni quando serve, e tu rivendi il lavoro al tuo prezzo.",
        ],
        body: [
          "In tutti e due i casi il rapporto con il cliente è scritto nell'accordo, prima di incontrarlo: chi lo segue, come ci presentiamo, cosa succede se chiede altro.",
        ],
      },
      {
        title: "Cosa hai in più da offrire",
        bullets: [
          "Gestionali e software su misura, da 5.000 a 80.000 €.",
          "Automazioni e agenti AI, da 3.000 a 40.000 €.",
          "Workspace e portali riservati per i clienti dei tuoi clienti.",
          "Integrazioni con i programmi che l'azienda usa già.",
          "La ricerca di bandi e contributi che coprono parte dell'investimento: spesso è quello che fa dire di sì.",
        ],
      },
      {
        title: "Cosa vedi tu",
        body: [
          "Ogni agenzia partner ha un'area riservata con i progetti dei suoi clienti: a che punto sono, cosa è stato consegnato, cosa viene dopo. Non devi chiederci aggiornamenti, e hai sempre una risposta pronta quando il cliente chiama te.",
        ],
      },
      {
        title: "Come lavoriamo sul progetto",
        body: [
          "Con lo stesso metodo che usiamo sempre: prima il sistema, poi l'AI. Studio dell'azienda, passaggi in ordine con l'AI nei punti giusti, verifica dei bandi, sistema unico costruito a tappe. Un progetto di media complessità richiede 8-10 settimane, e il codice resta del cliente finale.",
          "Se un progetto non ha senso lo diciamo, a te prima che al cliente. Preferiamo perdere un lavoro che farti fare brutta figura.",
        ],
      },
    ],
    steps: {
      title: "Come si comincia",
      items: [
        {
          title: "Ci conosciamo",
          text: "Una chiamata di 45 minuti, o un caffè nella nostra sede di Treviso. Ci racconti che clienti hai e cosa ti chiedono.",
        },
        {
          title: "Scriviamo l'accordo",
          text: "Come ci presentiamo, chi tiene il rapporto, come si divide il compenso, riservatezza reciproca sui clienti.",
        },
        {
          title: "Il primo cliente insieme",
          text: "Partiamo da un caso solo, così vediamo come lavoriamo prima di allargare.",
        },
      ],
    },
    faqs: [
      {
        q: "Quanto guadagna l'agenzia?",
        a: "Dipende dal modo di lavorare: in segnalazione riconosciamo un compenso sul lavoro venduto, concordato per iscritto prima di incontrare il cliente, mentre con il tuo marchio decidi tu il prezzo finale e il margine è tuo.",
      },
      {
        q: "Il cliente resta dell'agenzia?",
        a: "Sì, lo scriviamo nell'accordo: se lavoriamo con il tuo marchio il cliente parla con te, e in ogni caso non gli proponiamo servizi che fai tu.",
      },
      {
        q: "Serve avere competenze tecniche?",
        a: "No, a te basta riconoscere il bisogno: un cliente che lavora su fogli sparsi, che ricopia dati a mano o che chiede «qualcosa con l'AI». La parte tecnica, dalla mappatura alla consegna, la facciamo noi.",
      },
      {
        q: "Lavorate solo con agenzie del Veneto?",
        a: "No, con agenzie e consulenti di tutta Italia. Con chi è vicino a Treviso ci vediamo volentieri di persona.",
      },
      {
        q: "Cosa succede se il progetto va male?",
        a: "Il progetto parte da un prototipo provato sui casi veri del cliente: se non regge ci si ferma lì, con una spesa piccola. È il modo in cui proteggiamo il tuo rapporto con lui.",
      },
    ],
    related: [
      "/metodo",
      "/gestionale-su-misura",
      "/agenti-ai-per-aziende",
      "/automazione-processi-aziendali",
    ],
  },
  {
    path: "/metodo",
    kind: "method",
    kicker: "Il metodo Galilei",
    title: "Prima il sistema, poi l'AI",
    metaTitle: "Il metodo Galilei: prima il sistema, poi l'AI",
    description:
      "Perché la maggior parte dei progetti di AI in azienda non rende, cosa dicono gli studi di MIT, RAND e Istat, e il metodo che usiamo: prima il sistema, poi l'AI.",
    answer:
      "L'intelligenza artificiale rende quando lavora sopra un sistema ordinato: dati in un posto solo, processi chiari, qualcuno che misura, e senza tutto questo resta una demo. Per questo il nostro metodo ha un ordine fisso: prima costruiamo il sistema, poi aggiungiamo l'AI dove i numeri dicono che serve. Gli studi pubblicati negli ultimi due anni raccontano cosa succede a chi fa il contrario.",
    stats: [
      {
        value: "95%",
        label:
          "delle aziende analizzate non ottiene un ritorno misurabile dai progetti di AI generativa",
        source: "MIT NANDA, 2025",
      },
      {
        value: "80%",
        label:
          "e oltre dei progetti di AI fallisce, secondo le stime: il doppio dei progetti informatici senza AI",
        source: "RAND, 2024",
      },
      {
        value: "42%",
        label:
          "delle aziende ha abbandonato la maggior parte delle iniziative di AI, contro il 17% di un anno prima",
        source: "S&P Global, 2025",
      },
      {
        value: "16,4%",
        label: "delle imprese italiane con almeno 10 addetti usa l'AI, tra le PMI il 15,7%",
        source: "Istat, 2025",
      },
    ],
    sections: [
      {
        title: "Perché tanti progetti di AI si fermano",
        body: [
          "RAND ha intervistato chi i progetti di AI li costruisce, e ha messo in fila le cause dei fallimenti. La prima non è tecnica: chi commissiona il progetto non ha chiaro, o non spiega, quale problema va risolto. Seguono la mancanza di dati adatti, l'attenzione alla tecnologia del momento invece che al problema di chi la userà, l'assenza di un'infrastruttura per gestire i dati, e l'AI applicata a problemi che non sa ancora risolvere.",
          "Lo studio del MIT aggiunge un dettaglio che fa pensare: più di metà dei budget di AI generativa finisce in strumenti per vendite e marketing, mentre i ritorni più alti arrivano dall'automazione del lavoro d'ufficio, quello che non si vede.",
          "Quattro cause su cinque, quindi, stanno prima dell'AI: nel problema scelto, nei dati, nel sistema che c'è sotto.",
        ],
      },
      {
        title: "Cosa succede quando si parte dallo strumento",
        bullets: [
          "Si compra o si fa costruire «un'AI» senza aver deciso quale lavoro deve togliere.",
          "La demo funziona, perché gira su esempi scelti. Poi incontra i dati veri, sparsi tra fogli, email e programmi che non si parlano.",
          "Nessuno conta quante volte sbaglia, quindi nessuno sa se fidarsi.",
          "Il progetto resta un esperimento a lato del lavoro, finché qualcuno smette di usarlo.",
        ],
        body: [
          "È il percorso che i numeri qui sopra descrivono. Non dipende dalla qualità dei modelli, che oggi è alta: dipende dall'ordine in cui si fanno le cose.",
        ],
      },
      {
        title: "Il metodo, in cinque regole",
        bullets: [
          "Prima il sistema: i dati in un posto solo e un processo chiaro vengono prima di qualsiasi modello, e spesso metà del guadagno arriva già qui, senza AI.",
          "Un compito solo: si parte dal lavoro ripetitivo che costa più ore, non da un progetto che vuole cambiare tutto.",
          "Si misura prima di promettere: il prototipo si prova sui casi veri dell'azienda, si contano gli errori e se i numeri non reggono ci si ferma.",
          "Una persona al controllo: sui passaggi delicati l'AI prepara e una persona decide.",
          "Resta tuo: codice, dati e documentazione sono dell'azienda, non di chi li ha costruiti.",
        ],
        body: [
          "Il nome viene da una frase attribuita a Galileo: «Misura ciò che è misurabile, e rendi misurabile ciò che non lo è». È la terza regola, ed è quella che regge le altre.",
        ],
      },
      {
        title: "Per una PMI italiana è un vantaggio",
        body: [
          "Secondo l'Istat nel 2025 usa l'AI il 16,4% delle imprese italiane con almeno dieci addetti: il doppio dell'anno prima, ma ancora una su sei. Tra le grandi imprese è il 53,1%, tra le PMI il 15,7%.",
          "Chi comincia adesso può farlo nell'ordine giusto, senza un pilota fallito alle spalle da spiegare in azienda.",
        ],
      },
      {
        title: "Come leggere questi numeri",
        body: [
          "Vanno presi per quello che sono. Lo studio del MIT è preliminare e si basa su interviste, questionari e casi pubblici, non su bilanci. L'80% citato da RAND è una stima raccolta da altre fonti. Il dato di S&P Global riguarda aziende di Nord America ed Europa. Dicono tutti la stessa cosa da angoli diversi, ed è per questo che li riportiamo: non per dire che l'AI non funziona, ma per dire quando funziona.",
        ],
      },
    ],
    faqs: [
      {
        q: "Cosa vuol dire «prima il sistema, poi l'AI»?",
        a: "Vuol dire che prima si mettono in ordine dati e processi in un software che l'azienda usa ogni giorno, e solo dopo si aggiunge l'intelligenza artificiale, sui compiti dove i numeri mostrano che fa risparmiare tempo. Un modello di AI lavora bene solo su dati affidabili.",
      },
      {
        q: "Perché tanti progetti di AI in azienda falliscono?",
        a: "Secondo RAND le cause principali sono cinque: il problema da risolvere non è chiaro, mancano dati adatti, si insegue la tecnologia invece del bisogno, manca l'infrastruttura per gestire i dati, oppure il problema è troppo difficile per l'AI di oggi. Quattro su cinque non riguardano il modello.",
      },
      {
        q: "Devo avere già un gestionale per usare l'AI?",
        a: "No, ma serve un posto dove i dati stanno in ordine. Può essere il gestionale che hai, se permette di leggere e scrivere dati, oppure un sistema su misura costruito per questo. Lo si capisce nella mappatura iniziale.",
      },
      {
        q: "Quindi l'AI non conviene?",
        a: "Conviene, se la si mette nell'ordine giusto: lo studio del MIT trova i ritorni più alti proprio nell'automazione del lavoro d'ufficio, mentre non conviene comprarla come uno strumento da aggiungere a un'azienda che lavora ancora su fogli sparsi.",
      },
      {
        q: "Da dove si parte in pratica?",
        a: "Da una chiamata in cui guardiamo come lavori oggi. Da lì scegliamo insieme un compito solo, costruiamo un prototipo, lo misuriamo sui tuoi casi veri e decidiamo se andare avanti.",
      },
    ],
    sources: [
      {
        label:
          "MIT NANDA, «The GenAI Divide: State of AI in Business 2025», riportato da Fortune (agosto 2025)",
        url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
      },
      {
        label:
          "RAND, «The Root Causes of Failure for Artificial Intelligence Projects and How They Can Succeed» (agosto 2024)",
        url: "https://www.rand.org/pubs/research_reports/RRA2680-1.html",
      },
      {
        label:
          "S&P Global Market Intelligence, «Generative AI shows rapid growth but yields mixed results» (ottobre 2025)",
        url: "https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/10/generative-ai-shows-rapid-growth-but-yields-mixed-results",
      },
      {
        label: "Istat, «Imprese e Ict, anno 2025» (15 dicembre 2025)",
        url: "https://www.istat.it/comunicato-stampa/imprese-e-ict-anno-2025/",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/gestionale-su-misura",
      "/automazione-processi-aziendali",
      "/guide/quanto-costa-un-agente-ai",
    ],
  },
];

/** The other industries shown at the bottom of an industry page: the next three in the list. */
const neighbours = (i: number) =>
  [1, 2, 3].map((d) => `/settori/${sectors[(i + d) % sectors.length].slug}`);

const sectorTitle = (s: Sector) => {
  const full = `Software su misura ${s.per}`;
  return full.length <= 58 ? full : `Software ${s.per}`;
};

const sectorLanding = (s: Sector, i: number): Landing => {
  const done = s.done !== false;
  return {
    path: `/settori/${s.slug}`,
    facts: FACTS_SOFTWARE,
    kind: "sector",
    kicker: s.name,
    title: `${s.product} ${s.per}`,
    ...(SECTOR_SHOTS.has(s.slug)
      ? {
          image: {
            src: `/images/settori/${s.slug}.webp`,
            alt: `Esempio di interfaccia: ${s.product.toLowerCase()} ${s.per}`,
          },
        }
      : {}),
    // the search result title: under 60 characters, the keyword first
    metaTitle: sectorTitle(s),
    description: s.description,
    answer: s.answer,
    sections: [
      {
        id: "problema",
        step: "Il problema",
        title: `I problemi che si ripetono ${s.nel}`,
        bullets: s.problems,
      },
      {
        id: "cosa-costruiamo",
        step: "Cosa costruiamo",
        title: done ? `Cosa abbiamo sviluppato ${s.per}` : `Cosa sviluppiamo ${s.per}`,
        intro: s.built,
        bullets: s.modules,
      },
      {
        id: "ai",
        step: "Dove entra l'AI",
        title: `Dove serve l'intelligenza artificiale ${s.nel}`,
        bullets: s.ai,
        body: [
          "Prima viene il sistema, poi l'AI: senza dati ordinati sotto, un modello non ha niente di affidabile su cui lavorare.",
        ],
      },
    ],
    guide: {
      midCta: {
        title: "Vuoi vedere quanto tempo potreste riprendervi?",
        text: `In 45 minuti guardiamo insieme come lavorate oggi, dove l'AI vi farebbe risparmiare più ore e se il progetto può rientrare in un bando. Ti diciamo anche quanto costerebbe e in quanto tempo. Senza impegno, e se non siamo le persone giuste te lo diciamo.`,
      },
    },
    objections: {
      title: "I dubbi prima di decidere",
      items: [...(SECTOR_DOUBTS[s.slug] ?? []), ...(SECTOR_OBJECTIONS[s.slug] ?? [])],
    },
    steps: { title: "Come si parte", intro: STEPS_SOFTWARE_INTRO, items: STEPS_SOFTWARE },
    prices: {
      title: "Quanto costa",
      intro:
        "Le fasce dei nostri progetti, IVA esclusa. Il preventivo preciso arriva dopo lo studio dell'azienda.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo persone, reparti e programmi da collegare.",
        },
        { label: "AI e automazioni", value: AI_RANGE, note: "Da sole o dentro il gestionale." },
      ],
      note: "Un progetto di media complessità richiede 8-10 settimane e si paga a tappe. Prima di partire verifichiamo se può rientrare nella finanza agevolata.",
    },
    faqs: [
      ...s.faqs,
      ...COMMON_DOUBTS,
      {
        q: `Quanto costa un software su misura ${s.per}?`,
        a: `I nostri progetti di software su misura vanno ${SOFTWARE_RANGE}, IVA esclusa, secondo quante persone e quanti reparti coinvolgono e quanti programmi vanno collegati. I progetti di AI e automazione vanno ${AI_RANGE}.`,
      },
    ],
    related: [...neighbours(i), "/gestionale-su-misura"],
  };
};

export const sectorLandings = sectors.map(sectorLanding);

/** The pages added by the other data files: comparisons, all the answers, grants. */
export const extraLandings: Landing[] = [answers, grants, ...compares];

const all = [...landings, ...extraLandings, ...sectorLandings];

export const landingByPath = (path: string) => all.find((l) => l.path === path)!;
