"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"

const OCCASIONS = [
  { id: "birthday", labelEn: "Birthday", labelEs: "Cumpleaños" },
  { id: "anniversary", labelEn: "Anniversary", labelEs: "Aniversario" },
  { id: "for-him", labelEn: "For Him", labelEs: "Para Él" },
  { id: "special-date", labelEn: "Special Date", labelEs: "Fecha Especial" },
  { id: "other", labelEn: "Other", labelEs: "Otro" },
]

const BASE_PRICE = 60
const PLUSH_ADDON = 10
const BREAKFAST_ADDON = 20

export function SurpriseGiftConfigurator() {
  const { addToCart } = useCart()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"

  const [occasion, setOccasion] = useState("birthday")
  const [plush, setPlush] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [personalization, setPersonalization] = useState("")
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const total = BASE_PRICE + (plush ? PLUSH_ADDON : 0) + (breakfast ? BREAKFAST_ADDON : 0)

  const handleAddToCart = () => {
    if (!personalization.trim()) {
      setError(es ? "Escribe el nombre o mensaje a personalizar." : "Write the name or message to personalize.")
      return
    }
    setAdding(true)
    setError(null)

    const selectedOccasion = OCCASIONS.find((o) => o.id === occasion)!
    const customization = [
      `${es ? "Ocasión" : "Occasion"}: ${es ? selectedOccasion.labelEs : selectedOccasion.labelEn}`,
      plush ? (es ? "Peluche personalizado incluido" : "Custom plush toy included") : null,
      breakfast ? (es ? "Bandeja de desayuno incluida" : "Breakfast tray included") : null,
      `${es ? "Personalización" : "Personalization"}: "${personalization.trim()}"`,
      `${es ? "Entrega" : "Fulfillment"}: ${fulfillment === "pickup" ? (es ? "Pickup" : "Pickup") : (es ? "Delivery" : "Delivery")}`,
    ].filter(Boolean).join(" · ")

    addToCart(
      {
        id: `surprise-gift-${Date.now()}`,
        name: es ? "Regalo Sorpresa Personalizado" : "Custom Surprise Gift",
        price: total,
        image: "/Images/regalos-sorpresa.png",
        category: "Custom",
        description: customization,
      },
      customization
    )
    router.push("/cart")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Occasion */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "1. Ocasión" : "1. Occasion"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OCCASIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOccasion(o.id)}
                  className={`rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                    occasion === o.id ? "border-primary bg-primary/10 shadow-md text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {es ? o.labelEs : o.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "2. ¿Qué incluye?" : "2. What's included?"}
            </h2>
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 mb-3">
              <p className="font-medium text-foreground">
                🎈 {es ? "Decoración de globos" : "Balloon décor"}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {es ? "Incluido siempre — la base de tu regalo sorpresa" : "Always included — the base of your surprise gift"}
              </p>
            </div>
            <button
              onClick={() => setPlush((p) => !p)}
              className={`w-full flex items-center justify-between rounded-xl border-2 p-4 transition-all text-left mb-3 ${
                plush ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <div>
                <p className="font-medium text-foreground">
                  🧸 {es ? "Peluche personalizado" : "Custom plush toy"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {es ? "Con el nombre bordado o impreso" : "With the name embroidered or printed"}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-primary">+${PLUSH_ADDON}</span>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  plush ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {plush && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
            </button>
            <button
              onClick={() => setBreakfast((b) => !b)}
              className={`w-full flex items-center justify-between rounded-xl border-2 p-4 transition-all text-left ${
                breakfast ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <div>
                <p className="font-medium text-foreground">
                  🥐 {es ? "Bandeja de desayuno" : "Breakfast tray"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {es ? "Snacks y detalles dulces para sorprender" : "Snacks and sweet details to surprise them"}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-primary">+${BREAKFAST_ADDON}</span>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  breakfast ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {breakfast && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
            </button>
          </div>

          {/* Personalization */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "3. Nombre o mensaje" : "3. Name or message"}
            </h2>
            <Label htmlFor="personalization" className="text-sm text-muted-foreground">
              {es ? "¿Qué nombre o mensaje quieres personalizar?" : "What name or message do you want personalized?"}
            </Label>
            <Input
              id="personalization"
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value)}
              placeholder={es ? 'Ej: "Feliz Cumpleaños Andrea"' : 'E.g. "Happy Birthday Andrea"'}
              maxLength={60}
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">{personalization.length}/60</p>
          </div>

          {/* Fulfillment */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "4. Pickup o Delivery" : "4. Pickup or Delivery"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFulfillment("pickup")}
                className={`rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                  fulfillment === "pickup" ? "border-primary bg-primary/10 shadow-md text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {es ? "Pickup" : "Pickup"}
              </button>
              <button
                onClick={() => setFulfillment("delivery")}
                className={`rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                  fulfillment === "delivery" ? "border-primary bg-primary/10 shadow-md text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {es ? "Delivery" : "Delivery"}
              </button>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "Tu regalo sorpresa" : "Your surprise gift"}
            </h2>

            <div className="rounded-lg bg-secondary/30 p-4 space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Ocasión" : "Occasion"}</span>
                <span className="font-medium">{es ? OCCASIONS.find((o) => o.id === occasion)?.labelEs : OCCASIONS.find((o) => o.id === occasion)?.labelEn}</span>
              </div>
              {personalization && (
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground shrink-0">{es ? "Mensaje" : "Message"}</span>
                  <span className="font-medium text-right truncate max-w-[140px]">&ldquo;{personalization}&rdquo;</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Entrega" : "Fulfillment"}</span>
                <span className="font-medium capitalize">{fulfillment}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{es ? "Globos (base)" : "Balloons (base)"}</span>
                <span>${BASE_PRICE}</span>
              </div>
              {plush && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{es ? "Peluche" : "Plush toy"}</span>
                  <span>+${PLUSH_ADDON}</span>
                </div>
              )}
              {breakfast && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{es ? "Desayuno" : "Breakfast"}</span>
                  <span>+${BREAKFAST_ADDON}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-3 mt-3">
                <span className="font-serif text-lg font-semibold text-foreground">Total</span>
                <span className="font-serif text-2xl font-bold text-primary">${total}</span>
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button onClick={handleAddToCart} disabled={adding} className="w-full mt-5 gap-2" size="lg">
              <ShoppingBag className="h-4 w-4" />
              {es ? "Agregar al carrito" : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
