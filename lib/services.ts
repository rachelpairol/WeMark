export interface Service {
  id: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  image: string
  details: string[]
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
    description: "Professional business cards printed with high quality. Custom design available if you don't have one.",
    descriptionEs: "Tarjetas de presentación impresas con alta calidad. Diseño personalizado disponible si no tienes uno.",
    image: "/Images/tarjetas.jpg.jpeg",
    details: ["Papel premium", "Acabado mate o brillante", "Diseño incluido si lo necesitas", "Entrega en 5–7 días"],
    formFields: [
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "select", options: ["25", "50", "100", "250", "500"], required: true },
      { key: "hasDesign", label: "Do you have a design ready?", labelEs: "¿Tienes diseño listo?", type: "select", options: ["Yes, I'll send it", "No, I need a design"], required: true },
      { key: "finish", label: "Finish", labelEs: "Acabado", type: "select", options: ["Matte", "Glossy"] },
      { key: "details", label: "Additional details", labelEs: "Detalles adicionales", type: "textarea" },
    ],
  },
  {
    id: "custom-tshirts",
    name: "Custom T-Shirts",
    nameEs: "Camisetas Personalizadas",
    description: "Personalized t-shirts with textile vinyl. Names, phrases, logos and custom designs.",
    descriptionEs: "Camisetas personalizadas con vinyl textil. Nombres, frases, logos y diseños a tu gusto.",
    image: "/Images/camisetas.jpg",
    details: ["Vinyl textil de alta duración", "Todos los colores disponibles", "Por unidad o en cantidad", "Diseño incluido"],
    formFields: [
      { key: "quantity", label: "How many t-shirts?", labelEs: "¿Cuántas camisetas?", type: "number", required: true },
      { key: "sizes", label: "Sizes needed (e.g. S×2, M×1, L×3)", labelEs: "Tallas necesarias (ej. S×2, M×1, L×3)", type: "text", required: true },
      { key: "colors", label: "T-shirt color(s)", labelEs: "Color(es) de camiseta", type: "text", required: true },
      { key: "design", label: "Describe your design or phrase", labelEs: "Describe tu diseño o frase", type: "textarea", required: true },
    ],
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    nameEs: "Cajas de Regalo",
    description: "Personalized gift boxes for birthdays and special occasions. Custom phrases and decoration.",
    descriptionEs: "Cajas de regalo personalizadas para cumpleaños y ocasiones especiales. Frases y decoración a tu gusto.",
    image: "/Images/cajas.jpg.jpeg",
    details: ["Frases personalizadas", "Decoración incluida", "Con o sin caja según tu preferencia", "Ideal para cumpleaños y celebraciones"],
    formFields: [
      { key: "occasion", label: "Occasion", labelEs: "Ocasión", type: "select", options: ["Birthday", "Anniversary", "Baby Shower", "Graduation", "Other"], required: true },
      { key: "hasBox", label: "Do you have the box or need us to provide it?", labelEs: "¿Tienes la caja o la proveemos nosotros?", type: "select", options: ["I have my own box", "Please provide the box"], required: true },
      { key: "phrase", label: "Phrase or message to personalize", labelEs: "Frase o mensaje para personalizar", type: "textarea", required: true },
      { key: "details", label: "Additional details", labelEs: "Detalles adicionales", type: "textarea" },
    ],
  },
  {
    id: "logo-printing",
    name: "Logo & Vinyl Printing",
    nameEs: "Impresión de Logos y Vinyl",
    description: "Print your logo or design on vinyl, printable paper, or any surface using our Cricut machine.",
    descriptionEs: "Imprime tu logo o diseño en vinyl, papel imprimible o cualquier superficie con nuestra máquina Cricut.",
    image: "/Images/logos.jpg",
    details: ["Máquina Cricut profesional", "Vinyl regular y textil", "Papel imprimible con ink", "Tamaños y colores personalizados"],
    formFields: [
      { key: "material", label: "Material type", labelEs: "Tipo de material", type: "select", options: ["Regular vinyl", "Textile vinyl", "Printable paper (ink)", "Not sure — help me choose"], required: true },
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "number", required: true },
      { key: "size", label: "Approximate size (inches)", labelEs: "Tamaño aproximado (pulgadas)", type: "text" },
      { key: "design", label: "Describe your design or logo", labelEs: "Describe tu diseño o logo", type: "textarea", required: true },
    ],
  },
  {
    id: "stationery",
    name: "Creative Stationery",
    nameEs: "Papelería Creativa",
    description: "Invitations, thank-you cards, labels, stickers and all kinds of custom stationery for any event.",
    descriptionEs: "Invitaciones, tarjetas de agradecimiento, etiquetas, stickers y todo tipo de papelería para cualquier evento.",
    image: "/Images/papeleria.jpg.jpeg",
    details: ["Diseño personalizado", "Papel premium", "Cualquier evento u ocasión", "Impresión de alta calidad"],
    formFields: [
      { key: "type", label: "Type of stationery", labelEs: "Tipo de papelería", type: "select", options: ["Invitations", "Thank-you cards", "Labels / Stickers", "Tags", "Other"], required: true },
      { key: "quantity", label: "Quantity", labelEs: "Cantidad", type: "number", required: true },
      { key: "event", label: "Event or occasion", labelEs: "Evento u ocasión", type: "text", required: true },
      { key: "details", label: "Describe what you need", labelEs: "Describe lo que necesitas", type: "textarea", required: true },
    ],
  },
]
