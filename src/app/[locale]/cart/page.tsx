"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations();
  const { linesWithProducts, subtotal, updateQuantity, removeItem } = useCart();

  const isEmpty = linesWithProducts.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{t("cart.title")}</h1>

      {isEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center">
          <p className="text-sm text-ink-soft">{t("cart.empty")}</p>
          <Link
            href="/collections"
            className="inline-flex items-center bg-ink px-7 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
          >
            {t("cart.emptyCta")}
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs text-ink-soft">
              {t("cart.itemsCount", { count: linesWithProducts.length })}
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {linesWithProducts.map((line) => (
                <li key={`${line.slug}-${line.size}`} className="flex gap-5 py-6">
                  <Link
                    href={`/product/${line.slug}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden bg-muted"
                  >
                    <Image
                      src={line.product.images[0]}
                      alt={line.product.name[locale]}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${line.slug}`}
                          className="text-sm text-ink hover:text-gold"
                        >
                          {line.product.name[locale]}
                        </Link>
                        <p className="mt-1 text-xs text-ink-soft">
                          {t("product.size")}: {line.size}
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-sm text-ink">
                        {formatPrice(line.lineTotal, locale)}
                        {t("common.currencySuffix")}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.slug, line.size, line.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-ink-soft hover:text-ink"
                          aria-label="decrease"
                        >
                          <Minus size={13} strokeWidth={1.5} />
                        </button>
                        <span className="flex h-9 w-8 items-center justify-center text-sm text-ink">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.slug, line.size, line.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-ink-soft hover:text-ink"
                          aria-label="increase"
                        >
                          <Plus size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug, line.size)}
                        className="flex items-center gap-1 text-xs text-ink-soft hover:text-error"
                      >
                        <X size={13} strokeWidth={1.5} />
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/collections"
              className="mt-8 inline-flex items-center text-sm text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              {t("cart.continueShopping")}
            </Link>
          </div>

          <div className="h-fit border border-line bg-paper p-8">
            <h2 className="text-sm tracking-widest text-ink">{t("cart.orderSummary")}</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>{t("cart.subtotal")}</span>
                <span>
                  {formatPrice(subtotal, locale)}
                  {t("common.currencySuffix")}
                </span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>{t("cart.shippingEstimate")}</span>
                <span>{t("cart.shippingFree")}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-line pt-6 text-base text-ink">
              <span>{t("cart.grandTotal")}</span>
              <span>
                {formatPrice(subtotal, locale)}
                {t("common.currencySuffix")}
              </span>
            </div>
            <Link
              href="/checkout"
              className="mt-8 flex h-12 w-full items-center justify-center bg-ink text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
            >
              {t("cart.checkoutCta")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
