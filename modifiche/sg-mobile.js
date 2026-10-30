/* ---- Studio Galilei: "Lavora con noi" porta dritto al modulo del Member Club ---- */
(function () {
  "use strict";
  var ultimo = "";

  // la pagina viene montata da React dopo il cambio di rotta: si aspetta il modulo, poi si scorre
  function vaiAlModulo(tentativi) {
    var el = document.getElementById("candidatura");
    if (!el) {
      if (tentativi > 0) setTimeout(function () { vaiAlModulo(tentativi - 1); }, 100);
      return;
    }
    // dopo lo scrollTo(0, 0) del router
    setTimeout(function () {
      var ridotto = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: ridotto ? "auto" : "smooth", block: "start" });
    }, 350);
  }

  // il router usa l'hash ma cambia rotta con pushState, che non genera eventi: si controlla l'indirizzo
  function controlla() {
    if (location.hash === ultimo) return;
    ultimo = location.hash;
    if (/^#\/lavora-con-noi\/?(\?|$)/.test(location.hash)) vaiAlModulo(40);
  }

  window.addEventListener("hashchange", controlla);
  window.addEventListener("popstate", controlla);
  setInterval(controlla, 250);
  controlla();
})();
