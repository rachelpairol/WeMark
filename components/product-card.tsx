"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"
import type { Product } from "@/components/cart-context"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { t, locale } = useI18n()

  const categoryKey = `category.${product.category}` as Parameters<typeof t>[0]

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {t(categoryKey)}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 font-serif text-lg font-semibold text-foreground leading-snug hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-serif font-bold text-foreground">
            ${product.price}
          </span>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            {t("product.addToCart")}
          </Button>
        </div>
      </div>
    </div>
  )
}
