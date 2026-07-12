export type CategorySlug = "outerwear" | "evening" | "tailoring";

export interface Category {
  slug: CategorySlug;
  name: { vi: string; en: string };
  description: { vi: string; en: string };
  tone: "ink" | "gold" | "charcoal";
}

export const categories: Category[] = [
  {
    slug: "outerwear",
    name: { vi: "Áo Khoác", en: "Outerwear" },
    description: {
      vi: "Măng-tô, blazer và áo khoác được cấu trúc để giữ dáng qua thời gian.",
      en: "Coats, blazers, and jackets structured to hold their shape through time.",
    },
    tone: "ink",
  },
  {
    slug: "evening",
    name: { vi: "Dạ Hội", en: "Evening" },
    description: {
      vi: "Đầm và trang phục dạ hội dành cho những khoảnh khắc đáng nhớ.",
      en: "Dresses and evening pieces for the nights worth remembering.",
    },
    tone: "gold",
  },
  {
    slug: "tailoring",
    name: { vi: "May Đo", en: "Tailoring" },
    description: {
      vi: "Suit, sơ mi và trang phục công sở với đường cắt chuẩn xác.",
      en: "Suits, shirting, and considered separates cut with precision.",
    },
    tone: "charcoal",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
