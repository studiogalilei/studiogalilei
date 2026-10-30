// Vercel Function: i moduli del sito (contatti e candidature Member Club) arrivano per email
// a dramane@studiogalilei.com tramite Resend.
// Variabili d'ambiente su Vercel: RESEND_API_KEY (obbligatoria), RESEND_FROM (facoltativa).
// Il destinatario è fisso qui: chi chiama questa funzione non può scegliere a chi scrivere.

const DESTINATARIO = "dramane@studiogalilei.com";
const MITTENTE = process.env.RESEND_FROM || "Sito Studio Galilei <sito@members.studiogalilei.com>";
const OGGETTI = {
  contatto: "Nuovo contatto dal sito Studio Galilei",
  candidatura: "Nuova candidatura Member Club",
};
const MAX_CAMPI = 80;
const MAX_VALORE = 5000;
const MAX_TOTALE = 60000;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// "nome_cognome" -> "Nome cognome"
const etichetta = (k) => { const t = String(k).replace(/[_-]+/g, " ").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
const emailValida = (e) => typeof e === "string" && e.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(e);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, errore: "Metodo non consentito" });
  }
  const chiave = process.env.RESEND_API_KEY;
  if (!chiave) {
    console.error("RESEND_API_KEY non impostata");
    return res.status(500).json({ ok: false, errore: "Configurazione email mancante" });
  }

  let corpo = req.body;
  if (typeof corpo === "string") { try { corpo = JSON.parse(corpo); } catch (e) { corpo = null; } }
  if (!corpo || typeof corpo !== "object") return res.status(400).json({ ok: false, errore: "Richiesta non valida" });
  // campo nascosto compilato: è un bot, si risponde ok senza inviare
  if (corpo._honey) return res.status(200).json({ ok: true });

  const tipo = OGGETTI[corpo.tipo] ? corpo.tipo : "contatto";
  const campi = corpo.campi && typeof corpo.campi === "object" ? corpo.campi : {};
  const righe = Object.entries(campi)
    .slice(0, MAX_CAMPI)
    .map(([k, v]) => [String(k).slice(0, 80), String(v == null ? "" : v).slice(0, MAX_VALORE)])
    .filter(([, v]) => v.trim() !== "");
  if (!righe.length) return res.status(400).json({ ok: false, errore: "Modulo vuoto" });
  if (righe.reduce((n, [k, v]) => n + k.length + v.length, 0) > MAX_TOTALE) {
    return res.status(413).json({ ok: false, errore: "Modulo troppo lungo" });
  }

  const replyTo = emailValida(corpo.replyto) ? corpo.replyto : (emailValida(campi.email) ? campi.email : undefined);
  const nome = String(campi.nome || campi.nome_cognome || "").replace(/[\r\n]+/g, " ").slice(0, 100).trim();
  const oggetto = OGGETTI[tipo] + (nome ? ": " + nome : "");

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a1a">' +
    '<h2 style="margin:0 0 16px;color:#061773;font-size:18px">' + esc(oggetto) + "</h2>" +
    '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;max-width:640px">' +
    righe.map(([k, v]) =>
      '<tr><td style="border:1px solid #e4e7ed;background:#f7f8fc;font-weight:bold;vertical-align:top;white-space:nowrap">' + esc(etichetta(k)) +
      '</td><td style="border:1px solid #e4e7ed;white-space:pre-wrap">' + esc(v) + "</td></tr>").join("") +
    "</table>" +
    (replyTo ? '<p style="margin-top:16px;font-size:13px;color:#555">Rispondi a questa email per scrivere direttamente a ' + esc(replyTo) + ".</p>" : "") +
    "</div>";
  const testo = oggetto + "\n\n" + righe.map(([k, v]) => etichetta(k) + ": " + v).join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + chiave, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MITTENTE,
        to: [DESTINATARIO],
        subject: oggetto,
        html,
        text: testo,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!r.ok) {
      console.error("Resend ha rifiutato l'invio", r.status, (await r.text()).slice(0, 500));
      return res.status(502).json({ ok: false, errore: "Invio non riuscito" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resend non raggiungibile", e);
    return res.status(502).json({ ok: false, errore: "Invio non riuscito" });
  }
};
