"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, X, Check, Loader2, ShoppingBag, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/components/cart-context"
import { useI18n } from "@/lib/i18n"

const SHAPES = [
  { id: "heart",     labelEn: "Heart",         labelEs: "Corazón",          emoji: "❤️" },
  { id: "butterfly", labelEn: "Butterfly",     labelEs: "Mariposa",         emoji: "🦋" },
  { id: "full",      labelEn: "Fully Filled",  labelEs: "Relleno Completo", emoji: "🌸" },
  { id: "animal",    labelEn: "Animal Shape",  labelEs: "Figura de Animal", emoji: "🐾" },
]

const COLORS = [
  { id: "pink",       labelEn: "Pink",       labelEs: "Rosa",       hex: "#F4A8B5" },
  { id: "red",        labelEn: "Red",        labelEs: "Rojo",       hex: "#E05252" },
  { id: "white",      labelEn: "White",      labelEs: "Blanco",     hex: "#F5F0EB" },
  { id: "purple",     labelEn: "Purple",     labelEs: "Morado",     hex: "#B39DDB" },
  { id: "coral",      labelEn: "Coral",      labelEs: "Coral",      hex: "#FF8A65" },
  { id: "yellow",     labelEn: "Yellow",     labelEs: "Amarillo",   hex: "#FFD54F" },
  { id: "burgundy",   labelEn: "Burgundy",   labelEs: "Vino",       hex: "#7B2D2D" },
  { id: "multicolor", labelEn: "Multicolor", labelEs: "Multicolor", hex: "multicolor" },
]

const BASE_PRICE = 50
const LIGHTS_PRICE = 15
const PHOTOS_FEW_PRICE = 10   // 1–5 photos
const PHOTOS_MANY_PRICE = 15  // 6–15 photos
const MAX_PHOTOS = 15

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  if (!cloudName || !preset) throw new Error("Cloudinary not configured")
  const fd = new FormData()
  fd.append("file", file)
  fd.append("upload_preset", preset)
  fd.append("folder", "wemark-orders")
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST", body: fd,
  })
  const data = await res.json()
  if (!data.secure_url) throw new Error("Upload failed")
  return data.secure_url
}

export function ShadowBoxConfigurator() {
  const { addToCart } = useCart()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"
  const fileRef = useRef<HTMLInputElement>(null)

  const [shape, setShape] = useState("heart")
  const [color, setColor] = useState("pink")
  const [phrase, setPhrase] = useState("")
  const [lights, setLights] = useState(false)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const photosAddon = photoFiles.length === 0 ? 0
    : photoFiles.length <= 5 ? PHOTOS_FEW_PRICE
    : PHOTOS_MANY_PRICE
  const total = BASE_PRICE + (lights ? LIGHTS_PRICE : 0) + photosAddon

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files)
    const combined = [...photoFiles, ...newFiles].slice(0, MAX_PHOTOS)
    setPhotoFiles(combined)
    const newPreviews = combined.map(f => URL.createObjectURL(f))
    setPreviews(prev => { prev.forEach(URL.revokeObjectURL); return newPreviews })
  }

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(previews[i])
    setPhotoFiles(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleAddToCart = async () => {
    setAdding(true)
    setError(null)
    try {
      let photoUrls: string[] = []
      if (photoFiles.length > 0) {
        photoUrls = await Promise.all(photoFiles.map(uploadToCloudinary))
      }

      const selectedShape = SHAPES.find(s => s.id === shape)!
      const selectedColor = COLORS.find(c => c.id === color)!
      const customization = [
        `${es ? "Forma" : "Shape"}: ${es ? selectedShape.labelEs : selectedShape.labelEn}`,
        `${es ? "Color" : "Color"}: ${es ? selectedColor.labelEs : selectedColor.labelEn}`,
        phrase ? `${es ? "Frase" : "Phrase"}: "${phrase}"` : null,
        lights ? (es ? "Luces LED incluidas" : "LED lights included") : null,
        photoFiles.length > 0 ? `${photoFiles.length} ${es ? "foto(s)" : "photo(s)"}` : null,
      ].filter(Boolean).join(" · ")

      addToCart(
        {
          id: `custom-shadow-box-${Date.now()}`,
          name: es ? "Cuadro Shadow Box Personalizado" : "Custom Shadow Box",
          price: total,
          image: "/Images/mom-shadow-box-roses.jpeg",
          category: "Custom",
          description: customization,
        },
        customization,
        photoUrls
      )
      router.push("/cart")
    } catch (err) {
      setError(err instanceof Error ? err.message : (es ? "Error al procesar. Intenta de nuevo." : "Error processing. Please try again."))
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Options ─────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Shape */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "1. Elige la forma" : "1. Choose the shape"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SHAPES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    shape === s.id
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="text-3xl">{s.emoji}</span>
                  <span className="text-xs font-medium text-foreground text-center leading-tight">
                    {es ? s.labelEs : s.labelEn}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {es
                ? "Todos los cuadros son de 12×12 pulgadas. Para otros tamaños contáctanos."
                : "All shadow boxes are 12×12 inches. For other sizes please contact us."}
            </p>
          </div>

          {/* Color */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "2. Color de las flores" : "2. Flower color"}
            </h2>
            <div className="flex flex-wrap gap-3">
              {COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  title={es ? c.labelEs : c.labelEn}
                  className={`relative h-11 w-11 rounded-full border-2 transition-all ${
                    color === c.id ? "border-primary scale-110 shadow-md" : "border-transparent hover:scale-105"
                  }`}
                  style={{
                    background: c.id === "multicolor"
                      ? "linear-gradient(135deg, #F4A8B5 0%, #B39DDB 25%, #FFD54F 50%, #FF8A65 75%, #E05252 100%)"
                      : c.hex,
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
                ? `Seleccionado: ${COLORS.find(c => c.id === color)?.labelEs}`
                : `Selected: ${COLORS.find(c => c.id === color)?.labelEn}`}
            </p>
          </div>

          {/* Phrase */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "3. Frase personalizada" : "3. Personal phrase"}
            </h2>
            <Label htmlFor="phrase" className="text-sm text-muted-foreground">
              {es
                ? "Escribe la frase que quieres en la parte delantera del cuadro"
                : "Write the phrase you want on the front of the frame"}
            </Label>
            <Input
              id="phrase"
              value={phrase}
              onChange={e => setPhrase(e.target.value)}
              placeholder={es ? 'Ej: "Te amo mamá" · "Happy Birthday Sarah"' : 'E.g. "Happy Birthday Sarah" · "You are my sunshine"'}
              maxLength={80}
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">{phrase.length}/80</p>
          </div>

          {/* Lights */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "4. Opciones adicionales" : "4. Add-ons"}
            </h2>
            <button
              onClick={() => setLights(l => !l)}
              className={`w-full flex items-center justify-between rounded-xl border-2 p-4 transition-all text-left ${
                lights ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <div>
                <p className="font-medium text-foreground">
                  {es ? "💡 Luces LED" : "💡 LED Lights"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {es
                    ? "Iluminación que resalta las flores del cuadro"
                    : "Lighting that highlights the flowers beautifully"}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-primary">+${LIGHTS_PRICE}</span>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  lights ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {lights && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
            </button>
          </div>

          {/* Photos */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
              {es ? "5. Fotos (opcional)" : "5. Photos (optional)"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {es
                ? `1–5 fotos: +$${PHOTOS_FEW_PRICE} · 6–15 fotos: +$${PHOTOS_MANY_PRICE} · Máximo ${MAX_PHOTOS} fotos`
                : `1–5 photos: +$${PHOTOS_FEW_PRICE} · 6–15 photos: +$${PHOTOS_MANY_PRICE} · Max ${MAX_PHOTOS} photos`}
            </p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />

            {photoFiles.length < MAX_PHOTOS && (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
              >
                <ImagePlus className="h-8 w-8" />
                <p className="text-sm font-medium">
                  {es ? "Haz click para subir fotos" : "Click to upload photos"}
                </p>
                <p className="text-xs">
                  {es
                    ? `${photoFiles.length}/${MAX_PHOTOS} fotos — JPG, PNG, WEBP`
                    : `${photoFiles.length}/${MAX_PHOTOS} photos — JPG, PNG, WEBP`}
                </p>
              </button>
            )}

            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                    <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="100px" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-destructive/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Price summary (sticky) ──────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "Tu cuadro" : "Your shadow box"}
            </h2>

            {/* Preview info */}
            <div className="rounded-lg bg-secondary/30 p-4 space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Forma" : "Shape"}</span>
                <span className="font-medium">{es ? SHAPES.find(s => s.id === shape)?.labelEs : SHAPES.find(s => s.id === shape)?.labelEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Color" : "Color"}</span>
                <span className="font-medium flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full border border-border" style={{
                    background: COLORS.find(c => c.id === color)?.id === "multicolor"
                      ? "linear-gradient(135deg, #F4A8B5, #B39DDB, #FFD54F)"
                      : COLORS.find(c => c.id === color)?.hex
                  }} />
                  {es ? COLORS.find(c => c.id === color)?.labelEs : COLORS.find(c => c.id === color)?.labelEn}
                </span>
              </div>
              {phrase && (
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground shrink-0">{es ? "Frase" : "Phrase"}</span>
                  <span className="font-medium text-right truncate max-w-[140px]">&ldquo;{phrase}&rdquo;</span>
                </div>
              )}
              {photoFiles.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{es ? "Fotos" : "Photos"}</span>
                  <span className="font-medium">{photoFiles.length}</span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{es ? "Precio base" : "Base price"}</span>
                <span>${BASE_PRICE}</span>
              </div>
              {lights && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">LED Lights</span>
                  <span>+${LIGHTS_PRICE}</span>
                </div>
              )}
              {photoFiles.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {photoFiles.length} {es ? "foto(s)" : "photo(s)"}
                  </span>
                  <span>+${photosAddon}</span>
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

            <Button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full mt-5 gap-2"
              size="lg"
            >
              {adding ? (
                <><Loader2 className="h-4 w-4 animate-spin" />{es ? "Procesando..." : "Processing..."}</>
              ) : (
                <><ShoppingBag className="h-4 w-4" />{es ? "Agregar al carrito" : "Add to cart"}</>
              )}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              {es
                ? "Tamaño: 12×12 pulg · Hecho a mano con amor 🌸"
                : "Size: 12×12 in · Handcrafted with love 🌸"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
