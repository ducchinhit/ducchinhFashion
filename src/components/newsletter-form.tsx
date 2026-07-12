"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="mt-8 text-sm text-gold-soft" role="status">
        {t("newsletterCta")} ✓ {email}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {t("newsletterPlaceholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        className="w-full border border-ivory/25 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold-soft focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap bg-gold px-6 py-3 text-sm tracking-wide text-paper transition-colors hover:bg-gold-soft"
      >
        {t("newsletterCta")}
      </button>
    </form>
  );
}
