import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    { title: t("value1Title"), body: t("value1Body") },
    { title: t("value2Title"), body: t("value2Body") },
    { title: t("value3Title"), body: t("value3Body") },
  ];

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center lg:px-10">
        <p className="text-xs tracking-[0.3em] text-gold">{t("eyebrow")}</p>
        <h1 className="mt-5 font-display text-4xl text-ink sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
          {t("intro")}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-muted lg:order-2">
            <Image
              src="/images/about/craft.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("philosophyTitle")}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
              {t("philosophyBody")}
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
            <Image
              src="/images/about/atelier.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("craftTitle")}</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">{t("craftBody")}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-center font-display text-3xl text-ink">{t("valuesTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="text-center">
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-sm tracking-wide text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24">
        <Reveal className="mx-auto max-w-xl px-6 text-center lg:px-10">
          <h2 className="font-display text-3xl text-ivory">{t("ctaTitle")}</h2>
          <p className="mt-4 text-sm text-ivory/70">{t("ctaBody")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center bg-ivory px-7 py-3.5 text-sm tracking-wide text-ink transition-colors hover:bg-gold hover:text-paper"
          >
            {t("ctaButton")}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
