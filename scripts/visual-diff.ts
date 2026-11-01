// Compares two screenshot folders produced by visual-baseline.ts and writes diff images.
//
//   node scripts/visual-diff.ts [--baseline .visual-baseline] [--current .visual-current] [--out .visual-diff] [--only <substring>]
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const { values: args } = parseArgs({
  options: {
    baseline: { type: "string", default: ".visual-baseline" },
    current: { type: "string", default: ".visual-current" },
    out: { type: "string", default: ".visual-diff" },
    only: { type: "string" },
    threshold: { type: "string", default: "0.1" }, // % of pixels allowed to differ
  },
});

async function pngs(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const sub of ["pages", "states"]) {
    const d = path.join(dir, sub);
    if (!existsSync(d)) continue;
    for (const f of await readdir(d)) if (f.endsWith(".png")) out.push(`${sub}/${f}`);
  }
  return out.filter((f) => !args.only || f.includes(args.only)).sort();
}

/** Pads an image with white to the given size so pages of different heights can still be compared. */
function pad(img: PNG, width: number, height: number): PNG {
  if (img.width === width && img.height === height) return img;
  const out = new PNG({ width, height });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, Math.min(img.width, width), Math.min(img.height, height), 0, 0);
  return out;
}

const rows: { file: string; percent: number; note: string }[] = [];
for (const file of await pngs(args.baseline!)) {
  const currentFile = path.join(args.current!, file);
  if (!existsSync(currentFile)) {
    rows.push({ file, percent: 100, note: "missing" });
    continue;
  }
  const a = PNG.sync.read(readFileSync(path.join(args.baseline!, file)));
  const b = PNG.sync.read(readFileSync(currentFile));
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const diff = new PNG({ width, height });
  const changed = pixelmatch(
    pad(a, width, height).data,
    pad(b, width, height).data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
    },
  );
  const percent = (changed / (width * height)) * 100;
  const note =
    a.height !== b.height || a.width !== b.width
      ? `size ${a.width}×${a.height} → ${b.width}×${b.height}`
      : "";
  rows.push({ file, percent, note });
  if (changed > 0) {
    await mkdir(path.dirname(path.join(args.out!, file)), { recursive: true });
    await writeFile(path.join(args.out!, file), PNG.sync.write(diff));
  }
}

const limit = Number(args.threshold);
const failing = rows.filter((r) => r.percent > limit);
for (const r of rows) {
  const mark = r.percent > limit ? "✗" : "✓";
  console.log(
    `${mark} ${r.percent.toFixed(3).padStart(8)}%  ${r.file}${r.note ? `  (${r.note})` : ""}`,
  );
}
console.log(`\n${rows.length - failing.length}/${rows.length} within ${limit}%`);
process.exitCode = failing.length ? 1 : 0;
