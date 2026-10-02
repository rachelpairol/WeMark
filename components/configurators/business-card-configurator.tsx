"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImagePlus, MessageCircle, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-context"
import { usePhotos } from "@/lib/photos-context"
import { useI18n } from "@/lib/i18n"

type OrderType = "new" | "reprint"
type Quantity = "100" | "250" | "500"
type DesignSource = "final" | "reference" | "contact"

const PRICES: Record<OrderType, Record<Quantity, number>> = {
  new: { "100": 65, "250": 80, "500": 100 },
  reprint: { "100": 35, "250": 50, "500": 65 },
}

const QUANTITIES: Quantity[] = ["100", "250", "500"]
const MAX_FILES = 5

export function BusinessCardConfigurator() {
  const { addToCart } = useCart()
  const { addPhotos } = usePhotos()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"
  const fileRef = useRef<HTMLInputElement>(null)

  const [orderType, setOrderType] = useState<OrderType>("new")
  const [quantity, setQuantity] = useState<Quantity>("100")
  const [designSource, setDesignSource] = useState<DesignSource | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [businessName, setBusinessName] = useState("")
  const [contact, setContact] = useState("")
  const [details, setDetails] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const price = PRICES[orderType][quantity]

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles = Array.from(fileList)
    const combined = [...files, ...newFiles].slice(0, MAX_FILES)
    setFiles(combined)
    const newPreviews = combined.map((f) => URL.createObjectURL(f))
    setPreviews((prev) => {
      prev.forEach(URL.revokeObjectURL)
      return newPreviews
    })
  }

  const removeFile = (i: number) => {
    URL.revokeObjectURL(previews[i])
    setFiles((prev) => prev.filter((_, idx) => idx !== i))
    setPreviews((prev) => prev.filter((_, idx) => idx !== i))
  }

  const handleAddToCart = () => {
    if (!businessName.trim()) {
      setError(es ? "Escribe el nombre del negocio." : "Write the business name.")
      return
    }
    if (!designSource) {
      setError(es ? "Elige cómo nos compartirás el diseño." : "Choose how you'll share the design.")
      return
    }
    if ((designSource === "final" || designSource === "reference") && files.length === 0) {
      setError(es ? "Sube al menos un archivo." : "Upload at least one file.")
      return
    }

    setAdding(true)
    setError(null)

    if (files.length > 0) {
      addPhotos(files)
    }

    const designLabel =
      designSource === "final"
        ? `${es ? "Diseño final subido" : "Final design uploaded"} (${files.length} ${es ? "archivo(s)" : "file(s)"})`
        : designSource === "reference"
        ? `${es ? "Referencia subida" : "Reference uploaded"} (${files.length} ${es ? "archivo(s)" : "file(s)"})`
        : es ? "Prefiere que lo contactemos para decidir el diseño" : "Prefers we contact them to decide the design"

    const customization = [
      `${es ? "Tipo" : "Type"}: ${orderType === "new" ? (es ? "Primera vez (incluye diseño)" : "First time (design included)") : (es ? "Reimpresión (mismo diseño)" : "Reprint (same design)")}`,
      `${es ? "Cantidad" : "Quantity"}: ${quantity} ${es ? "tarjetas" : "cards"}`,
      `${es ? "Diseño" : "Design"}: ${designLabel}`,
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

          {/* Design source */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
              {es ? "3. ¿Cómo nos compartes el diseño?" : "3. How will you share the design?"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {es
                ? "Puedes subir el diseño final listo para imprimir, o un ejemplo de lo que te gustaría — o preferir que te contactemos."
                : "You can upload the final print-ready design, an example of what you'd like — or prefer we contact you."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setDesignSource("final")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  designSource === "final" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Tengo el diseño final" : "I have the final design"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Listo para imprimir" : "Ready to print"}
                </span>
              </button>
              <button
                onClick={() => setDesignSource("reference")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  designSource === "reference" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Tengo un ejemplo" : "I have an example"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Referencia de lo que quiero" : "Reference of what I want"}
                </span>
              </button>
              <button
                onClick={() => setDesignSource("contact")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  designSource === "contact" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">
                  {es ? "Contáctenme" : "Contact me"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Prefiero decidir el diseño con ustedes" : "I'd rather decide the design together"}
                </span>
              </button>
            </div>

            {(designSource === "final" || designSource === "reference") && (
              <div className="mt-4">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                {files.length < MAX_FILES && (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                  >
                    <ImagePlus className="h-8 w-8" />
                    <p className="text-sm font-medium">
                      {es ? "Haz click para subir archivos" : "Click to upload files"}
                    </p>
                    <p className="text-xs">
                      {es ? `${files.length}/${MAX_FILES} archivos — JPG, PNG` : `${files.length}/${MAX_FILES} files — JPG, PNG`}
                    </p>
                  </button>
                )}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {previews.map((src, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                        <Image src={src} alt={`File ${i + 1}`} fill className="object-cover" sizes="100px" />
                        <button
                          onClick={() => removeFile(i)}
                          className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {designSource === "contact" && (
              <div className="mt-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">
                  {es
                    ? "Perfecto — te contactaremos con el teléfono o email que nos dejes abajo para decidir el diseño juntos antes de imprimir."
                    : "Perfect — we'll reach out using the phone or email you leave below to decide on the design together before printing."}
                </p>
              </div>
            )}
          </div>

          {/* Business details */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "4. Datos del negocio" : "4. Business details"}
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
                  {es ? "Algo más que debamos saber (opcional)" : "Anything else we should know (optional)"}
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
              {designSource && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{es ? "Diseño" : "Design"}</span>
                  <span className="font-medium">
                    {designSource === "final"
                      ? (es ? "Archivo subido" : "File uploaded")
                      : designSource === "reference"
                      ? (es ? "Referencia" : "Reference")
                      : (es ? "A coordinar" : "To coordinate")}
                  </span>
                </div>
              )}
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
