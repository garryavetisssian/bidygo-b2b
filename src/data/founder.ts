import type { Locale } from "@/i18n/routing";

export interface FounderBio {
  name: string;
  role: string;
  oneLiner: string;
  story: string[];
  invitation: string;
  ctaLabel: string;
  whatsappLabel: string;
  photoAlt: string;
}

const founderEn: FounderBio = {
  name: "Vahagn Khachatryan",
  role: "Founder, Bidygo",
  oneLiner:
    "I grew up watching my mother negotiate for almost everything we bought. Bidygo started as a way to give every shopper that quiet option without making the shop awkward.",
  story: [
    "I grew up in shops. My mother negotiated for every kettle, every coat, every pair of shoes. In Yerevan in the nineties that was normal. It was also fair — if a shopkeeper could meet you halfway, they did. If they couldn't, you smiled and walked out, and nobody felt bad.",
    "Modern retail forgot how to do that. The shelf says one number, the shopper either pays it or leaves, and nobody learns anything. The shopkeeper loses the sale. The shopper loses something they actually wanted. The retailer never finds out what price would have worked.",
    "I built Bidygo because I think we can have both — a real shop with a real price, and a quiet way for the shopper to ask. Nothing public. Nothing pushy. Just an answer, in seconds, from the shop owner directly.",
    "We're starting in Yerevan because we know the shops here. We've spent more Saturdays in electronics aisles than I can count. After that, wherever shopkeepers want us — we'll say so when we get there, not before.",
    "If you run a shop, message me on WhatsApp. I'll show you how it works in fifteen minutes. — Vahagn Khachatryan",
  ],
  invitation:
    "If you run a shop — wherever you run it — message me on WhatsApp. I'll show you how it works in 15 minutes.",
  ctaLabel: "Read the full story",
  whatsappLabel: "Message Vahagn on WhatsApp",
  photoAlt: "Vahagn Khachatryan, founder of Bidygo, in a Yerevan shop",
};

// REVIEW REQUIRED: native CIS-retail copywriter (see docs/translation-brief.md)
const founderRu: FounderBio = {
  name: "Ваагн Хачатрян",
  role: "Основатель Bidygo",
  oneLiner:
    "Я вырос рядом с магазинами. Моя мама торговалась почти за каждую покупку. Bidygo — это тихий способ дать каждому покупателю ту же возможность, не делая магазин неловким.",
  story: [
    "Я вырос среди магазинов. Моя мама торговалась за каждый чайник, каждое пальто, каждую пару обуви. В Ереване девяностых это было нормально. И это было честно — если хозяин мог уступить, уступал. Если не мог, ты улыбался и уходил, и никто не обижался.",
    "Современная торговля разучилась так делать. На полке одна цифра, покупатель либо платит её, либо уходит, и никто ничего не узнаёт. Хозяин теряет продажу. Покупатель теряет то, что ему правда нужно. А магазин так и не понимает, какая цена сработала бы.",
    "Я сделал Bidygo, потому что верю — можно иметь и то, и другое. Реальный магазин с реальной ценой. И тихий способ покупателю спросить. Без громких объявлений. Без давления. Просто ответ за несколько секунд — от самого хозяина.",
    "Начинаем с Еревана, потому что эти магазины мы знаем. Провели в торговых залах больше суббот, чем можно сосчитать. Дальше — туда, куда нас позовут владельцы магазинов. Куда именно — скажем, когда поедем.",
    "Если у вас магазин — напишите мне в WhatsApp. За пятнадцать минут покажу, как это работает. — Ваагн Хачатрян",
  ],
  invitation:
    "Если у вас магазин — где бы он ни был — напишите мне напрямую. За пятнадцать минут покажу, как это работает.",
  ctaLabel: "Прочитать всю историю",
  whatsappLabel: "Написать Ваагну в WhatsApp",
  photoAlt: "Ваагн Хачатрян, основатель Bidygo, в ереванском магазине",
};

// REVIEW REQUIRED: native Yerevan-retail copywriter (see docs/translation-brief.md)
const founderAm: FounderBio = {
  name: "Վահագն Խաչատրյան",
  role: "Bidygo-ի հիմնադիր",
  oneLiner:
    "Մեծացել եմ խանութների միջավայրում։ Մայրս գրեթե ամեն գնման համար սակարկում էր։ Bidygo-ն այդ նույն հանգիստ հնարավորությունն է ամեն գնորդի համար՝ առանց խանութը անհարմար դարձնելու։",
  story: [
    "Ես մեծացել եմ խանութներում։ Մայրս սակարկում էր ամեն թեյամանի, ամեն վերարկուի, ամեն զույգ կոշիկի համար։ Իննսունականների Երևանում դա նորմալ էր։ Եվ արդար էր — եթե խանութպանը կարող էր զիջել, զիջում էր։ Չէր կարող — դու ժպտում ու դուրս էիր գալիս, ոչ ոք չէր նեղվում։",
    "Ժամանակակից առևտուրը մոռացել է այդպես անել։ Դարակին մեկ թիվ, գնորդը կամ վճարում է, կամ դուրս է գալիս, ու ոչ ոք ոչինչ չի սովորում։ Խանութպանը կորցնում է վաճառքը։ Գնորդը կորցնում է իր ուզածը։ Իսկ խանութը երբեք չի իմանում, որ գինը կաշխատեր։",
    "Bidygo-ն ստեղծել եմ, որովհետև հավատում եմ՝ կարող ենք երկուսն էլ ունենալ։ Իրական խանութ՝ իրական գնով։ Եվ հանգիստ եղանակ՝ գնորդի համար հարցնելու։ Ոչ բարձրաձայն։ Ոչ ճնշող։ Ուղղակի պատասխան մի քանի վայրկյանում՝ ուղիղ խանութպանից։",
    "Սկսում ենք Երևանից, որովհետև այս խանութները լավ գիտենք։ Ավելի շատ շաբաթ ենք անցկացրել խանութների սրահներում, քան կարող ենք հաշվել։ Հաջորդը՝ որտեղ խանութպանները կուզեն մեզ։ Որտեղ ճշգրիտ — կասենք, երբ կհասնենք։",
    "Եթե խանութ ունես — գրիր ինձ WhatsApp-ում։ Տասնհինգ րոպեում ցույց կտամ, թե ինչպես է աշխատում։ — Վահագն Խաչատրյան",
  ],
  invitation:
    "Եթե խանութ ունես — որտեղ էլ լինի — գրիր ինձ ուղիղ WhatsApp-ում։ Տասնհինգ րոպեում ցույց կտամ, թե ինչպես է աշխատում։",
  ctaLabel: "Կարդալ ամբողջ պատմությունը",
  whatsappLabel: "Գրել Վահագնին WhatsApp-ում",
  photoAlt: "Վահագն Խաչատրյանը՝ Bidygo-ի հիմնադիրը, երևանյան խանութում",
};

export const founder: Record<Locale, FounderBio | null> = {
  en: founderEn,
  ru: founderRu,
  am: founderAm,
};

export function getFounder(locale: string): FounderBio | null {
  return founder[locale as Locale] ?? null;
}
