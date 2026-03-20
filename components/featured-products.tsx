"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { useI18n } from "@/lib/i18n"

export function FeaturedProducts() {
  const featured = products.slice(0, 3)
  const { t } = useI18n()

  return (
    <section className="bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Our Best Sellers
            </span>

            <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight text-balance">
              {t("featured.title")}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("featured.subtitle")}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="gap-2 border-primary/30 bg-transparent font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
          >
            <Link href="/shop">
              {t("featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}