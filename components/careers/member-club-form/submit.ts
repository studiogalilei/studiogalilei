import type { Answers } from "./questions";

// Applications go to Supabase. The publishable key can ONLY insert (row level security):
// it is public by design and cannot read or change anything.
const SUPABASE_URL = "https://tqssfcuzezlczfceqsmk.supabase.co";
const SUPABASE_KEY = "sb_publishable_TIc76XaGtbvZ5Zzgc4tEjQ_OMTmKA0e";
const TABLE = `${SUPABASE_URL}/rest/v1/candidature_member_club`;
const QUEUE_PREFIX = "candidatura_mc_";

export const FORM_VERSION = "member-club-1.0";

const auth = { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY };
const withoutAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const isEmpty = (v: unknown) => v === "" || v == null || (Array.isArray(v) && !v.length);

function insert(body: string) {
  return fetch(TABLE, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...auth, Prefer: "return=minimal" },
    body,
  });
}

/** A copy of the application by email (Resend, through the site's /api/invia-email). */
function emailCopy(row: Record<string, unknown>) {
  const text = (v: unknown): string =>
    Array.isArray(v)
      ? v.map(text).join(", ")
      : v && typeof v === "object"
        ? Object.entries(v)
            .map(([k, x]) => k + ": " + text(x))
            .join(" | ")
        : String(v);
  const campi = Object.fromEntries(Object.entries(row).map(([k, v]) => [k, text(v)]));
  fetch("/api/invia-email", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ tipo: "candidatura", replyto: row.email || "", campi }),
  }).catch(() => {});
}

/**
 * Sends the application. Resolves to an extra closing note to show, if there is something to say
 * (already applied, or saved on this device because the connection failed).
 */
export async function submitApplication(answers: Answers, files: File[]): Promise<string | null> {
  const d: Record<string, unknown> = { ...answers };
  delete d._files;
  d.lingue = ["Italiano", ...((d.lingue as string[]) ?? []).filter((x) => x !== "Solo italiano")];
  d.talenti_altri = ((d.talenti_altri as string[]) ?? []).filter((x) => x !== "Nessun'altra");

  // the specialisation path answers (t_*) all go into `dettaglio`, without empty values
  const dettaglio: Record<string, unknown> = {};
  for (const k of Object.keys(d)) {
    if (!k.startsWith("t_")) continue;
    if (!isEmpty(d[k])) dettaglio[k.slice(2)] = d[k];
    delete d[k];
  }
  // no holes in the database: drop empty values and fields never filled in
  for (const k of Object.keys(d)) {
    if (Array.isArray(d[k])) d[k] = (d[k] as unknown[]).filter((v) => v != null && v !== "");
    if (isEmpty(d[k])) delete d[k];
  }
  d.inviato_il = new Date().toISOString();
  const settori: Record<string, unknown> = {};
  for (const k of Object.keys(d)) {
    if (k.startsWith("settori_") && k !== "settori_macro") {
      settori[k] = d[k];
      delete d[k];
    }
  }

  // portfolio files go to the `portfolio` bucket (the key can only upload)
  const folder = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  const uploaded: string[] = [];
  for (const file of files) {
    const path = `${folder}/${withoutAccents(file.name).replace(/[^\w.\-]+/g, "_")}`;
    try {
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/portfolio/${path}`, {
        method: "POST",
        headers: {
          ...auth,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "false",
        },
        body: file,
      });
      uploaded.push(res.ok ? path : `non caricato: ${file.name}`);
    } catch {
      uploaded.push(`non caricato: ${file.name}`);
    }
  }
  if (uploaded.length) d.portfolio_file = uploaded;

  const row = {
    ...d,
    dettaglio,
    settori,
    origine: new URLSearchParams(location.search).get("da") || "diretto",
  };
  emailCopy(row);

  try {
    const res = await insert(JSON.stringify(row));
    // same email, same specialisation: Studio Galilei already has everything
    if (res.status === 409)
      return "Risulta già una tua candidatura per questa specializzazione, non è necessario inviarla di nuovo.";
    if (!res.ok) throw new Error(res.status + " " + (await res.text()).slice(0, 200));
    return null;
  } catch (error) {
    // if Supabase doesn't answer the application is NOT lost: it stays in the browser
    localStorage.setItem(QUEUE_PREFIX + Date.now(), JSON.stringify(row));
    console.warn("invio fallito, candidatura salvata in locale:", error);
    return "La connessione non ha risposto ma la candidatura è salvata su questo dispositivo. Riapri questa pagina più tardi dallo stesso telefono o computer e la rimandiamo noi.";
  }
}

let retrying = false;

/** Applications left in the browser by a failed submission are retried when the form opens. */
export async function retryQueuedApplications() {
  if (retrying) return; // one pass at a time, or the same application could be inserted twice
  retrying = true;
  try {
    for (const key of Object.keys(localStorage).filter((k) => k.startsWith(QUEUE_PREFIX))) {
      try {
        const res = await insert(localStorage.getItem(key) ?? "");
        if (res.ok || res.status === 409) localStorage.removeItem(key);
      } catch {}
    }
  } finally {
    retrying = false;
  }
}
