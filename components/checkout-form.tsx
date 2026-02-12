"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const { t } = useI18n()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shipping = totalPrice >= 100 ? 0 : 12
  const total = totalPrice + shipping

  if (items.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{t("checkout.orderConfirmed")}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {t("checkout.orderConfirmedDesc")}
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/shop">{t("cart.continueShopping")}</Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    clearCart()
    setOrderPlaced(true)
    setIsSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("checkout.backToCart")}
      </Link>

      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{t("checkout.title")}</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Fields */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Info */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {t("checkout.contactInfo")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t("checkout.firstName")}</Label>
                <Input id="firstName" required placeholder="Jane" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">{t("checkout.lastName")}</Label>
                <Input id="lastName" required placeholder="Doe" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">{t("checkout.email")}</Label>
                <Input id="email" type="email" required placeholder="jane@example.com" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">{t("checkout.phone")}</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="mt-1" />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {t("checkout.shippingAddress")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="address">{t("checkout.streetAddress")}</Label>
                <Input id="address" required placeholder="123 Main St" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address2">{t("checkout.apt")}</Label>
                <Input id="address2" placeholder="Apt 4B" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="city">{t("checkout.city")}</Label>
                <Input id="city" required placeholder="Miami" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="state">{t("checkout.state")}</Label>
                <Input id="state" required placeholder="FL" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="zip">{t("checkout.zip")}</Label>
                <Input id="zip" required placeholder="33101" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="country">{t("checkout.country")}</Label>
                <Input id="country" required defaultValue="United States" className="mt-1" />
              </div>
            </div>
          </div>

          {/* Payment placeholder */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {t("checkout.paymentInfo")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="cardNumber">{t("checkout.cardNumber")}</Label>
                <Input id="cardNumber" required placeholder="1234 5678 9012 3456" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="expiry">{t("checkout.expiry")}</Label>
                <Input id="expiry" required placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cvc">{t("checkout.cvc")}</Label>
                <Input id="cvc" required placeholder="123" className="mt-1" />
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              {t("checkout.paymentSecure")}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.customization || ""}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between">
                  <span className="font-serif font-semibold text-foreground">Total</span>
                  <span className="font-serif text-xl font-bold text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6 gap-2"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
              {!isSubmitting && <Lock className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
