// Migration-only: serves the original static site in legacy/ the way Vercel does
// (vercel.json redirect + rewrite, /platform/ index, /api/invia-email function).
// Resend is mocked: MOCK_RESEND=ok (default) | fail | throw. Removed in Phase 5.
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../legacy");
const port = Number(process.env.PORT ?? 4100);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json" };

await writeFile(path.join(root, "package.json"), '{ "type": "commonjs" }\n');
process.env.RESEND_API_KEY ??= "re_test_dummy";
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).startsWith("https://api.resend.com/")) {
    const mode = process.env.MOCK_RESEND ?? "ok";
    console.log("[resend mock]", mode, init?.body?.slice(0, 300));
    if (mode === "throw") throw new Error("mock network error");
    return new Response(mode === "ok" ? '{"id":"mock"}' : '{"message":"mock failure"}', { status: mode === "ok" ? 200 : 422 });
  }
  return realFetch(url, init);
};
const sendEmail = createRequire(import.meta.url)(path.join(root, "api/invia-email.js"));

const rewrite = /^\/((?!api(?:\/|$)|platform(?:\/|$)|.*\..*).*)$/;

async function serveFile(res, file, status = 200) {
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(status, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404");
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = decodeURIComponent(url.pathname);

  if (p === "/index.html") {
    res.writeHead(308, { Location: "/" + url.search });
    return res.end();
  }
  if (p === "/api/invia-email") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString();
    let body = raw;
    if ((req.headers["content-type"] ?? "").includes("application/json")) {
      try { body = JSON.parse(raw); } catch { body = raw; }
    }
    const shim = Object.assign(Object.create(null), {
      method: req.method, headers: req.headers, body,
    });
    const out = {
      statusCode: 200,
      status(c) { this.statusCode = c; return this; },
      setHeader(k, v) { res.setHeader(k, v); },
      json(o) { res.writeHead(this.statusCode, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify(o)); },
    };
    return sendEmail(shim, out);
  }
  if (p === "/platform" || p.startsWith("/platform/")) return serveFile(res, path.join(root, p));
  if (rewrite.test(p)) return serveFile(res, path.join(root, "index.html"));
  return serveFile(res, path.join(root, p));
}).listen(port, () => console.log(`legacy site on http://localhost:${port}`));
