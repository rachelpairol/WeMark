"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function CTASection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary/8 px-6 py-16 text-center shadow-sm sm:px-12 sm:py-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Ready to create something meaningful?
            </span>

            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              {t("finalCta.title")}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("finalCta.subtitle")}
            </p>

            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 text-base font-semibold transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl"
              >
                <Link href="/shop">
                  {t("finalCta.button")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Handmade with care • Personalized for your story • Gift-ready packaging
            </p>
          </div>

          {/* Decorative blur shapes */}
          <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}