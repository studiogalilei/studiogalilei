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

## Contenuto del pacchetto

```
index.html                  ← da pubblicare
index-originale.html        ← sito attuale, base per la rigenerazione
modifiche/sg-effetti.css
modifiche/sg-effetti.js
modifiche/costruisci.py
modifiche/marchio-path.txt
LEGGIMI.md
```
