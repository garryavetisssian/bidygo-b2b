# Bidygo B2B — Project State

The single source of truth for what's decided, what's built, what's next.

---

## Current state at a glance

- **Site:** publishable in EN + RU + AM (pending native review of AM/RU copy)
- **Build:** green. 51 static pages generated. All routes return 200.
- **Phase shipped:** Wave 0 + Localization Sessions 1–3
- **Phase next:** Wave 2 (interactive ROI calculator, retailer-view demo toggle, MomentCard, OfferTicker, reduced PartnerForm)

## Strategic foundation (locked, never re-derive)

Bidygo is an **Armenian phygital shopping platform**. Consumers offer prices, retailers approve/counter/decline. The B2B website's job is **trust engine + sales enablement** for a relationship-led sales motion — *not* a primary acquisition channel.

Active market: **Armenia**. Future markets are intentionally undefined per founder direction — keep copy globally oriented without naming specific future countries.

Primary acquisition channels for retailers: founder outreach, referrals, retail associations, conferences, direct sales. Website supports these by building trust and answering objections.

Every page answers: *"Can I trust Bidygo enough to continue the conversation?"*

## Locked rules (do not violate)

### Localization
- 3 languages: EN, RU, AM. EN default, no URL prefix.
- When language changes, **everything changes**: nav, body, forms, metadata, SEO, JSON-LD.
- **No partial translations. No mixed-language pages.** A `LocaleStub` component renders when content for a locale isn't ready — never broken/mixed.
- Each locale gets uniquely-written SEO content (titles, descriptions, OG, JSON-LD). Not translated.
- Per-locale chat-channel order: RU → Telegram first, EN/AM → WhatsApp first.

### Voice
- **Armenian:** modern, conversational, retail-friendly. Avoid academic / governmental / machine-translated. Yerevan shop-owner natural.
- **Russian:** natural CIS retail language. Avoid startup jargon, literal English translations, marketing fluff.
- **English:** stop-slop. No SaaS / consulting / AI jargon. Active voice. Specific moments over abstract claims.
- See `docs/translation-brief.md` for per-locale anti-patterns and voice anchors (Anna in Yerevan, Sergey in Tbilisi).

### Brand & visual
- **Orange-first**, optimistic, consumer-friendly, shopping-oriented, emotionally warm.
- **Never drift** to enterprise SaaS / fintech / crypto / corporate software.
- Reference brands: Airbnb (warmth + photography), Notion (editorial cleanliness), Headspace (color + motion).
- Anti-references: Salesforce, HubSpot, SAP, Oracle, Stripe-today (too cold), Duolingo-style (too playful).
- Brand principle: **retailers feel "I want my store to be part of this."** Consumers feel "I want to use this."
- No `ink-900` backgrounds (too corporate-dark). Use `cocoa-700` instead (warm dark).

### Conversion architecture (the ladder)

Five rungs. Visitor doesn't have to commit to a demo on first touch.

1. **Watch** — 90-second walkthrough video
2. **Calculate** — ROI calculator (interactive)
3. **Download** — 2-page retailer one-pager (email-gated)
4. **Chat** — WhatsApp / Telegram (first-class, not hidden)
5. **Demo** — 20-min walkthrough form (5 fields max)

WhatsApp + Telegram are first-class CTAs in header, footer, and contact page — never hidden. Per-locale channel order via `src/lib/contact.ts`.

### Vocabulary (public-facing)

Use these. The full table is in `CLAUDE.md`.

`shop / shop owner` (not partner) · `first shops` (not founding cohort) · `setup` (not onboarding) · `works with` (not integration) · `more sales` (not conversion lift) · `app / tool / Bidygo` (not platform) · drop `phygital` and `customer-led pricing` from public copy.

---

## Architecture

### Routes (12 consumer pages + system)

```
/                    Home
/why-bidygo          Thesis / manifesto
/founder             Vahagn story (uses src/data/founder.ts)
/for-stores          Primary retailer conversion (uses PartnerForm)
/calculator          ROI tool (stub today — Wave 2 makes it interactive)
/pricing             Three tier bands (uses src/data/pricing.ts)
/contact             Three contact channels (chat block, partner card, press card)
/stories             Pilot wall + 4 lenses + honest "why no studies yet"
/about               Mission + thesis + principles + markets + careers + press
/resources           Article hub (uses src/data/articles.ts)
/resources/[slug]    Article page (3 cornerstone articles)
/solutions/[industry]  5 verticals: electronics, fashion, footwear, beauty, home-goods
/privacy /terms /cookies  Legal stubs (EN-only, OK for compliance)
/404                 Not found
/sitemap.xml /robots.txt  Auto-generated
```

`/partners` → 301 → `/for-stores`. `/case-studies` → 301 → `/stories`. Configured in `next.config.ts`.

### Data layer

All long-form content is **locale-keyed** (`Record<Locale, T>`):

- `src/data/industries.ts` — 5 industries × full structure (hero, pains, whyFails, howHelps, outcomes, faqs)
- `src/data/articles.ts` — 3 articles × full structure (TLDR, sections, callouts, FAQs)
- `src/data/pricing.ts` — 3 tiers (`try` / `run` / `scale` IDs; names natively-conceived per locale)
- `src/data/founder.ts` — Vahagn bio (name renders in local script: `Vahagn` / `Ваагн` / `Վահագն`)

Getters: `getIndustries(locale)`, `getIndustry(slug, locale)`, `getAllIndustrySlugs()`, etc.

### Message layer

`messages/{en,ru,am}.json` — UI strings split by page namespace:

```
meta.{page}         per-page SEO (title, description, ogTitle, ogDescription)
meta.org            Organization JSON-LD description
localeStub          warm "we're translating this" interim
nav                 header + footer link labels
footer              footer-specific
hero                home hero (eyebrow, headline, subhead, CTAs, trustline)
cta                 button labels used everywhere
homePage            home page (pillars, howSteps, industriesGrid, stats, quote, closing)
forStoresPage       /for-stores (problem, flow, commercial, objections, demo)
whyBidygoPage       /why-bidygo
founderPage         /founder (greeting, photo caption)
pricingPage         /pricing (headline, placeholder note, "not sure" block)
calculatorPage      /calculator
storiesPage         /stories (lenses, honest block, apply CTA)
contactPage         /contact (3 channel cards, where-we-are, follow block)
aboutPage           /about (thesis, principles, markets, careers, press)
solutionsPage       /solutions/[industry] shared wrapper (with {category} interpolation)
resourcesPage       /resources hub
articlePage         /resources/[slug] wrapper
forms.partner       PartnerForm labels, options, validation messages
```

Translations are **adaptations, not direct translations**. Headlines re-conceived per language. Tier names natively-conceived per language.

### SEO layer

`src/lib/seo.ts`:
- `buildMetadata({ locale, page, slug?, extra? })` — full localized Metadata with canonical + hreflang alternates + OG + Twitter + correct `og:locale` per language.
- `buildOrganizationJsonLd`, `buildArticleJsonLd`, `buildFaqJsonLd`, `buildBreadcrumbJsonLd` — locale-aware structured-data builders.
- `localeHasContent(locale, page)` — registry that gates `LocaleStub`. Flip a locale into the list when content lands; the stub disappears automatically.

Sitemap: enumerates every route × every locale with hreflang alternates. Lives in `src/app/sitemap.ts`.

### Component inventory

#### Layout
- `Container`, `Section`, `SectionHeader` in `src/components/ui/primitives.tsx`

#### Typography (utility classes in `globals.css`)
- `display-1`, `display-2`, `display-3`, `eyebrow`, `text-balance`, `text-pretty`

#### Interactive
- `Button` (variants: primary/secondary/outline/ghost/link/white; sizes: sm/md/lg/xl) — `src/components/ui/button.tsx`
- `Input`, `Textarea`, `Label`, `Select` — `src/components/ui/primitives.tsx`

#### Site chrome
- `Header` — sticky with utility bar (chat pills + locale switcher), main nav, mobile menu
- `Footer` — warm cream tone, Vahagn signature, 3 link columns, ChatLauncher, social icons
- `Logo` + `LogoMark` — SVG, color/white/ink variants
- `LocaleSwitcher` — accessible dropdown with native names
- `ChatLauncher` — 3 variants (pill/block/compact), per-locale order
- `LocaleStub` — interim for untranslated pages

#### Content cards
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Badge` (variants: default/brand/mint/ink/outline/subtle)

#### Sections
- `PriceItDemo` (`src/components/sections/price-it-demo.tsx`) — shopper-side interactive widget on home + /for-stores

#### Forms
- `PartnerForm` (`src/components/forms/partner-form.tsx`) — client component with `useActionState`, Zod validation server-side via `src/app/actions/partner.ts`

### Design tokens (CSS variables in `src/app/globals.css`)

- `brand-50…900` — orange ramp (oklch)
- `cream-50…300` — warm neutrals
- `ink-50…900` — warm-tinted text colors
- `cocoa-50…900` — warm dark (replaces ink-900 for backgrounds)
- `blush-50…300`, `honey-100…300` — secondary warm accents
- `mint-500`, `berry-500`, `sky-500` — accents
- `--font-sans` (Inter), `--font-display` (Manrope), `--font-signature` (Caveat)
- Section tone variants: `default | muted | cream | cocoa | brand | spotlight` (no `ink`)

---

## Phase history

### Wave 0 — Structural foundation (shipped)
- Next.js 16 + React 19 + Tailwind v4 scaffolded
- Design tokens + Section tone refactor (ink → cocoa)
- Routes renamed (`/partners` → `/for-stores`, `/case-studies` → `/stories`) with 301 redirects
- 4 new page stubs: `/why-bidygo`, `/founder`, `/pricing`, `/calculator`
- Header rebuilt with new nav structure + utility bar + ChatLauncher
- Footer rebuilt (cream tone, signature line, ChatLauncher)
- Stop-slop pass on EN copy
- Build: 47 pages

### Localization Session 1 — Architecture (shipped)
- `src/lib/seo.ts` with `buildMetadata` + JSON-LD builders + `localesWithContent` registry
- `LocaleStub` component (warm interim for untranslated pages)
- Data files refactored to `Record<Locale, T>`: `industries`, `articles`, plus new `pricing` and `founder`
- All 3 message files (`en.json`, `ru.json`, `am.json`) expanded with `meta.{page}` and `localeStub` namespaces
- `docs/translation-brief.md` written (voice rules, anti-patterns per locale, vocab swap, workflow)

### Localization Session 2 — 5 pages translated (shipped)
- All data files populated for AM + RU: `industries` (5 verticals each), `articles` (3 each), `pricing` (3 tiers each), `founder` (full bio)
- `pricingPage`, `founderPage`, `solutionsPage`, `resourcesPage`, `articlePage` namespaces added + pages rewired to use `t()`
- 5 pages flipped in `localesWithContent`: founder, pricing, resources, resourceArticle, industry

### Localization Session 3 — Remaining 7 pages (shipped)
- `whyBidygoPage`, `calculatorPage`, `contactPage`, `aboutPage`, `storiesPage`, `forStoresPage`, `homePage` namespaces added across all 3 locales
- All 7 pages rewired to use `t()` with `t.raw()` for structured arrays and `t.rich()` for inline links
- `forms.partner` namespace added; `PartnerForm` client component rewired with `useTranslations`
- All 12 consumer pages flipped to `["en", "ru", "am"]` in `localesWithContent`
- Build: 51 pages, no LocaleStub fallbacks anywhere

---

## What's next: Wave 2

The conversion-ladder build-out. Scoped, not started.

### Components to build

1. **OfferTicker** (`src/components/sections/offer-ticker.tsx`)
   - Client component
   - Animated rotation through mock offers ("14 min ago — Electronics shop · $245 offer · accepted")
   - Per-locale phrasing (warm, not financial-feed)
   - Used on `/stories` Pulse section and home preview
   - Mock data initially; live data hook for Wave 3

2. **MomentCard** (`src/components/content/moment-card.tsx`) + `src/data/moments.ts`
   - Story-format card: illustration + name + city + vertical + 2-sentence story + 1 supporting metric
   - Locale-keyed data file `Record<Locale, Moment[]>`
   - Used on home (replaces analyst-stat tiles) and `/stories`

3. **Interactive ROI calculator** (`src/components/sections/roi-calculator.tsx`)
   - Three sliders: monthly visitors, baseline conversion, average ticket
   - Live computed result: projected lift, monthly $/₽/֏, payback months
   - Locale-correct currency via `Intl.NumberFormat`
   - Email-gated PDF report (Resend wired)
   - Replaces the stub on `/calculator` page

4. **Dual-demo retailer toggle** in `PriceItDemo`
   - Add toggle between shopper view (existing) and retailer view (incoming offer dashboard)
   - Both views in same widget, swap with motion
   - Retailer view shows: alert UI, "$245 — Accept / Counter / Pass" buttons, daily summary preview

5. **PartnerForm reduction** (5 fields max on first touch)
   - Keep: name, company, email, phone, country
   - Move to post-submit progressive: role, website, category, storeCount, notes
   - Update `src/app/actions/partner.ts` schema accordingly

### Page integration

6. Rewrite home story section using `MomentCard`s instead of metric tiles
7. Rewrite `/stories` Pulse section using `MomentCard` + `OfferTicker`

### Verification

8. Build verification + check all locales

---

## What's after Wave 2

### Wave 3 — Pricing transparency + Trust + Proof
- Real pricing numbers (currently placeholders)
- Recruit one founding partner as public reference
- Replace anonymized Pulse Wall with real partner logo

### Wave 4 — Native review pass on AM/RU copy
- Hire Yerevan retail-savvy copywriter to review all AM strings + data
- Hire CIS retail-savvy copywriter to review all RU strings + data
- Per the quality gate in `docs/translation-brief.md`

### Wave 5 — Distribution
- Founder LinkedIn engine (2 posts/week)
- Trade association outreach
- Programmatic SEO: per-POS pages, per-city pages
- First real case study

---

## Open decisions (need user input before unblocking)

- **Pricing numbers** — currently placeholders ("Try first 30 days free; small share of new sales"). Need real % and caps.
- **Vahagn signature SVG** — handwritten signature SVG files for Latin, Cyrillic, Armenian scripts. Currently rendered with Caveat font.
- **First public partner reference** — name + logo + quote for `/stories`. Currently anonymized.
- **WhatsApp number + Telegram username** — env vars `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_TELEGRAM_USERNAME`. Dev defaults work; production needs real numbers.

---

## Deployment

Vercel-ready. CLI not installed globally; use `npx vercel`. User must run `vercel login` interactively once.

### Required env vars

```
NEXT_PUBLIC_SITE_URL              https://bidygo.com (or staging URL)
RESEND_API_KEY                    for transactional email (partner form)
RESEND_FROM_EMAIL                 "Bidygo <noreply@bidygo.com>"
PARTNERS_INBOX_EMAIL              where partner-form submissions land
NEXT_PUBLIC_WHATSAPP_NUMBER       E.164 format (e.g. +37411223344)
NEXT_PUBLIC_TELEGRAM_USERNAME     without @ (e.g. bidygo)
```

Without `RESEND_API_KEY`, partner form falls back to console logging (dev-friendly).

### Build verification

```bash
npm run build          # production build, prints all static routes
npm run dev            # dev server on :3000
```

---

## How to resume work

1. Read this file (you're doing it).
2. Read `CLAUDE.md` for the quick rules.
3. Pick up wherever "What's next" points.
4. For copy work, also read `docs/translation-brief.md`.
5. Don't ask the user to re-state strategy/brand/architecture — they've locked it and don't want to repeat.
