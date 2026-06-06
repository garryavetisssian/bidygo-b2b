import type { Locale } from "@/i18n/routing";

export type IndustrySlug =
  | "electronics"
  | "fashion"
  | "footwear"
  | "beauty"
  | "home-goods";

export interface Industry {
  slug: IndustrySlug;
  name: string;
  shortName: string;
  emoji: string;
  bgClass: string;
  accentClass: string;
  tagline: string;
  hero: { eyebrow: string; headline: string; subhead: string };
  pains: { title: string; body: string }[];
  whyFails: { title: string; body: string }[];
  howHelps: { title: string; body: string }[];
  outcomes: { metric: string; label: string }[];
  faqs: { q: string; a: string }[];
}

const industriesEn: Industry[] = [
  {
    slug: "electronics",
    name: "Electronics & Appliances",
    shortName: "Electronics",
    emoji: "📱",
    bgClass: "bg-[oklch(0.92_0.06_240)]",
    accentClass: "text-[oklch(0.55_0.16_240)]",
    tagline: "High-consideration shoppers walk out daily over $40 on a $400 device. Convert them instead.",
    hero: {
      eyebrow: "For electronics retailers",
      headline: "Your customer compared three stores before walking into yours. Give them a reason to commit.",
      subhead: "Electronics shoppers research, hesitate, and compare. They'll walk out over a 10% gap. Bidygo lets them negotiate that gap — privately, with your approval — and converts the sale in the store they're already standing in.",
    },
    pains: [
      { title: "Price-shopping by phone, in your aisle", body: "Your shopper has 4 marketplace tabs open while standing at the shelf. The first competitor under your price wins — unless you give them a reason to commit here." },
      { title: "Margin pressure from grey market", body: "Distributors, parallel imports, and AliExpress put a ceiling on what you can charge. You can't lower the shelf without telling everyone to wait for a sale." },
      { title: "Big-ticket hesitation", body: "$400-$2,000 SKUs trigger deliberation. Shoppers leave to 'think about it' — and rarely come back." },
    ],
    whyFails: [
      { title: "Sitewide discounts kill margin", body: "Lowering shelf price gives the same discount to the shopper who would have paid full." },
      { title: "Bundling adds complexity", body: "Headphones-with-laptop bundles need warehouse coordination and confuse staff." },
      { title: "Sales reps can't negotiate freely", body: "Floor staff have no authority to discount, no view of your real-time inventory pressure, and no audit trail." },
    ],
    howHelps: [
      { title: "Per-SKU price floors", body: "Set the minimum you'll accept on every model. Offers below auto-decline. No staff judgment required." },
      { title: "Demand signal per shelf", body: "Watch what shoppers actually offer for each SKU each week. Use it to reprice, restock, or pull from the floor." },
      { title: "Counter automation", body: "Common counter offers (e.g. floor +5%) can be auto-suggested. Speed up your team. Stay in control." },
    ],
    outcomes: [
      { metric: "+18%", label: "Conversion on previously-walk-out shoppers" },
      { metric: "94%", label: "Of offers either accepted or countered (vs. ignored)" },
      { metric: "$0", label: "Discount given to shoppers who'd pay full" },
    ],
    faqs: [
      { q: "Does this work for warranties and bundles?", a: "Yes — offers cover the SKU. Warranty add-ons, installation, and bundles stay at their published price." },
      { q: "Can shoppers offer below my distributor cost?", a: "They can offer anything — but offers under your set floor are auto-declined without you seeing them. The floor protects margin." },
      { q: "Will my staff need to negotiate?", a: "Not unless you want them to. Most partners auto-counter to the floor +5% and let staff intervene only on exceptions." },
    ],
  },
  {
    slug: "fashion",
    name: "Fashion & Apparel",
    shortName: "Fashion",
    emoji: "👗",
    bgClass: "bg-[oklch(0.92_0.06_330)]",
    accentClass: "text-[oklch(0.55_0.18_330)]",
    tagline: "Margin protected. Stock cleared. No site-wide sale that trains shoppers to wait.",
    hero: {
      eyebrow: "For fashion retailers",
      headline: "Move the season's tail without training shoppers to wait for the sale.",
      subhead: "Fashion margins are won and lost in the last 30% of inventory. Bidygo lets you clear slow-movers without a marked-down rack — and without conditioning every shopper to expect a discount on next season's arrivals.",
    },
    pains: [
      { title: "End-of-season fire sales kill brand equity", body: "70%-off racks teach your full-price shoppers that they paid too much. They wait next season." },
      { title: "Size & SKU mismatch", body: "You have the M but not the L. The shopper loved it. They left to find it online — and never came back." },
      { title: "Markdown depth math", body: "Buying teams guess at -20% vs -30% vs -50% without knowing what would actually move the unit." },
    ],
    whyFails: [
      { title: "Markdowns are one-size-fits-all", body: "Same -40% to the shopper who'd pay -10% and the one who wouldn't bite at -50%." },
      { title: "Outlet channels drain brand", body: "Off-site outlet stores lower brand perception and eat your full-price traffic." },
      { title: "Email promo fatigue", body: "Your 'exclusive' -25% email goes to 200,000 inboxes. It's not exclusive. Shoppers know." },
    ],
    howHelps: [
      { title: "Private offers, brand intact", body: "Every negotiation is between one shopper and your store — never public, never on the shelf." },
      { title: "SKU-level willingness-to-pay", body: "See what your shoppers would pay for that one slow-moving SKU before you write it off." },
      { title: "Clear stock by exception", body: "Lift floors on the last 10 units of a style and let the demand find the price. No public sale required." },
    ],
    outcomes: [
      { metric: "1.7×", label: "Sell-through on previously-marked-down inventory" },
      { metric: "0", label: "Public discount required to clear tail SKUs" },
      { metric: "+12%", label: "Conversion lift on hesitating shoppers" },
    ],
    faqs: [
      { q: "Will this cannibalize my full-price sales?", a: "No — only shoppers about to walk out are likely to make an offer. Full-price shoppers don't open Bidygo." },
      { q: "Can I exclude new arrivals?", a: "Yes — set floors equal to retail on protected SKUs. Bidygo will auto-decline anything below shelf." },
      { q: "How does this interact with loyalty?", a: "Loyalty programs reward repeat buyers; Bidygo converts hesitating ones. They run in parallel." },
    ],
  },
  {
    slug: "footwear",
    name: "Footwear",
    shortName: "Footwear",
    emoji: "👟",
    bgClass: "bg-[oklch(0.92_0.07_60)]",
    accentClass: "text-[oklch(0.55_0.16_60)]",
    tagline: "Size mismatches, seasonal tails, last-of-stock pairs — moved at a price that still makes sense.",
    hero: {
      eyebrow: "For footwear retailers",
      headline: "Last pair, wrong size, end of season. Sell it — or watch it sit until next year.",
      subhead: "Footwear inventory is more granular than any other category. Bidygo gives you a per-pair, per-size lever to move what's sitting — without ever marking down the wall.",
    },
    pains: [
      { title: "Half-sizes nobody wants", body: "9.5s and 10.5s stick around forever. The 10 sells in a day." },
      { title: "Color tails", body: "The bright pink ran. The neutral is still on the wall in October." },
      { title: "Returns from online sizing", body: "Your physical store inherits e-com's mis-sizes. They come back in odd ones and twos." },
    ],
    whyFails: [
      { title: "Outlet channels eat margin", body: "Sending tails to outlet means writing off 60-80%." },
      { title: "Staff-driven discounting", body: "Sales associates either over-discount to close or refuse and lose the sale entirely." },
      { title: "Markdown signage hurts brand", body: "Half-off stickers tell shoppers your full-price selection isn't worth it." },
    ],
    howHelps: [
      { title: "Per-size, per-color price floors", body: "Lower the floor on a 9.5 brown sandal. Keep the wall price for the 10 black." },
      { title: "Aged inventory triggers", body: "After 90 days on shelf, auto-lower the floor by your chosen %. Stop watching pairs gather dust." },
      { title: "Real-time activity dashboards", body: "Floor team sees what Bidygo is doing in seconds — automated answers, accept rates, escalations. No printed sheets, no 'ask the manager.'" },
    ],
    outcomes: [
      { metric: "+22%", label: "Sell-through on aged stock-keeping units" },
      { metric: "65%", label: "Of one-pair-left SKUs cleared at acceptable margin" },
      { metric: "−40%", label: "Staff time spent on individual discount calls" },
    ],
    faqs: [
      { q: "Does this work for limited editions?", a: "Yes — set the floor at or above retail. Bidygo doubles as your hype-product price floor enforcement layer." },
      { q: "What about returns?", a: "Returns follow your standard policy. Bidygo doesn't change anything downstream of the sale." },
      { q: "Can I run this on outlet pricing too?", a: "Absolutely. Outlets benefit even more from per-pair negotiation than full-price stores." },
    ],
  },
  {
    slug: "beauty",
    name: "Beauty & Personal Care",
    shortName: "Beauty",
    emoji: "💄",
    bgClass: "bg-[oklch(0.92_0.07_15)]",
    accentClass: "text-[oklch(0.55_0.18_15)]",
    tagline: "Premium SKUs need premium positioning. Offer flexibility one shopper at a time, not on the shelf.",
    hero: {
      eyebrow: "For beauty retailers",
      headline: "Premium positioning. Personal pricing. Both, at once.",
      subhead: "Beauty shoppers are loyal — until they're not. A 15% gap to e-com is enough to send them online. Bidygo closes the gap privately, on the SKUs you choose, without ever marking your shelves.",
    },
    pains: [
      { title: "E-com price match pressure", body: "Sephora, online perfumeries, parallel imports — all undercutting your shelf without your overhead." },
      { title: "Tester / sampling loss", body: "Shoppers try in-store, buy online. Your testers become competitor product demos." },
      { title: "Discontinued SKU writeoffs", body: "Reformulations leave old stock unsellable at retail. Outlet-only is brand-destructive." },
    ],
    whyFails: [
      { title: "Loyalty programs reward existing buyers", body: "They don't convert the hesitating ones." },
      { title: "Discounting prestige hurts the brand", body: "A shelf marked 'Chanel −25%' looks like fake stock." },
      { title: "GWP (gift-with-purchase) inflates AOV but not conversion", body: "Free mascara doesn't close the customer who'd only buy if the lipstick was $5 less." },
    ],
    howHelps: [
      { title: "Discreet negotiation", body: "No shopper sees another shopper's accepted price. Brand integrity preserved." },
      { title: "Tester-to-buy bridge", body: "Shoppers can offer on the SKU they just tested — closing the gap to online while they're still in front of you." },
      { title: "Per-brand floors", body: "Lock luxury houses at full price. Open negotiation on private label or fading SKUs." },
    ],
    outcomes: [
      { metric: "+15%", label: "Conversion on hesitating prestige shoppers" },
      { metric: "0", label: "Visible discount on protected luxury brands" },
      { metric: "+28%", label: "Sell-through on reformulation-tail SKUs" },
    ],
    faqs: [
      { q: "Brand agreements often forbid discounting. Does this violate them?", a: "Bidygo is a private channel, not a public discount. Most brand agreements specifically permit per-shopper accommodation. We help you keep records for audit." },
      { q: "What about gift-with-purchase?", a: "GWP can be added on top of an accepted offer, or used as your counter-suggestion instead of a price reduction." },
      { q: "Does this work for in-store services?", a: "Services (makeup, facials) follow appointment pricing — Bidygo handles SKUs only." },
    ],
  },
  {
    slug: "home-goods",
    name: "Home Goods & Furniture",
    shortName: "Home Goods",
    emoji: "🛋️",
    bgClass: "bg-[oklch(0.93_0.05_140)]",
    accentClass: "text-[oklch(0.50_0.14_140)]",
    tagline: "Big-ticket items, long deliberation. Close the deal in the showroom — at a price both sides can live with.",
    hero: {
      eyebrow: "For home goods retailers",
      headline: "They sat on the sofa. They loved it. Don't let them leave to 'think about it.'",
      subhead: "Furniture and home goods are the highest-deliberation in retail. Shoppers leave to 'think' — and 70% never come back. Bidygo gives them a reason to commit while their hand is still on the fabric.",
    },
    pains: [
      { title: "'Let me think about it'", body: "The phrase that ends 70% of furniture sales journeys." },
      { title: "Floor models that can't be sold", body: "Display pieces age, scuff, and lose value. Selling them requires deep discounts." },
      { title: "Long delivery quotes lose shoppers", body: "'6-8 weeks' gives shoppers time to find an alternative." },
    ],
    whyFails: [
      { title: "Floor staff need manager approval to negotiate", body: "By the time they get it, the shopper has left." },
      { title: "Bulk discount events teach shoppers to wait", body: "'Memorial Day sale' cycles cannibalize the rest of the year." },
      { title: "Showroom-to-warehouse handoff is opaque", body: "Shoppers don't know if their offer would be accepted because the staff doesn't know either." },
    ],
    howHelps: [
      { title: "On-the-spot answers", body: "Manager approval rules baked in. Staff (or shoppers themselves) get an accept/counter/decline in under 60 seconds." },
      { title: "Floor model lifecycle automation", body: "After 90 days on display, auto-lower the floor by your set %. Move it before it's un-sellable." },
      { title: "Bundle pricing intelligence", body: "Learn the price at which a sofa + ottoman combo closes vs. the sofa alone." },
    ],
    outcomes: [
      { metric: "+24%", label: "Same-visit close on previously-deliberating shoppers" },
      { metric: "−55%", label: "Floor model aging beyond 90 days" },
      { metric: "1.4×", label: "Average order value with bundle counter-offers" },
    ],
    faqs: [
      { q: "How does this work with delivery scheduling?", a: "Accepted offers route directly to your order system with the agreed price. Delivery is unchanged." },
      { q: "Can we negotiate on custom orders?", a: "Yes — but typically only on options, fabrics, or upgrades, not on base configuration. You decide what's negotiable." },
      { q: "What about returns on accepted offers?", a: "Same return policy as any other sale. The negotiated price is the final price." },
    ],
  },
];

// REVIEW REQUIRED: native CIS-retail copywriter (see docs/translation-brief.md)
const industriesRu: Industry[] = [
  {
    slug: "electronics",
    name: "Электроника и техника",
    shortName: "Электроника",
    emoji: "📱",
    bgClass: "bg-[oklch(0.92_0.06_240)]",
    accentClass: "text-[oklch(0.55_0.16_240)]",
    tagline: "Каждый день вдумчивые покупатели уходят из-за 40 долларов на устройстве за 400. Дайте им остаться.",
    hero: {
      eyebrow: "Для магазинов электроники",
      headline: "Ваш покупатель сравнил три магазина, пока не зашёл к вам. Дайте ему повод закрыть сделку именно тут.",
      subhead: "Покупатели электроники изучают, сомневаются, сравнивают. Уходят из-за разницы в 10%. Bidygo даёт им закрыть этот разрыв тихо, с вашего одобрения — и продаёт в магазине, где они уже стоят.",
    },
    pains: [
      { title: "Сравнение цен с телефона прямо у полки", body: "Покупатель стоит у вашей витрины с четырьмя открытыми вкладками маркетплейсов. Первый, кто дешевле, забирает продажу — если вы не дали ему повод купить здесь." },
      { title: "Давление серого рынка", body: "Параллельный импорт и AliExpress задают потолок цены. Снизить полку — значит сказать всем ждать распродажи." },
      { title: "Дорогие покупки = долгие раздумья", body: "На устройствах за 400–2000 долларов покупатели уходят «подумать» и редко возвращаются." },
    ],
    whyFails: [
      { title: "Скидки на всё снижают маржу", body: "Опустив полку, вы дарите ту же скидку покупателю, который заплатил бы полную цену." },
      { title: "Комплекты сложно собирать", body: "Наушники-к-ноутбуку требуют складской координации и путают персонал." },
      { title: "Продавцы не могут торговаться", body: "У них нет полномочий, нет данных о реальном остатке и нет следа в системе." },
    ],
    howHelps: [
      { title: "Минимальная цена по каждой позиции", body: "Установите минимум по модели. Всё ниже — автоматический отказ. Решение принимаете не вы, а правила." },
      { title: "Реальный спрос по каждой полке", body: "Видите, что покупатели предлагают за каждую модель каждую неделю. Используйте, чтобы перецениться, дозаказать или убрать с витрины." },
      { title: "Встречные на автомате", body: "Часто встречающиеся встречные (например, минимум + 5%) предлагаются автоматически. Команда работает быстрее, контроль за вами." },
    ],
    outcomes: [
      { metric: "+18%", label: "Конверсия по тем, кто раньше уходил" },
      { metric: "94%", label: "Предложений получают ответ — да или встречное" },
      { metric: "$0", label: "Скидка тем, кто заплатил бы полную цену" },
    ],
    faqs: [
      { q: "Работает с гарантиями и комплектами?", a: "Да, предложение по самой позиции. Гарантия, установка и комплекты остаются по объявленной цене." },
      { q: "Могут ли предложить ниже моей закупки?", a: "Могут предложить любую цифру. Но всё ниже вашего минимума отклоняется автоматически, вы такое даже не увидите. Минимум защищает маржу." },
      { q: "Нужно ли продавцам торговаться?", a: "Не нужно, если не хотите. Большинство партнёров ставят авто-встречные на минимум +5% и подключают людей только в исключениях." },
    ],
  },
  {
    slug: "fashion",
    name: "Одежда и мода",
    shortName: "Мода",
    emoji: "👗",
    bgClass: "bg-[oklch(0.92_0.06_330)]",
    accentClass: "text-[oklch(0.55_0.18_330)]",
    tagline: "Маржа сохранена. Остатки ушли. Без распродажи на весь магазин, которая приучает ждать.",
    hero: {
      eyebrow: "Для магазинов одежды",
      headline: "Уберите остатки сезона, не приучая покупателей ждать распродаж.",
      subhead: "Маржа в моде делается на последних 30% коллекции. Bidygo помогает разгрузить медленные позиции без витрины с уценкой и без воспитания у каждого покупателя привычки ждать следующего сезона со скидкой.",
    },
    pains: [
      { title: "Финальные распродажи рушат бренд", body: "Стойки со скидкой 70% объясняют покупателям полной цены, что они переплатили. Они ждут следующего раза." },
      { title: "Размеры и SKU не совпадают", body: "M есть, L нет. Понравилось, ушла искать онлайн, не вернулась." },
      { title: "Глубина скидки — гадание", body: "Закупщики угадывают -20% или -30%, не зная, что реально сдвинет единицу." },
    ],
    whyFails: [
      { title: "Скидки одинаковы для всех", body: "Те же -40% покупателю, который купил бы за -10%, и тому, кто и за -50% не возьмёт." },
      { title: "Аутлет вымывает бренд", body: "Внешние аутлеты ронят восприятие бренда и крадут трафик у полной цены." },
      { title: "Усталость от рассылок", body: "Ваше «эксклюзивное -25%» уходит на 200 тысяч ящиков. Никакой эксклюзивности. Покупатели это понимают." },
    ],
    howHelps: [
      { title: "Тихий торг, бренд цел", body: "Каждый разговор между одним покупателем и вашим магазином — никогда публично, никогда на витрине." },
      { title: "Готовность платить по каждой позиции", body: "Узнаёте, что покупатели готовы дать за конкретный SKU, до того как списываете его." },
      { title: "Разгрузка по исключению", body: "Понизьте минимум на последние 10 штук фасона и дайте спросу найти цену. Без публичной распродажи." },
    ],
    outcomes: [
      { metric: "1.7×", label: "Скорость продажи ранее уценённого" },
      { metric: "0", label: "Публичных скидок нужно для хвостов" },
      { metric: "+12%", label: "Конверсия по сомневающимся" },
    ],
    faqs: [
      { q: "Не съест ли это мои продажи по полной цене?", a: "Нет — только покупатель, готовый уйти, скорее всего сделает предложение. Покупатель полной цены даже не открывает Bidygo." },
      { q: "Можно ли исключить новинки?", a: "Да — поставьте минимум равным рознице на защищённых SKU. Bidygo отклонит всё ниже полки." },
      { q: "Как это работает с программой лояльности?", a: "Лояльность награждает постоянных, Bidygo конвертирует сомневающихся. Работают параллельно." },
    ],
  },
  {
    slug: "footwear",
    name: "Обувь",
    shortName: "Обувь",
    emoji: "👟",
    bgClass: "bg-[oklch(0.92_0.07_60)]",
    accentClass: "text-[oklch(0.55_0.16_60)]",
    tagline: "Последняя пара, неудобный размер, конец сезона — продайте их по цене, которая ещё имеет смысл.",
    hero: {
      eyebrow: "Для магазинов обуви",
      headline: "Последняя пара, не тот размер, конец сезона. Продайте — или смотрите, как лежит до следующего года.",
      subhead: "Обувной ассортимент дробится сильнее, чем где-либо. Bidygo даёт рычаг по каждой паре, каждому размеру — двинуть то, что висит, не уценивая стену.",
    },
    pains: [
      { title: "Полуразмеры, которые никто не хочет", body: "9.5 и 10.5 лежат вечно. 10 уходит за день." },
      { title: "Хвосты цветов", body: "Яркий розовый разлетелся. Нейтральный — на стене до октября." },
      { title: "Возвраты с онлайн-размеров", body: "Ваш магазин подбирает за онлайн-промахи. Возвращаются по штуке и двойке." },
    ],
    whyFails: [
      { title: "Аутлет ест маржу", body: "Отправить хвосты в аутлет — списать 60–80%." },
      { title: "Скидки на усмотрение продавца", body: "Либо передавливают, чтобы закрыть, либо отказывают и теряют продажу." },
      { title: "Вывески скидок бьют по бренду", body: "Полцены на стикерах говорят покупателям, что полная цена не стоит того." },
    ],
    howHelps: [
      { title: "Минимум по размеру и цвету", body: "Снизьте минимум на 9.5 в коричневом сандалии. Сохраните полную цену для 10 в чёрном." },
      { title: "Триггеры по возрасту запаса", body: "После 90 дней на полке — автоматическое снижение минимума на ваш процент. Хватит смотреть, как пары пылятся." },
      { title: "Реальные дашборды активности", body: "Команда видит, что делает Bidygo, за секунды — автоматические ответы, проценты принятий, эскалации. Без распечаток, без «спрошу у менеджера»." },
    ],
    outcomes: [
      { metric: "+22%", label: "Продажа залежалых артикулов" },
      { metric: "65%", label: "Последних пар уходят с приемлемой маржой" },
      { metric: "−40%", label: "Время продавца на индивидуальные скидки" },
    ],
    faqs: [
      { q: "Работает с лимитированными релизами?", a: "Да — поставьте минимум равным или выше розницы. Bidygo заодно работает как защита цены на хайповые позиции." },
      { q: "Что с возвратами?", a: "Стандартная политика возврата. Bidygo не меняет ничего после продажи." },
      { q: "Можно использовать на аутлет-ценах?", a: "Конечно. Аутлет выигрывает от поштучной торговли даже больше, чем полная розница." },
    ],
  },
  {
    slug: "beauty",
    name: "Красота и личный уход",
    shortName: "Красота",
    emoji: "💄",
    bgClass: "bg-[oklch(0.92_0.07_15)]",
    accentClass: "text-[oklch(0.55_0.18_15)]",
    tagline: "Премиум — это премиум-позиционирование. Гибкость по одному покупателю, не на полке.",
    hero: {
      eyebrow: "Для магазинов красоты",
      headline: "Премиум-позиционирование. Личная цена. И то, и другое — одновременно.",
      subhead: "Покупатели красоты лояльны — пока не лояльны. Разрыв 15% к онлайну отправляет их в интернет. Bidygo закрывает этот разрыв тихо, по позициям, которые вы выбираете, без надписей на полках.",
    },
    pains: [
      { title: "Давление онлайн-цены", body: "Sephora, онлайн-парфюмерии, параллельный импорт — все подрезают вашу полку без вашей аренды." },
      { title: "Потеря на тестерах", body: "Пробуют у вас, покупают онлайн. Ваши тестеры становятся демо для конкурентов." },
      { title: "Списание снятых с производства", body: "Реформулы оставляют старый сток нераспроданным. Аутлет только — убивает бренд." },
    ],
    whyFails: [
      { title: "Лояльность награждает уже своих", body: "Не конвертирует сомневающихся." },
      { title: "Скидка на прес­тиж бьёт по бренду", body: "Полка с «Chanel −25%» выглядит как поддельный сток." },
      { title: "Подарок к покупке поднимает чек, не конверсию", body: "Бесплатная тушь не закроет того, кто купит, только если помада на 5 долларов дешевле." },
    ],
    howHelps: [
      { title: "Тихий торг", body: "Никто не видит чужой принятой цены. Бренд цел." },
      { title: "Мост между тестером и покупкой", body: "Покупатель может предложить цену по позиции, которую только что протестировал, закрывая разрыв с онлайном здесь и сейчас." },
      { title: "Минимум по бренду", body: "Зафиксируйте люксовые дома на полной цене. Откройте торг по private label или уходящим SKU." },
    ],
    outcomes: [
      { metric: "+15%", label: "Конверсия по сомневающимся в премиум" },
      { metric: "0", label: "Видимых скидок на защищённых брендах" },
      { metric: "+28%", label: "Скорость продажи реформул" },
    ],
    faqs: [
      { q: "Контракты брендов часто запрещают скидки. Это не нарушение?", a: "Bidygo — частный канал, не публичная скидка. Большинство контрактов прямо допускают индивидуальные уступки. Помогаем держать аудит-след." },
      { q: "Что с подарком к покупке?", a: "Подарок можно добавить поверх принятого предложения или использовать как встречное вместо снижения цены." },
      { q: "Работает с услугами в салоне?", a: "Услуги (макияж, уход) идут по записи — Bidygo работает только с товарами." },
    ],
  },
  {
    slug: "home-goods",
    name: "Товары для дома и мебель",
    shortName: "Дом",
    emoji: "🛋️",
    bgClass: "bg-[oklch(0.93_0.05_140)]",
    accentClass: "text-[oklch(0.50_0.14_140)]",
    tagline: "Дорогие покупки, долгие раздумья. Закройте сделку в шоуруме — по цене, которая устраивает обоих.",
    hero: {
      eyebrow: "Для магазинов товаров для дома",
      headline: "Сел на диван. Понравился. Не дайте ему уйти «подумать».",
      subhead: "Мебель и товары для дома — самая долгая обдумываемая категория. Уходят «подумать» — и 70% не возвращаются. Bidygo даёт повод закрыть сделку, пока рука ещё на ткани.",
    },
    pains: [
      { title: "«Я подумаю»", body: "Фраза, на которой заканчиваются 70% мебельных продаж." },
      { title: "Выставочные образцы, которые нельзя продать", body: "Стареют, царапаются, теряют ценность. Чтобы продать — нужны глубокие скидки." },
      { title: "Долгие сроки доставки теряют покупателей", body: "«6–8 недель» даёт время найти альтернативу." },
    ],
    whyFails: [
      { title: "Продавцу нужно одобрение менеджера", body: "Пока он его получит, покупатель уже ушёл." },
      { title: "Сезонные распродажи учат ждать", body: "Цикл «майские скидки» съедает остальной год." },
      { title: "Шоурум-склад непрозрачны", body: "Покупатель не знает, примут ли его цену — потому что продавец тоже не знает." },
    ],
    howHelps: [
      { title: "Ответ на месте", body: "Правила одобрения зашиты. Продавец (или сам покупатель) получает да/встречное/нет меньше чем за минуту." },
      { title: "Автоматизация жизни выставочных образцов", body: "После 90 дней на показе — автоматическое снижение минимума на ваш процент. Уберите до того, как станет непродаваемым." },
      { title: "Спрос на комплекты", body: "Узнавайте, по какой цене закрывается диван + пуф против дивана отдельно." },
    ],
    outcomes: [
      { metric: "+24%", label: "Закрытие в тот же визит у сомневающихся" },
      { metric: "−55%", label: "Выставочные образцы старше 90 дней" },
      { metric: "1.4×", label: "Средний чек с встречными на комплекты" },
    ],
    faqs: [
      { q: "Как это работает с графиком доставки?", a: "Принятые предложения уходят прямо в систему заказов с согласованной ценой. Доставка не меняется." },
      { q: "Можно торговать по индивидуальным заказам?", a: "Да — но обычно только по опциям, тканям или апгрейдам, не по базовой комплектации. Вы решаете, что обсуждаемо." },
      { q: "Что с возвратами по принятой цене?", a: "Та же политика возврата, что и для любой продажи. Согласованная цена — финальная." },
    ],
  },
];

// REVIEW REQUIRED: native Yerevan-retail copywriter (see docs/translation-brief.md)
const industriesAm: Industry[] = [
  {
    slug: "electronics",
    name: "Էլեկտրոնիկա և տեխնիկա",
    shortName: "Էլեկտրոնիկա",
    emoji: "📱",
    bgClass: "bg-[oklch(0.92_0.06_240)]",
    accentClass: "text-[oklch(0.55_0.16_240)]",
    tagline: "Ամեն օր մտածող գնորդները հեռանում են 40 դոլարի համար 400-անոց սարքի վրա։ Հենց նրանց պահիր։",
    hero: {
      eyebrow: "Էլեկտրոնիկայի խանութների համար",
      headline: "Քո գնորդը երեք խանութ է համեմատել, մինչ քեզ մոտ եկավ։ Տուր նրան պատճառ՝ այստեղ գնելու։",
      subhead: "Էլեկտրոնիկայի գնորդները ուսումնասիրում են, տատանվում են, համեմատում։ Հեռանում են 10% տարբերության պատճառով։ Bidygo-ն թույլ է տալիս հանգիստ փակել այդ տարբերությունը՝ քո հաստատմամբ, և վաճառքը անցկացնում է հենց այնտեղ, որտեղ գնորդն արդեն կանգնած է։",
    },
    pains: [
      { title: "Հեռախոսով գին համեմատելը հենց դարակի մոտ", body: "Քո գնորդը կանգնած է դարակի մոտ՝ բաց 4 մարկետպլեյս ներդիր ձեռքին։ Առաջինը, ով քեզանից էժան է, վերցնում է վաճառքը — եթե դու պատճառ չտաս այստեղ գնելու։" },
      { title: "Մոխրագույն շուկայի ճնշում", body: "Զուգահեռ ներմուծումը և AliExpress-ը գին են սահմանում։ Դարակը իջեցնելը նշանակում է բոլորին ասել՝ սպասեք զեղչին։" },
      { title: "Թանկ գնումներ = երկար մտածմունք", body: "400-2000 դոլարի ապրանքների դեպքում գնորդները հեռանում են «մտածելու» ու հազվադեպ վերադառնում են։" },
    ],
    whyFails: [
      { title: "Բոլորի վրա զեղչը ուտում է մարժան", body: "Դարակն իջեցնելով՝ նույն զեղչը նվիրում ես այն գնորդին, ով լրիվ գին վճարելու էր։" },
      { title: "Կոմպլեկտները բարդ են", body: "Ականջակալ + նոութբուք համատեղումները պահանջում են պահեստի համակարգում և շփոթեցնում են անձնակազմին։" },
      { title: "Վաճառողները չեն կարող սակարկել", body: "Նրանք լիազորություն չունեն, իրական մնացորդի տվյալներ չունեն և համակարգում հետք չեն թողնում։" },
    ],
    howHelps: [
      { title: "Նվազագույն գին յուրաքանչյուր ապրանքի համար", body: "Սահմանիր նվազագույնը յուրաքանչյուր մոդելի համար։ Դրանից ցածր — ինքնաշխատ մերժում։ Որոշումը չես կայացնում դու, այլ կանոնները։" },
      { title: "Իրական պահանջարկ ամեն դարակի համար", body: "Տեսնում ես, թե ինչ են գնորդները առաջարկում ամեն մոդելի համար ամեն շաբաթ։ Օգտագործիր՝ վերագնահատելու, պատվիրելու կամ դարակից հանելու։" },
      { title: "Ինքնապատասխաններ", body: "Հաճախ հանդիպող պատասխանները (օրինակ՝ նվազագույն + 5%) առաջարկվում են ինքնաշխատ։ Թիմը ավելի արագ է աշխատում, հսկողությունը մնում է քեզ մոտ։" },
    ],
    outcomes: [
      { metric: "+18%", label: "Փոխարկում նրանց համար, ովքեր նախկինում հեռանում էին" },
      { metric: "94%", label: "Առաջարկներ ստանում են պատասխան՝ այո կամ հակառաջարկ" },
      { metric: "$0", label: "Զեղչ նրանց, ովքեր լրիվ կվճարեին" },
    ],
    faqs: [
      { q: "Աշխատու՞մ է երաշխիքների և կոմպլեկտների հետ", a: "Այո, առաջարկը հենց ապրանքի համար է։ Երաշխիքը, տեղադրումը և կոմպլեկտները մնում են հայտարարված գնով։" },
      { q: "Կարո՞ղ են գնորդներն իմ գնման գնից ցածր առաջարկել", a: "Կարող են ցանկացած թիվ առաջարկել։ Բայց քո նվազագույնից ցածր ամեն ինչ ինքնաշխատ մերժվում է, դու նույնիսկ չես տեսնի։ Նվազագույնը պաշտպանում է մարժան։" },
      { q: "Վաճառողներս պիտի սակարկե՞ն", a: "Ոչ, եթե չես ուզում։ Մեծ մասը դնում են ինքնապատասխան՝ նվազագույն + 5%, ու մարդկանց ներգրավում միայն բացառությունների դեպքում։" },
    ],
  },
  {
    slug: "fashion",
    name: "Հագուստ և նորաձևություն",
    shortName: "Հագուստ",
    emoji: "👗",
    bgClass: "bg-[oklch(0.92_0.06_330)]",
    accentClass: "text-[oklch(0.55_0.18_330)]",
    tagline: "Մարժան պահպանված է։ Մնացորդները՝ սպառված։ Առանց ամբողջ խանութի վրա զեղչի, որ գնորդներին սովորեցնում է սպասել։",
    hero: {
      eyebrow: "Հագուստի խանութների համար",
      headline: "Սեզոնի մնացորդը հանիր՝ առանց գնորդներին սովորեցնելու սպասել զեղչին։",
      subhead: "Նորաձևության մարժան վաստակվում է վերջին 30%-ի վրա։ Bidygo-ն օգնում է հանել դանդաղ ապրանքները՝ առանց զեղչված դարակի և առանց ամեն գնորդի սովորեցնելու սպասել հաջորդ սեզոնին։",
    },
    pains: [
      { title: "Վերջի զեղչերը կործանում են բրենդը", body: "70% զեղչով դարակները ասում են լրիվ գին վճարող գնորդիդ՝ ավելորդ ես վճարել։ Հաջորդ սեզոնը կսպասեն։" },
      { title: "Չափսերն ու ապրանքները չեն համընկնում", body: "M-ը կա, L-ը՝ ոչ։ Դուր եկավ, գնաց փնտրելու օնլայն, չվերադարձավ։" },
      { title: "Զեղչի խորությունը գուշակություն է", body: "Գնման թիմը գուշակում է -20%, -30%, -50%՝ չիմանալով, թե ինչն իսկապես կշարժի։" },
    ],
    whyFails: [
      { title: "Զեղչը նույնն է բոլորի համար", body: "Նույն -40%-ը գնորդին, ով կգներ -10%-ով, և նրան, ով -50%-ով էլ չի վերցնի։" },
      { title: "Աութլեթ ուղին քայքայում է բրենդը", body: "Աութլեթը ցածրացնում է բրենդի ընկալումը և ուտում է լրիվ գին վճարող գնորդների հոսքը։" },
      { title: "Փոստերից հոգնածություն", body: "Քո «բացառիկ -25%»-ը գնում է 200 հազար փոստարկղ։ Բացառիկ չէ։ Գնորդները հասկանում են։" },
    ],
    howHelps: [
      { title: "Հանգիստ սակարկություն, բրենդը՝ ամբողջական", body: "Ամեն խոսակցություն մեկ գնորդի և քո խանութի միջև — երբեք հրապարակային, երբեք դարակի վրա։" },
      { title: "Վճարման պատրաստակամություն ամեն ապրանքի համար", body: "Իմացիր, թե գնորդներն ինչ կվճարեին այդ դանդաղ ապրանքի համար, նախքան դուրս կգրես։" },
      { title: "Մնացորդը հանել բացառությամբ", body: "Իջեցրու նվազագույնը վերջին 10 հատի վրա ու թող պահանջարկը գին գտնի։ Առանց հրապարակային զեղչի։" },
    ],
    outcomes: [
      { metric: "1.7×", label: "Նախկինում զեղչված մնացորդի վաճառքի արագություն" },
      { metric: "0", label: "Հանրային զեղչ՝ մնացորդը մաքրելու համար" },
      { metric: "+12%", label: "Փոխարկում տատանվող գնորդների համար" },
    ],
    faqs: [
      { q: "Չի՞ ուտի լրիվ գնով վաճառքներս", a: "Ոչ — միայն այն գնորդը, ով պատրաստ է հեռանալ, հավանաբար առաջարկ կանի։ Լրիվ գին վճարող գնորդը Bidygo-ն նույնիսկ չի բացում։" },
      { q: "Կարո՞ղ եմ բացառել նորույթները", a: "Այո — դիր նվազագույնը դարակի գնին հավասար։ Bidygo-ն կմերժի դրանից ցածր ամեն ինչ։" },
      { q: "Ինչպե՞ս է աշխատում լոյալության ծրագրի հետ", a: "Լոյալությունը պարգևատրում է մշտական գնորդներին, Bidygo-ն տանում է տատանվողներին։ Աշխատում են զուգահեռ։" },
    ],
  },
  {
    slug: "footwear",
    name: "Կոշիկ",
    shortName: "Կոշիկ",
    emoji: "👟",
    bgClass: "bg-[oklch(0.92_0.07_60)]",
    accentClass: "text-[oklch(0.55_0.16_60)]",
    tagline: "Վերջին զույգը, անհարմար չափսը, սեզոնի վերջը — վաճառիր այնպիսի գնով, որ դեռ իմաստ ունի։",
    hero: {
      eyebrow: "Կոշիկի խանութների համար",
      headline: "Վերջին զույգը, սխալ չափսը, սեզոնի վերջը։ Վաճառիր — կամ նայիր, թե ինչպես մինչև հաջորդ տարի կպառկի։",
      subhead: "Կոշիկի տեսականին ավելի շատ է բաժանվում, քան որևէ այլ կատեգորիա։ Bidygo-ն տալիս է լծակ ամեն զույգի, ամեն չափսի համար՝ շարժելու այն, ինչ նստած է, առանց պատերին զեղչ դնելու։",
    },
    pains: [
      { title: "Կիսաչափսեր, որ ոչ ոք չի ուզում", body: "9.5-ն ու 10.5-ը հավիտյան պառկած են։ 10-ը մեկ օրում գնում է։" },
      { title: "Գույների մնացորդ", body: "Վառ վարդագույնը անհետացել է։ Չեզոքն հոկտեմբերին դեռ պատին է։" },
      { title: "Օնլայն չափսերից վերադարձներ", body: "Քո խանութն ուղեկցում է օնլայնի սխալները։ Վերադառնում են մեկական, երկուական։" },
    ],
    whyFails: [
      { title: "Աութլեթը ուտում է մարժան", body: "Մնացորդը աութլեթ ուղարկելը նշանակում է դուրս գրել 60-80%-ը։" },
      { title: "Վաճառողի կողմից որոշված զեղչ", body: "Կամ չափից շատ զեղչում են փակելու համար, կամ մերժում ու կորցնում վաճառքը։" },
      { title: "Զեղչի ցուցանակները հարվածում են բրենդին", body: "Կիսագնի կպչուկները ասում են գնորդներին, որ քո լրիվ գին վճարող տեսականին չարժե։" },
    ],
    howHelps: [
      { title: "Նվազագույն գին ըստ չափսի և գույնի", body: "Իջեցրու նվազագույնը 9.5 շագանակագույն սանդալի վրա։ Պահիր լրիվ գինը 10 սև-ի համար։" },
      { title: "Պաշարի տարիքի թրիգերներ", body: "90 օր դարակում մնալուց հետո՝ ինքնաշխատ նվազագույնի իջեցում քո ընտրած տոկոսով։ Բավական է նայել, թե ինչպես են զույգերը փոշոտվում։" },
      { title: "Իրական գործունեության վահանակներ", body: "Թիմը տեսնում է, թե ինչ է անում Bidygo-ն, վայրկյանների մեջ — ինքնաշխատ պատասխաններ, ընդունման տոկոսներ, սրացումներ։ Առանց տպած թերթիկների, առանց «մենեջերին հարցնեմ»։" },
    ],
    outcomes: [
      { metric: "+22%", label: "Հին ապրանքների վաճառքի արագություն" },
      { metric: "65%", label: "Վերջին զույգերը գնում են ընդունելի մարժով" },
      { metric: "−40%", label: "Վաճառողի ժամանակը անհատական զեղչերի վրա" },
    ],
    faqs: [
      { q: "Աշխատու՞մ է լիմիտացված հրապարակումների հետ", a: "Այո — դիր նվազագույնը հավասար կամ բարձր դարակի գնից։ Bidygo-ն միաժամանակ աշխատում է որպես հայտնի ապրանքների գնի պաշտպան։" },
      { q: "Ի՞նչ կլինի վերադարձների հետ", a: "Քո ստանդարտ վերադարձի կանոնը։ Bidygo-ն ոչինչ չի փոխում վաճառքից հետո։" },
      { q: "Կարո՞ղ եմ օգտագործել աութլեթ գների վրա", a: "Անշուշտ։ Աութլեթը զույգ-զույգ սակարկությունից նույնիսկ ավելի շատ է շահում, քան լրիվ գին վճարող խանութները։" },
    ],
  },
  {
    slug: "beauty",
    name: "Գեղեցկություն և անձնական խնամք",
    shortName: "Գեղեցկություն",
    emoji: "💄",
    bgClass: "bg-[oklch(0.92_0.07_15)]",
    accentClass: "text-[oklch(0.55_0.18_15)]",
    tagline: "Պրեմիումը պրեմիում դիրքավորում է պահանջում։ Ճկունություն ամեն գնորդի համար, ոչ՝ դարակի վրա։",
    hero: {
      eyebrow: "Գեղեցկության խանութների համար",
      headline: "Պրեմիում դիրքավորում։ Անհատական գին։ Միաժամանակ։",
      subhead: "Գեղեցկության գնորդները հավատարիմ են — մինչև չեն։ 15% տարբերությունը օնլայնից բավական է, որ նրանք գնան համացանց։ Bidygo-ն փակում է այդ տարբերությունը հանգիստ, քո ընտրած ապրանքների վրա, առանց դարակին գրելու։",
    },
    pains: [
      { title: "Օնլայն գնի ճնշում", body: "Sephora-ն, օնլայն օծանելիքները, զուգահեռ ներմուծումը — բոլորը կտրում են քո դարակն առանց քո վարձավճարի։" },
      { title: "Տեստերների կորուստ", body: "Փորձում են քո մոտ, գնում օնլայն։ Քո տեստերները դառնում են մրցակցի ապրանքի դեմո։" },
      { title: "Արտադրությունից հանված SKU-ների դուրսգրում", body: "Ռեֆորմուլացիաները թողնում են հին պաշարը չվաճառված։ Աութլեթ ուղարկելը կործանում է բրենդը։" },
    ],
    whyFails: [
      { title: "Լոյալությունը պարգևատրում է արդեն իր գնորդներին", body: "Չի փոխարկում տատանվողներին։" },
      { title: "Պրեստիժի վրա զեղչը հարվածում է բրենդին", body: "«Chanel −25%» դարակը նման է կեղծ ապրանքի։" },
      { title: "Նվեր-գնման հետ բարձրացնում է չեկը, ոչ՝ փոխարկումը", body: "Անվճար տուշը չի փակի այն գնորդին, ով կգներ միայն, եթե շրթներկն 5 դոլարով էժան լիներ։" },
    ],
    howHelps: [
      { title: "Հանգիստ սակարկություն", body: "Ոչ մի գնորդ չի տեսնում մյուսի ընդունված գինը։ Բրենդի ամբողջականությունը պահպանված է։" },
      { title: "Կամուրջ տեստերից գնման", body: "Գնորդը կարող է առաջարկել այն ապրանքի համար, որ հենց նոր փորձել է — փակելով օնլայնի հետ տարբերությունը այստեղ ու հիմա։" },
      { title: "Նվազագույն ըստ բրենդի", body: "Կողպիր լյուքս տները լրիվ գնով։ Բացիր սակարկությունը private label-ի կամ անհետացող SKU-ների վրա։" },
    ],
    outcomes: [
      { metric: "+15%", label: "Փոխարկում տատանվող պրեմիում գնորդների" },
      { metric: "0", label: "Տեսանելի զեղչեր պաշտպանված բրենդների վրա" },
      { metric: "+28%", label: "Ռեֆորմուլացիայի մնացորդի վաճառքի արագություն" },
    ],
    faqs: [
      { q: "Բրենդերի պայմանագրերը հաճախ արգելում են զեղչեր։ Սա խախտո՞ւմ է", a: "Bidygo-ն անձնական ալիք է, ոչ՝ հանրային զեղչ։ Պայմանագրերի մեծ մասը թույլատրում են անհատական ճկունություն։ Մենք օգնում ենք պահել աուդիտի հետք։" },
      { q: "Ի՞նչ կլինի նվեր-գնման հետ", a: "Նվերը կարող է ավելացվել ընդունված առաջարկի վրա կամ օգտագործվել որպես հակառաջարկ՝ գնի իջեցման փոխարեն։" },
      { q: "Աշխատու՞մ է սրահի ծառայությունների հետ", a: "Ծառայությունները (դիմահարդարում, դեմքի խնամք) գնում են ըստ պատվերի — Bidygo-ն աշխատում է միայն ապրանքների հետ։" },
    ],
  },
  {
    slug: "home-goods",
    name: "Տնային ապրանքներ և կահույք",
    shortName: "Տանը",
    emoji: "🛋️",
    bgClass: "bg-[oklch(0.93_0.05_140)]",
    accentClass: "text-[oklch(0.50_0.14_140)]",
    tagline: "Թանկ գնումներ, երկար մտածմունք։ Փակիր գործարքը սրահում՝ գնով, որ երկուսին էլ սազում է։",
    hero: {
      eyebrow: "Տնային ապրանքների խանութների համար",
      headline: "Նստել է բազմոցին։ Դուր է եկել։ Մի թող, որ գնա «մտածելու»։",
      subhead: "Կահույքն ու տնային ապրանքները ամենաերկար մտածվող կատեգորիան են։ Գնում են «մտածելու» — և 70%-ը չի վերադառնում։ Bidygo-ն տալիս է պատճառ՝ փակել գործարքը, քանի դեռ ձեռքը գործվածքի վրա է։",
    },
    pains: [
      { title: "«Կմտածեմ»", body: "Ֆրազ, որով ավարտվում են կահույքի վաճառքների 70%-ը։" },
      { title: "Ցուցադրական մոդելներ, որ չեն վաճառվում", body: "Ծերանում են, քերծվում, արժեքը կորցնում։ Վաճառելը պահանջում է խոր զեղչ։" },
      { title: "Երկար առաքման ժամկետները կորցնում են գնորդներին", body: "«6-8 շաբաթ» տալիս է ժամանակ՝ այլընտրանք գտնելու։" },
    ],
    whyFails: [
      { title: "Վաճառողը մենեջերի հաստատում է պահանջում", body: "Մինչ ստանա, գնորդն արդեն գնացել է։" },
      { title: "Սեզոնային զեղչերը սովորեցնում են սպասել", body: "«Մայիսյան զեղչեր» ցիկլը ուտում է մնացած տարին։" },
      { title: "Սրահ-պահեստի կապն անթափանց է", body: "Գնորդը չգիտի՝ արդյոք իր գինը կընդունվի, որովհետև վաճառողն էլ չգիտի։" },
    ],
    howHelps: [
      { title: "Պատասխան տեղում", body: "Հաստատման կանոնները ներդրված են։ Վաճառողը (կամ ինքը գնորդը) ստանում է այո/հակառաջարկ/ոչ մեկ րոպեից պակաս ժամանակում։" },
      { title: "Ցուցադրական մոդելների ավտոմատացում", body: "90 օր ցուցադրությունից հետո՝ ինքնաշխատ նվազագույնի իջեցում քո ընտրած տոկոսով։ Հանիր, մինչև անվաճառելի դառնա։" },
      { title: "Կոմպլեկտների պահանջարկ", body: "Իմացիր, թե ինչ գնով է փակվում բազմոց + աթոռակ համատեղումը՝ բազմոցի մեկ վաճառքի դիմաց։" },
    ],
    outcomes: [
      { metric: "+24%", label: "Նույն այցով փակում տատանվող գնորդների համար" },
      { metric: "−55%", label: "Ցուցադրական մոդելներ 90 օրից ավելի" },
      { metric: "1.4×", label: "Միջին չեկ՝ կոմպլեկտների հակառաջարկներով" },
    ],
    faqs: [
      { q: "Ինչպե՞ս է աշխատում առաքման ժամանակացույցի հետ", a: "Ընդունված առաջարկները գնում են ուղիղ պատվերի համակարգ՝ համաձայնեցված գնով։ Առաքումը չի փոխվում։" },
      { q: "Կարո՞ղ ենք սակարկել անհատական պատվերների վրա", a: "Այո — բայց սովորաբար միայն ընտրանքների, գործվածքների կամ բարելավումների վրա, ոչ՝ բազային համալրման։ Դու ես որոշում, ինչը կարող է քննարկվել։" },
      { q: "Ի՞նչ կլինի վերադարձների հետ ընդունված գնով", a: "Նույն վերադարձի կանոնը, ինչ ցանկացած վաճառքի դեպքում։ Համաձայնեցված գինը վերջնական է։" },
    ],
  },
];

export const industries: Record<Locale, Industry[]> = {
  en: industriesEn,
  ru: industriesRu,
  am: industriesAm,
};

export function getIndustries(locale: string): Industry[] {
  return industries[locale as Locale] ?? [];
}

/**
 * Returns the industry for a slug in a locale.
 * Defaults to "en" if locale not provided (used by sitemap, generateStaticParams).
 */
export function getIndustry(slug: string, locale: string = "en"): Industry | undefined {
  return getIndustries(locale).find((i) => i.slug === slug);
}

/**
 * All industry slugs (locale-agnostic — used for static params + sitemap).
 */
export function getAllIndustrySlugs(): IndustrySlug[] {
  return industriesEn.map((i) => i.slug);
}
