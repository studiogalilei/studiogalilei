/*
 * The home page demo of a "living" management system: a request arrives, the system reads it,
 * prepares the work, a person approves and the rest goes out on its own. One story per kind of
 * business, modelled on flows we have really built (tour operator reminders, rental quotes,
 * job-order changes). Names, companies and figures are invented.
 */

export type FlowStory = {
  tab: string;
  /** the person who approves, first name only */
  approver: string;
  role: string;
  incoming: { from: string; text: string };
  chips: string[];
  prepared: { title: string; lines: string[] };
  sent: string[];
  /** one line per finished step, shown once the story has moved on */
  summaries: [string, string, string, string];
};

export type FlowCopy = {
  label: string;
  steps: (approver: string) => [string, string, string, string, string];
  status: (approver: string) => [string, string, string, string, string];
  approve: string;
  approved: string;
  demo: string;
  description: string;
  stories: FlowStory[];
};

const it: FlowCopy = {
  label: "Gestionale",
  steps: (a) => [
    "Arriva la richiesta",
    "Il sistema la legge e la collega",
    "Prepara il lavoro",
    `${a} controlla e approva`,
    "Il resto parte da solo",
  ],
  status: (a) => [
    "Nuova richiesta",
    "Lettura in corso",
    "Preparazione in corso",
    `In attesa di ${a}`,
    "Fatto, senza ricopiare niente a mano",
  ],
  approve: "Approva",
  approved: "Approvato",
  demo: "Dati dimostrativi",
  description:
    "Esempio animato di un gestionale vivo: arriva una richiesta, il sistema la legge, prepara il lavoro, una persona approva e i messaggi partono da soli.",
  stories: [
    {
      tab: "Tour operator",
      approver: "Marco",
      role: "operativo",
      incoming: {
        from: "Dal sito, 2 minuti fa",
        text: "Prenotazione per il tour delle Dolomiti di sabato 14 marzo, 4 persone, ritiro in hotel a Mestre.",
      },
      chips: [
        "4 partecipanti",
        "Sabato 14 marzo",
        "Ritiro alle 7:45 a Mestre",
        "Pullmino da 9, restano 3 posti",
        "Guida: Elena",
      ],
      prepared: {
        title: "Messaggi pronti",
        lines: [
          "Promemoria agli ospiti venerdì alle 18, con orario e punto di ritiro",
          "Foglio di viaggio per l'autista, con la lista passeggeri",
        ],
      },
      sent: [
        "Promemoria agli ospiti programmato per venerdì alle 18",
        "Autista Luca avvisato, lista passeggeri aggiornata",
        "Posti liberi del pullmino aggiornati",
      ],
      summaries: [
        "Tour delle Dolomiti, 4 persone",
        "Ritiro alle 7:45, guida Elena",
        "Promemoria e foglio di viaggio",
        "Approvato da Marco",
      ],
    },
    {
      tab: "Noleggio",
      approver: "Marco",
      role: "commerciale",
      incoming: {
        from: "Modulo del sito, 5 minuti fa",
        text: "Mi servono 2 box uso ufficio per un cantiere a Montebelluna, da aprile e per circa 6 mesi.",
      },
      chips: [
        "2 box uso ufficio",
        "Da aprile, 6 mesi",
        "Cantiere a 18 km",
        "5 box liberi in deposito",
      ],
      prepared: {
        title: "Preventivo 2026-214",
        lines: [
          "Noleggio di 2 box per 6 mesi, da listino",
          "Trasporto e posa con gru",
          "Totale 4.380 € più IVA",
        ],
      },
      sent: [
        "Preventivo inviato al cliente",
        "2 box tenuti da parte in deposito fino a venerdì",
        "Promemoria a Marco per richiamarlo giovedì",
      ],
      summaries: [
        "2 box uso ufficio a Montebelluna",
        "6 mesi da aprile, box disponibili",
        "Preventivo da 4.380 € più IVA",
        "Approvato da Marco",
      ],
    },
    {
      tab: "Produzione su commessa",
      approver: "Marco",
      role: "ufficio tecnico",
      incoming: {
        from: "Mail del cliente, adesso",
        text: "Sulla commessa 2417 il foro della flangia passa da 12 a 14 mm. Vi allego il disegno aggiornato.",
      },
      chips: [
        "Commessa 2417",
        "Flangia F-80, 120 pezzi",
        "Disegno dalla revisione C alla D",
        "In lavorazione da martedì",
      ],
      prepared: {
        title: "Modifica pronta",
        lines: [
          "Disegno in revisione D collegato alla commessa",
          "Nota per il reparto con la foratura a 14 mm",
          "Richiesta agli acquisti per la punta da 14 mm",
        ],
      },
      sent: [
        "Reparto avvisato, in macchina c'è il disegno nuovo",
        "Acquisti avvisati per la punta da 14 mm",
        "Conferma al cliente con la data di consegna",
      ],
      summaries: [
        "Modifica sulla commessa 2417",
        "Flangia F-80, revisione D",
        "Disegno, nota al reparto e acquisti",
        "Approvato da Marco",
      ],
    },
  ],
};

const en: FlowCopy = {
  label: "Management system",
  steps: (a) => [
    "A request comes in",
    "The system reads it and links it",
    "It prepares the work",
    `${a} checks and approves`,
    "The rest goes out on its own",
  ],
  status: (a) => [
    "New request",
    "Reading",
    "Preparing",
    `Waiting for ${a}`,
    "Done, nothing copied by hand",
  ],
  approve: "Approve",
  approved: "Approved",
  demo: "Demo data",
  description:
    "Animated example of a living management system: a request comes in, the system reads it, prepares the work, a person approves and the messages go out on their own.",
  stories: [
    {
      tab: "Tour operator",
      approver: "Mark",
      role: "operations",
      incoming: {
        from: "From the website, 2 minutes ago",
        text: "Booking for the Dolomites tour on Saturday 14 March, 4 people, hotel pick-up in Mestre.",
      },
      chips: [
        "4 guests",
        "Saturday 14 March",
        "Pick-up 7:45 in Mestre",
        "9-seat van, 3 seats left",
        "Guide: Elena",
      ],
      prepared: {
        title: "Messages ready",
        lines: [
          "Reminder to the guests on Friday at 6 pm, with time and pick-up point",
          "Trip sheet for the driver, with the passenger list",
        ],
      },
      sent: [
        "Guest reminder scheduled for Friday at 6 pm",
        "Driver Luca notified, passenger list updated",
        "Free seats on the van updated",
      ],
      summaries: [
        "Dolomites tour, 4 people",
        "Pick-up 7:45, guide Elena",
        "Reminder and trip sheet",
        "Approved by Mark",
      ],
    },
    {
      tab: "Rental",
      approver: "Mark",
      role: "sales",
      incoming: {
        from: "Website form, 5 minutes ago",
        text: "I need 2 office cabins for a building site in Montebelluna, from April, for about 6 months.",
      },
      chips: [
        "2 office cabins",
        "From April, 6 months",
        "Site 18 km away",
        "5 cabins free in the yard",
      ],
      prepared: {
        title: "Quote 2026-214",
        lines: [
          "Rental of 2 cabins for 6 months, list price",
          "Delivery and crane placement",
          "Total €4,380 plus VAT",
        ],
      },
      sent: [
        "Quote sent to the customer",
        "2 cabins held in the yard until Friday",
        "Reminder for Mark to call back on Thursday",
      ],
      summaries: [
        "2 office cabins in Montebelluna",
        "6 months from April, cabins available",
        "Quote of €4,380 plus VAT",
        "Approved by Mark",
      ],
    },
    {
      tab: "Make to order",
      approver: "Mark",
      role: "engineering",
      incoming: {
        from: "Customer email, just now",
        text: "On order 2417 the flange hole goes from 12 to 14 mm. Updated drawing attached.",
      },
      chips: [
        "Order 2417",
        "Flange F-80, 120 pieces",
        "Drawing from revision C to D",
        "In production since Tuesday",
      ],
      prepared: {
        title: "Change ready",
        lines: [
          "Revision D drawing linked to the order",
          "Note for the shop floor with the 14 mm hole",
          "Purchase request for a 14 mm drill bit",
        ],
      },
      sent: [
        "Shop floor notified, the new drawing is at the machine",
        "Purchasing notified for the 14 mm drill bit",
        "Confirmation to the customer with the delivery date",
      ],
      summaries: [
        "Change on order 2417",
        "Flange F-80, revision D",
        "Drawing, shop note and purchasing",
        "Approved by Mark",
      ],
    },
  ],
};

export const flowCopy = (locale: string) => (locale === "en" ? en : it);
