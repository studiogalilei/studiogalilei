/*
 * The doubts we hear before a project starts, industry by industry: two or three per page,
 * different on every page. Answered the way we answer them in a call: the limit first, no
 * promised results, no numbers we cannot show.
 */

import type { LandingFaq } from "./pages";

export const SECTOR_OBJECTIONS: Record<string, LandingFaq[]> = {
  "manifatturiero-meccanico": [
    {
      q: "Abbiamo già speso molto per l'ERP: perché un altro software?",
      a: "Perché l'ERP resta dov'è e continua a fare contabilità, acquisti e ordini. Il MES su misura copre il reparto, che l'ERP vede solo a fine turno, e gli passa i dati già pronti. Si aggiunge un pezzo, non si butta l'investimento fatto.",
    },
    {
      q: "Gli operatori non hanno tempo di inserire dati a bordo macchina",
      a: "È il motivo per cui i dati si prendono dalla macchina, dove è possibile, e all'operatore restano pochi tocchi su uno schermo grande: inizio, fine, causa del fermo. Se un inserimento richiede più tempo del foglio di carta che sostituisce, è progettato male e lo rifacciamo.",
    },
    {
      q: "Se il sistema si ferma, si ferma la produzione?",
      a: "No, le macchine lavorano comunque, perché il software raccoglie e mostra i dati ma non comanda la macchina. Se cade la rete i dati restano in coda e si allineano quando torna, e questo comportamento lo proviamo insieme prima del rilascio.",
    },
  ],
  "moda-abbigliamento": [
    {
      q: "Ogni stagione cambia tutto: un software su misura non diventa vecchio in sei mesi?",
      a: "Diventa vecchio se la stagione è scritta nel codice. La costruiamo come un dato: collezioni, listini, taglie e canali si creano e si chiudono dall'interfaccia, senza chiamarci. Quello che cambia di rado, come la struttura a matrice, sta sotto.",
    },
    {
      q: "I terzisti lavorano con WhatsApp e fogli: non entreranno mai in un portale",
      a: "Alcuni no, ed è meglio saperlo prima. Per loro si parte da un link che si apre dal telefono, senza password da ricordare, con tre cose da fare: confermare, aggiornare le quantità, segnalare un ritardo. Chi non lo usa continua a mandare il messaggio, e l'ufficio lo registra in un posto solo.",
    },
    {
      q: "Siamo in piena campagna vendite: non possiamo fermarci per cambiare sistema",
      a: "Non ci si ferma, si sceglie il momento. Il primo modulo entra in uso tra una campagna e l'altra e sul resto si continua a lavorare come prima, finché il nuovo non ha fatto una stagione intera accanto al vecchio.",
    },
  ],
  "lusso-accessori": [
    {
      q: "I dati dei clienti importanti non possono stare su un sistema qualunque",
      a: "Per questo decidi tu dove stanno: server, paese, chi accede e con quali permessi vengono scritti nel progetto prima di una riga di codice. Ogni consultazione di una scheda cliente resta nel registro, e un advisor vede solo i propri clienti.",
    },
    {
      q: "In boutique conta la relazione: uno schermo tra advisor e cliente la rovina",
      a: "La rovina se l'advisor deve scrivere mentre parla. Lo strumento si usa prima dell'appuntamento, per ricordare gusti, acquisti e ricorrenze, e dopo, per annotare in mezzo minuto quello che è emerso. Davanti al cliente resta chiuso.",
    },
    {
      q: "L'immagine del marchio non ammette un'interfaccia da gestionale",
      a: "Su misura vuol dire anche questo: caratteri, colori e tono sono quelli della maison, non i nostri. Un prototipo navigabile arriva prima dello sviluppo, così l'ufficio stile lo approva o lo rimanda indietro quando costa poco.",
    },
  ],
  "packaging-macchine-automatiche": [
    {
      q: "I nostri clienti non vogliono che le loro macchine siano collegate a internet",
      a: "È un'obiezione fondata, e la risposta è tecnica: la macchina manda dati verso l'esterno e non accetta comandi dall'esterno, su un canale separato dalla rete di fabbrica. L'assistenza remota si apre solo quando il cliente la autorizza, e ogni sessione resta registrata.",
    },
    {
      q: "Vendiamo macchine, non software: chi lo segue dopo?",
      a: "Lo seguiamo noi, con un canone concordato prima, e il tuo service lo usa senza doverlo mantenere. Il codice resta comunque tuo, quindi se un giorno assumi qualcuno per farlo in casa gli passiamo tutto.",
    },
    {
      q: "Ogni macchina che consegniamo è diversa dalle altre",
      a: "Per questo il modello dei dati parte dalle stazioni e dai segnali, non da un tipo di macchina fisso. Una macchina nuova si configura scegliendo le sue stazioni e i suoi allarmi, e solo quello che è davvero inedito richiede sviluppo.",
    },
  ],
  "alimentare-beverage": [
    {
      q: "La tracciabilità la teniamo già su carta e i controlli li passiamo",
      a: "È vero, e la carta basta per l'ispezione. Non basta il giorno di un richiamo, quando servono in pochi minuti tutti i clienti che hanno ricevuto un lotto e ricostruirli dai faldoni richiede ore. Il software non aggiunge un obbligo, toglie quelle ore.",
    },
    {
      q: "In reparto ci sono acqua, guanti e freddo: i tablet non durano",
      a: "Si scelgono dispositivi fatti per quell'ambiente e si disegnano schermate con pochi tasti grandi, da usare con i guanti. Dove si può si legge un codice a barre invece di scrivere, e le bilance mandano il peso da sole.",
    },
    {
      q: "I margini sono bassi: un software su misura è un lusso",
      a: "Lo è se rifà tutto. Si parte dal punto in cui oggi si perde più tempo o più prodotto, spesso le schede di lotto o le etichette, con un modulo solo. Se il conto delle ore risparmiate non regge quel costo, non lo proponiamo.",
    },
  ],
  "farmaceutico-medicale": [
    {
      q: "Un software su misura va convalidato da zero: costa più del software",
      a: "La convalida è una parte reale del costo e la mettiamo nel preventivo, non dopo. Lavoriamo con requisiti scritti, prove tracciate e documentazione pensata per il vostro reparto qualità, che resta il responsabile della convalida. Un perimetro piccolo e chiaro riduce anche quel lavoro.",
    },
    {
      q: "A ogni modifica dobbiamo riconvalidare tutto",
      a: "Solo la parte toccata, se il sistema è costruito a moduli e ogni modifica passa da un controllo delle modifiche documentato. Lo decidiamo all'inizio insieme alla qualità: cosa è critico, cosa no, quali prove si ripetono a ogni rilascio.",
    },
    {
      q: "Un ispettore accetterà un sistema fatto da uno studio piccolo?",
      a: "Un ispettore guarda il sistema e le sue prove, non la dimensione di chi l'ha scritto: audit trail completo, firme elettroniche, accessi, copie dei dati, documentazione. Sono requisiti che progettiamo dal primo giorno, e che vi consegniamo per iscritto.",
    },
  ],
  "edilizia-costruzioni": [
    {
      q: "I capocantiere non compilano niente, figuriamoci un'app",
      a: "Non compilano moduli lunghi, e hanno ragione. Il rapportino dal telefono chiede tre cose: chi c'era, quali mezzi, cosa si è fatto, con una foto. Deve richiedere meno tempo della telefonata serale all'ufficio che sostituisce, altrimenti non lo usa nessuno.",
    },
    {
      q: "Ogni cantiere è diverso: un software ci ingessa",
      a: "Cambiano i lavori, non le domande: quanto abbiamo speso, a che punto siamo, cosa manca. Il software fissa quelle domande e lascia libero il resto, dalle lavorazioni ai capitoli di spesa, che si impostano commessa per commessa.",
    },
    {
      q: "Abbiamo già il programma di contabilità e computo",
      a: "Resta, perché fa bene il suo mestiere. Quello che di solito manca è il collegamento tra cantiere e ufficio: ore, bolle e avanzamenti che oggi arrivano a fine mese. Costruiamo quel pezzo e lo colleghiamo al programma che hai.",
    },
  ],
  "logistica-trasporti": [
    {
      q: "Lavoriamo su tre turni: non esiste un momento per cambiare sistema",
      a: "Per questo non si cambia in una notte. Si parte da un'area o da un cliente solo, con il nuovo e il vecchio sistema che lavorano affiancati, e si allarga quando i numeri dei due coincidono per qualche settimana.",
    },
    {
      q: "Gli autisti cambiano spesso e molti non parlano bene l'italiano",
      a: "L'app per chi guida ha poche schermate, icone grandi e più lingue, e si impara in un giro. Chi è nuovo riceve le fermate in ordine e deve solo confermare, fotografare e far firmare.",
    },
    {
      q: "I clienti ci impongono i loro portali e i loro formati",
      a: "Succede quasi sempre, e si risolve con un punto solo in cui i dati vengono tradotti: dentro lavorate in un formato vostro, e verso ogni cliente esce quello che chiede. Aggiungere un cliente nuovo vuol dire aggiungere una traduzione, non rifare il sistema.",
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
    {
      q: "Le giacenze non coincidono mai con il magazzino vero",
      a: "Un software non le sistema da solo, e chi lo promette sbaglia. Le sistema un inventario fatto bene all'avvio, più regole semplici per resi, rotture e trasferimenti. Il sistema rende visibile dove nasce la differenza, negozio per negozio.",
    },
  ],
  "e-commerce-marketplace": [
    {
      q: "I marketplace cambiano regole e collegamenti di continuo",
      a: "Sì, ed è un costo da mettere in conto: i collegamenti vanno tenuti aggiornati, e questo sta nel canone di assistenza. Li teniamo separati dal resto del sistema, così quando un marketplace cambia si tocca un pezzo solo.",
    },
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
      q: "Le persone vivono i timesheet come un controllo",
      a: "Lo diventano quando servono solo a contare le ore. Qui servono a non regalare lavoro al cliente e a capire quali commesse rendono, e chi li compila vede gli stessi numeri del responsabile. Si compilano in un minuto al giorno, partendo dal calendario.",
    },
    {
      q: "Ogni cliente ha un contratto diverso",
      a: "Per questo il contratto è un dato della commessa: a corpo, a ore, a canone, con le sue soglie. Il sistema avvisa quando una soglia si avvicina, e la fattura parte dalle regole di quel contratto invece che da un foglio rifatto ogni mese.",
    },
    {
      q: "Siamo in venti: un gestionale su misura non è sproporzionato?",
      a: "Può esserlo, e in quel caso te lo diciamo. Se uno strumento già pronto copre commesse, ore e fatture come le gestisci tu, costa meno. Il su misura ha senso quando il modo in cui vendi e consegni il servizio è proprio tuo.",
    },
  ],
  "sanita-privata-cliniche": [
    {
      q: "Medici e segreteria hanno già poco tempo: un sistema nuovo li rallenta",
      a: "Li rallenta per qualche giorno, ed è onesto dirlo. Per questo si parte da una cosa sola, di solito l'agenda, e le schermate si disegnano guardando la segreteria lavorare nell'ora di punta. Quello che richiede più clic di prima viene corretto prima del rilascio.",
    },
    {
      q: "Con i dati sanitari un errore costa caro",
      a: "Sì, e per questo le regole vengono prima delle funzioni: chi vede cosa, dove stanno i dati, per quanto tempo, come si esportano e come si cancellano. Le definiamo con il vostro responsabile della protezione dei dati, e ogni accesso a una cartella resta registrato.",
    },
    {
      q: "Abbiamo un software di cartella clinica che non possiamo cambiare",
      a: "Non serve cambiarlo, perché intorno alla cartella ci sono prenotazioni, accettazione, incassi, richiami e comunicazioni, ed è lì che di solito si perde tempo. Si costruisce quella parte e la si collega alla cartella, se il fornitore lo consente.",
    },
  ],
  "turismo-hospitality": [
    {
      q: "In stagione non possiamo toccare niente",
      a: "Giusto, e non si tocca. Si progetta e si prova a stagione chiusa, e si entra in uso con le prime settimane tranquille. Durante l'alta stagione si raccolgono solo le correzioni da fare dopo.",
    },
    {
      q: "Dipendiamo dai portali e il loro collegamento non può saltare",
      a: "È il punto su cui non si improvvisa. Il collegamento con i portali passa da un channel manager già collaudato, che resta, e il software su misura lavora dietro: tariffe, clienti, servizi, comunicazioni. Così una nostra modifica non può chiudere le vendite.",
    },
    {
      q: "Il personale stagionale cambia ogni anno",
      a: "Allora il software si deve imparare in un turno. Poche schermate per ruolo, con le azioni del giorno in evidenza: arrivi, partenze, camere da preparare. Se serve un corso per usarlo, è sbagliato per questo mestiere.",
    },
  ],
  "energia-utilities": [
    {
      q: "I dati degli impianti stanno nei portali dei produttori",
      a: "Finché l'impianto è tuo o lo gestisci con un contratto, quei dati li puoi chiedere. Dove il produttore offre un collegamento lo usiamo, dove non lo offre si installa un lettore sul posto. Lo verifichiamo marca per marca prima di promettere una dashboard unica.",
    },
    {
      q: "Le regole di settore cambiano ogni anno",
      a: "Per questo tariffe, scadenze e formati dei tracciati sono impostazioni e non codice, dove è possibile. Quello che cambia davvero nella logica richiede un intervento, e rientra nell'assistenza: è un costo ricorrente da sapere prima.",
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
    {
      q: "L'annata decide tutto: non è il momento di investire",
      a: "È un ragionamento serio, e per questo si parte da un modulo piccolo e si verifica se il progetto può rientrare in un bando per l'agricoltura o la digitalizzazione, cosa che controlliamo insieme nella prima chiamata.",
    },
  ],
  "automotive-componentistica": [
    {
      q: "I clienti ci impongono i loro portali e i loro standard",
      a: "Continueranno a farlo, e il software non li sostituisce: scarica programmi e chiamate da quei portali, li mette accanto alla tua capacità produttiva e segnala gli scostamenti. Verso il cliente esce tutto nel formato che chiede.",
    },
    {
      q: "Un audit non accetta un sistema fatto in casa",
      a: "Un auditor guarda le evidenze: tracciabilità dei lotti, registrazioni non modificabili, stato delle revisioni, gestione delle non conformità. Un sistema su misura le produce quanto uno a catalogo, se è progettato per farlo, e la documentazione ve la consegniamo.",
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
    {
      q: "Il laboratorio lavora su Excel e non vuole cambiare",
      a: "Excel va bene per provare, meno per ritrovare tra due anni perché una formula è cambiata. Si lascia al laboratorio la libertà di sperimentare e si porta nel sistema solo ciò che viene approvato, con versione, data e motivo.",
    },
  ],
  "media-comunicazione": [
    {
      q: "Le redazioni rifiutano gli strumenti nuovi",
      a: "Rifiutano quelli che aggiungono passaggi. Si parte osservando come nasce un contenuto oggi e si toglie un passaggio alla volta, lasciando l'editor a cui sono abituati se funziona. Il resto del sistema lavora dietro.",
    },
    {
      q: "Usiamo già un CMS e non vogliamo rifare il sito",
      a: "Non serve rifarlo: il CMS pubblica, mentre quello che manca di solito è prima e dopo: pianificare, assegnare, approvare, sapere quali diritti scadono. Quel pezzo si costruisce e si collega al CMS che resta.",
    },
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
    {
      q: "I soci non registreranno mai le ore",
      a: "È probabile, e non serve obbligarli. Le ore si propongono da calendario, email e documenti lavorati, e a fine giornata basta confermarle. Quello che conta è sapere quali pratiche assorbono più tempo di quanto vengono pagate.",
    },
  ],
};
