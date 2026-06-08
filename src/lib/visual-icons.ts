import {
  Smartphone,
  Shirt,
  Footprints,
  Sparkles,
  Sofa,
  ShoppingBag,
  Tag,
  TrendingDown,
  TrendingUp,
  Link2,
  Headphones,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the emoji keys used across our data (industries, articles, moments,
 * store profiles) to matching lucide icons, so components can render a crisp
 * vector mark instead of an emoji as their main visual. Variation selectors
 * (U+FE0F) are stripped so "🏷️" and "🏷" both resolve.
 */
const MAP: Record<string, LucideIcon> = {
  "📱": Smartphone, // electronics
  "🎧": Headphones, // electronics (testimonial)
  "👗": Shirt, // fashion
  "🧥": Shirt, // fashion (coat)
  "👟": Footprints, // footwear
  "💄": Sparkles, // beauty
  "🛋": Sofa, // home goods
  "🛍": ShoppingBag, // more categories
  "🏷": Tag, // pricing
  "📉": TrendingDown, // discounts hurt margin
  "🔗": Link2, // in-store / online
  "📈": TrendingUp, // growth / outcomes
};

export function iconForEmoji(emoji: string | undefined): LucideIcon {
  const key = (emoji ?? "").replace(/️/g, "").trim();
  return MAP[key] ?? ShoppingBag;
}

/**
 * Maps the same emoji keys to real photographic card visuals (Pexels, free
 * license) stored in /public/visuals. Used wherever an image — not an icon —
 * is the main visual of a card.
 */
const IMAGE_MAP: Record<string, string> = {
  "📱": "electronics",
  "🎧": "electronics",
  "👗": "fashion",
  "🧥": "fashion",
  "👟": "footwear",
  "💄": "beauty",
  "🛋": "home",
  "🛍": "shopping",
  "🏷": "pricing",
  "📉": "discounts",
  "🔗": "omnichannel",
  "📈": "shopping",
};

export function imageForEmoji(emoji: string | undefined): string {
  const key = (emoji ?? "").replace(/️/g, "").trim();
  return `/visuals/${IMAGE_MAP[key] ?? "shopping"}.jpg`;
}
