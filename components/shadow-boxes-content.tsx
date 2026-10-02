"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products, categories, getProductsByCategory } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

export function ShadowBoxesContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { t, locale } = useI18n()
  const es = locale === "es"

  const filtered = getProductsByCategory(selectedCategory)

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl text-balance">
          {t("shop.title")}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          {t("shop.subtitle")}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((category) => {
          const labelKey = category === "All" ? "shop.all" : `category.${category}`
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full",
                selectedCategory === category && "shadow-sm"
              )}
            >
              {t(labelKey as Parameters<typeof t>[0])}
            </Button>
          )
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("shop.noProducts")}</p>
        </div>
      )}

      {/* Build-your-own banner */}
      <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center sm:px-12">
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
          {es ? "¿Prefieres crear el tuyo?" : "Prefer to build your own?"}
        </h2>
        <p className="mt-3 max-w-lg mx-auto text-muted-foreground leading-relaxed">
          {es
            ? "Elige la forma, el color de las flores, agrega tu frase y fotos — el precio se calcula al instante."
            : "Choose the shape, flower color, add your phrase and photos — the price is calculated instantly."}
        </p>
        <Button asChild size="lg" className="mt-6 gap-2">
          <Link href="/customize/shadow-boxes">
            {es ? "Personaliza el tuyo" : "Customize yours"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
