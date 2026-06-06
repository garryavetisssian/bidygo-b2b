# Bidygo B2B — context for new Claude Code sessions

You are continuing a mature project. **Read `docs/project-state.md` before any work** — it has the full locked spec, current state, and what's next. Do not re-derive anything that's in there.

## Quick orientation

- **Site purpose:** B2B partner-acquisition site for Bidygo (Armenian phygital retail platform). Trust engine + sales enablement, not primary acquisition channel.
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 (`oklch` tokens) · next-intl v4 · Motion · Resend · Zod.
- **Locales:** `en` (default, no prefix), `ru` (`/ru/*`), `am` (`/am/*`). All 3 fully translated for every consumer page. **Never ship mixed-language pages.**
- **Brand:** orange-first, warm, consumer-friendly, shopping-oriented. Never drift toward enterprise SaaS, fintech, or corporate software. Reference brands: Airbnb, Notion, Headspace. Anti-references: Salesforce, HubSpot, SAP.
- **Voice rule (every locale):** like a shop owner talking to another shop owner over tea. Stop-slop applies. See `docs/translation-brief.md` for full voice rules per language.

## How to read this codebase fast

- `src/app/[locale]/*/page.tsx` — every page is a server component that calls `getTranslations` and reads from `src/data/*` (locale-keyed `Record<Locale, T>`).
- `src/data/*.ts` — long-form content (industries, articles, pricing, founder). Locale-keyed. Adding a new locale = populating its array.
- `messages/{en,ru,am}.json` — UI strings split by page namespace (`homePage.*`, `forStoresPage.*`, etc.).
- `src/lib/seo.ts` — `buildMetadata`, JSON-LD helpers, and `localesWithContent[page]` registry that gates LocaleStub.
- `src/components/site/locale-stub.tsx` — renders when a page's locale content isn't ready. Auto-vanishes when locale is added to `localesWithContent`.

## Token-efficient working rules (learned from prior sessions)

1. **Read `docs/project-state.md` first.** It has the current phase, locked decisions, what's next. Saves re-deriving strategy.
2. **Use Edit over Write** when changing <30% of a file. Saves the full-file re-send.
3. **Batch parallel edits in one assistant message** when files are independent. One message with 5 Edit calls is cheaper than 5 messages.
4. **Use Bash sed/perl for bulk renames** across many files instead of looping Edit calls.
5. **Never Read a file you just wrote.** The system already says "file state is current in your context." Trust it.
6. **GateGuard pattern:** every Write/Edit on a new file fires the gate once. Pre-empt with a 4-line facts block in your message before the Write — saves the retry. Required facts: (a) callers, (b) no existing equivalent, (c) data IO, (d) verbatim user instruction.
7. **One Write per file per turn.** Multiple Writes to the same file in one turn confuse the file-state tracker.
8. **Don't re-derive locked decisions.** Strategy, brand, architecture, and UX are locked. Changes need explicit approval; everything else proceeds.

## Locked rules (non-negotiable)

These remain active regardless of future discussions.

- **Localization:** When language changes, *everything* changes (nav, body, forms, metadata, SEO, JSON-LD). No partial translations. No mixed pages.
- **Armenian:** modern, conversational, retail-friendly. Avoid academic / governmental / machine-translated. Write the way a Yerevan shop owner naturally speaks.
- **Russian:** natural CIS retail language. No startup jargon. No literal English translations.
- **Stop-slop:** no startup/SaaS/AI/consulting jargon. Prefer outcomes, simplicity, conversational language.
- **Visual identity:** orange-first, optimistic, consumer-friendly, shopping-oriented. No drift to enterprise SaaS / fintech / crypto / corporate.
- **Brand principle:** retailers feel "I want my store to be part of this." Consumers feel "I want to use this." This overrides generic B2B patterns.
- **Per-locale SEO:** every locale gets uniquely-written titles, descriptions, OG copy, JSON-LD content. Not translated.

## Vocabulary (public-facing)

| Don't | Do |
|---|---|
| Partner / retail partner | Shop / shop owner / retailer |
| Founding cohort | First shops |
| Onboarding / implementation | Setup |
| Integration | Works with |
| POS-agnostic | Works with whatever you use today |
| Conversion lift | More sales |
| Willingness to pay | What shoppers will actually pay |
| Pilot | First few weeks / trial |
| Enterprise | For chains |
| Phygital | (don't use) describe the actual thing |
| Customer-led pricing | (don't use publicly) "your shoppers offer, you decide" |
| Platform | App / tool / "Bidygo" |

## Pointers

- `docs/project-state.md` — comprehensive state, phase history, what's next per phase
- `docs/translation-brief.md` — voice rules + per-locale anti-patterns + vocab swap
- `README.md` — quickstart and architecture for humans
- `AGENTS.md` — same project guidance for non-Claude agents (Codex, Gemini, etc.)

## When the user says

- **"start wave 2"** → see `docs/project-state.md` § Wave 2 plan. Don't ask what's in scope.
- **"deploy"** → use `npx vercel` (CLI not installed globally). User must run `vercel login` interactively once first. Env-var list in `docs/project-state.md`.
- **"add a new article" / "add an industry"** → edit `src/data/articles.ts` / `src/data/industries.ts` adding to all 3 locale arrays. Sitemap and routes auto-pick it up.
- **"translate page X to RU/AM"** → if the page isn't in `localesWithContent[X]`, the recipe is: populate `messages/{ru,am}.json` namespace, populate data files if needed, add the locale to `localesWithContent[X]` in `src/lib/seo.ts`.
