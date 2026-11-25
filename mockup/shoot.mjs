// Fotografa le schermate d'esempio dove non c'è Chrome del Mac: Playwright a 1440x900, scala 2,
// poi webp largo 1800 in public/images/settori. Lo chiama gen.py. Il PNG resta in mockup/out.
import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "out");
const dest = path.join(here, "..", "public", "images", "settori");
const slugs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const local = "/opt/pw-browsers/chromium";

const browser = await chromium.launch(existsSync(local) ? { executablePath: local } : {});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
for (const slug of slugs) {
  await page.goto(pathToFileURL(path.join(out, `${slug}.html`)).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  await sharp(png).resize({ width: 1440 }).toFile(path.join(out, `${slug}.png`));
  await sharp(png).resize({ width: 1800 }).webp({ quality: 84 }).toFile(path.join(dest, `${slug}.webp`));
  console.log("ok", slug);
}
await browser.close();
