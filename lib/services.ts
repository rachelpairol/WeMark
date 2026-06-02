export interface Service {
  id: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  image: string
  details: string[]
  detailsEs: string[]
  formFields: {
    key: string
    label: string
    labelEs: string
    type: "text" | "textarea" | "select" | "number"
    options?: string[]
    required?: boolean
  }[]
}

export const services: Service[] = [
  {
    id: "business-cards",
    name: "Business Cards",
    nameEs: "Tarjetas de Presentación",
    description: "Professional business cards printed on premium cardstock. Design service available at an additional cost.",
    descriptionEs: "Tarjetas de presentación impresas en papel premium de alta calidad. Servicio de diseño disponible con costo adicional.",
    image: "/Images/tarjetas.jpg.jpeg",
    details: [
      "Premium cardstock paper",
      "Matte or glossy finish",
      "Design service available (additional cost)",
      "Any quantity — from 25 to 500+",
    ],
    detailsEs: [
      "Papel premium de alta calidad",
      "Acabado mate o brillante a tu elección",
      "Servicio de diseño disponible (costo adicional)",
      "Cualquier cantidad — desde 25 hasta 500+",
    ],
    formFields: [
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "select", options: ["25", "50", "100", "250", "500", "Other"], required: true },
      { key: "hasDesign", label: "Do you have a design ready?", labelEs: "¿Tienes diseño listo?", type: "select", options: ["Yes, I'll send it", "No, I need a design"], required: true },
      { key: "finish", label: "Finish", labelEs: "Acabado", type: "select", options: ["Matte / Mate", "Glossy / Brillante"] },
      { key: "details", label: "Additional details or ideas", labelEs: "Detalles adicionales o ideas", type: "textarea" },
    ],
  },
  {
    id: "custom-tshirts",
    name: "Custom T-Shirts",
    nameEs: "Camisetas Personalizadas",
    description: "T-shirts personalized with textile vinyl. Names, phrases, logos and custom designs — by unit or in bulk.",
    descriptionEs: "Camisetas personalizadas con vinyl textil. Nombres, frases, logos y diseños a tu gusto — por unidad o en cantidad.",
    image: "/Images/camisetas.jpg",
    details: [
      "High-durability textile vinyl",
      "All colors & sizes available",
      "Single units or bulk orders",
      "Washes well — long lasting",
    ],
    detailsEs: [
      "Vinyl textil de alta duración",
      "Todos los colores y tallas disponibles",
      "Por unidad o pedidos en cantidad",
      "Resiste el lavado — resultado duradero",
    ],
    formFields: [
      { key: "quantity", label: "How many t-shirts?", labelEs: "¿Cuántas camisetas?", type: "number", required: true },
      { key: "sizes", label: "Sizes needed (e.g. S×2, M×1, L×3)", labelEs: "Tallas necesarias (ej. S×2, M×1, L×3)", type: "text", required: true },
      { key: "shirtColor", label: "T-shirt color(s)", labelEs: "Color(es) de camiseta", type: "text", required: true },
      { key: "design", label: "Describe your design, phrase or logo", labelEs: "Describe tu diseño, frase o logo", type: "textarea", required: true },
    ],
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    nameEs: "Cajas de Regalo",
    description: "Personalized gift boxes for birthdays and special occasions. Custom phrases, decoration and wrapping.",
    descriptionEs: "Cajas de regalo personalizadas para cumpleaños y ocasiones especiales. Frases, decoración y presentación a tu gusto.",
    image: "/Images/cajas.jpg.jpeg",
    details: [
      "Personalized phrases & decoration",
      "We provide the box or use yours",
      "Perfect for birthdays & celebrations",
      "Beautifully wrapped & ready to gift",
    ],
    detailsEs: [
      "Frases y decoración personalizadas",
      "Proveemos la caja o usamos la tuya",
      "Ideal para cumpleaños y celebraciones",
      "Lista para regalar con presentación elegante",
    ],
    formFields: [
      { key: "occasion", label: "Occasion", labelEs: "Ocasión", type: "select", options: ["Birthday / Cumpleaños", "Anniversary / Aniversario", "Baby Shower", "Graduation / Graduación", "Other / Otro"], required: true },
      { key: "hasBox", label: "Do you have the box or need us to provide it?", labelEs: "¿Tienes la caja o la proveemos nosotros?", type: "select", options: ["I have my own box / Tengo mi caja", "Please provide the box / Proveer la caja"], required: true },
      { key: "phrase", label: "Phrase or message to personalize", labelEs: "Frase o mensaje para personalizar", type: "textarea", required: true },
      { key: "details", label: "Colors, theme or additional ideas", labelEs: "Colores, tema o ideas adicionales", type: "textarea" },
    ],
  },
  {
    id: "logo-printing",
    name: "Logos, Vinyl & Stickers",
    nameEs: "Logos, Vinyl y Stickers",
    description: "Cut your logo or design on vinyl or sticker paper with our Cricut machine. Perfect for brand stickers to seal boxes, envelopes or as thank-you labels.",
    descriptionEs: "Corta tu logo o diseño en vinyl o papel sticker con nuestra máquina Cricut. Ideal para stickers de marca para cerrar cajas, sobres o como etiquetas de agradecimiento.",
    image: "/Images/logos.jpg",
    details: [
      "Professional Cricut machine",
      "Regular & textile vinyl",
      "Brand stickers for boxes & envelopes",
      "Thank-you stickers & custom labels",
    ],
    detailsEs: [
      "Máquina Cricut profesional",
      "Vinyl regular y textil",
      "Stickers de marca para cajas y sobres",
      "Stickers de agradecimiento y etiquetas personalizadas",
    ],
    formFields: [
      { key: "type", label: "What do you need?", labelEs: "¿Qué necesitas?", type: "select", options: ["Logo on vinyl", "Brand stickers / Thank-you stickers", "Textile vinyl (for clothing)", "Other"], required: true },
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "number", required: true },
      { key: "size", label: "Approximate size (e.g. 2×2 inches)", labelEs: "Tamaño aproximado (ej. 2×2 pulgadas)", type: "text" },
      { key: "design", label: "Describe your design or logo — or share a link to your file", labelEs: "Describe tu diseño o logo — o comparte un link a tu archivo", type: "textarea", required: true },
    ],
  },
  {
    id: "stationery",
    name: "Creative Stationery",
    nameEs: "Papelería Creativa",
    description: "Invitations, thank-you cards, labels, stickers and custom stationery for any event or occasion.",
    descriptionEs: "Invitaciones, tarjetas de agradecimiento, etiquetas, stickers y papelería para cualquier evento u ocasión.",
    image: "/Images/papeleria.jpg.jpeg",
    details: [
      "Invitations, cards, labels & stickers",
      "Premium paper stock",
      "Any event or occasion",
      "Custom design & full personalization",
    ],
    detailsEs: [
      "Invitaciones, tarjetas, etiquetas y stickers",
      "Papel premium de alta calidad",
      "Para cualquier evento u ocasión",
      "Diseño personalizado e impresión a tu gusto",
    ],
    formFields: [
      { key: "type", label: "Type of stationery", labelEs: "Tipo de papelería", type: "select", options: ["Invitations", "Thank-you cards", "Labels / Stickers", "Tags / Hangtags", "Other"], required: true },
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "number", required: true },
      { key: "event", label: "Event or occasion", labelEs: "Evento u ocasión", type: "text", required: true },
      { key: "details", label: "Describe what you need — colors, theme, text", labelEs: "Describe lo que necesitas — colores, tema, texto", type: "textarea", required: true },
    ],
  },
]
