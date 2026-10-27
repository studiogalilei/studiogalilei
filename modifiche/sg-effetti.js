/* ---- Studio Galilei: effetti home (stelle + card reattive) ---- */
(function () {
  var riduciMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var conMouse = window.matchMedia("(hover: hover)").matches;

  /* ===== Cielo stellato nell'hero ===== */
  function Cielo(sezione) {
    var canvas = document.createElement("canvas");
    canvas.className = "sg-cielo";
    canvas.setAttribute("aria-hidden", "true");
    // dopo il gradiente scuro, prima del contenuto
    var contenuto = sezione.querySelector(":scope > .mx-auto");
    sezione.insertBefore(canvas, contenuto || null);

    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1;
    var stelle = [];
    var polare = null;
    // mouse normalizzato (-1..1) e posizione in pixel, con inseguimento morbido
    var mouse = { x: 0, y: 0, px: -9999, py: -9999, dentro: false };
    var liscio = { x: 0, y: 0 };
    var visibile = true, raf = 0, t0 = performance.now();

    function crea() {
      var r = sezione.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var n = Math.round(Math.min(260, (w * h) / 5200));
      stelle = [];
      for (var i = 0; i < n; i++) {
        var z = Math.random(); // profondità: 0 lontana, 1 vicina
        stelle.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: z,
          r: 0.35 + z * 1.15,
          a: 0.35 + Math.random() * 0.55,
          fase: Math.random() * Math.PI * 2,
          vel: 0.6 + Math.random() * 1.8,
          ox: 0, oy: 0 // spostamento dovuto al mouse
        });
      }
      // la stella polare: in alto, tra titolo e card
      polare = { x: w * (w < 768 ? 0.82 : 0.47), y: h * (w < 768 ? 0.08 : 0.15), ox: 0, oy: 0 };
    }

    function disegnaPolare(t) {
      var par = 14;
      var x = polare.x + liscio.x * par + polare.ox;
      var y = polare.y + liscio.y * par + polare.oy;
      var pulsa = 1 + Math.sin(t * 1.3) * 0.08;
      // vicinanza del mouse: la stella si accende
      var d = Math.hypot(mouse.px - x, mouse.py - y);
      var acceso = mouse.dentro ? Math.max(0, 1 - d / 260) : 0;
      var s = (1 + acceso * 0.5) * pulsa;

      // alone
      var g = ctx.createRadialGradient(x, y, 0, x, y, 34 * s);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.12, "rgba(220,232,255,0.55)");
      g.addColorStop(0.4, "rgba(150,185,255,0.14)");
      g.addColorStop(1, "rgba(150,185,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, 34 * s, 0, Math.PI * 2); ctx.fill();

      // raggi a croce (lunghi in verticale/orizzontale, corti in diagonale)
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 0.2) * 0.04);
      raggio(0, 46 * s, 1.4);
      raggio(Math.PI / 2, 40 * s, 1.4);
      raggio(Math.PI / 4, 16 * s, 0.9);
      raggio(-Math.PI / 4, 16 * s, 0.9);
      ctx.restore();

      // nucleo
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(x, y, 2.6 * s, 0, Math.PI * 2); ctx.fill();
    }

    function raggio(ang, lun, spess) {
      ctx.save();
      ctx.rotate(ang);
      var g = ctx.createLinearGradient(-lun, 0, lun, 0);
      g.addColorStop(0, "rgba(210,225,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(210,225,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(-lun, 0);
      ctx.quadraticCurveTo(0, -spess, lun, 0);
      ctx.quadraticCurveTo(0, spess, -lun, 0);
      ctx.fill();
      ctx.restore();
    }

    function frame(now) {
      raf = 0;
      var t = (now - t0) / 1000;
      liscio.x += (mouse.x - liscio.x) * 0.06;
      liscio.y += (mouse.y - liscio.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stelle.length; i++) {
        var s = stelle[i];
        var par = 6 + s.z * 28; // parallasse per profondità
        var bx = s.x + liscio.x * par;
        var by = s.y + liscio.y * par;

        // le stelle vicine al cursore si scostano leggermente e brillano
        var tx = 0, ty = 0, luce = 0;
        if (mouse.dentro) {
          var dx = bx - mouse.px, dy = by - mouse.py;
          var d = Math.hypot(dx, dy), raggioInfl = 140;
          if (d < raggioInfl && d > 0.01) {
            var f = 1 - d / raggioInfl;
            tx = (dx / d) * f * 22 * (0.4 + s.z);
            ty = (dy / d) * f * 22 * (0.4 + s.z);
            luce = f;
          }
        }
        s.ox += (tx - s.ox) * 0.08;
        s.oy += (ty - s.oy) * 0.08;

        var tw = riduciMovimento ? 1 : 0.65 + 0.35 * Math.sin(t * s.vel + s.fase);
        var alpha = Math.min(1, s.a * tw + luce * 0.6);
        ctx.fillStyle = "rgba(255,255,255," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(bx + s.ox, by + s.oy, s.r * (1 + luce * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      disegnaPolare(riduciMovimento ? 0 : t);

      if (visibile && !riduciMovimento) raf = requestAnimationFrame(frame);
    }

    function avvia() { if (!raf) raf = requestAnimationFrame(frame); }

    function muovi(e) {
      var r = sezione.getBoundingClientRect();
      mouse.px = e.clientX - r.left;
      mouse.py = e.clientY - r.top;
      mouse.x = (mouse.px / r.width) * 2 - 1;
      mouse.y = (mouse.py / r.height) * 2 - 1;
      mouse.dentro = true;
      if (riduciMovimento) avvia();
    }
    function esci() { mouse.dentro = false; mouse.x = 0; mouse.y = 0; }

    sezione.addEventListener("pointermove", muovi);
    sezione.addEventListener("pointerleave", esci);

    var ro = new ResizeObserver(function () { crea(); avvia(); });
    ro.observe(sezione);
    var io = new IntersectionObserver(function (voci) {
      visibile = voci[0].isIntersecting && !document.hidden;
      if (visibile) avvia();
    });
    io.observe(sezione);

    crea();
    avvia();

    this.canvas = canvas;
    this.distruggi = function () {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      sezione.removeEventListener("pointermove", muovi);
      sezione.removeEventListener("pointerleave", esci);
    };
  }

  /* ===== Card servizi (AI, Marketing, Software) reattive al mouse ===== */
  function Card(sezione, tilesEl) {
    var tiles = Array.prototype.slice.call(tilesEl.querySelectorAll(".tile"));

    function muovi(e) {
      var r = sezione.getBoundingClientRect();
      var mx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var my = ((e.clientY - r.top) / r.height) * 2 - 1;
      tilesEl.style.setProperty("--sg-ry", (mx * 9).toFixed(2) + "deg");
      tilesEl.style.setProperty("--sg-rx", (-my * 7).toFixed(2) + "deg");
      tilesEl.style.setProperty("--sg-mx", mx.toFixed(3));
      tilesEl.style.setProperty("--sg-my", my.toFixed(3));

      // card sotto il cursore: si solleva e prende il riflesso di luce
      var sopra = document.elementFromPoint(e.clientX, e.clientY);
      var attiva = sopra && sopra.closest ? sopra.closest(".tile") : null;
      tiles.forEach(function (t) {
        var on = t === attiva;
        t.classList.toggle("sg-attiva", on);
        if (on) {
          var tr = t.getBoundingClientRect();
          t.style.setProperty("--sg-gx", (((e.clientX - tr.left) / tr.width) * 100).toFixed(1) + "%");
          t.style.setProperty("--sg-gy", (((e.clientY - tr.top) / tr.height) * 100).toFixed(1) + "%");
        }
      });
    }
    function esci() {
      ["--sg-rx", "--sg-ry", "--sg-mx", "--sg-my"].forEach(function (p) { tilesEl.style.removeProperty(p); });
      tiles.forEach(function (t) { t.classList.remove("sg-attiva"); });
    }
    // ogni card porta alla pagina del suo servizio
    var link = { AI: "#/servizi/intelligenza-artificiale", Marketing: "#/servizi/marketing", Software: "#/servizi/sviluppo-software" };
    function clic(e) {
      var t = e.target.closest ? e.target.closest(".tile") : null;
      var etichetta = t && t.querySelector("p");
      var dest = etichetta && link[etichetta.textContent.trim()];
      if (!dest) return;
      if (conMouse) { location.hash = dest.slice(1); return; }
      // da smartphone: la card toccata si illumina un istante, poi si apre la pagina
      t.classList.add("sg-attiva");
      setTimeout(function () { t.classList.remove("sg-attiva"); location.hash = dest.slice(1); }, 280);
    }

    if (conMouse) {
      sezione.addEventListener("pointermove", muovi);
      sezione.addEventListener("pointerleave", esci);
    }
    tilesEl.addEventListener("click", clic);
    this.distruggi = function () {
      esci();
      sezione.removeEventListener("pointermove", muovi);
      sezione.removeEventListener("pointerleave", esci);
      tilesEl.removeEventListener("click", clic);
    };
  }

  /* ===== Card di tutte le pagine: inclinazione leggera + entrata allo scorrimento ===== */
  var SCHEDA = /\brounded-\[(1[4-9]|2[0-2])px\]/;
  var SUPERFICIE = /\b(surface-\d|surface-dark|bg-white|bg-pale|bg-mist|border)\b/;
  var entrata = "IntersectionObserver" in window ? new IntersectionObserver(function (voci) {
    voci.forEach(function (v) {
      if (!v.isIntersecting) return;
      v.target.classList.add("sg-entra");
      v.target.classList.remove("sg-nascosta");
      entrata.unobserve(v.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  function preparaSchede() {
    if (riduciMovimento) return;
    var candidate = Array.prototype.filter.call(document.querySelectorAll("main div, main li, main a"), function (el) {
      var c = typeof el.className === "string" ? el.className : "";
      if (el.dataset.sgScheda || !SCHEDA.test(c) || !SUPERFICIE.test(c)) return false;
      if (c.indexOf("#0A2391") >= 0 || el.closest(".tiles, .marquee, .sg-team, .sg-prenota-sezione")) return false;
      return el.offsetWidth > 0 && el.offsetWidth <= 640;
    });
    candidate.forEach(function (el) {
      // se una card ne contiene altre, si muovono solo quelle interne
      if (candidate.some(function (o) { return o !== el && el.contains(o); })) return;
      el.dataset.sgScheda = "1";
      el.classList.add("sg-scheda");
      if (entrata && el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("sg-nascosta");
        entrata.observe(el);
      }
      if (!conMouse) return;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--sg-sy", (x * 6).toFixed(2) + "deg");
        el.style.setProperty("--sg-sx", (-y * 6).toFixed(2) + "deg");
        el.classList.add("sg-sopra");
      });
      el.addEventListener("pointerleave", function () {
        el.style.removeProperty("--sg-sx");
        el.style.removeProperty("--sg-sy");
        el.classList.remove("sg-sopra");
      });
    });
  }

  /* ===== Team: 8 card foto a scorrimento, in home dopo "Cosa ricevi" =====
     Per ogni persona: foto (percorso o URL dell'immagine), nome, ruolo e area
     (ai | marketing | software | studio: colore della card quando manca la foto).
     SEGNAPOSTO: nomi e ruoli qui sotto sono di riempimento, da sostituire con quelli veri.
     MOSTRA_TEAM: false nasconde la sezione finché non ci sono le foto vere. */
  var MOSTRA_TEAM = false;
  var TEAM = [
    { foto: "", nome: "Giulia R.", ruolo: "Performance marketing", area: "marketing" },
    { foto: "", nome: "Marco B.", ruolo: "AI engineer", area: "ai" },
    { foto: "", nome: "Sara T.", ruolo: "Sviluppo software", area: "software" },
    { foto: "", nome: "Luca P.", ruolo: "Strategia e partner", area: "studio" },
    { foto: "", nome: "Elena M.", ruolo: "Social e contenuti", area: "marketing" },
    { foto: "", nome: "Davide C.", ruolo: "Automazioni e dati", area: "ai" },
    { foto: "", nome: "Chiara F.", ruolo: "Web e UX", area: "software" },
    { foto: "", nome: "Andrea L.", ruolo: "Finanza agevolata", area: "studio" }
  ];
  var AREE = {
    ai: { nome: "AI", da: "#0689ff", a: "#0a2391" },
    marketing: { nome: "Marketing", da: "#d21205", a: "#5c0a12" },
    software: { nome: "Software", da: "#2f6b33", a: "#0f2a1a" },
    studio: { nome: "Studio", da: "#0a2391", a: "#040f4d" }
  };
  var TESTI = {
    it: { etichetta: "Il team", titolo: "Le persone dietro Studio Galilei", sotto: "Marketing, AI e software: chi lavora ogni giorno sui progetti dei nostri partner." },
    en: { etichetta: "The team", titolo: "The people behind Studio Galilei", sotto: "Marketing, AI and software: the people working on our partners' projects every day." }
  };
  var SAGOMA = '<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c.6-4.6 4.1-7.4 8.5-7.4s7.9 2.8 8.5 7.4z"/></svg>';

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function htmlPersona(p, nascosta) {
    var area = AREE[p.area] || AREE.studio;
    var iniziali = p.nome.split(/\s+/).map(function (x) { return x.charAt(0); }).join("").slice(0, 2).toUpperCase();
    var segnaposto = '<span class="sg-persona-iniziali">' + esc(iniziali) + "</span>" + SAGOMA;
    return '<li class="sg-persona"' + (nascosta ? ' aria-hidden="true"' : "") + '>' +
      '<div class="sg-persona-foto" style="--sg-da:' + area.da + ";--sg-a:" + area.a + '">' +
      (p.foto ? '<img src="' + esc(p.foto) + '" alt="' + (nascosta ? "" : esc(p.nome)) + '" loading="lazy">' : segnaposto) +
      '<span class="sg-persona-area">' + area.nome + "</span></div>" +
      '<div class="sg-persona-testo"><p class="text-[17px] font-semibold text-sg">' + esc(p.nome) + "</p>" +
      '<p class="mt-1 text-[14px] text-ink/60">' + esc(p.ruolo) + "</p></div></li>";
  }

  function lingua() {
    var en = document.querySelector('header button[lang="en"]');
    return en && en.getAttribute("aria-pressed") === "true" ? "en" : "it";
  }

  function preparaTeam() {
    var cta = document.querySelector('main a[class*="#0A2391"]');
    var sezioneCta = cta && cta.closest("main > section");
    var esistente = document.querySelector(".sg-team-sezione");
    var lng = lingua();
    // solo in home (la sezione "Cosa ricevi" è subito prima); altrove la si toglie
    if (!MOSTRA_TEAM || !sezioneCta || !document.querySelector("main .tiles")) {
      if (esistente) esistente.remove();
      return;
    }
    if (esistente && esistente.previousElementSibling === sezioneCta && esistente.dataset.lingua === lng) return;
    if (esistente) esistente.remove();

    var t = TESTI[lng];
    var card = TEAM.map(function (p) { return htmlPersona(p, false); }).join("") +
      TEAM.map(function (p) { return htmlPersona(p, true); }).join(""); // copia per lo scorrimento continuo
    var s = document.createElement("section");
    s.className = "sg-team-sezione bg-white py-20 md:py-28";
    s.dataset.lingua = lng;
    s.setAttribute("aria-label", t.etichetta);
    s.innerHTML =
      '<div class="mx-auto w-full max-w-[1200px] px-6 md:px-10"><div class="max-w-[44rem]">' +
      '<p class="mb-4 text-[14px] font-medium text-ai">' + t.etichetta + "</p>" +
      '<h2 class="text-[2rem] font-semibold leading-[1.12] tracking-[-0.025em] text-balance md:text-[2.6rem] text-sg">' + t.titolo + "</h2>" +
      '<p class="mt-5 text-[17px] leading-[1.7] text-ink/65">' + t.sotto + "</p></div></div>" +
      '<div class="sg-team sg-team-bordo mt-10"><ul class="sg-team-pista">' + card + "</ul></div>";
    sezioneCta.after(s);
  }

  /* ===== Anteprima portale: KPI che contano, grafico che si disegna ===== */
  function preparaPortale() {
    var fig = document.querySelector('main figure[aria-label*="portale"]');
    if (!fig || fig.dataset.sgPortale) return;
    fig.dataset.sgPortale = "1";
    var linea = fig.querySelector("svg path");
    var svg = linea && linea.ownerSVGElement;
    var ns = "http://www.w3.org/2000/svg";

    // area sfumata sotto la linea e punto finale che pulsa
    if (svg) {
      var d = linea.getAttribute("d");
      var fine = d.trim().split(/\s+/).slice(-2).map(parseFloat);
      var defs = document.createElementNS(ns, "defs");
      defs.innerHTML = '<linearGradient id="sg-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0689FF" stop-opacity=".22"/><stop offset="1" stop-color="#0689FF" stop-opacity="0"/></linearGradient>';
      var area = document.createElementNS(ns, "path");
      area.setAttribute("d", d + " L" + fine[0] + " 70 L0 70 Z");
      area.setAttribute("fill", "url(#sg-area)");
      area.setAttribute("class", "sg-portale-area");
      var punto = document.createElementNS(ns, "circle");
      punto.setAttribute("cx", fine[0]); punto.setAttribute("cy", fine[1]); punto.setAttribute("r", "4.5");
      punto.setAttribute("class", "sg-portale-punto");
      svg.insertBefore(defs, svg.firstChild);
      svg.insertBefore(area, linea);
      svg.appendChild(punto);
      var lun = linea.getTotalLength();
      linea.style.setProperty("--sg-lun", lun);
      linea.classList.add("sg-portale-linea");
    }

    // valori KPI: si anima il nodo di testo esistente (React continua a gestirlo)
    var valori = Array.prototype.filter.call(fig.querySelectorAll("p"), function (p) {
      return /font-semibold/.test(p.className) && p.firstChild && p.firstChild.nodeType === 3;
    });
    var originali = valori.map(function (p) { return p.firstChild.nodeValue; });

    function conta() {
      var t0 = performance.now(), durata = 1400;
      function passo(now) {
        var k = Math.min(1, (now - t0) / durata);
        var e = 1 - Math.pow(1 - k, 3);
        valori.forEach(function (p, i) {
          var o = originali[i];
          // "+18%" / "−9%" / "7/9": anima il primo numero, il resto resta com'è
          p.firstChild.nodeValue = o.replace(/\d+/, function (n) { return String(Math.round(parseInt(n, 10) * e)); });
        });
        if (k < 1) requestAnimationFrame(passo);
        else valori.forEach(function (p, i) { p.firstChild.nodeValue = originali[i]; });
      }
      requestAnimationFrame(passo);
    }

    if (riduciMovimento) return;
    fig.classList.add("sg-portale");
    var io = new IntersectionObserver(function (voci) {
      if (!voci[0].isIntersecting) return;
      io.disconnect();
      fig.classList.add("sg-portale-via");
      conta();
    }, { threshold: 0.4 });
    io.observe(fig);
  }

  /* ===== Prenotazione chiamata: calendario Google sotto "Caffè o videochiamata?" ===== */
  var CALENDARIO = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3IEaJVbjMTE-_AwwhPk2C3G1ye1CePkAmbz1nfaqYOcFLdN2xdHYCWsLY6t6q1SuFZ8e2nCrxs?gv=true";
  var TESTI_PRENOTA = {
    it: { etichetta: "Chiamata conoscitiva", titolo: "Prenota una chiamata conoscitiva", sotto: "Scegli giorno e orario tra le disponibilità aggiornate in tempo reale. Ricevi subito la conferma con il link per la videochiamata.", apri: "Apri il calendario in una nuova scheda" },
    en: { etichetta: "Intro call", titolo: "Book an intro call", sotto: "Pick a day and time from our live availability. You'll get a confirmation with the video call link right away.", apri: "Open the calendar in a new tab" }
  };

  function preparaPrenotazione() {
    var h = Array.prototype.find.call(document.querySelectorAll("main h2"), function (x) {
      return /Caffè o videochiamata|Coffee or video call/i.test(x.textContent);
    });
    var sezioneCaffe = h && h.closest("main > section");
    var esistente = document.querySelector(".sg-prenota-sezione");
    var lng = lingua();
    if (!sezioneCaffe || !document.querySelector("main .tiles")) {
      if (esistente) esistente.remove();
      return;
    }
    if (esistente && esistente.previousElementSibling === sezioneCaffe && esistente.dataset.lingua === lng) return;
    if (esistente) esistente.remove();

    var t = TESTI_PRENOTA[lng];
    var s = document.createElement("section");
    s.id = "sg-prenota";
    s.className = "sg-prenota-sezione bg-white pb-20 pt-4 md:pb-28";
    s.dataset.lingua = lng;
    s.setAttribute("aria-label", t.titolo);
    s.innerHTML =
      '<div class="mx-auto w-full max-w-[1200px] px-6 md:px-10">' +
      '<div class="max-w-[44rem]"><p class="mb-4 text-[14px] font-medium text-ai">' + t.etichetta + "</p>" +
      '<h2 class="text-[2rem] font-semibold leading-[1.12] tracking-[-0.025em] text-balance md:text-[2.6rem] text-sg">' + t.titolo + "</h2>" +
      '<p class="mt-5 text-[17px] leading-[1.7] text-ink/65">' + t.sotto + "</p></div>" +
      '<div class="sg-prenota-box surface-2 mt-10 overflow-hidden rounded-[18px] border border-sg/10 bg-white">' +
      '<iframe src="' + CALENDARIO + '" title="' + t.titolo + '" loading="lazy"></iframe></div>' +
      '<p class="mt-4 text-right text-[14px]"><a class="link-underline font-medium text-sg" href="' + CALENDARIO.replace("?gv=true", "") + '" target="_blank" rel="noopener">' + t.apri + "</a></p>" +
      "</div>";
    sezioneCaffe.after(s);
  }

  // il pulsante dell'hero porta al calendario invece che alla pagina contatti
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('section.bg-sg-deep a[href="#/contatti"]');
    var dest = document.getElementById("sg-prenota");
    if (!a || !dest) return;
    e.preventDefault();
    e.stopPropagation();
    dest.scrollIntoView({ behavior: riduciMovimento ? "auto" : "smooth", block: "start" });
  }, true);

  /* ===== Timbri Studio Galilei attorno a "Scopri come possiamo applicarlo alla tua realtà" ===== */
  // percorso del marchio (albero), inserito da costruisci.py; spazio di coordinate 974 x 1132
  var MARCHIO = "__MARCHIO_PATH__";
  var TIMBRI = [
    { forma: "tondo", colore: "#061773", testo: "STUDIO GALILEI • MARKETING • AI • SOFTWARE • ", pos: "sg-timbro-1", rot: -14 },
    { forma: "tondo", colore: "#d21205", testo: "MISURA CIÒ CHE È MISURABILE • STUDIO GALILEI • ", pos: "sg-timbro-2", rot: 12 },
    { forma: "rettangolo", colore: "#0689ff", righe: ["STUDIO GALILEI", "PARTNER DI CRESCITA"], pos: "sg-timbro-3", rot: -7 },
    { forma: "tondo", colore: "#2f6b33", testo: "METODO GALILEI • OSSERVABILE • REPLICABILE • ", pos: "sg-timbro-4", rot: 18 }
  ];
  var nTimbro = 0;

  function svgTimbro(t) {
    var id = "sg-t" + (++nTimbro);
    var inchiostro = '<filter id="' + id + 'f" x="-10%" y="-10%" width="120%" height="120%">' +
      '<feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="' + nTimbro * 7 + '" result="r"/>' +
      '<feColorMatrix in="r" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.5" result="m"/>' +
      '<feComposite in="SourceGraphic" in2="m" operator="in" result="c"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="' + nTimbro + '" result="d"/>' +
      '<feDisplacementMap in="c" in2="d" scale="2.2"/></filter>';
    var albero = function (cx, cy, h) {
      var s = h / 1132;
      return '<path fill-rule="evenodd" d="' + MARCHIO + '" transform="translate(' + (cx - 487 * s) + " " + (cy - 566 * s) + ") scale(" + s + ')"/>';
    };
    if (t.forma === "tondo") {
      return '<svg viewBox="0 0 120 120" aria-hidden="true"><defs>' + inchiostro +
        '<path id="' + id + 'c" d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0"/></defs>' +
        '<g fill="' + t.colore + '" stroke="' + t.colore + '" filter="url(#' + id + 'f)">' +
        '<circle cx="60" cy="60" r="56" fill="none" stroke-width="3"/>' +
        '<circle cx="60" cy="60" r="50.5" fill="none" stroke-width="1"/>' +
        '<circle cx="60" cy="60" r="31" fill="none" stroke-width="1.2"/>' +
        '<text font-size="9.4" font-weight="600" letter-spacing="1.1" stroke="none" font-family="Poppins, sans-serif">' +
        '<textPath href="#' + id + 'c" textLength="262" lengthAdjust="spacing">' + esc(t.testo) + "</textPath></text>" +
        '<g stroke="none">' + albero(60, 60, 38) + "</g></g></svg>";
    }
    return '<svg viewBox="0 0 170 74" aria-hidden="true"><defs>' + inchiostro + "</defs>" +
      '<g fill="' + t.colore + '" stroke="' + t.colore + '" filter="url(#' + id + 'f)">' +
      '<rect x="3" y="3" width="164" height="68" rx="6" fill="none" stroke-width="3"/>' +
      '<rect x="8.5" y="8.5" width="153" height="57" rx="3" fill="none" stroke-width="1"/>' +
      '<g stroke="none">' + albero(32, 37, 40) + "</g>" +
      '<line x1="56" y1="15" x2="56" y2="59" stroke-width="1"/>' +
      '<text x="111" y="34" text-anchor="middle" font-size="12.5" font-weight="600" letter-spacing="1" stroke="none" font-family="Poppins, sans-serif">' + esc(t.righe[0]) + "</text>" +
      '<text x="111" y="51" text-anchor="middle" font-size="8.2" font-weight="600" letter-spacing="1.4" stroke="none" font-family="Poppins, sans-serif">' + esc(t.righe[1]) + "</text>" +
      "</g></svg>";
  }

  function preparaTimbri() {
    var cta = Array.prototype.find.call(document.querySelectorAll('main a[class*="#0A2391"]'), function (a) {
      return /Scopri come possiamo applicarlo|how we can apply/i.test(a.textContent);
    });
    var box = cta && cta.parentElement;
    if (!box || box.querySelector(".sg-timbri")) return;
    var wrap = document.createElement("div");
    wrap.className = "sg-timbri";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = TIMBRI.map(function (t, i) {
      return '<span class="sg-timbro ' + t.pos + '" style="--sg-rot:' + t.rot + "deg;--sg-rit:" + (i * 0.18) + 's">' + svgTimbro(t) + "</span>";
    }).join("");
    box.classList.add("sg-timbri-box");
    box.insertBefore(wrap, cta);

    if (riduciMovimento || !("IntersectionObserver" in window)) { wrap.classList.add("sg-timbrati"); return; }
    var io = new IntersectionObserver(function (voci) {
      if (!voci[0].isIntersecting) return;
      io.disconnect();
      wrap.classList.add("sg-timbrati");
    }, { threshold: 0.5 });
    io.observe(box);
  }

  /* ===== Home: barra in alto trasparente sul cielo, blu notte quando si scorre ===== */
  function aggiornaScroll() {
    var header = document.querySelector("header.sg-header-cielo");
    if (header) header.classList.toggle("sg-scrollato", window.scrollY > 24);
  }
  function preparaHeader() {
    var header = document.querySelector("#root header");
    if (!header) return;
    header.classList.toggle("sg-header-cielo", !!document.querySelector("main .tiles"));
    aggiornaScroll();
  }
  window.addEventListener("scroll", aggiornaScroll, { passive: true });

  /* ===== "Scopri i servizi" sopra le tre card dell'hero ===== */
  function preparaScopri() {
    var stage = document.querySelector("main .tiles-stage");
    var lng = lingua();
    var esistente = document.querySelector(".sg-scopri");
    if (!stage) return;
    if (esistente && esistente.nextElementSibling === stage && esistente.dataset.lingua === lng) return;
    if (esistente) esistente.remove();
    var a = document.createElement("a");
    a.className = "sg-scopri";
    a.href = "#/servizi";
    a.dataset.lingua = lng;
    a.textContent = lng === "en" ? "Explore our services" : "Scopri i servizi";
    stage.parentNode.insertBefore(a, stage);
    centraScopri();
    // di nuovo a impaginazione e font stabili
    setTimeout(centraScopri, 700);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(centraScopri);
  }

  // le card sono disposte in diagonale: la scritta va centrata sul gruppo di card, non sul contenitore
  function centraScopri() {
    var a = document.querySelector(".sg-scopri");
    var tiles = document.querySelectorAll("main .tile");
    if (!a || !tiles.length) return;
    var sx = Infinity, dx = -Infinity;
    Array.prototype.forEach.call(tiles, function (t) {
      var r = t.getBoundingClientRect();
      sx = Math.min(sx, r.left); dx = Math.max(dx, r.right);
    });
    // centro attuale della scritta, tolto lo spostamento già applicato
    var r = a.getBoundingClientRect();
    var attuale = parseFloat(a.style.getPropertyValue("--sg-sposta")) || 0;
    var centro = (r.left + r.right) / 2 - attuale;
    a.style.setProperty("--sg-sposta", Math.round((sx + dx) / 2 - centro) + "px");
  }
  window.addEventListener("resize", function () { setTimeout(centraScopri, 100); });

  /* ===== Spazio in trasparenza nelle sezioni chiare: galassie, stelle, orbite, costellazioni ===== */
  function casuale(seme) {
    return function () { seme = (seme * 16807) % 2147483647; return (seme - 1) / 2147483646; };
  }

  function svgGalassia(r, rnd, colore) {
    var punti = "";
    for (var braccio = 0; braccio < 2; braccio++) {
      for (var i = 0; i < 70; i++) {
        var th = i / 70 * Math.PI * 3.2 + braccio * Math.PI;
        var rr = 6 + Math.pow(i / 70, 1.1) * r;
        var x = Math.cos(th) * rr + (rnd() - .5) * 7;
        var y = Math.sin(th) * rr + (rnd() - .5) * 7;
        var a = (0.7 * (1 - i / 80)).toFixed(2);
        punti += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (0.6 + rnd() * 1.5).toFixed(1) + '" fill-opacity="' + a + '"/>';
      }
    }
    return '<g fill="' + colore + '">' +
      '<ellipse rx="' + (r * 0.32) + '" ry="' + (r * 0.32) + '" fill="url(#sg-nucleo)"/>' + punti + "</g>";
  }

  function decoraSezione(sez, n) {
    var rnd = casuale(n * 9301 + 49297);
    // disegno nelle proporzioni reali della sezione, così niente finisce tagliato
    var w = Math.max(360, Math.round(sez.offsetWidth)), h = Math.max(300, Math.round(sez.offsetHeight)), i, out = "";
    var stretto = w < 768;
    // zone occupate da testi, card, immagini e pulsanti: lì non si disegna niente
    var base = sez.getBoundingClientRect(), zone = [];
    Array.prototype.forEach.call(sez.querySelectorAll("h1, h2, h3, h4, p, a, button, li, figure, img, iframe, form, ol, ul, table, [class*='rounded-']"), function (el) {
      if (el.closest(".sg-spazio")) return;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      zone.push([r.left - base.left - 28, r.top - base.top - 28, r.right - base.left + 28, r.bottom - base.top + 28]);
    });
    function libero(x, y) {
      for (var k = 0; k < zone.length; k++) {
        var z = zone[k];
        if (x > z[0] && x < z[2] && y > z[1] && y < z[3]) return false;
      }
      return true;
    }
    // polvere di stelle, solo negli spazi vuoti
    for (i = 0; i < Math.round(w * h / 14000); i++) {
      var sx = rnd() * w, sy = rnd() * h, sr = 0.6 + rnd() * 1.1, so = 0.12 + rnd() * 0.2, sd = rnd() * 4;
      if (!libero(sx, sy)) continue;
      out += '<circle class="' + (i % 6 === 0 ? "sg-brilla" : "") + '" style="animation-delay:' + sd.toFixed(1) + 's" cx="' + sx.toFixed(0) + '" cy="' + sy.toFixed(0) + '" r="' + sr.toFixed(1) + '" fill="#061773" fill-opacity="' + so.toFixed(2) + '"/>';
    }
    // una galassia a spirale, alternata a destra e sinistra
    // sul bordo esterno, mezza fuori dalla sezione: non finisce mai sotto i testi
    var gx = (n % 2 ? -0.02 + rnd() * 0.04 : 0.98 + rnd() * 0.04) * w;
    var gy = (0.25 + rnd() * 0.5) * h;
    out += '<g transform="translate(' + gx.toFixed(0) + " " + gy.toFixed(0) + ") rotate(" + (rnd() * 180).toFixed(0) + ') scale(1 .5)"><g class="sg-ruota">' +
      svgGalassia((stretto ? 70 : 120) + rnd() * 50, rnd, n % 3 === 1 ? "#0689ff" : "#061773") + "</g></g>";
    // orbita con pianeta nella parte opposta
    var ox = (n % 2 ? 0.94 : 0.06) * w, oy = (0.7 + rnd() * 0.2) * h, orx = (stretto ? 60 : 120) + rnd() * 50;
    if (libero(ox, oy)) out += '<g transform="translate(' + ox + " " + oy.toFixed(0) + ') rotate(-18)">' +
      '<ellipse rx="' + orx.toFixed(0) + '" ry="' + (orx * 0.32).toFixed(0) + '" fill="none" stroke="#061773" stroke-opacity=".14" stroke-dasharray="2 6"/>' +
      '<g class="sg-orbita" style="--sg-orx:' + orx.toFixed(0) + 'px"><circle r="7" fill="#0689ff" fill-opacity=".28"/></g>' +
      '<circle r="15" fill="url(#sg-pianeta)"/></g>';
    // piccola costellazione, omaggio a Galileo: solo se trova un angolo libero, altrimenti niente
    var passo = stretto ? 30 : 48, pts = null;
    for (var tent = 0; tent < 12 && !pts; tent++) {
      var cx = rnd() * (w - passo * 5), cy = 18 + rnd() * (h - 60), prova = [];
      for (i = 0; i < 5; i++) prova.push([cx + i * passo + (rnd() - .5) * 20, cy + (rnd() - .5) * 24]);
      if (prova.every(function (p) { return libero(p[0], p[1]) && p[1] > 8 && p[1] < h - 8; })) pts = prova;
    }
    if (pts) out += '<polyline points="' + pts.map(function (p) { return p[0].toFixed(0) + "," + p[1].toFixed(0); }).join(" ") + '" fill="none" stroke="#061773" stroke-opacity=".12" stroke-width="1"/>' +
      pts.map(function (p) { return '<circle cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="1.8" fill="#061773" fill-opacity=".28"/>'; }).join("");

    var d = document.createElement("div");
    d.className = "sg-spazio";
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMin slice"><defs>' +
      '<radialGradient id="sg-nucleo"><stop offset="0" stop-color="#0689ff" stop-opacity=".35"/><stop offset="1" stop-color="#0689ff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="sg-pianeta" cx=".35" cy=".35"><stop offset="0" stop-color="#a9c7ff" stop-opacity=".45"/><stop offset="1" stop-color="#061773" stop-opacity=".22"/></radialGradient>' +
      "</defs>" + out + "</svg>";
    sez.classList.add("sg-con-spazio");
    sez.insertBefore(d, sez.firstChild);
  }

  // al cambio di larghezza testi e card si spostano: si ridisegna lo spazio
  var larghezzaSpazio = window.innerWidth;
  window.addEventListener("resize", function () {
    if (Math.abs(window.innerWidth - larghezzaSpazio) < 40) return;
    larghezzaSpazio = window.innerWidth;
    clearTimeout(window.__sgSpazioT);
    window.__sgSpazioT = setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll(".sg-spazio"), function (d) { d.remove(); });
      preparaSpazio();
    }, 250);
  });

  function preparaSpazio() {
    var n = 0;
    Array.prototype.forEach.call(document.querySelectorAll("main > section"), function (sez) {
      n++;
      if (sez.querySelector(":scope > .sg-spazio")) return;
      // solo sezioni chiare (bianco, grigio chiaro, azzurrino)
      var m = getComputedStyle(sez).backgroundColor.match(/\d+(\.\d+)?/g);
      if (!m || (m[3] !== undefined && +m[3] === 0)) return;
      if (+m[0] + +m[1] + +m[2] < 3 * 225) return;
      decoraSezione(sez, n);
    });
  }

  /* ===== Aggancio (l'app è React: le sezioni vengono ricreate a ogni cambio pagina) ===== */
  var cielo = null, card = null, sezioneAttiva = null;

  function controlla() {
    preparaHeader();
    preparaTeam();
    preparaPrenotazione();
    preparaPortale();
    preparaTimbri();
    preparaScopri();
    preparaSpazio();
    preparaSchede();
    var tilesEl = document.querySelector("main .tiles");
    var sezione = tilesEl ? tilesEl.closest("section") : null;
    if (sezione === sezioneAttiva && (!cielo || cielo.canvas.isConnected)) return;

    if (cielo) { cielo.distruggi(); if (cielo.canvas.parentNode) cielo.canvas.remove(); cielo = null; }
    if (card) { card.distruggi(); card = null; }
    sezioneAttiva = sezione;
    if (!sezione) return;

    cielo = new Cielo(sezione);
    card = new Card(sezione, tilesEl);
  }

  var attesa = 0;
  function pianifica() {
    if (attesa) return;
    // setTimeout e non requestAnimationFrame: funziona anche se la scheda è in background
    attesa = setTimeout(function () { attesa = 0; controlla(); }, 30);
  }

  function inizia() {
    var root = document.getElementById("root");
    if (!root) return;
    new MutationObserver(pianifica).observe(root, { childList: true, subtree: true });
    window.addEventListener("hashchange", pianifica);
    controlla();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inizia);
  else inizia();
})();
