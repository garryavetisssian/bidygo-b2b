# Bidygo — B2B Partner Acquisition Site

Marketing & retailer-acquisition site for [Bidygo](https://bidygo.com), the customer-led pricing platform for physical retailers.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · next-intl · Motion · Resend**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in only what you need
npm run dev                  # http://localhost:3000
```

The site runs end-to-end without any environment variables. The partner form falls back to console logging when `RESEND_API_KEY` is missing, so you can develop without external services.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Turbopack dev server (Next.js 16). |
| `npm run build` | Production build. Generates static pages for all routes × all locales. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

---

## Architecture

```
src/
├── app/
│   ├── [locale]/              ← Locale-rooted routes (en, am, ru)
│   │   ├── layout.tsx         ← Root layout (fonts, providers, header, footer, Org JSON-LD)
│   │   ├── page.tsx           ← Homepage (hero, pillars, industries, proof, CTA)
│   │   ├── partners/          ← Retailer conversion page + demo form
│   │   ├── solutions/[industry]/  ← 5 industry pages
│   │   ├── resources/         ← Article hub + per-article pages
│   │   ├── about/
│   │   ├── contact/
│   │   └── case-studies/
│   ├── actions/partner.ts     ← Server action: Zod-validated, Resend-wired
│   ├── sitemap.ts             ← Dynamic sitemap (all routes × all locales)
│   ├── robots.ts              ← /robots.txt
│   └── globals.css            ← Tailwind v4 theme + design tokens (oklch)
├── components/
│   ├── ui/                    ← Primitives: Button, Card, Section, Input, Badge, …
│   ├── site/                  ← Header, Footer, Logo, LocaleSwitcher
│   ├── sections/              ← Interactive sections (PriceItDemo)
│   └── forms/                 ← PartnerForm (client) wired to the server action
├── data/
│   ├── industries.ts          ← Per-vertical copy (pains, fixes, FAQs, outcomes)
│   └── articles.ts            ← Cornerstone resource articles
├── i18n/                      ← next-intl routing, request, navigation helpers
├── lib/utils.ts               ← cn(), formatters, absoluteUrl()
└── middleware.ts              ← Locale routing
messages/
├── en.json                    ← Translations
├── am.json
└── ru.json
```

### Conventions

- **Server components by default.** Client components are explicitly marked (`"use client"`) and limited to interactive UI: `Header`, `LocaleSwitcher`, `PriceItDemo`, `PartnerForm`.
- **Data lives in `src/data/`.** Industries and articles are TypeScript data files, not MDX. Add a new industry by appending to `industries.ts`; the dynamic route, sitemap, and SEO pick it up automatically.
- **Brand tokens are CSS variables in `globals.css`.** All colors are `oklch()` so they're perceptually uniform and easy to swap when real brand assets land.
- **Forms use React 19 `useActionState` + server actions.** No client-side mutation libraries.

---

## Internationalization

Three locales ship: **English (default), Armenian, Russian**. Adding a locale is two lines + a JSON file:

1. Add the locale code to `src/i18n/routing.ts` (`locales` and `localeLabels`).
2. Create `messages/<locale>.json` (copy from `en.json`).

URLs use the `as-needed` prefix strategy: default-locale URLs are unprefixed (`/partners`), non-default get a prefix (`/am/partners`).

---

## SEO

- `sitemap.xml` enumerates every route × every locale with `hreflang` alternates.
- `robots.txt` allows crawling everywhere except `/api/` and `/_next/`.
- Per-page `<Metadata>` with canonical + `alternates.languages`.
- JSON-LD: `Organization` (site-wide), `FAQPage` (industries + articles), `Article` (articles), `BreadcrumbList` (industries).
- `metadataBase` derived from `NEXT_PUBLIC_SITE_URL`.

---

## Brand assets

The current theme uses placeholder Bidygo-orange tokens defined in `src/app/globals.css` (`--color-brand-50..900`, all `oklch`). When the real brand pipeline arrives:

1. Drop the official `oklch()` (or `#hex`) values into the same variables.
2. Replace `src/components/site/logo.tsx` with the official SVG marks.
3. Optionally swap fonts in `src/app/[locale]/layout.tsx` (currently Inter + Manrope from `next/font/google`).

Nothing else needs to change.

---

## Forms & lead capture

Partner applications flow:

1. `PartnerForm` (client) → `submitPartnerApplication` (server action, `src/app/actions/partner.ts`).
2. Zod validates server-side.
3. If `RESEND_API_KEY` is set, emails go to `PARTNERS_INBOX_EMAIL` (defaults to `partners@bidygo.com`).
4. Otherwise, the submission is logged to the server console (dev-friendly).

Honeypot field (`hp_field`) silently swallows bot submissions.

To swap Resend for HubSpot / Salesforce / a CRM webhook: replace the body of `submitPartnerApplication`. The form, validation, and UI don't need to change.

---

## Deployment

This project is set up for **Vercel** (zero config). Push to a connected repo and it deploys.

Required environment variables in production:

- `NEXT_PUBLIC_SITE_URL` — your canonical domain.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `PARTNERS_INBOX_EMAIL` — for partner form delivery.

After first deploy: submit `https://<your-domain>/sitemap.xml` to Google Search Console.

---

## Roadmap notes (for whoever inherits this)

- **Case studies** — page exists with honest "launching with founding cohort" framing. Add real studies under `src/data/case-studies.ts` and create `src/app/[locale]/case-studies/[slug]/page.tsx` when ready.
- **Country expansion** — `routing.ts` supports adding locales; `data/markets.ts` could hold per-country copy when needed.
- **Newsletter** — footer form posts to `/api/newsletter` (route stub TBD). Wire it to your ESP of choice (Loops, Resend Audiences, Customer.io).
- **Translations of long-form content** — only nav/CTA copy is translated. Industry & article copy is English-only until the content team is in place.
