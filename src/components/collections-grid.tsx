"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { categories, type CategorySlug } from "@/data/categories";
import { products as allProducts } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export function CollectionsGrid({ initialCategory }: { initialCategory?: CategorySlug }) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("collectionsPage");
  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(
    initialCategory ?? "all"
  );
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all"
        ? [...allProducts]
        : allProducts.filter((p) => p.category === activeCategory);

    switch (sort) {
      case "price-asc":
        list = list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list = list.sort((a, b) => a.name[locale].localeCompare(b.name[locale]));
        break;
      default:
        list = list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [activeCategory, sort, locale]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`text-sm tracking-wide transition-colors ${
              activeCategory === "all" ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t("filterAll")}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(c.slug)}
              className={`text-sm tracking-wide transition-colors ${
                activeCategory === c.slug ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
              }`}
            >
              {c.name[locale]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-soft">{t("resultsCount", { count: filtered.length })}</span>
          <label className="sr-only" htmlFor="sort">
            {t("sortLabel")}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-line bg-transparent px-3 py-2 text-xs tracking-wide text-ink focus:border-gold focus:outline-none"
          >
            <option value="featured">{t("sortFeatured")}</option>
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
            <option value="name-asc">{t("sortNameAsc")}</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
