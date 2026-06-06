import type { Locale } from "@/i18n/routing";

export interface PricingTier {
  id: "try" | "run" | "scale";
  name: string;
  summary: string;
  body: string;
  bullets: string[];
  cta: string;
  href: string;
  accent: boolean;
}

const tiersEn: PricingTier[] = [
  {
    id: "try",
    name: "Try Bidygo",
    summary: "First 30 days on us.",
    body: "Run Bidygo in one shop, one category, no payment. We help you set it up and read the data.",
    bullets: [
      "Setup with our team",
      "Live offers from day one",
      "Daily numbers, on your phone",
      "Cancel any time, no questions",
    ],
    cta: "Start the 30 days",
    href: "/for-stores#talk",
    accent: false,
  },
  {
    id: "run",
    name: "Run Bidygo",
    summary: "Pay only when Bidygo brings the sale.",
    body: "A small percent of the new sales we help close. Nothing on the orders you would have made anyway.",
    bullets: [
      "Per-shop, per-category floors you control",
      "Auto-counters if you want them",
      "Weekly summary to your team",
      "Support over WhatsApp",
    ],
    cta: "Get the details",
    href: "/for-stores#talk",
    accent: true,
  },
  {
    id: "scale",
    name: "Bidygo for chains",
    summary: "More than five shops?",
    body: "Custom rollout, per-region rules, your team trained. Let us scope a number that works for you.",
    bullets: [
      "Multi-shop dashboards",
      "Regional rules and price floors",
      "Bulk staff training",
      "Quarterly review with our team",
    ],
    cta: "Talk to us",
    href: "/contact",
    accent: false,
  },
];

// REVIEW REQUIRED: native CIS-retail copywriter (see docs/translation-brief.md)
const tiersRu: PricingTier[] = [
  {
    id: "try",
    name: "Попробовать Bidygo",
    summary: "Первые 30 дней — за наш счёт.",
    body: "Запустите Bidygo в одном магазине, одной категории, бесплатно. Поможем настроить и читать цифры.",
    bullets: [
      "Настройка вместе с нашей командой",
      "Живые предложения с первого дня",
      "Цифры дня — на вашем телефоне",
      "Отменить можно в любой момент, без вопросов",
    ],
    cta: "Начать 30 дней",
    href: "/ru/for-stores#talk",
    accent: false,
  },
  {
    id: "run",
    name: "Запустить Bidygo",
    summary: "Платите только когда Bidygo приносит продажу.",
    body: "Небольшая доля от новых продаж, которые мы помогаем закрыть. Ничего с заказов, которые вы и так получили бы.",
    bullets: [
      "Минимальные цены по магазину и категории — вы решаете",
      "Автоматические встречные, если хотите",
      "Еженедельная сводка вашей команде",
      "Поддержка в WhatsApp и Telegram",
    ],
    cta: "Узнать подробности",
    href: "/ru/for-stores#talk",
    accent: true,
  },
  {
    id: "scale",
    name: "Bidygo для сетей",
    summary: "Больше пяти магазинов?",
    body: "Настроим под вас: правила по регионам, обучение команды, своя цена. Давайте посчитаем вместе.",
    bullets: [
      "Дашборды по всем магазинам",
      "Региональные правила и минимальные цены",
      "Обучение для всей команды",
      "Ежеквартальный разбор с нашей командой",
    ],
    cta: "Написать нам",
    href: "/ru/contact",
    accent: false,
  },
];

// REVIEW REQUIRED: native Yerevan-retail copywriter (see docs/translation-brief.md)
const tiersAm: PricingTier[] = [
  {
    id: "try",
    name: "Փորձիր Bidygo-ն",
    summary: "Առաջին 30 օրը մեր հաշվին։",
    body: "Բացիր Bidygo-ն մեկ խանութում, մեկ կատեգորիայում, անվճար։ Միասին կկարգավորենք ու կնայենք թվերը։",
    bullets: [
      "Կարգավորում մեր թիմի հետ",
      "Կենդանի առաջարկներ առաջին օրից",
      "Օրվա թվերը՝ քո հեռախոսում",
      "Ցանկացած պահի կարող ես դադարեցնել, առանց հարցերի",
    ],
    cta: "Սկսել 30 օրը",
    href: "/am/for-stores#talk",
    accent: false,
  },
  {
    id: "run",
    name: "Աշխատացրու Bidygo-ն",
    summary: "Վճարում ես միայն երբ Bidygo-ն վաճառք է բերում։",
    body: "Փոքր մաս նոր վաճառքներից, որ մենք օգնում ենք փակել։ Ոչինչ այն պատվերներից, որ դու հենց այնպես կանեիր։",
    bullets: [
      "Նվազագույն գներ՝ ըստ խանութի և կատեգորիայի, դու ես որոշում",
      "Ավտոմատ պատասխաններ, եթե ուզում ես",
      "Շաբաթական ամփոփում քո թիմին",
      "Աջակցություն WhatsApp-ով",
    ],
    cta: "Իմանալ մանրամասները",
    href: "/am/for-stores#talk",
    accent: true,
  },
  {
    id: "scale",
    name: "Bidygo ցանցերի համար",
    summary: "Հինգից ավելի՞ խանութ ունես։",
    body: "Կկարգավորենք քեզ համար․ կանոններ ըստ տարածաշրջանի, թիմի ուսուցում, քո գին։ Արի միասին հաշվենք։",
    bullets: [
      "Բոլոր խանութների վահանակ",
      "Կանոններ ըստ տարածաշրջանի և գների",
      "Ուսուցում ամբողջ թիմի համար",
      "Եռամսյակային վերլուծություն մեր թիմի հետ",
    ],
    cta: "Գրիր մեզ",
    href: "/am/contact",
    accent: false,
  },
];

export const pricingTiers: Record<Locale, PricingTier[]> = {
  en: tiersEn,
  ru: tiersRu,
  am: tiersAm,
};

export function getPricingTiers(locale: string): PricingTier[] {
  return pricingTiers[locale as Locale] ?? [];
}
