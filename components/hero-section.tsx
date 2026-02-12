"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-16 lg:py-24">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
              {t("hero.badge")}
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {t("hero.title.1")}
              <span className="text-primary">{t("hero.title.2")}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link href="/shop">
                  {t("hero.cta.shop")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="/about">{t("hero.cta.about")}</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/mom-shadow-box.jpeg"
                    alt="MOM I Love You shadow box with paper roses"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/valentines-couples-box.jpeg"
                    alt="Valentine's Day personalized couples photo box"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/mom-shadow-box-lighted.jpeg"
                    alt="MOM shadow box with LED lights"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/graduation-achievement-box.jpeg"
                    alt="Custom shadow box with paper roses"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
