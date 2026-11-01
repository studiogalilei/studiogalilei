// Member Club application ("Galilei Certified Network"): one question per screen.
// Field names become database columns on Supabase: don't rename them.

export type Answers = Record<string, unknown> & { talento?: string };

type Base = { title: string; help?: string; when?: (a: Answers) => boolean };

export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number";
  placeholder: string;
  required: boolean;
};

export type Question = Base &
  (
    | { kind: "intro" | "end"; id: string; body: string[]; next?: string }
    | { kind: "group"; id: string; fields: Field[] }
    | {
        kind: "single";
        name: string;
        options: string[];
        columns?: 2;
        required: true;
        block?: { value: string; title: string; text: string };
      }
    | {
        kind: "multi";
        name: string;
        options: (a: Answers) => string[];
        columns?: 2;
        required: true;
        other?: boolean;
        fixed?: string;
        exclusive?: string[];
      }
    | { kind: "long"; name: string; rows: number; required: boolean }
    | { kind: "sectors"; id: string }
    | { kind: "portfolio"; id: string }
  );

/** [sector group, column name, sub-sectors] */
export const SECTORS: [string, string, string[]][] = [
  [
    "Automotive",
    "settori_automotive",
    [
      "Concessionari multimarca e usato premium",
      "Concessionari monomarca",
      "Officine, carrozzerie e service",
      "Ricambi e accessori",
      "Noleggio (breve e lungo termine)",
      "Moto e powersports",
    ],
  ],
  [
    "Edilizia e costruzioni",
    "settori_edilizia",
    [
      "Imprese di costruzione",
      "Prefabbricati e strutture modulari",
      "Impiantistica (elettrico, idraulico, HVAC)",
      "Serramenti e infissi",
      "Ristrutturazioni e finiture",
      "Materiali e rivendite edili",
    ],
  ],
  [
    "Manifatturiero e industria",
    "settori_manifatturiero",
    [
      "Meccanica e lavorazioni conto terzi",
      "Macchinari e automazione industriale",
      "Arredo e legno",
      "Metalli e carpenteria",
      "Plastica e stampaggio",
      "Tessile e abbigliamento",
      "Packaging",
    ],
  ],
  [
    "Food & beverage",
    "settori_food",
    [
      "Ristorazione e locali",
      "Franchising food",
      "Produzione e trasformazione alimentare",
      "Vitivinicolo e cantine",
      "Distribuzione Ho.Re.Ca.",
    ],
  ],
  [
    "Servizi professionali",
    "settori_servizi_prof",
    [
      "Commercialisti e consulenza fiscale",
      "Consulenza del lavoro e payroll",
      "Studi legali",
      "Assicurazioni e servizi finanziari",
      "Studi tecnici (ingegneria, architettura, geometri)",
      "Recruiting e HR",
    ],
  ],
  [
    "Retail ed e-commerce",
    "settori_retail",
    ["E-commerce puro", "Negozi fisici e catene", "Franchising retail", "GDO e distribuzione"],
  ],
  [
    "Sanità e benessere",
    "settori_sanita",
    [
      "Cliniche e poliambulatori",
      "Studi dentistici",
      "Medicina ed estetica avanzata",
      "Palestre, fitness e centri sportivi",
      "Farmacie e parafarmacie",
      "Veterinari",
    ],
  ],
  [
    "Immobiliare",
    "settori_immobiliare",
    ["Agenzie immobiliari", "Costruttori e sviluppatori", "Property management e affitti brevi"],
  ],
  [
    "Turismo ed esperienze",
    "settori_turismo",
    [
      "Hotel e strutture ricettive",
      "Tour operator e agenzie viaggio",
      "Esperienze, attività e attrazioni",
    ],
  ],
  [
    "Logistica e trasporti",
    "settori_logistica",
    ["Trasporti e spedizioni", "Magazzino e logistica conto terzi", "NCC e mobilità"],
  ],
  [
    "Energia e ambiente",
    "settori_energia",
    ["Fotovoltaico e rinnovabili", "Efficientamento energetico", "Gestione rifiuti e ambiente"],
  ],
  [
    "Formazione",
    "settori_formazione",
    ["Corsi, academy e formazione professionale", "Scuole e istituti privati"],
  ],
];

/** Specialisations: the chosen one opens its own path of questions. */
export const TALENTS = [
  "Google Ads",
  "Meta Ads",
  "Altre piattaforme pubblicitarie",
  "Tracciamento e dati",
  "SEO",
  "Social media",
  "Gestione e-commerce",
  "AI e automazioni",
  "Sviluppo software",
  "Siti web",
  "Branding e identità visiva",
  "Graphic design",
  "Fotografia",
  "Video e produzioni",
];

const SERVICES_BY_TALENT: Record<string, string[]> = {
  "Google Ads": [
    "Campagne Search",
    "Performance Max",
    "Shopping e feed Merchant Center",
    "YouTube e Demand Gen",
    "Display e remarketing",
    "Campagne locali e per chiamate",
    "Audit e ristrutturazione di account esistenti",
    "Ottimizzazione e report continuativi",
  ],
  "Meta Ads": [
    "Lead generation con moduli",
    "E-commerce e catalogo",
    "Campagne Advantage+",
    "Creatività e test A/B",
    "Retargeting e pubblici personalizzati",
    "Campagne locali e messaggi WhatsApp",
    "Ottimizzazione e report continuativi",
  ],
  "Altre piattaforme pubblicitarie": [
    "LinkedIn Ads",
    "TikTok Ads",
    "Amazon Ads",
    "Microsoft Ads",
    "Pinterest Ads",
  ],
  "Tracciamento e dati": [
    "Configurazione GA4 ed eventi",
    "Google Tag Manager",
    "Tracciamento server-side",
    "Conversioni avanzate e API di Meta (CAPI)",
    "Tracciamento e-commerce",
    "Consent mode e cookie banner",
    "Dashboard su Looker Studio",
  ],
  SEO: [
    "SEO tecnica (velocità, indicizzazione, struttura)",
    "SEO on-page",
    "Articoli e contenuti ottimizzati",
    "Local SEO e Google Business Profile",
    "Link building",
    "SEO per e-commerce",
    "Migrazioni di siti senza perdere posizionamento",
  ],
  "Social media": [
    "Piano editoriale",
    "Gestione pagine e community",
    "Copy",
    "Grafiche e caroselli",
    "Reel e video brevi",
    "LinkedIn aziendale e personal branding dei titolari",
    "Report mensile",
  ],
  "Gestione e-commerce": [
    "Caricamento e schede prodotto",
    "Catalogo e varianti",
    "Feed prodotti per Google e Meta",
    "Ottimizzazione delle conversioni",
    "Email marketing e automazioni",
    "Marketplace (Amazon, eBay)",
  ],
  "AI e automazioni": [
    "Automazioni di processo (n8n, Make, Zapier)",
    "Agenti AI",
    "Chatbot e assistenti sui dati aziendali",
    "Voice AI e centralini",
    "Automazione documentale (OCR, estrazione dati)",
    "Integrazioni AI in CRM e gestionali",
    "Sviluppo sulle API dei modelli",
  ],
  "Sviluppo software": [
    "Software interni su misura",
    "Gestionali",
    "Workspace e portali interni",
    "Aree riservate per i clienti delle aziende",
    "Integrazioni e API tra piattaforme",
    "Dashboard e strumenti operativi",
    "App mobile",
    "Manutenzione ed evoluzione di software esistenti",
  ],
  "Siti web": [
    "Landing page",
    "Siti vetrina",
    "E-commerce",
    "Siti multilingua",
    "Restyling di siti esistenti",
    "Siti sviluppati con strumenti AI (Claude, Lovable, v0)",
    "Progettazione UI/UX su Figma",
    "Manutenzione e aggiornamenti",
  ],
  "Branding e identità visiva": [
    "Logo e marchio",
    "Identità visiva completa con manuale",
    "Naming",
    "Rebranding",
    "Immagine coordinata",
    "Packaging",
  ],
  "Graphic design": [
    "Grafiche per social e campagne",
    "Brochure, cataloghi e presentazioni",
    "Materiali per fiere ed eventi",
    "Stampa e grande formato",
    "Infografiche",
    "Illustrazione",
  ],
  Fotografia: [
    "Prodotto e still life",
    "E-commerce su fondo bianco",
    "Ritratti e team",
    "Interni e architettura",
    "Food",
    "Eventi",
    "Reportage aziendale e industriale",
  ],
  "Video e produzioni": [
    "Riprese",
    "Montaggio",
    "Reel e formati verticali",
    "Video corporate e interviste",
    "Spot pubblicitari",
    "Motion graphics e animazione",
    "Riprese con drone",
    "Cinema d'azienda e documentari",
  ],
};

const NO_OTHER = "Nessun'altra";
const ONLY_ITALIAN = "Solo italiano";

export const QUESTIONS: Question[] = [
  {
    kind: "intro",
    id: "intro",
    title: "Entra nel Member Club\ndi Studio Galilei",
    body: [
      "Il Member Club è la rete di professionisti selezionati a cui Studio Galilei affida i progetti dei propri Partner, dal marketing allo sviluppo software, dai siti web all'intelligenza artificiale.",
      "Selezioniamo pochi professionisti per ogni specializzazione, con l'obiettivo di costruire collaborazioni solide e durature.",
      "Ogni collaborazione prevede un contratto quadro, incarichi con brief chiari, scadenze concordate e pagamenti a date prestabilite. Il lavoro si svolge da remoto, in piena autonomia, con il coordinamento dei nostri consulenti.",
      "Prima di candidarti, prepara un portfolio dei tuoi lavori, una partita IVA attiva o in apertura e cinque minuti del tuo tempo. Il portfolio è obbligatorio per completare la candidatura.",
    ],
    next: "Continua",
  },
  {
    kind: "group",
    id: "anagrafica",
    title: "I tuoi dati",
    help: "Ogni candidatura viene valutata personalmente da Studio Galilei",
    fields: [
      {
        name: "nome_cognome",
        label: "Nome e cognome",
        type: "text",
        placeholder: "Mario Rossi",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "mario@studio.it",
        required: true,
      },
      {
        name: "telefono",
        label: "Telefono",
        type: "tel",
        placeholder: "+39 340 1234567",
        required: true,
      },
      { name: "citta", label: "Città", type: "text", placeholder: "Treviso", required: true },
    ],
  },
  {
    kind: "single",
    name: "piva",
    title: "Hai la partita IVA?",
    help: "La collaborazione prevede la fatturazione degli incarichi con partita IVA",
    options: ["Attiva", "In apertura", "No"],
    required: true,
    block: {
      value: "No",
      title: "Serve la partita IVA",
      text: "La partita IVA è un requisito per entrare nel Member Club. Se è in fase di apertura seleziona «In apertura»",
    },
  },
  {
    kind: "single",
    name: "situazione_attuale",
    title: "Qual è la tua situazione professionale attuale?",
    help: "Ci aiuta a inquadrare il tuo profilo",
    options: [
      "Freelance, cerco nuovi progetti",
      "Lavoro in un'azienda o in un team, cerco collaborazioni in più",
      "Cerco una struttura in cui entrare stabilmente",
      "Altro (puoi specificarlo nelle note finali)",
    ],
    required: true,
  },
  {
    kind: "single",
    name: "talento",
    title: "Qual è la tua specializzazione principale?",
    help: "Indica quella su cui vuoi essere valutato, le altre competenze le raccogliamo più avanti",
    options: TALENTS,
    columns: 2,
    required: true,
  },
  // the chosen specialisation's services (one screen per talent, all stored as t_cosa)
  ...TALENTS.map((talent): Question => ({
    kind: "multi",
    name: "t_cosa",
    other: true,
    when: (a) => a.talento === talent,
    title: "Quali di questi servizi offri?",
    help: "Seleziona quelli che gestisci in autonomia",
    options: () => SERVICES_BY_TALENT[talent],
    columns: 2,
    required: true,
  })),
  // open questions, the same for every specialisation (t_* answers end up in `dettaglio`)
  {
    kind: "long",
    name: "t_perche",
    title: "Perché dovremmo sceglierti?",
    help: "Cosa ti distingue dagli altri professionisti della tua specializzazione",
    rows: 5,
    required: true,
  },
  {
    kind: "long",
    name: "t_workflow",
    title: "Qual è il tuo workflow?",
    help: "Come lavori su un progetto, dal brief alla consegna",
    rows: 6,
    required: true,
  },
  {
    kind: "long",
    name: "t_casi_studio",
    title: "Inserisci i link dei tuoi casi studio",
    help: "Un link per riga, con una breve descrizione del risultato ottenuto",
    rows: 5,
    required: true,
  },
  {
    kind: "multi",
    name: "talenti_altri",
    title: "Hai altre competenze?",
    help: "Competenze aggiuntive rispetto alla specializzazione principale",
    options: (a) => [...TALENTS.filter((t) => t !== a.talento), NO_OTHER],
    columns: 2,
    required: true,
    exclusive: [NO_OTHER],
  },
  {
    kind: "multi",
    name: "lingue",
    fixed: "Italiano",
    title: "In quali lingue riesci a lavorare?",
    help: "Non è un requisito, ma alcuni progetti richiedono l'inglese",
    options: () => ["Inglese", "Tedesco", "Francese", "Spagnolo", ONLY_ITALIAN],
    columns: 2,
    required: true,
    exclusive: [ONLY_ITALIAN],
  },
  {
    kind: "sectors",
    id: "settori",
    title: "In quali settori hai già portato risultati?",
    help: "Seleziona i settori in cui hai esperienza documentabile",
  },
  {
    kind: "group",
    id: "capienza",
    title: "Quanti progetti puoi seguire?",
    help: "Studio Galilei lavora per mantenere alto lo standard verso i propri Partner, per questo puoi iniziare con pochi progetti e aumentarli quando sei a regime",
    fields: [
      {
        name: "capienza_attuale",
        label: "Quanti progetti segui adesso?",
        type: "number",
        placeholder: "3",
        required: true,
      },
      {
        name: "capienza_extra",
        label: "Quanti altri ne prenderesti senza abbassare la qualità?",
        type: "number",
        placeholder: "2",
        required: true,
      },
    ],
  },
  {
    kind: "single",
    name: "tipo_collaborazione",
    title: "Che tipo di collaborazione cerchi?",
    help: "Ci serve per capire su quali progetti coinvolgerti",
    options: ["Collaborazione continuativa", "Progetti singoli", "Da valutare"],
    required: true,
  },
  {
    kind: "portfolio",
    id: "portfolio",
    title: "Il tuo portfolio",
    help: "Inserisci un link o carica fino a tre file con i lavori più rappresentativi",
  },
  {
    kind: "long",
    name: "libero",
    title: "Note aggiuntive",
    help: "Qualsiasi informazione utile per valutare la tua candidatura (facoltativo)",
    rows: 6,
    required: false,
  },
  {
    kind: "end",
    id: "fine",
    title: "Candidatura ricevuta",
    body: [
      "La tua candidatura sarà valutata entro 48 ore lavorative.",
      "Riceverai un'e-mail con l'esito e, in caso di ammissione al Member Club, potrai prenotare una chiamata conoscitiva di 45 minuti con il tuo consulente Studio Galilei.",
      "Il numero di Member per ogni specializzazione è limitato e cresce insieme ai progetti dei nostri Partner, così da garantire a ciascuno un flusso di lavoro costante.",
      "Riceverai comunque un riscontro, indipendentemente dall'esito.",
    ],
  },
];

export const visibleQuestions = (a: Answers) => QUESTIONS.filter((q) => !q.when || q.when(a));

/** With "other", the list gets an "Altro" option, always before the exclusive "none of these" ones. */
export function optionsOf(q: Extract<Question, { kind: "single" | "multi" }>, a: Answers) {
  const options = typeof q.options === "function" ? q.options(a) : q.options;
  if (q.kind !== "multi" || !q.other) return options;
  const exclusive = q.exclusive ?? [];
  return [
    ...options.filter((o) => !exclusive.includes(o) && o !== "Altro"),
    "Altro",
    ...options.filter((o) => exclusive.includes(o)),
  ];
}

const list = (a: Answers, key: string) => (Array.isArray(a[key]) ? (a[key] as string[]) : []);

/** Sector groups are not asked: they follow from the chosen sub-sectors. */
export const sectorGroups = (a: Answers) =>
  SECTORS.filter(([, column]) => list(a, column).length).map(([group]) => group);

/** The error to show for the current screen, or null when it can be left. */
export function validate(q: Question, a: Answers): string | null {
  switch (q.kind) {
    case "intro":
    case "end":
      return null;
    case "group":
      for (const f of q.fields) {
        if (f.required && !a[f.name]) return `Manca ${f.label.toLowerCase()}.`;
        if (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(a[f.name] ?? "")))
          return "Controlla l'email.";
      }
      return null;
    case "sectors":
      // not required: the original form never blocked on this screen
      return null;
    case "portfolio":
      return a.portfolio_link || list(a, "_files").length
        ? null
        : "Serve un link o almeno un file: il portfolio è la prima cosa che guardiamo.";
    case "multi": {
      const chosen = list(a, q.name);
      if (!chosen.length) return "Scegline almeno una.";
      if (q.other && chosen.includes("Altro") && !a[q.name + "_altro"])
        return "Specifica cosa intendi con «Altro».";
      return null;
    }
    case "single":
    case "long":
      return !q.required || a[q.name] ? null : "Rispondi per continuare.";
  }
}
