"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-line bg-paper p-6 text-sm text-ink">
        {t("formSuccess")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-xs text-ink-soft">{t("formName")}</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-ink-soft">{t("formEmail")}</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-ink-soft">{t("formSubject")}</span>
        <input
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="input mt-1.5"
        />
      </label>
      <label className="block">
        <span className="text-xs text-ink-soft">{t("formMessage")}</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="input mt-1.5 resize-none"
        />
      </label>
      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center bg-ink text-sm tracking-wide text-ivory transition-colors hover:bg-gold sm:w-auto sm:px-8"
      >
        {t("formSubmit")}
      </button>
    </form>
  );
}
