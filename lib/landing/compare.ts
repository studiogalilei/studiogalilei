/*
 * The comparison pages: the choices a buyer has to make before calling anyone. Each one says
 * when the option we do not sell is the right one. No other company is named.
 */

import type { Landing } from "./pages";

export const compares: Landing[] = [
  {
    path: "/confronti/gestionale-su-misura-o-gia-pronto",
    kind: "compare",
    kicker: "Confronto",
    title: "Gestionale su misura o già pronto: quale conviene",
    metaTitle: "Gestionale su misura o già pronto: confronto onesto",
    description:
      "Gestionale su misura o in licenza: costi all'inizio e nel tempo, tempi di avvio, adattamento ai processi, proprietà dei dati. Quando conviene l'uno e quando l'altro.",
    answer:
      "Se un gestionale già pronto copre quasi tutto il tuo lavoro così com'è, conviene quello: costa meno all'inizio e si parte in pochi giorni. Il su misura conviene quando il tuo processo è particolare, quando oggi tieni insieme più programmi ricopiando dati a mano, o quando paghi licenze a utente per funzioni che non usi. Spesso la scelta giusta è tenere il programma che funziona e costruire su misura solo il pezzo che manca.",
    table: {
      title: "Il confronto, voce per voce",
      columns: ["Già pronto, in licenza", "Su misura"],
      rows: [
        {
          label: "Costo all'inizio",
          cells: [
            "Basso: attivazione e configurazione",
            "Più alto: nei nostri progetti da 5.000 a 80.000 €",
          ],
        },
        {
          label: "Costo nel tempo",
          cells: [
            "Canone per sempre, spesso a utente, che cresce con l'azienda",
            "Hosting e assistenza, senza licenza a utente",
          ],
        },
        {
          label: "Tempo per partire",
          cells: [
            "Giorni o settimane",
            "Un progetto medio richiede 8-10 settimane, la prima parte arriva prima",
          ],
        },
        {
          label: "Adattamento",
          cells: [
            "Sei tu ad adattarti al programma, oppure paghi personalizzazioni",
            "Il programma segue il tuo processo",
          ],
        },
        {
          label: "Funzioni",
          cells: [
            "Centinaia, molte che non userai",
            "Solo quelle che servono, aggiunte una tappa alla volta",
          ],
        },
        {
          label: "Aggiornamenti e norme",
          cells: [
            "Li segue il produttore, compresi gli adempimenti fiscali",
            "Li chiedi tu: per la parte fiscale conviene collegarsi a un programma che la segue",
          ],
        },
        {
          label: "Dati e proprietà",
          cells: [
            "I dati sono tuoi, il programma no: se smetti di pagare lo perdi",
            "Codice, dati e documentazione restano a te",
          ],
        },
        {
          label: "Rischio principale",
          cells: [
            "Restare legato a un fornitore e a un listino che non decidi tu",
            "Scegliere male chi lo costruisce, o voler fare tutto subito",
          ],
        },
      ],
    },
    sections: [
      {
        title: "Quando conviene quello già pronto",
        bullets: [
          "Il tuo lavoro somiglia a quello di molte altre aziende del settore",
          "Ti serve soprattutto contabilità, fatturazione, magazzino semplice",
          "Siete in pochi e il canone a utente pesa poco",
          "Devi partire entro il mese",
        ],
        body: [
          "In questi casi un progetto su misura è una spesa che non rientra, e se ci chiami te lo diciamo.",
        ],
      },
      {
        title: "Quando conviene il su misura",
        bullets: [
          "Hai un processo tuo, che è anche il motivo per cui i clienti ti scelgono",
          "Usi tre o quattro programmi e fai da ponte con Excel",
          "Il fornitore ti ha chiesto cifre alte per ogni personalizzazione",
          "Clienti o fornitori devono entrare e vedere solo i loro dati",
          "Vuoi mettere l'AI sui tuoi dati, e oggi i dati sono sparsi",
        ],
      },
      {
        title: "La terza strada: tenere e collegare",
        body: [
          "Non è una scelta tra tutto e niente. La strada che vediamo funzionare più spesso lascia al gestionale che hai contabilità e adempimenti, e costruisce accanto il pezzo che manca: il preventivatore, la pianificazione, il portale clienti, la raccolta dati dal reparto.",
          "I due sistemi si scambiano i dati, quando il gestionale lo permette. È la prima cosa che verifichiamo, programma per programma.",
        ],
      },
      {
        title: "Come fare il conto",
        body: [
          "Metti in fila cinque anni. Da una parte il canone del programma già pronto per tutti gli utenti, più le personalizzazioni e le ore perse a ricopiare dati. Dall'altra lo sviluppo su misura, l'hosting e l'assistenza. Il confronto su un anno solo premia sempre il già pronto, quello su cinque anni dipende da quanti siete e da quanto lavoro manuale resta.",
        ],
      },
    ],
    faqs: [
      {
        q: "Un gestionale su misura costa sempre di più?",
        a: "All'inizio sì, nel tempo dipende: un programma in licenza si paga ogni anno e di solito a utente, uno su misura ha il costo di sviluppo e poi hosting e assistenza. Con molti utenti o molte personalizzazioni il conto su più anni può girare.",
      },
      {
        q: "Posso passare al su misura più avanti?",
        a: "Sì, ed è spesso il percorso più sensato: si parte con un programma già pronto, si capisce dove sta stretto, e si costruisce su misura quella parte. Conviene controllare da subito che il programma lasci esportare i dati.",
      },
      {
        q: "E se uso un programma già pronto e lo faccio personalizzare?",
        a: "Funziona finché le personalizzazioni sono poche. Quando diventano molte paghi lo sviluppo su misura dentro un programma che non è tuo, e ogni aggiornamento del produttore rischia di romperle.",
      },
      {
        q: "Chi mi garantisce che un software su misura verrà seguito?",
        a: "Il contratto e la proprietà del codice. Con noi l'assistenza è un canone concordato prima di partire, e codice e documentazione restano a te: se un giorno vuoi cambiare fornitore, il nuovo riparte da lì.",
      },
    ],
    related: [
      "/gestionale-su-misura",
      "/guide/quanto-costa-un-gestionale-su-misura",
      "/confronti/software-house-freelance-o-team-interno",
      "/domande",
    ],
  },
  {
    path: "/confronti/agente-ai-o-automazione",
    kind: "compare",
    kicker: "Confronto",
    title: "Agente AI o automazione a regole: quale serve",
    metaTitle: "Agente AI o automazione: differenze e quando servono",
    description:
      "Automazione a regole fisse o agente AI: cosa cambia in costi, affidabilità e controllo, con esempi per una PMI. Spesso la scelta giusta le usa tutte e due.",
    answer:
      "Un'automazione a regole fa sempre la stessa cosa quando succede un evento: costa meno, non sbaglia in modo imprevedibile ed è la scelta giusta quando i casi sono tutti uguali. Un agente AI serve quando c'è da leggere e capire qualcosa che cambia ogni volta, come un'email scritta a mano libera o un documento senza formato fisso. Nella maggior parte dei progetti le due cose lavorano insieme: l'AI legge, le regole eseguono.",
    table: {
      title: "Il confronto, voce per voce",
      columns: ["Automazione a regole", "Agente AI"],
      rows: [
        {
          label: "Cosa fa",
          cells: [
            "Esegue passi fissi: quando succede questo, fai quello",
            "Legge, interpreta e sceglie i passi da fare",
          ],
        },
        {
          label: "Su cosa lavora",
          cells: [
            "Dati ordinati: campi, moduli, tabelle",
            "Testo libero, documenti, email, richieste ambigue",
          ],
        },
        {
          label: "Errori",
          cells: [
            "Si blocca davanti a un caso non previsto, e te ne accorgi",
            "Può dare una risposta sbagliata che sembra giusta: va misurato e controllato",
          ],
        },
        {
          label: "Costo",
          cells: [
            "Sviluppo una volta, quasi niente a utilizzo",
            "Sviluppo più il consumo del modello, a utilizzo",
          ],
        },
        {
          label: "Controllo umano",
          cells: [
            "Serve solo sulle eccezioni",
            "Serve sui passaggi delicati: soldi, contratti, reclami",
          ],
        },
        {
          label: "Esempio",
          cells: [
            "Ogni lunedì manda il sollecito alle fatture scadute",
            "Legge la risposta del cliente al sollecito e prepara la replica",
          ],
        },
      ],
    },
    sections: [
      {
        title: "Quando basta un'automazione",
        bullets: [
          "Il dato arriva sempre nello stesso formato",
          "La regola si spiega in una frase",
          "Un errore si vede subito",
          "Il lavoro è frequente e noioso",
        ],
        body: [
          "È il caso di report periodici, solleciti, passaggi di dati tra due programmi, controlli sulle scadenze. Mettere un modello di AI qui aggiunge costo e incertezza senza dare niente in cambio.",
        ],
      },
      {
        title: "Quando serve un agente",
        bullets: [
          "Le richieste arrivano scritte in mille modi",
          "I documenti cambiano formato da fornitore a fornitore",
          "Per rispondere bisogna cercare in più sistemi",
          "Oggi una persona passa ore a leggere e smistare",
        ],
      },
      {
        title: "Come si mettono insieme",
        body: [
          "Un ordine arriva per email, scritto come capita. L'agente lo legge e ne ricava cliente, articoli e quantità. Da lì in poi lavorano le regole: controllo della disponibilità, creazione dell'ordine nel gestionale, conferma al cliente. Se l'agente non è sicuro di un dato, passa la mano a una persona.",
          "Così l'AI sta solo dove serve capire, e tutto il resto resta prevedibile e poco costoso.",
        ],
      },
      {
        title: "Il limite da sapere prima",
        body: [
          "Né l'una né l'altro sistemano un processo che non esiste. Se oggi nessuno sa dire come si gestisce un reso, prima si decide il processo e poi lo si automatizza. È il motivo del nostro metodo: prima il sistema, poi l'AI.",
        ],
      },
    ],
    faqs: [
      {
        q: "Un agente AI è solo un chatbot?",
        a: "No, un chatbot risponde a domande, mentre un agente porta a termine un compito entrando nei tuoi sistemi: legge una richiesta, cerca i dati, prepara o compie l'azione.",
      },
      {
        q: "Quale costa meno?",
        a: "L'automazione a regole, quasi sempre: si paga lo sviluppo e poco altro. Un agente ha in più il consumo del modello, che dipende dai volumi. I nostri progetti di AI e automazione vanno da 3.000 a 40.000 €.",
      },
      {
        q: "Posso partire con un'automazione e aggiungere l'AI dopo?",
        a: "Sì, ed è l'ordine che consigliamo. Le regole mettono in ordine il flusso, e quando emerge il punto in cui serve leggere e capire, lì si aggiunge l'agente.",
      },
      {
        q: "Gli strumenti di automazione già pronti non bastano?",
        a: "Per collegare due programmi diffusi spesso bastano, e costano poco. Lo sviluppo su misura serve quando i programmi non hanno collegamenti pronti, quando le regole sono tue o quando i volumi fanno salire i canoni.",
      },
    ],
    related: [
      "/agenti-ai-per-aziende",
      "/automazione-processi-aziendali",
      "/guide/quanto-costa-un-agente-ai",
      "/metodo",
    ],
  },
  {
    path: "/confronti/software-house-freelance-o-team-interno",
    kind: "compare",
    kicker: "Confronto",
    title: "Software house, freelance o team interno: a chi affidarsi",
    metaTitle: "Software house, freelance o sviluppatore interno",
    description:
      "A chi affidare un software su misura: software house, freelance o sviluppatori assunti. Costi, continuità, competenze e rischi di ciascuna strada, senza giri di parole.",
    answer:
      "Un freelance costa meno e va bene per un progetto piccolo e ben definito, ma il progetto dipende da una persona sola. Un team interno ha senso quando il software è il cuore dell'azienda e ci sarà lavoro per anni. Una software house sta in mezzo: più persone e più competenze di un freelance, senza i costi fissi di un reparto. In tutti e tre i casi conta una cosa: che codice, accessi e documentazione restino a te.",
    table: {
      title: "Il confronto, voce per voce",
      columns: ["Freelance", "Software house", "Team interno"],
      rows: [
        {
          label: "Costo",
          cells: [
            "Il più basso a parità di ore",
            "A progetto, con un preventivo",
            "Stipendi fissi, anche quando il lavoro cala",
          ],
        },
        {
          label: "Continuità",
          cells: [
            "Dipende da una persona: malattia, altri clienti, cambio di vita",
            "Più persone conoscono il progetto",
            "Alta, finché le persone restano",
          ],
        },
        {
          label: "Competenze",
          cells: [
            "Quelle di una persona",
            "Analisi, interfaccia, sviluppo, AI, messa in esercizio",
            "Da costruire assumendo più profili",
          ],
        },
        {
          label: "Tempo per partire",
          cells: ["Subito, se è libero", "Qualche settimana", "Mesi, tra selezione e inserimento"],
        },
        {
          label: "Chi guida il progetto",
          cells: ["Tu", "La software house, con te", "Un responsabile tecnico che devi avere"],
        },
        {
          label: "Adatto a",
          cells: [
            "Strumenti piccoli, prototipi, integrazioni semplici",
            "Gestionali, portali, automazioni e AI per una PMI",
            "Aziende in cui il software è il prodotto",
          ],
        },
      ],
    },
    sections: [
      {
        title: "Le domande da fare a chiunque, prima di firmare",
        bullets: [
          "Il codice è mio: dove sta scritto nel contratto",
          "Gli account di server, dominio e servizi sono intestati a me",
          "Esiste una documentazione che un altro tecnico può leggere",
          "Cosa succede se smettiamo di lavorare insieme",
          "Chi mi risponde quando qualcosa si rompe, e in quanto tempo",
          "Posso vedere un software vostro in uso da un cliente",
        ],
        body: [
          "Chi risponde con chiarezza a queste sei domande merita di essere ascoltato, qualunque forma abbia, e chi le evita no.",
        ],
      },
      {
        title: "Il rischio che nessuno dice",
        body: [
          "Il rischio più comune non è il fallimento del fornitore: è un software che funziona e che nessuno, a parte chi l'ha scritto, sa più modificare. Succede con il nipote programmatore, con il freelance bravissimo e anche con le software house.",
          "Si evita in tre modi: codice consegnato e non solo installato, account intestati all'azienda, documentazione aggiornata a ogni rilascio.",
        ],
      },
      {
        title: "Come lavoriamo noi, per confronto",
        body: [
          "Studio Galilei è una software house piccola, nata nel 2024 in provincia di Treviso. Chi lavora al tuo progetto lo conosce per intero e ti risponde direttamente. Il limite è la dimensione: non siamo la scelta giusta per un progetto che richiede decine di persone in parallelo.",
          "Partiamo dallo studio dell'azienda, lavoriamo a tappe con un prototipo prima dello sviluppo, e consegniamo codice, accessi e documentazione. I progetti vanno da 5.000 a 80.000 € per il software su misura e da 3.000 a 40.000 € per AI e automazioni.",
        ],
      },
    ],
    faqs: [
      {
        q: "Meglio una software house grande o piccola?",
        a: "Dipende dal progetto: una grande regge progetti enormi e ha più strutture, ma spesso parli con un commerciale e non con chi sviluppa. Una piccola è più diretta e meno costosa, e ha un limite nella quantità di lavoro che regge insieme.",
      },
      {
        q: "Posso assumere uno sviluppatore solo?",
        a: "Puoi, ma da solo deve fare analisi, interfaccia, sviluppo, sicurezza e assistenza, e se se ne va il progetto si ferma. Funziona meglio quando ha accanto qualcuno, anche esterno, che conosce lo stesso codice.",
      },
      {
        q: "E le piattaforme senza codice?",
        a: "Vanno bene per strumenti interni semplici e per provare un'idea in fretta. Mostrano il limite quando servono regole particolari, molti utenti o collegamenti con altri programmi, e legano i dati a un canone mensile.",
      },
      {
        q: "Come capisco se un preventivo è serio?",
        a: "Elenca cosa copre, le integrazioni, cosa è escluso, i costi dopo il rilascio e di chi è il codice. Se due preventivi sono molto diversi, di solito descrivono due progetti diversi.",
      },
    ],
    related: [
      "/software-house-treviso",
      "/confronti/gestionale-su-misura-o-gia-pronto",
      "/gestionale-su-misura",
      "/domande",
    ],
  },
];
