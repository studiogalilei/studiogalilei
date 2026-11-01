# Migration plan: Studio Galilei → Next.js (full stack)

Branch: `nextjs-migration`. Status: **Phase 0 done, waiting for approval before Phase 1.**

Target versions (checked with `npm view` on 2026-11-01): **Next.js 16.4.3**, **Tailwind CSS 4.3.3**, **shadcn CLI 4.23.0**, React 19 (whatever Next 16.4 pins). Node 25 is installed locally; Vercel will use its default Node LTS.

---

## 1. Inventory

### Files in the repo (and what Vercel serves today)

| File | Size | What it is | Served at |
|---|---|---|---|
| `index.html` | 4.5 MB | The live site: a single-file Vite + React 18 + react-router 7.13 + **Tailwind 4.1.12** SPA, with every image, font and the PDF inlined as `data:` URIs, plus 2 injected patch layers (see §3) | `/` and **every extension-less path** except `/api*` and `/platform*` (rewrite) |
| `tour-operator-v2.html` | 1.4 MB | Separate hand-written landing page (plain CSS + vanilla JS, images and Poppins inlined) | `/tour-operator-v2.html` |
| `platform/index.html` | 64 KB | "Platform" prototype (Area Partner/Member/Consulente): vanilla JS, data stored in the browser's localStorage/IndexedDB, Arial font | `/platform/` (and `/platform`) |
| `api/invia-email.js` | 4 KB | Vercel Node function: forms → email via the Resend REST API | `/api/invia-email` |
| `vercel.json` | 1 KB | 1 redirect + 1 rewrite (below) | n/a |
| `index-originale.html`, `index-old.html` | 4.4 MB each | Older builds; `index-originale.html` is the input of `modifiche/costruisci.py` | **Publicly reachable** at `/index-originale.html`, `/index-old.html` (not linked anywhere) |
| `modifiche/*` (`costruisci.py`, `ritocchi-mobile.py`, `sg-effetti.{css,js}`, `sg-mobile.{css,js}`, `marchio-path.txt`) | 108 KB | Build scripts that patch the compiled bundle into `index.html` | Also publicly reachable (e.g. `/modifiche/sg-effetti.js`) |
| `README.md`, `LEGGIMI.md` | | Docs (LEGGIMI = Italian handoff notes) | Also publicly reachable |

There is **no `package.json`**, no `robots.txt`, `sitemap.xml`, manifest, OG image, or separate asset files. Everything is inlined.

**Source maps: none** (`*.map` absent, no `sourceMappingURL`). The original React source is not in the repo. However, the bundle is unminified enough (Vite build, real Tailwind class strings, JSX runtime calls, readable Italian identifiers in the patched parts) that I pretty-printed it (22,877 lines) and can rebuild each component faithfully. App code is ~11,000 of those lines; the rest is React, react-router, lucide icons, d3-geo and topojson.

### `vercel.json` routing today

```json
"redirects": [{ "source": "/index.html", "destination": "/", "permanent": true }],
"rewrites":  [{ "source": "/((?!api(?:/|$)|platform(?:/|$)|.*\\..*).*)", "destination": "/index.html" }]
```

No `cleanUrls` and no `trailingSlash`. In addition, an inline `<head>` script in `index.html` converts legacy hash URLs client-side: `/#/servizi` and `/index.html#/servizi` become `/servizi`, keeping `?lang=`.

### Pages / URL paths

SPA routes (react-router, `BrowserRouter`), all served by `index.html`:

| Path | Component (bundle name) | Title (IT / EN, set client-side) |
|---|---|---|
| `/` | `vU` home | `Studio Galilei \| Marketing, AI e Software` / `… AI and Software` |
| `/chi-siamo` | `PU` | `Chi siamo` / `About us` + ` \| Studio Galilei` |
| `/servizi` | `xU` (includes the rotating d3 globe) | `Servizi` / `Services` |
| `/servizi/marketing`, `/servizi/intelligenza-artificiale`, `/servizi/sviluppo-software` | `Ml` (one template, 3 data entries) | service name |
| `/servizi/google-ads` | `DU` | `Google Ads` |
| `/casi-studio` | `OU` | `Casi studio` / `Case studies` |
| `/casi-studio/tour-operator` | `i5` (includes the flat world map) | `Caso studio: tour operator` |
| `/casi-studio/dan-ink` | `A5` | `Caso studio: Dän Ink` |
| `/casi-studio/onlysolutions` | `l5` | `Only Solutions, caso studio` |
| `/lavora-con-noi` | `f5` (Member Club form in an `<iframe srcDoc>`) | `Lavora con noi` / `Work with us` |
| `/contatti` | `c5` (contact form) | `Contattaci` / `Contact us` |
| `/privacy` | `K5` | `Privacy Policy` |
| `/area-partner` | `s5`: `location.replace("/platform/")` | n/a |
| `*` (anything else extension-less) | `<Navigate to="/" replace>` | n/a |

Standalone pages: `/tour-operator-v2.html` and `/platform/`.

### `<head>` per page

- **index.html (all SPA routes, same server HTML)**: `charset`, `viewport width=device-width, initial-scale=1.0`, title `Studio Galilei | Marketing, AI e Software`, description `Studio Galilei integra marketing, intelligenza artificiale e software…`, `theme-color #061773`, SVG favicon (data URI, blue rounded square + tree), `og:type website`, `og:site_name`, `og:title`, `og:description "Rendiamo visibile ciò che muove la crescita."`, `og:url https://studiogalilei.com/`, `og:locale it_IT`, preconnects to Google Fonts, JSON-LD `Organization` (Studio Galilei Srl, VAT, address). **No canonical, no Twitter tags, no og:image, no analytics or third-party scripts.** After JS loads, the `pi()` hook rewrites `document.title` and `meta[name=description]` per route and language.
- **tour-operator-v2.html**: title `Software for tour operators`, English description, `theme-color #040F4D`, `robots noindex`. No favicon, no OG.
- **platform/index.html**: title `Studio Galilei | Platform`, `theme-color #061773`. No description or favicon.
- **Member Club iframe doc**: title `Entra nel Member Club | Studio Galilei`, `robots noindex`, OG and Twitter tags (og:image on `studiogalilei.github.io`). Only relevant inside the iframe.

### Assets (extracted from the `data:` URIs → will live in `public/`)

From `index.html`: 21 WebP images (case studies, team photo, client logos, service imagery), 2 JPEGs (Venice photo used by `.field-navy`/`.sphere`), 2 SVGs (favicon/logo, one more), **Permanent Marker** font (woff2 + woff, self-hosted), **the presentation PDF** (1.5 MB, downloaded as `Studio-Galilei-presentazione.pdf`), and a topojson world atlas (inline JSON). Poppins 400/500/600 comes from Google Fonts via CSS `@import`.
From `tour-operator-v2.html`: 27 WebP images and 3 subsetted Poppins woff2 (400/500/600).

---

## 2. Design system (from the compiled Tailwind 4.1 CSS)

The original project's own `@theme` tokens (recovered verbatim):

- **Colors**: `sg #061773`, `sg-deep #040f4d`, `ink #0a0a1a`, `pale #eef1fa`, `mist #f7f8fc`, `cream #ebdcbe`, `mk #d21205` (marketing), `ai #0689ff`, `sw #2f6b33` (software), `border var(--border)`. Plus a shadcn-style `:root` palette (`--background #f5f8fc`, `--foreground #12151c`, `--primary #061773`, `--accent #0689ff`, `--border #06177324`, `--ring #0689ff`, `--radius .75rem`, `--navy-soft #0e2596`, `--lilac #8ea6e8`, `--offer #ffb020`, …). Of this palette only `--border`, `--ring`, `--background` and `--foreground` are actually used, by the base layer.
- **Font families**: `--font-sans: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`; body `Poppins, ui-sans-serif, system-ui, sans-serif`; `Permanent Marker` (one heading); the Platform uses Arial.
- **Font sizes**: Tailwind defaults `xs`–`2xl`, plus many repeated arbitrary sizes: 15px (35×), 14px (23×), 2rem (14×), 18px, 13px, 17px, 16px, 2.6rem, 15.5px, 12px, 12.5px, 19px, 11.5px, 2.8rem, 14.5px…
- **Weights**: 400 / 500 / 600. **Tracking**: `-0.03em` (14×), `-0.025em`, `-0.02em`, `-0.015em`, `0.08em`, `0.1em`, `0.12em`, `0.18em`… **Line heights**: `1.7` (22×), `1.65`, `1.75`, `1.15`, `1.1`, `1.12`.
- **Radii**: 18px (20×), 10px (13×), 8px, 14px, 16px, 22px, 20px, 7px.
- **Shadows**: `.surface-1/2/3/dark` layered shadows, `.gold-btn`, `.tile`, logo tile.
- **Breakpoints**: Tailwind defaults (`sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem`), plus `min-[360px]` and `min-[380px]`; the patch CSS uses 639/767/1023px max-width queries (equivalent to `max-sm`/`max-md`/`max-lg`) and `(hover: hover)` / `(hover: none)`.
- **Containers**: `max-w-[1200px] px-6 md:px-10` (component `le`), sections `py-20 md:py-28`.
- **Animations/keyframes**: `sg-marquee` (38s logo marquee), `sg-reveal` (scroll-driven `animation-timeline: view()`), `sg-gold-shine`, `pulse`, tw-animate-css `enter/exit/accordion/caret-blink` (only partly used), `sg-menu-in`, plus the patch-layer keyframes. Everything is disabled under `prefers-reduced-motion`.
- **Base layer differences vs Preflight**: base `h1–h4/label/button/input` font sizes and weights (Figma-Make style), `* { border-color: var(--border); outline-color: var(--ring)/50% }`, `body { color #0a0a1a; background #fff; antialiased }`, a global `:focus-visible` ring (2px #0689ff, offset 3px, radius 4px), and `html, body { overflow-x: clip }`.

In Phase 2 these become `@theme` tokens in `app/globals.css`: colors, fonts, the repeated font sizes, tracking and leading values, radii, shadows (`shadow-surface-1..3` etc.) and animations. One-offs stay as arbitrary values.

---

## 3. Behavior inventory

### Layer 1: the React bundle

- **Language (IT/EN)**: React context. Initial value from `?lang=it|en` (also saved), else `localStorage["sg-lang"]`, else `it`. Sets `<html lang>`. A toggle in the header switches instantly. Every string is `t("it", "en")`. `tour-operator-v2.html` uses the same `sg-lang` key.
- **Header**: sticky, desktop nav with dropdown sub-menus (click outside or Esc closes them), active-route underline, language toggle, "Area Privata" lock link, "Contattaci" CTA. Mobile: a burger opens a full menu with icons, quick contacts (phone, WhatsApp, email), language and CTA.
- **Scroll restoration**: scroll to top on route change, or to `#hash` if present. A skip link sits before the header.
- **Home**: hero with 3D "tiles" (AI/Marketing/Software cards), logo marquee, services, portal preview with KPIs and a chart, case studies, flat world map ("We Work WorldWide", d3-geo), contact form.
- **Services**: rotating orthographic globe (d3-geo, rAF, paused off-screen by IntersectionObserver).
- **Contact form** (`gc`, used on `/contatti` and the home page): fields `nome`, `email`, `sito`, …, a client-side honeypot (`_honey` filled → silently do nothing), POST to `/api/invia-email`. On success it shows "Messaggio inviato!". On failure it shows an error plus an "Invia via email" `mailto:` fallback with the message pre-filled.
- **PDF download button**: converts the `data:` URL to a Blob so Safari on iOS downloads it.
- **Member Club form** (on `/lavora-con-noi`): a complete standalone HTML document (11 KB CSS + 90 KB vanilla JS) inside `<iframe srcDoc>`, height 700/760px. It is a one-question-per-screen wizard with branching questions and a sector search. It writes **directly to Supabase** (REST insert into `candidature_member_club`, portfolio file upload to the `portfolio` storage bucket, using the hard-coded *publishable* key), queues failed submissions in `localStorage` and retries them, and also sends a copy via `/api/invia-email` with `tipo: "candidatura"`.
- **Titles**: the `pi(title, description)` hook updates `document.title` and the meta description per route and language.

### Layer 2: `sg-effetti.js/css` (injected; drives the DOM through a MutationObserver)

Card tilt and parallax on the hero tiles (pointer on desktop, automatic sway on touch devices, click opens the matching service page). "Scopri i servizi" label, centered over the tile group by JS measurement. Transparent header over the home hero that turns into blurred navy on scroll. KPI count-up and chart-draw when the portal preview enters view. **A "Prenota una chiamata conoscitiva" section with a Google Calendar appointments iframe** inserted after "Caffè o videochiamata?"; the hero's secondary button smooth-scrolls to it. 4 animated logo "stamps" around the gold CTA. **Decorative "space" SVGs** (stars, spiral galaxy, orbit, constellation) in every light section on all pages except `/lavora-con-noi`, generated with a seeded PRNG that avoids text and card rectangles and is regenerated on resize. Subtle tilt plus scroll-in on cards of inner pages. A team carousel that is coded but **disabled** (`MOSTRA_TEAM = false`, placeholder names).

### Layer 3: `sg-mobile.js/css` (+ bundle edits by `ritocchi-mobile.py`, already baked in)

Logo tile, "Area Privata" style, mobile menu styles, and new home sections. On `/lavora-con-noi`, **only the Member Club form is shown** (`body.sg-lcn-solo-modulo` hides the rest), with a "Scopri come si lavora in Studio Galilei" link under it that reveals the full page.

### `tour-operator-v2.html`

Plain CSS (37 KB) and vanilla JS (12 KB). IT/EN toggle (CSS `.it`/`.en` blocks, both languages in the HTML, default `?lang` → `sg-lang` → `it`). Referral code `?c=`/`?r=`/`?ref=` stored for 120 days in localStorage and stripped from the URL. WhatsApp and mailto links built from selected "pain points". Animated toasts and phone mockups. IntersectionObserver reveals.

### `platform/`

Vanilla JS SPA prototype: role picker (consultant, partner, member), projects, roadmap, reports, file attachments (IndexedDB), profiles. All data stays in the visitor's browser. No backend and no auth.

### Email function `api/invia-email.js` (exact contract to preserve)

- **Route**: `/api/invia-email`. **Method**: `POST` only. Anything else returns `405` with `Allow: POST` and `{ok:false, errore:"Metodo non consentito"}`.
- **Body**: JSON `{ tipo?: "contatto"|"candidatura", replyto?: string, campi: Record<string, unknown>, _honey?: any }`. A string body is JSON-parsed.
- **Responses**:
  - `500 {ok:false, errore:"Configurazione email mancante"}`: no `RESEND_API_KEY`.
  - `400 "Richiesta non valida"`: the body is not an object.
  - `200 {ok:true}` without sending: `_honey` is truthy.
  - `400 "Modulo vuoto"`: no non-empty fields.
  - `413 "Modulo troppo lungo"`: fields total more than 60,000 chars.
  - `502 "Invio non riuscito"`: Resend rejected the request or could not be reached.
  - `200 {ok:true}`: sent.
- **Rules**: an unknown `tipo` becomes `contatto`. At most 80 fields, keys truncated to 80 chars, values to 5,000. Empty values are dropped. `reply_to` comes from `replyto`, else `campi.email`, only if it is a valid email. The subject is `OGGETTI[tipo]` plus `": " + nome`/`nome_cognome` (newlines stripped, max 100 chars). The email is an HTML table plus a text version. The recipient is fixed to `dramane@studiogalilei.com`.
- **Provider**: Resend REST API through `fetch`, no SDK.
- **Env vars**: `RESEND_API_KEY` (required), `RESEND_FROM` (optional, default `Sito Studio Galilei <sito@members.studiogalilei.com>`).
- **CORS**: none (same-origin only). **Rate limiting: none.** **Spam protection: only the honeypot**, client-side in the contact form plus server-side `_honey`. The contact form never actually sends `_honey` to the server, because it strips `_`-prefixed keys. I'll keep exactly this and add nothing.

---

## 4. Target architecture

```
app/
  layout.tsx              root: <html lang>, next/font (Poppins + Permanent Marker), metadata, JSON-LD
  globals.css             @import "tailwindcss"; @theme tokens; minimal @layer base overrides
  icon.svg                favicon (extracted)
  (site)/                 header + footer layout for the main site
    page.tsx              /
    chi-siamo/page.tsx … privacy/page.tsx            (one folder per original route)
    servizi/[slug]/page.tsx  (generateStaticParams: marketing | intelligenza-artificiale | sviluppo-software)
    servizi/google-ads/page.tsx
    casi-studio/{tour-operator,dan-ink,onlysolutions}/page.tsx
  tour-operator-v2/page.tsx    (own layout, no site header; /tour-operator-v2.html → 308 here)
  platform/page.tsx            (client app, own layout; Arial)
  candidatura-member-club/page.tsx  (the form the /lavora-con-noi iframe loads, noindex)
  api/invia-email/route.ts     POST handler, same contract
components/  (Header, MobileMenu, LanguageToggle, Footer, Section, Container, Heading, ButtonLink, ContactForm, WorldMap, Globe, Tiles, Marquee, BookingSection, SpaceDecor, …)
lib/         email.ts (server-only), i18n.ts, content/* (page data), cn.ts
public/      images, fonts, presentation PDF (extracted from data URIs)
proxy.ts     language resolution (see decision A), if approved
next.config.ts  redirects
```

- **Static by default**: every page is prerendered at build time. Only the Route Handler is dynamic.
- **Server Components by default.** Client components only for: language toggle, header (dropdowns, scroll state, mobile menu), contact form, globe, hero tiles, KPI count-up, space decor, card tilt, PDF button (if still needed), Member Club wizard, tour page interactions, Platform.
- **Patch layers become proper components.** The behavior of `sg-effetti`/`sg-mobile` is rebuilt as React components in the right place (for example, `BookingSection` rendered in the home page instead of being injected by a MutationObserver). Output DOM and visuals stay the same. The disabled team carousel is dead code and **will not be ported**.
- **d3-geo + topojson-client** (needed to reproduce the maps exactly): the flat world map is rendered **at build time in a Server Component** (no client JS). The rotating globe is a small client component.
- **Images**: plain `<img>` pointing at `/public` files (the original uses fixed CSS sizes; `next/image` would change markup and lazy-loading behavior). I'll try `next/image` per image and keep it only where the screenshot diff is clean.
- **Fonts**: `next/font/google` Poppins 400/500/600 (self-hosted at build, same files Google serves) and `next/font/local` Permanent Marker, exposed as CSS variables in `@theme`. I'll check whether next/font's automatic fallback metrics change anything visible before fonts load. Baseline screenshots wait for `document.fonts.ready`, so the final render is compared.
- **PDF**: served as `/Studio-Galilei-presentazione.pdf` with `download`. The Blob workaround existed only because of the `data:` URL, so the download works the same with a plain link.
- **Metadata API**: per-route `title`/`description` (the values the SPA sets after load), shared OG tags exactly as today, `theme-color` through the `viewport` export, the favicon, and JSON-LD in the root layout. No canonical (the original has none; adding one would be an improvement, and I'll list it separately).
- **Redirects (`next.config.ts`)**: `/index.html → /` (permanent), `/tour-operator-v2.html → /tour-operator-v2` (permanent), `/area-partner → /platform` (temporary: the notes say it is a placeholder until the Platform is live). The legacy `#/` hash redirect stays as a tiny inline `<head>` script (hashes never reach the server). Unknown paths go to `/`, as the SPA does today.
- **Email**: `app/api/invia-email/route.ts` + `lib/email.ts` (`import "server-only"`), zod schema mirroring the lenient rules above, same responses byte-for-byte, raw `fetch` to Resend (no SDK, so no new dependency). `.env.example` lists `RESEND_API_KEY` and `RESEND_FROM`. The contact form keeps calling the API route; I won't switch it to a Server Action, so client behavior stays identical and one code path is easier to verify.
- **Supabase**: the Member Club form keeps writing straight to Supabase from the browser with the same publishable key (it is public by design and protected by RLS). Moving it server-side would change behavior.

### Dependencies I expect to add (each justified)

`next`, `react`, `react-dom` (framework). `tailwindcss` + `@tailwindcss/postcss` (mandatory styling). `clsx` + `tailwind-merge` (`cn()`). `zod` (request validation, as requested). `lucide-react` (the original uses lucide icons; I'll check that path data matches the bundled version, otherwise inline the SVGs). `d3-geo` + `topojson-client` (maps). `server-only`. Dev: `typescript`, `@types/*`, `eslint` + `eslint-config-next`, `prettier` + `prettier-plugin-tailwindcss`, `@playwright/test`, `pixelmatch` + `pngjs`, `lighthouse`. shadcn adds `class-variance-authority` and `@radix-ui/*` **only if** a component passes the parity test.

---

## 5. shadcn/ui assessment

The original was generated from a Figma Make template that ships shadcn's theme variables, but **no shadcn/Radix component survived tree-shaking**: the bundle has no Radix code, and every control is hand-written Tailwind. Candidates:

| Element | shadcn candidate | Expected verdict |
|---|---|---|
| CTA buttons / button-links (`Bt`: 4 variants, `rounded-[10px] px-6 py-3.5 text-[15px]`) | `Button` (+ `asChild`) | **Plausible.** Pure Tailwind, can be restyled to identical output. Adds `cva` + `@radix-ui/react-slot`. Will test. |
| Contact form inputs (`rounded-[10px] border-sg/15 focus:ring-2 ring-ai/20`) | `Input`, `Textarea`, `Label` | **Plausible.** Restyle fully and diff default, focus and invalid states. Will test. |
| Desktop nav dropdowns (click-to-open, close on outside click or Esc, no portal) | `DropdownMenu` / `NavigationMenu` | **Unlikely.** Radix portals the content, adds roving focus, typeahead and `data-state` animations, and positions with floating-ui. DOM, focus and animation behavior differ. Expect a plain component. |
| Mobile menu (inline panel under the header, `sg-menu-in` animation) | `Sheet` | **No.** Sheet is a modal side drawer with overlay; the original is an inline panel. |
| Language toggle (2 `aria-pressed` buttons) | `ToggleGroup` | **Unlikely.** Radix uses roving tabindex and `data-state`; different keyboard behavior. |
| Cards / surfaces | `Card` | **No value.** `Card` is just a div with classes and would need every class overridden. |
| Member Club wizard, tour page, Platform | n/a | Custom controls; no shadcn equivalents with the same DOM. |

If neither Button nor Input reaches parity, I'll use no shadcn at all and say so. shadcn's CSS variables will be set to the original's exact `:root` values if it is initialized.

---

## 6. Visual baseline and parity method (Phases 1 and 3)

- **Legacy server**: copy the deployable files to `legacy/` (gitignored) and run `vercel dev` there. If that isn't workable, a small Node static server that applies the same redirect and rewrite rules plus the function, with Resend mocked.
- **Playwright** (`scripts/visual-baseline.ts`): every route above, plus `/tour-operator-v2(.html)`, `/platform`, and both languages for the main site. Widths 375/768/1280/1920, full page. Interactive states: desktop dropdowns open, mobile menu open, language EN, header scrolled state on home, button hover and focus, contact form validation errors, success state and error + mailto fallback (API mocked), Member Club form first steps, Platform role picker.
- **Determinism**: wait for `document.fonts.ready` and all images; freeze time with `page.clock` (globe angle, marquee position and rAF effects start at t=0); inject CSS that pauses animations at their start frame and disables transitions; mask the Google Calendar iframe (external, live availability).
- **Diff**: `pixelmatch`, threshold 0.1%; diffs go to `.visual-diff/`. I'll also save and compare rendered HTML and `<head>` per page.
- **Lighthouse**: home page, old vs new.

---

## 7. Decisions I need from you

**A. How to render the IT/EN switch.** The original keeps language in client state (`?lang` → localStorage → `it`), so the server sends one empty HTML shell and the browser renders the right language. Static Next pages need one of these:

1. **(Recommended) Cookie + `proxy.ts` rewrite to prerendered `it`/`en` variants.** Pages live under `app/[lang]/…` with both languages prerendered. The proxy reads `?lang=` or the `sg-lang` cookie and rewrites internally, so **URLs don't change** and `/it/…`, `/en/…` are not exposed. The toggle sets the cookie (and localStorage, for the tour page) and refreshes. Everything stays a Server Component, nothing flashes, and no text is duplicated. Cost: a small proxy runs on each page request, and returning EN visitors whose preference is only in localStorage get switched once on their first visit (a one-line client migration).
2. **Client-side context, like today.** Italian is prerendered; EN users see the page hidden until hydration, which mimics the SPA's blank-until-JS. This is the most literal port, but nearly every component becomes `"use client"`.
3. **Both languages in the HTML, toggled with CSS on `<html lang>`** (the approach `tour-operator-v2.html` already uses). Fully static Server Components and an instant toggle, but every page ships twice the text, and crawlers see hidden EN text.

**B. `/tour-operator-v2.html`**: move it to `/tour-operator-v2` with a 308 from the `.html` URL (as your brief says), and update the internal link in the main nav and footer? (Today `/tour-operator-v2` without `.html` redirects to `/` through the SPA.)

**C. Old builds and build scripts**: `index-old.html`, `index-originale.html`, `modifiche/`, and the publicly served `LEGGIMI.md` are not pages. I plan to **not** port them and to delete them in Phase 5. Their URLs will stop working (they are unlinked). OK?

**D. Member Club form**: today it is an `<iframe srcDoc>` of a self-contained document. I plan to rebuild it as a React + Tailwind client page at an internal route (`/candidatura-member-club`, `noindex`) that the iframe loads by `src`. Same box, same internal scrolling, same Supabase and email calls. The alternative is keeping a static HTML file for it, but that breaks the "all Tailwind" rule. OK with the new internal URL?

**E. Platform**: it is a large vanilla-JS prototype with local-only data. I plan to port it 1:1 to React + Tailwind as one client route at `/platform` (`/platform/` 308s to it), keeping localStorage/IndexedDB storage and the same keys so existing local data still loads. It is the least "site-like" part; confirm it's in scope.

**F. Scope and effort warning**: this is a full rebuild of roughly 11k lines of compiled UI, plus a 1.3k-line landing page, a 900-line form wizard and a 1k-line prototype, with pixel-diff verification at 4 widths × 2 languages. It will take many iterations and commits. I'll work route by route (layout and home first) and report progress per phase.

## 8. Improvement ideas (not doing them; parity first)

Canonical URLs and per-page OG tags. An `og:image`. `robots.txt` and `sitemap.xml`. Real rate limiting on `/api/invia-email`. Removing the client-side-only language preference in favor of `/en` URLs for SEO. Compressing the 1.5 MB PDF. Replacing the Platform's local-only storage with Supabase + auth.
