"use client"

import { Palette, ImageIcon, Scissors, Gift } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function HowItWorksSection() {
  const { t } = useI18n()

  const steps = [
    {
      number: "01",
      icon: Palette,
      title: t("how.1.title"),
      description: t("how.1.description"),
    },
    {
      number: "02",
      icon: ImageIcon,
      title: t("how.2.title"),
      description: t("how.2.description"),
    },
    {
      number: "03",
      icon: Scissors,
      title: t("how.3.title"),
      description: t("how.3.description"),
    },
    {
      number: "04",
      icon: Gift,
      title: t("how.4.title"),
      description: t("how.4.description"),
    },
  ]

  return (
    <section id="how" className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {t("how.badge")}
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight text-balance">
            {t("how.title")}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("how.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-semibold tracking-[0.18em] text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}