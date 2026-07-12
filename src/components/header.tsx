"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useCart } from "@/context/cart-context";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/collections", label: t("nav.collections") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur border-b border-line shadow-[0_1px_0_0_rgba(23,19,16,0.03)]"
          : "bg-ivory/0 border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="font-display text-xl tracking-[0.15em] text-ink">
          ĐỨC CHINH
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageSwitcher className="hidden sm:flex" />
          <Link
            href="/cart"
            className="relative flex items-center justify-center text-ink"
            aria-label={t("nav.cart")}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-paper">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex items-center justify-center text-ink lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-ivory px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base tracking-wide text-ink"
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher className="pt-2" />
          </nav>
        </div>
      )}
    </header>
  );
}
