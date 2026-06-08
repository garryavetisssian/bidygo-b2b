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
      "On the expensive items, people would check my price, say they'd think about it, and order it cheaper online. Now they make me an offer before they leave. I say yes to the ones that still make me money — and I keep the sale instead of losing it to a website.",
    metric: "Closed three sales my first Saturday that I'd normally have lost",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Sergey",
    city: "Yerevan",
    vertical: "Footwear",
    story:
      "There are seven shops on my street selling the exact same brands. I'm not going to be the cheapest — that just kills everyone's margin. Now the customer tells me what they'll pay, and I close the ones that work for me. People who used to just compare prices and walk out actually buy.",
    metric: "More paying customers midweek than the shops next to me",
    emoji: "👟",
    bg: "bg-honey-200",
  },
  {
    id: "lilit-fashion",
    name: "Lilit",
    city: "Yerevan",
    vertical: "Fashion",
    story:
      "I used to mark the whole rack down 50% at the end of the season and give away margin to everyone. Now I don't discount for everyone — shoppers tell me what they'll pay for what's left, and most offer more than my old sale price. The stock moves and I keep more of the money.",
    metric: "Cleared the season's leftovers three weeks faster, above my old sale price",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ara",
    city: "Yerevan",
    vertical: "Beauty",
    story:
      "My fragrances aren't cheap, so a lot of people walk out to “think about it” and never come back. Now those same customers send me an offer instead of leaving. Even when I counter, I usually land the sale — that's money I was just losing before.",
    metric: "A handful of sales a week from customers who used to walk out",
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
      "На дорогих позициях люди спрашивали цену, говорили «подумаю» и заказывали дешевле в интернете. Теперь они сразу делают мне предложение. Соглашаюсь на те, что мне всё ещё выгодны, — и оставляю продажу себе, а не отдаю сайту.",
    metric: "Три продажи в первую субботу, которые обычно бы потеряла",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Сергей",
    city: "Ереван",
    vertical: "Обувь",
    story:
      "На моей улице семь магазинов с одними и теми же брендами. Я не собираюсь быть самым дешёвым — так у всех тает маржа. Теперь покупатель сам говорит, сколько готов дать, и я закрываю те сделки, что мне подходят. Те, кто раньше просто сравнивал цены и уходил, теперь покупают.",
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
      "Раньше в конце сезона я скидывала всю вешалку на 50% и отдавала маржу всем подряд. Теперь не делаю скидку для всех — покупатели сами говорят, сколько дадут за остатки, и чаще предлагают больше моей прежней распродажной цены. Товар уходит, а денег остаётся больше.",
    metric: "Остатки сезона ушли на три недели быстрее и дороже прежней распродажи",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Ара",
    city: "Ереван",
    vertical: "Косметика и парфюмерия",
    story:
      "Парфюмерия у меня недешёвая, многие выходят «подумать» и не возвращаются. Теперь те же люди присылают предложение, вместо того чтобы уйти. Даже когда торгуюсь в ответ, чаще всего закрываю продажу — а раньше просто терял эти деньги.",
    metric: "Несколько продаж в неделю от тех, кто раньше уходил",
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
      "Թանկ ապրանքների վրա մարդիկ գինը հարցնում էին, ասում «կմտածեմ» ու համացանցից ավելի էժան պատվիրում։ Հիմա նախ ինձ առաջարկ են անում։ Համաձայնվում եմ նրանց, որ դեռ ինձ ձեռնտու են — ու վաճառքն ինձ է մնում, ոչ թե կայքին։",
    metric: "Երեք վաճառք առաջին շաբաթ օրը, որ սովորաբար կկորցնեի",
    emoji: "🎧",
    bg: "bg-brand-500/12",
  },
  {
    id: "sergey-footwear",
    name: "Սերգեյ",
    city: "Երևան",
    vertical: "Կոշիկ",
    story:
      "Իմ փողոցում յոթ խանութ նույն բրենդներն են վաճառում։ Ամենաէժանը լինել չեմ ուզում — այդպես բոլորի մարժան է հալվում։ Հիմա գնորդն ինքն է ասում, թե ինչքան կտա, ու ես փակում եմ ինձ ձեռնտու գործարքները։ Նրանք, ովքեր առաջ միայն գներ էին համեմատում ու գնում, հիմա առնում են։",
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
      "Առաջ սեզոնի վերջին ամբողջ դարակը 50%-ով իջեցնում էի ու մարժան բոլորին նվիրում։ Հիմա բոլորի համար զեղչ չեմ անում — գնորդներն իրենք են ասում, թե ինչքան կտան մնացորդի համար, ու հաճախ ավելի շատ են առաջարկում, քան իմ նախկին զեղչի գինը։ Ապրանքը գնում է, փողն ավելի շատ է մնում։",
    metric: "Սեզոնի մնացորդը գնաց երեք շաբաթ շուտ ու նախկին զեղչից թանկ",
    emoji: "🧥",
    bg: "bg-blush-200",
  },
  {
    id: "ara-beauty",
    name: "Արա",
    city: "Երևան",
    vertical: "Կոսմետիկա և օծանելիք",
    story:
      "Օծանելիքս էժան չէ, շատերը դուրս են գալիս «մտածելու» ու չեն վերադառնում։ Հիմա նույն մարդիկ գնալու փոխարեն առաջարկ են ուղարկում։ Նույնիսկ երբ հակաառաջարկ եմ անում, սովորաբար փակում եմ վաճառքը — իսկ առաջ ուղղակի կորցնում էի այդ փողը։",
    metric: "Շաբաթական մի քանի վաճառք նրանցից, ովքեր առաջ դուրս էին գալիս",
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
