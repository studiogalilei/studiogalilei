// Deterministic screenshots of every page (4 widths × IT/EN) plus interactive states,
// and the rendered HTML / <head> of each page, for pixel-diffing two versions of the site.
//
//   node scripts/visual-baseline.ts --base http://localhost:3000 --out .visual-current
//   node scripts/visual-baseline.ts --target legacy --base http://localhost:4100 --out .visual-baseline
//   options: --only <substring>  (filter shot names)   --jobs <n>  (parallel pages, default 4)
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { parseArgs } from "node:util";
import {
  chromium,
  type Browser,
  type Page,
  type FrameLocator,
  type Locator,
} from "@playwright/test";

const { values: args } = parseArgs({
  options: {
    target: { type: "string", default: "next" },
    base: { type: "string", default: "http://localhost:3000" },
    out: { type: "string", default: ".visual-current" },
    only: { type: "string" },
    jobs: { type: "string", default: "4" },
  },
});
const legacy = args.target === "legacy";
const base = args.base!;
const out = path.resolve(args.out!);

type Lang = "it" | "en";
type PageDef = {
  id: string;
  path: string;
  legacyPath?: string;
  langs?: Lang[];
};

const PAGES: PageDef[] = [
  { id: "home", path: "/" },
  { id: "chi-siamo", path: "/chi-siamo" },
  { id: "servizi", path: "/servizi" },
  { id: "servizi-marketing", path: "/servizi/marketing" },
  {
    id: "servizi-intelligenza-artificiale",
    path: "/servizi/intelligenza-artificiale",
  },
  { id: "servizi-sviluppo-software", path: "/servizi/sviluppo-software" },
  { id: "servizi-google-ads", path: "/servizi/google-ads" },
  { id: "casi-studio", path: "/casi-studio" },
  { id: "casi-studio-tour-operator", path: "/casi-studio/tour-operator" },
  { id: "casi-studio-dan-ink", path: "/casi-studio/dan-ink" },
  { id: "casi-studio-onlysolutions", path: "/casi-studio/onlysolutions" },
  { id: "lavora-con-noi", path: "/lavora-con-noi" },
  { id: "contatti", path: "/contatti" },
  { id: "privacy", path: "/privacy" },
  {
    id: "tour-operator",
    path: "/tour-operator",
    legacyPath: "/tour-operator-v2.html",
  },
  {
    id: "platform",
    path: "/platform",
    legacyPath: "/platform/",
    langs: ["it"],
  },
];
const WIDTHS = [375, 768, 1280, 1920];
const START = new Date("2026-06-15T10:00:00Z");

const urlFor = (p: PageDef, lang: Lang) =>
  `${base}${legacy ? (p.legacyPath ?? p.path) : p.path}?lang=${lang}`;

async function preparePage(browser: Browser, width: number, lang: Lang, height = 900) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    locale: lang === "it" ? "it-IT" : "en-US",
  });
  const page = await context.newPage();
  await page.clock.install({ time: START });
  await page.clock.pauseAt(new Date(START.getTime() + 1000));
  // external, time-dependent or side-effecting requests are stubbed identically for both sites
  await page.route(/calendar\.google\.com/, (r) =>
    r.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>calendar</title>",
    }),
  );
  await page.route(/supabase\.co/, (r) => r.fulfill({ status: 201, json: {} }));
  await page.route("**/api/invia-email", (r) => r.fulfill({ json: { ok: true } }));
  page.on("pageerror", (e) => console.warn(`  [pageerror] ${page.url()}: ${e.message}`));
  page.on(
    "console",
    (m) =>
      m.type() === "error" &&
      console.warn(`  [console.error] ${page.url()}: ${m.text().slice(0, 200)}`),
  );
  return page;
}

/** Waits for fonts and images everywhere (including the legacy Member Club iframe). */
async function settle(page: Page) {
  for (const frame of page.frames()) {
    const ready = frame
      .evaluate(async () => {
        await document.fonts.ready;
        // lazy images that haven't started loading have no currentSrc yet
        await Promise.all(
          Array.from(document.images, (img) =>
            img.complete || !img.currentSrc ? null : img.decode().catch(() => null),
          ),
        );
      })
      .catch(() => {});
    // page timers are faked, so the timeout lives on the Node side
    await Promise.race([ready, new Promise((r) => setTimeout(r, 10_000))]);
  }
  await page.clock.runFor(600);
}

/** Scrolls through the page so lazy images load and in-view effects run to completion, then back to the top. */
async function load(page: Page, url: string) {
  await page.goto(url, { waitUntil: "load" });
  await page.clock.runFor(1000);
  await settle(page);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = page.viewportSize()!.height / 2;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    // real time too, so the browser renders a frame and IntersectionObservers fire
    await page.waitForTimeout(60);
    await page.clock.runFor(150);
  }
  await page.clock.runFor(4000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.clock.runFor(1000);
  await settle(page);
}

async function shoot(page: Page, file: string, fullPage = true) {
  await mkdir(path.dirname(file), { recursive: true });
  await page.screenshot({
    path: file,
    fullPage,
    animations: "disabled",
    caret: "hide",
  });
}

const hashData = (href: string) =>
  href.startsWith("data:")
    ? `${href.slice(0, href.indexOf(","))},sha1=${createHash("sha1").update(href).digest("hex").slice(0, 12)}`
    : href;

async function headSnapshot(page: Page) {
  const head = await page.evaluate(() => ({
    title: document.title,
    htmlLang: document.documentElement.lang,
    metas: Array.from(document.head.querySelectorAll("meta"), (m) =>
      Object.fromEntries(Array.from(m.attributes, (a) => [a.name, a.value])),
    ),
    links: Array.from(document.head.querySelectorAll("link"), (l) => ({
      rel: l.rel,
      href: l.getAttribute("href") ?? "",
      type: l.type,
      sizes: l.getAttribute("sizes") ?? "",
    })),
    jsonLd: Array.from(document.querySelectorAll('script[type="application/ld+json"]'), (s) =>
      JSON.parse(s.textContent || "null"),
    ),
  }));
  head.links = head.links.map((l) => ({ ...l, href: hashData(l.href) }));
  return head;
}

// ---------------------------------------------------------------------------------------------
type Job = { name: string; run: (browser: Browser) => Promise<void> };
const jobs: Job[] = [];

for (const p of PAGES) {
  for (const lang of p.langs ?? (["it", "en"] as Lang[])) {
    for (const width of WIDTHS) {
      jobs.push({
        name: `pages/${p.id}.${lang}.${width}`,
        run: async (browser) => {
          const page = await preparePage(browser, width, lang);
          await load(page, urlFor(p, lang));
          await shoot(page, path.join(out, `pages/${p.id}.${lang}.${width}.png`));
          if (width === 1280) {
            await mkdir(path.join(out, "html"), { recursive: true });
            await writeFile(path.join(out, `html/${p.id}.${lang}.html`), await page.content());
            await writeFile(
              path.join(out, `html/${p.id}.${lang}.head.json`),
              JSON.stringify(await headSnapshot(page), null, 2),
            );
          }
          await page.context().close();
        },
      });
    }
  }
}

/** The Member Club form lived in an iframe on the legacy site and is inline on the new one. */
const memberForm = (page: Page): FrameLocator | Page =>
  legacy ? page.frameLocator("#candidatura iframe") : page;

function state(
  name: string,
  width: number,
  lang: Lang,
  pageId: string,
  act: (page: Page) => Promise<void>,
  fullPage = true,
  height?: number,
) {
  jobs.push({
    name: `states/${name}`,
    run: async (browser) => {
      const page = await preparePage(browser, width, lang, height);
      await load(
        page,
        urlFor(
          PAGES.find((p) => p.id === pageId)!,
          lang,
        ),
      );
      await act(page);
      await page.clock.runFor(800);
      await settle(page);
      await shoot(page, path.join(out, `states/${name}.png`), fullPage);
      await page.context().close();
    },
  });
}

const click = async (page: Page, target: Locator) => {
  await target.click();
  await page.clock.runFor(500);
};

for (const lang of ["it", "en"] as Lang[]) {
  const menu = lang === "it" ? "Apri menu" : "Open menu";
  for (const pageId of ["home", "servizi", "contatti"]) {
    state(
      `mobile-menu-open.${pageId}.${lang}`,
      375,
      lang,
      pageId,
      (page) => click(page, page.getByRole("button", { name: menu })),
      false,
      812,
    );
  }
  state(
    `header-scrolled.home.${lang}`,
    1280,
    lang,
    "home",
    async (page) => {
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.clock.runFor(500);
    },
    false,
  );
  state(
    `skip-link-focus.home.${lang}`,
    1280,
    lang,
    "home",
    async (page) => {
      await page.keyboard.press("Tab");
    },
    false,
  );
  state(
    `logo-focus.home.${lang}`,
    1280,
    lang,
    "home",
    async (page) => {
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
    },
    false,
  );
  state(
    `header-cta-hover.servizi.${lang}`,
    1280,
    lang,
    "servizi",
    async (page) => {
      await page
        .locator("header")
        .getByRole("link", {
          name: lang === "it" ? "Contattaci" : "Contact us",
        })
        .first()
        .hover();
    },
    false,
  );
  state(
    `nav-link-hover.servizi.${lang}`,
    1280,
    lang,
    "servizi",
    async (page) => {
      await page
        .locator("header nav")
        .getByRole("link", {
          name: lang === "it" ? "Casi studio" : "Case studies",
        })
        .hover();
    },
    false,
  );

  for (const width of [375, 1280]) {
    const fill = async (page: Page) => {
      const form = page.locator("main form").first();
      await form.locator('[name="nome"]').fill("Mario Rossi");
      await form.locator('[name="email"]').fill("mario@example.com");
      await form.locator('[name="sito"]').fill("www.example.com");
      return form;
    };
    state(`contact-success.${lang}.${width}`, width, lang, "contatti", async (page) => {
      const form = await fill(page);
      await form.locator('[type="submit"]').click();
      await page.waitForSelector('[role="status"]');
    });
    state(`contact-error.${lang}.${width}`, width, lang, "contatti", async (page) => {
      await page.unroute("**/api/invia-email");
      await page.route("**/api/invia-email", (r) =>
        r.fulfill({
          status: 502,
          json: { ok: false, errore: "Invio non riuscito" },
        }),
      );
      const form = await fill(page);
      await form.locator('[type="submit"]').click();
      await page.waitForFunction(() =>
        document.querySelector('main a[href^="mailto:"][href*="body="]'),
      );
    });
    state(`contact-input-focus.${lang}.${width}`, width, lang, "contatti", async (page) => {
      await page.locator('main form [name="email"]').first().focus();
    });
  }

  state(`lavora-con-noi-full-page.${lang}`, 1280, lang, "lavora-con-noi", async (page) => {
    await click(
      page,
      page.getByRole("link", {
        name:
          lang === "it"
            ? "Scopri come si lavora in Studio Galilei"
            : "Discover how we work at Studio Galilei",
      }),
    );
  });
}

for (const width of [375, 1280]) {
  state(`member-form-step2.${width}`, width, "it", "lavora-con-noi", async (page) => {
    await click(page, memberForm(page).getByRole("button", { name: "Continua" }));
  });
  state(`member-form-step2-error.${width}`, width, "it", "lavora-con-noi", async (page) => {
    const form = memberForm(page);
    await click(page, form.getByRole("button", { name: "Continua" }));
    await click(page, form.getByRole("button", { name: "Avanti" }));
  });
  state(`platform-enter.${width}`, width, "it", "platform", async (page) => {
    await click(page, page.getByRole("button").first());
  });
}

// ---------------------------------------------------------------------------------------------
const selected = jobs.filter((j) => !args.only || j.name.includes(args.only));
console.log(`${legacy ? "legacy" : "next"} @ ${base} → ${out}: ${selected.length} shots`);
const browser = await chromium.launch();
let next = 0,
  failed = 0;
await Promise.all(
  Array.from({ length: Number(args.jobs) }, async () => {
    while (next < selected.length) {
      const job = selected[next++];
      try {
        await job.run(browser);
        console.log(`  ✓ ${job.name}`);
      } catch (e) {
        failed++;
        console.error(`  ✗ ${job.name}: ${(e as Error).message.split("\n")[0]}`);
      }
    }
  }),
);
await browser.close();
console.log(failed ? `${failed} failed` : "done");
process.exitCode = failed ? 1 : 0;
