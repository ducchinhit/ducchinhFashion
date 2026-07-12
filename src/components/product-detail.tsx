"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Minus, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";

export function ProductDetail({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category;
  related: Product[];
}) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations();
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const images = [0, 1];

  function handleAddToCart() {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem(product.slug, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <nav className="text-xs text-ink-soft">
        <Link href="/collections" className="hover:text-ink">
          {t("nav.collections")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${category.slug}`} className="hover:text-ink">
          {category.name[locale]}
        </Link>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-14 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
            <ProductArt
              swatch={product.swatch}
              accent={product.accent}
              label={product.name[locale]}
              seed={activeImage === 0 ? product.sku.length : product.sku.length + 11}
              className="h-full w-full"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {images.map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`aspect-[4/5] overflow-hidden bg-muted transition-opacity ${
                  activeImage === img ? "opacity-100 ring-1 ring-gold" : "opacity-60 hover:opacity-90"
                }`}
              >
                <ProductArt
                  swatch={product.swatch}
                  accent={product.accent}
                  label={`${product.name[locale]} ${img + 1}`}
                  seed={img === 0 ? product.sku.length : product.sku.length + 11}
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="text-xs tracking-widest text-ink-soft">{category.name[locale]}</p>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{product.name[locale]}</h1>
          <p className="mt-4 text-xl text-ink">
            {formatPrice(product.price, locale)}
            {t("common.currencySuffix")}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
            {product.description[locale]}
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-ink">{t("product.size")}</span>
              {sizeError && (
                <span className="text-xs text-error">{t("product.selectSize")}</span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  className={`flex h-11 min-w-11 items-center justify-center border px-3 text-sm transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-ivory"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div>
              <span className="text-xs tracking-widest text-ink">{t("product.quantity")}</span>
              <div className="mt-3 flex items-center border border-line">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center text-ink-soft hover:text-ink"
                  aria-label="decrease"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <span className="flex h-11 w-10 items-center justify-center text-sm text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-11 w-11 items-center justify-center text-ink-soft hover:text-ink"
                  aria-label="increase"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 flex h-11 flex-1 items-center justify-center gap-2 bg-ink text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
            >
              {added ? (
                <>
                  <Check size={16} strokeWidth={1.5} />
                  {t("product.addedToCart")}
                </>
              ) : (
                t("product.addToCart")
              )}
            </button>
          </div>

          <p className="mt-6 text-xs text-ink-soft">
            {t("product.sku")}: {product.sku} &middot; {t("product.inStock")}
          </p>
          <p className="mt-2 text-xs text-ink-soft">{t("product.shippingNote")}</p>

          <div className="mt-10 divide-y divide-line border-t border-line">
            <details className="group py-5" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-ink">
                {t("product.detailsTitle")}
                <Plus size={14} strokeWidth={1.5} className="group-open:hidden" />
                <Minus size={14} strokeWidth={1.5} className="hidden group-open:block" />
              </summary>
              <ul className="mt-4 space-y-2">
                {product.details[locale].map((d) => (
                  <li key={d} className="text-sm text-ink-soft">
                    &bull; {d}
                  </li>
                ))}
              </ul>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-ink">
                {t("product.careTitle")}
                <Plus size={14} strokeWidth={1.5} className="group-open:hidden" />
                <Minus size={14} strokeWidth={1.5} className="hidden group-open:block" />
              </summary>
              <ul className="mt-4 space-y-2">
                {product.care[locale].map((c) => (
                  <li key={c} className="text-sm text-ink-soft">
                    &bull; {c}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-28">
          <h2 className="font-display text-2xl text-ink">{t("product.relatedTitle")}</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
