import Image from "next/image";
import { getTranslations, getLocale, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const currentLocale = (await getLocale()) as "vi" | "en";
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <div>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <p className="animate-fade-up text-xs tracking-[0.3em] text-gold-soft" style={{ animationDelay: "80ms" }}>
            {t("home.heroEyebrow")}
          </p>
          <h1 className="animate-fade-up mt-6 max-w-3xl whitespace-pre-line font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl" style={{ animationDelay: "180ms" }}>
            {t("home.heroTitle")}
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-ivory/75" style={{ animationDelay: "280ms" }}>
            {t("home.heroSubtitle")}
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: "380ms" }}>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-ivory px-7 py-3.5 text-sm tracking-wide text-ink transition-colors hover:bg-gold hover:text-paper"
            >
              {t("home.heroCtaPrimary")}
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-ivory/85 underline decoration-ivory/30 underline-offset-4 transition-colors hover:text-ivory"
            >
              {t("home.heroCtaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {[
            { value: "26+", label: t("home.statsAtelier") },
            { value: "180", label: t("home.statsPieces") },
            { value: "40", label: t("home.statsHours") },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 py-10 text-center">
              <span className="font-display text-4xl text-ink">{stat.value}</span>
              <span className="text-xs tracking-widest text-ink-soft">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-gold">{t("home.featuredEyebrow")}</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
              {t("home.featuredTitle")}
            </h2>
            <p className="mt-3 max-w-md text-sm text-ink-soft">{t("home.featuredSubtitle")}</p>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold"
          >
            {t("home.viewAll")}
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-xl">
            <p className="text-xs tracking-[0.3em] text-gold-soft">{t("home.collectionsEyebrow")}</p>
            <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
              {t("home.collectionsTitle")}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.slug} delay={i * 0.1}>
                <Link href={`/collections/${category.slug}`} className="group relative block overflow-hidden">
                  <div className="relative aspect-[3/4] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Image
                      src={category.image}
                      alt={category.name[currentLocale]}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 p-8">
                    <h3 className="font-display text-2xl text-ivory">{category.name[currentLocale]}</h3>
                    <p className="mt-2 max-w-[26ch] text-sm text-ivory/75">
                      {category.description[currentLocale]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-widest text-gold-soft">
                      {t("home.viewAll")}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
            <Image
              src="/images/about/philosophy.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs tracking-[0.3em] text-gold">{t("home.storyEyebrow")}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {t("home.storyTitle")}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">
              {t("home.storyBody")}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold"
            >
              {t("home.storyCta")}
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-xs tracking-[0.3em] text-gold">{t("home.editorialEyebrow")}</p>
          <p className="mt-6 font-display text-3xl italic leading-snug text-ink sm:text-4xl">
            &ldquo;{t("home.editorialTitle")}&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
            {t("home.editorialBody")}
          </p>
        </Reveal>
      </section>

      <section className="bg-ink py-24">
        <Reveal className="mx-auto max-w-xl px-6 text-center lg:px-10">
          <p className="text-xs tracking-[0.3em] text-gold-soft">{t("home.newsletterEyebrow")}</p>
          <h2 className="mt-4 font-display text-3xl text-ivory sm:text-4xl">
            {t("home.newsletterTitle")}
          </h2>
          <p className="mt-3 text-sm text-ivory/70">{t("home.newsletterSubtitle")}</p>
          <NewsletterForm />
          <p className="mt-4 text-xs text-ivory/40">{t("home.newsletterDisclaimer")}</p>
        </Reveal>
      </section>
    </div>
  );
}
