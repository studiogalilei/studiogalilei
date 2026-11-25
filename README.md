# Studio Galilei

Website of [Studio Galilei](https://studiogalilei.com): Next.js 16 (App Router, TypeScript), Tailwind CSS 4 and next-intl, deployed on Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Production build: `npm run build && npm run start`.

Checks: `npm run lint`, `npm run typecheck`, `npm run format:check` (`npm run format` to fix).

`npm run lint` also runs `scripts/check-texts.mjs` (alone: `npm run check:texts`), which reads `messages/*.json` and every file in `lib/landing/` and fails on the marks the site's texts must not carry: a sentence of fewer than five words closed by a full stop inside a text of several sentences, the middle dot `·` used as a separator, a long dash used as a pause, an exclamation mark, or a brochure word (innovativo, soluzioni, a 360 gradi, chiavi in mano, leader, eccellenza, sinergia, valore aggiunto and their English twins). Run it before every push; exceptions (a proper name, a quotation) go in `ALLOWED` in the script.

## Environment variables

| Name             | Required | Used by                                                                          |
| ---------------- | -------- | -------------------------------------------------------------------------------- |
| `RESEND_API_KEY` | yes      | `/api/invia-email`: Resend API key. Without it the endpoint answers 500.         |
| `RESEND_FROM`    | no       | Sender address (default `Sito Studio Galilei <sito@members.studiogalilei.com>`). |

Both are read only on the server (`lib/email.ts`). The Member Club form writes to Supabase from the browser with the project's _publishable_ key, which is public by design (row level security only allows inserts).

## Structure

```
app/
  [locale]/                 every page, prerendered once per locale (it, en)
    layout.tsx              root layout: fonts, <html lang>, client translations
    (site)/                 pages with the site header and footer
    tour-operator/          standalone landing page
    platform/               Platform prototype (client app, data stays in the browser)
  api/invia-email/route.ts  form emails (POST)
  globals.css               Tailwind import and theme tokens
components/                 UI, grouped by page/area; shared pieces in layout/, sections/, ui/, effects/
lib/                        server and shared logic (email, company data, maps, cn)
i18n/, proxy.ts             next-intl configuration
messages/{it,en}.json       translations
public/                     images, the presentation PDF, favicon
scripts/                    visual regression tests
```

## Languages

Italian lives at the plain address (`/servizi`), English under `/en` (`/en/servizi`): one address per language, so search engines index both (canonical and hreflang come from `lib/metadata.ts`, the sitemap from `app/sitemap.ts`). The proxy (`proxy.ts`, next-intl) sends a first visit to the language of the `sg-lang` cookie, otherwise of the browser's `Accept-Language`. `?lang=it|en` forces a language and remembers it. The EN/ITA switcher sets the cookie and moves to the page's twin. Texts live in `messages/it.json` and `messages/en.json`. The Member Club form, the Platform and the answer pages (`lib/landing/`: services, guides, industries, comparisons, `/domande`) are Italian only: `proxy.ts` serves them in Italian whatever the visitor's language and sends their `/en` address to the Italian one.

## Answer pages

Every answer page is data, rendered by `components/landing/landing-page.tsx`: `lib/landing/pages.ts` (services, guides, method, partners), `sectors.ts` and `sector-objections.ts` (the twenty industries and the doubts proper to each), `compare.ts` (`/confronti/...`), `answers.ts` (`/domande` and the grants guide). A new page needs its data, a route file under `app/[locale]/(site)/` and, if Italian only, its path in `ITALIAN_ONLY` in `proxy.ts`. The sitemap (`app/sitemap.ts`) and `/llms.txt` (`app/llms.txt/route.ts`) are built from the same data. Numbers on these pages come only from sources that were opened and are linked in the page's `sources`.

The industries' example screens are real HTML, photographed: `python3 mockup/gen.py <slug>` (see `mockup/gen.py`), then add the slug to `SECTOR_SHOTS` in `lib/landing/sectors.ts`.

## Styling

Everything is styled with Tailwind utilities. The design tokens are in `app/globals.css` (`@theme`): brand colours (`sg`, `sg-deep`, `ink`, `ai`, `mk`, `sw`, …), the Poppins/Permanent Marker font variables, font sizes, line heights, letter spacing, radii, shadows (`shadow-surface-1..3`) and animations. Numeric token names are the literal value: `text-15` is 15px, `text-2.6rem` is 2.6rem, `leading-1.7` is a line height of 1.7, `rounded-18` is 18px. Use `cn()` from `lib/cn.ts` for conditional classes (it knows the custom tokens).

shadcn/ui is not used: the original site has no component that shadcn's primitives reproduce without changing markup, focus styles or behaviour.

## Visual regression tests

`scripts/visual-baseline.ts` takes deterministic screenshots of every page (375/768/1280/1920 px, Italian and English) plus interactive states (menus, focus, form states). `scripts/visual-diff.ts` compares them with a reference set and writes diff images to `.visual-diff/`.

```bash
npx playwright install chromium        # once
npm run build && npm run start         # in another terminal
npm run test:visual                    # screenshots of localhost:3000 compared with .visual-baseline/
```

`.visual-baseline/` (not committed) holds the reference screenshots. To make a new reference from a known-good deployment: `node scripts/visual-baseline.ts --base https://<deployment> --out .visual-baseline`. The animated globe on `/servizi` is a live animation, so its angle differs between runs.

## Deployment

Vercel detects Next.js automatically; there is no `vercel.json`. Pushes to a branch create Preview deployments, `main` deploys to production. Redirects for old addresses (`/index.html`, `/tour-operator-v2.html`) and `/platform → /area-partner` are in `next.config.ts` ("Area Privata" is a "coming soon" page at `/area-partner` while the Platform prototype is not public); old `/#/…` links are converted by a small script in the root layout. Set the environment variables above in the Vercel project for Production and Preview.
