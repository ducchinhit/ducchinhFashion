"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductArt } from "@/components/product-art";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <div className="relative overflow-hidden bg-muted">
        <div className="aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProductArt
            swatch={product.swatch}
            accent={product.accent}
            label={product.name[locale]}
            seed={product.sku.length + product.slug.length}
            className="h-full w-full"
          />
        </div>
        {product.featured && (
          <span className="absolute left-4 top-4 border border-ivory/70 px-2 py-1 text-[10px] tracking-widest text-ivory">
            {t("common.new")}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-ink transition-colors group-hover:text-gold">
            {product.name[locale]}
          </p>
          <p className="mt-1 text-xs text-ink-soft">{product.shortDescription[locale]}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-ink-soft">
          {formatPrice(product.price, locale)}
          {t("common.currencySuffix")}
        </p>
      </div>
    </Link>
  );
}
