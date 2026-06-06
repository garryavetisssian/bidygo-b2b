import type { Locale } from "@/i18n/routing";

export interface ComparisonPoint {
  title: string;
  body: string;
}

export interface ComparisonRow {
  dimension: string;
  bidygo: string;
  other: string;
  bidygoWins: boolean;
}

export interface Comparison {
  slug: string;
  title: string;
  description: string;
  ourName: string;
  otherName: string;
  hero: { eyebrow: string; headline: string; subhead: string };
  intro: string[];
  ourSide: { tagline: string; points: ComparisonPoint[] };
  otherSide: { tagline: string; points: ComparisonPoint[] };
  rows: ComparisonRow[];
  verdict: { headline: string; body: string[] };
  faqs: Array<{ q: string; a: string }>;
  related: string[];
}

const comparisonsEn: Comparison[] = [
  {
    slug: "bidygo-vs-discounting",
    title: "Bidygo vs discounting: two ways to recover walk-outs, compared honestly",
    description:
      "Storewide sales and BOGO recover lost shoppers but train them to wait for the next sale. Bidygo's shopper-led pricing recovers the same shoppers without changing the shelf. Here's the structural comparison.",
    ourName: "Bidygo (shopper-led pricing)",
    otherName: "Traditional discounting",
    hero: {
      eyebrow: "How we compare",
      headline: "Bidygo vs. traditional discounting",
      subhead:
        "Both recover the shopper who would have walked out. They differ in who pays for the recovery — and what that means six months later.",
    },
    intro: [
      "Every retailer eventually faces the same question: a shopper hesitates at the shelf, considers, and leaves. How do you bring them back? For decades the answer has been the same — lower the price publicly. Storewide sales, BOGO promotions, coupons, end-of-season clearance. They work. They also have costs the average operator has stopped seeing because they're so ingrained.",
      "Shopper-led pricing is a different answer to the same question. The shelf price doesn't move. The shopper who would have walked out is given a private way to ask for a price that works for them. The rules of the store decide automatically. This page compares the two head-to-head, on the dimensions that actually matter to a retailer trying to grow.",
    ],
    ourSide: {
      tagline: "Private, shopper-initiated, automated.",
      points: [
        {
          title: "Shelf price never changes",
          body: "The displayed price stays. Only the individual shopper who asked sees the negotiated price. Brand perception and supplier agreements stay intact.",
        },
        {
          title: "Only the asking shopper gets the discount",
          body: "Shoppers who would have paid full continue to pay full. You never give away margin to someone who didn't need it to convert.",
        },
        {
          title: "Automated, not manual",
          body: "Floors, ceilings, and counter logic are configured once. The engine handles every offer. Staff don't negotiate at the shelf or the counter.",
        },
        {
          title: "Behaviorally neutral over time",
          body: "Shoppers who don't engage Bidygo never learn there's a discount layer. The next-purchase expectation is unchanged.",
        },
      ],
    },
    otherSide: {
      tagline: "Public, retailer-initiated, broad.",
      points: [
        {
          title: "Shelf price moves publicly",
          body: "Everyone sees the new price. The discount is the new anchor for the duration of the sale — and often beyond, because shoppers remember.",
        },
        {
          title: "Everyone in the door gets the discount",
          body: "Including the shoppers who would have paid full. The cost of recovering one walk-out is the margin you gave away to the dozens who didn't need a discount.",
        },
        {
          title: "Operational overhead",
          body: "Signage, staff training, register reprogramming, manager approvals for edge cases. Cost compounds with sale frequency.",
        },
        {
          title: "Trains future behavior",
          body: "Repeated discounting trains shoppers to delay purchase, anticipate the next sale, or shop competitors during off-sale weeks. The discount becomes a tax.",
        },
      ],
    },
    rows: [
      { dimension: "Shelf price changes", bidygo: "No", other: "Yes — publicly", bidygoWins: true },
      { dimension: "Who gets the lower price", bidygo: "Only the shopper who asked", other: "Everyone in the store", bidygoWins: true },
      { dimension: "Typical margin given away", bidygo: "~5–8%", other: "10–25%", bidygoWins: true },
      { dimension: "Effect on brand price perception", bidygo: "Neutral", other: "Erodes", bidygoWins: true },
      { dimension: "Compatible with MSRP contracts", bidygo: "Yes (negotiation is private)", other: "Usually no", bidygoWins: true },
      { dimension: "Staff time required", bidygo: "Zero per transaction", other: "Signage, training, override approvals", bidygoWins: true },
      { dimension: "Measurability of recovered sales", bidygo: "Per-offer, per-SKU", other: "Hard to attribute precisely", bidygoWins: true },
      { dimension: "Effect on future shopper behavior", bidygo: "Unchanged", other: "Trains shoppers to wait", bidygoWins: true },
      { dimension: "Good for end-of-life clearance", bidygo: "Works, but slower than markdown", other: "Strong, predictable", bidygoWins: false },
      { dimension: "Good for one-time brand moments (holidays, openings)", bidygo: "Neutral", other: "Strong — drives traffic", bidygoWins: false },
    ],
    verdict: {
      headline: "Bidygo wins for daily operations. Discounting wins for one-time events. They coexist.",
      body: [
        "If you run a sale every weekend, the eight rows where Bidygo wins compound into a structural margin advantage over twelve months. Bidygo is the right default for everyday conversion-recovery work in high-consideration categories.",
        "If you need to move dead inventory in two weeks, or you're running a holiday-weekend traffic push, discounting still wins. The mechanisms are complementary, not competitive. The mistake is treating discounting as the only tool — which is the position most retailers are in by default.",
      ],
    },
    faqs: [
      { q: "Can we run both?", a: "Yes — they're not mutually exclusive. Most Bidygo retailers still run one or two seasonal sales per year. Bidygo handles the day-to-day; sales handle the events." },
      { q: "Won't shopper-led pricing eventually train shoppers to always ask?", a: "Some will. But the floor and ceiling rules cap your exposure. Average accepted price runs ~92% of shelf even with frequent askers, vs. 75–90% of shelf during a typical sale. The economics still favor Bidygo." },
      { q: "What about loyalty programs?", a: "Loyalty is a different lever — it rewards repeat behavior, not first-purchase conversion. Loyalty and Bidygo are complementary; Bidygo addresses the moment of in-store hesitation, loyalty addresses the months that follow." },
      { q: "What about cashier-discretion discounts?", a: "Manager-override discounting at the counter has the worst of both worlds: it scales with labor, varies by staff, and trains shoppers to ask the loudest. Bidygo applies one set of rules uniformly without staff time." },
      { q: "Is shopper-led pricing legal under retail price-maintenance rules?", a: "In most jurisdictions, retail price-maintenance regulations apply to publicly listed prices and inter-retailer pricing. Bidygo's negotiated prices are private and per-shopper, which generally puts them outside RPM scope. Always confirm with your specific market's regulator." },
    ],
    related: ["shopper-led-pricing", "why-discounts-hurt-margin"],
  },
];

const comparisonsRu: Comparison[] = [
  {
    slug: "bidygo-vs-discounting",
    title: "Bidygo против скидок: два способа вернуть ушедшего покупателя, честно сравнили",
    description:
      "Распродажи и BOGO возвращают потерянных покупателей, но приучают их ждать следующей скидки. Цена, предложенная покупателем — возвращает тех же людей без изменения ценника. Прямое сравнение.",
    ourName: "Bidygo (цена, предложенная покупателем)",
    otherName: "Традиционные скидки",
    hero: {
      eyebrow: "Сравнение",
      headline: "Bidygo против традиционных скидок",
      subhead:
        "Оба возвращают покупателя, который иначе бы ушёл. Разница — в том, кто платит за это возвращение, и что это значит через полгода.",
    },
    intro: [
      "У каждого магазина в какой-то момент возникает один и тот же вопрос: покупатель колеблется у ценника, думает и уходит. Как его вернуть? Десятилетиями ответ был один — публично снизить цену. Распродажи на весь магазин, BOGO, купоны, конец сезона. Это работает. У этого есть и свои издержки, которые средний оператор перестал замечать — слишком привычно.",
      "Цена, предложенная покупателем — другой ответ на тот же вопрос. Ценник не двигается. Покупателю, который иначе бы ушёл, даётся приватный способ предложить цену, которая ему подходит. Правила магазина решают автоматически. Эта страница сравнивает два подхода напрямую по тем измерениям, которые реально важны магазину, который хочет расти.",
    ],
    ourSide: {
      tagline: "Приватно, по инициативе покупателя, автоматически.",
      points: [
        {
          title: "Ценник не меняется",
          body: "Цена на полке остаётся. Договорённую цену видит только тот, кто сам её попросил. Восприятие бренда и соглашения с поставщиками не страдают.",
        },
        {
          title: "Скидку получает только тот, кто спросил",
          body: "Покупатели, которые и так заплатили бы полную цену, продолжают платить полную. Маржа не отдаётся тому, кому не нужна была для конверсии.",
        },
        {
          title: "Автоматика, не ручной труд",
          body: "Нижний предел, верхний предел и логика встречной цены настраиваются один раз. Движок обрабатывает каждое предложение. Персонал не торгуется на кассе или у полки.",
        },
        {
          title: "Поведение покупателей не меняется во времени",
          body: "Те, кто не пользуется Bidygo, вообще не узнают, что есть слой скидок. Ожидания на следующую покупку остаются прежними.",
        },
      ],
    },
    otherSide: {
      tagline: "Публично, по инициативе магазина, на всех.",
      points: [
        {
          title: "Цена на полке двигается публично",
          body: "Видят все. На время акции скидка становится новой нормой — и часто после неё тоже, потому что покупатели запоминают.",
        },
        {
          title: "Скидку получает каждый, кто зашёл",
          body: "В том числе и те, кто заплатил бы полную. Цена возврата одного ушедшего — это маржа, отданная десяткам, которым скидка вообще не нужна.",
        },
        {
          title: "Операционные издержки",
          body: "Ценники, обучение персонала, перепрошивка кассы, согласование скидок на нестандартные случаи. С частотой акций затраты растут.",
        },
        {
          title: "Формирует будущее поведение",
          body: "Регулярные скидки приучают покупателей откладывать покупку, ждать следующую акцию, ходить к конкурентам в недели без скидок. Скидка становится налогом.",
        },
      ],
    },
    rows: [
      { dimension: "Меняется ли ценник", bidygo: "Нет", other: "Да — публично", bidygoWins: true },
      { dimension: "Кто получает сниженную цену", bidygo: "Только тот, кто спросил", other: "Все в магазине", bidygoWins: true },
      { dimension: "Типичная отдача маржи", bidygo: "~5–8%", other: "10–25%", bidygoWins: true },
      { dimension: "Влияние на восприятие цены бренда", bidygo: "Нет", other: "Эрозия", bidygoWins: true },
      { dimension: "Совместимо с соглашениями MSRP", bidygo: "Да (договор приватный)", other: "Обычно нет", bidygoWins: true },
      { dimension: "Время персонала", bidygo: "Ноль на сделку", other: "Ценники, обучение, одобрение", bidygoWins: true },
      { dimension: "Точность учёта возвращённых продаж", bidygo: "По каждому предложению и SKU", other: "Сложно атрибутировать", bidygoWins: true },
      { dimension: "Влияние на будущее поведение покупателей", bidygo: "Нет", other: "Учит ждать", bidygoWins: true },
      { dimension: "Хорошо для распродажи остатков", bidygo: "Работает, но медленнее", other: "Сильно, предсказуемо", bidygoWins: false },
      { dimension: "Хорошо для разовых событий (праздники, открытие)", bidygo: "Нейтрально", other: "Сильно — гонит трафик", bidygoWins: false },
    ],
    verdict: {
      headline: "Bidygo выигрывает в каждодневных операциях. Скидки — на разовых событиях. Они уживаются.",
      body: [
        "Если у вас распродажа каждые выходные, восемь строк, где Bidygo выигрывает, за год складываются в структурное преимущество по марже. Bidygo — правильный дефолт для повседневной работы по возврату конверсии в категориях с высоким раздумьем.",
        "Если нужно вывести залежавшийся товар за две недели или гнать трафик в праздничный уикенд — скидки по-прежнему выигрывают. Механики дополняют, а не заменяют друг друга. Ошибка — считать скидки единственным инструментом. А именно в этой ошибке большинство магазинов и находится по дефолту.",
      ],
    },
    faqs: [
      { q: "Можно ли использовать оба?", a: "Да — они не взаимоисключающие. Большинство магазинов с Bidygo продолжают делать одну-две сезонные распродажи в год. Bidygo берёт ежедневную работу; распродажи — события." },
      { q: "Не научатся ли покупатели всегда торговаться?", a: "Некоторые научатся. Но нижний и верхний пределы ограничивают потери. Средняя принятая цена — около 92% от ценника даже при частых обращениях, против 75–90% во время обычной распродажи. Экономика всё равно за Bidygo." },
      { q: "А программы лояльности?", a: "Лояльность — другой рычаг: она вознаграждает повторное поведение, а не первую конверсию. Лояльность и Bidygo дополняют: Bidygo работает в момент колебания в магазине, лояльность — в следующие месяцы." },
      { q: "А скидка на усмотрение продавца на кассе?", a: "Скидка по решению менеджера — худшее из обоих миров: масштабируется только людьми, разная у разных продавцов, приучает торговаться громче. Bidygo применяет одни правила одинаково ко всем без времени персонала." },
      { q: "Законно ли это при регулировании розничных цен?", a: "В большинстве юрисдикций регулирование розничных цен относится к публично заявленным ценам и ценообразованию между магазинами. Договорные цены Bidygo приватные и индивидуальные — обычно вне сферы RPM. Подтверждайте с регулятором вашего рынка." },
    ],
    related: ["shopper-led-pricing", "why-discounts-hurt-margin"],
  },
];

const comparisonsAm: Comparison[] = [
  {
    slug: "bidygo-vs-discounting",
    title: "Bidygo ընդդեմ զեղչերի․ առանց գնման հեռացածին վերադարձնելու երկու եղանակ, անկեղծ համեմատությամբ",
    description:
      "Ակցիաներն ու BOGO-ն վերադարձնում են կորած գնորդներին, բայց սովորեցնում են սպասել հաջորդ զեղչին։ Գնորդի առաջարկած գինը նույն մարդկանց վերադարձնում է առանց դարակի գինը փոխելու։ Ուղիղ համեմատություն։",
    ourName: "Bidygo (գնորդի առաջարկած գին)",
    otherName: "Ավանդական զեղչեր",
    hero: {
      eyebrow: "Համեմատություն",
      headline: "Bidygo ընդդեմ ավանդական զեղչերի",
      subhead:
        "Երկուսն էլ վերադարձնում են այն գնորդին, ով այլապես կհեռանար։ Տարբերությունը նրանում է, թե ով է վճարում այդ վերադարձի համար, և ինչ է դա նշանակում վեց ամիս հետո։",
    },
    intro: [
      "Ամեն խանութի առաջ վաղ թե ուշ նույն հարցն է առաջանում․ գնորդը տատանվում է դարակի մոտ, մտածում ու դուրս է գալիս։ Ինչպե՞ս վերադարձնել։ Տասնամյակներով պատասխանը նույնն է եղել՝ հրապարակային իջեցնել գինը։ Ակցիա ամբողջ խանութի վրա, BOGO, կտրոններ, սեզոնի վերջի վաճառքներ։ Աշխատում է։ Ունի նաև իր ծախսերը, որոնք միջին օպերատորը դադարել է տեսնել՝ չափից շատ սովորական է։",
      "Գնորդի առաջարկած գինը նույն հարցի այլ պատասխանն է։ Դարակի գինը չի շարժվում։ Այն գնորդին, ով այլապես կհեռանար, տրվում է մասնավոր եղանակ՝ առաջարկելու գին, որն իրեն հարմար է։ Խանութի կանոնները ինքնաբերաբար որոշում են։ Այս էջը ուղիղ համեմատում է երկու մոտեցումները այն չափումներով, որոնք իրականում կարևոր են աճել ուզող խանութի համար։",
    ],
    ourSide: {
      tagline: "Մասնավոր, գնորդի նախաձեռնությամբ, ավտոմատացված։",
      points: [
        {
          title: "Դարակի գինը չի փոխվում",
          body: "Ցուցադրվող գինը մնում է։ Համաձայնեցված գինը տեսնում է միայն այն գնորդը, ով ինքն է հարցրել։ Բրենդի ընկալումը և մատակարարների հետ համաձայնագրերը անձեռնմխելի են։",
        },
        {
          title: "Զեղչը ստանում է միայն հարցնողը",
          body: "Գնորդները, ովքեր ամեն դեպքում լրիվ կվճարեին, շարունակում են լրիվ վճարել։ Մարժա չի տրվում նրան, ում դա պետք չէր կոնվերսիայի համար։",
        },
        {
          title: "Ավտոմատիկ, ոչ ձեռքով",
          body: "Ստորին սահման, վերին սահման ու հակառակ առաջարկի տրամաբանություն կարգավորվում են մեկ անգամ։ Շարժիչը մշակում է ամեն առաջարկ։ Անձնակազմը չի սակարկում դարակի մոտ կամ դրամարկղում։",
        },
        {
          title: "Վարքագիծը ժամանակի հետ չի փոխվում",
          body: "Նրանք, ովքեր չեն օգտվում Bidygo-ից, ընդհանրապես չեն իմանա, որ զեղչի շերտ կա։ Հաջորդ գնման ակնկալիքները մնում են նույնը։",
        },
      ],
    },
    otherSide: {
      tagline: "Հրապարակային, խանութի նախաձեռնությամբ, բոլորի համար։",
      points: [
        {
          title: "Դարակի գինը հրապարակային շարժվում է",
          body: "Տեսնում են բոլորը։ Ակցիայի ընթացքում զեղչը դառնում է նոր նորմ — և հաճախ դրանից հետո էլ, որովհետև գնորդները հիշում են։",
        },
        {
          title: "Զեղչը ստանում է ամեն ներս մտնող",
          body: "Ներառյալ նրանց, ովքեր լրիվ կվճարեին։ Մեկ հեռացողի վերադարձի գինը այն մարժան է, որ դու տվել ես տասնյակ ուրիշներին, ովքեր զեղչի կարիք չունեին։",
        },
        {
          title: "Գործառնական ծախսեր",
          body: "Ցուցադրման պաստառներ, անձնակազմի վերապատրաստում, դրամարկղի վերածրագրավորում, մենեջերի հաստատումներ բացառիկ դեպքերում։ Ակցիաների հաճախականության հետ ծախսերը մեծանում են։",
        },
        {
          title: "Ձևավորում է ապագա վարքագիծը",
          body: "Կանոնավոր զեղչերը գնորդներին սովորեցնում են հետաձգել գնումը, սպասել հաջորդ ակցիային, գնալ մրցակիցների մոտ առանց զեղչի շաբաթներին։ Զեղչը դառնում է հարկ։",
        },
      ],
    },
    rows: [
      { dimension: "Դարակի գինը փոխվու՞մ է", bidygo: "Ոչ", other: "Այո՝ հրապարակային", bidygoWins: true },
      { dimension: "Ո՞վ է ստանում ցածր գինը", bidygo: "Միայն հարցնողը", other: "Բոլորը խանութում", bidygoWins: true },
      { dimension: "Տիպիկ տրված մարժան", bidygo: "~5–8%", other: "10–25%", bidygoWins: true },
      { dimension: "Ազդեցությունը բրենդի գնի ընկալման վրա", bidygo: "Չկա", other: "Մաշում", bidygoWins: true },
      { dimension: "Համատեղելի MSRP պայմանագրերի հետ", bidygo: "Այո (գործարքը մասնավոր է)", other: "Սովորաբար՝ ոչ", bidygoWins: true },
      { dimension: "Անձնակազմի ժամանակ", bidygo: "Զրո մեկ գործարքի վրա", other: "Պաստառներ, ուսուցում, հաստատումներ", bidygoWins: true },
      { dimension: "Վերադարձված վաճառքների ճշգրիտ չափում", bidygo: "Ամեն առաջարկի, ամեն SKU-ի", other: "Դժվար է հստակ վերագրել", bidygoWins: true },
      { dimension: "Ազդեցությունը գնորդի ապագա վարքագծի վրա", bidygo: "Չկա", other: "Սովորեցնում է սպասել", bidygoWins: true },
      { dimension: "Լավ է մնացորդների վաճառքի համար", bidygo: "Աշխատում է, բայց ավելի դանդաղ", other: "Ուժեղ, կանխատեսելի", bidygoWins: false },
      { dimension: "Լավ է մեկանգամյա իրադարձությունների համար (տոներ, բացում)", bidygo: "Չեզոք", other: "Ուժեղ՝ տրաֆիկ է բերում", bidygoWins: false },
    ],
    verdict: {
      headline: "Bidygo-ն հաղթում է առօրյա գործառնություններում։ Զեղչերը՝ մեկանգամյա իրադարձություններում։ Նրանք միասին ապրում են։",
      body: [
        "Եթե ակցիա ունես ամեն շաբաթ-կիրակի, ութ տողերը, որտեղ Bidygo-ն հաղթում է, տասներկու ամսում վերածվում են կառուցվածքային մարժի առավելության։ Bidygo-ն ճիշտ լռելյայն ընտրությունն է կոնվերսիա-վերականգնման ամենօրյա աշխատանքի համար բարձր մտածմունքի կատեգորիաներում։",
        "Եթե երկու շաբաթում պետք է անշարժ ապրանք տեղափոխել, կամ տոնական շաբաթ-կիրակիում տրաֆիկ ես հավաքում՝ զեղչերը դեռ հաղթում են։ Մեխանիզմները լրացնում են միմյանց, ոչ թե մրցում։ Սխալը զեղչը որպես միակ գործիք դիտելն է — որտեղ լռելյայն գտնվում է խանութների մեծ մասը։",
      ],
    },
    faqs: [
      { q: "Կարո՞ղ ենք երկուսն էլ կիրառել", a: "Այո, դրանք իրար բացառող չեն։ Bidygo-ով խանութների մեծ մասը դեռ տարեկան մեկ-երկու սեզոնային ակցիա է անում։ Bidygo-ն վերցնում է ամենօրյան, ակցիաները՝ իրադարձությունները։" },
      { q: "Արդյո՞ք գնորդները չեն սովորի միշտ սակարկել", a: "Ոմանք կսովորեն։ Բայց ստորին և վերին սահմանների կանոնները սահմանում են քո կորուստները։ Միջին ընդունված գինը մոտ 92% է դարակի գնից նույնիսկ հաճախ սակարկողների դեպքում, դեմ 75–90% սովորական ակցիայի ընթացքում։ Տնտեսությունը դեռ Bidygo-ի կողմն է։" },
      { q: "Իսկ լոյալության ծրագրերը՞", a: "Լոյալությունը այլ լծակ է — այն պարգևատրում է կրկնվող վարքագիծը, ոչ թե առաջին կոնվերսիան։ Լոյալությունն ու Bidygo-ն լրացնում են. Bidygo-ն աշխատում է խանութում տատանվելու պահին, լոյալությունը՝ հաջորդող ամիսներին։" },
      { q: "Իսկ դրամարկղի մոտ վաճառողի որոշմամբ զեղչը՞", a: "Մենեջերի որոշմամբ զեղչը երկու աշխարհների ամենավատը՝ ընդարձակվում է մարդկանց հաշվին, տարբեր է վաճառողների մոտ, սովորեցնում է բարձր սակարկել։ Bidygo-ն կիրառում է մեկ կանոնակարգ բոլորի համար՝ առանց անձնակազմի ժամանակի։" },
      { q: "Արդյո՞ք մանրածախ գնի կարգավորման օրենքների ներքո սա օրինական է", a: "Շատ իրավասությունների ներքո մանրածախ գնի կարգավորման օրենքները վերաբերում են հրապարակային հայտարարված գներին և խանութների միջև գնագոյացմանը։ Bidygo-ի համաձայնեցված գները մասնավոր են և անհատական — սովորաբար դուրս են RPM-ի շրջանակից։ Միշտ ստուգեք ձեր շուկայի կարգավորիչի հետ։" },
    ],
    related: ["shopper-led-pricing", "why-discounts-hurt-margin"],
  },
];

const byLocale: Record<Locale, Comparison[]> = {
  en: comparisonsEn,
  ru: comparisonsRu,
  am: comparisonsAm,
};

export function getComparisons(locale: string): Comparison[] {
  return byLocale[locale as Locale] ?? comparisonsEn;
}

export function getComparison(slug: string, locale: string): Comparison | null {
  return getComparisons(locale).find((c) => c.slug === slug) ?? null;
}

export function getAllComparisonSlugs(): string[] {
  return comparisonsEn.map((c) => c.slug);
}
