// Centralized config for the Business Cards configurator.
// Quantities, card styles and pricing all live here so the component never
// hardcodes these values — change a price or add an option in one place.

export type CardStyleId = "standard" | "premium" | "qr" | "glossy" | "rounded"
export type PrintingSidesId = "front" | "front-back"
export type OrderType = "new" | "reprint"
export type DesignOption = "own" | "wemark"
export type Quantity = 50 | 100 | 250 | 500 | 1000
export type QrType = "website" | "instagram" | "facebook" | "whatsapp" | "google-reviews" | "menu" | "other"

export interface CardStyleOption {
  id: CardStyleId
  name: string
  nameEs: string
  description: string
  descriptionEs: string
}

export const CARD_STYLES: CardStyleOption[] = [
  {
    id: "standard",
    name: "Standard Business Cards",
    nameEs: "Tarjetas Estándar",
    description: "Classic, professional business cards for everyday use.",
    descriptionEs: "Tarjetas clásicas y profesionales para el uso diario.",
  },
  {
    id: "premium",
    name: "Premium Business Cards",
    nameEs: "Tarjetas Premium",
    description: "Thicker cardstock for a more premium feel.",
    descriptionEs: "Papel más grueso para una sensación premium.",
  },
  {
    id: "qr",
    name: "QR Business Cards",
    nameEs: "Tarjetas con Código QR",
    description: "Connect customers directly to your website, social media or other digital destination.",
    descriptionEs: "Conecta a tus clientes directamente con tu sitio web, redes sociales u otro destino digital.",
  },
  {
    id: "glossy",
    name: "Glossy Business Cards",
    nameEs: "Tarjetas Brillantes",
    description: "A glossy finish that makes colors and designs stand out.",
    descriptionEs: "Un acabado brillante que resalta colores y diseños.",
  },
  {
    id: "rounded",
    name: "Rounded Corner Cards",
    nameEs: "Tarjetas de Esquinas Redondeadas",
    description: "Modern business cards with smooth rounded corners.",
    descriptionEs: "Tarjetas modernas con esquinas suavemente redondeadas.",
  },
]

// Single source of truth for quantity options — add/remove here only.
export const QUANTITIES: Quantity[] = [50, 100, 250, 500, 1000]

export const PRINTING_SIDES: { id: PrintingSidesId; name: string; nameEs: string }[] = [
  { id: "front", name: "Front Only", nameEs: "Solo Frente" },
  { id: "front-back", name: "Front + Back", nameEs: "Frente y Reverso" },
]

export const QR_TYPES: { id: QrType; name: string; nameEs: string }[] = [
  { id: "website", name: "Website", nameEs: "Sitio Web" },
  { id: "instagram", name: "Instagram", nameEs: "Instagram" },
  { id: "facebook", name: "Facebook", nameEs: "Facebook" },
  { id: "whatsapp", name: "WhatsApp", nameEs: "WhatsApp" },
  { id: "google-reviews", name: "Google Reviews", nameEs: "Reseñas de Google" },
  { id: "menu", name: "Menu", nameEs: "Menú" },
  { id: "other", name: "Other", nameEs: "Otro" },
]

// URL-shaped destinations get validated; WhatsApp/other are freeform (phone number, etc).
export const QR_TYPES_REQUIRING_URL: QrType[] = ["website", "instagram", "facebook", "google-reviews", "menu"]

// ── Pricing ──────────────────────────────────────────────────────────────
// Reprint pricing (same approved design, quantity only) — confirmed by Rachel.
// 50 and 1000 are not priced yet; add them here once confirmed.
const REPRINT_PRICES: Partial<Record<Quantity, number>> = {
  100: 35,
  250: 50,
  500: 65,
}

// New-order printing price, by card style -> quantity -> printing sides.
// TODO(Rachel): fill in real printing prices per style/quantity/sides. Every
// combination is intentionally unset (not "$65 from before" — that number
// used to include design, which is now priced separately below) until real
// numbers are provided. The UI falls back to "request a quote" for any
// combination that resolves to null here.
const PRINTING_PRICES: Record<CardStyleId, Partial<Record<Quantity, Partial<Record<PrintingSidesId, number>>>>> = {
  standard: {},
  premium: {},
  qr: {},
  glossy: {},
  rounded: {},
}

// TODO(Rachel): set the real "Design it for me" service fee once decided.
export const DESIGN_SERVICE_FEE: number | null = null

export interface BusinessCardPriceInput {
  orderType: OrderType
  quantity: Quantity
  cardStyle: CardStyleId
  printingSides: PrintingSidesId
  designOption?: DesignOption
}

export interface BusinessCardPriceResult {
  printing: number | null
  design: number | null
  total: number | null
}

export function getBusinessCardPrice(input: BusinessCardPriceInput): BusinessCardPriceResult {
  if (input.orderType === "reprint") {
    const printing = REPRINT_PRICES[input.quantity] ?? null
    return { printing, design: null, total: printing }
  }

  const printing = PRINTING_PRICES[input.cardStyle]?.[input.quantity]?.[input.printingSides] ?? null
  const design = input.designOption === "wemark" ? DESIGN_SERVICE_FEE : 0

  if (printing == null || design == null) {
    return { printing, design, total: null }
  }
  return { printing, design, total: printing + design }
}
