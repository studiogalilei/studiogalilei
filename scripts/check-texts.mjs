// Fails when the site's texts carry the marks Dre does not want: a clipped sentence (fewer than
// five words closed by a full stop, inside a text of several sentences), the middle dot used as
// a separator, a long dash used as a pause, an exclamation mark, or a brochure word.
// Run by `npm run lint`. Usage: node scripts/check-texts.mjs
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const BANNED = [
  /\binnovativ[oaie]\b/i,
  /\bsoluzion[ei]\b/i,
  /\b360\s*(gradi|°)/i,
  /\bchiavi in mano\b/i,
  /\bleader\b/i,
  /\beccellenz[ae]\b/i,
  /\bsinergi[ae]\b/i,
  /\bvalore aggiunto\b/i,
  /\binnovative\b/i,
  /(?<!only)\bsolutions?\b/i,
  /\bturnkey\b/i,
  /\bexcellence\b/i,
  /\bsynerg(y|ies)\b/i,
  /\badded value\b/i,
];

/** Texts that are allowed as they are: a proper name, a quotation, a legal formula. */
const ALLOWED = [
  /Only ?Solutions/g,
  // a newspaper's words about a client, quoted
  /leader nazionale del settore/g,
  /national leader in its sector/g,
];

/** Abbreviations whose dot does not end a sentence. */
const ABBR =
  /\b(es|ecc|art|artt|n|nr|p|pag|sig|dott|ing|avv|srl|s\.r\.l|spa|s\.p\.a|inc|ltd|e\.g|i\.e|etc|vs|no|c\.f|p\.iva|d\.lgs|reg|par|lett|cfr|tel|approx)\.$/i;

function sentences(text) {
  const out = [];
  let current = "";
  for (const piece of text.split(/(?<=[.!?…»”"])\s+(?=[A-ZÀ-Ý«“"0-9])/u)) {
    current = current ? `${current} ${piece}` : piece;
    if (ABBR.test(current)) continue;
    out.push(current);
    current = "";
  }
  if (current) out.push(current);
  return out;
}

function problems(raw) {
  // tags and placeholders are not words
  let text = raw
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, "x")
    .replace(/\s+/g, " ")
    .trim();
  for (const ok of ALLOWED) text = text.replace(ok, "Nome");
  const found = [];
  if (text.includes("·")) found.push("punto in mezzo «·»");
  if (/—|\s–\s/.test(text)) found.push("trattino lungo usato come pausa");
  if (/!(?!=)/.test(text)) found.push("punto esclamativo");
  for (const word of BANNED) {
    const hit = text.match(word);
    if (hit) found.push(`parola vietata «${hit[0]}»`);
  }
  const parts = sentences(text);
  if (parts.length > 1) {
    for (const part of parts) {
      const words = part.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
      if (/\.["»”)]?$/.test(part) && !/\.\.\.$/.test(part) && words.length < 5) {
        found.push(`frase spezzata «${part}»`);
      }
    }
  }
  return found;
}

const errors = [];

function walkJson(value, trail, file) {
  if (typeof value === "string") {
    for (const p of problems(value)) errors.push(`${file} › ${trail.join(".")}: ${p}`);
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) walkJson(child, [...trail, key], file);
  }
}

for (const name of readdirSync(path.join(root, "messages")).filter((f) => f.endsWith(".json"))) {
  walkJson(
    JSON.parse(readFileSync(path.join(root, "messages", name), "utf8")),
    [],
    `messages/${name}`,
  );
}

// the data files of the answer pages: every string literal that reads as a text
const landing = path.join(root, "lib", "landing");
for (const name of readdirSync(landing).filter((f) => f.endsWith(".ts"))) {
  const lines = readFileSync(path.join(landing, name), "utf8").split("\n");
  let comment = false;
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("/*")) comment = true;
    const skip = comment || trimmed.startsWith("//") || trimmed.startsWith("*");
    if (trimmed.includes("*/")) comment = false;
    if (skip) return;
    for (const match of line.matchAll(/"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
      const text = (match[1] ?? match[2]).replace(/\$\{[^}]*\}/g, "x").replace(/\\"/g, '"');
      if (!/\s/.test(text) || /^(https?:|\/|@)/.test(text)) continue;
      for (const p of problems(text)) errors.push(`lib/landing/${name}:${i + 1}: ${p}`);
    }
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} testi da correggere (regole in scripts/check-texts.mjs).`);
  process.exit(1);
}
console.log("Testi a posto.");
