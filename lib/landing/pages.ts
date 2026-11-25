/*
 * The "answer pages": one page per question a buyer asks a search engine or an AI assistant
 * (what is it, how much, how long, who does it near me). Italian only for now: under /en they
 * show the same text and point their canonical address at the Italian one.
 *
 * Rules for the texts: only facts we can stand behind (our own price ranges, our own method,
 * cases already public on the site), the number before the adjective, the limit said first.
 */

export type LandingFaq = { q: string; a: string };
export type LandingSection = { title: string; body?: string[]; bullets?: string[] };
export type LandingStep = { title: string; text: string };
export type LandingPrice = { label: string; value: string; note: string };

export type Landing = {
  path: string;
  kind: "service" | "guide" | "local";
  kicker: string;
  title: string;
  metaTitle: string;
  description: string;
  /** The direct answer, first thing on the page: what an AI assistant would quote. */
  answer: string;
  sections: LandingSection[];
  steps?: { title: string; items: LandingStep[] };
  prices?: { title: string; intro: string; rows: LandingPrice[]; note: string };
  caseStudy?: boolean;
  faqs: LandingFaq[];
  related: string[];
};

/** Shown on every page and in the structured data: bump it when the texts or prices change. */
export const LANDING_UPDATED = "2026-11-25";
export const LANDING_AUTHOR = { name: "Dramane Yigo", role: "co-founder di Studio Galilei" };

const SOFTWARE_RANGE = "da 5.000 a 80.000 €";
const AI_RANGE = "da 3.000 a 40.000 €";

const STEPS_SOFTWARE: LandingStep[] = [
  {
    title: "Mappiamo i processi",
    text: "Guardiamo come lavori oggi: chi fa cosa, con quali fogli, email e programmi. Cerchiamo dove si perde tempo prima di disegnare qualsiasi schermata.",
  },
  {
    title: "Prototipo",
    text: "Costruiamo una prima versione navigabile del modulo più importante. La provi con dati veri e ci dici cosa non torna, quando correggere costa poco.",
  },
  {
    title: "Primo modulo in uso",
    text: "Rilasciamo la parte che ti serve di più e la usi nel lavoro di tutti i giorni. Niente cambio totale in un giorno solo.",
  },
  {
    title: "Espansione",
    text: "Aggiungiamo gli altri moduli e le integrazioni uno alla volta, nell'ordine che decidi tu in base a quello che rende di più.",
  },
  {
    title: "Assistenza",
    text: "Dopo il rilascio restiamo noi a seguire il software: correzioni, piccole modifiche, aggiornamenti. Chi ti risponde è chi l'ha costruito.",
  },
];

const STEPS_AI: LandingStep[] = [
  {
    title: "Scegliamo un compito solo",
    text: "Partiamo dal lavoro ripetitivo che ti costa più ore, non dallo strumento. Se l'AI lì non serve, te lo diciamo.",
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
    text: "Quando il primo compito funziona, aggiungiamo il successivo. Un pezzo alla volta.",
  },
];

export const landings: Landing[] = [
  {
    path: "/gestionale-su-misura",
    kind: "service",
    kicker: "Sviluppo software",
    title: "Gestionale su misura per la tua azienda",
    metaTitle: "Gestionale su misura: sviluppo, costi e tempi",
    description:
      "Sviluppiamo gestionali su misura per le PMI: costruiti sui tuoi processi, rilasciati un modulo alla volta, con l'AI dove serve. Progetti da 5.000 a 80.000 €, codice di tua proprietà.",
    answer: `Un gestionale su misura è un software costruito sui processi della tua azienda, invece di adattare l'azienda a un programma già fatto. Lo sviluppiamo a moduli: prima la parte che oggi ti fa perdere più tempo, poi il resto. I nostri progetti vanno ${SOFTWARE_RANGE}, secondo quanti moduli e quante integrazioni servono. Il codice resta tuo.`,
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
          "Quando non conviene: se un programma già pronto copre quasi tutto quello che fai, costa meno e si parte prima. In quel caso te lo diciamo, anche se il lavoro lo perderemmo noi.",
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
          "Tuo. Codice, documentazione, account e dati restano a tua disposizione. Se un giorno vuoi farlo seguire da qualcun altro, puoi.",
        ],
      },
    ],
    steps: { title: "Come lavoriamo", items: STEPS_SOFTWARE },
    prices: {
      title: "Quanto costa",
      intro:
        "Le cifre qui sotto sono le fasce dei nostri progetti, IVA esclusa. Il preventivo preciso arriva dopo la mappatura dei processi, quando sappiamo cosa serve davvero.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo il numero di moduli, di integrazioni e di ruoli.",
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
        a: `I nostri progetti vanno ${SOFTWARE_RANGE}, IVA esclusa. Il prezzo dipende da quanti moduli servono, da quante integrazioni con altri programmi e da quante persone con ruoli diversi lo useranno. Si può partire da un modulo solo e ampliare dopo.`,
      },
      {
        q: "Quanto tempo serve per svilupparlo?",
        a: "Un progetto di media complessità richiede 8-10 settimane. Lavoriamo a rilasci: il primo modulo entra in uso prima della fine del progetto, gli altri seguono.",
      },
      {
        q: "Il codice resta mio?",
        a: "Sì. Il software che costruiamo è tuo: codice, documentazione, account e dati restano a tua disposizione.",
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
        a: "No. Siamo a Treviso e incontriamo volentieri di persona le aziende del Veneto, ma lavoriamo in tutta Italia e all'estero: due nostri software sono in uso in Texas e in Italia.",
      },
    ],
    related: [
      "/guide/quanto-costa-un-gestionale-su-misura",
      "/agenti-ai-per-aziende",
      "/automazione-processi-aziendali",
      "/software-house-treviso",
    ],
  },
  {
    path: "/agenti-ai-per-aziende",
    kind: "service",
    kicker: "Intelligenza artificiale",
    title: "Agenti AI per aziende: cosa fanno e come li costruiamo",
    metaTitle: "Agenti AI per aziende e PMI: sviluppo su misura",
    description:
      "Costruiamo agenti AI su misura per le PMI, collegati ai programmi che usi già: leggono richieste e documenti, preparano risposte e azioni, con una persona al controllo. Da 3.000 a 40.000 €.",
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
          "Un agente sbaglia. Per questo lo misuriamo su casi veri prima di accenderlo, e lo teniamo sotto controllo dopo.",
          "Non decide da solo sui passaggi delicati: prezzi, contratti, reclami e pagamenti restano a una persona che approva.",
          "Non sostituisce un processo che non esiste. Se oggi il lavoro è disordinato, prima si mette ordine con un sistema, poi si aggiunge l'AI.",
        ],
      },
      {
        title: "Agente AI e chatbot: la differenza",
        body: [
          "Un chatbot risponde a domande. Un agente fa un lavoro: entra nei tuoi sistemi, legge e scrive dati, e porta il compito fino in fondo. Un chatbot ti dice gli orari, un agente sposta la prenotazione.",
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
        a: "Sì, quando il gestionale permette di leggere e scrivere dati dall'esterno. Lo verifichiamo all'inizio. Se non lo permette, si lavora su esportazioni, email e documenti, oppure si valuta un gestionale su misura.",
      },
      {
        q: "Cosa chiede il regolamento europeo sull'AI?",
        a: "Tra le altre cose chiede trasparenza: chi parla con un sistema di AI deve saperlo. Lo prevediamo dall'inizio, insieme al controllo umano sui passaggi delicati e al rispetto del GDPR per i dati personali.",
      },
      {
        q: "E se l'agente sbaglia?",
        a: "Succede, e va messo in conto. Per questo misuriamo gli errori su casi veri prima di accenderlo, all'inizio facciamo approvare tutto a una persona e teniamo traccia di ogni azione, così un errore si vede e si corregge.",
      },
      {
        q: "Da dove si comincia?",
        a: "Da un compito solo, quello ripetitivo che ti costa più ore. Costruiamo un prototipo, lo proviamo sui tuoi casi veri e misuriamo. Se i numeri non reggono, ci fermiamo lì.",
      },
    ],
    related: [
      "/guide/quanto-costa-un-agente-ai",
      "/automazione-processi-aziendali",
      "/gestionale-su-misura",
      "/software-house-treviso",
    ],
  },
  {
    path: "/automazione-processi-aziendali",
    kind: "service",
    kicker: "Intelligenza artificiale",
    title: "Automazione dei processi aziendali con l'AI",
    metaTitle: "Automazione dei processi aziendali con l'AI per PMI",
    description:
      "Automatizziamo il lavoro ripetitivo delle PMI: dati ricopiati a mano, solleciti, report, passaggi tra programmi. Con l'AI dove serve e una persona al controllo. Da 3.000 a 40.000 €.",
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
          "Un agente AI serve quando c'è da leggere e interpretare: un'email scritta a mano libera, un documento sempre diverso, una richiesta ambigua. Spesso la soluzione migliore mette insieme le due cose.",
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
      note: "Se l'automazione usa un modello di AI c'è anche il suo consumo, a utilizzo. Lo stimiamo sul prototipo.",
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
        a: "No. Colleghiamo l'automazione agli strumenti che usi già. Cambiarli ha senso solo se sono loro a bloccare il lavoro, e in quel caso te lo diciamo prima.",
      },
      {
        q: "Le persone vengono sostituite?",
        a: "Viene sostituito il lavoro ripetitivo, non chi lo fa. Le persone restano sui passaggi dove serve giudizio e approvano quello che il sistema prepara.",
      },
      {
        q: "Come capisco se ne vale la pena?",
        a: "Contando le ore. Durante la mappatura misuriamo quanto tempo porta via oggi quel lavoro e lo confrontiamo con il costo dell'automazione. Se il conto non torna, non la facciamo.",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/gestionale-su-misura",
      "/guide/quanto-costa-un-agente-ai",
      "/software-house-treviso",
    ],
  },
  {
    path: "/software-house-treviso",
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
          "Non è un obbligo. Seguiamo progetti anche a distanza: due nostri software per tour operator sono in uso ogni giorno in Texas e in Italia.",
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
          note: "Secondo moduli, integrazioni e ruoli.",
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
        a: "A Treviso. La sede legale è a Crocetta del Montello (TV), in Via Francesco Baracca 81. Riceviamo su appuntamento: basta scriverci o prenotare una chiamata dal sito.",
      },
      {
        q: "Lavorate solo con aziende di Treviso?",
        a: "No. Lavoriamo con aziende di tutto il Veneto, del resto d'Italia e dell'estero. Con chi è in zona facciamo volentieri il primo incontro di persona.",
      },
      {
        q: "Che tipo di software sviluppate?",
        a: "Gestionali e software su misura, agenti AI e automazioni dei processi, più le integrazioni con i programmi che l'azienda usa già.",
      },
      {
        q: "Quanto costa un progetto?",
        a: `I gestionali e i software su misura vanno ${SOFTWARE_RANGE}, i progetti di AI e automazione ${AI_RANGE}, IVA esclusa. Si può partire da un modulo solo.`,
      },
      {
        q: "Posso passare in sede?",
        a: "Sì, su appuntamento. Scrivici o prenota una chiamata conoscitiva dal sito e fissiamo un orario.",
      },
    ],
    related: [
      "/gestionale-su-misura",
      "/agenti-ai-per-aziende",
      "/automazione-processi-aziendali",
      "/guide/quanto-costa-un-gestionale-su-misura",
    ],
  },
  {
    path: "/guide/quanto-costa-un-gestionale-su-misura",
    kind: "guide",
    kicker: "Guida",
    title: "Quanto costa un gestionale su misura",
    metaTitle: "Quanto costa un gestionale su misura: fasce di prezzo 2026",
    description:
      "Un gestionale su misura costa da 5.000 a 80.000 € nei nostri progetti. Cosa fa salire il prezzo, quali costi ci sono dopo il rilascio e come spendere meno partendo da un modulo.",
    answer: `Nei nostri progetti un gestionale su misura costa ${SOFTWARE_RANGE}, IVA esclusa. La differenza la fanno il numero di moduli, le integrazioni con altri programmi e quante persone con ruoli diversi lo usano. Dopo il rilascio ci sono l'hosting e un canone di assistenza. Si può partire da un modulo solo e ampliare dopo.`,
    sections: [
      {
        title: "Cosa fa salire o scendere il prezzo",
        bullets: [
          "I moduli: preventivi, ordini, magazzino, noleggi, consegne, fatture. Ogni modulo in più è lavoro in più.",
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
          "Sono le voci che un preventivo serio deve mostrare prima della firma. Se non le vedi, chiedile.",
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
          "Parti da un modulo solo, quello che oggi ti costa più ore.",
          "Chiedi un prototipo prima dello sviluppo: correggere un'idea su un prototipo costa una frazione di quanto costa dopo.",
          "Tieni i programmi che funzionano e collegali, invece di rifare tutto.",
          "Verifica i bandi: una parte dell'investimento in software può rientrare nella finanza agevolata. Lo controlliamo insieme nella prima chiamata.",
        ],
      },
    ],
    prices: {
      title: "Le nostre fasce",
      intro: "Prezzi IVA esclusa, aggiornati alla data in fondo alla pagina.",
      rows: [
        {
          label: "Gestionali e software su misura",
          value: SOFTWARE_RANGE,
          note: "Secondo moduli, integrazioni e ruoli.",
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
        a: "I nostri progetti partono da 5.000 €, IVA esclusa, per un software con un perimetro piccolo e chiaro: un modulo, poche integrazioni, pochi ruoli.",
      },
      {
        q: "Perché due preventivi per lo stesso gestionale sono così diversi?",
        a: "Di solito perché descrivono cose diverse. Uno conta tutti i moduli, le integrazioni e l'assistenza, l'altro solo la prima versione. Per confrontarli chiedi a tutti e due l'elenco dei moduli, delle integrazioni e dei costi dopo il rilascio.",
      },
      {
        q: "Si paga tutto all'inizio?",
        a: "No. Si lavora a rilasci, e i pagamenti seguono le tappe concordate nel preventivo.",
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
      "/guide/quanto-costa-un-agente-ai",
      "/agenti-ai-per-aziende",
      "/software-house-treviso",
    ],
  },
  {
    path: "/guide/quanto-costa-un-agente-ai",
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
          "La prima è lo sviluppo: capire il compito, costruire l'agente, collegarlo ai tuoi sistemi, provarlo su casi veri. Si paga una volta.",
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
          "Si contano le ore. Se un compito porta via dieci ore a settimana e l'agente ne toglie la maggior parte, il conto si fa in fretta. Se ne porta via una, quasi mai conviene. Questo conto lo facciamo insieme prima del preventivo, e se non torna ci fermiamo.",
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
      intro: "Prezzi IVA esclusa, aggiornati alla data in fondo alla pagina.",
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
        a: "Non è il confronto giusto. L'agente toglie le ore ripetitive, le persone restano sui passaggi dove serve giudizio. Il conto da fare è quante ore di lavoro ripetitivo libera rispetto a quanto costa.",
      },
      {
        q: "Esistono agenti AI già pronti che costano meno?",
        a: "Sì, e per compiti generici vanno bene. Un agente su misura conviene quando deve entrare nei tuoi sistemi, seguire le tue regole e lavorare sui tuoi dati.",
      },
      {
        q: "Cosa succede se dopo il prototipo non funziona?",
        a: "Ci si ferma. Il prototipo serve a questo: scoprire con una spesa piccola se il compito si presta, prima di investire nello sviluppo completo.",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/automazione-processi-aziendali",
      "/guide/quanto-costa-un-gestionale-su-misura",
      "/software-house-treviso",
    ],
  },
];

export const landingByPath = (path: string) => landings.find((l) => l.path === path)!;
