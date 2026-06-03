"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, Phone } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/Images/WeMarkLogo2.png"
                alt="WeMark"
                width={120}
                height={120}
                className="h-24 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.shopAll")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t("footer.categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=Mother's Day" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("category.Mother's Day")}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Valentine's Day" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("category.Valentine's Day")}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Anniversary" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("category.Anniversary")}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Birthday" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t("category.Birthday")}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Baby Shower" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Baby Shower
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t("footer.getInTouch")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:we.mark026@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  we.mark026@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+17543328861"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  +1 (754) 332-8861
                </a>
              </li>
              <li>
                <a
                  href="tel:+17865996309"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  +1 (786) 599-6309
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/we_mark26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@wemark37"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.88a8.22 8.22 0 0 0 4.81 1.54V7.01a4.85 4.85 0 0 1-1.04-.32z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
