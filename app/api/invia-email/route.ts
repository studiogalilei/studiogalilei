import { z } from "zod";
import { isEmail, LIMITS, sendFormEmail, SUBJECTS, type FormType } from "@/lib/email";

// POST /api/invia-email — { tipo?: "contatto" | "candidatura", replyto?: string, campi: {...}, _honey? }
// Responses: { ok: true } or { ok: false, errore } with the same statuses as the original Vercel Function.

const body = z.looseObject({
  tipo: z.unknown(),
  replyto: z.unknown(),
  campi: z.unknown(),
  _honey: z.unknown(),
});

const fail = (status: number, errore: string, headers?: HeadersInit) =>
  Response.json({ ok: false, errore }, { status, headers });

async function readBody(request: Request): Promise<unknown> {
  const raw = await request.text();
  if ((request.headers.get("content-type") ?? "").includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY non impostata");
    return fail(500, "Configurazione email mancante");
  }

  const parsed = body.safeParse(await readBody(request));
  if (!parsed.success) return fail(400, "Richiesta non valida");
  const { tipo, replyto, campi, _honey } = parsed.data;

  // hidden field filled in: it's a bot, answer ok without sending anything
  if (_honey) return Response.json({ ok: true });

  const type: FormType =
    typeof tipo === "string" && tipo in SUBJECTS ? (tipo as FormType) : "contatto";
  const fields = campi && typeof campi === "object" ? (campi as Record<string, unknown>) : {};
  const rows = Object.entries(fields)
    .slice(0, LIMITS.fields)
    .map(
      ([k, v]) =>
        [String(k).slice(0, LIMITS.key), String(v ?? "").slice(0, LIMITS.value)] as [
          string,
          string,
        ],
    )
    .filter(([, v]) => v.trim() !== "");
  if (!rows.length) return fail(400, "Modulo vuoto");
  if (rows.reduce((n, [k, v]) => n + k.length + v.length, 0) > LIMITS.total)
    return fail(413, "Modulo troppo lungo");

  const replyTo = isEmail(replyto) ? replyto : isEmail(fields.email) ? fields.email : undefined;
  const name = String(fields.nome || fields.nome_cognome || "")
    .replace(/[\r\n]+/g, " ")
    .slice(0, 100)
    .trim();

  const sent = await sendFormEmail(apiKey, { type, rows, replyTo, name });
  return sent ? Response.json({ ok: true }) : fail(502, "Invio non riuscito");
}

const methodNotAllowed = () => fail(405, "Metodo non consentito", { Allow: "POST" });
export {
  methodNotAllowed as GET,
  methodNotAllowed as PUT,
  methodNotAllowed as PATCH,
  methodNotAllowed as DELETE,
};
export { methodNotAllowed as OPTIONS };
