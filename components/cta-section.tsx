"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              {t("cta.title")}
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-primary-foreground/90 leading-relaxed">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2 text-base"
              >
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4" />
                  {t("cta.button")}
                </Link>
              </Button>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 h-64 w-64 rounded-full bg-primary-foreground/10" />
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-80 w-80 rounded-full bg-primary-foreground/5" />
        </div>
      </div>
    </section>
  )
}
