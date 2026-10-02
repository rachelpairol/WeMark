"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FileText, ImagePlus, MessageCircle, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/components/cart-context"
import { usePhotos } from "@/lib/photos-context"
import { useI18n } from "@/lib/i18n"
import { services } from "@/lib/services"
import { QuoteDialog } from "@/components/quote-dialog"
import {
  CARD_STYLES,
  QUANTITIES,
  PRINTING_SIDES,
  QR_TYPES,
  QR_TYPES_REQUIRING_URL,
  getBusinessCardPrice,
  type CardStyleId,
  type OrderType,
  type DesignOption,
  type PrintingSidesId,
  type Quantity,
  type QrType,
} from "@/lib/business-card-config"

const FILE_ACCEPT = "application/pdf,image/png,image/jpeg"

function renameFile(file: File, prefix: string) {
  return new File([file], `${prefix}-${file.name}`, { type: file.type })
}

function isValidUrlish(value: string) {
  try {
    new URL(value.startsWith("http") ? value : `https://${value}`)
    return true
  } catch {
    return false
  }
}

function FileSlot({
  label,
  helpText,
  value,
  onChange,
  es,
}: {
  label: string
  helpText?: string
  value: File | null
  onChange: (f: File | null) => void
  es: boolean
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!value || !value.type.startsWith("image/")) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  return (
    <div>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <input
        ref={ref}
        type="file"
        accept={FILE_ACCEPT}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {!value ? (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="mt-2 w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
        >
          <ImagePlus className="h-6 w-6" />
          <span className="text-sm font-medium">{es ? "Haz click para subir" : "Click to upload"}</span>
        </button>
      ) : (
        <div className="mt-2 flex items-center gap-3 rounded-xl border-2 border-primary/30 bg-primary/5 p-3">
          {previewUrl ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image src={previewUrl} alt={value.name} fill className="object-cover" sizes="56px" />
            </div>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">{es ? "Listo para subir" : "Ready to upload"}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
              {es ? "Reemplazar" : "Replace"}
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => onChange(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      {helpText && <p className="mt-1.5 text-xs text-muted-foreground">{helpText}</p>}
    </div>
  )
}

export function BusinessCardConfigurator() {
  const { addToCart } = useCart()
  const { addPhotos } = usePhotos()
  const { locale } = useI18n()
  const router = useRouter()
  const es = locale === "es"
  const inspirationRef = useRef<HTMLInputElement>(null)

  const [cardStyle, setCardStyle] = useState<CardStyleId | null>(null)
  const [orderType, setOrderType] = useState<OrderType>("new")
  const [previousOrderNumber, setPreviousOrderNumber] = useState("")
  const [previousOrderNotes, setPreviousOrderNotes] = useState("")
  const [quantity, setQuantity] = useState<Quantity>(100)
  const [printingSides, setPrintingSides] = useState<PrintingSidesId>("front-back")
  const [designOption, setDesignOption] = useState<DesignOption | null>(null)

  // "I have my design"
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)

  // "Design it for me"
  const [businessName, setBusinessName] = useState("")
  const [contactName, setContactName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [social, setSocial] = useState("")
  const [address, setAddress] = useState("")
  const [styleNotes, setStyleNotes] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [inspirationFiles, setInspirationFiles] = useState<File[]>([])

  // QR (only for cardStyle === "qr")
  const [qrType, setQrType] = useState<QrType | null>(null)
  const [qrDestination, setQrDestination] = useState("")

  const [proofChecked, setProofChecked] = useState(false)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuote, setShowQuote] = useState(false)

  const price = getBusinessCardPrice({
    orderType,
    quantity,
    cardStyle: cardStyle ?? "standard",
    printingSides,
    designOption: designOption ?? undefined,
  })

  const businessCardsService = services.find((s) => s.id === "business-cards")!

  const handleInspirationFiles = (fileList: FileList | null) => {
    if (!fileList) return
    setInspirationFiles((prev) => [...prev, ...Array.from(fileList)].slice(0, 5))
  }

  const handleAddToCart = () => {
    if (!cardStyle) {
      setError(es ? "Elige un estilo de tarjeta." : "Choose a card style.")
      return
    }
    if (orderType === "reprint" && !previousOrderNumber.trim()) {
      setError(es ? "Escribe el número de pedido anterior." : "Write your previous order number.")
      return
    }
    if (orderType === "new") {
      if (!designOption) {
        setError(es ? "Elige cómo quieres crear tus tarjetas." : "Choose how you'd like to create your cards.")
        return
      }
      if (designOption === "own") {
        if (!frontFile) {
          setError(es ? "Sube el diseño del frente." : "Upload the front design.")
          return
        }
        if (printingSides === "front-back" && !backFile) {
          setError(es ? "Sube el diseño del reverso." : "Upload the back design.")
          return
        }
      }
      if (designOption === "wemark") {
        if (!businessName.trim()) {
          setError(es ? "Escribe el nombre del negocio." : "Write the business name.")
          return
        }
        if (!proofChecked) {
          setError(es ? "Confirma que entiendes la aprobación de la prueba digital." : "Confirm you understand the digital proof approval.")
          return
        }
      }
    }
    if (cardStyle === "qr") {
      if (!qrType) {
        setError(es ? "Elige a dónde debe llevar tu código QR." : "Choose where your QR code should take customers.")
        return
      }
      if (!qrDestination.trim()) {
        setError(es ? "Escribe el destino del código QR." : "Write the QR destination.")
        return
      }
      if (QR_TYPES_REQUIRING_URL.includes(qrType) && !isValidUrlish(qrDestination.trim())) {
        setError(es ? "Escribe una URL válida para el QR." : "Write a valid URL for the QR code.")
        return
      }
    }

    setAdding(true)
    setError(null)

    const filesToUpload: File[] = []
    if (orderType === "new" && designOption === "own") {
      if (frontFile) filesToUpload.push(renameFile(frontFile, "tarjeta-frente"))
      if (backFile) filesToUpload.push(renameFile(backFile, "tarjeta-reverso"))
    } else if (orderType === "new" && designOption === "wemark") {
      if (logoFile) filesToUpload.push(renameFile(logoFile, "logo"))
      inspirationFiles.forEach((f, i) => filesToUpload.push(renameFile(f, `referencia-${i + 1}`)))
    }
    if (filesToUpload.length > 0) addPhotos(filesToUpload)

    const styleLabel = es ? CARD_STYLES.find((s) => s.id === cardStyle)?.nameEs : CARD_STYLES.find((s) => s.id === cardStyle)?.name
    const sidesLabel = es ? PRINTING_SIDES.find((p) => p.id === printingSides)?.nameEs : PRINTING_SIDES.find((p) => p.id === printingSides)?.name

    const customization = [
      `${es ? "Estilo" : "Style"}: ${styleLabel}`,
      `${es ? "Tipo de pedido" : "Order type"}: ${orderType === "new" ? (es ? "Nuevo" : "New Order") : (es ? "Reimpresión" : "Reprint")}`,
      orderType === "reprint" ? `${es ? "Pedido anterior #" : "Previous order #"}: ${previousOrderNumber.trim()}` : null,
      orderType === "reprint" && previousOrderNotes.trim() ? `${es ? "Notas" : "Notes"}: ${previousOrderNotes.trim()}` : null,
      `${es ? "Cantidad" : "Quantity"}: ${quantity}`,
      `${es ? "Impresión" : "Printing"}: ${sidesLabel}`,
      orderType === "new" && designOption === "own"
        ? (es ? "Diseño: cliente sube archivo listo para imprimir" : "Design: customer uploads print-ready file")
        : null,
      orderType === "new" && designOption === "wemark"
        ? `${es ? "Diseño: servicio de diseño WeMark" : "Design: WeMark design service"} — ${businessName.trim()}${contactName.trim() ? `, ${contactName.trim()}` : ""}${jobTitle.trim() ? ` (${jobTitle.trim()})` : ""}`
        : null,
      orderType === "new" && designOption === "wemark" && phone.trim() ? `${es ? "Teléfono" : "Phone"}: ${phone.trim()}` : null,
      orderType === "new" && designOption === "wemark" && email.trim() ? `Email: ${email.trim()}` : null,
      orderType === "new" && designOption === "wemark" && website.trim() ? `${es ? "Sitio web" : "Website"}: ${website.trim()}` : null,
      orderType === "new" && designOption === "wemark" && social.trim() ? `${es ? "Redes" : "Social"}: ${social.trim()}` : null,
      orderType === "new" && designOption === "wemark" && address.trim() ? `${es ? "Dirección" : "Address"}: ${address.trim()}` : null,
      orderType === "new" && designOption === "wemark" && styleNotes.trim() ? `${es ? "Estilo deseado" : "Style notes"}: ${styleNotes.trim()}` : null,
      cardStyle === "qr" ? `QR: ${QR_TYPES.find((q) => q.id === qrType)?.name} -> ${qrDestination.trim()}` : null,
    ].filter(Boolean).join(" · ")

    addToCart(
      {
        id: `business-cards-${Date.now()}`,
        name: es ? "Tarjetas de Presentación" : "Business Cards",
        price: price.total ?? 0,
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
          {/* 1. Card style */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "1. Elige tu estilo de tarjeta" : "1. Choose your card style"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CARD_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCardStyle(s.id)}
                  className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                    cardStyle === s.id ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{es ? s.nameEs : s.name}</span>
                  <span className="text-xs text-muted-foreground">{es ? s.descriptionEs : s.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Order type */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "2. ¿Pedido nuevo o reimpresión?" : "2. Is this a new order or a reprint?"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setOrderType("new")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  orderType === "new" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">{es ? "Pedido nuevo" : "New Order"}</span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Crea un nuevo set de tarjetas" : "Create a new set of business cards."}
                </span>
              </button>
              <button
                onClick={() => setOrderType("reprint")}
                className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                  orderType === "reprint" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                }`}
              >
                <span className="font-medium text-foreground">{es ? "Reimpresión" : "Reprint"}</span>
                <span className="text-xs text-muted-foreground">
                  {es ? "Vuelve a pedir un diseño de WeMark ya aprobado" : "Reorder a previously approved WeMark business card design."}
                </span>
              </button>
            </div>

            {orderType === "reprint" && (
              <div className="mt-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
                <p className="text-sm font-medium text-foreground">
                  {es ? "Información del pedido anterior" : "Previous order information"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {es ? "Usaremos tu diseño de WeMark previamente aprobado." : "We'll use your previously approved WeMark design."}
                </p>
                <div>
                  <Label htmlFor="prevOrder" className="text-sm text-muted-foreground">
                    {es ? "Número de pedido anterior" : "Previous Order Number"}
                  </Label>
                  <Input
                    id="prevOrder"
                    value={previousOrderNumber}
                    onChange={(e) => setPreviousOrderNumber(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="prevNotes" className="text-sm text-muted-foreground">
                    {es ? "Notas (opcional)" : "Notes (optional)"}
                  </Label>
                  <Textarea
                    id="prevNotes"
                    value={previousOrderNotes}
                    onChange={(e) => setPreviousOrderNotes(e.target.value)}
                    rows={2}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Quantity */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "3. Elige tu cantidad" : "3. Choose your quantity"}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {QUANTITIES.map((q) => {
                const qPrice = getBusinessCardPrice({
                  orderType,
                  quantity: q,
                  cardStyle: cardStyle ?? "standard",
                  printingSides,
                  designOption: designOption ?? undefined,
                })
                return (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all ${
                      quantity === q ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="font-medium text-foreground">{q}</span>
                    {qPrice.total != null && <span className="text-sm text-primary font-semibold">${qPrice.total}</span>}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Printing sides */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "4. Impresión" : "4. Printing"}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {PRINTING_SIDES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPrintingSides(p.id)}
                  className={`rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                    printingSides === p.id ? "border-primary bg-primary/10 shadow-md text-foreground" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {es ? p.nameEs : p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Design option — new orders only */}
          {orderType === "new" && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                {es ? "5. ¿Cómo quieres crear tus tarjetas?" : "5. How would you like to create your business cards?"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDesignOption("own")}
                  className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                    designOption === "own" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{es ? "Tengo mi diseño" : "I have my design"}</span>
                  <span className="text-xs text-muted-foreground">
                    {es ? "Sube tu diseño listo para imprimir." : "Upload your print-ready business card design."}
                  </span>
                </button>
                <button
                  onClick={() => setDesignOption("wemark")}
                  className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
                    designOption === "wemark" ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{es ? "Diséñenla por mí" : "Design it for me"}</span>
                  <span className="text-xs text-muted-foreground">
                    {es ? "Deja que WeMark cree un diseño profesional para tu marca." : "Let WeMark create a professional business card design for your brand."}
                  </span>
                </button>
              </div>

              {/* "I have my design" */}
              {designOption === "own" && (
                <div className="mt-4 space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {es ? "Sube tu diseño" : "Upload your design"}
                  </h3>
                  <FileSlot
                    label={es ? "Diseño del frente" : "Front Design"}
                    value={frontFile}
                    onChange={setFrontFile}
                    es={es}
                  />
                  {printingSides === "front-back" && (
                    <FileSlot
                      label={es ? "Diseño del reverso" : "Back Design"}
                      value={backFile}
                      onChange={setBackFile}
                      es={es}
                    />
                  )}
                  <p className="text-xs text-muted-foreground">
                    {es
                      ? "Sube tu diseño listo para imprimir. Revisaremos tu archivo antes de imprimir. Formatos: PDF, PNG, JPG."
                      : "Upload your print-ready design. We'll review your file before printing. Formats: PDF, PNG, JPG."}
                  </p>
                </div>
              )}

              {/* "Design it for me" */}
              {designOption === "wemark" && (
                <div className="mt-4 space-y-8">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      {es ? "Cuéntanos sobre tu negocio" : "Tell us about your business"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="businessName" className="text-sm text-muted-foreground">
                          {es ? "Nombre del negocio *" : "Business Name *"}
                        </Label>
                        <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="contactName" className="text-sm text-muted-foreground">
                          {es ? "Nombre" : "Name"}
                        </Label>
                        <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle" className="text-sm text-muted-foreground">
                          {es ? "Puesto" : "Job Title"}
                        </Label>
                        <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm text-muted-foreground">
                          {es ? "Teléfono" : "Phone"}
                        </Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm text-muted-foreground">
                          Email
                        </Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="website" className="text-sm text-muted-foreground">
                          {es ? "Sitio web" : "Website"}
                        </Label>
                        <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="social" className="text-sm text-muted-foreground">
                          {es ? "Instagram / Redes Sociales" : "Instagram / Social Media"}
                        </Label>
                        <Input id="social" value={social} onChange={(e) => setSocial(e.target.value)} className="mt-2" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address" className="text-sm text-muted-foreground">
                          {es ? "Dirección" : "Address"}
                        </Label>
                        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      {es ? "Cuéntanos sobre tu estilo" : "Tell us about your style"}
                    </h3>
                    <Textarea
                      value={styleNotes}
                      onChange={(e) => setStyleNotes(e.target.value)}
                      rows={3}
                      placeholder={es
                        ? "Cuéntanos sobre tu negocio, colores preferidos, estilo y cualquier cosa que debamos saber."
                        : "Tell us about your business, preferred colors, style and anything you'd like us to know."}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      {es ? "Sube tu logo" : "Upload your logo"}
                    </h3>
                    <FileSlot
                      label={es ? "Logo" : "Logo"}
                      value={logoFile}
                      onChange={setLogoFile}
                      es={es}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                      {es ? "Inspiración / Referencia" : "Inspiration / Reference"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {es
                        ? "¿Tienes una tarjeta o estilo de diseño que te guste? Súbelo aquí. (Opcional)"
                        : "Have a business card or design style you like? Upload it here. (Optional)"}
                    </p>
                    <input
                      ref={inspirationRef}
                      type="file"
                      accept={FILE_ACCEPT}
                      multiple
                      className="hidden"
                      onChange={(e) => handleInspirationFiles(e.target.files)}
                    />
                    {inspirationFiles.length < 5 && (
                      <button
                        onClick={() => inspirationRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                      >
                        <ImagePlus className="h-6 w-6" />
                        <p className="text-sm font-medium">{es ? "Haz click para subir archivos" : "Click to upload files"}</p>
                      </button>
                    )}
                    {inspirationFiles.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {inspirationFiles.map((f, i) => (
                          <li key={i} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                            <span className="truncate text-foreground">{f.name}</span>
                            <button onClick={() => setInspirationFiles((prev) => prev.filter((_, idx) => idx !== i))}>
                              <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* QR Code — only for QR card style */}
          {cardStyle === "qr" && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-1">
                {es ? "Código QR" : "QR Code"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {es ? "¿A dónde debe llevar tu código QR a los clientes?" : "Where should your QR code take customers?"}
              </p>
              <Select value={qrType ?? undefined} onValueChange={(v) => setQrType(v as QrType)}>
                <SelectTrigger>
                  <SelectValue placeholder={es ? "Selecciona..." : "Select..."} />
                </SelectTrigger>
                <SelectContent>
                  {QR_TYPES.map((q) => (
                    <SelectItem key={q.id} value={q.id}>{es ? q.nameEs : q.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {qrType && (
                <div className="mt-4">
                  <Label htmlFor="qrDestination" className="text-sm text-muted-foreground">
                    {es ? "Destino del QR" : "QR Destination"}
                  </Label>
                  <Input
                    id="qrDestination"
                    value={qrDestination}
                    onChange={(e) => setQrDestination(e.target.value)}
                    placeholder={qrType === "whatsapp" ? "+1 754 332 8861" : "https://..."}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          )}

          {/* Digital proof */}
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              {es ? "Prueba digital incluida" : "Digital Proof Included"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {es
                ? "Te enviaremos una prueba digital para tu aprobación antes de imprimir tus tarjetas."
                : "We'll send you a digital proof for approval before your business cards are printed."}
            </p>
            {orderType === "new" && designOption === "wemark" && (
              <>
                <p className="mt-2 text-sm font-medium text-primary">
                  {es ? "Incluye hasta 2 revisiones menores." : "Includes up to 2 minor revisions."}
                </p>
                <label className="mt-3 flex items-start gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={proofChecked}
                    onChange={(e) => setProofChecked(e.target.checked)}
                    className="mt-0.5"
                  />
                  {es
                    ? "Entiendo que la impresión comenzará después de que apruebe la prueba final."
                    : "I understand that printing will begin after I approve the final proof."}
                </label>
              </>
            )}
            {orderType === "new" && designOption === "own" && (
              <p className="mt-2 text-xs text-muted-foreground">
                {es ? "Revisaremos tu archivo antes de imprimir." : "We'll review your file before printing."}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">{error}</p>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              {es ? "Tus tarjetas" : "Your business cards"}
            </h2>

            <div className="rounded-lg bg-secondary/30 p-4 space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Estilo" : "Card Style"}</span>
                <span className="font-medium">
                  {cardStyle ? (es ? CARD_STYLES.find((s) => s.id === cardStyle)?.nameEs : CARD_STYLES.find((s) => s.id === cardStyle)?.name) : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Tipo de pedido" : "Order Type"}</span>
                <span className="font-medium">{orderType === "new" ? (es ? "Nuevo" : "New Order") : (es ? "Reimpresión" : "Reprint")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Cantidad" : "Quantity"}</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{es ? "Impresión" : "Printing"}</span>
                <span className="font-medium">{es ? PRINTING_SIDES.find((p) => p.id === printingSides)?.nameEs : PRINTING_SIDES.find((p) => p.id === printingSides)?.name}</span>
              </div>
              {orderType === "new" && designOption && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{es ? "Diseño" : "Design"}</span>
                  <span className="font-medium">{designOption === "own" ? (es ? "Subido por ti" : "Uploaded by you") : (es ? "Servicio WeMark" : "WeMark Design Service")}</span>
                </div>
              )}
              {cardStyle === "qr" && qrType && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">QR</span>
                  <span className="font-medium">{es ? qrType && QR_TYPES.find((q) => q.id === qrType)?.nameEs : QR_TYPES.find((q) => q.id === qrType)?.name}</span>
                </div>
              )}
            </div>

            {price.total != null ? (
              <div className="space-y-2 border-t border-border pt-4">
                {price.printing != null && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{es ? "Impresión" : "Printing"}</span>
                    <span>${price.printing}</span>
                  </div>
                )}
                {price.design != null && price.design > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{es ? "Servicio de diseño" : "Design Service"}</span>
                    <span>${price.design}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3 mt-3">
                  <span className="font-serif text-lg font-semibold text-foreground">Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">${price.total}</span>
                </div>
              </div>
            ) : (
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  {es
                    ? "Todavía no tenemos un precio definido para esta combinación — escríbenos y te lo confirmamos."
                    : "We don't have a set price for this combination yet — reach out and we'll confirm it."}
                </p>
              </div>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              {es ? "Prueba digital incluida" : "Digital proof included"}
            </p>

            {price.total != null ? (
              <Button onClick={handleAddToCart} disabled={adding} className="w-full mt-5 gap-2" size="lg">
                <ShoppingBag className="h-4 w-4" />
                {es ? "Agregar al carrito" : "Add to cart"}
              </Button>
            ) : (
              <Button onClick={() => setShowQuote(true)} className="w-full mt-5 gap-2" size="lg">
                <MessageCircle className="h-4 w-4" />
                {es ? "Solicitar cotización" : "Request a quote"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <QuoteDialog
        service={showQuote ? businessCardsService : null}
        open={showQuote}
        onClose={() => setShowQuote(false)}
        locale={locale}
      />
    </div>
  )
}
