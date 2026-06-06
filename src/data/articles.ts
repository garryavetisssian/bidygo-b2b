import type { Locale } from "@/i18n/routing";

export type ArticleCategory =
  | "Retail Growth"
  | "Pricing Strategy"
  | "Customer Acquisition"
  | "Inventory Management"
  | "Modern Retail"
  | "Retail Engagement";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  callout?: { title: string; body: string };
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  readMinutes: number;
  publishedISO: string;
  updatedISO?: string;
  author: string;
  image?: string;
  hero: { emoji: string; bgClass: string };
  tldr: string[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const articlesEn: Article[] = [
  {
    slug: "customer-led-pricing",
    title: "Shopper-Offered Pricing, Explained",
    description: "What it is, why it's eating traditional discounting, and how to deploy it without losing control of your shelf price.",
    category: "Pricing Strategy",
    readMinutes: 8,
    publishedISO: "2026-02-12",
    author: "Bidygo team",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Customer-led pricing means the buyer proposes; the retailer decides.",
      "Unlike blanket discounts, it captures shoppers who would have walked out — without lowering price for those who'd have paid full.",
      "It works best in categories with high consideration and frequent walk-out: electronics, fashion, home goods.",
      "Done right, it lifts conversion and protects margin simultaneously.",
    ],
    sections: [
      {
        heading: "The pricing question every retailer answers wrong.",
        paragraphs: [
          "Most retailers answer one question with their pricing: \"What's the right number to put on the shelf?\" They optimize that number with cost-plus formulas, competitor scrapes, and gut feel. Then they call it a day.",
          "But the shelf price is only the right number for one shopper: the shopper who would have paid it. For everyone else — the half who walks out — it's the wrong number. Customer-led pricing flips the question. Instead of asking \"what's our price?\", it asks \"what's the price at which each individual shopper would commit?\"",
        ],
      },
      {
        heading: "Why blanket discounts cost more than they earn.",
        paragraphs: [
          "When you mark down a SKU by 20%, three groups of shoppers walk in: the ones who would have paid full, the ones who'd have paid 10% off, and the ones who needed the full 20% to commit. The first two groups get a windfall. You lose margin from them with no behavioral change in return.",
          "The third group is the only one whose behavior the discount actually changes. And you paid for the first two groups' discount to reach them. Customer-led pricing solves this: only the third group ever asks for 20% off. Groups one and two pay shelf.",
        ],
        callout: {
          title: "The economics, briefly.",
          body: "If your typical promo is -20% across the board and only 30% of buyers needed it to convert, you're paying 70% of the discount to shoppers who would have bought anyway. Customer-led pricing reverses that ratio.",
        },
      },
      {
        heading: "Three failure modes to avoid.",
        paragraphs: [
          "First, don't let it become a haggle market. Customers shouldn't expect to negotiate every purchase — that erodes brand trust and slows checkout. Customer-led pricing should be a quiet option in the background, not the default flow.",
          "Second, don't lose the floor. Every negotiated price must clear a minimum you set. Without this, individual store managers will erode margin in pursuit of short-term close rates.",
          "Third, don't accept-without-signal. Even rejected offers are data. A retailer who only sees accepted offers misses the curve of willingness-to-pay below the floor.",
        ],
      },
      {
        heading: "When shopper-offered pricing wins — and when it doesn't.",
        paragraphs: [
          "It wins in high-consideration categories with frequent walk-out: electronics, fashion, footwear, home goods, beauty. It also wins on aged inventory, end-of-season tails, and floor models — anywhere the alternative is a public markdown.",
          "It loses on commodity goods (groceries, daily essentials), on appointment-priced services, and in categories where shoppers don't perceive negotiation as appropriate (luxury, prescription).",
        ],
      },
      {
        heading: "How to deploy it.",
        paragraphs: [
          "Start with one category in one store. Set a floor on each SKU. Open the negotiation channel for shoppers who scan that SKU. Watch the data for 30 days: how many offers, what shape is the distribution, what's the close rate above your floor.",
          "Then tune. Tighten floors on SKUs that are over-converting. Loosen on SKUs that aren't moving. Expand to the next category once the team is comfortable.",
        ],
      },
    ],
    faqs: [
      { q: "Doesn't this just train shoppers to negotiate everything?", a: "Only if you make it the default. When it's a quiet, opt-in option for hesitating shoppers, the average buyer never engages with it. Less than 10% of shoppers in our pilots ever make an offer; the rest pay shelf." },
      { q: "How is this different from a coupon code?", a: "Coupons are public, anonymous, and one-size. Customer-led pricing is private, identified, and per-SKU. You see who's asking for what, on which item, and decide." },
      { q: "Can I do this manually without software?", a: "You can — that's traditional bazaar selling. The reason most modern retailers don't is that it doesn't scale past one negotiator. Software gives you per-SKU policies, audit trails, and category-level analytics." },
    ],
    related: ["why-discounts-hurt-margin", "in-store-online-retail-explained"],
  },
  {
    slug: "why-discounts-hurt-margin",
    title: "Why Blanket Discounts Hurt Margin More Than You Think",
    description: "The hidden cost of every site-wide promotion, and the maths retail buyers don't run often enough.",
    category: "Pricing Strategy",
    readMinutes: 7,
    publishedISO: "2026-02-20",
    author: "Bidygo team",
    hero: { emoji: "📉", bgClass: "bg-[oklch(0.92_0.06_330)]" },
    tldr: [
      "Blanket discounts subsidize shoppers who'd have paid full price.",
      "Most retailers underestimate the true cost because they only look at accepted-order margin, not foregone full-price margin.",
      "A 20%-off promo typically loses more contribution margin than it gains in new orders.",
      "Per-shopper negotiation captures the same incremental orders without the subsidy.",
    ],
    sections: [
      {
        heading: "The maths nobody runs.",
        paragraphs: [
          "Pull the next promo report you receive. It will tell you orders during the sale, revenue during the sale, and average order value. It probably won't tell you contribution margin per order, and it certainly won't tell you the counterfactual: how many of those orders would have happened at full price.",
          "Most accounting treats the entire discounted revenue as 'incremental.' It isn't. A large share of any promo's orders are from shoppers who would have bought anyway. The discount is a transfer payment from the retailer to those shoppers, masquerading as a marketing spend.",
        ],
      },
      {
        heading: "An example, with real numbers.",
        paragraphs: [
          "A $200 SKU with $80 contribution margin runs a -20% promo. List drops to $160. Margin per order drops to $60. The retailer typically sees a 25% lift in volume over the promo window — say 1,000 orders vs. 800 baseline.",
          "The headline: $160,000 in promo revenue vs. $160,000 in baseline. Flat, right? But contribution margin: $60,000 vs. $64,000. The promo lost $4,000 in margin, not because it didn't lift volume, but because the 800 baseline buyers got the discount too — and the 200 incremental buyers didn't make up for it.",
        ],
        callout: {
          title: "The general rule.",
          body: "If the incremental margin per new buyer is less than the foregone margin per discounted existing buyer × the ratio of baseline to incremental, the promo loses money on a contribution basis.",
        },
      },
      {
        heading: "The training problem.",
        paragraphs: [
          "Even when promos break even in-period, they have a second-order cost: they train your customer base to wait. The next time a shopper sees a $200 SKU at full price, they remember the -20% they got last month and assume another sale is coming. They wait.",
          "This is why retailers who run frequent sales often see their non-sale conversion drop year-over-year. They've trained their best customers into the worst possible buying behavior.",
        ],
      },
      {
        heading: "What to do instead.",
        paragraphs: [
          "Either commit to a no-sale model and protect full-price conversion, or move the discounting off the shelf and into a private channel. Customer-led pricing is the second option: every accepted offer is a transaction the retailer chose to make at that price, with that shopper, on that SKU.",
          "The shelf price never moves. The brand never trains shoppers to wait. The retailer captures the additional volume that would have walked out, at a price the retailer specifically approved.",
        ],
      },
    ],
    faqs: [
      { q: "Are seasonal sales always bad?", a: "No — true clearance (move-or-throw-away inventory) is rational. The argument is against habitual promotion as a conversion lever for in-season stock." },
      { q: "What about competitive price matching?", a: "Price matching is reactive promo on a per-SKU basis. It can be more efficient than blanket discounts, but it still subsidizes shoppers who'd have paid full. Per-shopper negotiation is more targeted again." },
      { q: "Does this apply to e-commerce too?", a: "Yes — and it's actually easier to instrument online. The retail problem is harder because shoppers walk in and out without leaving identifiers; shopper-offered pricing solves that with the app interaction." },
    ],
    related: ["customer-led-pricing", "in-store-online-retail-explained"],
  },
  {
    slug: "in-store-online-retail-explained",
    title: "When the in-store moment goes online",
    description: "What it actually means, why analyst slides keep getting it wrong, and the three real shifts that matter.",
    category: "Modern Retail",
    readMinutes: 6,
    publishedISO: "2026-03-04",
    author: "Bidygo team",
    hero: { emoji: "🔗", bgClass: "bg-[oklch(0.92_0.06_240)]" },
    tldr: [
      "In-store + online ≠ omnichannel. Omnichannel is about consistency across channels; in-store-online is about layering digital interaction into the physical visit itself.",
      "The three real shifts: identification, interaction, instrumentation.",
      "The category isn't about screens on shelves — it's about giving the shopper a way to act on what they see, in the store, without leaving it.",
      "Customer-led pricing is one of the highest-leverage in-store-online plays available right now.",
    ],
    sections: [
      {
        heading: "What 'in-store-online' actually means.",
        paragraphs: [
          "The word is overloaded. Half the analyst reports use it to mean 'we put an iPad in the store.' That's not it. In-store + online, properly used, means the physical visit and the digital interaction are happening in the same moment, on the same product, in the same flow.",
          "The shopper isn't checking the app at home and then coming to the store. They're standing at the shelf, holding the product, and using the app to do something they couldn't do before — like propose a price.",
        ],
      },
      {
        heading: "Identification.",
        paragraphs: [
          "Physical retail's biggest weakness has always been anonymity. You see your foot traffic, you see your sales, you can't connect the two. You don't know which shoppers walked out without buying, or which products they were holding when they left.",
          "In-store + online changes this: the shopper opens an app that identifies them. Now you know who walked the aisle, what they looked at, what they nearly bought. Every interaction becomes a known event in a known shopper's journey.",
        ],
      },
      {
        heading: "Interaction.",
        paragraphs: [
          "Static retail is one-way: the price is the price, the shelf is the shelf, take it or leave it. In-store + online retail is two-way: the shopper can act on what they see, in real time, while still in the store. They can scan, compare, propose, save, share.",
          "The retailer can respond in the same moment. They can confirm stock, approve an offer, suggest a bundle, route to a sales associate. The store becomes a place where transactions are negotiated, not just executed.",
        ],
        callout: {
          title: "The conversion implication.",
          body: "When you can intervene before the shopper leaves, you convert the marginal sales that pure-static retail loses. Most stores' real conversion gap isn't 'people who weren't interested' — it's 'people who were interested but hesitated and walked.'",
        },
      },
      {
        heading: "Instrumentation.",
        paragraphs: [
          "The third shift is the one analysts undersell: you finally get data. Every offer, every walk-out, every consideration set. You learn willingness-to-pay per SKU, per shopper segment, per day-of-week.",
          "Pre-in-store-online, you had POS data (what sold, at what price) and traffic counts (how many came in). You had no signal on the gap between them. In-store + online instrumentation fills that gap. You now know what would have sold, at what price, to which shopper.",
        ],
      },
      {
        heading: "Where to start.",
        paragraphs: [
          "Don't start with shelf hardware. Don't start with AR mirrors. Start with the simplest in-store-online pattern: give your shoppers an app that lets them do one thing they can't do today — and watch what happens.",
          "Bidygo's bet is that the one thing is price negotiation. It's the highest-leverage shopper interaction we know of, because it converts the marginal walk-outs without subsidizing the rest. Other valid bets exist; this is ours.",
        ],
      },
    ],
    faqs: [
      { q: "How is in-store-online different from omnichannel?", a: "Omnichannel asks: 'is the experience consistent across web, mobile, and store?' In-store + online asks: 'is the in-store experience augmented by digital in the moment?' Omnichannel is about parity; in-store-online is about new capability." },
      { q: "Do we need WiFi in our stores?", a: "Not necessarily — modern shoppers have data. But in-store WiFi increases app engagement materially. We recommend it for partners running pilots." },
      { q: "What does in-store-online mean for staff?", a: "Staff become consultants and negotiators rather than transaction processors. The repetitive work moves to software; the human work moves up-stack." },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin"],
  },
  {
    slug: "shopper-led-pricing",
    title: "Shopper-led pricing: how it works and where it fits in modern retail",
    description: "Shopper-led pricing lets the shopper propose a price and the retailer's rules respond automatically. Here's how the mechanic actually works, where it fits, and how to set it up without giving away margin.",
    category: "Pricing Strategy",
    readMinutes: 14,
    publishedISO: "2026-03-15",
    updatedISO: "2026-06-01",
    author: "Vahagn Khachatryan",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Shoppers propose the price they would actually pay; the retailer's pre-set rules accept, counter, or decline — usually within seconds.",
      "The shelf price never moves. Negotiated prices are private to the individual shopper who initiated the conversation.",
      "It captures the shopper who would have walked out, without lowering the price for the shopper who would have paid full.",
      "It works in high-consideration categories — electronics, fashion, footwear, home goods, beauty. It does not fit grocery or commodity.",
      "It requires automation. Manual approval per offer recreates the friction shoppers were trying to avoid.",
    ],
    sections: [
      {
        heading: "The pricing question every retailer has been answering wrong",
        paragraphs: [
          "The shelf price is the answer to one question: what's the right number to put on this product? Retailers optimize that number with cost-plus formulas, competitor scrapes, and gut feel. Then they call it a day. But that question optimizes for the median shopper, and retail isn't median — it's a distribution. Some shoppers were always going to pay full price. Others were never going to pay full price. The shelf price serves the first group well and the second group not at all.",
          "The second group is the walk-out. They came in for something specific, handled the product, hesitated at the shelf, and left. Most retailers don't measure walk-outs because the POS doesn't track them, and over time the invisibility becomes default. The walk-out becomes a sunk cost — not a recoverable opportunity. Shopper-led pricing inverts that assumption by making the second group visible, and answerable.",
        ],
      },
      {
        heading: "How shopper-led pricing actually works",
        paragraphs: [
          "The mechanic is simple to describe and harder to execute well. A shopper in your store sees a product they want but hesitate at the price. They scan the barcode with their phone — native camera, no app install. Bidygo opens a product page on their phone showing the shelf price. The shopper enters the price they would actually pay and submits.",
          "Behind the scenes, the rule engine checks the offer against the floor and ceiling you've set for that SKU. Within seconds, the shopper sees one of three answers: accepted, countered with a specific price, or declined. If accepted (or if they accept the counter), a proof appears on their phone. They go to checkout, the cashier scans the proof, the sale closes at the agreed price. Your existing POS system, payment processor, and receipt printer don't change. The negotiation lives entirely between the shopper's phone and Bidygo's rule engine.",
        ],
        callout: {
          title: "Three outcomes, every time",
          body: "Auto-accept (offer ≥ ceiling), auto-counter (offer between floor and ceiling), or auto-decline (offer < floor). The retailer never reviews individual offers — the rule engine decides every one.",
        },
      },
      {
        heading: "The shelf price stays the shelf price",
        paragraphs: [
          "This is the structural difference between shopper-led pricing and any form of public discounting: the shelf doesn't move. Only the individual shopper who initiated the conversation ever sees the negotiated price. Everyone else continues to see the listed price.",
          "It matters more than it sounds. The shelf price is what builds your brand's price perception. It's what you report to suppliers under MSRP and minimum-advertised-price agreements. It's the anchor against which a $25 negotiation on a $349 item feels like a real win to the shopper. Public discounting devalues all three. A storewide '10% off' sale isn't perceived as a single transaction — it's perceived as the new baseline. Shopper-led pricing leaves the baseline intact.",
        ],
      },
      {
        heading: "What makes it different from discounting",
        paragraphs: [
          "A 10% storewide sale gives a discount to three groups of shoppers: those who would have paid full, those who would have paid 10% off naturally, and those who needed exactly that to convert. The first two groups are a margin gift the retailer didn't need to give. Only the third group's behavior actually changed. Shopper-led pricing inverts this — only the third group ever asks. Groups one and two pay shelf.",
          "That's the entire economic argument for the model: same recovered conversion, less margin given away. In a 12-week pilot across electronics, fashion, and footwear, retailers running shopper-led pricing saw 4–9% revenue lift with less than 2% margin compression — compared to 5–7% revenue lift and 6–10% margin compression for equivalent-period discount campaigns. The relative efficiency is roughly 3×.",
        ],
      },
      {
        heading: "What makes it different from dynamic pricing — and from haggling",
        paragraphs: [
          "Dynamic pricing (Pricer, Wiser, Competera) changes the listed price over time based on demand, inventory, and competitor signals. Every shopper at a given moment sees the same price. That's a fundamentally different mechanism. Dynamic pricing is the retailer adjusting publicly; shopper-led pricing is the shopper initiating privately. The two can coexist — dynamic re-prices the shelf weekly, shopper-led handles individual asks on top.",
          "The cultural baggage of haggling is the biggest objection retailers raise. They don't want their staff in a back-and-forth with every shopper. Shopper-led pricing removes the human from the loop. The shopper proposes; the rules respond. Staff don't negotiate, don't approve, don't decline. They process the sale at checkout. This is the difference between a bazaar and Bidygo: a bazaar requires labor; Bidygo requires rules.",
        ],
      },
      {
        heading: "The four numbers that make it work",
        paragraphs: [
          "You configure four things per SKU or category. The floor is the lowest price you'd accept — usually well above cost, set at the level below which you'd rather hold inventory than sell. The ceiling is the price at or above which the engine auto-accepts without sending a counter — usually 5% below the shelf. Counter logic defines what the engine proposes when an offer falls between the two — common rules include midpoint, fixed margin above floor, or percentage-of-shelf by category. Time-of-day and inventory-driven adjustments let you shift any of these based on sell-through.",
          "The accept rate — the percentage of offers that become sales, including counters the shopper accepts — is the headline metric that comes out of these four. A healthy accept rate is 35–55% across most consideration categories. Below 25%, your floors are too tight (you're declining too many shoppers who would have converted at slightly higher prices). Above 65%, your floors are too loose (you're giving away margin to shoppers who would have paid more). The dashboard surfaces accept rate trends so the retailer can tune over time.",
        ],
      },
      {
        heading: "Where shopper-led pricing fits — and where it doesn't",
        paragraphs: [
          "It fits high-consideration categories: electronics, fashion, footwear, home goods, beauty. It fits items shoppers spend time evaluating, comparing, hesitating over. It fits items where margin is healthy enough to negotiate (25%+). It fits seasonal inventory where end-of-season margin is better than carry-over to next year.",
          "It does not fit grocery — purchases are need-driven, low-consideration, with margins too thin to negotiate. It does not fit commodity items where shoppers can price-check online in seconds. It does not fit extremely low-ticket items where the friction of asking exceeds the value of the negotiation. Honest assessment up front saves the operator from running the experiment in the wrong category. The model isn't universal, and pretending otherwise wastes everyone's time.",
        ],
      },
    ],
    faqs: [
      { q: "Won't shoppers learn to always offer less?", a: "Some will. The floor protects you, and the average accepted price across categories runs about 92% of shelf — meaning even the 'always asks' shopper typically pays close to full. The shoppers who would have walked out at full price are still net positive at 88%." },
      { q: "How is this different from cashier-discretion discounting at the counter?", a: "Cashier discretion has three problems: it scales linearly with labor, it's inconsistent across staff, and it trains shoppers to ask the loudest. Shopper-led pricing applies your rules uniformly, instantly, on every shopper, with no staff time." },
      { q: "What if my supplier prohibits any discount?", a: "Most MSRP and minimum-advertised-price contracts apply to publicly listed prices. Bidygo's negotiated prices are private — visible only on the individual shopper's phone, not on the shelf, not on receipts, not on store advertising. In practice this coexists with MSRP for most suppliers; confirm specifically with your contract language." },
      { q: "Will my staff have to negotiate manually?", a: "No. The rule engine handles every offer automatically. Staff intervention is reserved for edge cases the retailer explicitly chooses to escalate — very large basket sizes, repeated suspicious patterns, or specific SKUs the operator has flagged for human review." },
      { q: "Does this work for low-margin or commodity products?", a: "Generally no. If your margin is 8% on a SKU, there's no room to negotiate without losing money. Bidygo works best at 25%+ margins, in categories where shoppers actively consider before buying. We'll tell you honestly if your category isn't a fit during the first conversation." },
      { q: "How does this affect my walk-out rate?", a: "Walk-out rate is the metric to watch. Across our first cohort, walk-out rate dropped 1.5–3 percentage points in the first 90 days, which translates to 4–9% revenue gain in high-consideration categories. The dashboard reports walk-out rate weekly so you can see the effect." },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin", "in-store-online-revolution"],
  },
];

// REVIEW REQUIRED: native CIS-retail copywriter (see docs/translation-brief.md)
const articlesRu: Article[] = [
  {
    slug: "customer-led-pricing",
    title: "Цена, которую предлагает покупатель, простыми словами",
    description:
      "Что это такое, почему она съедает обычные скидки, и как её запустить, не теряя контроль над ценой на полке.",
    category: "Pricing Strategy",
    readMinutes: 8,
    publishedISO: "2026-02-12",
    author: "Команда Bidygo",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Цена, которую предлагает покупатель — это когда покупатель называет цифру, а магазин решает.",
      "В отличие от скидок «всем», она ловит тех, кто иначе ушёл бы — без подарка тем, кто заплатил бы полную цену.",
      "Лучше всего работает там, где покупатель долго думает: электроника, одежда, мебель.",
      "Сделано правильно — поднимает конверсию и сохраняет маржу одновременно.",
    ],
    sections: [
      {
        heading: "Вопрос о цене, на который большинство магазинов отвечает неправильно.",
        paragraphs: [
          "Большинство магазинов задают себе один вопрос: «какую цифру поставить на полке?». Оптимизируют её через себестоимость, парсинг конкурентов и интуицию. И на этом останавливаются.",
          "Но цена на полке правильная только для одного покупателя — того, кто согласился её заплатить. Для всех остальных, той половины, что уходит, она неправильная. Цена, которую предлагает покупатель переворачивает вопрос. Вместо «какая у нас цена?» спрашиваем «какая цена закрыла бы каждого конкретного покупателя?».",
        ],
      },
      {
        heading: "Почему скидки на всё стоят больше, чем приносят.",
        paragraphs: [
          "Когда вы делаете -20% на SKU, в магазин заходят три группы. Те, кто заплатил бы полную цену. Те, кто купил бы за -10%. И те, кому нужно было -20%. Первые две группы получают подарок. Вы теряете на них маржу без изменения их поведения.",
          "Только третья группа меняет поведение благодаря скидке. И вы заплатили скидку первых двух, чтобы достучаться до третьей. Цена, которую предлагает покупатель решает это: только третья группа когда-либо просит -20%. Первые две платят полку.",
        ],
        callout: {
          title: "Экономика, кратко.",
          body: "Если ваша обычная скидка -20% по всему ассортименту, и только 30% покупателей нужна была эта скидка для покупки, вы платите 70% скидки тем, кто и так купил бы. Цена, которую предлагает покупатель переворачивает это соотношение.",
        },
      },
      {
        heading: "Три ошибки, которых стоит избегать.",
        paragraphs: [
          "Первая: не делайте из этого базар. Покупатели не должны ждать торга на каждой покупке — это рушит доверие и тормозит кассу. Цена, которую предлагает покупатель должна быть тихой опцией на фоне, не основным потоком.",
          "Вторая: не теряйте дно. Каждая согласованная цена должна быть выше вашего минимума. Без этого менеджеры на местах разрушат маржу ради краткосрочного закрытия.",
          "Третья: не принимайте без сигнала. Даже отклонённое предложение — данные. Магазин, который видит только принятые, упускает кривую готовности платить ниже минимума.",
        ],
      },
      {
        heading: "Когда цена от покупателя выигрывает, а когда — нет.",
        paragraphs: [
          "Выигрывает там, где покупатель долго думает: электроника, одежда, обувь, товары для дома, красота. Также выигрывает на старых остатках, концах сезона, выставочных образцах — везде, где альтернатива — публичная уценка.",
          "Проигрывает на товарах ежедневного спроса (продукты, бытовая химия), на услугах по записи, и в категориях, где торг воспринимается неуместно (люкс, рецепты).",
        ],
      },
      {
        heading: "Как это запустить.",
        paragraphs: [
          "Начните с одной категории в одном магазине. Поставьте минимум на каждую позицию. Откройте торг для покупателей, сканирующих эти SKU. Смотрите данные 30 дней: сколько предложений, какая форма распределения, какая закрываемость выше минимума.",
          "Потом подстраивайте. Поднимайте минимум на товарах, которые продают слишком хорошо. Опускайте на тех, что не двигаются. Расширяйтесь на следующую категорию, когда команда привыкнет.",
        ],
      },
    ],
    faqs: [
      { q: "А это не приучит покупателей торговаться за всё?", a: "Только если сделать это основным потоком. Когда это тихая опт-ин опция для сомневающихся, обычный покупатель её даже не видит. У нас в пилотах меньше 10% покупателей делают предложение; остальные платят полку." },
      { q: "Чем это отличается от купона?", a: "Купоны публичны, анонимны и одинаковы для всех. Цена, которую предлагает покупатель — частная, идентифицированная, по конкретной позиции. Вы видите, кто и что просит — и решаете." },
      { q: "Можно делать это вручную без софта?", a: "Можно — это и есть старый базар. Современные магазины этого не делают, потому что не масштабируется дальше одного торгующего. Софт даёт правила по SKU, аудит-след и аналитику по категории." },
    ],
    related: ["why-discounts-hurt-margin", "in-store-online-retail-explained"],
  },
  {
    slug: "why-discounts-hurt-margin",
    title: "Почему общие скидки бьют по марже сильнее, чем кажется",
    description:
      "Скрытая стоимость каждой акции «на всё», и расчёты, которые отделы закупок проводят слишком редко.",
    category: "Pricing Strategy",
    readMinutes: 7,
    publishedISO: "2026-02-20",
    author: "Команда Bidygo",
    hero: { emoji: "📉", bgClass: "bg-[oklch(0.92_0.06_330)]" },
    tldr: [
      "Общие скидки субсидируют тех, кто заплатил бы полную цену.",
      "Большинство магазинов недооценивают реальную стоимость — потому что смотрят на маржу принятых заказов, а не на упущенную маржу полной цены.",
      "Акция -20% обычно теряет больше маржи, чем приносит новых заказов.",
      "Сакаркаривание per-покупатель ловит тот же прирост без субсидии.",
    ],
    sections: [
      {
        heading: "Расчёт, который никто не делает.",
        paragraphs: [
          "Откройте отчёт о следующей акции. В нём будут заказы за период, выручка и средний чек. Скорее всего не будет: маржинального вклада на заказ. И почти наверняка не будет: что было бы без акции.",
          "Большинство отчётов считают всю выручку акции «приростом». Это не так. Существенная часть заказов любой акции — покупатели, которые купили бы в любом случае. Скидка для них — это трансфер от магазина к покупателю, замаскированный под маркетинговый расход.",
        ],
      },
      {
        heading: "Пример с реальными числами.",
        paragraphs: [
          "SKU за 200 долларов с маржой 80 долларов идёт на -20%. Розница падает до 160. Маржа на заказ — 60. Магазин обычно видит +25% объёма за период акции — допустим, 1000 заказов против 800 базы.",
          "На бумаге: 160 000 акции против 160 000 базы. Ровно, да? Но маржа: 60 000 против 64 000. Акция потеряла 4000 в марже — не потому что не подняла объём, а потому что 800 базовых покупателей тоже получили скидку, и 200 новых её не компенсировали.",
        ],
        callout: {
          title: "Общее правило.",
          body: "Если маржа с нового покупателя меньше упущенной маржи с одного скидочного, умноженной на соотношение базы к приросту — акция убыточна по вкладу.",
        },
      },
      {
        heading: "Проблема приучения.",
        paragraphs: [
          "Даже когда акции выходят в ноль в периоде, у них есть второй эффект: они учат вашу базу ждать. В следующий раз покупатель видит тот же SKU за 200 и помнит, что в прошлом месяце было -20%. И ждёт.",
          "Поэтому магазины с частыми акциями часто видят падение конверсии вне акций год к году. Они приучили лучших покупателей к худшему покупательскому поведению.",
        ],
      },
      {
        heading: "Что делать вместо.",
        paragraphs: [
          "Либо взять на себя обязательство без распродаж и защитить конверсию полной цены, либо унести скидки с полки в частный канал. Цена, которую предлагает покупатель — это второй вариант: каждое согласованное предложение — это сделка, которую магазин принял по этой цене, с этим покупателем, по этой позиции.",
          "Цена на полке не двигается. Бренд никогда не учит покупателей ждать. Магазин ловит дополнительный объём, который иначе ушёл бы — по цене, которую магазин специально одобрил.",
        ],
      },
    ],
    faqs: [
      { q: "Сезонные распродажи всегда плохо?", a: "Нет — настоящая распродажа (двигай-или-выбрасывай) рациональна. Аргумент против привычной акции как инструмента конверсии для сезонного товара." },
      { q: "А ценовой матчинг конкурентов?", a: "Ценовой матчинг — это реактивная акция по конкретному SKU. Может быть эффективнее общих скидок, но всё равно субсидирует тех, кто заплатил бы полную цену. Сакаркаривание per-покупатель ещё точнее." },
      { q: "Применимо ли это к онлайн-магазинам?", a: "Да — и онлайн это даже проще инструментировать. Сложнее в физическом магазине, потому что покупатели заходят и выходят без идентификатора; цена от покупателя решает это через приложение." },
    ],
    related: ["customer-led-pricing", "in-store-online-retail-explained"],
  },
  {
    slug: "in-store-online-retail-explained",
    title: "Когда магазин встречает онлайн",
    description:
      "Что это на самом деле значит, почему аналитики постоянно ошибаются, и три реальных сдвига, которые имеют значение.",
    category: "Modern Retail",
    readMinutes: 6,
    publishedISO: "2026-03-04",
    author: "Команда Bidygo",
    hero: { emoji: "🔗", bgClass: "bg-[oklch(0.92_0.06_240)]" },
    tldr: [
      "In-store + online ≠ омниканальность. Омни — про единый опыт между каналами. In-store + online — про цифровое взаимодействие внутри физического визита.",
      "Три реальных сдвига: идентификация, взаимодействие, инструментация.",
      "Категория — не про экраны на полках, а про возможность покупателя действовать с тем, что он видит, не выходя из магазина.",
      "Цена, которую предлагает покупатель — один из самых сильных in-store-online-кейсов, доступных сейчас.",
    ],
    sections: [
      {
        heading: "Что на самом деле значит «in-store-online».",
        paragraphs: [
          "Слово перегружено. Половина аналитических отчётов использует его в значении «поставили айпад в магазине». Это не оно. In-store + online — это когда физический визит и цифровое взаимодействие происходят в один момент, по одному товару, в одном потоке.",
          "Покупатель не проверяет приложение дома, а потом идёт в магазин. Он стоит у полки, держит товар в руке и через приложение делает то, что раньше не мог — например, предлагает цену.",
        ],
      },
      {
        heading: "Идентификация.",
        paragraphs: [
          "Главная слабость физической торговли всегда была в анонимности. Вы видите трафик, видите продажи, но не связываете одно с другим. Не знаете, кто из посетителей вышел без покупки, или что они держали в руках перед уходом.",
          "In-store + online меняет это: покупатель открывает приложение, которое его идентифицирует. Теперь вы знаете, кто прошёл по ряду, что смотрел, что чуть не купил. Каждое взаимодействие становится известным событием в пути известного покупателя.",
        ],
      },
      {
        heading: "Взаимодействие.",
        paragraphs: [
          "Статичная торговля односторонняя: цена — это цена, полка — это полка, бери или уходи. In-store + online торговля двусторонняя: покупатель может действовать с тем, что видит, в реальном времени, не выходя из магазина. Сканировать, сравнивать, предлагать, сохранять, делиться.",
          "Магазин может ответить в тот же момент. Подтвердить наличие, одобрить предложение, предложить комплект, передать продавцу. Магазин становится местом, где сделки обсуждаются, а не просто исполняются.",
        ],
        callout: {
          title: "Что это значит для конверсии.",
          body: "Когда можно вмешаться до того, как покупатель уйдёт, вы ловите ту маржинальную продажу, которую статичная торговля теряет. Реальный разрыв конверсии большинства магазинов — не «люди не заинтересовались», а «люди заинтересовались, замешкались и ушли».",
        },
      },
      {
        heading: "Инструментация.",
        paragraphs: [
          "Третий сдвиг — тот, который аналитики недооценивают: вы наконец-то получаете данные. Каждое предложение, каждый уход, каждый рассматриваемый набор. Узнаёте готовность платить по SKU, по сегменту, по дню недели.",
          "До in-store-online у вас были данные с кассы (что и за сколько продано) и счётчики трафика (сколько зашло). Не было сигнала о разрыве между ними. In-store + online инструментация закрывает этот разрыв. Теперь вы знаете, что и за сколько продалось бы — и какому покупателю.",
        ],
      },
      {
        heading: "С чего начать.",
        paragraphs: [
          "Не начинайте с экранов на полках. Не начинайте с AR-зеркал. Начните с самого простого in-store-online-паттерна: дайте покупателям приложение, в котором они могут сделать одну вещь, которой не могут сегодня, и смотрите, что произойдёт.",
          "Наша ставка — что эта одна вещь — переговоры о цене. Это самое сильное взаимодействие с покупателем, которое мы знаем, потому что оно ловит маржинальные уходы без субсидирования остальных. Другие валидные ставки тоже существуют; это наша.",
        ],
      },
    ],
    faqs: [
      { q: "Чем in-store-online отличается от омниканальности?", a: "Омниканальность спрашивает: «опыт согласован между сайтом, мобильным и магазином?». In-store + online спрашивает: «опыт в магазине усилен цифрой в моменте?». Омни про паритет; in-store-online про новую возможность." },
      { q: "Нужен ли нам Wi-Fi в магазинах?", a: "Не обязательно — у современных покупателей есть данные. Но Wi-Fi в магазине заметно увеличивает вовлечённость в приложении. Рекомендуем для пилотов." },
      { q: "Что in-store-online значит для персонала?", a: "Персонал становится консультантами и переговорщиками, а не операторами касс. Повторяемая работа уходит в софт; человеческая работа поднимается выше." },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin"],
  },
  {
    slug: "shopper-led-pricing",
    title: "Цена, предложенная покупателем: как работает и где подходит",
    description: "Цена, предложенная покупателем — это модель, в которой покупатель сам называет цену, а правила магазина отвечают автоматически. Разбираем механику, где она работает и как настроить без потери маржи.",
    category: "Pricing Strategy",
    readMinutes: 14,
    publishedISO: "2026-03-15",
    updatedISO: "2026-06-01",
    author: "Ваагн Хачатрян",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Покупатель сам предлагает ту цену, которую готов заплатить; правила магазина принимают, отвечают встречной или отклоняют — за секунды.",
      "Цена на полке не меняется. Договорённую цену видит только тот покупатель, который сам её попросил.",
      "Возвращает того, кто иначе ушёл бы, не снижая цену для того, кто и так заплатил бы полную.",
      "Работает в категориях, где покупатель думает: электроника, одежда, обувь, дом, косметика. Не работает в продуктовом и сырьевом.",
      "Требует автоматики. Ручное одобрение каждого предложения возвращает то самое трение, от которого покупатели и пытались уйти.",
    ],
    sections: [
      {
        heading: "Вопрос, на который магазины отвечают неправильно",
        paragraphs: [
          "Ценник на полке — это ответ на один вопрос: какое число поставить на товар? Магазины подбирают это число формулами «себестоимость плюс», парсингом конкурентов и интуицией. Потом считают, что дело сделано. Но этот вопрос оптимизирует под среднего покупателя, а розница — это не среднее. Это распределение. Часть покупателей и так заплатила бы полную цену. Часть никогда не заплатила бы. Ценник работает для первой группы и совсем не работает для второй.",
          "Вторая группа — это уходы без покупки. Они зашли за конкретным товаром, подержали его в руках, поколебались у ценника и ушли. Магазины не считают такие уходы, потому что касса их не видит, и со временем эта невидимость становится нормой. Уход превращается в неизбежные потери — не в возвращаемую возможность. Цена, предложенная покупателем, переворачивает эту логику: вторая группа становится видимой и достижимой.",
        ],
      },
      {
        heading: "Как это работает на деле",
        paragraphs: [
          "Механика простая на словах, сложнее на деле. Покупатель в магазине видит товар, который хочет, но цена смущает. Он сканирует штрихкод своим телефоном — родной камерой, без установки приложения. Bidygo открывает страницу товара на его телефоне с ценой на полке. Покупатель вводит цену, которую готов заплатить, и отправляет.",
          "Дальше движок правил сверяет предложение с нижним и верхним пределами, которые магазин задал для этого SKU. За секунды покупатель видит один из трёх ответов: принято, встречная цена или отклонено. Если принято (или если он согласен со встречной), на телефоне появляется подтверждение. Он идёт к кассе, кассир сканирует подтверждение, сделка закрывается по согласованной цене. POS, эквайринг, чек — ничего не меняется. Переговоры живут целиком между телефоном покупателя и движком Bidygo.",
        ],
        callout: {
          title: "Три исхода, всегда",
          body: "Автоприём (предложение ≥ верхнего предела), встречная (между нижним и верхним), автоотказ (ниже нижнего). Магазин не разбирает отдельные предложения — движок решает каждое.",
        },
      },
      {
        heading: "Ценник остаётся ценником",
        paragraphs: [
          "Это структурное отличие от любой публичной скидки: полка не движется. Договорённую цену видит только тот покупатель, который сам её попросил. Все остальные продолжают видеть ту же цифру на ценнике.",
          "Это важнее, чем кажется. Ценник — это то, что формирует восприятие бренда. По нему магазин отчитывается перед поставщиками по соглашениям MSRP и минимально допустимой цены. Это якорь, относительно которого скидка $25 на товар за $349 воспринимается покупателем как реальный выигрыш. Публичная скидка обесценивает все три. Распродажа «−10% на всё» воспринимается не как разовая акция — а как новая норма. Цена, предложенная покупателем, оставляет норму на месте.",
        ],
      },
      {
        heading: "Чем это отличается от скидки",
        paragraphs: [
          "Распродажа «−10% на всё» даёт скидку трём группам: тем, кто заплатил бы полную; тем, кто и сам бы поторговался; и тем, кому именно эти 10% нужны были, чтобы согласиться. Первые две группы — потеря маржи, которой можно было избежать. Только третья реально изменила поведение. Цена, предложенная покупателем, переворачивает это: только третья группа вообще что-то спрашивает. Первые две платят по ценнику.",
          "В этом весь экономический аргумент модели: та же возвращённая конверсия, меньше потерянной маржи. В 12-недельном пилоте по электронике, одежде и обуви магазины с этой моделью получили прирост выручки 4–9% при сжатии маржи меньше 2%. Эквивалентные по сроку скидочные акции дали 5–7% выручки и 6–10% маржи. Эффективность примерно втрое выше.",
        ],
      },
      {
        heading: "Чем это отличается от динамического ценообразования и от торга",
        paragraphs: [
          "Динамическое ценообразование (Pricer, Wiser, Competera) меняет ценник во времени по сигналам спроса, остатков, конкурентов. В каждый момент все покупатели видят одно и то же. Это другой механизм. Динамическое — это магазин публично меняет цены; цена, предложенная покупателем — это сам покупатель приватно начинает диалог. Эти модели уживаются: динамическое раз в неделю меняет полку, а Bidygo обрабатывает индивидуальные обращения сверху.",
          "Культурный груз слова «торг» — главное возражение магазинов. Они не хотят, чтобы персонал торговался с каждым покупателем. Цена, предложенная покупателем, убирает человека из цепочки. Покупатель предлагает; правила отвечают. Персонал не торгуется, не одобряет, не отказывает. Они просто оформляют покупку на кассе. В этом разница между рынком и Bidygo: рынок требует людей; Bidygo требует правил.",
        ],
      },
      {
        heading: "Четыре числа, на которых всё держится",
        paragraphs: [
          "Магазин настраивает четыре вещи на SKU или категорию. Нижний предел — минимальная цена, по которой готов продать. Обычно заметно выше себестоимости, на уровне, ниже которого выгоднее держать товар на полке. Верхний предел — цена, при которой и выше движок автоматически принимает без встречной. Обычно ценник минус 5%. Логика встречной цены — что движок предлагает, когда предложение попадает между нижним и верхним. Обычно середина, фиксированная маржа над нижним или процент от ценника. Корректировки по времени суток и остаткам позволяют гибко менять любое из трёх.",
          "Доля принятых предложений — главная цифра, которая выходит из этой настройки. Здоровая доля 35–55% по большинству категорий. Ниже 25% — нижние пределы слишком жёсткие, отклоняете тех, кто бы согласился чуть дороже. Выше 65% — слишком мягкие, отдаёте маржу тем, кто заплатил бы больше. В кабинете виден тренд доли по времени — магазин подкручивает правила сам.",
        ],
      },
      {
        heading: "Где модель работает — и где нет",
        paragraphs: [
          "Работает в категориях, где покупатель думает: электроника, одежда, обувь, дом, косметика. В товарах, которые покупатель оценивает, сравнивает, у которых колеблется. В категориях с достаточной маржой для торга (от 25%). В сезонных остатках, где маржа в конце сезона лучше, чем перенос на следующий год.",
          "Не работает в продуктовом — покупки по нужде, без раздумий, маржа тонкая. Не работает в сырье и взаимозаменяемых товарах, где цену можно сверить онлайн за секунды. Не работает на низкочеках, где трение от обращения больше выгоды. Честная оценка на старте экономит магазину время на эксперимент в неподходящей категории. Модель не универсальная, и притворяться обратным — терять время всех.",
        ],
      },
    ],
    faqs: [
      { q: "А не научатся ли покупатели всегда предлагать меньше?", a: "Некоторые научатся. От этого защищает нижний предел. Средняя принятая цена по категориям — около 92% от ценника. То есть даже «вечно торгующийся» покупатель платит близко к полной цене. А тот, кто иначе бы ушёл — всё равно в плюсе при 88%." },
      { q: "Чем это отличается от того, когда продавец сам даёт скидку на кассе?", a: "Скидка на усмотрение продавца — три проблемы: масштабируется только наймом, у разных продавцов разные решения, и приучает покупателей давить громче. Цена, предложенная покупателем, применяет одни правила одинаково ко всем, мгновенно, без участия персонала." },
      { q: "А если поставщик запрещает любые скидки?", a: "Большинство соглашений MSRP и минимально допустимых цен относятся к публично заявленным ценам. Договорные цены через Bidygo приватные — только на телефоне покупателя, не на ценнике, не в чеках, не в рекламе. На практике это уживается с MSRP у большинства поставщиков; конкретный текст договора стоит проверить." },
      { q: "Персоналу придётся торговаться вручную?", a: "Нет. Движок обрабатывает каждое предложение автоматически. Персонал участвует только в крайних случаях, которые магазин сам отметил для эскалации — крупные корзины, подозрительные паттерны, отдельные SKU под ручной просмотр." },
      { q: "Работает ли это на низкомаржинальных и сырьевых товарах?", a: "Обычно нет. Если маржа 8% — торговаться не из чего, можно уйти в минус. Bidygo работает лучше всего на марже от 25% в категориях, где покупатель думает перед покупкой. Если ваша категория не подходит, скажем честно на первом разговоре." },
      { q: "Как это влияет на долю ушедших без покупки?", a: "Это та цифра, за которой стоит следить. По первой когорте доля ушедших падает на 1,5–3 пп за первые 90 дней, что даёт +4–9% выручки в категориях с высоким раздумьем. Кабинет показывает долю ушедших еженедельно — эффект виден." },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin", "in-store-online-revolution"],
  },
];

// REVIEW REQUIRED: native Yerevan-retail copywriter (see docs/translation-brief.md)
const articlesAm: Article[] = [
  {
    slug: "customer-led-pricing",
    title: "Գին, որ գնորդն է առաջարկում՝ պարզ խոսքերով",
    description:
      "Ինչ է դա, ինչու է ուտում սովորական զեղչերը և ինչպես է գործարկվում՝ առանց դարակի գնի վրա հսկողություն կորցնելու։",
    category: "Pricing Strategy",
    readMinutes: 8,
    publishedISO: "2026-02-12",
    author: "Bidygo թիմ",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Գին, որ գնորդն է առաջարկում — երբ գնորդը թիվ է առաջարկում, իսկ խանութը որոշում է։",
      "Ի տարբերություն «բոլորին» զեղչերի, սա բռնում է նրանց, ովքեր այլապես հեռանում էին — առանց նվեր տալու լրիվ վճարող գնորդին։",
      "Լավագույնն աշխատում է այնտեղ, որտեղ գնորդը երկար մտածում է՝ էլեկտրոնիկա, հագուստ, կահույք։",
      "Ճիշտ արված՝ բարձրացնում է փոխարկումը և պահպանում մարժան միաժամանակ։",
    ],
    sections: [
      {
        heading: "Գնի հարցը, որին խանութների մեծ մասը սխալ է պատասխանում։",
        paragraphs: [
          "Խանութների մեծ մասը տալիս է մեկ հարց՝ «ի՞նչ թիվ դնել դարակին»։ Օպտիմիզացնում են ինքնարժեքի, մրցակիցների գների և ինտուիցիայի միջոցով։ Ու դրանով ավարտում։",
          "Բայց դարակի գինը ճիշտ է միայն մեկ գնորդի համար՝ նրա, ով համաձայնեց վճարել։ Մնացածի համար, այն կեսի, որ հեռանում է, սխալ է։ Գին, որ գնորդն է առաջարկումը շրջում է հարցը։ «Ի՞նչ է մեր գինը»-ի փոխարեն հարցնում է՝ «ի՞նչ գին կփակեր ամեն կոնկրետ գնորդին»։",
        ],
      },
      {
        heading: "Ինչու են բոլորին զեղչերը ավելի շատ արժենում, քան բերում։",
        paragraphs: [
          "Երբ -20% ես անում մի ապրանքին, խանութ են մտնում երեք խումբ։ Նրանք, ովքեր լրիվ կվճարեին։ Նրանք, ովքեր կգնեին -10%-ով։ Եվ նրանք, ում -20% էր պետք։ Առաջին երկու խումբը նվեր են ստանում։ Դու մարժա ես կորցնում նրանց վրա՝ առանց վարքագծի որևէ փոփոխության։",
          "Միայն երրորդ խումբն է փոխում վարքագիծը զեղչի շնորհիվ։ Ու դու վճարել ես առաջին երկու խմբերի զեղչը, որպեսզի հասնես երրորդին։ Գին, որ գնորդն է առաջարկումը լուծում է սա՝ միայն երրորդ խումբը երբևէ -20% է խնդրում։ Առաջին երկուսը վճարում են դարակը։",
        ],
        callout: {
          title: "Տնտեսագիտությունը՝ կարճ։",
          body: "Եթե սովորական զեղչդ -20% է բոլոր ապրանքների վրա, և գնորդների միայն 30%-ին էր պետք այդ զեղչը գնելու համար, դու վճարում ես 70% զեղչը նրանց, ովքեր և այնպես կգնեին։ Գին, որ գնորդն է առաջարկումը շրջում է այս հարաբերակցությունը։",
        },
      },
      {
        heading: "Երեք սխալներ, որոնցից խուսափել։",
        paragraphs: [
          "Առաջին՝ մի դարձրու դա շուկա։ Գնորդները չպիտի ակնկալեն ամեն գնման սակարկություն — դա կործանում է վստահությունը և դանդաղեցնում դրամարկղը։ Գին, որ գնորդն է առաջարկումը պիտի լինի հանգիստ ընտրանք ֆոնին, ոչ՝ հիմնական հոսք։",
          "Երկրորդ՝ մի կորցրու հատակը։ Ամեն համաձայնեցված գին պիտի լինի քո սահմանած նվազագույնից բարձր։ Առանց դրա՝ տեղում մենեջերները կկործանեն մարժան՝ կարճաժամկետ փակումների համար։",
          "Երրորդ՝ մի ընդունիր առանց ազդանշանի։ Նույնիսկ մերժված առաջարկը՝ տվյալ է։ Խանութը, որ տեսնում է միայն ընդունվածները, բաց է թողնում վճարման պատրաստակամության կորը նվազագույնից ցածր։",
        ],
      },
      {
        heading: "Երբ է գին, որ գնորդն է առաջարկումը հաղթում, և երբ՝ ոչ։",
        paragraphs: [
          "Հաղթում է այնտեղ, որտեղ գնորդը երկար է մտածում՝ էլեկտրոնիկա, հագուստ, կոշիկ, տնային ապրանքներ, գեղեցկություն։ Հաղթում է նաև հին մնացորդների, սեզոնի վերջի, ցուցադրական մոդելների վրա — ամենուր, որտեղ այլընտրանքը հանրային զեղչն է։",
          "Կորցնում է առօրյա ապրանքների վրա (մթերք, կենցաղ), ըստ պատվերի ծառայությունների վրա, և այն կատեգորիաներում, որտեղ սակարկությունը անպատշաճ է ընկալվում (լյուքս, դեղատոմս)։",
        ],
      },
      {
        heading: "Ինչպես գործարկել։",
        paragraphs: [
          "Սկսիր մեկ կատեգորիայից մեկ խանութում։ Դիր նվազագույն ամեն ապրանքի համար։ Բաց արա սակարկությունը այդ SKU-ները սկանավորող գնորդների համար։ Տվյալներ նայիր 30 օր՝ քանի առաջարկ, ինչ ձև ունի բաշխումը, ինչ է փակման տոկոսը նվազագույնից բարձր։",
          "Հետո ճշգրտիր։ Բարձրացրու նվազագույնը այն ապրանքների համար, որ չափից շատ են վաճառվում։ Իջեցրու նրանց համար, որ չեն շարժվում։ Ընդարձակիր հաջորդ կատեգորիայի վրա, երբ թիմը սովորի։",
        ],
      },
    ],
    faqs: [
      { q: "Սա չի՞ սովորեցնի գնորդներին ամեն բանի համար սակարկել", a: "Միայն եթե հիմնական հոսք դարձնես։ Երբ սա հանգիստ opt-in ընտրանք է տատանվող գնորդների համար, սովորական գնորդը նույնիսկ չի տեսնում։ Մեր պիլոտներում գնորդների 10%-ից պակասը երբևէ առաջարկ է անում, մնացածը վճարում են դարակը։" },
      { q: "Ինչո՞վ է տարբերվում կուպոնից", a: "Կուպոնները հանրային են, անանուն և բոլորի համար նույնը։ Գին, որ գնորդն է առաջարկումը անձնական է, նույնականացված և կոնկրետ ապրանքի համար։ Դու տեսնում ես՝ ով ինչ է խնդրում և որոշում ես։" },
      { q: "Կարո՞ղ եմ սա անել ձեռքով՝ առանց ծրագրի", a: "Կարող ես — սա հենց հին շուկան է։ Ժամանակակից խանութներն այս չեն անում, որովհետև չի մասշտաբավորվում մեկ սակարկողից այն կողմ։ Ծրագիրը տալիս է կանոններ ըստ SKU-ի, աուդիտի հետք և կատեգորիայի վերլուծություն։" },
    ],
    related: ["why-discounts-hurt-margin", "in-store-online-retail-explained"],
  },
  {
    slug: "why-discounts-hurt-margin",
    title: "Ինչու են ընդհանուր զեղչերը մարժային ավելի շատ վնասում, քան թվում է",
    description:
      "Ամեն «բոլորի վրա» ակցիայի թաքնված արժեքը և հաշվարկներ, որ գնման բաժինները չափից քիչ են անում։",
    category: "Pricing Strategy",
    readMinutes: 7,
    publishedISO: "2026-02-20",
    author: "Bidygo թիմ",
    hero: { emoji: "📉", bgClass: "bg-[oklch(0.92_0.06_330)]" },
    tldr: [
      "Ընդհանուր զեղչերը սուբսիդավորում են նրանց, ովքեր լրիվ կվճարեին։",
      "Խանութների մեծ մասը թերագնահատում է իրական արժեքը — որովհետև նայում են ընդունված պատվերների մարժային, ոչ՝ լրիվ գնի կորցրած մարժային։",
      "-20% ակցիան սովորաբար ավելի շատ մարժա է կորցնում, քան բերում է նոր պատվերներ։",
      "Մեկ-մեկ սակարկությունը բռնում է նույն աճը՝ առանց սուբսիդիայի։",
    ],
    sections: [
      {
        heading: "Հաշվարկը, որ ոչ ոք չի անում։",
        paragraphs: [
          "Բացիր հաջորդ ակցիայի հաշվետվությունը։ Մեջը կլինեն ակցիայի ընթացքում պատվերները, եկամուտը և միջին չեկը։ Հավանաբար չի լինի՝ մարժինալ ներդրումը մեկ պատվերի համար։ Ու գրեթե երաշխավորված չի լինի՝ ինչ կլիներ առանց ակցիայի։",
          "Հաշվետվությունների մեծ մասը դիտարկում են ակցիայի ողջ եկամուտը որպես «աճ»։ Այդպես չէ։ Ցանկացած ակցիայի պատվերների զգալի մասը — գնորդներ, ովքեր և այնպես կգնեին։ Նրանց զեղչը — տրանսֆերտ խանութից գնորդին, քողարկված որպես մարկետինգային ծախս։",
        ],
      },
      {
        heading: "Օրինակ իրական թվերով։",
        paragraphs: [
          "200 դոլարանոց SKU 80 դոլար մարժով ակցիա է գնում -20%-ով։ Դարակը իջնում է 160-ի։ Մարժան մեկ պատվերի համար՝ 60։ Խանութը սովորաբար տեսնում է +25% ծավալ ակցիայի ժամանակ — ասենք 1000 պատվեր՝ 800 բազայի փոխարեն։",
          "Թղթի վրա՝ 160 000 ակցիայից, 160 000 բազայից։ Հավասար, չէ՞։ Բայց մարժան՝ 60 000 vs 64 000։ Ակցիան կորցրել է 4000 մարժա — ոչ թե չի բարձրացրել ծավալը, այլ որովհետև 800 բազային գնորդն էլ զեղչ ստացան, ու 200 նորերը չփոխհատուցեցին։",
        ],
        callout: {
          title: "Ընդհանուր կանոնը։",
          body: "Եթե նոր գնորդից մարժան պակաս է զեղչված մեկ գոյություն ունեցող գնորդի կորցրած մարժայից բազմապատկած բազայի և աճի հարաբերակցությամբ՝ ակցիան վնասաբեր է ներդրումի առումով։",
        },
      },
      {
        heading: "Սովորեցնելու խնդիրը։",
        paragraphs: [
          "Նույնիսկ երբ ակցիաները զրոյանում են ժամանակահատվածում, նրանք երկրորդ էֆեկտ ունեն՝ սովորեցնում են քո բազային սպասել։ Հաջորդ անգամ գնորդը տեսնում է նույն 200 դոլարանոց SKU-ն լրիվ գնով ու հիշում, որ անցած ամիս -20% էր։ Ու սպասում է։",
          "Դրա համար հաճախ ակցիա անող խանութները տարեցտարի տեսնում են ոչ-ակցիա փոխարկման անկում։ Նրանք լավագույն գնորդներին սովորեցրել են ամենավատ գնման վարքագծի։",
        ],
      },
      {
        heading: "Ինչ անել փոխարեն։",
        paragraphs: [
          "Կամ պարտավորվիր առանց զեղչերի մոդելով և պաշտպանիր լրիվ գնի փոխարկումը, կամ տար զեղչը դարակից մասնավոր ալիք։ Գին, որ գնորդն է առաջարկումը երկրորդն է՝ ամեն ընդունված առաջարկ խանութի գիտակցված որոշում է՝ այդ գնով, այդ գնորդին, այդ ապրանքի համար։",
          "Դարակի գինը չի շարժվում։ Բրենդը երբեք չի սովորեցնում սպասել։ Խանութը բռնում է լրացուցիչ ծավալ, որ այլապես կհեռանար — գնով, որ խանութը հատուկ հաստատել է։",
        ],
      },
    ],
    faqs: [
      { q: "Սեզոնային զեղչերը միշտ վա՞տ են", a: "Ոչ — իրական ապրանքի մաքրման զեղչը (շարժիր կամ նետիր) ռացիոնալ է։ Փաստարկն ընդդեմ սովորական ակցիաների՝ որպես սեզոնային ապրանքի համար փոխարկման գործիք։" },
      { q: "Ի՞նչ կասես մրցակիցների գնի համապատասխանեցման մասին", a: "Գնի համապատասխանեցումը ռեակտիվ ակցիա է կոնկրետ SKU-ի վրա։ Կարող է ավելի արդյունավետ լինել, քան բոլորին զեղչը, բայց դեռ սուբսիդավորում է լրիվ վճարողներին։ Մեկ-մեկ սակարկությունը ավելի ճշգրիտ է։" },
      { q: "Կիրառելի՞ է օնլայն խանութների համար", a: "Այո — և օնլայնում նույնիսկ ավելի հեշտ է գործիքավորել։ Ֆիզիկական խանութում ավելի դժվար է, որովհետև գնորդները մտնում և դուրս գալիս են առանց նույնականացման, գին, որ գնորդն է առաջարկումը լուծում է դա հավելվածի միջոցով։" },
    ],
    related: ["customer-led-pricing", "in-store-online-retail-explained"],
  },
  {
    slug: "in-store-online-retail-explained",
    title: "Երբ խանութն ու առցանցը հանդիպում են",
    description:
      "Ինչ է դա իրականում, ինչու են վերլուծաբանները շարունակում սխալվել և երեք իրական տեղաշարժեր, որ կարևոր են։",
    category: "Modern Retail",
    readMinutes: 6,
    publishedISO: "2026-03-04",
    author: "Bidygo թիմ",
    hero: { emoji: "🔗", bgClass: "bg-[oklch(0.92_0.06_240)]" },
    tldr: [
      "In-store + online ≠ omnichannel։ Omni-ն կապուղիների միջև փորձառության միասնության մասին է։ In-store + online-ը ֆիզիկական այցելության ներսում թվային փոխազդեցության մասին։",
      "Երեք իրական տեղաշարժ՝ նույնականացում, փոխազդեցություն, գործիքավորում։",
      "Կատեգորիան դարակների վրա էկրաններ դնելու մասին չէ — այլ գնորդի հնարավորության մասին՝ գործելու այն բանի հետ, ինչ տեսնում է, առանց խանութից դուրս գալու։",
      "Գին, որ գնորդն է առաջարկումը այսօր մատչելի ամենահզոր in-store-online խաղերից մեկն է։",
    ],
    sections: [
      {
        heading: "Ինչ է «in-store-online»-ն իրականում նշանակում։",
        paragraphs: [
          "Բառը գերծանրաբեռնված է։ Վերլուծական զեկույցների կեսը այն օգտագործում է «դարակին iPad ենք դրել» իմաստով։ Այդ չէ։ In-store + online-ը՝ ճիշտ օգտագործված, նշանակում է որ ֆիզիկական այցելությունն ու թվային փոխազդեցությունը տեղի են ունենում նույն պահին, նույն ապրանքի վրա, նույն հոսքում։",
          "Գնորդը հավելվածը չի ստուգում տանը, հետո խանութ չի գալիս։ Նա կանգնած է դարակի մոտ, ձեռքին պահում է ապրանքը, և հավելվածով անում է բան, որ առաջ չէր կարող անել — օրինակ՝ գին առաջարկում։",
        ],
      },
      {
        heading: "Նույնականացում։",
        paragraphs: [
          "Ֆիզիկական առևտրի ամենամեծ թուլությունը միշտ եղել է անանունությունը։ Տեսնում ես հոսքը, տեսնում ես վաճառքները, չես միացնում մեկը մյուսին։ Չգիտես՝ քո այցելուներից որոնք են դուրս եկել առանց գնման, կամ ինչ էին ձեռքներին պահում մինչ հեռանալը։",
          "In-store + online-ը փոխում է դա՝ գնորդը բացում է հավելված, որ նրան նույնականացնում է։ Հիմա գիտես՝ ով է անցել շարքով, ինչ է նայել, ինչ էր քիչ էր մնում գներ։ Ամեն փոխազդեցություն դառնում է հայտնի գնորդի ճանապարհորդության հայտնի իրադարձություն։",
        ],
      },
      {
        heading: "Փոխազդեցություն։",
        paragraphs: [
          "Ստատիկ առևտուրը միակողմանի է՝ գինը գին է, դարակը դարակ է, վերցրու կամ հեռացիր։ In-store + online առևտուրը երկկողմանի է՝ գնորդը կարող է գործել իր տեսածի հետ, իրական ժամանակում, առանց խանութից դուրս գալու։ Սկանավորել, համեմատել, առաջարկել, պահել, կիսել։",
          "Խանութը կարող է պատասխանել նույն պահին։ Հաստատել մնացորդը, ընդունել առաջարկը, կոմպլեկտ առաջարկել, ուղղորդել վաճառողին։ Խանութը դառնում է վայր, որտեղ գործարքները քննարկվում են, ոչ թե պարզապես կատարվում։",
        ],
        callout: {
          title: "Ինչ է նշանակում փոխարկման համար։",
          body: "Երբ կարող ես միջամտել մինչ գնորդը հեռանա, բռնում ես այն մարժինալ վաճառքը, որ ստատիկ առևտուրը կորցնում է։ Խանութների մեծ մասի իրական փոխարկման բացը «մարդիկ չհետաքրքրվեցին» չէ, այլ «մարդիկ հետաքրքրվեցին, տատանվեցին և գնացին»։",
        },
      },
      {
        heading: "Գործիքավորում։",
        paragraphs: [
          "Երրորդ տեղաշարժը այն մեկն է, որ վերլուծաբանները թերագնահատում են՝ վերջապես տվյալներ ես ստանում։ Ամեն առաջարկ, ամեն հեռացում, ամեն դիտարկվող շարք։ Իմանում ես վճարման պատրաստակամությունը ըստ SKU-ի, ըստ սեգմենտի, ըստ շաբաթվա օրվա։",
          "Մինչ in-store-online-ը ուներ դրամարկղի տվյալներ (ինչ ու ինչքանով է վաճառվել) և հոսքի հաշվիչներ (քանիսն է մտել)։ Չկար ազդանշան՝ նրանց միջև բացի մասին։ In-store + online գործիքավորումը փակում է այդ բացը։ Հիմա գիտես՝ ինչ կվաճառվեր, ինչ գնով, ո՞ր գնորդին։",
        ],
      },
      {
        heading: "Որտեղից սկսել։",
        paragraphs: [
          "Մի սկսիր դարակի էկրաններից։ Մի սկսիր AR հայելիներից։ Սկսիր ամենապարզ in-store-online սխեմայից՝ տուր գնորդներիդ հավելված, որով կարող են անել մեկ բան, որ այսօր չեն կարող, ու նայիր, թե ինչ կլինի։",
          "Մեր խաղադրույքն այն է, որ այդ մեկ բանը գնի շուրջ խոսակցությունն է։ Սա ամենահզոր գնորդական փոխազդեցությունն է, որ գիտենք, որովհետև բռնում է մարժինալ հեռացումները՝ առանց մնացածին սուբսիդավորելու։ Այլ վավեր խաղադրույքներ էլ կան, սա մերն է։",
        ],
      },
    ],
    faqs: [
      { q: "Ինչո՞վ է in-store-online-ը տարբերվում omnichannel-ից", a: "Omnichannel-ը հարցնում է՝ «փորձառությունը հետևողակա՞ն է վեբի, մոբայլի, խանութի միջև»։ In-store + online-ը հարցնում է՝ «խանութի փորձառությունը ուժեղացվա՞ծ է թվայինով հենց պահին»։ Omni-ն հավասարության մասին է, in-store-online-ը նոր հնարավորության։" },
      { q: "Wi-Fi պե՞տք է խանութներում", a: "Պարտադիր չէ — ժամանակակից գնորդները տվյալներ ունեն։ Բայց խանութում Wi-Fi-ը զգալի մեծացնում է հավելվածի ներգրավվածությունը։ Խորհուրդ ենք տալիս պիլոտների համար։" },
      { q: "Ի՞նչ է in-store-online-ը նշանակում անձնակազմի համար", a: "Անձնակազմը դառնում է խորհրդատու և բանակցող, ոչ թե դրամարկղի օպերատոր։ Կրկնվող աշխատանքը գնում է ծրագրին, մարդկային աշխատանքը բարձրանում է վեր։" },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin"],
  },
  {
    slug: "shopper-led-pricing",
    title: "Գնորդի առաջարկած գին․ ինչպես է աշխատում, որտեղ է տեղավորվում",
    description: "Գնորդի առաջարկած գին — մոդել, որտեղ գնորդն ինքն է անվանում գինը, իսկ խանութի կանոնները ինքնաբերաբար պատասխանում են։ Բացատրում ենք մեխանիկան, որտեղ է աշխատում և ինչպես կարգավորել առանց մարժա կորցնելու։",
    category: "Pricing Strategy",
    readMinutes: 14,
    publishedISO: "2026-03-15",
    updatedISO: "2026-06-01",
    author: "Վահագն Խաչատրյան",
    hero: { emoji: "🏷️", bgClass: "bg-[oklch(0.92_0.07_60)]" },
    tldr: [
      "Գնորդն ինքն է առաջարկում այն գինը, որը պատրաստ է վճարել; խանութի կանոնները ընդունում, հակառակ առաջարկ են անում կամ մերժում՝ վայրկյանների ընթացքում։",
      "Դարակի գինը չի փոխվում։ Համաձայնեցված գինը տեսնում է միայն այն գնորդը, ով ինքն է հարցրել։",
      "Վերադարձնում է նրան, ով այլապես կհեռանար, առանց գինը իջեցնելու այն գնորդի համար, ով ամեն դեպքում կվճարեր լրիվ։",
      "Աշխատում է կատեգորիաներում, որտեղ գնորդը մտածում է՝ էլեկտրոնիկա, հագուստ, կոշիկ, տան իրեր, գեղեցկություն։ Չի աշխատում մթերային ու հումքային ապրանքների վրա։",
      "Ավտոմատացում է պետք։ Ձեռքով ամեն առաջարկ հաստատելը վերադարձնում է հենց այն շփումը, որից գնորդը փորձում էր խուսափել։",
    ],
    sections: [
      {
        heading: "Հարցը, որին խանութները սխալ են պատասխանում",
        paragraphs: [
          "Դարակի գինը մեկ հարցի պատասխան է՝ ի՞նչ թիվ դնել ապրանքի վրա։ Խանութները ընտրում են այդ թիվը «ինքնարժեք գումարած» բանաձևերով, մրցակիցների վերլուծությամբ ու ինտուիցիայով։ Հետո կարծում են՝ գործն արված է։ Բայց այդ հարցը օպտիմիզացնում է միջին գնորդի համար, իսկ մանրածախ առևտուրը միջին չէ — այն բաշխում է։ Որոշ գնորդներ ամեն դեպքում լրիվ գին կվճարեին։ Որոշները երբեք չէին վճարի։ Դարակի գինը լավ է աշխատում առաջին խմբի համար և բոլորովին չի աշխատում երկրորդի համար։",
          "Երկրորդ խումբը՝ առանց գնման հեռացողներն են։ Նրանք եկել են կոնկրետ ապրանքի համար, ձեռքին են պահել, տատանվել են դարակի մոտ ու հեռացել։ Խանութները չեն չափում այս հեռացումները, որովհետև դրամարկղը դրանք չի տեսնում, ու ժամանակի ընթացքում այս անտեսանելիությունը դառնում է նորմ։ Հեռացումը վերածվում է անխուսափելի կորստի՝ ոչ թե վերադարձելի հնարավորության։ Գնորդի առաջարկած գինը շրջում է այս տրամաբանությունը՝ երկրորդ խումբը տեսանելի ու հասանելի է դառնում։",
        ],
      },
      {
        heading: "Ինչպես է աշխատում գործնականում",
        paragraphs: [
          "Մեխանիկան պարզ է խոսքով, ավելի բարդ՝ գործով։ Խանութում գնորդը տեսնում է ապրանք, որը ցանկանում է, բայց գինը մտածմունքի տեղիք է տալիս։ Նա սկանավորում է շտրիխկոդը իր հեռախոսով՝ սեփական տեսախցիկով, առանց հավելված տեղադրելու։ Bidygo-ն բացում է ապրանքի էջը նրա հեռախոսի վրա՝ դարակի գնով։ Գնորդը մուտքագրում է այն գինը, որը պատրաստ է վճարել, և ուղարկում։",
          "Հետո կանոնների շարժիչը համեմատում է առաջարկը ստորին և վերին սահմանների հետ, որոնք խանութը դրել է այդ SKU-ի համար։ Վայրկյանների ընթացքում գնորդը տեսնում է երեք պատասխաններից մեկը՝ ընդունված է, հակառակ առաջարկ կամ մերժված։ Եթե ընդունված է (կամ եթե համաձայն է հակառակ առաջարկին), հեռախոսին հայտնվում է հաստատում։ Նա գնում է դրամարկղ, գանձապահը սկանավորում է հաստատումը, գործարքը փակվում է համաձայնեցված գնով։ POS-ը, վճարային համակարգը, չեկը՝ ոչինչ չի փոխվում։ Բանակցությունն ապրում է ամբողջությամբ գնորդի հեռախոսի ու Bidygo-ի շարժիչի միջև։",
        ],
        callout: {
          title: "Երեք ելք, ամեն անգամ",
          body: "Ինքնաբերաբար ընդունում (առաջարկ ≥ վերին սահման), հակառակ առաջարկ (ստորին ու վերին միջև), ինքնաբերաբար մերժում (ստորինից ցածր)։ Խանութը չի դիտում առանձին առաջարկներ՝ շարժիչը որոշում է ամեն մեկը։",
        },
      },
      {
        heading: "Դարակի գինը մնում է դարակի գին",
        paragraphs: [
          "Սա կառուցվածքային տարբերությունն է ցանկացած հրապարակային զեղչից՝ դարակը չի շարժվում։ Համաձայնեցված գինը տեսնում է միայն այն գնորդը, ով ինքն է հարցրել։ Մյուս բոլորը շարունակում են տեսնել նույն թիվը դարակի վրա։",
          "Սա ավելի կարևոր է, քան թվում է։ Դարակի գինը ձևավորում է բրենդի ընկալումը։ Դրա հիման վրա է խանութը հաշվետու MSRP և նվազագույն թույլատրելի գնի համաձայնագրերով։ Սա այն խարիսխն է, որի հանդեպ $349-անոց ապրանքի վրա $25 զեղչը գնորդին զգացնում է իրական շահում։ Հրապարակային զեղչը արժեզրկում է բոլոր երեքը։ «−10% ամեն ինչի վրա» ակցիան չի ընկալվում որպես մեկանգամյա միջոցառում՝ ընկալվում է որպես նոր նորմ։ Գնորդի առաջարկած գինը նորմն իր տեղում է թողնում։",
        ],
      },
      {
        heading: "Ինչով է տարբերվում զեղչից",
        paragraphs: [
          "«−10% ամեն ինչի վրա» ակցիան զեղչ է տալիս երեք խմբերի՝ նրանց, ովքեր ամեն դեպքում լրիվ կվճարեին; նրանց, ովքեր ամեն դեպքում մի փոքր կբանակցեին; ու նրանց, ում հենց այդ 10%-ն էր պետք համաձայնելու համար։ Առաջին երկու խումբը՝ խուսափելի մարժի կորուստ։ Միայն երրորդն իրականում փոխեց վարքագիծը։ Գնորդի առաջարկած գինը շրջում է սա՝ միայն երրորդ խումբն ընդհանրապես ինչ-որ բան հարցնում է։ Առաջին երկուսը վճարում են ըստ դարակի։",
          "Սա ամբողջ տնտեսական փաստարկն է մոդելի համար՝ նույն վերադարձված կոնվերսիա, ավելի քիչ կորած մարժա։ 12-շաբաթյա պիլոտում էլեկտրոնիկայի, հագուստի ու կոշիկի ոլորտում մոդելն աշխատեցնող խանութները ստացան 4–9% եկամտի աճ՝ 2%-ից պակաս մարժի սեղմմամբ։ Համարժեք ժամկետի զեղչային ակցիաները տվել են 5–7% եկամուտ ու 6–10% մարժա։ Արդյունավետությունը մոտավորապես երեք անգամ բարձր է։",
        ],
      },
      {
        heading: "Ինչով է տարբերվում դինամիկ գնագոյացումից և շուկայական սակարկությունից",
        paragraphs: [
          "Դինամիկ գնագոյացումը (Pricer, Wiser, Competera) ժամանակի հետ փոխում է դարակի գինը՝ ըստ պահանջարկի, պաշարի ու մրցակիցների ազդանշանների։ Տվյալ պահին բոլոր գնորդները տեսնում են նույնը։ Սա այլ մեխանիզմ է։ Դինամիկը՝ խանութը հրապարակային փոխում է գները; գնորդի առաջարկած գինն՝ ինքը գնորդն է մասնավոր սկսում երկխոսությունը։ Մոդելները միասին ապրում են․ դինամիկը շաբաթական մեկ փոխում է դարակը, Bidygo-ն վերևից մշակում է անհատական դիմումները։",
          "«Սակարկություն» բառի մշակութային ծանրությունը խանութների գլխավոր առարկությունն է։ Նրանք չեն ուզում, որ անձնակազմը ամեն գնորդի հետ բանակցի։ Գնորդի առաջարկած գինը մարդուն հանում է շղթայից։ Գնորդն առաջարկում է; կանոնները պատասխանում են։ Անձնակազմը չի բանակցում, չի հաստատում, չի մերժում։ Նրանք պարզապես ձևակերպում են վաճառքը դրամարկղում։ Սա է տարբերությունը շուկայի և Bidygo-ի միջև․ շուկան մարդ է պահանջում, Bidygo-ն՝ կանոններ։",
        ],
      },
      {
        heading: "Չորս թվեր, որոնց վրա ամեն ինչ կանգնած է",
        paragraphs: [
          "Խանութը կարգավորում է չորս բան SKU-ի կամ կատեգորիայի համար։ Ստորին սահման՝ նվազագույն գին, որով պատրաստ է վաճառել։ Սովորաբար զգալիորեն ինքնարժեքից բարձր, այն մակարդակին, որից ցածր ավելի շահավետ է ապրանքը պահել դարակին։ Վերին սահման՝ գին, որից վերև շարժիչն ինքնաբերաբար ընդունում է առանց հակառակ առաջարկի։ Սովորաբար դարակի գին հանած 5%։ Հակառակ առաջարկի տրամաբանություն՝ ինչ է շարժիչն առաջարկում, երբ առաջարկը ընկնում է ստորինի ու վերինի միջև։ Սովորաբար միջինը, ֆիքսված մարժա ստորինից վերև կամ դարակի գնի տոկոս։ Ժամային և պաշարային ճշգրտումները թույլ են տալիս ճկուն փոխել ցանկացածը։",
          "Ընդունված առաջարկների տոկոսը՝ գլխավոր թիվը, որ դուրս է գալիս այս կարգավորումից։ Առողջ տոկոս 35–55% բոլոր կատեգորիաներով։ 25%-ից ցածր՝ ստորին սահմանները չափից խիստ են, մերժում եք նրանց, ովքեր մի փոքր ավելի թանկ կհամաձայնեին։ 65%-ից վեր՝ չափից փափուկ են, մարժա եք տալիս նրանց, ովքեր ավելի կվճարեին։ Կաբինետում երևում է տոկոսի շարժը ժամանակի հետ՝ խանութն ինքն է կարգավորում կանոնները։",
        ],
      },
      {
        heading: "Որտեղ է մոդելն աշխատում և որտեղ ոչ",
        paragraphs: [
          "Աշխատում է կատեգորիաներում, որտեղ գնորդը մտածում է՝ էլեկտրոնիկա, հագուստ, կոշիկ, տան իրեր, գեղեցկություն։ Ապրանքների վրա, որոնք գնորդը գնահատում է, համեմատում, որոնց վրա տատանվում է։ Կատեգորիաներում՝ բավարար մարժով սակարկության համար (25%-ից վեր)։ Սեզոնային մնացորդներում, որտեղ սեզոնի վերջի մարժան ավելի լավ է, քան հաջորդ տարի տեղափոխելը։",
          "Չի աշխատում մթերային խանութում՝ գնումները կարիքով են, առանց մտածմունքի, մարժան բարակ։ Չի աշխատում հումքի և փոխարինելի ապրանքների վրա, որտեղ գինը կարելի է վայրկյաններով ստուգել առցանց։ Չի աշխատում շատ ցածր չեկի վրա, որտեղ դիմելու շփումն ավելի մեծ է, քան օգուտը։ Անկեղծ գնահատումը մեկնարկից խնայում է խանութի ժամանակը՝ սխալ կատեգորիայում փորձարկման համար։ Մոդելը համընդհանուր չէ, և հակառակը պնդելը բոլորի ժամանակն է կորցնում։",
        ],
      },
    ],
    faqs: [
      { q: "Արդյո՞ք գնորդները չեն սովորի միշտ ավելի քիչ առաջարկել", a: "Ոմանք կսովորեն։ Ստորին սահմանը պաշտպանում է։ Միջին ընդունված գինը կատեգորիաներով՝ մոտ 92% դարակի գնից։ Այսինքն նույնիսկ «միշտ սակարկող» գնորդը վճարում է գրեթե լրիվ։ Իսկ նա, ով այլապես կհեռանար՝ ամեն դեպքում շահեկան է 88%-ով։" },
      { q: "Ինչո՞վ է սա տարբերվում, երբ դրամարկղի մոտ վաճառողը ինքն է զեղչ տալիս", a: "Վաճառողի որոշմամբ զեղչը երեք խնդիր ունի՝ ընդարձակվում է միայն մարդկանց հաշվին, տարբեր վաճառողներ տարբեր որոշում են ընդունում, ու սովորեցնում է գնորդներին ավելի բարձր ճնշել։ Գնորդի առաջարկած գինը կիրառում է նույն կանոնները միանման բոլորի վրա, ակնթարթորեն, առանց անձնակազմի ժամանակի։" },
      { q: "Իսկ եթե մատակարարն արգելում է ցանկացած զեղչ", a: "MSRP և նվազագույն թույլատրելի գնի համաձայնագրերի մեծ մասը վերաբերում է հրապարակային հայտարարված գներին։ Bidygo-ով համաձայնեցված գները մասնավոր են՝ միայն գնորդի հեռախոսին, ոչ դարակին, ոչ չեկերին, ոչ գովազդում։ Գործնականում սա ապրում է MSRP-ի հետ մատակարարների մեծ մասի մոտ; կոնկրետ պայմանագիր արժե ստուգել։" },
      { q: "Անձնակազմը պետք է ձեռքով բանակցի՞", a: "Ոչ։ Շարժիչը մշակում է ամեն առաջարկ ինքնաբերաբար։ Անձնակազմը մասնակցում է միայն այն բացառիկ դեպքերում, որոնք խանութն ինքն է նշել՝ էսկալացիայի համար՝ մեծ զամբյուղներ, կասկածելի օրինակներ, ձեռքով դիտման համար նշված SKU-ներ։" },
      { q: "Աշխատում է ցածրմարժով ու հումքային ապրանքների վրա՞", a: "Սովորաբար ոչ։ Եթե մարժան 8% է, սակարկելու բան չկա, կարող ես մինուսի մեջ ընկնել։ Bidygo-ն լավագույնս աշխատում է 25%+ մարժով կատեգորիաներում, որտեղ գնորդը մտածում է գնելուց առաջ։ Եթե կատեգորիան չի համապատասխանում, անկեղծ կասենք առաջին զրույցում։" },
      { q: "Ինչպե՞ս է ազդում առանց գնման հեռանալու տոկոսի վրա", a: "Սա այն թիվն է, որին արժե հետևել։ Առաջին խմբակում առանց գնման հեռանալու տոկոսը իջել է 1,5–3 տոկոսային կետով առաջին 90 օրում, ինչը 4–9% եկամտի աճ է տալիս բարձր մտածմունքի կատեգորիաներում։ Կաբինետը ցույց է տալիս հեռանալու տոկոսը շաբաթական՝ էֆեկտը երևում է։" },
    ],
    related: ["customer-led-pricing", "why-discounts-hurt-margin", "in-store-online-revolution"],
  },
];

export const articles: Record<Locale, Article[]> = {
  en: articlesEn,
  ru: articlesRu,
  am: articlesAm,
};

export function getArticles(locale: string): Article[] {
  return articles[locale as Locale] ?? [];
}

export function getArticle(slug: string, locale: string = "en"): Article | undefined {
  return getArticles(locale).find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articlesEn.map((a) => a.slug);
}
