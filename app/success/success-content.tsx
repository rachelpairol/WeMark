"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

export function SuccessContent() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (sessionId) {
      clearCart()
    }
  }, [sessionId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-muted-foreground">No order found.</p>
        <Button asChild className="mt-4">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-10 w-10 text-primary" />
        </div>
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Order Confirmed!
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Thank you for your order. We&apos;ve received your payment and will begin crafting your personalized shadow box right away.
      </p>
      <p className="mt-3 text-sm text-muted-foreground bg-secondary/40 rounded-lg px-4 py-2">
        📧 Check your email for a confirmation. If you don&apos;t see it, check your <strong>spam folder</strong> and mark it as &ldquo;Not spam&rdquo;.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 text-left">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Confirmation</span>
          </div>
          <p className="text-xs text-muted-foreground">
            A receipt has been sent to your email.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Shipping</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your order ships within 3–5 business days.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild size="lg">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
