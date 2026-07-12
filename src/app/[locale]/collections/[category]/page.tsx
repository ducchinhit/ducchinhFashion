import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CollectionsGrid } from "@/components/collections-grid";
import { categories, getCategory } from "@/data/categories";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug }))
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const t = await getTranslations("collectionsPage");
  const localeKey = locale as "vi" | "en";

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <p className="text-xs tracking-[0.3em] text-gold">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        {category.name[localeKey]}
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
        {category.description[localeKey]}
      </p>

      <div className="mt-14">
        <CollectionsGrid initialCategory={category.slug} />
      </div>
    </div>
  );
}
