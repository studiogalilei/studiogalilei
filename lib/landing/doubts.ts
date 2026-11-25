/*
 * The doubts a buyer has before booking a call, answered on every industry page.
 *
 * Grounded in docs/ricerca-obiezioni.md: the barriers Italian SMEs report (cost, skills, staff
 * resistance, integration with what they already use, supplier risk, lock-in) worded the way
 * owners say them. The answers only promise what the rest of the site already promises: one
 * module at a time, the existing ERP kept, code and data that stay with the client, support
 * from the people who built it.
 */

import type { LandingFaq } from "./pages";

/** Asked in every industry, after that industry's own doubts. */
export const COMMON_DOUBTS: LandingFaq[] = [
  {
    q: "Il codice e i dati restano nostri?",
    a: "Sì, codice, documentazione, account e dati restano vostri. Se un giorno decidete di cambiare fornitore, il software viene con voi e non dovete ricominciare da capo.",
  },
  {
    q: "E se un giorno non ci siete più?",
    a: "È la domanda giusta da fare a qualsiasi fornitore. Il software è scritto con tecnologie diffuse, è documentato ed è vostro, quindi un altro sviluppatore può prenderlo in mano senza rifarlo.",
  },
  {
    q: "Quanto tempo ci toglie mentre lo costruite?",
    a: "Qualche incontro all'inizio, per raccontarci come lavorate davvero, e poi una prova del prototipo con i vostri dati. Dopo vi chiediamo un parere a ogni modulo rilasciato, non riunioni ogni settimana.",
  },
  {
    q: "Il mio team lo userà davvero?",
    a: "Prima di scrivere codice rimettiamo in ordine i passaggi insieme a chi li fa ogni giorno, e chi lo userà prova il prototipo prima del rilascio, quando correggere costa poco. Si parte dal modulo che toglie più fatica, così il primo motivo per usarlo arriva subito.",
  },
  {
    q: "Ci sono incentivi per pagarlo?",
    a: "In alcuni casi sì: a novembre 2026 ci sono l'iperammortamento per il software legato alla produzione, la Nuova Sabatini per i beni strumentali e i voucher di alcune Camere di commercio. Prima di partire guardiamo noi se il vostro progetto può rientrarci.",
  },
];

/** Three doubts per industry, keyed by the sector slug in sectors.ts. */
export const SECTOR_DOUBTS: Record<string, LandingFaq[]> = {
  "manifatturiero-meccanico": [
    {
      q: "Abbiamo già speso tanto sull'ERP, dobbiamo rifare tutto?",
      a: "No. L'ERP resta per contabilità e acquisti, e il software nuovo gli si affianca dove oggi ci sono i fogli Excel, cioè reparto, qualità e tracciabilità. Di solito si parte dall'avanzamento di produzione.",
    },
    {
      q: "I capireparto non hanno tempo di imparare un altro programma",
      a: "Le schermate di reparto le disegniamo con loro, con pochi tasti grandi e solo i dati che servono in quel turno. Il prototipo lo provano prima del rilascio, quando cambiare costa poco.",
    },
    {
      q: "Non possiamo fermare la produzione per installarlo",
      a: "Non serve fermarla: le macchine si collegano una alla volta e per un periodo il sistema vecchio e quello nuovo lavorano insieme, finché i numeri non coincidono.",
    },
  ],
  "moda-abbigliamento": [
    {
      q: "Ogni stagione cambia tutto, il software ci starà dietro?",
      a: "È costruito sulla matrice stile, colore e taglia e sulle collezioni, quindi una stagione nuova è un insieme di dati nuovi e non una modifica al programma.",
    },
    {
      q: "Cambiando software perdiamo lo storico delle collezioni?",
      a: "No, lo storico si importa dal gestionale di oggi prima del passaggio, e lo controlliamo insieme a campione prima di spegnere il vecchio.",
    },
    {
      q: "I terzisti non useranno mai un portale",
      a: "Il portale per i terzisti fa poche cose, cioè mostrare i loro ordini in conto lavoro e segnare le consegne, anche dal telefono. Chi non vuole entrare può continuare a mandare la bolla, e la carica qualcuno in azienda.",
    },
  ],
  "lusso-accessori": [
    {
      q: "Il nostro servizio è su misura, un software lo rende freddo?",
      a: "Il software tiene la memoria del cliente, con acquisti, misure, preferenze e ordini speciali, così chi lo serve in boutique lo conosce già. Il rapporto resta della persona, che smette solo di cercare informazioni.",
    },
    {
      q: "Se un venditore se ne va, si porta via i clienti?",
      a: "Lo storico dei clienti sta nel sistema e non nel telefono di chi li segue, e chi lascia l'azienda perde l'accesso il giorno stesso.",
    },
    {
      q: "Gli ordini speciali possono entrare nel sistema?",
      a: "Sì, con le loro fasi, chi li segue e la data promessa al cliente. Quando una fase è in ritardo lo vede chi deve muoversi, invece di scoprirlo quando il cliente chiama.",
    },
  ],
  "packaging-macchine-automatiche": [
    {
      q: "I nostri clienti non vogliono dare accesso ai dati delle macchine",
      a: "Si decide cliente per cliente cosa esce dalla macchina e chi lo vede, e lo si scrive nel contratto di servizio. Conviene proporlo insieme a qualcosa che al cliente serve, come il monitoraggio o la manutenzione programmata.",
    },
    {
      q: "Non siamo una software house, chi lo segue dopo?",
      a: "Lo seguiamo noi con il canone di assistenza, e il codice resta vostro, quindi potete portarlo in casa quando avrete un team software.",
    },
    {
      q: "E se il servizio non lo compra nessuno?",
      a: "Si parte con poche macchine installate e un servizio semplice, per vedere se il cliente lo paga prima di estenderlo a tutto il parco macchine.",
    },
  ],
  "alimentare-beverage": [
    {
      q: "Abbiamo già i registri e passiamo i controlli, perché cambiare?",
      a: "I registri servono a passare il controllo. Il problema è il giorno del richiamo, quando bisogna ricostruire i lotti in poche ore, e il software li collega mentre si lavora, così quella ricostruzione diventa una ricerca.",
    },
    {
      q: "In produzione si lavora con i guanti, nessuno scriverà al computer",
      a: "Le registrazioni si fanno con lettori di codici, bilance collegate e tablet con tasti grandi, e dove si può il dato arriva da solo dalla macchina.",
    },
    {
      q: "In alta stagione non possiamo fermarci per cambiare sistema",
      a: "Si parte in bassa stagione, un modulo alla volta, e il passaggio si fa quando la parte nuova è già stata provata con i vostri dati.",
    },
  ],
  "farmaceutico-medicale": [
    {
      q: "Ogni modifica va rivalidata, il su misura ci costerà caro?",
      a: "Lavoriamo a modifiche piccole e documentate, con l'audit trail di ogni cambio, così la rivalidazione riguarda la parte toccata e non tutto il sistema.",
    },
    {
      q: "Chi risponde a un audit sul software?",
      a: "Per un audit servono documentazione e storia delle modifiche, e le consegniamo insieme al software, così restano in mano vostra anche se un giorno cambiate fornitore.",
    },
    {
      q: "L'AI in un ambiente regolato non è troppo rischiosa?",
      a: "La usiamo dove una persona controlla sempre il risultato, per esempio per leggere certificati e documenti in arrivo, e non per decisioni che entrano nei record di produzione.",
    },
  ],
  "edilizia-costruzioni": [
    {
      q: "In cantiere nessuno compila niente",
      a: "Per questo il rapportino dal telefono chiede poche cose, cioè ore, materiali e una foto. Chi lo compila vede subito a cosa serve, perché il materiale che chiede arriva senza telefonate.",
    },
    {
      q: "Ogni commessa è diversa, un software rigido non funziona",
      a: "Voci, fasi e documenti si impostano per commessa, quindi una ristrutturazione e un capannone usano lo stesso software con schede diverse.",
    },
    {
      q: "Abbiamo già il programma per i computi",
      a: "Resta, e il software segue quello che succede dopo il preventivo, cioè cantiere, costi e documenti, e dove serve prende i dati dal programma che usate.",
    },
  ],
  "logistica-trasporti": [
    {
      q: "Se il WMS si ferma, si ferma il magazzino",
      a: "Per questo il passaggio si fa per zone o per clienti, con il sistema vecchio pronto finché il nuovo non regge i volumi veri. E quando serve aiuto risponde chi l'ha costruito.",
    },
    {
      q: "Gli operatori sono abituati ai terminali di oggi",
      a: "Quando è possibile si usano gli stessi lettori e terminali, con schermate pensate per un gesto alla volta.",
    },
    {
      q: "Ogni cliente ci chiede un'integrazione diversa",
      a: "Ogni integrazione è un modulo a sé, quindi un cliente nuovo con il suo formato si aggiunge senza toccare il resto del sistema.",
    },
  ],
  "retail-distribuzione": [
    {
      q: "In negozio non c'è tempo per un altro schermo",
      a: "In negozio si vede solo quello che serve alla vendita, cioè la disponibilità negli altri punti e gli ordini da ritirare, sulla cassa o su un tablet.",
    },
    {
      q: "Le nostre scorte non tornano mai, da dove si parte?",
      a: "Proprio da lì: si allinea un canale alla volta e si confronta con l'inventario fisico finché i numeri coincidono, poi si collega il canale successivo.",
    },
    {
      q: "Se apriamo un negozio nuovo dobbiamo rifare tutto?",
      a: "No, un punto vendita nuovo si aggiunge con i suoi utenti e il suo magazzino, senza modificare il software.",
    },
  ],
  "e-commerce-marketplace": [
    {
      q: "I marketplace cambiano le regole di continuo",
      a: "È il motivo del canone di assistenza. Quando un marketplace cambia qualcosa aggiorniamo noi il collegamento, e ogni integrazione è separata dalle altre, quindi un problema su un canale non ferma gli altri.",
    },
    {
      q: "Siamo in pochi, chi lo segue da noi?",
      a: "Il sistema lavora da solo e porta all'attenzione solo le eccezioni, come un ordine che non torna o una disponibilità sotto soglia. Serve una persona che guardi quelle, non che passi i dati a mano.",
    },
    {
      q: "Possiamo partire con un solo canale?",
      a: "Sì, di solito da quello che oggi genera più annullamenti o più lavoro a mano, e gli altri si aggiungono uno alla volta.",
    },
  ],
  "servizi-alle-imprese": [
    {
      q: "Ogni cliente ha condizioni diverse",
      a: "Contratti, canoni e tariffe si impostano cliente per cliente, ed è proprio la parte che un software generico non regge.",
    },
    {
      q: "Il team odia compilare i timesheet",
      a: "Il timesheet si compila dalle attività della commessa già aperte, in pochi tocchi, e chi è indietro riceve un promemoria al posto della mail del responsabile.",
    },
    {
      q: "Un portale non farà solo aumentare le richieste dei clienti?",
      a: "Il portale risponde da solo alle domande che oggi arrivano per mail, cioè a che punto siamo e cosa manca, e le richieste vere arrivano già con il loro contesto.",
    },
  ],
  "sanita-privata-cliniche": [
    {
      q: "Il personale ha già troppi programmi",
      a: "Lo scopo è toglierne: agenda, cartelle e amministrazione stanno in un posto solo, con un accesso unico e la vista giusta per ogni ruolo.",
    },
    {
      q: "Siamo legati al software della cartella clinica",
      a: "Si può tenere e collegarlo, partendo da agenda e amministrazione, che di solito sono la parte che fa perdere più tempo.",
    },
    {
      q: "Molti pazienti non prenoteranno mai online",
      a: "Telefono e segreteria restano, e la prenotazione online si aggiunge per chi la vuole, nella stessa agenda, così non si creano doppioni.",
    },
  ],
  "turismo-hospitality": [
    {
      q: "Il channel manager funziona, non vogliamo toccarlo",
      a: "Resta, e il software gli si collega, così tariffe e disponibilità si cambiano in un punto solo invece che in tre.",
    },
    {
      q: "Lo staff cambia ogni stagione",
      a: "Le schermate sono pensate per chi arriva oggi, con un gesto per ogni compito, e chi conosce già il lavoro le impara durante il primo turno.",
    },
    {
      q: "Una struttura indipendente può permetterselo?",
      a: "Si parte da un modulo, di solito quello che oggi fa perdere più ore alla reception, e i nostri progetti partono da 5.000 €. Gli altri moduli arrivano quando il primo ha già reso.",
    },
  ],
  "energia-utilities": [
    {
      q: "Le norme cambiano spesso",
      a: "I report normativi si costruiscono dai dati già nel sistema, quindi quando cambia un modello si aggiorna il report e non si rifà la raccolta dei dati.",
    },
    {
      q: "Chi guarda gli allarmi di notte?",
      a: "Il sistema avvisa la persona di turno solo per i guasti e i cali di resa che contano, con le soglie che decidete voi, così un avviso non si perde tra cento.",
    },
    {
      q: "Sostituisce il CRM che usiamo?",
      a: "Dipende: se il CRM funziona lo colleghiamo, se oggi clienti e contratti stanno su fogli separati li portiamo nello stesso posto degli impianti.",
    },
  ],
  "agricoltura-agroindustria": [
    {
      q: "In azienda non siamo informatici",
      a: "Si usa dal telefono, con pochi campi e scelte già pronte, e il registro si riempie mentre si lavora invece che la sera.",
    },
    {
      q: "Lavoriamo a stagioni, quando conviene partire?",
      a: "Fuori dalla raccolta, così il sistema è pronto e provato quando arriva il picco di lavoro.",
    },
    {
      q: "I clienti ci chiedono sempre più documenti",
      a: "La tracciabilità dal campo al lotto fa uscire i documenti che chiede il cliente dai dati già registrati, senza ricostruirli ogni volta.",
    },
  ],
  "automotive-componentistica": [
    {
      q: "I programmi di consegna cambiano ogni giorno",
      a: "Il software legge i programmi quando arrivano e mostra subito cosa cambia per produzione e spedizioni, invece di lasciarlo scoprire a chi apre la mail.",
    },
    {
      q: "Gli audit li passiamo già con quello che abbiamo",
      a: "Il software non cambia le vostre procedure, le rende più veloci da dimostrare, perché documenti e tracciabilità del lotto sono già collegati quando l'auditor li chiede.",
    },
    {
      q: "Uno studio piccolo regge un cliente automotive?",
      a: "Siamo uno studio piccolo e lo diciamo. Per questo lavoriamo a moduli, con codice e documentazione che restano vostri, e chi risponde quando serve è chi l'ha costruito.",
    },
  ],
  "chimica-materiali": [
    {
      q: "Abbiamo formule con decine di versioni",
      a: "Ogni versione resta salvata con chi l'ha cambiata e quando, e ogni lotto prodotto resta legato alla versione usata.",
    },
    {
      q: "Il laboratorio lavora su Excel da sempre",
      a: "Il primo passo è portare prove e risultati del laboratorio in un posto solo, legati al lotto, senza cambiare il modo in cui vengono fatti.",
    },
    {
      q: "Il gestionale di oggi va bene per l'amministrazione",
      a: "Resta, e il software copre la parte tecnica, cioè ricette, lotti e documenti, e si collega al gestionale.",
    },
  ],
  "media-comunicazione": [
    {
      q: "La redazione è affezionata ai suoi strumenti",
      a: "Si parte dal flusso della redazione, messo in ordine insieme a chi lo fa ogni giorno, e il primo modulo è il passaggio che oggi fa perdere più tempo, di solito l'adattamento dello stesso contenuto ai vari canali.",
    },
    {
      q: "Abbiamo un archivio enorme e disordinato",
      a: "Si importa, e l'AI aiuta a classificarlo con una persona che controlla, così diventa cercabile per argomento, persone e diritti.",
    },
    {
      q: "Possiamo tenere il sito com'è?",
      a: "Sì, la piattaforma lavora dietro e pubblica sul sito che avete già.",
    },
  ],
  "pubblica-amministrazione": [
    {
      q: "Gli uffici sono abituati alla carta",
      a: "Si parte da un procedimento, con le stesse fasi di oggi, e la carta sparisce un passaggio alla volta.",
    },
    {
      q: "Il fornitore attuale non ci dà i dati",
      a: "Il recupero dei dati dai sistemi in uso fa parte del lavoro, e nel nuovo software i dati restano dell'ente.",
    },
    {
      q: "Un portale pubblico deve durare anni",
      a: "Codice e documentazione restano all'ente, quindi il portale può essere mantenuto da noi o da un altro fornitore senza ripartire da zero.",
    },
  ],
  "studi-professionali": [
    {
      q: "I soci non compileranno mai il timesheet",
      a: "Il timesheet si compila dalle attività già aperte, in pochi tocchi, e chi resta indietro riceve un promemoria invece della richiesta a fine mese.",
    },
    {
      q: "Ogni studio ha il suo metodo",
      a: "È il motivo per farlo su misura. Fasi, documenti e ruoli sono quelli del vostro studio, non quelli che un programma già pronto immagina per tutti.",
    },
    {
      q: "Costa più di un abbonamento?",
      a: "All'inizio sì: un abbonamento si paga a utente per sempre, il su misura si paga una volta e poi resta vostro, con hosting e assistenza. Conviene quando oggi tenete insieme più strumenti a mano.",
    },
  ],
};
