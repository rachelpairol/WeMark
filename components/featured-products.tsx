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
    <section className="py-16 lg:py-24 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {t("featured.title")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("featured.subtitle")}
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 bg-transparent">
            <Link href="/shop">
              {t("featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
