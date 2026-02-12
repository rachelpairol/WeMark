"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone } from "lucide-react"
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
                src="/images/wemark-logo.png"
                alt="WeMark"
                width={100}
                height={100}
                className="h-20 w-auto"
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
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{t("footer.getInTouch")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                hello@wemark.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                (555) 123-4567
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
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
