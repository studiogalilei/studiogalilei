import "server-only";

// Website forms (contact and Member Club applications) are emailed through Resend.
// The recipient is fixed here: callers of the API cannot choose who receives the email.
const RECIPIENT = "dramane@studiogalilei.com";
const DEFAULT_SENDER = "Sito Studio Galilei <sito@members.studiogalilei.com>";

export const SUBJECTS = {
  contatto: "Nuovo contatto dal sito Studio Galilei",
  candidatura: "Nuova candidatura Member Club",
} as const;

export type FormType = keyof typeof SUBJECTS;

export const LIMITS = { fields: 80, key: 80, value: 5000, total: 60000 };

export type FormEmail = {
  type: FormType;
  rows: [label: string, value: string][];
  replyTo?: string;
  name: string;
};

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** "nome_cognome" -> "Nome cognome" */
const label = (key: string) => {
  const text = key.replace(/[_-]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const isEmail = (value: unknown): value is string =>
  typeof value === "string" &&
  value.length <= 254 &&
  /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);

function compose({ type, rows, replyTo, name }: FormEmail) {
  const subject = SUBJECTS[type] + (name ? ": " + name : "");
  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a1a">' +
    '<h2 style="margin:0 0 16px;color:#061773;font-size:18px">' +
    escapeHtml(subject) +
    "</h2>" +
    '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;max-width:640px">' +
    rows
      .map(
        ([k, v]) =>
          '<tr><td style="border:1px solid #e4e7ed;background:#f7f8fc;font-weight:bold;vertical-align:top;white-space:nowrap">' +
          escapeHtml(label(k)) +
          '</td><td style="border:1px solid #e4e7ed;white-space:pre-wrap">' +
          escapeHtml(v) +
          "</td></tr>",
      )
      .join("") +
    "</table>" +
    (replyTo
      ? '<p style="margin-top:16px;font-size:13px;color:#555">Rispondi a questa email per scrivere direttamente a ' +
        escapeHtml(replyTo) +
        ".</p>"
      : "") +
    "</div>";
  const text = subject + "\n\n" + rows.map(([k, v]) => label(k) + ": " + v).join("\n");
  return { subject, html, text };
}

/** Sends the email; resolves to false (and logs why) if Resend refuses it or is unreachable. */
export async function sendFormEmail(apiKey: string, email: FormEmail): Promise<boolean> {
  const { subject, html, text } = compose(email);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_SENDER,
        to: [RECIPIENT],
        subject,
        html,
        text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend ha rifiutato l'invio", res.status, (await res.text()).slice(0, 500));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend non raggiungibile", error);
    return false;
  }
}
