"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"

export function CartContent() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const { t } = useI18n()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{t("cart.empty.title")}</h1>
        <p className="mt-4 text-muted-foreground">
          {t("cart.empty.description")}
        </p>
        <Button asChild className="mt-8 gap-2" size="lg">
          <Link href="/shop">
            {t("cart.empty.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{t("cart.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {totalItems} {totalItems === 1 ? t("cart.item") : t("cart.items")}
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.customization || ""}`}
              className="flex gap-4 p-4 rounded-lg border border-border bg-card"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-semibold text-foreground">
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                    {item.customization && (
                      <p className="text-xs text-primary mt-1">
                        {t("cart.personalization")} {item.customization}
                      </p>
                    )}
                  </div>
                  <span className="font-serif font-bold text-foreground">
                    ${item.price * item.quantity}
                  </span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-8 text-center text-sm font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-accent"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              {t("cart.orderSummary")}
            </h2>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.shipping")}</span>
                <span className="text-foreground font-medium">
                  {totalPrice >= 100 ? t("cart.shippingFree") : "$12.00"}
                </span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-serif font-semibold text-foreground">{t("cart.total")}</span>
                  <span className="font-serif text-xl font-bold text-foreground">
                    ${(totalPrice + (totalPrice >= 100 ? 0 : 12)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {totalPrice < 100 && (
              <p className="mt-3 text-xs text-muted-foreground">
                {t("cart.addMore")} ${(100 - totalPrice).toFixed(2)} {t("cart.freeShippingHint")}
              </p>
            )}
            <Button asChild className="w-full mt-6 gap-2" size="lg">
              <Link href="/checkout">
                {t("cart.proceedToCheckout")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full mt-2 bg-transparent" size="sm">
              <Link href="/shop">{t("cart.continueShopping")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
