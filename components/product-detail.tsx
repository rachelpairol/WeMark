"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ShoppingBag, ArrowLeft, Check, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"
import type { Product } from "@/components/cart-context"

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { t } = useI18n()
  const [customization, setCustomization] = useState("")
  const [added, setAdded] = useState(false)

  const categoryKey = `category.${product.category}` as Parameters<typeof t>[0]

  const handleAddToCart = () => {
    addToCart(product, customization || undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("productDetail.backToShop")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary/20">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            {t(categoryKey)}
          </span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {product.name}
          </h1>
          <p className="mt-2 text-3xl font-serif font-bold text-foreground">
            ${product.price}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Customization */}
          <div className="mt-8 space-y-4">
            <div>
              <Label htmlFor="customization" className="text-sm font-medium text-foreground">
                {t("productDetail.personalization")}
              </Label>
              <Input
                id="customization"
                placeholder={t("productDetail.personalizationPlaceholder")}
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {t("productDetail.personalizationHint")}
              </p>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8 flex gap-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 gap-2 text-base"
              disabled={added}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  {t("productDetail.addedToCart")}
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  {t("product.addToCart")}
                </>
              )}
            </Button>
          </div>

          {/* Details */}
          <div className="mt-10 space-y-4 border-t border-border pt-8">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {t("productDetail.details")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {t("productDetail.detail1")}
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {t("productDetail.detail2")}
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {t("productDetail.detail3")}
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                {t("productDetail.detail4")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
