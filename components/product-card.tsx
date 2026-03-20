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
  const { t } = useI18n()

  const categoryKey = `category.${product.category}` as Parameters<typeof t>[0]

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl">
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[4/4.2] overflow-hidden bg-muted"
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {t(categoryKey)}
        </span>

        <Link href={`/product/${product.id}`}>
          <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-2xl font-serif font-bold text-foreground">
            ${product.price}
          </span>

          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="gap-2 font-semibold transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg"
          >
            <ShoppingBag className="h-4 w-4" />
            {t("product.addToCart")}
          </Button>
        </div>
      </div>
    </div>
  )
}