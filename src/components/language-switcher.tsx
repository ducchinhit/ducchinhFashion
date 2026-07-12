"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  const locales: { code: "vi" | "en"; label: string }[] = [
    { code: "vi", label: "VI" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className={`flex items-center gap-1 text-xs tracking-widest ${className ?? ""}`}>
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          <Link
            href={pathname}
            locale={l.code}
            className={
              locale === l.code
                ? "text-ink font-medium"
                : "text-ink-soft hover:text-ink transition-colors"
            }
            aria-current={locale === l.code ? "true" : undefined}
          >
            {l.label}
          </Link>
          {i < locales.length - 1 && <span className="text-line-strong">/</span>}
        </span>
      ))}
    </div>
  );
}
