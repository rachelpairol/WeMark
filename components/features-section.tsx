"use client"

import { Heart, Paintbrush, Gift, Sparkles } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import type { LucideIcon } from "lucide-react"

export function FeaturesSection() {
  const { t } = useI18n()

  const features: { icon: LucideIcon; titleKey: "features.handcrafted.title" | "features.personalized.title" | "features.giftReady.title" | "features.premium.title"; descKey: "features.handcrafted.desc" | "features.personalized.desc" | "features.giftReady.desc" | "features.premium.desc" }[] = [
    { icon: Paintbrush, titleKey: "features.handcrafted.title", descKey: "features.handcrafted.desc" },
    { icon: Heart, titleKey: "features.personalized.title", descKey: "features.personalized.desc" },
    { icon: Gift, titleKey: "features.giftReady.title", descKey: "features.giftReady.desc" },
    { icon: Sparkles, titleKey: "features.premium.title", descKey: "features.premium.desc" },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {t("features.title")}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {t(feature.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
