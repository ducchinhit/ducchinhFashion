import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as "vi" | "en";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-lg tracking-[0.15em] text-ink">
              ĐỨC CHINH
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-ink-soft">
              {t("footer.shopTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {c.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-ink-soft">
              {t("footer.aboutTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-ink-soft transition-colors hover:text-ink">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink-soft transition-colors hover:text-ink">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-widest text-ink-soft">
              {t("footer.helpTitle")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-ink-soft">{t("footer.shippingReturns")}</li>
              <li className="text-sm text-ink-soft">{t("footer.sizeGuide")}</li>
              <li className="text-sm text-ink-soft">{t("footer.faq")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>
            © {year} Đức Chinh Fashion. {t("footer.rights")}
          </p>
          <p>{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
