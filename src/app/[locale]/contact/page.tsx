import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const info = [
    { icon: MapPin, label: t("addressLabel"), value: t("addressValue") },
    { icon: Phone, label: t("phoneLabel"), value: t("phoneValue") },
    { icon: Mail, label: t("emailLabel"), value: t("emailValue") },
    { icon: Clock, label: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <p className="text-xs tracking-[0.3em] text-gold">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">{t("subtitle")}</p>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
        <ContactForm />

        <div>
          <h2 className="text-xs tracking-widest text-ink">{t("infoTitle")}</h2>
          <ul className="mt-6 space-y-6">
            {info.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-4">
                <Icon size={18} strokeWidth={1.5} className="mt-0.5 text-gold" />
                <div>
                  <p className="text-xs text-ink-soft">{label}</p>
                  <p className="mt-1 text-sm text-ink">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
