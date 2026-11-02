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

The language is never in the URL. The proxy (`proxy.ts`, next-intl) picks it from the `sg-lang` cookie, otherwise from the browser's `Accept-Language`, falling back to Italian, and serves the matching prerendered page. `?lang=it|en` forces a language and remembers it. The EN/ITA switcher sets the cookie. Texts live in `messages/it.json` and `messages/en.json`. The Member Club form and the Platform are Italian only.

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
