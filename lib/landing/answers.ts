/*
 * The page of all the answers (/domande): the objections and questions of someone buying
 * custom software, automation or AI, grouped by theme. Numbers only from sources we opened,
 * each named in the answer and linked at the bottom; where a rule or a grant changes over
 * time the answer says the month it refers to.
 */

import type { Landing } from "./pages";

const ISTAT_2025 = "https://www.istat.it/comunicato-stampa/imprese-e-ict-anno-2025/";
const ISTAT_2024 = "https://www.istat.it/wp-content/uploads/2025/01/Statreport_ICT2024-1.pdf";

export const answers: Landing = {
  path: "/domande",
  kind: "guide",
  kicker: "Domande e obiezioni",
  title: "Le domande di chi compra software e AI, con le risposte",
  metaTitle: "Software su misura e AI: domande, dubbi e risposte",
  description:
    "Costi, tempi, rischio del fornitore, proprietà del codice, dati, sicurezza, GDPR, AI Act e bandi: le obiezioni di chi compra software su misura e AI, con risposte e fonti.",
  answer:
    "Chi valuta un software su misura o un progetto di AI ha quasi sempre gli stessi dubbi: quanto costa davvero, quanto dura, cosa succede se il fornitore sparisce, di chi è il codice, se le persone lo useranno, dove finiscono i dati. Qui rispondiamo a tutti, uno per uno, dicendo prima il limite e poi come lo gestiamo. I numeri vengono da Istat, dalle norme europee e italiane e dalle condizioni pubbliche dei fornitori di AI, con il link alla fonte.",
  facts: [
    { value: "da 3.000 €", label: "AI e automazioni, fino a 40.000 €" },
    { value: "da 5.000 €", label: "software su misura, fino a 80.000 €" },
    { value: "8-10 settimane", label: "un progetto di media complessità" },
  ],
  stats: [
    {
      value: "58,6%",
      label:
        "delle imprese che hanno valutato l'AI senza adottarla indica come ostacolo la mancanza di competenze",
      source: "Istat, Imprese e Ict 2025",
    },
    {
      value: "43,0%",
      label: "delle stesse imprese indica i costi elevati, il 43,2% la protezione dei dati",
      source: "Istat, Imprese e Ict 2025",
    },
    {
      value: "49,5%",
      label:
        "delle imprese italiane con almeno 10 addetti usa un gestionale ERP: tra le PMI il 48,8%",
      source: "Istat, Imprese e Ict 2025",
    },
    {
      value: "57,8%",
      label:
        "delle imprese indica le agevolazioni pubbliche come prima spinta a digitalizzare nel 2025-2026",
      source: "Istat, Imprese e Ict 2024",
    },
  ],
  sections: [
    {
      title: "Cosa frena le imprese italiane, secondo i dati",
      body: [
        "L'Istat chiede ogni anno alle imprese con almeno dieci addetti come usano il digitale. Nel 2025 il 16,4% usa almeno una tecnologia di intelligenza artificiale, il doppio dell'anno prima, e tra le PMI il 15,7%. Tra chi l'ha presa in considerazione e poi non l'ha adottata, gli ostacoli dichiarati sono la mancanza di competenze (58,6%), la poca chiarezza delle leggi (47,3%), dati assenti o di scarsa qualità (45,2%), la protezione dei dati (43,2%) e i costi (43,0%).",
        "Sui gestionali il quadro è simile: metà delle PMI con almeno dieci addetti non dichiara un ERP, e solo l'11,3% ha in azienda uno specialista informatico (dato 2024). Vuol dire che nella maggior parte delle aziende chi decide un progetto software non ha accanto un tecnico di cui fidarsi, ed è da lì che nascono quasi tutte le domande di questa pagina.",
      ],
    },
  ],
  faqs: [],
  groups: [
    {
      id: "soldi",
      title: "Soldi",
      intro: "Quanto costa, cosa si paga dopo, come si capisce se rientra.",
      items: [
        {
          q: "Quanto costa un software su misura?",
          a: "Nei nostri progetti da 5.000 a 80.000 €, IVA esclusa. La parte bassa è un modulo solo con poche integrazioni, la parte alta un gestionale con più moduli, più ruoli e collegamenti ad altri programmi. I progetti di AI e automazione vanno da 3.000 a 40.000 €.",
        },
        {
          q: "Perché non mi dite un prezzo preciso subito?",
          a: "Perché prima di guardare come lavori sarebbe un numero inventato. Dopo la prima chiamata diamo una fascia stretta, e il preventivo preciso arriva dopo la mappatura dei processi, con l'elenco dei moduli e di ciò che è escluso.",
        },
        {
          q: "Cosa pago dopo la consegna?",
          a: "Tre voci: l'hosting, cioè il server su cui gira il software, un canone di assistenza per correzioni e piccole modifiche, e il consumo del modello di AI se c'è, che si paga a utilizzo. Le scriviamo nel preventivo prima di partire, così il costo annuo lo conosci dall'inizio.",
        },
        {
          q: "Ho paura che il costo lieviti a metà progetto",
          a: "È il rischio più citato, e ha due cause: un perimetro vago e richieste aggiunte in corsa. Si riduce lavorando a moduli con un prezzo per modulo, e mettendo per iscritto ogni richiesta nuova con il suo costo prima di farla. Se un'aggiunta non la vuoi pagare, resta fuori.",
        },
        {
          q: "Come capisco se l'investimento rientra?",
          a: "Contando le ore: durante la mappatura misuriamo quanto tempo porta via oggi il lavoro che il software toglierebbe, e lo confrontiamo con il costo su tre anni. Se il conto non torna te lo diciamo e non facciamo il progetto.",
        },
        {
          q: "Si paga tutto all'inizio?",
          a: "No, i pagamenti seguono le tappe concordate nel preventivo, legate ai rilasci.",
        },
        {
          q: "È troppo per un'azienda piccola come la mia",
          a: "Può esserlo: sotto una certa dimensione un programma già pronto, o un foglio di calcolo ben fatto, bastano e costano meno. Il su misura ha senso quando il lavoro manuale che toglie vale più di quello che costa, a qualsiasi dimensione.",
        },
      ],
    },
    {
      id: "tempi",
      title: "Tempi",
      intro: "Quanto dura, quanto tempo tuo richiede, quando si vede qualcosa.",
      items: [
        {
          q: "Quanto tempo serve?",
          a: "Un progetto di media complessità richiede 8-10 settimane. Un'automazione su un processo solo ne richiede meno, un gestionale con molti moduli di più, ma arriva a pezzi: il primo modulo entra in uso prima della fine.",
        },
        {
          q: "Quanto tempo devo metterci io?",
          a: "Più all'inizio che dopo: servono alcune ore nelle prime due settimane per raccontare come lavorate e mostrare fogli e programmi, poi circa un'ora a settimana per provare quello che rilasciamo. Senza quel tempo il software esce sbagliato, ed è meglio saperlo prima di partire.",
        },
        {
          q: "Non ho tempo adesso, siamo sommersi di lavoro",
          a: "È la situazione di quasi tutti quelli che ci chiamano, ed è anche il motivo per cui il lavoro ripetitivo va tolto. Si può cominciare da un compito piccolo che libera ore in poche settimane, e usare quelle ore per il resto.",
        },
        {
          q: "E se il progetto va in ritardo?",
          a: "Può succedere, di solito perché emergono casi che nessuno aveva raccontato. Lavorando a rilasci il ritardo riguarda un modulo e non tutto il progetto, e lo vedi subito perché a ogni rilascio c'è qualcosa da provare.",
        },
      ],
    },
    {
      id: "fornitore",
      title: "Rischio del fornitore",
      intro: "Cosa succede se spariamo, se sbagliamo, se non ci si trova.",
      items: [
        {
          q: "Siete una società giovane e piccola: e se chiudete?",
          a: "Il dubbio è legittimo: siamo nati nel 2024. La protezione non è la nostra età, è quello che ti resta in mano: codice, documentazione, dati e account dei server sono tuoi e intestati a te. Un altro tecnico può riprendere il lavoro da lì.",
        },
        {
          q: "Ho già avuto una brutta esperienza con una software house",
          a: "Succede spesso, e quasi sempre per gli stessi motivi: un preventivo unico per tutto, mesi senza vedere niente, un prodotto che non somiglia al lavoro reale. Per questo partiamo da un prototipo navigabile e rilasciamo un modulo alla volta: se non funziona te ne accorgi dopo poche settimane, non dopo un anno.",
        },
        {
          q: "Chi mi risponde quando qualcosa non va?",
          a: "Chi ha costruito il software. Non c'è un centralino tra te e chi conosce il codice, e i tempi di risposta dell'assistenza si scrivono nel contratto.",
        },
        {
          q: "Posso vedere qualcosa che avete fatto?",
          a: "Sì: il software per i tour operator BeaVita Tours e FunDallas Tours è in uso ogni giorno in Italia e in Texas, e le sue schermate sono nella pagina del caso studio. Altri lavori sono coperti da riservatezza e li mostriamo in chiamata quando il cliente lo permette.",
        },
        {
          q: "Posso interrompere il progetto a metà?",
          a: "Lavorare a moduli serve anche a questo: alla fine di ogni modulo si decide se continuare. Le condizioni di uscita si scrivono nel contratto prima di partire, e ciò che è stato consegnato e pagato resta a te, con il suo codice.",
        },
        {
          q: "Meglio una software house, un freelance o assumere?",
          a: "Dipende da quanto è grande il progetto e da quanto durerà. Un freelance va bene per uno strumento piccolo, un team interno quando il software è il cuore dell'azienda, una software house per tutto quello che sta in mezzo. Il confronto completo è nella pagina dedicata.",
        },
      ],
    },
    {
      id: "proprieta",
      title: "Proprietà e dipendenza",
      intro: "Di chi è il codice, e come si evita di restare legati.",
      items: [
        {
          q: "Il codice è mio?",
          a: "Con noi sì, e lo scriviamo nel contratto. Va scritto perché la legge italiana assegna in automatico i diritti al datore di lavoro solo per il software creato dai dipendenti (legge 633/1941, articolo 12-bis). Quando lo sviluppa un fornitore esterno, chi può fare cosa con il codice dipende dal contratto, e il passaggio dei diritti va provato per iscritto (articolo 110).",
        },
        {
          q: "Cosa devo farmi consegnare, in concreto?",
          a: "Quattro cose: il codice sorgente, la documentazione per installarlo e modificarlo, gli accessi a server e servizi intestati alla tua azienda, e i dati in un formato che si apre senza il nostro programma. Chiedile a qualsiasi fornitore, prima di firmare.",
        },
        {
          q: "Resto comunque legato a voi per le modifiche?",
          a: "Nei fatti chi ha scritto un software lo modifica più in fretta di chiunque altro, quindi un legame c'è. La differenza è che non è un obbligo: usiamo linguaggi e strumenti diffusi, che molti sviluppatori conoscono, e ti consegniamo ciò che serve per cambiare fornitore.",
        },
        {
          q: "E se voglio portarlo in casa, con un mio sviluppatore?",
          a: "Si può fare in qualsiasi momento. Passiamo codice e documentazione e affianchiamo la persona per il tempo necessario, a ore.",
        },
        {
          q: "Un programma in licenza non è più sicuro, da questo punto di vista?",
          a: "È più sicuro sulla continuità, perché dietro c'è un produttore con molti clienti. È meno sicuro sull'indipendenza: il programma non è tuo, il listino lo decide il produttore e se smetti di pagare lo perdi. Conviene controllare almeno che i dati si possano esportare tutti.",
        },
      ],
    },
    {
      id: "persone",
      title: "Adozione da parte delle persone",
      intro: "Il software migliore non serve se nessuno lo apre.",
      items: [
        {
          q: "I miei collaboratori non lo useranno",
          a: "Succede quando il software chiede più lavoro di prima. Per questo le schermate si disegnano guardando le persone lavorare, il prototipo lo provano loro e non solo tu, e il primo modulo deve togliere un fastidio che sentono ogni giorno. Se dopo il rilascio non lo usano, è un difetto nostro da correggere.",
        },
        {
          q: "Abbiamo persone poco abituate al computer",
          a: "È normale: secondo l'Istat solo il 17,8% delle imprese italiane con almeno dieci addetti ha organizzato corsi di informatica per i propri addetti (dato 2024). Il software va fatto per chi lo usa: poche schermate per ruolo, tasti grandi, parole del mestiere e non dell'informatica.",
        },
        {
          q: "Serve formazione?",
          a: "Poca, se il software è fatto bene. Di solito basta un'ora per ruolo al momento del rilascio, più una guida breve. Se serve un corso di giorni, il problema è l'interfaccia.",
        },
        {
          q: "C'è una persona che ha in mano tutto con i suoi Excel: cosa succede a lei?",
          a: "È la persona più importante del progetto, perché sa come funziona davvero l'azienda. La coinvolgiamo per prima: le sue regole diventano le regole del sistema, e lei smette di essere l'unica a poterle applicare.",
        },
      ],
    },
    {
      id: "gestionale-esistente",
      title: "Il gestionale che c'è già",
      intro: "Quasi nessuno parte da zero, e quasi mai conviene buttare tutto.",
      items: [
        {
          q: "Ho già un gestionale: devo buttarlo?",
          a: "Quasi mai: di solito gli si lascia quello che fa bene, come contabilità e adempimenti fiscali, e si costruisce accanto il pezzo che manca. I due sistemi si scambiano i dati.",
        },
        {
          q: "Il mio gestionale è vecchio: si riesce a collegare?",
          a: "Dipende da cosa lascia uscire. Alcuni hanno un collegamento ufficiale, altri esportano file, per altri si legge la base dati con l'accordo del produttore. Lo verifichiamo all'inizio, programma per programma, e se non si può lo diciamo prima del preventivo.",
        },
        {
          q: "Il fornitore del gestionale dice che può fare lui la personalizzazione",
          a: "Chiedigli un preventivo: per modifiche piccole è spesso la strada giusta, perché conosce il suo programma. Confrontalo con il su misura quando le personalizzazioni diventano molte, perché restano dentro un programma che non è tuo e ogni aggiornamento può toccarle.",
        },
        {
          q: "Meglio su misura o già pronto?",
          a: "Se un programma già pronto copre quasi tutto il tuo lavoro, conviene quello. Il su misura conviene quando il processo è particolare o quando oggi ricopi dati a mano tra più strumenti. Il confronto voce per voce è nella pagina dedicata.",
        },
      ],
    },
    {
      id: "dati",
      title: "Migrazione dei dati",
      intro: "Anni di storico tra fogli, programmi vecchi e cartelle.",
      items: [
        {
          q: "Abbiamo anni di dati su Excel: si portano dentro?",
          a: "Sì, ma vanno puliti: doppioni, codici scritti in tre modi, campi usati per altro. È un lavoro che richiede tempo e una persona tua che sappia dire quale dato è quello giusto. Lo mettiamo nel preventivo come voce a parte.",
        },
        {
          q: "Rischio di perdere dati nel passaggio?",
          a: "Il rischio si controlla con tre regole: l'archivio vecchio non si tocca finché il nuovo non è verificato, ogni importazione si prova prima su una copia, e alla fine si confrontano i totali tra vecchio e nuovo. Quello che non coincide si guarda riga per riga.",
        },
        {
          q: "Devo portare dentro tutto lo storico?",
          a: "Di solito no. Si porta ciò che serve per lavorare, come clienti, articoli e ordini aperti, e il resto si tiene consultabile in archivio. Migrare dieci anni di dati che nessuno guarda costa e non rende.",
        },
        {
          q: "Durante il passaggio l'azienda si ferma?",
          a: "No. Per un periodo si lavora con il vecchio e il nuovo affiancati su un modulo solo, e si spegne il vecchio quando i numeri coincidono.",
        },
      ],
    },
    {
      id: "sicurezza",
      title: "Sicurezza e GDPR",
      intro: "Dove stanno i dati, chi risponde, cosa chiede la legge.",
      items: [
        {
          q: "Dove stanno i miei dati?",
          a: "Dove decidi tu, e lo scriviamo nel progetto: di norma su server in Unione europea, intestati alla tua azienda. Per chi ha vincoli particolari si può installare il software su un server interno.",
        },
        {
          q: "Chi è responsabile dei dati personali?",
          a: "Il titolare del trattamento resta la tua azienda. Noi operiamo come responsabile del trattamento, e il GDPR chiede che il rapporto sia regolato da un contratto scritto (articolo 28), che firmiamo prima di toccare dati veri.",
        },
        {
          q: "Cosa succede se c'è una violazione dei dati?",
          a: "Il GDPR chiede al titolare di notificarla al Garante entro 72 ore da quando ne viene a conoscenza, salvo che sia improbabile un rischio per le persone (articolo 33). Per questo il software registra accessi e operazioni: senza registro non si sa cosa è successo, e non si può notificare niente di preciso.",
        },
        {
          q: "Quanto rischia un'azienda con il GDPR?",
          a: "Le sanzioni massime arrivano a 20 milioni di euro o al 4% del fatturato mondiale annuo, se superiore, per le violazioni più gravi (articolo 83). Sono massimi, e nella pratica contano le misure adottate: accessi per ruolo, copie dei dati, registro delle operazioni.",
        },
        {
          q: "Un software su misura è meno sicuro di uno famoso?",
          a: "Non per forza: un prodotto diffuso ha più controlli alle spalle ed è anche un bersaglio più cercato. Un software su misura è sicuro quanto le sue regole di base: aggiornamenti, permessi, copie, accessi protetti. Secondo l'Istat nel 2024 il 15,8% delle imprese italiane con almeno dieci addetti ha subito un incidente informatico con conseguenze, quale che fosse il software usato.",
        },
        {
          q: "Fate le copie di sicurezza?",
          a: "Le copie automatiche fanno parte dell'assistenza, insieme alla prova di ripristino, che è la parte che molti dimenticano. Frequenza e durata di conservazione si decidono insieme e si scrivono nel contratto.",
        },
      ],
    },
    {
      id: "ai",
      title: "Intelligenza artificiale",
      intro: "Errori, dati, regole europee, posti di lavoro.",
      items: [
        {
          q: "L'AI sbaglia: come faccio a fidarmi?",
          a: "Non devi fidarti alla cieca. Gli stessi produttori scrivono che le risposte false ma plausibili restano un problema di fondo dei modelli linguistici (OpenAI, settembre 2025). Per questo misuriamo l'agente sui tuoi casi veri prima di accenderlo, contiamo quante volte sbaglia, e sui passaggi delicati una persona approva sempre.",
        },
        {
          q: "I miei dati vengono usati per addestrare l'AI?",
          a: "Con i servizi per le aziende no, per impostazione predefinita. OpenAI dichiara di non usare per l'addestramento i dati dell'API e dei piani aziendali, le condizioni commerciali di Anthropic lo vietano, e i termini di Google Cloud lo escludono senza il permesso del cliente. È diverso per le versioni gratuite o personali degli stessi strumenti: usarle con dati aziendali è l'errore da evitare.",
        },
        {
          q: "Cosa chiede il regolamento europeo sull'AI a una PMI?",
          a: "Il regolamento (UE) 2024/1689 si applica in via generale dal 2 agosto 2026. Per la maggior parte delle PMI contano due cose: chi parla con un sistema di AI deve saperlo (articolo 50), e l'azienda deve sostenere la preparazione di chi usa questi sistemi (articolo 4). Gli obblighi più pesanti riguardano i sistemi ad alto rischio, come quelli per selezionare il personale, e sono stati rinviati al 2 dicembre 2027 dal regolamento (UE) 2026/1744.",
        },
        {
          q: "E la legge italiana sull'AI?",
          a: "La legge 132 del 2025, in vigore dal 10 ottobre 2025, chiede tra l'altro che il datore di lavoro informi i lavoratori quando usa l'AI nei casi previsti dalla norma sulla trasparenza, cioè per decisioni o controlli automatizzati che li riguardano (articolo 11). Un agente che legge le email dei clienti non rientra in quei casi, uno che valuta i dipendenti sì.",
        },
        {
          q: "L'AI toglierà il lavoro alle mie persone?",
          a: "Nei progetti che facciamo toglie compiti, non persone: ricopiare dati, smistare richieste, preparare bozze. Chi faceva quel lavoro passa a controllare e a seguire i casi difficili. Non abbiamo numeri nostri da darti sull'occupazione, e diffidiamo di chi ne dà.",
        },
        {
          q: "Siamo troppo indietro per usare l'AI",
          a: "Probabilmente no: nel 2025 l'83,6% delle imprese italiane con almeno dieci addetti non usa alcuna tecnologia di AI, secondo l'Istat. Chi comincia adesso può farlo nell'ordine giusto: prima i dati in ordine, poi un compito solo, misurato.",
        },
        {
          q: "Non basta dare ChatGPT ai dipendenti?",
          a: "Per scrivere e riassumere basta, con un piano aziendale e due regole su cosa non incollarci. Non basta quando l'AI deve entrare nei tuoi sistemi, leggere i tuoi dati e compiere azioni: lì serve un agente costruito e controllato.",
        },
        {
          q: "Quale modello usate, e se domani ne esce uno migliore?",
          a: "Scegliamo tra i modelli dei principali fornitori in base al compito, e costruiamo l'agente in modo che il modello si possa cambiare. I migliori cambiano ogni pochi mesi, quindi legarsi a uno solo è un errore di progetto.",
        },
      ],
    },
    {
      id: "bandi",
      title: "Bandi e agevolazioni",
      intro: "Cosa esiste a novembre 2026, e cosa non promettiamo.",
      items: [
        {
          q: "Esistono contributi per un software su misura?",
          a: "A novembre 2026 le strade principali sono tre: l'iperammortamento per i beni 4.0, la Nuova Sabatini per i beni strumentali e i voucher delle Camere di commercio. Hanno regole diverse e nessuna copre qualsiasi software: nella prima chiamata verifichiamo se il tuo progetto può rientrare.",
        },
        {
          q: "Transizione 5.0 e il credito d'imposta 4.0 ci sono ancora?",
          a: "No per i nuovi investimenti. Le risorse di Transizione 5.0 si sono esaurite a novembre 2025, e dal 2026 la legge di bilancio ha sostituito i due crediti d'imposta con l'iperammortamento.",
        },
        {
          q: "Come funziona l'iperammortamento per il software?",
          a: "È una maggiorazione del costo ai fini dell'ammortamento, quindi riduce le imposte negli anni e non dà liquidità: più 180% fino a 2,5 milioni di euro di investimenti effettuati dal 1° gennaio 2026 al 30 settembre 2028. Vale per il software dell'elenco di legge, interconnesso alla produzione o alla catena di fornitura, e serve una perizia. Va valutato con il tuo commercialista.",
        },
        {
          q: "Un bando paga tutto il progetto?",
          a: "No. Copre una parte, spesso a rimborso dopo che hai pagato, con tempi e documenti da rispettare. Un progetto che sta in piedi solo con il contributo è un progetto da non fare.",
        },
        {
          q: "Ve ne occupate voi?",
          a: "Cerchiamo noi i bandi e le agevolazioni adatti al progetto e ti diciamo se puoi rientrare, prima di partire. L'esito di una domanda non dipende da noi, e non lo promettiamo.",
        },
      ],
    },
  ],
  sources: [
    { label: "Istat, «Imprese e Ict, anno 2025» (15 dicembre 2025)", url: ISTAT_2025 },
    { label: "Istat, «Imprese e Ict, anno 2024» (17 gennaio 2025)", url: ISTAT_2024 },
    {
      label: "Legge 22 aprile 1941, n. 633, articolo 12-bis (Normattiva)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1941-04-22;633~art12bis",
    },
    {
      label: "Legge 22 aprile 1941, n. 633, articolo 110 (Normattiva)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1941-04-22;633~art110",
    },
    {
      label: "Regolamento (UE) 2016/679, GDPR: articoli 28, 33 e 83 (EUR-Lex)",
      url: "https://eur-lex.europa.eu/legal-content/IT/TXT/HTML/?uri=CELEX:32016R0679",
    },
    {
      label: "Regolamento (UE) 2024/1689 sull'intelligenza artificiale (EUR-Lex)",
      url: "https://eur-lex.europa.eu/legal-content/IT/TXT/HTML/?uri=OJ:L_202401689",
    },
    {
      label: "Regolamento (UE) 2026/1744, che modifica il regolamento sull'AI (EUR-Lex)",
      url: "https://eur-lex.europa.eu/legal-content/IT/TXT/HTML/?uri=OJ:L_202601744",
    },
    {
      label: "Legge 23 settembre 2025, n. 132, sull'intelligenza artificiale (Gazzetta Ufficiale)",
      url: "https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg",
    },
    {
      label: "OpenAI, «Enterprise privacy»: uso dei dati dei clienti aziendali",
      url: "https://openai.com/enterprise-privacy/",
    },
    {
      label: "Anthropic, «Commercial Terms of Service»",
      url: "https://www.anthropic.com/legal/commercial-terms",
    },
    {
      label: "Google Cloud, «Service Specific Terms», sezione sull'addestramento",
      url: "https://cloud.google.com/terms/service-terms",
    },
    {
      label: "OpenAI, «Why language models hallucinate» (5 settembre 2025)",
      url: "https://openai.com/index/why-language-models-hallucinate/",
    },
    {
      label:
        "Legge 30 dicembre 2025, n. 199, legge di bilancio 2026: iperammortamento (Normattiva)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-12-30;199",
    },
    {
      label: "Agenda Digitale, «Transizione 5.0, è la fine» (7 novembre 2025)",
      url: "https://www.agendadigitale.eu/industria-5-0/transizione-5-0-e-la-fine-cosa-succede-ora-che-non-ci-son-piu-risorse/",
    },
  ],
  related: [
    "/confronti/gestionale-su-misura-o-gia-pronto",
    "/confronti/software-house-freelance-o-team-interno",
    "/guide/bandi-software-ai",
    "/metodo",
  ],
};

export const grants: Landing = {
  path: "/guide/bandi-software-ai",
  kind: "guide",
  kicker: "Guida",
  title: "Bandi e agevolazioni per software e AI: cosa c'è a novembre 2026",
  metaTitle: "Bandi software e AI per PMI: agevolazioni 2026",
  description:
    "Iperammortamento, Nuova Sabatini, voucher delle Camere di commercio: quali agevolazioni possono coprire parte di un software su misura o di un progetto di AI a novembre 2026.",
  answer:
    "A novembre 2026 un'impresa italiana che investe in software ha tre strade principali: l'iperammortamento per i beni 4.0, la Nuova Sabatini e i voucher digitali delle Camere di commercio. Transizione 5.0 e il credito d'imposta 4.0 non sono più disponibili per i nuovi investimenti. Nessuna agevolazione copre qualsiasi software, e nessuna paga tutto il progetto: nella prima chiamata verifichiamo se il tuo può rientrare, e in quale.",
  facts: [
    { value: "+180%", label: "iperammortamento, fino a 2,5 milioni di euro di investimenti" },
    { value: "30 settembre 2028", label: "termine per gli investimenti in iperammortamento" },
    { value: "150 milioni", label: "voucher delle Camere di commercio, programma 2026-2029" },
  ],
  sections: [
    {
      title: "Iperammortamento: per il software legato alla produzione",
      body: [
        "La legge di bilancio 2026 (legge 199 del 2025) ha sostituito i crediti d'imposta Transizione 4.0 e 5.0 con l'iperammortamento. Non è un contributo: il costo del bene viene maggiorato ai fini dell'ammortamento, quindi si pagano meno imposte negli anni successivi, a patto di avere utili su cui pagarle.",
        "La maggiorazione è del 180% per gli investimenti fino a 2,5 milioni di euro, del 100% tra 2,5 e 10 milioni e del 50% tra 10 e 20 milioni, per gli investimenti effettuati dal 1° gennaio 2026 al 30 settembre 2028.",
        "Il software rientra se appartiene all'elenco allegato alla legge, che comprende per esempio i sistemi per la gestione e il coordinamento della produzione come MES e SCADA, e se è interconnesso al sistema aziendale di gestione della produzione o alla rete di fornitura. Secondo quanto riporta Agenda Digitale, il decreto attuativo esclude il software in abbonamento e ammette quello acquisito in proprietà o in licenza pluriennale, e richiede una perizia.",
      ],
    },
    {
      title: "Nuova Sabatini: un contributo sugli interessi",
      body: [
        "La Nuova Sabatini sostiene le PMI che comprano beni strumentali con un finanziamento bancario o un leasing, attraverso un contributo calcolato sugli interessi. La legge di bilancio 2026 l'ha rifinanziata con 200 milioni di euro per il 2026 e 450 milioni per il 2027.",
        "Funziona a sportello, fino a esaurimento delle risorse. Se il tuo software rientra tra i beni ammessi e se lo sportello è aperto va controllato sul sito del Ministero delle imprese al momento della domanda.",
      ],
    },
    {
      title: "Voucher delle Camere di commercio",
      body: [
        "Il sistema camerale ha avviato nel 2026 il «Voucher Doppia Transizione», un programma da 150 milioni di euro tra il 2026 e il 2029 che finanzia, tra le altre cose, tecnologie digitali come intelligenza artificiale, cloud e sicurezza informatica, oltre a consulenza e formazione.",
        "Ogni Camera di commercio pubblica il proprio bando, con importi, date e regole diverse, e di solito le domande si esauriscono in fretta. Per le imprese di Treviso e del Veneto va guardato il sito della propria Camera: lo stato dei bandi locali cambia nel giro di settimane.",
      ],
    },
    {
      title: "Cosa non c'è più",
      bullets: [
        "Transizione 5.0: le risorse sono risultate esaurite a novembre 2025",
        "Credito d'imposta Transizione 4.0: sostituito dall'iperammortamento dal 2026",
        "Fondo Nuove Competenze, terza edizione: le domande si sono chiuse il 10 aprile 2025, e riguardava la formazione, non il software",
      ],
    },
    {
      title: "Le regole che valgono per qualsiasi bando",
      bullets: [
        "Il contributo copre una parte, mai tutto",
        "Spesso arriva a rimborso, dopo che hai pagato",
        "Le spese fatte prima della domanda di solito non valgono",
        "Servono preventivi, relazioni e a volte una perizia",
        "Il progetto deve reggersi anche senza contributo",
      ],
      body: [
        "Per questo guardiamo i bandi prima di partire e non dopo: l'ordine delle date decide se una spesa è ammessa.",
      ],
    },
    {
      title: "Cosa facciamo noi",
      body: [
        "Cerchiamo i bandi e le agevolazioni adatti al progetto, ti diciamo se puoi rientrare e prepariamo la parte tecnica della domanda. La valutazione fiscale resta al tuo commercialista, e l'esito dipende dall'ente che eroga: non lo promettiamo.",
      ],
    },
  ],
  faqs: [
    {
      q: "Un gestionale su misura rientra nell'iperammortamento?",
      a: "Può rientrare se è un bene capitalizzato dall'azienda, ricade in una voce dell'elenco di legge ed è interconnesso alla produzione o alla catena di fornitura. Un gestionale usato solo per l'amministrazione difficilmente rientra. Va valutato caso per caso con il commercialista e con chi firma la perizia.",
    },
    {
      q: "Esistono contributi a fondo perduto per il software?",
      a: "Sì, soprattutto nei voucher delle Camere di commercio e in alcuni bandi regionali, con importi limitati e sportelli che si chiudono in fretta. Vanno verificati al momento, sul sito dell'ente.",
    },
    {
      q: "Posso chiedere il contributo dopo aver iniziato il progetto?",
      a: "Di solito no: molti bandi ammettono solo le spese successive alla domanda. È il motivo per cui la verifica si fa nella prima chiamata.",
    },
    {
      q: "Queste informazioni sono aggiornate?",
      a: "Descrivono la situazione a novembre 2026, sulla base delle leggi e delle fonti elencate in fondo. Sportelli e risorse cambiano spesso, quindi prima di decidere controlliamo insieme lo stato del singolo bando.",
    },
  ],
  sources: [
    {
      label: "Legge 30 dicembre 2025, n. 199, legge di bilancio 2026 (Normattiva)",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-12-30;199",
    },
    {
      label:
        "Agenda Digitale, «Comprare AI con l'iperammortamento 2026: come fare» (26 maggio 2026)",
      url: "https://www.agendadigitale.eu/industry-4-0/software-ai-e-iperammortamento-2026-come-funziona-lagevolazione/",
    },
    {
      label: "Agenda Digitale, «Transizione 5.0, è la fine» (7 novembre 2025)",
      url: "https://www.agendadigitale.eu/industria-5-0/transizione-5-0-e-la-fine-cosa-succede-ora-che-non-ci-son-piu-risorse/",
    },
    {
      label:
        "Agenda Digitale, «Voucher Doppia Transizione 2026: la guida per le pmi» (7 luglio 2026)",
      url: "https://www.agendadigitale.eu/industria-5-0/voucher-doppia-transizione-2026-la-guida-per-le-pmi/",
    },
    {
      label: "Ministero del lavoro, Fondo Nuove Competenze, terza edizione",
      url: "https://www.lavoro.gov.it/pn-giovani-donne-lavoro/operazioni-di-importanza-strategica/fondo-nuove-competenze",
    },
  ],
  related: [
    "/domande",
    "/guide/quanto-costa-un-gestionale-su-misura",
    "/guide/quanto-costa-un-agente-ai",
    "/gestionale-su-misura",
  ],
};
