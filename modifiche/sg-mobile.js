/* ---- Studio Galilei: "Lavora con noi" mostra direttamente il modulo del Member Club ---- */
(function () {
  "use strict";
  var ROTTA = /^\/lavora-con-noi\/?$/;
  var paginaAperta = false; // true dopo "Scopri come si lavora in Studio Galilei"
  var eraQui = false;

  function testo(it, en) { return /^en/i.test(document.documentElement.lang) ? en : it; }

  // sotto il modulo: link per vedere anche la pagina di presentazione
  function linkPagina() {
    var form = document.getElementById("candidatura");
    if (!form || document.getElementById("sg-lcn-pagina")) return;
    var p = document.createElement("p");
    p.id = "sg-lcn-pagina";
    p.className = "sg-lcn-pagina";
    var a = document.createElement("a");
    a.href = "/lavora-con-noi";
    a.textContent = testo("Scopri come si lavora in Studio Galilei", "Discover how we work at Studio Galilei");
    a.addEventListener("click", function (e) {
      e.preventDefault();
      paginaAperta = true;
      aggiorna();
      window.scrollTo(0, 0);
    });
    p.appendChild(a);
    form.insertAdjacentElement("afterend", p);
  }

  function aggiorna() {
    var qui = ROTTA.test(location.pathname);
    if (qui !== eraQui) { paginaAperta = false; eraQui = qui; }
    var solo = qui && !paginaAperta;
    document.body.classList.toggle("sg-lcn-solo-modulo", solo);
    var p = document.getElementById("sg-lcn-pagina");
    if (qui && !p) linkPagina();
    if (p) p.hidden = !solo;
  }

  // il router cambia rotta con pushState, che non genera eventi: si osserva anche la pagina
  var attesa = 0;
  function pianifica() {
    if (attesa) return;
    attesa = setTimeout(function () { attesa = 0; aggiorna(); }, 0);
  }
    window.addEventListener("popstate", aggiorna);
  var root = document.getElementById("root");
  if (root) new MutationObserver(pianifica).observe(root, { childList: true, subtree: true });
  setInterval(aggiorna, 500);
  aggiorna();
})();
