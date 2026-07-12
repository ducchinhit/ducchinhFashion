import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { CollectionsGrid } from "@/components/collections-grid";

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collectionsPage");

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <p className="text-xs tracking-[0.3em] text-gold">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">{t("subtitle")}</p>

      <div className="mt-14">
        <CollectionsGrid />
      </div>
    </div>
  );
}
