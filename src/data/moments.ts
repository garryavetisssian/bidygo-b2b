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
    story: "She runs a small electronics shop on Mashtots. Bidygo brought back the customers who walk in, ask a price, then walk back out — except now they leave with a box.",
    metric: "Three closed deals her first Saturday on the floor",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Sergey",
    city: "Yerevan",
    vertical: "Footwear",
    story: "His shop sits in a row of seven that all sell the same brands. He stopped trying to win on the shelf — he started winning on the offer.",
    metric: "More foot traffic on Wednesdays than the row next door",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Lilit",
    city: "Yerevan",
    vertical: "Fashion",
    story: "End-of-season racks used to mean 50% off everything. With Bidygo she lets shoppers tell her what they'll actually pay — and most of them pay more than her clearance price.",
    metric: "Cleared the rack three weeks earlier, with margin",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ara",
    city: "Yerevan",
    vertical: "Beauty",
    story: "He stocks niche fragrances most people Google before walking in. The offers Bidygo brings in are the people who would've left without saying a word.",
    metric: "Eight conversations a day he wasn't having before",
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
    story: "У неё маленький магазин электроники на Маштоца. Bidygo вернул тех, кто заходит спросить цену и уходит — только теперь они уходят с покупкой.",
    metric: "Три закрытых сделки в первую субботу",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Сергей",
    city: "Ереван",
    vertical: "Обувь",
    story: "Его магазин в ряду из семи, где у всех одни и те же бренды. Он перестал бороться на полке — начал выигрывать на встречной цене.",
    metric: "По средам трафик выше, чем у соседей",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Лилит",
    city: "Ереван",
    vertical: "Одежда",
    story: "Конец сезона раньше означал «всё минус 50%». С Bidygo покупатели сами говорят, сколько готовы заплатить — и чаще платят больше, чем была её распродажная цена.",
    metric: "Распродала вешалку на три недели раньше — с маржей",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ара",
    city: "Ереван",
    vertical: "Косметика и парфюмерия",
    story: "Он держит нишевые ароматы, которые сначала ищут в Google. Bidygo приводит к нему именно тех, кто иначе ушёл бы молча.",
    metric: "Восемь разговоров в день, которых раньше не было",
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
    story: "Մաշտոցի վրա փոքրիկ էլեկտրոնիկայի խանութ ունի։ Bidygo-ն ետ բերեց նրանց, ովքեր մտնում են, գին են հարցնում ու դուրս գալիս — հիմա արդեն տուփը ձեռքին։",
    metric: "Երեք փակած գործարք առաջին շաբաթ օրը",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Սերգեյ",
    city: "Երևան",
    vertical: "Կոշիկ",
    story: "Իր խանութը մի շարքի մեջ է, որտեղ յոթ խանութ նույն բրենդներն են վաճառում։ Նա դադարեցրեց պայքարը դարակում — սկսեց հաղթել առաջարկով։",
    metric: "Չորեքշաբթի օրերին հոսքն ավելի շատ է, քան հարևանինը",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Լիլիթ",
    city: "Երևան",
    vertical: "Հագուստ",
    story: "Սեզոնի վերջն առաջ նշանակում էր «ամեն ինչը 50%-ով»։ Bidygo-ով գնորդներն իրենք են ասում, թե ինչքան կտան — ու հաճախ ավելի շատ են վճարում, քան իր զեղչի գինը։",
    metric: "Դարակը մաքրեց երեք շաբաթ շուտ՝ մարժայով",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Արա",
    city: "Երևան",
    vertical: "Կոսմետիկա և օծանելիք",
    story: "Նա պահում է նիշային բույրեր, որոնք նախ Google-ում են փնտրում։ Bidygo-ն բերում է հենց նրանց, ովքեր այլապես ոչինչ չասած դուրս կգային։",
    metric: "Օրը ութ զրույց, որ առաջ չկար",
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
