"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"

type OrderType = "new" | "reprint"
type Quantity = "100" | "250" | "500"

const PRICES: Record<OrderType, Record<Quantity, number>> = {
  new: { "100": 65, "250": 80, "500": 100 },
  reprint: { "100": 35, "250": 50, "500": 65 },
}

const QUANTITIES: Quantity[] = ["100", "250", "500"]

export function BusinessCardConfigurator() {
  const { addToCart } = useCart()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"

  const [orderType, setOrderType] = useState<OrderType>("new")
  const [quantity, setQuantity] = useState<Quantity>("100")
  const [businessName, setBusinessName] = useState("")
  const [contact, setContact] = useState("")
  const [details, setDetails] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const price = PRICES[orderType][quantity]

  const handleAddToCart = () => {
    if (!businessName.trim()) {
      setError(es ? "Escribe el nombre del negocio." : "Write the business name.")
      return
    }
    setAdding(true)
    setError(null)

    const customization = [
      `${es ? "Tipo" : "Type"}: ${orderType === "new" ? (es ? "Primera vez (incluye diseño)" : "First time (design included)") : (es ? "Reimpresión (mismo diseño)" : "Reprint (same design)")}`,
      `${es ? "Cantidad" : "Quantity"}: ${quantity} ${es ? "tarjetas" : "cards"}`,
      `${es ? "Negocio" : "Business"}: ${businessName.trim()}`,
      contact.trim() ? `${es ? "Contacto" : "Contact"}: ${contact.trim()}` : null,
      details.trim() ? `${es ? "Detalles" : "Details"}: ${details.trim()}` : null,
    ].filter(Boolean).join(" · ")

    addToCart(
      {
        id: `business-cards-${Date.now()}`,
        name: es ? "Tarjetas de Presentación" : "Business Cards",
        price,
        image: "/Images/tarjetas.jpg.jpeg",
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
          {/* Order type */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "1. ¿Primera vez o reimpresión?" : "1. First time or reprint?"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setOrderType("new")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  orderType === "new" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Primera vez" : "First time"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Incluye diseño personalizado y hasta 2 revisiones" : "Includes custom design and up to 2 revisions"}
                </span>
              </button>
              <button
                onClick={() => setOrderType("reprint")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  orderType === "reprint" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Reimpresión" : "Reprint"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Mismo diseño ya aprobado — sin costo de diseño" : "Same approved design — no design cost"}
                </span>
              </button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "2. Cantidad" : "2. Quantity"}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {QUANTITIES.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all ${
                    quantity === q ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{q}</span>
                  <span className="text-sm text-primary font-semibold">${PRICES[orderType][q]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Business details */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {orderType === "new"
                ? (es ? "3. Datos para el diseño" : "3. Design details")
                : (es ? "3. Datos del pedido" : "3. Order details")}
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName" className="text-sm text-muted-foreground">
                  {es ? "Nombre del negocio" : "Business name"}
                </Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={es ? "Ej: WeMark Studio" : "E.g. WeMark Studio"}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="contact" className="text-sm text-muted-foreground">
                  {es ? "Teléfono, email o redes a incluir" : "Phone, email or social media to include"}
                </Label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={es ? "(555) 123-4567 · hola@negocio.com" : "(555) 123-4567 · hello@business.com"}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="details" className="text-sm text-muted-foreground">
                  {orderType === "new"
                    ? (es ? "Cuéntanos sobre tu negocio — colores, estilo, logo" : "Tell us about your business — colors, style, logo")
                    : (es ? "¿Alguna actualización al diseño anterior? (opcional)" : "Any update to the previous design? (optional)")}
                </Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "Tus tarjetas" : "Your business cards"}
            </h2>

            <div className="rounded-lg bg-secondary/30 p-4 space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Tipo" : "Type"}</span>
                <span className="font-medium">
                  {orderType === "new" ? (es ? "Primera vez" : "First time") : (es ? "Reimpresión" : "Reprint")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Cantidad" : "Quantity"}</span>
                <span className="font-medium">{quantity}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between border-t border-border pt-3 mt-3">
                <span className="font-serif text-lg font-semibold text-foreground">Total</span>
                <span className="font-serif text-2xl font-bold text-primary">${price}</span>
              </div>
            </div>

            {orderType === "new" && (
              <p className="mt-3 text-xs text-muted-foreground">
                {es
                  ? "Incluye diseño, hasta 2 revisiones menores e impresión a color por ambos lados. Reimpresiones futuras con este mismo diseño tendrán un costo menor."
                  : "Includes design, up to 2 minor revisions and double-sided color printing. Future reprints with this same design will cost less."}
              </p>
            )}

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
