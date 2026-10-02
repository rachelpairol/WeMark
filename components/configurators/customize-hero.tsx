"use client"

import { useI18n } from "@/lib/i18n"

interface CustomizeHeroProps {
  badge: string
  badgeEs: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
}

export function CustomizeHero({ badge, badgeEs, title, titleEs, description, descriptionEs }: CustomizeHeroProps) {
  const { locale } = useI18n()
  const es = locale === "es"

  return (
    <div className="bg-secondary/20 py-10 text-center">
      <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {es ? badgeEs : badge}
      </span>
      <h1 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
        {es ? titleEs : title}
      </h1>
      <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
        {es ? descriptionEs : description}
      </p>
    </div>
  )
}
