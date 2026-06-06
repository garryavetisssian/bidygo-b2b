import type { Locale } from "@/i18n/routing";

export type GlossaryCluster = "pricing" | "shopper-behavior" | "metrics" | "operations";

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  body: string[];
  example?: { context: string; text: string };
  relatedTerms: string[];
  cluster: GlossaryCluster;
}

const glossaryEn: GlossaryTerm[] = [
  {
    slug: "shopper-led-pricing",
    term: "Shopper-led pricing",
    shortDefinition:
      "A retail pricing model where the shopper proposes a price and the retailer's rules accept, counter, or decline automatically.",
    body: [
      "Shopper-led pricing inverts traditional retail. Instead of the store posting one price and the shopper either paying it or walking away, the shopper proposes the price they would actually pay and the store's pricing rules respond — usually within seconds.",
      "The shelf price doesn't move. Only the individual shopper who initiated the conversation ever sees the negotiated price. This protects margin from shoppers who would have paid full, while capturing the shoppers who otherwise would have walked out.",
      "The mechanism requires automation. Manual approval per offer doesn't scale and reintroduces the friction shoppers were trying to avoid. The retailer configures floors, ceilings, and counter-offer logic in advance; the engine applies them per offer in real time.",
    ],
    example: {
      context: "Electronics store, Yerevan",
      text: "A shopper scans a $480 wireless headphone and offers $410. The store's rule (floor $420, ceiling $470) auto-counters at $425. The shopper accepts and checks out.",
    },
    relatedTerms: ["walk-out", "counter-offer", "floor-price", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "walk-out",
    term: "Walk-out",
    shortDefinition:
      "A shopper who enters a retail store with purchase intent and leaves without buying.",
    body: [
      "A walk-out is the in-store equivalent of basket abandonment online. The shopper had purchase intent — they came in for something specific — but left empty-handed. The most common cause is a mismatch between the shelf price and what the shopper was willing to pay.",
      "Walk-outs are usually invisible. Unlike basket abandonment, where the cart data persists, walk-outs leave no trace in the POS. Retailers typically only become aware of them through conversion rates that decline over weeks.",
      "Bidygo treats walk-outs as recoverable. In categories with high consideration — electronics, fashion, footwear, home goods — roughly 8% of walk-outs convert when shoppers have a way to ask.",
    ],
    example: {
      context: "Footwear, Saturday afternoon",
      text: "A shopper tries on $130 sneakers and walks out. They would have paid $105. Without a way to express that, the sale is permanently lost — and probably to a competitor by Monday.",
    },
    relatedTerms: ["walk-out-rate", "recovered-sale", "shopper-led-pricing"],
    cluster: "shopper-behavior",
  },
  {
    slug: "walk-out-rate",
    term: "Walk-out rate",
    shortDefinition:
      "The percentage of in-store shoppers who leave without buying despite handling or considering a specific product.",
    body: [
      "Walk-out rate is conversion rate inverted. If 100 shoppers handle a product and 28 buy it, the walk-out rate is 72%. Most retailers don't measure this metric at all because they only see the 28 transactions in the POS — the other 72 are silent.",
      "Walk-out rates vary by category. In electronics, walk-out rates of 60–75% are common because shoppers research extensively before they enter. In grocery, 5–15% is typical because purchases are need-driven. Fashion and footwear sit in the middle.",
      "Reducing walk-out rate by even 2 percentage points typically generates more revenue than discounting strategies of equivalent margin cost — because it captures shoppers who never would have bought, not shoppers who would have paid more.",
    ],
    example: {
      context: "Mid-sized fashion store, 12-week measurement",
      text: "Foot traffic of 800/week, transactions of 230/week → walk-out rate of 71%. After Bidygo, recovered sales add 14/week → walk-out rate drops to 69.3%, +6% revenue.",
    },
    relatedTerms: ["walk-out", "recovered-sale", "shopper-led-pricing"],
    cluster: "metrics",
  },
  {
    slug: "counter-offer",
    term: "Counter-offer",
    shortDefinition:
      "A specific price proposed by the retailer's rule engine when the shopper's offer falls between the configured floor and ceiling.",
    body: [
      "A counter-offer is the middle outcome of Bidygo's three responses. If the offer is at or above the ceiling, it auto-accepts. If it's below the floor, it auto-declines. If it's between, the engine proposes a specific price — the counter.",
      "Counter-offer logic is configured in advance by the retailer. Common rules: counter at the midpoint between offer and ceiling, counter at a fixed margin above the floor, or counter at a category-specific percentage of the shelf price.",
      "Counter-offer acceptance rates by shoppers tend to run 40–60% across categories. Shoppers interpret a counter as the retailer engaging seriously, not as rejection.",
    ],
    example: {
      context: "Beauty store, Yerevan",
      text: "Shelf $80. Floor $65, ceiling $75. Shopper offers $60 → counter at $67. Shopper accepts.",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing", "accept-rate"],
    cluster: "pricing",
  },
  {
    slug: "floor-price",
    term: "Floor price",
    shortDefinition:
      "The lowest price at which a retailer will sell a specific item or category in Bidygo. Offers below the floor auto-decline.",
    body: [
      "The floor is the retailer's hard limit, set per SKU or per category in the dashboard. It accounts for cost, margin requirements, and any minimum sale price tied to brand agreements or supplier contracts.",
      "Floor prices are not the same as cost. A floor of $40 on a $25-cost item still preserves $15 of margin. Retailers typically set floors at the level below which they would rather hold inventory than sell.",
      "Floor prices can vary by time — different for end-of-season inventory, different for newer SKUs. The dashboard supports this without ever exposing the floor publicly, which is critical: a known floor becomes the new anchor.",
    ],
    example: {
      context: "Footwear, end of season",
      text: "$120 shoe with cost $55 has a regular floor of $89 (~25% margin). After 60 days unsold, the floor drops to $69. Bidygo recovers SKUs that would otherwise sit through next season's storage.",
    },
    relatedTerms: ["ceiling-price", "counter-offer", "shelf-price", "shopper-led-pricing"],
    cluster: "pricing",
  },
  {
    slug: "ceiling-price",
    term: "Ceiling price",
    shortDefinition:
      "The price at or above which a retailer auto-accepts shopper offers in Bidygo, without proposing a counter.",
    body: [
      "The ceiling is the level at which the retailer says: any offer this generous, take it. It's typically slightly below the shelf price — leaving a small gap that signals 'we honored your ask' without devaluing the listed price.",
      "Setting the ceiling too close to the shelf means almost every offer auto-accepts, defeating the purpose of having floors. Setting it too close to the floor means every offer triggers a counter and adds friction.",
      "Rule of thumb: ceiling = shelf − 5%. The shopper feels heard; the retailer keeps 95% of shelf-price revenue.",
    ],
    example: {
      context: "Electronics",
      text: "$500 headphone. Shelf $500, ceiling $475, floor $420. A shopper offering $478 auto-accepts; an offer of $450 gets a counter at $460; an offer of $410 auto-declines.",
    },
    relatedTerms: ["floor-price", "counter-offer", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "accept-rate",
    term: "Accept rate",
    shortDefinition:
      "The percentage of shopper offers that result in a completed sale — including direct accepts and accepted counter-offers.",
    body: [
      "Accept rate is Bidygo's headline conversion metric. It's calculated as (auto-accepts + counter-accepts) / total offers received. Reasonable accept rates run 35–55% across categories.",
      "Accept rate is a function of two retailer choices: how aggressive the floors are, and how generous the counter-offer logic is. Loose floors and generous counters drive accept rate up; tight floors and aggressive counters drive accept rate down.",
      "There is no single 'right' accept rate. A category with healthy margin can afford a higher accept rate; a thin-margin category should run a lower one. The dashboard surfaces accept rate trends so retailers can tune over time.",
    ],
    example: {
      context: "Fashion store, month 3",
      text: "847 offers received. 312 auto-accepted, 187 counter-accepted, 188 counter-declined-by-shopper, 160 below-floor declined. Accept rate = (312 + 187) / 847 = 58.9%.",
    },
    relatedTerms: ["counter-offer", "floor-price", "shopper-led-pricing", "recovered-sale"],
    cluster: "metrics",
  },
  {
    slug: "recovered-sale",
    term: "Recovered sale",
    shortDefinition:
      "A transaction that would otherwise have been a walk-out, completed because the shopper used Bidygo to negotiate.",
    body: [
      "A recovered sale is the unit of value Bidygo creates. It's defined narrowly: the shopper engaged the offer flow, an offer was accepted (directly or via counter), and the transaction closed at checkout.",
      "Recovered sales are not the same as discounted sales. They are sales that statistically would not have happened at the shelf price; the price reduction is what unlocks them. The accounting question is incremental revenue, not gross revenue.",
      "Bidygo's pricing — 5% of Bidygo-generated purchases — is anchored on this definition. A shopper who pays full price at checkout, even on the same day they used Bidygo for another item, is not counted as a recovered sale.",
    ],
    example: {
      context: "Beauty store, 30 days",
      text: "Walk-outs estimated at 380. Bidygo offers received: 124. Accepted: 71. Recovered revenue $2,982 at an average ticket of $42. Bidygo fee at 5%: $149.",
    },
    relatedTerms: ["walk-out", "walk-out-rate", "accept-rate"],
    cluster: "metrics",
  },
  {
    slug: "shelf-price",
    term: "Shelf price",
    shortDefinition:
      "The publicly displayed price on a product in a physical store. Bidygo never changes this.",
    body: [
      "The shelf price is the anchor. It's what every shopper sees, what builds the brand's price perception, and what the retailer reports to wholesalers and tax authorities. Changing it lightly devalues everything else the retailer does.",
      "Bidygo deliberately leaves the shelf price untouched. The negotiated price is private — visible only on the individual shopper's phone after they engage. This is the structural difference between Bidygo and any form of public discounting.",
      "Protecting the shelf price is what allows Bidygo to coexist with brand-relationship pricing rules (MSRP, manufacturer minimums) that would otherwise prohibit any discounting at all.",
    ],
    example: {
      context: "Electronics MSRP contract",
      text: "A supplier requires the retailer to honor a $349 MSRP. With Bidygo, the shelf reads $349 and an accepted offer at $329 is invisible to the supplier — it lives only between the retailer and the shopper. MSRP compliance is preserved.",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing"],
    cluster: "operations",
  },
  {
    slug: "dynamic-pricing",
    term: "Dynamic pricing",
    shortDefinition:
      "A model where the retailer changes listed prices over time based on demand, inventory, or competition. Distinct from shopper-led pricing.",
    body: [
      "Dynamic pricing is what airlines and ride-share apps do. The retailer (or algorithm) raises or lowers the listed price in response to signals: time of day, inventory level, competitor moves, demand curves. Every shopper sees the same price at a given moment.",
      "Shopper-led pricing is different. The shelf price stays fixed; the variation happens at the individual-shopper level, in private, triggered by the shopper, not the retailer. Dynamic pricing changes what everyone sees; shopper-led pricing creates an option for the individual who asks.",
      "The two can coexist. A retailer can run dynamic-pricing software on the shelf (re-pricing weekly) and Bidygo on top of it. They're not substitutes — they target different conversion problems.",
    ],
    example: {
      context: "Sporting goods",
      text: "Retailer A uses dynamic pricing to drop a tennis racquet from $189 to $169 because a competitor matched. Retailer B uses shopper-led pricing — keeps the $189 shelf, lets a shopper offer $172 and accept. Both compete on price; only A trains its shoppers to expect public price cuts.",
    },
    relatedTerms: ["shopper-led-pricing", "shelf-price"],
    cluster: "pricing",
  },
];

const glossaryRu: GlossaryTerm[] = [
  {
    slug: "shopper-led-pricing",
    term: "Цена, предложенная покупателем",
    shortDefinition:
      "Модель розничной торговли, в которой покупатель сам предлагает цену, а правила магазина автоматически принимают, отвечают встречной ценой или отклоняют предложение.",
    body: [
      "Это перевёрнутая розница. Не магазин ставит цену и ждёт, заплатит покупатель или уйдёт. Покупатель сам говорит, сколько готов заплатить — а правила магазина отвечают за секунды.",
      "Ценник на полке не меняется. Договорённую цену видит только тот покупатель, который сам её попросил. Это защищает маржу от тех, кто и так заплатил бы полную цену, и одновременно возвращает тех, кто иначе ушёл бы.",
      "Чтобы это работало в магазине, нужна автоматика. Если каждое предложение надо одобрять вручную, всё ломается — возвращается то самое трение, от которого покупатели и пытались уйти. Магазин задаёт нижний предел, верхний предел и логику встречных цен заранее, а движок применяет их к каждому предложению в реальном времени.",
    ],
    example: {
      context: "Магазин электроники, Ереван",
      text: "Покупатель сканирует беспроводные наушники за $480 и предлагает $410. Правило магазина (нижний $420, верхний $470) автоматически предлагает встречный $425. Покупатель соглашается и идёт к кассе.",
    },
    relatedTerms: ["walk-out", "counter-offer", "floor-price", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "walk-out",
    term: "Уход без покупки",
    shortDefinition:
      "Покупатель, который зашёл в магазин с намерением купить и ушёл без покупки.",
    body: [
      "Это то же самое, что брошенная корзина в интернет-магазине — только в офлайне. Человек пришёл за чем-то конкретным, держал товар в руках, но ушёл с пустыми руками. Чаще всего из-за того, что цена на полке не сошлась с тем, сколько он готов был отдать.",
      "Такие уходы обычно невидимы. В отличие от онлайна, где брошенная корзина остаётся в системе, в офлайне после ухода не остаётся ничего. Магазин узнаёт о них только когда конверсия начинает падать — а это уже недели потерь.",
      "Bidygo считает таких покупателей возвращаемыми. В категориях, где люди думают перед покупкой — электроника, одежда, обувь, дом — около 8% уходящих возвращаются, если у них есть способ озвучить свою цену.",
    ],
    example: {
      context: "Обувь, суббота днём",
      text: "Покупатель примерил кроссовки за $130 и ушёл. Он бы заплатил $105. Без способа это сказать продажа потеряна — и к понедельнику, скорее всего, уже у конкурента.",
    },
    relatedTerms: ["walk-out-rate", "recovered-sale", "shopper-led-pricing"],
    cluster: "shopper-behavior",
  },
  {
    slug: "walk-out-rate",
    term: "Доля ушедших без покупки",
    shortDefinition:
      "Процент посетителей магазина, которые ушли, не купив, хотя интересовались конкретным товаром.",
    body: [
      "Это конверсия наоборот. Если 100 покупателей взяли товар в руки, а купили 28 — доля ушедших 72%. Большинство магазинов не считают эту цифру вообще, потому что в кассе видны только 28 чеков, а остальные 72 просто молча уходят.",
      "Доля зависит от категории. В электронике обычно 60–75% — люди заранее долго выбирают и сравнивают. В продуктовом — 5–15%, там покупают по необходимости. Одежда и обувь — посередине.",
      "Снизить эту долю даже на пару процентов — это больше выручки, чем дать скидку на ту же маржу. Потому что это деньги от тех, кто иначе вообще бы не купил, а не от тех, кто и так заплатил бы дороже.",
    ],
    example: {
      context: "Средний магазин одежды, замер 12 недель",
      text: "Трафик 800 посетителей в неделю, чеков 230 → доля ушедших 71%. После Bidygo возвращается 14 продаж в неделю → доля падает до 69,3%, выручка +6%.",
    },
    relatedTerms: ["walk-out", "recovered-sale", "shopper-led-pricing"],
    cluster: "metrics",
  },
  {
    slug: "counter-offer",
    term: "Встречная цена",
    shortDefinition:
      "Конкретная цена, которую движок магазина предлагает в ответ, когда предложение покупателя попадает между нижним и верхним пределами.",
    body: [
      "Встречная цена — это средний из трёх возможных ответов Bidygo. Если предложение покупателя выше верхнего предела — автоматически принимается. Если ниже нижнего — отклоняется. Если между — движок предлагает свою цену.",
      "Логика встречной цены настраивается заранее. Обычные варианты: середина между предложением и верхним пределом, фиксированная маржа над нижним пределом, или процент от ценника по категории.",
      "Согласие покупателей на встречные цены обычно 40–60% по разным категориям. Покупатели воспринимают встречную цену как серьёзный ответ, а не как отказ.",
    ],
    example: {
      context: "Магазин косметики, Ереван",
      text: "Ценник $80. Нижний $65, верхний $75. Покупатель предлагает $60 → встречная цена $67. Покупатель соглашается.",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing", "accept-rate"],
    cluster: "pricing",
  },
  {
    slug: "floor-price",
    term: "Нижний предел",
    shortDefinition:
      "Минимальная цена, по которой магазин готов продать конкретный товар или категорию в Bidygo. Предложения ниже отклоняются автоматически.",
    body: [
      "Нижний предел — это жёсткая граница магазина. Задаётся на SKU или категорию в кабинете. Учитывает себестоимость, нужную маржу и обязательства перед поставщиками — например, минимальные цены, прописанные в договоре.",
      "Это не себестоимость. Нижний $40 на товаре с закупкой $25 всё равно оставляет $15 маржи. Магазины обычно ставят нижний на уровне, ниже которого им выгоднее держать товар на полке, чем продать.",
      "Нижний предел можно менять по времени — один для свежего товара, другой для сезонного остатка. Кабинет это поддерживает, и важно, что нижний никогда не виден публично: если про него узнают, он становится новым ценником.",
    ],
    example: {
      context: "Обувь, конец сезона",
      text: "Обувь $120, себестоимость $55. Обычный нижний $89 (маржа ~25%). После 60 дней без продажи нижний падает до $69. Bidygo возвращает товар, который иначе уйдёт на склад до следующего сезона.",
    },
    relatedTerms: ["ceiling-price", "counter-offer", "shelf-price", "shopper-led-pricing"],
    cluster: "pricing",
  },
  {
    slug: "ceiling-price",
    term: "Верхний предел",
    shortDefinition:
      "Цена, при которой и выше магазин автоматически принимает предложение покупателя в Bidygo — без встречной цены.",
    body: [
      "Верхний предел — это уровень, при котором магазин говорит: такое щедрое предложение бери. Обычно немного ниже ценника — небольшой зазор, который даёт покупателю почувствовать, что его услышали, не обесценивая полку.",
      "Если верхний слишком близко к ценнику — почти все предложения принимаются автоматически, и весь смысл нижнего предела пропадает. Если слишком близко к нижнему — каждое предложение идёт через встречную цену, и появляется лишнее трение.",
      "Простое правило: верхний = ценник минус 5%. Покупатель чувствует, что с ним поговорили; магазин держит 95% выручки от полки.",
    ],
    example: {
      context: "Электроника",
      text: "Наушники $500. Ценник $500, верхний $475, нижний $420. Предложение $478 — автоматически принято; $450 — встречная цена $460; $410 — отклонено.",
    },
    relatedTerms: ["floor-price", "counter-offer", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "accept-rate",
    term: "Доля принятых предложений",
    shortDefinition:
      "Процент предложений покупателей, которые превратились в покупку — с автоприёмом или после согласия со встречной ценой.",
    body: [
      "Это главная цифра конверсии в Bidygo. Считается как (автоприняли + согласились со встречной) / все полученные предложения. Нормальные значения 35–55% по разным категориям.",
      "Доля зависит от двух решений магазина: насколько жёсткие нижние пределы и насколько щедрая логика встречной цены. Мягкие нижние и щедрые встречные тянут долю вверх; жёсткие — вниз.",
      "Единой 'правильной' доли нет. Категория с хорошей маржой может позволить высокую долю, тонкая по марже — должна держать ниже. В кабинете видно, как доля меняется со временем — магазин подкручивает правила сам.",
    ],
    example: {
      context: "Магазин одежды, месяц 3",
      text: "Получено 847 предложений. 312 автоприняли, 187 согласились со встречной, 188 не согласились со встречной, 160 ниже нижнего. Доля = (312 + 187) / 847 = 58,9%.",
    },
    relatedTerms: ["counter-offer", "floor-price", "shopper-led-pricing", "recovered-sale"],
    cluster: "metrics",
  },
  {
    slug: "recovered-sale",
    term: "Возвращённая продажа",
    shortDefinition:
      "Продажа, которая иначе была бы уходом без покупки — закрылась, потому что покупатель воспользовался Bidygo.",
    body: [
      "Возвращённая продажа — это та единица ценности, которую создаёт Bidygo. Определение узкое: покупатель прошёл через предложение, цена была принята (напрямую или через встречную), сделка закрылась на кассе.",
      "Это не то же самое, что продажа со скидкой. Это продажи, которых статистически не было бы по цене на полке; сниженная цена — то, что их разблокировало. Бухгалтерский вопрос — добавочная выручка, а не общая.",
      "Тариф Bidygo — 5% от продаж, которые Bidygo привёл — построен на этом определении. Если покупатель оплатил полный ценник, даже в тот же день, когда он что-то другое посмотрел через Bidygo — это не возвращённая продажа.",
    ],
    example: {
      context: "Магазин косметики, 30 дней",
      text: "Ушло без покупки около 380 человек. Bidygo получил 124 предложения. Приняли 71. Возвращённая выручка $2 982 при среднем чеке $42. Комиссия Bidygo 5%: $149.",
    },
    relatedTerms: ["walk-out", "walk-out-rate", "accept-rate"],
    cluster: "metrics",
  },
  {
    slug: "shelf-price",
    term: "Цена на полке",
    shortDefinition:
      "Цена, которую видит каждый покупатель на ценнике в офлайн-магазине. Bidygo её не меняет.",
    body: [
      "Ценник — это якорь. Его видит каждый посетитель, он формирует восприятие бренда, по нему магазин отчитывается перед поставщиками и налоговой. Менять его легко — значит обесценивать всё остальное, что магазин делает.",
      "Bidygo принципиально не трогает ценник. Договорённая цена — частная: её видит только тот покупатель на своём телефоне. В этом структурное отличие Bidygo от любой публичной скидки.",
      "Сохранённый ценник — это то, что позволяет Bidygo работать там, где скидки запрещены договором: с производителями, которые требуют соблюдать MSRP или минимальные цены продажи.",
    ],
    example: {
      context: "Контракт с производителем электроники",
      text: "Поставщик требует держать $349 как MSRP. С Bidygo ценник $349, и принятая цена $329 не видна поставщику — она остаётся между магазином и покупателем. MSRP соблюдён.",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing"],
    cluster: "operations",
  },
  {
    slug: "dynamic-pricing",
    term: "Динамическое ценообразование",
    shortDefinition:
      "Модель, в которой магазин со временем меняет ценник в зависимости от спроса, остатков или конкурентов. Это не то же, что цена, предложенная покупателем.",
    body: [
      "Динамическое ценообразование — это как у авиакомпаний и такси. Магазин или алгоритм поднимает и опускает ценник в ответ на сигналы: время суток, остатки, движение конкурентов, кривые спроса. В каждый момент все покупатели видят одну и ту же цену.",
      "Цена, предложенная покупателем — это другое. Ценник на полке стоит на месте; вариация происходит на уровне отдельного покупателя, в приватном диалоге, по его инициативе, а не по инициативе магазина. Динамическое меняет, что видят все; Bidygo создаёт опцию для того, кто спросил.",
      "Эти подходы могут жить вместе. Магазин может крутить динамическое ценообразование на полке (раз в неделю) и поверх держать Bidygo. Они не заменяют друг друга — они решают разные задачи по конверсии.",
    ],
    example: {
      context: "Спортивные товары",
      text: "Магазин А снижает ракетку для тенниса со $189 до $169, потому что конкурент опустил цену. Магазин Б оставляет $189 на ценнике и даёт покупателю предложить $172. Оба конкурируют по цене — но только А приучает покупателей ждать публичных снижений.",
    },
    relatedTerms: ["shopper-led-pricing", "shelf-price"],
    cluster: "pricing",
  },
];

const glossaryAm: GlossaryTerm[] = [
  {
    slug: "shopper-led-pricing",
    term: "Գնորդի առաջարկած գին",
    shortDefinition:
      "Մանրածախ վաճառքի մոդել, որտեղ գնորդն ինքն է առաջարկում գինը, իսկ խանութի կանոնները ինքնաբերաբար ընդունում, հակառակ գին են առաջարկում կամ մերժում։",
    body: [
      "Սա շրջված մանրածախ առևտուր է։ Խանութը չի սահմանում գինը ու չի սպասում՝ կվճարի՞ գնորդը, թե կհեռանա։ Գնորդն ինքն է ասում, թե ինչքան է պատրաստ վճարել, իսկ խանութի կանոններն ընդամենը մի քանի վայրկյանում պատասխանում են։",
      "Դարակի գինը չի փոխվում։ Համաձայնեցված գինը տեսնում է միայն այն գնորդը, ով հենց ինքն է հարցրել։ Սա պաշտպանում է մարժան նրանցից, ովքեր ամեն դեպքում կվճարեին լրիվ գինը, և միաժամանակ վերադարձնում է նրանց, ովքեր այլապես պարզապես կհեռանային։",
      "Որպեսզի սա աշխատի խանութում, ավտոմատացում է պետք։ Եթե ամեն առաջարկ պետք է ձեռքով հաստատել, ամեն ինչ կորչում է՝ վերադառնում է հենց այն շփումը, որից գնորդը փորձում էր խուսափել։ Խանութը նախապես սահմանում է ստորին սահման, վերին սահման և հակառակ գնի տրամաբանություն, իսկ համակարգը կիրառում է դրանք իրական ժամանակում։",
    ],
    example: {
      context: "Էլեկտրոնիկայի խանութ, Երևան",
      text: "Գնորդը սկանավորում է $480 անլար ականջակալներ ու առաջարկում $410։ Խանութի կանոնը (ստորին՝ $420, վերին՝ $470) ինքնաբերաբար հակառակ գին է առաջարկում՝ $425։ Գնորդը համաձայնում է և դուրս է գալիս դրամարկղով։",
    },
    relatedTerms: ["walk-out", "counter-offer", "floor-price", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "walk-out",
    term: "Առանց գնման դուրս գալ",
    shortDefinition:
      "Գնորդ, որը մտավ խանութ որոշակի ապրանք գնելու մտադրությամբ ու դուրս եկավ առանց գնման։",
    body: [
      "Սա օֆլայնում նույնն է, ինչ թողած զամբյուղն օնլայնում։ Մարդը եկել էր կոնկրետ բանի համար, ձեռքով տեսել էր ապրանքը, բայց դուրս է գալիս դատարկաձեռն։ Ամենահաճախ պատճառն այն է, որ դարակի գինը չի համապատասխանում նրան, թե ինչքան էր պատրաստ վճարել։",
      "Այս հեռացումները սովորաբար անտեսանելի են։ Ի տարբերություն օնլայնի, որտեղ թողած զամբյուղը մնում է համակարգում, օֆլայնում հետքեր չեն մնում։ Խանութը նրանց մասին իմանում է միայն, երբ կոնվերսիան սկսում է իջնել՝ իսկ դա արդեն շաբաթներ կորած եկամուտ է։",
      "Bidygo-ն այս գնորդներին համարում է վերադարձելի։ Այն կատեգորիաներում, որտեղ մարդիկ մտածում են գնելուց առաջ՝ էլեկտրոնիկա, հագուստ, կոշիկ, տան իրեր՝ մոտ 8%-ը վերադառնում է, եթե նրանք ունենան գին առաջարկելու հնարավորություն։",
    ],
    example: {
      context: "Կոշիկ, շաբաթ կեսօր",
      text: "Գնորդը փորձում է $130-անոց սպորտային կոշիկ ու դուրս է գալիս։ Կվճարեր $105։ Առանց դա ասելու հնարավորության՝ վաճառքը կորած է, և երկուշաբթիով արդեն, ամենայն հավանականությամբ, մրցակցի մոտ։",
    },
    relatedTerms: ["walk-out-rate", "recovered-sale", "shopper-led-pricing"],
    cluster: "shopper-behavior",
  },
  {
    slug: "walk-out-rate",
    term: "Առանց գնման հեռանալու տոկոս",
    shortDefinition:
      "Խանութ մտած գնորդների տոկոսը, ովքեր դուրս են գալիս առանց որևէ բան գնելու, թեև հետաքրքրվել են կոնկրետ ապրանքով։",
    body: [
      "Սա հակառակ կոնվերսիան է։ Եթե 100 գնորդ ապրանք է վերցրել ձեռքն ու 28-ը գնել՝ հեռանալու տոկոսը 72% է։ Խանութների մեծ մասը այս թիվն ընդհանրապես չի հաշվում, որովհետև դրամարկղում երևում են միայն 28 գործարք, իսկ մյուս 72-ը պարզապես լուռ հեռանում են։",
      "Տոկոսը կախված է կատեգորիայից։ Էլեկտրոնիկայում սովորաբար 60–75%՝ մարդիկ առաջ երկար ընտրում ու համեմատում են։ Մթերային խանութում 5–15%՝ այնտեղ կարիքով են գնում։ Հագուստն ու կոշիկը՝ մեջտեղում։",
      "Այս տոկոսը նվազեցնելը նույնիսկ 2-ով սովորաբար ավելի շատ եկամուտ է բերում, քան համարժեք մարժով զեղչը։ Որովհետև դա այն մարդկանց գումարն է, ովքեր ընդհանրապես չէին գնի, ոչ թե նրանց, ովքեր ամեն դեպքում կվճարեին ավելի թանկ։",
    ],
    example: {
      context: "Միջին հագուստի խանութ, 12-շաբաթյա չափում",
      text: "Շաբաթական տրաֆիկ՝ 800, գործարքներ՝ 230 → հեռանալու տոկոս 71%։ Bidygo-ից հետո վերադառնում է շաբաթական 14 վաճառք → տոկոսը 69,3%, եկամուտը +6%։",
    },
    relatedTerms: ["walk-out", "recovered-sale", "shopper-led-pricing"],
    cluster: "metrics",
  },
  {
    slug: "counter-offer",
    term: "Հակառակ առաջարկ",
    shortDefinition:
      "Կոնկրետ գին, որ խանութի կանոնների շարժիչը պատասխանում է, երբ գնորդի առաջարկը ընկնում է ստորին ու վերին սահմանի միջև։",
    body: [
      "Հակառակ առաջարկը Bidygo-ի երեք պատասխանների միջինն է։ Եթե առաջարկը վերին սահմանից բարձր կամ հավասար է՝ ինքնաբերաբար ընդունվում է։ Եթե ստորին սահմանից ցածր է՝ մերժվում է։ Եթե միջև է՝ շարժիչն առաջարկում է իր գինը։",
      "Հակառակ գնի տրամաբանությունը նախապես կարգավորում է խանութը։ Հաճախ՝ առաջարկի ու վերին սահմանի կեսը, կամ ֆիքսված մարժա ստորին սահմանից վերև, կամ դարակի գնի որոշակի տոկոսը՝ ըստ կատեգորիայի։",
      "Գնորդների համաձայնությունը հակառակ առաջարկներին սովորաբար 40–60% է կատեգորիայից կախված։ Գնորդները դա ընկալում են որպես լուրջ պատասխան, ոչ թե մերժում։",
    ],
    example: {
      context: "Գեղեցկության խանութ, Երևան",
      text: "Դարակի գին՝ $80։ Ստորին՝ $65, վերին՝ $75։ Գնորդն առաջարկում է $60 → հակառակ առաջարկ՝ $67։ Գնորդը համաձայնում է։",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing", "accept-rate"],
    cluster: "pricing",
  },
  {
    slug: "floor-price",
    term: "Ստորին սահման",
    shortDefinition:
      "Նվազագույն գին, որով խանութը պատրաստ է վաճառել կոնկրետ ապրանք կամ կատեգորիա Bidygo-ում։ Ավելի ցածր առաջարկներն ինքնաբերաբար մերժվում են։",
    body: [
      "Ստորին սահմանը խանութի ամուր սահմանն է։ Սահմանվում է կոնկրետ ապրանքի կամ կատեգորիայի համար անձնական կաբինետում։ Հաշվի է առնում ինքնարժեքը, անհրաժեշտ մարժան և մատակարարների հետ պայմանավորվածությունները՝ օրինակ պայմանագրով նշված նվազագույն վաճառքի գին։",
      "Սա ինքնարժեքը չէ։ $40 ստորին սահման $25 ինքնարժեքով ապրանքի վրա դեռ թողնում է $15 մարժա։ Խանութները սովորաբար ստորինը դնում են այնտեղ, որից ցածր նրանց համար ավելի շահավետ է ապրանքը պահել պահեստում։",
      "Ստորին սահմանը կարող է փոխվել ժամանակի հետ՝ թարմ ապրանքի համար մի թիվ, սեզոնի մնացորդի համար՝ ուրիշ։ Կաբինետը դա թույլ է տալիս, և կարևորն այն է, որ ստորին սահմանը երբեք հրապարակային չէ՝ եթե այն հայտնի դառնա, դառնում է նոր ցուցադրվող գին։",
    ],
    example: {
      context: "Կոշիկ, սեզոնի վերջ",
      text: "$120-ի կոշիկ, ինքնարժեքը $55։ Սովորական ստորին՝ $89 (մարժա ~25%)։ 60 օր չվաճառվելուց հետո ստորին սահմանը իջնում է $69։ Bidygo-ն վերադարձնում է այն ապրանքը, որ այլապես կնստեր մինչև հաջորդ սեզոն։",
    },
    relatedTerms: ["ceiling-price", "counter-offer", "shelf-price", "shopper-led-pricing"],
    cluster: "pricing",
  },
  {
    slug: "ceiling-price",
    term: "Վերին սահման",
    shortDefinition:
      "Այն գինը, որից վերև խանութն ինքնաբերաբար ընդունում է գնորդի առաջարկը Bidygo-ում՝ առանց հակառակ առաջարկ անելու։",
    body: [
      "Վերին սահմանն այն մակարդակն է, որի դեպքում խանութն ասում է՝ սա այնքան լավ առաջարկ է, որ ընդունում եմ։ Սովորաբար փոքր-ինչ ցածր է ցուցադրվող գնից՝ մի փոքր բացատ, որը գնորդին զգացնում է, որ լսել են, բայց ցուցադրվող գինը չի արժեզրկվում։",
      "Եթե վերին սահմանը շատ մոտ է ցուցադրվող գնին՝ գրեթե բոլոր առաջարկները ինքնաբերաբար ընդունվում են, ու ստորին սահմանի ողջ իմաստը կորչում է։ Եթե շատ մոտ է ստորին սահմանին՝ բոլոր առաջարկներն անցնում են հակառակ առաջարկի միջով, ավելորդ շփում է առաջանում։",
      "Պարզ կանոն՝ վերին = ցուցադրվող գին − 5%։ Գնորդը զգում է, որ իր հետ խոսել են; խանութը պահում է ցուցադրվող գնի 95%-ը։",
    ],
    example: {
      context: "Էլեկտրոնիկա",
      text: "Ականջակալ՝ $500։ Ցուցադրվող գին՝ $500, վերին՝ $475, ստորին՝ $420։ $478 առաջարկ՝ ինքնաբերաբար ընդունվում է; $450՝ հակառակ առաջարկ՝ $460; $410՝ մերժվում է։",
    },
    relatedTerms: ["floor-price", "counter-offer", "shelf-price"],
    cluster: "pricing",
  },
  {
    slug: "accept-rate",
    term: "Ընդունված առաջարկների տոկոս",
    shortDefinition:
      "Գնորդների առաջարկների տոկոսը, որոնք վերածվել են վաճառքի՝ ինքնաբերաբար ընդունված կամ հակառակ առաջարկ ընդունելուց հետո։",
    body: [
      "Սա Bidygo-ի կոնվերսիայի գլխավոր թիվն է։ Հաշվարկվում է որպես (ինքնաբերաբար ընդունված + հակառակ առաջարկից հետո ընդունված) / ստացված բոլոր առաջարկներ։ Նորմալ արժեքները 35–55% են ըստ կատեգորիայի։",
      "Տոկոսը կախված է խանութի երկու որոշումից՝ որքան խիստ են ստորին սահմանները, և որքան առատաձեռն է հակառակ առաջարկի տրամաբանությունը։ Փափուկ ստորին սահմաններ ու առատաձեռն հակառակ առաջարկներ՝ տոկոսը բարձր; խիստ ստորին սահմաններ ու ագրեսիվ հակառակ՝ ցածր։",
      "Մեկ ճիշտ տոկոս չկա։ Լավ մարժա ունեցող կատեգորիան կարող է թույլ տալ բարձր տոկոս; բարակ մարժա ունեցողը պետք է ցածր պահի։ Կաբինետում երևում է, թե ինչպես է տոկոսը փոխվում ժամանակի հետ՝ խանութն ինքը կարգավորում է կանոնները։",
    ],
    example: {
      context: "Հագուստի խանութ, 3-րդ ամիս",
      text: "Ստացված է 847 առաջարկ։ 312-ը՝ ինքնաբերաբար ընդունված, 187-ը՝ համաձայնել են հակառակ առաջարկին, 188-ը՝ չեն համաձայնել, 160-ը՝ ստորին սահմանից ցածր։ Տոկոս = (312 + 187) / 847 = 58,9%։",
    },
    relatedTerms: ["counter-offer", "floor-price", "shopper-led-pricing", "recovered-sale"],
    cluster: "metrics",
  },
  {
    slug: "recovered-sale",
    term: "Վերադարձված վաճառք",
    shortDefinition:
      "Վաճառք, որն այլապես կլիներ առանց գնման հեռացում, փակվել է, որովհետև գնորդն օգտվել է Bidygo-ից։",
    body: [
      "Վերադարձված վաճառքն այն արժեքի միավորն է, որ Bidygo-ն ստեղծում է։ Սահմանումը նեղ է՝ գնորդն անցել է առաջարկի հոսքով, գինը ընդունված է (ուղիղ կամ հակառակ առաջարկի միջոցով), գործարքը փակված է դրամարկղում։",
      "Սա նույնը չէ, ինչ զեղչով վաճառքը։ Սրանք վաճառքներ են, որոնք վիճակագրորեն չէին լինի դարակի գնով; իջեցված գինը հենց այն բանալին է, որը դրանք բացում է։ Հաշվապահական հարցն ավելացված եկամուտի մասին է, ոչ թե ընդհանուր եկամուտի։",
      "Bidygo-ի սակագինը՝ Bidygo-ով բերված վաճառքների 5%-ը, հենց այս սահմանման վրա է կառուցված։ Եթե գնորդը վճարել է լրիվ գին, նույնիսկ նույն օրը, երբ Bidygo-ով դիտել է ուրիշ ապրանք՝ դա վերադարձված վաճառք չի համարվում։",
    ],
    example: {
      context: "Գեղեցկության խանութ, 30 օր",
      text: "Մոտ 380 մարդ հեռացել է առանց գնման։ Bidygo-ն ստացել է 124 առաջարկ։ Ընդունված է 71։ Վերադարձված եկամուտ՝ $2 982, միջին չեկը՝ $42։ Bidygo-ի միջնորդավճար 5%՝ $149։",
    },
    relatedTerms: ["walk-out", "walk-out-rate", "accept-rate"],
    cluster: "metrics",
  },
  {
    slug: "shelf-price",
    term: "Դարակի գին",
    shortDefinition:
      "Գին, որ տեսնում է յուրաքանչյուր գնորդ ֆիզիկական խանութի ապրանքանիշի վրա։ Bidygo-ն այն չի փոխում։",
    body: [
      "Դարակի գինը խարիսխն է։ Այն տեսնում է ամեն այցելու, այն ձևավորում է բրենդի գնի ընկալումը, դրա հիման վրա է խանութը հաշվետու մատակարարների և հարկայինի առջև։ Հեշտությամբ փոխելը նշանակում է արժեզրկել մնացած ամեն ինչը, ինչ խանութն անում է։",
      "Bidygo-ն սկզբունքորեն չի դիպչում դարակի գնին։ Համաձայնեցված գինը մասնավոր է՝ տեսնում է միայն այն գնորդն իր հեռախոսի վրա, ով ինքն է հարցրել։ Այս կառուցվածքային տարբերությունն է Bidygo-ին տարբերում ցանկացած տիպի հրապարակային զեղչից։",
      "Պահված դարակի գինը հենց այն է, ինչ Bidygo-ին թույլ է տալիս աշխատել այնտեղ, որտեղ զեղչերն արգելված են պայմանագրով՝ մատակարարների հետ, ովքեր պահանջում են պահպանել MSRP կամ նվազագույն վաճառքի գին։",
    ],
    example: {
      context: "Էլեկտրոնիկայի մատակարարի պայմանագիր",
      text: "Մատակարարը պահանջում է պահել $349 որպես MSRP։ Bidygo-ով դարակի գինը՝ $349, իսկ ընդունված $329 գինը մատակարարին չի երևում՝ այն մնում է խանութի ու գնորդի միջև։ MSRP-ն պահպանված է։",
    },
    relatedTerms: ["floor-price", "ceiling-price", "shopper-led-pricing"],
    cluster: "operations",
  },
  {
    slug: "dynamic-pricing",
    term: "Դինամիկ գնագոյացում",
    shortDefinition:
      "Մոդել, որի դեպքում խանութը ժամանակի ընթացքում փոխում է ցուցադրվող գինը՝ կախված պահանջարկից, պաշարից կամ մրցակցությունից։ Սա չէ նույնը, ինչ գնորդի առաջարկած գինը։",
    body: [
      "Դինամիկ գնագոյացումն այն է, ինչ անում են ավիաընկերությունները և տաքսի հավելվածները։ Խանութը կամ ալգորիթմը բարձրացնում ու իջեցնում է ցուցադրվող գինը՝ ի պատասխան ազդանշանների՝ օրվա ժամ, պաշար, մրցակիցների շարժ, պահանջարկի կորեր։ Տվյալ պահին բոլոր գնորդները տեսնում են նույն գինը։",
      "Գնորդի առաջարկած գինն ուրիշ է։ Դարակի գինը մնում է իր տեղում; տատանումը տեղի է ունենում առանձին գնորդի մակարդակում, մասնավոր երկխոսության մեջ, գնորդի նախաձեռնությամբ, ոչ թե խանութի։ Դինամիկը փոխում է, թե ինչ են տեսնում բոլորը; Bidygo-ն ստեղծում է ընտրություն նրա համար, ով հարցրեց։",
      "Այս երկու մոտեցումները կարող են համատեղ ապրել։ Խանութը կարող է վարել դինամիկ գնագոյացում դարակի վրա (շաբաթական մեկ վերագնահատում) և վերևից դնել Bidygo-ն։ Դրանք չեն փոխարինում միմյանց՝ տարբեր կոնվերսիոն խնդիրներ են լուծում։",
    ],
    example: {
      context: "Սպորտային ապրանքներ",
      text: "Խանութ Ա-ն իջեցնում է թենիսի ռակետկան $189-ից $169՝ որովհետև մրցակիցն այդպես է արել։ Խանութ Բ-ն պահում է $189 ցուցադրվող գինը և թույլ է տալիս գնորդին առաջարկել $172, ընդունել։ Երկուսն էլ մրցում են գնով — բայց միայն Ա-ն իր գնորդներին սովորեցնում է սպասել հրապարակային գնի իջեցումների։",
    },
    relatedTerms: ["shopper-led-pricing", "shelf-price"],
    cluster: "pricing",
  },
];

const byLocale: Record<Locale, GlossaryTerm[]> = {
  en: glossaryEn,
  ru: glossaryRu,
  am: glossaryAm,
};

export function getGlossaryTerms(locale: string): GlossaryTerm[] {
  return byLocale[locale as Locale] ?? glossaryEn;
}

export function getGlossaryTerm(slug: string, locale: string): GlossaryTerm | null {
  return getGlossaryTerms(locale).find((t) => t.slug === slug) ?? null;
}

export function getAllGlossaryTermSlugs(): string[] {
  return glossaryEn.map((t) => t.slug);
}
