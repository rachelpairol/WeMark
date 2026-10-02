"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, MessageCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"
import { services } from "@/lib/services"
import { QuoteDialog } from "@/components/quote-dialog"

const COLORS = [
  { id: "white", labelEn: "White", labelEs: "Blanco", hex: "#F5F5F0" },
  { id: "black", labelEn: "Black", labelEs: "Negro", hex: "#1A1A1A" },
  { id: "gray", labelEn: "Gray", labelEs: "Gris", hex: "#9CA3AF" },
  { id: "pink", labelEn: "Pink", labelEs: "Rosa", hex: "#F4A8B5" },
  { id: "red", labelEn: "Red", labelEs: "Rojo", hex: "#E05252" },
  { id: "navy", labelEn: "Navy", labelEs: "Azul Marino", hex: "#1E3A5F" },
]

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

const BASE_PRICE = 30

export function TshirtConfigurator() {
  const { addToCart } = useCart()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"

  const [needsDesign, setNeedsDesign] = useState<boolean | null>(null)
  const [color, setColor] = useState("white")
  const [size, setSize] = useState("M")
  const [text, setText] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuote, setShowQuote] = useState(false)

  const tshirtService = services.find((s) => s.id === "custom-tshirts")!

  const handleAddToCart = () => {
    if (!text.trim()) {
      setError(es ? "Escribe el nombre o frase para la camiseta." : "Write the name or phrase for the shirt.")
      return
    }
    setAdding(true)
    setError(null)

    const selectedColor = COLORS.find((c) => c.id === color)!
    const customization = [
      `${es ? "Color" : "Color"}: ${es ? selectedColor.labelEs : selectedColor.labelEn}`,
      `${es ? "Talla" : "Size"}: ${size}`,
      `${es ? "Texto" : "Text"}: "${text.trim()}"`,
    ].join(" · ")

    addToCart(
      {
        id: `custom-tshirt-${Date.now()}`,
        name: es ? "Camiseta Personalizada" : "Custom T-Shirt",
        price: BASE_PRICE,
        image: "/Images/camisetas.jpg",
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
          {/* What do you need */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "1. ¿Qué necesitas?" : "1. What do you need?"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setNeedsDesign(false)}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  needsDesign === false ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Solo nombre o frase" : "Just a name or phrase"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Texto en vinyl, listo para imprimir — precio fijo" : "Text in vinyl, ready to print — fixed price"}
                </span>
              </button>
              <button
                onClick={() => setNeedsDesign(true)}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  needsDesign === true ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Un diseño, logo o dibujo" : "A design, logo or artwork"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Necesitamos cotizarlo aparte" : "We need to quote this separately"}
                </span>
              </button>
            </div>
          </div>

          {needsDesign === true && (
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
              <p className="text-sm text-foreground leading-relaxed">
                {es
                  ? "Si necesitas que diseñemos un logo, dibujo o arte personalizado, ese trabajo se cobra aparte. Cuéntanos qué necesitas y te respondemos con el precio en menos de 24 horas."
                  : "If you need us to design a custom logo, drawing or artwork, that work is billed separately. Tell us what you need and we'll reply with pricing within 24 hours."}
              </p>
              <Button className="mt-4 gap-2" onClick={() => setShowQuote(true)}>
                <MessageCircle className="h-4 w-4" />
                {es ? "Solicitar cotización" : "Request a quote"}
              </Button>
            </div>
          )}

          {needsDesign === false && (
            <>
              {/* Color */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {es ? "2. Color de la camiseta" : "2. T-shirt color"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColor(c.id)}
                      title={es ? c.labelEs : c.labelEn}
                      className={`relative h-11 w-11 rounded-full border-2 transition-all ${
                        color === c.id ? "border-primary scale-110 shadow-md" : "border-transparent hover:scale-105"
                      }`}
                      style={{
                        background: c.hex,
                        ...(c.id === "white" && { border: "2px solid #e2e8f0" }),
                      }}
                    >
                      {color === c.id && (
                        <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-medium">
                  {es
                    ? `Seleccionado: ${COLORS.find((c) => c.id === color)?.labelEs}`
                    : `Selected: ${COLORS.find((c) => c.id === color)?.labelEn}`}
                </p>
              </div>

              {/* Size */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {es ? "3. Talla" : "3. Size"}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-xl border-2 py-3 text-sm font-medium transition-all ${
                        size === s ? "border-primary bg-primary/10 shadow-md text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {es ? "4. Nombre o frase" : "4. Name or phrase"}
                </h2>
                <Label htmlFor="text" className="text-sm text-muted-foreground">
                  {es ? "Escribe exactamente lo que quieres en la camiseta" : "Write exactly what you want on the shirt"}
                </Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={es ? 'Ej: "Rivera" · "Team Bride"' : 'E.g. "Rivera" · "Team Bride"'}
                  maxLength={40}
                  className="mt-2"
                />
                <p className="mt-1 text-xs text-muted-foreground text-right">{text.length}/40</p>
              </div>
            </>
          )}
        </div>

        {/* Price summary */}
        {needsDesign === false && (
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                {es ? "Tu camiseta" : "Your t-shirt"}
              </h2>

              <div className="rounded-lg bg-secondary/30 p-4 space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{es ? "Color" : "Color"}</span>
                  <span className="font-medium flex items-center gap-1.5">
                    <span className="inline-block h-3 w-3 rounded-full border border-border" style={{ background: COLORS.find((c) => c.id === color)?.hex }} />
                    {es ? COLORS.find((c) => c.id === color)?.labelEs : COLORS.find((c) => c.id === color)?.labelEn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{es ? "Talla" : "Size"}</span>
                  <span className="font-medium">{size}</span>
                </div>
                {text && (
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground shrink-0">{es ? "Texto" : "Text"}</span>
                    <span className="font-medium text-right truncate max-w-[140px]">&ldquo;{text}&rdquo;</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between border-t border-border pt-3 mt-3">
                  <span className="font-serif text-lg font-semibold text-foreground">Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">${BASE_PRICE}</span>
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
        )}
      </div>

      <QuoteDialog
        service={showQuote ? tshirtService : null}
        open={showQuote}
        onClose={() => setShowQuote(false)}
        locale={locale}
      />
    </div>
  )
}
