# Bidygo B2B — agent context

**Before any work, read `docs/project-state.md`.** It has the full locked spec, current state, and what's next.

For Claude Code, `CLAUDE.md` also auto-loads. For Codex / Gemini / other agents, this file is the entry point.

## Quick orientation

- B2B partner-acquisition site for Bidygo (Armenian phygital retail platform). Trust engine + sales enablement.
- Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 (`oklch`) · next-intl v4 · Motion · Resend · Zod.
- Locales: `en` (default), `ru` (`/ru/*`), `am` (`/am/*`). All 3 fully translated. **Never ship mixed-language pages.**
- Brand: orange-first, warm, consumer-friendly. **No drift to enterprise SaaS / fintech / corporate.** Reference brands: Airbnb, Notion, Headspace.

## Non-negotiable rules

- Localization: when language changes, *everything* changes (nav, body, forms, metadata, JSON-LD). LocaleStub renders when content isn't ready.
- Voice: shop-owner conversational across all 3 locales. See `docs/translation-brief.md` for per-locale anti-patterns.
- Stop-slop on all copy: no SaaS / consulting / AI jargon.
- Per-locale SEO is hand-written, not translated.

## Where things live

- `src/app/[locale]/*/page.tsx` — server components reading from `src/data/*` (locale-keyed) and `messages/*.json` via next-intl
- `src/data/{industries,articles,pricing,founder}.ts` — long-form content, `Record<Locale, T>`
- `messages/{en,ru,am}.json` — UI strings, page-namespaced
- `src/lib/seo.ts` — `buildMetadata`, JSON-LD builders, `localesWithContent` registry
- `src/components/site/*` — Header, Footer, Logo, LocaleSwitcher, ChatLauncher, LocaleStub
- `src/components/ui/*` — Button, primitives (Container, Section, Card, Badge, Input, …)
- `src/components/sections/price-it-demo.tsx` — the interactive product demo on home + /for-stores
- `src/components/forms/partner-form.tsx` — client form, wired to server action

## Working efficiently in this repo

- Edit > Write when changing <30% of a file.
- Use `sed`/`perl` for bulk renames across files.
- Don't re-read files you just wrote.
- Don't re-derive locked decisions. They're in `docs/project-state.md` and `CLAUDE.md`.

## Next.js note

This is Next.js 16+ with Turbopack defaults. APIs and conventions may differ from older training data. The `middleware` file convention is deprecated in favor of `proxy` — currently both warnings are noted but middleware still works. Verify against `node_modules/next/dist/docs/` if uncertain.

## Pointers

- `docs/project-state.md` — phase history, locked decisions, current state, what's next
- `docs/translation-brief.md` — voice rules + per-locale anti-patterns + vocab swap
- `CLAUDE.md` — Claude-specific quick rules (mostly duplicated here for parity)
- `README.md` — human-facing quickstart
