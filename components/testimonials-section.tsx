"use client"

import { useI18n } from "@/lib/i18n"
import { Star } from "lucide-react"


export function TestimonialsSection() {
    const { t } = useI18n()
    
const testimonials = [
  {
    name: t("testimonials.1.name"),
    occasion: t("testimonials.1.occasion"),
    text: t("testimonials.1.text"),
  },
  {
    name: t("testimonials.2.name"),
    occasion: t("testimonials.2.occasion"),
    text: t("testimonials.2.text"),
  },
  {
    name: t("testimonials.3.name"),
    occasion: t("testimonials.3.occasion"),
    text: t("testimonials.3.text"),
  },
]
  return (
    <section id="reviews" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {t("testimonials.badge")}
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight text-balance">
            {t("testimonials.title")} 
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <div
              key={review.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl"
            >
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                “{review.text}”
              </p>

              <div className="mt-auto pt-6">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-primary">{review.occasion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}