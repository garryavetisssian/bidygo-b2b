import type { Locale } from "@/i18n/routing";

export interface Moment {
  id: string;
  name: string;
  city: string;
  vertical: string;
  story: string;
  metric: string;
  emoji: string;
  bg: string;
}

const momentsEn: Moment[] = [
  {
    id: "anna-electronics",
    name: "Anna",
    city: "Yerevan",
    vertical: "Electronics",
    story:
      "Customers used to ask my price, then order the same thing cheaper online. Now they make me an offer instead. I take the ones that still cover my margin — and they leave with the product, not a screenshot.",
    metric: "Three sales my first Saturday that would've gone online",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Sergey",
    city: "Yerevan",
    vertical: "Footwear",
    story:
      "Seven shops on my street sell the same brands at the same price. Instead of cutting my sticker, I let customers name what they'd pay. The ones who used to just compare and walk out are buying from me now.",
    metric: "More paying customers midweek than the shops either side of me",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Lilit",
    city: "Yerevan",
    vertical: "Fashion",
    story:
      "End of season used to mean everything at minus 50%. Now shoppers tell me what they'll pay for the leftover stock — and most offer more than my clearance price. I move the rack without killing the margin.",
    metric: "End-of-season stock cleared three weeks faster, above clearance prices",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ara",
    city: "Yerevan",
    vertical: "Beauty",
    story:
      "I sell niche fragrances people look up online before they visit. The ones who used to leave without buying now send an offer first — so I get a real shot at the sale instead of losing them.",
    metric: "A few extra sales a week from customers who'd otherwise have walked",
    emoji: "💄",
    bg: "bg-brand-500/15",
  },
];

const momentsRu: Moment[] = [
  {
    id: "anna-electronics",
    name: "Анна",
    city: "Ереван",
    vertical: "Электроника",
    story:
      "Раньше спрашивали цену и заказывали то же самое дешевле в интернете. Теперь делают мне предложение. Беру те, что покрывают мою маржу, — и человек уходит с товаром, а не со скриншотом.",
    metric: "Три продажи в первую субботу, которые ушли бы в онлайн",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Сергей",
    city: "Ереван",
    vertical: "Обувь",
    story:
      "На моей улице семь магазинов продают те же бренды по той же цене. Вместо того чтобы сбивать ценник, я даю покупателю назвать свою цену. Те, кто раньше просто сравнивал и уходил, теперь покупают у меня.",
    metric: "Среди недели платящих покупателей больше, чем у соседей",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Лилит",
    city: "Ереван",
    vertical: "Одежда",
    story:
      "Конец сезона раньше — это всё минус 50%. Теперь покупатели сами говорят, сколько дадут за остатки, и чаще предлагают больше моей распродажной цены. Вешалку освобождаю, маржу не теряю.",
    metric: "Остатки сезона распроданы на три недели быстрее и дороже распродажи",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ара",
    city: "Ереван",
    vertical: "Косметика и парфюмерия",
    story:
      "Я держу нишевую парфюмерию — её сначала ищут в интернете. Те, кто раньше уходил без покупки, теперь сначала присылают предложение, и у меня появляется реальный шанс на продажу.",
    metric: "Несколько лишних продаж в неделю от тех, кто иначе бы ушёл",
    emoji: "💄",
    bg: "bg-brand-500/15",
  },
];

const momentsAm: Moment[] = [
  {
    id: "anna-electronics",
    name: "Աննա",
    city: "Երևան",
    vertical: "Էլեկտրոնիկա",
    story:
      "Առաջ գինը հարցնում էին, հետո նույնը համացանցում ավելի էժան պատվիրում։ Հիմա ինձ առաջարկ են անում։ Վերցնում եմ նրանք, որ իմ մարժան ծածկում են — ու մարդը դուրս է գալիս ապրանքով, ոչ թե սքրինշոթով։",
    metric: "Երեք վաճառք առաջին շաբաթ օրը, որ կգնային համացանց",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Սերգեյ",
    city: "Երևան",
    vertical: "Կոշիկ",
    story:
      "Իմ փողոցում յոթ խանութ նույն բրենդներն են վաճառում նույն գնով։ Գինն իջեցնելու փոխարեն թողնում եմ՝ գնորդն ինքն ասի, թե ինչքան կտա։ Նրանք, ովքեր առաջ միայն համեմատում ու գնում էին, հիմա ինձնից են առնում։",
    metric: "Շաբաթվա կեսին վճարող գնորդներն ավելի շատ են, քան հարևաններինը",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Լիլիթ",
    city: "Երևան",
    vertical: "Հագուստ",
    story:
      "Սեզոնի վերջն առաջ նշանակում էր՝ ամեն ինչ մինուս 50%։ Հիմա գնորդներն իրենք են ասում, թե ինչքան կտան մնացորդի համար, ու հաճախ ավելի շատ են առաջարկում, քան իմ զեղչի գինը։ Դարակն ազատում եմ, մարժան չեմ կորցնում։",
    metric: "Սեզոնի մնացորդը վաճառվեց երեք շաբաթ շուտ ու զեղչից թանկ",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Արա",
    city: "Երևան",
    vertical: "Կոսմետիկա և օծանելիք",
    story:
      "Նիշային օծանելիք եմ պահում — սկզբում համացանցում են փնտրում։ Նրանք, ովքեր առաջ առանց գնելու գնում էին, հիմա նախ առաջարկ են ուղարկում, ու ես իրական հնարավորություն եմ ստանում վաճառքի համար։",
    metric: "Շաբաթական մի քանի լրացուցիչ վաճառք նրանցից, ովքեր այլապես կգնային",
    emoji: "💄",
    bg: "bg-brand-500/15",
  },
];

export const moments: Record<Locale, Moment[]> = {
  en: momentsEn,
  ru: momentsRu,
  am: momentsAm,
};

export function getMoments(locale: string): Moment[] {
  return moments[locale as Locale] ?? momentsEn;
}
