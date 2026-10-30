# Studio Galilei: aggiornamento home

## Cosa pubblicare

**`index.html`** è il sito completo, pronto per la pubblicazione: sostituisce l'attuale `index.html` su www.studiogalilei.com.
Non ci sono altri file da caricare: tutto (bundle React, CSS, immagini, nuovi effetti) è dentro quel file, come nella versione attuale.

Dopo la pubblicazione conviene svuotare la cache della CDN/hosting, se presente.

## Cosa cambia

Sono modifiche alla home; le altre pagine cambiano solo per l'effetto sulle card.

1. **Barra in alto (solo home)**: niente barra bianca; la barra è trasparente sopra il cielo dell'hero, con logo e voci in bianco e "Contattaci" bianco pieno. Scorrendo diventa blu notte semitrasparente con sfocatura. Nelle altre pagine resta bianca come prima.
1. **Hero**: cielo stellato su canvas che reagisce al mouse, con una "stella polare" più evidente. Il fondo della foto di Venezia sfuma nel blu notte (`::after` della sezione) e l'hero chiude con un arco chiaro con alone azzurro, come l'orizzonte di un pianeta (`::before`), invece del taglio netto.
2. **Card AI / Marketing / Software dell'hero**: sopra c'è la scritta "Scopri i servizi" (link a `#/servizi`, centrata sul gruppo di card via JS). Su desktop si inclinano in 3D seguendo il mouse, con bagliore al passaggio; su smartphone ondeggiano da sole e si illuminano al tocco. Al clic aprono `#/servizi/intelligenza-artificiale`, `#/servizi/marketing`, `#/servizi/sviluppo-software`.
3. **"Un partner."** (e "One partner." in inglese): bianco con alone leggero e una piccola stella animata.
4. **Pulsante secondario dell'hero**: il testo passa da "Parla con noi" a "Prenota una chiamata conoscitiva" ("Book an intro call"), con una luce sottile che percorre il bordo. Al clic la pagina scorre fino alla nuova sezione del calendario.
5. **Anteprima del portale** ("Cosa ricevi quando lavori con noi"): i KPI contano da zero e il grafico si disegna quando la sezione entra nello schermo.
6. **Pulsante "Scopri come possiamo applicarlo alla tua realtà"**: alone pulsante, riflesso automatico e 4 timbri Studio Galilei animati attorno.
7. **Nuova sezione "Prenota una chiamata conoscitiva"** sotto "Caffè o videochiamata?": iframe della pagina prenotazioni di Google Calendar.
   URL: `https://calendar.google.com/calendar/appointments/schedules/AcZssZ3IEaJVbjMTE-_AwwhPk2C3G1ye1CePkAmbz1nfaqYOcFLdN2xdHYCWsLY6t6q1SuFZ8e2nCrxs?gv=true`
   Se il sito ha una Content-Security-Policy, deve permettere `frame-src https://calendar.google.com`.
8. **Spazio nelle sezioni chiare** (tutte le pagine): in trasparenza dietro ai contenuti, stelle, una galassia a spirale che ruota lentamente, un'orbita con un pianetino e una piccola costellazione. È un SVG generato nelle proporzioni di ogni sezione, sempre con `pointer-events: none`; stelle e costellazioni evitano le zone occupate da testi, card e immagini, e il disegno si rigenera quando cambia la larghezza della finestra.
8. **Card delle pagine interne** (casi studio, pagine servizio, ecc.): leggera inclinazione al passaggio del mouse ed entrata morbida durante lo scorrimento.
9. **Sezione team** (carosello di 8 card): pronta ma **disattivata** (`MOSTRA_TEAM = false`) finché non ci sono foto e nomi veri.

Tutti gli effetti rispettano `prefers-reduced-motion`. Su dispositivi touch gli effetti legati al mouse sono sostituiti da animazioni automatiche (card dell'hero) o disattivati (card delle pagine interne).
Alcune animazioni usano `@property` (Chrome, Edge, Safari 16.4+, Firefox 128+); sui browser più vecchi le card restano ferme ma funzionano.

## Come sono fatte le modifiche

Il sorgente React non era disponibile, quindi le modifiche sono applicate al file compilato in due modi:

- **Codice aggiunto** (quasi tutto): `modifiche/sg-effetti.css` e `modifiche/sg-effetti.js`, inseriti in linea prima dell'ultimo `</body>`. Lo script osserva `#root` e aggancia gli effetti a ogni cambio di pagina; usa solo classi con prefisso `sg-`.
- **Due ritocchi al bundle React** (elencati in `modifiche/costruisci.py`):
  - `"Un partner."` / `"One partner."` racchiusi in `<span class="sg-partner">`;
  - testo del pulsante `ghost-light` dell'hero: `t("Prenota una chiamata conoscitiva","Book an intro call")`.

Per rigenerare `index.html` dopo una modifica agli effetti:

```bash
python3 modifiche/costruisci.py
```

Lo script parte da `index-originale.html` (il sito attualmente online) e produce `index.html`.

### Se avete il progetto React sorgente

Conviene portare le modifiche nel sorgente invece di pubblicare il file compilato, altrimenti la prossima build le cancella:

- applicare i due ritocchi testuali sopra nei componenti corrispondenti (hero della home);
- importare `sg-effetti.css` nello stylesheet globale e caricare `sg-effetti.js` dopo il mount dell'app (oppure riscriverlo come componenti). Nello script il segnaposto `__MARCHIO_PATH__` va sostituito con il contenuto di `modifiche/marchio-path.txt` (il tracciato del logo, preso dalla favicon).

## Aggiornamento: mobile, logo, navigazione, form

Applicato a `index.html` e `tour-operator-v2.html` da `modifiche/ritocchi-mobile.py` (rilanciabile: le modifiche già fatte vengono saltate, i blocchi `sg-mobile-css`/`sg-mobile-js` rigenerati da `modifiche/sg-mobile.css` e `modifiche/sg-mobile.js`).

1. **Logo in testata**: al posto di albero + scritta, il logo ufficiale (albero + "StudioGalilei") in un quadratino blu Studio Galilei con bordi tondi, anche nella pagina tour operator.
2. **Loghi tagliati in basso**: albero e scritta del bundle erano ricalcati da un'immagine tagliata in basso (la "o", la "d", la "G" erano piatte). Ora usano i tracciati del logo vettoriale ufficiale, ovunque: testata, footer, card dell'hero. Su smartphone anche il timbro rosso sotto "Scopri come…" non viene più tagliato dal bordo della sezione.
3. **Area Privata**: niente più cerchio con etichetta, un lucchetto con testo piccolo (desktop) o solo l'icona (smartphone). Porta alla pagina **"Coming soon" della Platform** (`#/area-partner`), blu, al posto della presentazione dei vantaggi partner. Quando la Platform sarà online basta far puntare lì il link (funzione `wl` nel bundle).
4. **Menu mobile**: ogni voce ha la sua icona; aggiunte "Lavora con noi" e "Area Privata", contatti rapidi (Chiama, WhatsApp, Email), lingua e "Contattaci" in fondo.
5. **Presentazione scaricabile**: il PDF è incorporato come `data:` URL, che Safari su iPhone e i browser in-app non scaricano. Al clic ora viene convertito in un file vero (`Studio-Galilei-presentazione.pdf`).
6. **Home con più immagini e icone**: nuova sezione "Cosa facciamo" (tre servizi con colore e icona) dopo i loghi; un'icona per ogni voce di "Nel portale", "Lavorando insieme", "In più"; nuova sezione "Casi studio" con foto, immagini dei casi e loghi (su smartphone scorrono di lato). Pulsanti dell'hero a tutta larghezza su smartphone.
7. **Lavora con noi**: aprendo la pagina si scorre direttamente al modulo del Member Club.
8. **Email dei moduli**: contatti e candidature Member Club vengono inviati con **Resend** a dramane@studiogalilei.com, mittente `sito@members.studiogalilei.com`. Le invia la Vercel Function `api/invia-email.js`. Il destinatario è fisso nella funzione: chi chiama la funzione non può sceglierne un altro. Le candidature restano salvate anche su Supabase. Se l'invio non riesce, il modulo contatti mostra il pulsante "Invia via email", che apre l'app di posta del visitatore con il messaggio già compilato.

### Configurazione su Vercel

- Variabile d'ambiente **`RESEND_API_KEY`**, la chiave di Resend, in Production (e Preview se serve). Dopo averla aggiunta bisogna rifare il deploy.
- Facoltativa: `RESEND_FROM` per cambiare il mittente (predefinito `Sito Studio Galilei <sito@members.studiogalilei.com>`).
- Su Resend il dominio `members.studiogalilei.com` deve risultare **Verified** (record DNS SPF/DKIM), altrimenti Resend rifiuta l'invio.
- La cartella `api/` va pubblicata insieme a `index.html`: senza di essa i moduli non inviano email. I log degli errori di invio si vedono nei log della funzione su Vercel.

### Perché le email non arrivavano

- Il modulo **Member Club** salvava solo su Supabase: nessuna email partiva.
- Il modulo **contatti** usava FormSubmit, che richiede un'attivazione via email e a fine ottobre 2026 non rispondeva (errore 521). Ora usa Resend.
- Le **candidature dei giorni scorsi non sono perse**: sono nella tabella `candidature_member_club` di Supabase (file del portfolio nel bucket `portfolio`).
- I **messaggi di contatto** falliti non sono stati salvati da nessuna parte: chi li ha inviati ha visto il messaggio di errore.

## Platform

`platform/index.html` è la Platform (Area Partner, Area Member, Area Consulente), servita su `/platform/`.
La rotta `#/area-partner` (Area Privata in testata, nel menu mobile e nella pagina tour operator) ora reindirizza lì al posto della pagina "Coming soon".

Stato attuale: è un prototipo solo front-end. I dati (progetti, roadmap, report, allegati) restano nel browser di chi li inserisce (localStorage/IndexedDB) e non c'è login: chiunque può entrare come consulente, partner o member. Per l'uso reale servono un backend condiviso e l'autenticazione (es. Supabase, già usato per le candidature).

## Contenuto del pacchetto

```
index.html                  ← da pubblicare
tour-operator-v2.html       ← da pubblicare
platform/index.html         ← da pubblicare (Platform)
api/invia-email.js          ← da pubblicare (Vercel Function per le email)
index-originale.html        ← sito attuale, base per la rigenerazione
modifiche/sg-effetti.css
modifiche/sg-effetti.js
modifiche/costruisci.py
modifiche/marchio-path.txt
modifiche/ritocchi-mobile.py   ← secondo giro (mobile, logo, navigazione, form)
modifiche/sg-mobile.css
modifiche/sg-mobile.js
LEGGIMI.md
```

## Aggiornamento: hero essenziale e "Lavora con noi"

- **Hero**: tolti cielo stellato, stella polare, arco/orizzonte e sfumatura sul fondo (lo sfondo torna quello della foto di Venezia con il velo blu), luce che percorre il bordo del pulsante, alone e stellina su "Un partner.", sollevamento/bagliore/riflesso delle card. Restano inclinazione 3D e parallasse delle card (mouse su desktop, oscillazione automatica su smartphone) e il clic che apre i servizi.
- **Pagina "Lavorare in Studio Galilei"**: niente più galassie, orbite e costellazioni in trasparenza.
- **"Lavora con noi"** (menu, footer, ecc.): si apre direttamente il modulo del Member Club, senza la pagina di presentazione. Sotto il modulo il link "Scopri come si lavora in Studio Galilei" mostra la pagina completa. Logica in `modifiche/sg-mobile.js` e `modifiche/sg-mobile.css`.

## Aggiornamento: indirizzi senza `#/`

Il sito usa ora indirizzi normali: `studiogalilei.com/servizi`, `/casi-studio`, `/lavora-con-noi`, ecc. (prima `index.html#/servizi`).

- **Router**: nel bundle la history a hash è sostituita da quella del browser (funzione `Dd`).
- **`vercel.json`** (nuovo, va pubblicato): `/index.html` → `/` (redirect permanente) e ogni percorso senza estensione, tranne `/api` e `/platform`, è servito da `index.html`. `tour-operator-v2.html` e `platform/` restano file a sé.
- **Vecchi link**: uno script in testa a `index.html` converte al volo `/#/servizi` e `/index.html#/servizi` in `/servizi` (mantenendo `?lang=`), quindi i link già condivisi continuano a funzionare.
- **Link interni**: `tour-operator-v2.html` punta a `/servizi`, `/chi-siamo` ecc.; nel bundle il link "Tour operator" è `/tour-operator-v2.html`; gli script `sg-effetti.js` e `sg-mobile.js` navigano con `history.pushState` invece di `location.hash`.
