"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";

type PaymentMethod = "cod" | "bank";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  notes: string;
}

const emptyForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  postalCode: "",
  notes: "",
};

export default function CheckoutPage() {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations();
  const { linesWithProducts, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [error, setError] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const requiredFilled = useMemo(
    () =>
      Boolean(
        form.fullName && form.email && form.phone && form.address && form.city && form.district
      ),
    [form]
  );

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!requiredFilled || linesWithProducts.length === 0) {
      setError(true);
      return;
    }
    setError(false);
    const id = `DC${Date.now().toString().slice(-8)}`;
    setOrderId(id);
    clearCart();
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center lg:px-10">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          {t("checkout.orderPlacedTitle")}
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">
          {t("checkout.orderPlacedBody", { orderId })}
        </p>
        <p className="mt-6 border border-line bg-paper p-4 text-xs leading-relaxed text-ink-soft">
          {t("checkout.orderPlacedNote")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center bg-ink px-7 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
          >
            {t("checkout.backToHome")}
          </Link>
          <Link
            href="/collections"
            className="text-sm text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
          >
            {t("checkout.continueBrowsing")}
          </Link>
        </div>
      </div>
    );
  }

  if (linesWithProducts.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center lg:px-10">
        <p className="text-sm text-ink-soft">{t("cart.empty")}</p>
        <Link
          href="/collections"
          className="mt-8 inline-flex items-center bg-ink px-7 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
        >
          {t("cart.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{t("checkout.title")}</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="text-xs tracking-widest text-ink">{t("checkout.step1")}</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={t("checkout.fullName")} required>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.phone")} required>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.email")} required className="sm:col-span-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.address")} required className="sm:col-span-2">
                <input
                  required
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.city")} required>
                <input
                  required
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.district")} required>
                <input
                  required
                  value={form.district}
                  onChange={(e) => update("district", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.postalCode")}>
                <input
                  value={form.postalCode}
                  onChange={(e) => update("postalCode", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label={t("checkout.notes")} className="sm:col-span-2">
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  className="input resize-none"
                />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="text-xs tracking-widest text-ink">{t("checkout.step2")}</h2>
            <div className="mt-5 space-y-3">
              <label
                className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
                  payment === "cod" ? "border-ink" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="mt-1"
                />
                <span className="text-sm text-ink">{t("checkout.cod")}</span>
              </label>
              <label
                className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
                  payment === "bank" ? "border-ink" : "border-line"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "bank"}
                  onChange={() => setPayment("bank")}
                  className="mt-1"
                />
                <div>
                  <span className="text-sm text-ink">{t("checkout.bankTransfer")}</span>
                  <p className="mt-1 text-xs text-ink-soft">{t("checkout.bankTransferNote")}</p>
                </div>
              </label>
            </div>
          </section>

          {error && <p className="text-sm text-error">{t("checkout.requiredField")}</p>}

          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink"
          >
            {t("checkout.backToCart")}
          </Link>
        </div>

        <div className="h-fit border border-line bg-paper p-8">
          <h2 className="text-sm tracking-widest text-ink">{t("checkout.orderSummary")}</h2>
          <ul className="mt-6 space-y-4">
            {linesWithProducts.map((line) => (
              <li key={`${line.slug}-${line.size}`} className="flex justify-between gap-4 text-sm">
                <span className="text-ink-soft">
                  {line.product.name[locale]} × {line.quantity}
                  <span className="block text-xs">
                    {t("product.size")}: {line.size}
                  </span>
                </span>
                <span className="whitespace-nowrap text-ink">
                  {formatPrice(line.lineTotal, locale)}
                  {t("common.currencySuffix")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-line pt-6 text-base text-ink">
            <span>{t("cart.grandTotal")}</span>
            <span>
              {formatPrice(subtotal, locale)}
              {t("common.currencySuffix")}
            </span>
          </div>
          <button
            type="submit"
            className="mt-8 flex h-12 w-full items-center justify-center bg-ink text-sm tracking-wide text-ivory transition-colors hover:bg-gold"
          >
            {t("checkout.placeOrder")}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs text-ink-soft">
        {label}
        {required && <span className="text-error"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
