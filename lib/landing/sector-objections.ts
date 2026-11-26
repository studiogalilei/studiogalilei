/*
 * More doubts we hear before a project starts, industry by industry, shown after the three
 * in doubts.ts (an industry can have none here). Answered the way we answer them in a call: the limit first, no
 * promised results, no numbers we cannot show.
 */

import type { LandingFaq } from "./pages";

export const SECTOR_OBJECTIONS: Record<string, LandingFaq[]> = {
  "manifatturiero-meccanico": [
    {
      q: "Se il sistema si ferma, si ferma la produzione?",
      a: "No, le macchine lavorano comunque, perché il software raccoglie e mostra i dati ma non comanda la macchina. Se cade la rete i dati restano in coda e si allineano quando torna, e questo comportamento lo proviamo insieme prima del rilascio.",
    },
  ],
  "moda-abbigliamento": [
    {
      q: "Siamo in piena campagna vendite: non possiamo fermarci per cambiare sistema",
      a: "Non ci si ferma, si sceglie il momento. La prima parte entra in uso tra una campagna e l'altra e sul resto si continua a lavorare come prima, finché il nuovo non ha fatto una stagione intera accanto al vecchio.",
    },
  ],
  "lusso-accessori": [
    {
      q: "I dati dei clienti importanti non possono stare su un sistema qualunque",
      a: "Per questo decidi tu dove stanno: server, paese, chi accede e con quali permessi vengono scritti nel progetto prima di una riga di codice. Ogni consultazione di una scheda cliente resta nel registro, e un advisor vede solo i propri clienti.",
    },
    {
      q: "L'immagine del marchio non ammette un'interfaccia da gestionale",
      a: "Su misura vuol dire anche questo: caratteri, colori e tono sono quelli della maison, non i nostri. Un prototipo navigabile arriva prima dello sviluppo, così l'ufficio stile lo approva o lo rimanda indietro quando costa poco.",
    },
  ],
  "packaging-macchine-automatiche": [
    {
      q: "Ogni macchina che consegniamo è diversa dalle altre",
      a: "Per questo il modello dei dati parte dalle stazioni e dai segnali, non da un tipo di macchina fisso. Una macchina nuova si configura scegliendo le sue stazioni e i suoi allarmi, e solo quello che è davvero inedito richiede sviluppo.",
    },
  ],
  "alimentare-beverage": [
    {
      q: "I margini sono bassi: un software su misura è un lusso",
      a: "Lo è se rifà tutto. Si parte dal punto in cui oggi si perde più tempo o più prodotto, spesso le schede di lotto o le etichette, come prima tappa. Se il conto delle ore risparmiate non regge quel costo, non lo proponiamo.",
    },
  ],
  "farmaceutico-medicale": [
    {
      q: "Un ispettore accetterà un sistema fatto da uno studio piccolo?",
      a: "Un ispettore guarda il sistema e le sue prove, non la dimensione di chi l'ha scritto: audit trail completo, firme elettroniche, accessi, copie dei dati, documentazione. Sono requisiti che progettiamo dal primo giorno, e che vi consegniamo per iscritto.",
    },
  ],
  "edilizia-costruzioni": [],
  "logistica-trasporti": [
    {
      q: "Lavoriamo su tre turni: non esiste un momento per cambiare sistema",
      a: "Per questo non si cambia in una notte. Si parte da un'area o da un cliente solo, con il nuovo e il vecchio sistema che lavorano affiancati, e si allarga quando i numeri dei due coincidono per qualche settimana.",
    },
    {
      q: "Gli autisti cambiano spesso e molti non parlano bene l'italiano",
      a: "L'app per chi guida ha poche schermate, icone grandi e più lingue, e si impara in un giro. Chi è nuovo riceve le fermate in ordine e deve solo confermare, fotografare e far firmare.",
    },
  ],
  "retail-distribuzione": [
    {
      q: "I negozi hanno casse diverse, comprate in anni diversi",
      a: "È la situazione normale, e non si sostituiscono le casse: si raccolgono le vendite da ognuna, nel modo che quel modello consente, e si portano in un posto solo. Dove una cassa non esporta nulla lo diciamo subito, perché lì serve un'altra strada.",
    },
    {
      q: "I responsabili di negozio non seguiranno i riassortimenti proposti da un programma",
      a: "Non devono seguirli a occhi chiusi. La proposta arriva con il motivo accanto, cioè venduto, giacenza e arrivi previsti, e il responsabile la conferma o la corregge. Le correzioni restano registrate, e servono a capire quando aveva ragione lui.",
    },
  ],
  "e-commerce-marketplace": [
    {
      q: "Usiamo già tre o quattro strumenti in abbonamento che fanno quasi tutto",
      a: "Se fanno quasi tutto, tienili. Il su misura conviene per il pezzo che nessuno copre, di solito le regole tue su disponibilità, kit, resi o spedizioni, e si collega agli strumenti che restano.",
    },
    {
      q: "Se il sistema sbaglia una disponibilità vendiamo quello che non abbiamo",
      a: "È il rischio da progettare per primo. Si decide insieme una scorta di sicurezza per canale, si aggiorna la disponibilità a ogni movimento e non a orari fissi, e ogni differenza tra sistema e magazzino genera un avviso invece di passare in silenzio.",
    },
  ],
  "servizi-alle-imprese": [
    {
      q: "Siamo in venti: un gestionale su misura non è sproporzionato?",
      a: "Può esserlo, e in quel caso te lo diciamo. Se uno strumento già pronto copre commesse, ore e fatture come le gestisci tu, costa meno. Il su misura ha senso quando il modo in cui vendi e consegni il servizio è proprio tuo.",
    },
  ],
  "sanita-privata-cliniche": [
    {
      q: "Con i dati sanitari un errore costa caro",
      a: "Sì, e per questo le regole vengono prima delle funzioni: chi vede cosa, dove stanno i dati, per quanto tempo, come si esportano e come si cancellano. Le definiamo con il vostro responsabile della protezione dei dati, e ogni accesso a una cartella resta registrato.",
    },
  ],
  "turismo-hospitality": [
    {
      q: "In stagione non possiamo toccare niente",
      a: "Giusto, e non si tocca. Si progetta e si prova a stagione chiusa, e si entra in uso con le prime settimane tranquille. Durante l'alta stagione si raccolgono solo le correzioni da fare dopo.",
    },
  ],
  "energia-utilities": [
    {
      q: "I dati degli impianti stanno nei portali dei produttori",
      a: "Finché l'impianto è tuo o lo gestisci con un contratto, quei dati li puoi chiedere. Dove il produttore offre un collegamento lo usiamo, dove non lo offre si installa un lettore sul posto. Lo verifichiamo marca per marca prima di promettere una dashboard unica.",
    },
    {
      q: "Abbiamo già uno SCADA",
      a: "Lo SCADA controlla l'impianto e resta al suo posto. Quello che di solito manca sta sopra: mettere insieme più impianti, confrontare la produzione attesa con quella reale, aprire un intervento, mostrare i dati al cliente. È quella parte che costruiamo.",
    },
  ],
  "agricoltura-agroindustria": [
    {
      q: "In campagna si lavora con le mani, non con il telefono",
      a: "Per questo si registra a fine lavoro, in pochi tocchi, o lo fa una persona sola per la squadra. Dove ci sono macchine e sensori che mandano dati, si prendono da lì. Nessuno deve fermarsi in mezzo al filare per compilare una scheda.",
    },
    {
      q: "Abbiamo già il quaderno di campagna richiesto dalla legge",
      a: "Quello resta, e il software lo può compilare partendo dalle stesse registrazioni. In più le usa per altro: costi per appezzamento, rese, scadenze dei trattamenti, lotti conferiti. Si scrive una volta e serve a tutte e due le cose.",
    },
  ],
  "automotive-componentistica": [
    {
      q: "I clienti ci impongono i loro portali e i loro standard",
      a: "Continueranno a farlo, e il software non li sostituisce: scarica programmi e chiamate da quei portali, li mette accanto alla tua capacità produttiva e segnala gli scostamenti. Verso il cliente esce tutto nel formato che chiede.",
    },
    {
      q: "Abbiamo l'ERP della casa madre e non possiamo modificarlo",
      a: "Capita spesso negli stabilimenti di un gruppo. Non lo si modifica: si legge quello che esporta e si costruisce accanto il pezzo che allo stabilimento manca, senza toccare il sistema centrale.",
    },
  ],
  "chimica-materiali": [
    {
      q: "Le formule sono il nostro patrimonio: non devono uscire dall'azienda",
      a: "Possono restare su un server vostro, dentro la vostra rete. I permessi separano chi vede la ricetta completa da chi vede solo le istruzioni di lavorazione, e ogni apertura di una formula resta nel registro.",
    },
    {
      q: "Le norme su etichette e schede di sicurezza cambiano spesso: chi aggiorna il software?",
      a: "La parte normativa conviene lasciarla agli strumenti specializzati che la seguono di mestiere. Il sistema su misura tiene formule, lotti e controlli, e si collega a quegli strumenti passando i dati che servono. La responsabilità della classificazione resta al vostro tecnico.",
    },
  ],
  "media-comunicazione": [
    {
      q: "Con l'AI rischiamo di pubblicare errori a nostro nome",
      a: "Il rischio c'è, e si governa con una regola semplice: l'AI prepara, una persona firma. La usiamo per trascrivere, riassumere, proporre titoli e ritrovare materiale d'archivio, mai per pubblicare senza che qualcuno abbia letto.",
    },
  ],
  "pubblica-amministrazione": [
    {
      q: "Un ente non può affidare un incarico a chi vuole",
      a: "Vero, e le regole le conosce il vostro ufficio gare meglio di noi. Sotto le soglie previste dal codice dei contratti è possibile l'affidamento diretto, anche tramite il mercato elettronico. Sopra si passa da una procedura, e noi partecipiamo come qualsiasi operatore.",
    },
    {
      q: "Il software pagato dall'ente deve restare all'ente",
      a: "È previsto dalle linee guida sul riuso del software pubblico, e coincide con il nostro modo di lavorare: codice, documentazione e dati restano all'amministrazione. Può essere rilasciato con licenza aperta, se l'ente lo chiede.",
    },
    {
      q: "Dobbiamo integrarci con il protocollo e la contabilità che abbiamo",
      a: "Sono quasi sempre il vincolo vero del progetto. Si verifica subito cosa consentono i fornitori di quei sistemi, perché da lì dipende quanto si può automatizzare. Se un collegamento non è possibile lo scriviamo prima dell'offerta.",
    },
  ],
  "studi-professionali": [
    {
      q: "Il segreto professionale non ci permette di mettere le pratiche in cloud",
      a: "Il vincolo riguarda come si proteggono i dati, non dove gira il programma. Si sceglie insieme se usare un server vostro o un fornitore europeo, chi accede e con quali permessi, e tutto questo si scrive nell'accordo sul trattamento dei dati.",
    },
    {
      q: "Abbiamo già il gestionale di studio per dichiarativi e contabilità",
      a: "Quello non si tocca, perché segue le norme e gli aggiornamenti. Il su misura serve intorno: scadenze per cliente, documenti che mancano, ore per pratica, comunicazioni. Si collega al gestionale dove quest'ultimo lo permette.",
    },
  ],
};
