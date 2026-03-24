"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-24 w-24 -my-3">
            <Image
              src="/Images/WeMarkLogo2.png"
              alt="WeMark"
              fill
              className="object-contain scale-115 drop-shadow-lg"
              sizes="96px"
              priority
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-sm md:flex">
          <a
            href="#home"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.home")}
          </a>

          <a
            href="#shop"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.shop")}
          </a>

          <a
            href="#how"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.how")}
          </a>

          <a
            href="#reviews"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.reviews")}
          </a>

          <a
            href="#contact"
            className="font-semibold text-foreground hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {t("nav.contact")}
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <div className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <button
              onClick={() => setLocale("en")}
              className={`h-10 px-3 text-xs font-semibold transition ${
                locale === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("es")}
              className={`h-10 px-3 text-xs font-semibold transition ${
                locale === "es"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              ES
            </button>
          </div>

          {/* Cart */}
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition hover:bg-muted"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4 text-foreground" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-border bg-background px-1 text-[11px] text-foreground">
              0
            </span>
          </button>

          {/* CTA */}
          <a
            href="#shop"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-lg"
          >
            {t("hero.cta.shop")}
          </a>
        </div>
      </div>
    </header>
  );
}
