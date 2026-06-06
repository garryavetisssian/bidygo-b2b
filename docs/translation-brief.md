# Bidygo Translation Brief

For everyone (human or AI) writing Armenian or Russian content for Bidygo.

This document is the contract. Read it before touching `messages/*.json` or any `src/data/*.ts` file. If you disagree with any rule here, talk to Vahagn before writing.

---

## 1. Voice (the most important section)

Bidygo's voice in any language sounds like **a shop owner talking to another shop owner over tea, not a software company addressing a buyer**.

This means three things, in every language:

1. **Specific, not abstract.** Real moments. Real numbers. A shopper holding headphones, not "a customer engaging with a product."
2. **Active, not passive.** "We answer in seconds." Not "responses are provided promptly."
3. **Human, not corporate.** Contractions are good in English. Casual vocabulary is good in every language. The site reads like a friendly conversation.

If a sentence reads like a press release, it's wrong. Rewrite it.

---

## 2. Localization is not translation

Headlines, taglines, and CTAs are **re-conceived** per language, not translated word-for-word.

Example:

| Surface | English | Bad translation (RU) | Good adaptation (RU) |
|---|---|---|---|
| Hero headline | "Turn one in five walk-outs into a buyer." | "Превратите одного из пяти ушедших в покупателя." | "Не упускайте каждого пятого покупателя." |
| Footer signature | "Built in Yerevan. With shopkeepers, for shopkeepers." | "Построено в Ереване. С владельцами магазинов, для владельцев магазинов." | "Из Еревана. От владельцев магазинов — владельцам магазинов." |

The bad versions are technically correct. They read as foreign. The good versions read as if someone in Moscow or Tbilisi wrote them from scratch with the same intent.

When translating a headline, ask: **what would this person actually say in this language to a friend who owns a shop?** Write that.

---

## 3. Armenian rules

The locked spec is explicit:

- Use **modern, conversational, retail-friendly Armenian**.
- Write the way a real Yerevan shop owner would naturally speak.
- Avoid academic Armenian.
- Avoid governmental / bureaucratic Armenian.
- Avoid machine-translated phrasing.

### Anti-patterns to flag and rewrite

| Anti-pattern | Why it's wrong | Better |
|---|---|---|
| `պլատֆորմ` (platform) | Anglicism that signals SaaS | Plain words — say what the thing does |
| `լուծում` (solution) used to mean "product" | Consultancy speak | Say the actual thing ("Bidygo", "the app") |
| Long Sanskrit-style noun chains | Soviet / academic | Break into short sentences |
| `տրամադրվում է` (is provided) | Passive bureaucratic | "We provide" / "We give" — active voice |
| `բարձր արդյունավետություն` (high efficiency) | Empty corporate phrase | Name the actual outcome |
| Headlines built on `միջոցով` (by means of) | Reads as official document | Restructure as plain statement |

### Voice anchor

Imagine Anna, 52, who owns an electronics shop on Tigran Mets in Yerevan. She has been running shops for 18 years. She doesn't have time for marketing language. She wants to know if this thing will sell more headphones this Saturday or not.

Every Armenian line should sound like something Anna would believe and forward to her brother (who runs a fashion shop in Tbilisi).

---

## 4. Russian rules

The locked spec is explicit:

- Use natural CIS retail language.
- Avoid direct English translation patterns.
- Avoid startup jargon.
- Avoid artificial business language.

### Anti-patterns to flag and rewrite

| Anti-pattern | Why | Better |
|---|---|---|
| `решение` (solution) for "product" | Consultancy / marketing speak | Name the product directly |
| `платформа` (platform) | SaaS-coded | "приложение", "сервис", "сайт" or just "Bidygo" |
| `оптимизировать` (optimize) | Generic Western consulting | "улучшить", "ускорить", concrete verb |
| `позволяет вам` (allows you to) | Stilted calque from English | Recast as direct ("вы можете" or "магазин видит") |
| `на основе данных` (data-driven) | Hollow buzzphrase | Specific source ("по предложениям из ваших магазинов") |
| `высокая конверсия` (high conversion) | Marketing-deck Russian | "больше покупок", "больше людей доводят покупку до конца" |
| Headlines that lead with `Bidygo предоставляет...` | Press release tone | Lead with the shop owner's situation, then Bidygo's role |

### Voice anchor

Sergey, 47, owns a small chain of three fashion shops in Tbilisi and one in Yerevan. Speaks Russian at work, English with suppliers. He thinks "стартап" is mildly suspect. He trusts other shop owners more than marketing.

Russian content should sound like Sergey's nephew (who knows tech and respects Sergey) explaining a new tool, not like a startup pitching him.

---

## 5. Vocabulary swap table

Hold these consistently across both Russian and Armenian.

| Don't write | Write instead |
|---|---|
| Partner / retail partner | Shop, shop owner, retailer |
| Founding cohort | First shops, the first shops working with us |
| Onboarding | Setup, getting started |
| Implementation / deployment | Setup, first day, the moment it goes live |
| Integration | Works with |
| POS-agnostic | Works with whatever you use today |
| Conversion lift | More sales, more buyers |
| Willingness to pay | What shoppers will actually pay |
| SKU | Product, item, the thing on the shelf |
| Vertical | Category (or just the name) |
| Pipeline | Conversations, interest |
| Demo | A quick look, a walk-through |
| Pilot | First few weeks, trial |
| Enterprise | For chains, for big networks |
| Stack | Tools |
| ROI | What you'll see / what changes |
| Optimize | Improve, make faster, make better |
| Leverage | Use |
| Solution | Way (or describe the thing directly) |
| Phygital | Don't use this word. Describe what happens instead. |
| Customer-led pricing | Don't use this phrase publicly. Use: "your shoppers offer the price, you decide." |
| Platform | App, tool, or just "Bidygo" |

---

## 6. Tier names (each language gets its own)

The English tier names are `Try Bidygo`, `Run Bidygo`, `Bidygo for chains`.

These are English idioms. Each language gets natively-conceived names that match the *meaning*, not the words.

| Tier | English | Russian (proposed — review) | Armenian (proposed — review) |
|---|---|---|---|
| Tier 1 (free trial) | Try Bidygo | Попробовать Bidygo | Փորձիր Bidygo-ն |
| Tier 2 (pay on results) | Run Bidygo | Запустить Bidygo | Աշխատացրու Bidygo-ն |
| Tier 3 (chains) | Bidygo for chains | Bidygo для сетей | Bidygo ցանցերի համար |

These are starting points. A native speaker should propose better ones if these read awkward.

The tier `id` in code (`try` / `run` / `scale`) never changes — only the `name` field per locale.

---

## 7. Vahagn signature

Vahagn renders in the local script per locale:

- EN: `Vahagn`
- RU: `Ваагн`
- AM: `Վահագն`

Used in the footer, founder card, and end-of-essay sign-offs. Already accounted for in `src/data/founder.ts` (the `name` field per locale).

---

## 8. WhatsApp vs Telegram order

The `chatChannelOrder()` function in `src/lib/contact.ts` already handles this:

- RU: Telegram first, WhatsApp second
- EN, AM: WhatsApp first, Telegram second

Translators don't change this. Just be aware: in RU copy, when referring to chat, default to "Telegram" first if you must pick one.

---

## 9. Number formatting

Every numeric output passes through `Intl.NumberFormat(locale)`. Don't hard-code numbers with separators. Use the locale's native conventions:

- EN: `1,240` `$8,400`
- RU: `1 240` `8 400 ₽`
- AM: `1 240` `3 300 000 ֏`

Currency per locale:

- EN: USD ($)
- RU: RUB (₽)
- AM: AMD (֏)

In the calculator and pricing, large AMD numbers may need abbreviation ("≈3.3 մլն ֏" instead of "3 300 000 ֏"). Use your judgment per surface.

---

## 10. SEO content per locale

Per the locked rule: **every locale gets uniquely-written SEO content, not translated.**

This means:

- `messages/{locale}.json` → `meta.{page}.title` and `.description`: hand-written in the locale, optimized for what shoppers in that market actually search.
- OG titles (`ogTitle`, `ogDescription`): also hand-written. Often shorter and more direct than the `<title>`.
- JSON-LD descriptions: built from these same fields.

Keyword research per locale is the translator's responsibility:

- AM keywords: what Yerevan retailers actually type into Google when looking for "увеличить продажи / increase sales" software. Probably mostly in Russian, with some Armenian. Use Google Trends Armenia.
- RU keywords: CIS retail SaaS market. "увеличить выручку магазина", "POS система для магазина", etc.
- EN keywords: international retail SaaS. Long-tail: "in-store offer software", "shopper price negotiation", etc.

Don't translate the English meta directly. Write what your audience would search.

---

## 11. Workflow

When you finish a translation pass for a locale:

1. Update `messages/{locale}.json` with all keys.
2. Update `src/data/industries.ts` — populate the locale array.
3. Update `src/data/articles.ts` — populate the locale array.
4. Update `src/data/pricing.ts` — populate the locale array.
5. Update `src/data/founder.ts` — populate the locale entry.
6. Add your locale to `localesWithContent` in `src/lib/seo.ts` per page that you completed.
7. Submit a PR. Tag a second native speaker for review.
8. Run `npm run build` locally. If it passes, push.

The site auto-removes the LocaleStub as `localesWithContent` fills in. There's no separate "publish" step.

---

## 12. Quality gate

A locale's content passes when:

- [ ] A native L1 reviewer who has never seen the EN version reads the localized page and would believe it was written first in that language.
- [ ] No anti-patterns from sections 3 / 4 / 5 remain.
- [ ] Numbers, dates, and currency render correctly in that locale.
- [ ] Tier names sound natural, not translated.
- [ ] Headlines have been re-conceived, not translated.
- [ ] WhatsApp / Telegram references match the locale's default order.
- [ ] `npm run build` passes.

---

## 13. When in doubt

Ask Vahagn. The voice is his.

If he's unreachable: lean toward the simpler, warmer, more specific version. That's almost always right.

— Bidygo team
