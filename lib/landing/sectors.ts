/*
 * One page per industry we have built custom software for (texts from Dramane, 25/11/2026).
 * Each entry becomes an answer page under /settori/<slug> (see pages.ts).
 *
 * These are industries we have worked in (Dramane, 25/11/2026): the page says "cosa abbiamo
 * sviluppato". For one where that is not yet true, set `done: false` and it says "sviluppiamo".
 * No results without a measured number: "ridotto i tempi" stays out until we can say by how much.
 */

export type Sector = {
  slug: string;
  /** "Manifatturiero meccanico" */
  name: string;
  /** "per il manifatturiero meccanico" */
  per: string;
  /** "nel manifatturiero meccanico" */
  nel: string;
  /** what the software is called in this industry, for the H1: "Software e MES su misura" */
  product: string;
  description: string;
  answer: string;
  problems: string[];
  done?: boolean;
  built: string;
  modules: string[];
  ai: string[];
  faqs: { q: string; a: string }[];
};

/**
 * Industries with an example screen in public/images/settori/<slug>.webp: real HTML, photographed
 * (mockup/gen.py), with invented names and data. Shown as an example, never as a client's software.
 */
export const SECTOR_SHOTS = new Set([
  "manifatturiero-meccanico",
  "moda-abbigliamento",
  "lusso-accessori",
  "packaging-macchine-automatiche",
  "alimentare-beverage",
  "farmaceutico-medicale",
]);

export const sectors: Sector[] = [
  {
    slug: "manifatturiero-meccanico",
    name: "Manifatturiero meccanico",
    per: "per il manifatturiero meccanico",
    nel: "nel manifatturiero meccanico",
    product: "Software e MES su misura",
    description:
      "MES e gestionali su misura per aziende meccaniche: macchine, magazzino e qualità collegati in tempo reale, OEE in una dashboard, lotti tracciati.",
    answer:
      "Un software su misura per un'azienda meccanica collega macchine, magazzino e controllo qualità in un unico sistema, al posto dell'ERP personalizzato a strati e dei fogli Excel tenuti in parallelo. Sviluppiamo MES e gestionali che raccolgono i dati dalle macchine in tempo reale, mostrano l'OEE in una sola dashboard e tracciano ogni lotto.",
    problems: [
      "ERP vecchi, personalizzati negli anni e ormai lenti da far evolvere.",
      "Dati divisi tra produzione, qualità e magazzino, ognuno con il suo file.",
      "Macchine che non parlano con il gestionale: gli avanzamenti si inseriscono a mano a fine turno.",
      "Progetti di AI che restano fermi a una linea sola, perché sotto mancano dati affidabili.",
    ],
    built:
      "MES e gestionali su misura che collegano in tempo reale macchinari, magazzino e controllo qualità. Sostituiscono i fogli Excel paralleli con dashboard OEE unificate e con la tracciabilità completa dei lotti, e lasciano una base dati pronta per l'AI predittiva.",
    modules: [
      "Raccolta dati dalle macchine e avanzamento di produzione in tempo reale.",
      "Dashboard OEE per macchina, linea e turno.",
      "Ordini di produzione, cicli e distinte base.",
      "Controllo qualità e non conformità legati al lotto.",
      "Tracciabilità dei lotti dalla materia prima al pezzo finito.",
      "Integrazione con l'ERP che resta in uso per contabilità e acquisti.",
    ],
    ai: [
      "Manutenzione predittiva, quando ci sono abbastanza dati storici di macchina.",
      "Lettura automatica di ordini, disegni e certificati in arrivo.",
      "Riepilogo di fine turno con le anomalie da guardare.",
    ],
    faqs: [
      {
        q: "Che differenza c'è tra MES ed ERP?",
        a: "L'ERP gestisce l'azienda: ordini, acquisti, contabilità, magazzino. Il MES gestisce il reparto: cosa sta producendo ogni macchina, con quali tempi, scarti e fermi. Lavorano insieme, e spesso il MES su misura si collega all'ERP che c'è già.",
      },
      {
        q: "Si possono collegare anche macchine vecchie?",
        a: "Spesso sì: le macchine recenti espongono i dati con protocolli standard come OPC UA, mentre per quelle più vecchie si usano i segnali del PLC o sensori aggiunti. Lo si verifica macchina per macchina durante la mappatura.",
      },
      {
        q: "Devo sostituire l'ERP?",
        a: "No, di solito si lascia all'ERP quello che fa bene e si costruisce intorno il pezzo che manca, collegato. Sostituirlo ha senso solo se è lui a bloccare il lavoro.",
      },
    ],
  },
  {
    slug: "moda-abbigliamento",
    name: "Moda e abbigliamento",
    per: "per la moda e l'abbigliamento",
    nel: "nella moda",
    product: "Software su misura",
    description:
      "Software su misura per la moda: matrice stile-colore-taglia, collezioni, campionari e conto lavoro in un sistema solo, collegato a e-commerce e magazzini.",
    answer:
      "Un software su misura per la moda gestisce in modo nativo quello che un ERP generico regge solo a forza di personalizzazioni: la matrice stile-colore-taglia, le distinte base che cambiano per taglia, le collezioni stagionali, i pre-pack e il conto lavoro. Costruiamo piattaforme che seguono collezioni, campionari, produzione e distribuzione, collegate a e-commerce, showroom digitali e magazzini.",
    problems: [
      "La matrice stile-colore-taglia, che moltiplica gli articoli e manda in crisi i gestionali pensati per un codice solo.",
      "Distinte base variabili per taglia e collezioni che cambiano ogni stagione.",
      "Pre-pack, conto lavoro e terzisti seguiti su fogli a parte.",
      "ERP generici piegati con personalizzazioni costose, che si rompono a ogni aggiornamento.",
    ],
    built:
      "Piattaforme su misura che gestiscono collezioni, campionari, produzione e distribuzione, integrate con e-commerce, showroom digitali e magazzini, con la visibilità delle scorte per stagione.",
    modules: [
      "Anagrafica a matrice stile-colore-taglia.",
      "Collezioni, campionari e listini per stagione e per canale.",
      "Distinte base per taglia e fabbisogni di materiali.",
      "Conto lavoro e avanzamento presso i terzisti.",
      "Ordini da showroom, agenti ed e-commerce in un unico portafoglio.",
      "Scorte e riassortimenti per stagione, negozio e magazzino.",
    ],
    ai: [
      "Schede prodotto e descrizioni generate dai dati tecnici, in più lingue.",
      "Lettura degli ordini dei clienti in qualsiasi formato arrivino.",
      "Segnalazione dei riassortimenti da fare, sui dati di venduto.",
    ],
    faqs: [
      {
        q: "Perché un ERP generico fatica con la moda?",
        a: "Perché nasce per articoli con un codice solo. Nella moda ogni modello esiste in decine di combinazioni di colore e taglia, con distinte base diverse e una vita di una stagione. Senza una struttura a matrice, ogni operazione diventa un lavoro manuale.",
      },
      {
        q: "Si collega al nostro e-commerce e ai marketplace?",
        a: "Sì: catalogo, disponibilità e ordini passano da un sistema all'altro senza esportazioni manuali, con le piattaforme più diffuse e con i marketplace che mettono a disposizione un collegamento.",
      },
      {
        q: "Gestisce anche lo scambio dati con i grandi retailer?",
        a: "Sì, lo scambio elettronico di ordini, conferme e documenti di spedizione (EDI) si può integrare nel sistema, nei formati richiesti da ciascun retailer.",
      },
    ],
  },
  {
    slug: "lusso-accessori",
    name: "Lusso e accessori",
    per: "per il lusso e gli accessori",
    nel: "nel lusso",
    product: "Software su misura",
    description:
      "Software su misura per il lusso: gestione prodotto, CRM per i clienti più importanti, portali riservati e tracciabilità del singolo pezzo.",
    answer:
      "Un software su misura per il lusso tiene insieme prodotto, cliente e canale: sa dov'è ogni pezzo, chi l'ha comprato e come va servito, tra boutique, wholesale e clienti privati. Realizziamo sistemi che uniscono gestione prodotto, CRM per i clienti più importanti, portali riservati e tracciabilità completa.",
    problems: [
      "Un livello di servizio al cliente che un software standard non prevede.",
      "Tracciabilità richiesta sul singolo pezzo, non sul lotto.",
      "Canali diversi con regole diverse: boutique, wholesale, clienti privati.",
      "Personalizzazioni e ordini speciali gestiti a mano, fuori sistema.",
    ],
    built:
      "Sistemi su misura che uniscono gestione prodotto, CRM per la clientela di fascia alta, portali riservati e tracciabilità completa, lasciando all'azienda il controllo dell'esperienza del cliente.",
    modules: [
      "Scheda del singolo pezzo: materiali, lavorazioni, numero di serie, storia.",
      "CRM con preferenze, acquisti e ricorrenze di ogni cliente.",
      "Portali riservati per clienti privati e rivenditori.",
      "Ordini speciali e personalizzazioni con il loro avanzamento.",
      "Assistenza e riparazioni legate al pezzo.",
    ],
    ai: [
      "Promemoria per chi segue il cliente: ricorrenze, novità in linea con i suoi acquisti.",
      "Riepilogo della storia del cliente prima di un appuntamento.",
      "Risposte in bozza alle richieste, che una persona rivede sempre.",
    ],
    faqs: [
      {
        q: "Si può tracciare ogni singolo pezzo?",
        a: "Sì, ogni pezzo ha la sua scheda con numero di serie, materiali, lavorazioni, passaggi di mano e interventi di assistenza, consultabile da chi ha il permesso.",
      },
      {
        q: "I dati dei clienti chi li vede?",
        a: "Solo chi deve: i permessi sono per ruolo, quindi una boutique vede i suoi clienti, la sede vede tutto e un rivenditore vede solo i suoi ordini, e ogni accesso resta registrato.",
      },
      {
        q: "Si integra con il gestionale e con le casse dei negozi?",
        a: "Sì, quando quei sistemi permettono di scambiare dati. Lo verifichiamo all'inizio, sistema per sistema.",
      },
    ],
  },
  {
    slug: "packaging-macchine-automatiche",
    name: "Packaging e macchine automatiche",
    per: "per i costruttori di macchine automatiche",
    nel: "nel packaging e nelle macchine automatiche",
    product: "Software di supervisione e piattaforme dati",
    description:
      "Software per costruttori di macchine automatiche: supervisione, raccolta dati, monitoraggio remoto e servizi digitali post-vendita.",
    answer:
      "Per un costruttore di macchine automatiche il software è ciò che trasforma la macchina in un servizio: raccoglie i dati dagli impianti installati, li mostra al cliente e apre la strada ad assistenza remota e contratti di servizio. Sviluppiamo software di supervisione e piattaforme dati che si collegano alle macchine e abilitano monitoraggio remoto, analisi delle prestazioni e servizi post-vendita.",
    problems: [
      "Il mercato chiede dati e servizi, non più solo la macchina.",
      "Macchine e controllori diversi, ognuno con il suo modo di esporre i dati.",
      "Dati raccolti ma non trasformati in qualcosa che il cliente finale paga.",
      "Assistenza che parte solo quando il cliente chiama, a fermo già avvenuto.",
    ],
    built:
      "Software di supervisione e piattaforme dati che si collegano alle macchine e abilitano il monitoraggio remoto, l'analisi delle prestazioni e i servizi digitali post-vendita.",
    modules: [
      "Collegamento alle macchine installate e raccolta dati continua.",
      "Portale per il cliente finale con stato, produzione e fermi delle sue macchine.",
      "Allarmi e assistenza remota per il service.",
      "Storico per macchina: ricambi, interventi, aggiornamenti.",
      "Report di prestazione da allegare ai contratti di servizio.",
    ],
    ai: [
      "Segnalazione anticipata di derive e anomalie sui dati di macchina.",
      "Assistente per i tecnici, che cerca in manuali e storico interventi.",
      "Riepiloghi periodici per il cliente, scritti dai dati.",
    ],
    faqs: [
      {
        q: "Cosa vuol dire servitizzazione?",
        a: "Vendere, insieme alla macchina, un servizio continuativo basato sui suoi dati: monitoraggio, manutenzione programmata, garanzia di disponibilità. Richiede un software che raccolga i dati dalle macchine installate e li renda utili al cliente.",
      },
      {
        q: "Funziona con controllori di marche diverse?",
        a: "Sì, si usano i protocolli standard dell'automazione, come OPC UA e MQTT, e dove serve un piccolo dispositivo a bordo macchina che traduce i dati.",
      },
      {
        q: "I dati della macchina di chi sono?",
        a: "Va deciso nel contratto tra costruttore e cliente finale. Il software si costruisce di conseguenza: chi vede cosa, per quanto tempo, e con quali limiti.",
      },
    ],
  },
  {
    slug: "alimentare-beverage",
    name: "Alimentare e beverage",
    per: "per l'alimentare e il beverage",
    nel: "nell'alimentare",
    product: "Gestionale su misura",
    description:
      "Gestionali su misura per l'alimentare: tracciabilità lotto per lotto, produzione a batch, rese, scadenze, allergeni, bilance ed etichettatrici.",
    answer:
      "Un gestionale su misura per l'alimentare ricostruisce in pochi minuti la storia di un lotto, in avanti e indietro: da quali materie prime viene e a quali clienti è arrivato. Costruiamo gestionali verticali con tracciabilità completa, produzione a batch e collegamento a bilance ed etichettatrici, per arrivare pronti ad audit e richiami.",
    problems: [
      "Tracciabilità lotto per lotto in entrambe le direzioni, da ricostruire in fretta quando serve.",
      "Rese variabili, scadenze e allergeni che un gestionale generico non conosce.",
      "Richiami a cui bisogna rispondere in ore, non in giorni.",
      "Fogli Excel e registri di carta tenuti in parallelo al gestionale.",
    ],
    built:
      "Gestionali verticali con tracciabilità completa, gestione della produzione a batch e integrazioni con pesature ed etichettatrici, che rendono più rapida la risposta ad audit e richiami.",
    modules: [
      "Lotti di materie prime, semilavorati e prodotti finiti, legati tra loro.",
      "Ricette, rese previste e rese reali per batch.",
      "Scadenze e rotazione di magazzino.",
      "Allergeni per ricetta e per linea.",
      "Collegamento a bilance, etichettatrici e lettori.",
      "Ricerca di richiamo: dal lotto ai clienti, dal cliente ai lotti.",
    ],
    ai: [
      "Lettura dei documenti dei fornitori e dei certificati in arrivo.",
      "Controllo automatico di etichette e schede prodotto rispetto alla ricetta.",
      "Previsione dei fabbisogni sui dati di vendita.",
    ],
    faqs: [
      {
        q: "Cos'è la tracciabilità bidirezionale?",
        a: "È poter partire da un lotto di prodotto finito e risalire alle materie prime usate, e partire da una materia prima e trovare tutti i prodotti e i clienti che l'hanno ricevuta. In Europa la rintracciabilità degli alimenti è un obbligo di legge.",
      },
      {
        q: "In quanto tempo si ricostruisce un lotto in caso di richiamo?",
        a: "Se ogni movimento è registrato nel sistema, la ricerca è immediata: lotto, materie prime, clienti e quantità escono in un'unica schermata. Il tempo lo fa la qualità dei dati inseriti, ed è per questo che colleghiamo bilance ed etichettatrici.",
      },
      {
        q: "Si collega alle bilance e alle etichettatrici che abbiamo?",
        a: "Nella maggior parte dei casi sì, e lo verifichiamo modello per modello durante la mappatura.",
      },
    ],
  },
  {
    slug: "farmaceutico-medicale",
    name: "Farmaceutico e medicale",
    per: "per il farmaceutico e il medicale",
    nel: "nel farmaceutico",
    product: "Software su misura",
    description:
      "Software su misura per aziende farmaceutiche e medicali: produzione, qualità e distribuzione con batch record, audit trail, tracciabilità e documentazione completa.",
    answer:
      "Nel farmaceutico il software deve dimostrare, oltre che funzionare: chi ha fatto cosa, quando, e con quale autorizzazione. Sviluppiamo sistemi per produzione, qualità e distribuzione con batch record, audit trail e documentazione completa, pensati per i requisiti del settore.",
    problems: [
      "Requisiti non negoziabili: batch record, audit trail, validazione, sicurezza dei dati.",
      "Sistemi standard che non arrivano ai requisiti più stretti.",
      "Personalizzazioni costose e rischiose, da rivalidare a ogni modifica.",
      "Digitalizzare senza mettere a rischio la conformità già raggiunta.",
    ],
    built:
      "Sistemi per la gestione di produzione, qualità e distribuzione progettati sui requisiti normativi del settore, con livelli alti di sicurezza e documentazione completa.",
    modules: [
      "Batch record elettronico.",
      "Audit trail: ogni modifica con autore, data e motivo.",
      "Deviazioni, non conformità e azioni correttive.",
      "Accessi per ruolo e firme elettroniche.",
      "Tracciabilità dei lotti lungo la distribuzione.",
      "Documentazione a supporto della validazione.",
    ],
    ai: [
      "Ricerca nei documenti di qualità e nelle procedure.",
      "Controllo di completezza dei batch record prima della revisione.",
      "L'AI resta fuori dalle decisioni di rilascio, che sono di una persona qualificata.",
    ],
    faqs: [
      {
        q: "Cos'è un audit trail?",
        a: "È il registro, non modificabile, di ogni operazione fatta sui dati: chi l'ha fatta, quando, cosa c'era prima e cosa dopo. Nei sistemi che gestiscono dati regolati è un requisito.",
      },
      {
        q: "Il software viene validato?",
        a: "La validazione è un percorso che fa l'azienda secondo le proprie procedure di qualità. Noi costruiamo il sistema perché sia validabile e forniamo la documentazione che serve: requisiti, specifiche, prove.",
      },
      {
        q: "Dove vengono conservati i dati?",
        a: "Dove decide l'azienda: su server propri o su cloud in Europa. Lo si stabilisce all'inizio insieme a chi segue qualità e sicurezza.",
      },
    ],
  },
  {
    slug: "edilizia-costruzioni",
    name: "Edilizia e costruzioni",
    per: "per l'edilizia e le costruzioni",
    nel: "nell'edilizia",
    product: "Software su misura per cantieri e commesse",
    description:
      "Software su misura per imprese edili: cantieri e commesse, contabilità di cantiere, avanzamento lavori e portale fornitori, in tempo reale.",
    answer:
      "Un software su misura per l'edilizia porta in ufficio quello che succede in cantiere, mentre succede: avanzamenti, costi, documenti, presenze. Realizziamo software per la gestione di cantieri e commesse, contabilità di cantiere, portali fornitori e controllo dell'avanzamento lavori.",
    problems: [
      "Dati divisi tra cantiere e ufficio, che si incontrano solo a fine mese.",
      "Nessuna visibilità in tempo reale su costi e avanzamento.",
      "Processi ancora su carta: rapportini, bolle, verbali.",
      "Progettisti, impresa e subappaltatori che lavorano su versioni diverse dei documenti.",
    ],
    built:
      "Software per la gestione di cantieri e commesse, la contabilità di cantiere, i portali fornitori e il controllo dell'avanzamento lavori, con i documenti di progetto in un unico posto.",
    modules: [
      "Commesse con preventivo, costi reali e margine.",
      "Rapportini di cantiere dal telefono: ore, mezzi, materiali.",
      "Contabilità di cantiere e stati di avanzamento.",
      "Portale per fornitori e subappaltatori: documenti, ordini, scadenze.",
      "Archivio dei documenti di progetto, con le versioni.",
    ],
    ai: [
      "Lettura di bolle, fatture e documenti dei fornitori.",
      "Controllo delle scadenze dei documenti dei subappaltatori.",
      "Riepilogo settimanale per commessa: costi, ritardi, cose da decidere.",
    ],
    faqs: [
      {
        q: "Funziona in cantiere, dal telefono?",
        a: "Sì, la parte di cantiere si usa dal telefono, anche con poca rete: i dati inseriti si allineano appena torna la connessione.",
      },
      {
        q: "Si collega alla contabilità che usiamo già?",
        a: "Sì, quando il programma di contabilità permette di scambiare dati. Così i costi di cantiere arrivano in contabilità senza essere ricopiati.",
      },
      {
        q: "I subappaltatori devono installare qualcosa?",
        a: "No, entrano in un portale dal browser, con le loro credenziali, e vedono solo i cantieri e i documenti che li riguardano.",
      },
    ],
  },
  {
    slug: "logistica-trasporti",
    name: "Logistica e trasporti",
    per: "per la logistica e i trasporti",
    nel: "nella logistica",
    product: "WMS e software su misura",
    description:
      "WMS e software di tracking su misura per logistica e trasporti: inventario affidabile, percorsi di prelievo ottimizzati, integrazione con ERP, e-commerce e corrieri.",
    answer:
      "Un WMS su misura gestisce il magazzino sulle tue regole: ubicazioni, percorsi di prelievo, priorità, collegamento con ERP, e-commerce e corrieri. Sviluppiamo sistemi di gestione magazzino e di tracking delle spedizioni con ottimizzazione dei percorsi e integrazioni profonde con i sistemi intorno.",
    problems: [
      "Volumi alti ed eventi in tempo reale che il sistema vecchio non regge.",
      "Inventario che non coincide con quello reale.",
      "Automazione, operatori e sistemi esterni difficili da coordinare.",
      "Integrazioni fragili con ERP, e-commerce e trasportatori.",
    ],
    built:
      "Sistemi WMS e di tracking delle spedizioni su misura, con ottimizzazione dei percorsi e integrazioni con ERP, e-commerce e sistemi di trasporto.",
    modules: [
      "Ubicazioni, giacenze e inventari a rotazione.",
      "Ricevimento, stoccaggio, prelievo e spedizione con lettori o telefono.",
      "Percorsi di prelievo ottimizzati.",
      "Tracking delle spedizioni e prove di consegna.",
      "Integrazione con ERP, e-commerce e corrieri.",
    ],
    ai: [
      "Lettura di documenti di trasporto e bolle in arrivo.",
      "Risposte automatiche ai clienti sullo stato delle spedizioni.",
      "Previsione dei picchi per organizzare i turni.",
    ],
    faqs: [
      {
        q: "Cos'è un WMS?",
        a: "È il software che gestisce il magazzino: dove si trova ogni articolo, cosa prelevare, in che ordine e per quale spedizione. Lavora collegato al gestionale, che resta il riferimento per ordini e fatture.",
      },
      {
        q: "Quando serve un WMS su misura invece di uno standard?",
        a: "Quando il magazzino ha regole proprie che un prodotto standard non copre: lotti e scadenze, kit, resi, più clienti nello stesso magazzino, automazioni. Se le regole sono quelle comuni, uno standard costa meno.",
      },
      {
        q: "Si collega ai corrieri?",
        a: "Sì: etichette, ritiri e stato delle spedizioni si scambiano con i corrieri che mettono a disposizione un collegamento, senza passare dai loro portali.",
      },
    ],
  },
  {
    slug: "retail-distribuzione",
    name: "Retail e distribuzione",
    per: "per il retail e la distribuzione",
    nel: "nel retail",
    product: "Piattaforme omnicanale su misura",
    description:
      "Piattaforme omnicanale su misura per retail e distribuzione: negozi, e-commerce e magazzino collegati, con scorte, assortimenti e promozioni aggiornati in tempo reale.",
    answer:
      "Una piattaforma omnicanale su misura dà a negozi, e-commerce e magazzino la stessa fotografia delle scorte e degli ordini, nello stesso momento. Costruiamo piattaforme che collegano punti vendita, e-commerce e magazzino, con la gestione di assortimenti, promozioni e inventario in tempo reale.",
    problems: [
      "Negozi, e-commerce e magazzino centrale che lavorano ognuno sui suoi dati.",
      "Scorte viste in ritardo: articoli esauriti in un canale e fermi in un altro.",
      "Promozioni e listini da allineare a mano tra i canali.",
      "Ordini che non si possono spostare da un canale all'altro.",
    ],
    built:
      "Piattaforme omnicanale che collegano punti vendita, e-commerce e magazzino, con gestione di assortimenti, promozioni e inventario in tempo reale.",
    modules: [
      "Scorte uniche per negozi, e-commerce e magazzino.",
      "Ordini da qualsiasi canale, evasi dal punto più conveniente.",
      "Assortimenti e listini per negozio e canale.",
      "Promozioni definite una volta e applicate ovunque.",
      "Trasferimenti e riassortimenti tra punti vendita.",
    ],
    ai: [
      "Proposte di riassortimento per negozio sui dati di venduto.",
      "Schede prodotto generate dai dati, per l'e-commerce.",
      "Assistenza ai clienti su ordini e disponibilità.",
    ],
    faqs: [
      {
        q: "Cosa vuol dire omnicanale?",
        a: "Che il cliente trova lo stesso prodotto, lo stesso prezzo e la stessa disponibilità in negozio e online, e può comprare in un canale e ritirare o rendere in un altro. Dietro serve un sistema unico per scorte e ordini.",
      },
      {
        q: "Si collega alle casse dei negozi?",
        a: "Sì, quando il sistema di cassa permette di scambiare dati. Vendite e resi aggiornano le scorte nel momento in cui avvengono.",
      },
      {
        q: "Devo cambiare la piattaforma e-commerce?",
        a: "No, si collega quella che usi, se permette lo scambio di dati, come fanno le più diffuse.",
      },
    ],
  },
  {
    slug: "e-commerce-marketplace",
    name: "E-commerce e marketplace",
    per: "per e-commerce e marketplace",
    nel: "nell'e-commerce",
    product: "Integrazioni e backend su misura",
    description:
      "Integrazioni su misura per e-commerce e marketplace: catalogo, ordini, magazzino e spedizioni allineati da soli, senza riconciliazioni manuali.",
    answer:
      "Un backend su misura per l'e-commerce fa parlare tra loro catalogo, ordini, magazzino, pagamenti, marketplace e corrieri, senza file esportati e riconciliati a mano. Sviluppiamo backend e integrazioni che automatizzano l'intero flusso dall'ordine alla spedizione e reggono i momenti di picco.",
    problems: [
      "Catalogo, ordini, magazzino, pagamenti e marketplace che non si parlano.",
      "Esportazioni manuali e riconciliazioni fatte di notte.",
      "Disponibilità sbagliate sui marketplace, con ordini da annullare.",
      "Nei picchi il lavoro manuale non tiene il passo.",
    ],
    built:
      "Backend e integrazioni su misura che automatizzano l'intero flusso dall'ordine alla spedizione, anche nei momenti di picco.",
    modules: [
      "Catalogo unico pubblicato su sito e marketplace.",
      "Disponibilità allineate tra tutti i canali.",
      "Ordini raccolti in un solo posto, con il loro stato.",
      "Etichette, ritiri e tracking con i corrieri.",
      "Riconciliazione automatica di incassi e commissioni.",
    ],
    ai: [
      "Schede prodotto e traduzioni generate dai dati.",
      "Risposte alle domande dei clienti su ordini e resi.",
      "Segnalazione degli ordini anomali da controllare.",
    ],
    faqs: [
      {
        q: "Con quali piattaforme e marketplace si integra?",
        a: "Con quelle che mettono a disposizione un collegamento per lo scambio dei dati, cioè le piattaforme e-commerce e i marketplace più diffusi, e lo verifichiamo canale per canale.",
      },
      {
        q: "Serve un software su misura o basta un connettore già pronto?",
        a: "Se i canali sono pochi e il flusso è semplice, un connettore già pronto costa meno e basta. Il su misura conviene quando ci sono regole proprie: più magazzini, kit, listini per canale, un gestionale particolare.",
      },
      {
        q: "Cosa succede nei picchi, come nel Black Friday?",
        a: "Il sistema viene progettato per mettere in coda e smaltire gli ordini senza perderne, e si prova prima con volumi simulati.",
      },
    ],
  },
  {
    slug: "servizi-alle-imprese",
    name: "Servizi alle imprese",
    per: "per le società di servizi",
    nel: "nei servizi alle imprese",
    product: "Gestionale di commesse e portale clienti",
    description:
      "Gestionali di commesse su misura per società di servizi B2B: timesheet, fatturazione ricorrente e portale clienti, sui processi reali dell'azienda.",
    answer:
      "Un gestionale su misura per una società di servizi lega tra loro le ore lavorate, le commesse e le fatture, e mostra al cliente a che punto è il suo lavoro. Creiamo portali clienti, gestionali di commesse e sistemi di fatturazione ricorrente personalizzati.",
    problems: [
      "Fatturazione, timesheet e gestione clienti troppo particolari per un software generico.",
      "Giri manuali continui per far tornare ore, commesse e fatture.",
      "Canoni e contratti ricorrenti seguiti su fogli a parte.",
      "Clienti che chiedono per email lo stato dei lavori.",
    ],
    built:
      "Portali clienti, gestionali di commesse e sistemi di fatturazione ricorrente personalizzati, che automatizzano i processi amministrativi e rendono visibile al cliente lo stato del lavoro.",
    modules: [
      "Commesse con budget, ore e margine.",
      "Timesheet dal telefono o dal computer.",
      "Contratti, canoni e fatturazione ricorrente.",
      "Portale clienti con documenti, stato dei lavori e richieste.",
      "Collegamento alla fatturazione elettronica.",
    ],
    ai: [
      "Riepilogo mensile per cliente, scritto dai dati di commessa.",
      "Smistamento delle richieste in arrivo.",
      "Bozze di offerta a partire da lavori simili già fatti.",
    ],
    faqs: [
      {
        q: "Si collega alla fatturazione elettronica?",
        a: "Sì, le fatture si generano dai dati di commessa e di contratto e passano al sistema di fatturazione elettronica che usi, senza essere riscritte.",
      },
      {
        q: "I clienti possono entrare e vedere i loro dati?",
        a: "Sì, in un portale riservato, dove trovano documenti, stato dei lavori e scadenze, e possono fare richieste.",
      },
      {
        q: "Possiamo partire solo dai timesheet?",
        a: "Sì, si parte dal modulo che oggi costa più ore e si aggiungono gli altri dopo.",
      },
    ],
  },
  {
    slug: "sanita-privata-cliniche",
    name: "Sanità privata e cliniche",
    per: "per cliniche e sanità privata",
    nel: "nella sanità privata",
    product: "Software su misura",
    description:
      "Software su misura per cliniche e poliambulatori privati: pazienti, appuntamenti, cartelle cliniche e fatturazione, con portale pazienti e protezione dei dati sanitari.",
    answer:
      "Un software su misura per una clinica privata tiene in un unico sistema pazienti, appuntamenti, cartelle e fatture, con la protezione che i dati sanitari richiedono. Realizziamo software per la gestione di pazienti, appuntamenti, cartelle cliniche e fatturazione, con portali per i pazienti e integrazioni sicure.",
    problems: [
      "GDPR, Fascicolo Sanitario Elettronico e fatturazione elettronica da rispettare insieme.",
      "Sistemi diversi per agenda, cartelle e amministrazione.",
      "Rischio alto in caso di errore sui dati sanitari.",
      "L'AI che entra anche qui, e va usata con regole chiare.",
    ],
    built:
      "Software per la gestione di pazienti, appuntamenti, cartelle cliniche e fatturazione, con portali pazienti e integrazioni sicure.",
    modules: [
      "Anagrafica pazienti e consensi.",
      "Agenda per medico, ambulatorio e prestazione, con prenotazione online.",
      "Cartella clinica con accessi per ruolo e registro degli accessi.",
      "Fatturazione e incassi.",
      "Portale pazienti: referti, documenti, appuntamenti.",
    ],
    ai: [
      "Promemoria e riprogrammazione degli appuntamenti.",
      "Trascrizione e riordino delle note, che il medico rivede e firma.",
      "Nessuna decisione clinica affidata all'AI.",
    ],
    faqs: [
      {
        q: "Come vengono protetti i dati sanitari?",
        a: "Con accessi per ruolo, cifratura, registro di ogni accesso e conservazione in Europa. I dati sanitari sono una categoria particolare per il GDPR, e il sistema si progetta su questo fin dall'inizio.",
      },
      {
        q: "I pazienti possono prenotare online?",
        a: "Sì, l'agenda online mostra solo gli orari davvero liberi e manda promemoria, riducendo le telefonate in segreteria.",
      },
      {
        q: "L'AI può essere usata con i dati dei pazienti?",
        a: "Solo con regole precise: dati conservati in Europa, nessun uso per addestrare modelli, e una persona qualificata che rivede ogni risultato. Dove queste condizioni non ci sono, non la usiamo.",
      },
    ],
  },
  {
    slug: "turismo-hospitality",
    name: "Turismo e hospitality",
    per: "per hotel e strutture ricettive",
    nel: "nel turismo",
    product: "PMS e software su misura",
    description:
      "PMS su misura per hotel e strutture ricettive: prenotazioni, tariffe e canali di vendita in un sistema solo, senza riconciliazioni a mano.",
    answer:
      "Un PMS su misura fa lavorare insieme prenotazioni, tariffe, canali di vendita e amministrazione, senza fogli di calcolo in mezzo. Sviluppiamo PMS personalizzati e sistemi integrati di revenue e prenotazioni per strutture ricettive, e abbiamo già in uso ogni giorno il software di due tour operator.",
    problems: [
      "Revenue management, channel manager, gestionale e marketing che non si parlano.",
      "Tariffe e disponibilità aggiornate a mano su più sistemi.",
      "Riconciliazioni manuali tra prenotazioni e incassi.",
      "Dati degli ospiti sparsi, difficili da usare.",
    ],
    built:
      "PMS personalizzati e sistemi integrati di revenue e prenotazioni, che tolgono il lavoro manuale di riconciliazione tra sistemi.",
    modules: [
      "Planning delle camere, check-in e check-out.",
      "Tariffe e disponibilità allineate con i canali di vendita.",
      "Prenotazioni dirette dal sito.",
      "Conti, incassi e documenti fiscali.",
      "Scheda ospite con soggiorni e preferenze.",
    ],
    ai: [
      "Risposte alle richieste degli ospiti, in più lingue.",
      "Suggerimenti di tariffa sui dati di occupazione.",
      "Riepilogo giornaliero di arrivi, partenze e richieste particolari.",
    ],
    faqs: [
      {
        q: "Cos'è un PMS?",
        a: "È il gestionale della struttura ricettiva: camere, prenotazioni, arrivi, partenze, conti. Di solito lavora collegato al channel manager, che distribuisce tariffe e disponibilità sui portali.",
      },
      {
        q: "Si collega ai portali di prenotazione?",
        a: "Sì, attraverso un channel manager o con i collegamenti che i portali mettono a disposizione, così disponibilità e tariffe si aggiornano da sole.",
      },
      {
        q: "Lavorate anche con i tour operator?",
        a: "Sì, per due tour operator, in Texas e in Italia, abbiamo costruito un'app che gestisce prenotazioni, partenze, autisti, guide e messaggi ai clienti.",
      },
    ],
  },
  {
    slug: "energia-utilities",
    name: "Energia e utilities",
    per: "per energia e utilities",
    nel: "nell'energia",
    product: "Piattaforme su misura",
    description:
      "Piattaforme su misura per energia e utilities: monitoraggio degli impianti, gestione dei clienti e reportistica per gli adempimenti, con i dati in un unico posto.",
    answer:
      "Una piattaforma su misura per l'energia raccoglie i dati degli impianti e dei clienti in un posto solo, e da lì produce monitoraggio, report e adempimenti. Costruiamo piattaforme di monitoraggio e di gestione clienti su misura, con reportistica normativa e strumenti per l'efficienza energetica.",
    problems: [
      "Dati degli impianti chiusi nei sistemi dei singoli produttori.",
      "Gestione clienti e adempimenti su strumenti separati.",
      "Report normativi costruiti a mano da più fonti.",
      "Guasti e cali di resa scoperti in ritardo.",
    ],
    built:
      "Piattaforme di monitoraggio e gestione clienti su misura, con reporting normativo e strumenti di efficientamento energetico.",
    modules: [
      "Raccolta dati da impianti, contatori e sensori.",
      "Dashboard di produzione, consumi e rendimento.",
      "Allarmi su guasti e cali di resa.",
      "Anagrafica clienti, contratti e interventi.",
      "Report periodici per clienti e adempimenti.",
    ],
    ai: [
      "Rilevazione di anomalie sui dati di produzione e consumo.",
      "Previsioni di produzione e di consumo.",
      "Report per il cliente scritti dai dati.",
    ],
    faqs: [
      {
        q: "Si possono raccogliere dati da impianti di marche diverse?",
        a: "Sì, si usano i collegamenti messi a disposizione dai produttori e i protocolli standard, e i dati finiscono in un'unica piattaforma.",
      },
      {
        q: "I clienti finali possono vedere i loro dati?",
        a: "Sì, in un portale riservato, con produzione, consumi, risparmi e documenti.",
      },
      {
        q: "Si può partire da un solo tipo di impianto?",
        a: "Sì, si parte da quello più diffuso tra i tuoi clienti e si aggiungono gli altri in seguito.",
      },
    ],
  },
  {
    slug: "agricoltura-agroindustria",
    name: "Agricoltura e agroindustria",
    per: "per l'agricoltura e l'agroindustria",
    nel: "nell'agroindustria",
    product: "Software su misura",
    description:
      "Software su misura per aziende agricole e agroindustria: gestione dei campi, tracciabilità dal campo al consumatore, sensori e logistica collegati ai canali di vendita.",
    answer:
      "Un software su misura per l'agroindustria segue il prodotto dal campo al cliente: appezzamenti, lavorazioni, raccolta, lotti, spedizioni. Realizziamo sistemi di gestione dei campi, tracciabilità e logistica, integrati con sensori e canali di vendita.",
    problems: [
      "Tracciabilità richiesta dal campo fino al consumatore.",
      "Dati di sensori e macchine che restano nelle loro app.",
      "Registri delle lavorazioni tenuti su carta.",
      "Logistica del fresco, dove ogni ora conta.",
    ],
    built:
      "Sistemi di gestione dei campi, tracciabilità e logistica, con integrazioni verso sensori e canali di vendita.",
    modules: [
      "Appezzamenti, colture e lavorazioni.",
      "Registro dei trattamenti.",
      "Raccolta, conferimenti e lotti.",
      "Dati di sensori e stazioni meteo.",
      "Ordini, spedizioni e canali di vendita.",
    ],
    ai: [
      "Lettura dei dati dei sensori con segnalazione delle anomalie.",
      "Inserimento delle lavorazioni dettate a voce dal campo.",
      "Previsione dei volumi di raccolta.",
    ],
    faqs: [
      {
        q: "Funziona anche dove in campo non c'è rete?",
        a: "Sì, l'app registra i dati sul telefono e li allinea quando torna la connessione.",
      },
      {
        q: "Si collega ai sensori e alle macchine che abbiamo?",
        a: "Sì, quando il produttore mette a disposizione i dati, e lo verifichiamo dispositivo per dispositivo.",
      },
      {
        q: "Tiene anche il registro dei trattamenti?",
        a: "Sì, ogni trattamento viene registrato per appezzamento e coltura, e resta legato al lotto raccolto.",
      },
    ],
  },
  {
    slug: "automotive-componentistica",
    name: "Automotive e componentistica",
    per: "per l'automotive e la componentistica",
    nel: "nell'automotive",
    product: "Software di produzione e supply chain",
    description:
      "Software su misura per fornitori automotive: produzione just-in-time, qualità e supply chain con tracciabilità del pezzo e scambio dati con i costruttori.",
    answer:
      "Un software su misura per un fornitore automotive tiene allineata la produzione alle chiamate del cliente e traccia ogni pezzo. Sviluppiamo sistemi di gestione della produzione e della supply chain con tracciabilità completa e integrazioni verso i sistemi dei clienti costruttori.",
    problems: [
      "Consegne just-in-time, senza margine di errore.",
      "Tracciabilità del pezzo chiesta dal cliente.",
      "Programmi di consegna che cambiano di continuo.",
      "Requisiti di qualità e documentazione da soddisfare a ogni lotto.",
    ],
    built:
      "Sistemi di gestione della produzione e della supply chain con tracciabilità completa e integrazioni verso i sistemi dei clienti OEM.",
    modules: [
      "Programmi di consegna del cliente ricevuti in automatico.",
      "Pianificazione della produzione sulle chiamate.",
      "Tracciabilità di pezzi, lotti e materiali.",
      "Controlli qualità e documenti di fornitura.",
      "Etichette e documenti di spedizione nei formati del cliente.",
    ],
    ai: [
      "Segnalazione dei rischi di ritardo sui programmi di consegna.",
      "Lettura dei documenti e delle specifiche del cliente.",
      "Analisi delle non conformità ricorrenti.",
    ],
    faqs: [
      {
        q: "Si collega ai portali e ai sistemi dei costruttori?",
        a: "Sì, attraverso lo scambio elettronico dei dati (EDI) nei formati che ciascun costruttore richiede.",
      },
      {
        q: "A che livello arriva la tracciabilità?",
        a: "A quello che chiede il cliente: lotto di materiale, lotto di produzione o singolo pezzo con il suo codice.",
      },
      {
        q: "Lavora con l'ERP che abbiamo?",
        a: "Sì, di solito l'ERP resta per amministrazione e acquisti, e il sistema su misura copre produzione, tracciabilità e scambio dati con il cliente.",
      },
    ],
  },
  {
    slug: "chimica-materiali",
    name: "Chimica e materiali",
    per: "per la chimica e i materiali",
    nel: "nella chimica",
    product: "Gestionale su misura",
    description:
      "Gestionali su misura per aziende chimiche e di materiali: ricette e formule, lotti, sicurezza e tracciabilità, con attenzione alle normative ambientali.",
    answer:
      "Un gestionale su misura per la chimica gira intorno alla ricetta e al lotto: cosa c'è dentro, in che quantità, da quale materia prima, con quali rischi. Creiamo gestionali con gestione di ricette, lotti e sicurezza, centrati su tracciabilità e normative ambientali.",
    problems: [
      "Ricette e formule con versioni, da proteggere.",
      "Lotti da tracciare dalle materie prime al prodotto finito.",
      "Documenti di sicurezza da tenere allineati ai prodotti.",
      "Processi specifici che i sistemi standard gestiscono male.",
    ],
    built:
      "Gestionali con gestione di ricette, lotti e sicurezza, con attenzione a tracciabilità e normative ambientali.",
    modules: [
      "Ricette e formule con versioni e accessi riservati.",
      "Produzione a lotti con rese e correzioni.",
      "Tracciabilità di materie prime e prodotti finiti.",
      "Schede di sicurezza ed etichette legate alla formula.",
      "Registri ambientali e rifiuti.",
    ],
    ai: [
      "Controllo di coerenza tra formula, etichetta e scheda di sicurezza.",
      "Ricerca nello storico di ricette e prove.",
      "Lettura dei certificati dei fornitori.",
    ],
    faqs: [
      {
        q: "Le ricette restano riservate?",
        a: "Sì, l'accesso alle formule è per ruolo: chi produce vede le quantità che gli servono, non necessariamente l'intera formula, e ogni accesso resta registrato.",
      },
      {
        q: "Gestisce le schede di sicurezza?",
        a: "Sì: schede ed etichette sono legate alla formula, così quando la formula cambia si vede subito quali documenti vanno aggiornati.",
      },
      {
        q: "Si collega a bilance e impianti di dosaggio?",
        a: "Nella maggior parte dei casi sì, e lo verifichiamo impianto per impianto.",
      },
    ],
  },
  {
    slug: "media-comunicazione",
    name: "Media e comunicazione",
    per: "per media ed editoria",
    nel: "nei media",
    product: "Piattaforme editoriali su misura",
    description:
      "Piattaforme editoriali su misura per i media: gestione dei contenuti, flussi di redazione, diritti e distribuzione digitale.",
    answer:
      "Una piattaforma editoriale su misura segue il contenuto dall'idea alla pubblicazione, con i passaggi di redazione, i diritti e i canali di distribuzione. Realizziamo piattaforme di gestione dei contenuti e flussi editoriali su misura, pensati per la produzione e la distribuzione digitale.",
    problems: [
      "Flussi di redazione che un CMS generico non rispecchia.",
      "Diritti su testi, foto e video difficili da seguire.",
      "Lo stesso contenuto da pubblicare su più canali e formati.",
      "Archivio poco cercabile, quindi poco riusato.",
    ],
    built:
      "Piattaforme di content management e flussi editoriali su misura, ottimizzate per la produzione e la distribuzione digitale.",
    modules: [
      "Flusso di redazione con stati, revisioni e approvazioni.",
      "Archivio di testi, foto e video con i loro diritti.",
      "Pubblicazione su sito, newsletter, app e social.",
      "Pianificazione editoriale.",
      "Ruoli per redattori, collaboratori esterni e clienti.",
    ],
    ai: [
      "Trascrizioni, riassunti e titoli proposti, che un redattore rivede.",
      "Ricerca in archivio per argomento.",
      "Etichettatura automatica di foto e video.",
    ],
    faqs: [
      {
        q: "Perché non usare un CMS già pronto?",
        a: "Se il flusso è semplice, un CMS già pronto va benissimo. Una piattaforma su misura conviene quando ci sono più redazioni, passaggi di approvazione, diritti da seguire o più canali da alimentare.",
      },
      {
        q: "Come vengono gestiti i diritti?",
        a: "Ogni contenuto porta con sé licenza, scadenza e canali consentiti, e il sistema avvisa prima che un diritto scada o blocca un uso non permesso.",
      },
      {
        q: "L'AI scrive gli articoli?",
        a: "No, fa il lavoro intorno: trascrive, riassume, propone titoli, cerca in archivio. Quello che esce lo decide e lo firma un redattore.",
      },
    ],
  },
  {
    slug: "pubblica-amministrazione",
    name: "Pubblica Amministrazione ed enti locali",
    per: "per la Pubblica Amministrazione e gli enti locali",
    nel: "nella Pubblica Amministrazione",
    product: "Software e portali su misura",
    description:
      "Software gestionali e portali per il cittadino su misura per enti locali: processi interni e servizi online progettati su sicurezza, accessibilità e norme della PA.",
    answer:
      "Un software su misura per un ente locale digitalizza i processi interni e i servizi al cittadino rispettando sicurezza, accessibilità e regole della Pubblica Amministrazione. Sviluppiamo software gestionali e portali per il cittadino su misura, con attenzione a sicurezza, facilità d'uso e conformità.",
    problems: [
      "Processi interni e protocolli ancora in parte su carta.",
      "Servizi al cittadino da portare online in modo semplice.",
      "Requisiti di sicurezza e accessibilità da rispettare.",
      "Sistemi diversi, di fornitori diversi, da far lavorare insieme.",
    ],
    built:
      "Software gestionali e portali per il cittadino su misura, con attenzione a sicurezza, usabilità e conformità.",
    modules: [
      "Pratiche e istanze online, con il loro stato.",
      "Flussi interni di lavorazione e approvazione.",
      "Accesso con le identità digitali pubbliche.",
      "Pagamenti attraverso i sistemi pubblici.",
      "Interfacce progettate secondo le regole di accessibilità.",
    ],
    ai: [
      "Assistente che risponde ai cittadini sulle procedure, dichiarandosi come tale.",
      "Smistamento delle istanze all'ufficio giusto.",
      "Le decisioni sulle pratiche restano ai funzionari.",
    ],
    faqs: [
      {
        q: "I portali rispettano le regole di accessibilità?",
        a: "Sì, si progettano fin dall'inizio secondo le linee guida sull'accessibilità che i siti della Pubblica Amministrazione devono seguire.",
      },
      {
        q: "Si integra con SPID, CIE e pagoPA?",
        a: "Sì, l'accesso con le identità digitali e i pagamenti attraverso la piattaforma pubblica si integrano nel portale.",
      },
      {
        q: "Come lavorate con un ente pubblico?",
        a: "Con le procedure di acquisto che l'ente è tenuto a seguire. Il metodo resta lo stesso: mappatura dei processi, prototipo, rilascio per gradi.",
      },
    ],
  },
  {
    slug: "studi-professionali",
    name: "Studi professionali e società di ingegneria",
    per: "per studi professionali e società di ingegneria",
    nel: "negli studi professionali",
    product: "Software di project management e timesheet",
    description:
      "Software su misura per studi tecnici, di consulenza e società di ingegneria: progetti, timesheet, documenti e portale clienti in un unico sistema.",
    answer:
      "Un software su misura per uno studio professionale mette insieme progetti, ore, documenti e clienti, e dice in ogni momento quanto è costato un incarico e a che punto è. Costruiamo sistemi di project management, timesheet e documentazione con portali clienti e strumenti di collaborazione.",
    problems: [
      "Progetti, ore e documenti seguiti su strumenti diversi.",
      "Timesheet compilati a fine mese, a memoria.",
      "Team distribuiti che lavorano su versioni diverse dei file.",
      "Margine dell'incarico conosciuto solo a lavoro chiuso.",
    ],
    built:
      "Sistemi di project management, timesheet e documentazione con portali clienti e strumenti collaborativi.",
    modules: [
      "Incarichi con fasi, scadenze e responsabili.",
      "Timesheet legati all'incarico e alla fase.",
      "Documenti con versioni e approvazioni.",
      "Costi, avanzamento e margine per incarico.",
      "Portale clienti per documenti e stato dei lavori.",
    ],
    ai: [
      "Ricerca nei documenti e nei progetti passati.",
      "Verbali di riunione dalle registrazioni, da rivedere.",
      "Avviso quando un incarico sta superando il budget di ore.",
    ],
    faqs: [
      {
        q: "In cosa è diverso da un programma di project management già pronto?",
        a: "Segue il tuo modo di lavorare: le fasi dei tuoi incarichi, le tue tariffe, i tuoi documenti. Se un programma già pronto ti copre, costa meno. Il su misura conviene quando devi tenere insieme ore, documenti, fatture e clienti.",
      },
      {
        q: "I clienti vedono i documenti?",
        a: "Solo quelli che decidi di condividere, in un portale riservato, con la versione giusta sempre in evidenza.",
      },
      {
        q: "Si collega alla fatturazione?",
        a: "Sì, le ore e le fasi completate diventano le righe della fattura, senza essere ricopiate.",
      },
    ],
  },
];
