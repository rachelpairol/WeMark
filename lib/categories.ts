export type CategoryKind = "catalog" | "configurator" | "quote"

export interface CategoryEntry {
  id: string
  kind: CategoryKind
  serviceId?: string
}

export const categoryOrder: CategoryEntry[] = [
  { id: "shadow-boxes", kind: "catalog" },
  { id: "custom-tshirts", kind: "configurator", serviceId: "custom-tshirts" },
  { id: "surprise-gifts", kind: "configurator", serviceId: "surprise-gifts" },
  { id: "business-cards", kind: "configurator", serviceId: "business-cards" },
  { id: "gift-boxes", kind: "quote", serviceId: "gift-boxes" },
  { id: "logo-printing", kind: "quote", serviceId: "logo-printing" },
  { id: "stationery", kind: "quote", serviceId: "stationery" },
]

export const shadowBoxCategory = {
  name: "Shadow Box Frames",
  nameEs: "Cuadros Shadow Box",
  image: "/Images/mom-shadow-box-roses.jpeg",
  description:
    "Personalized frames with paper roses for Mother's Day, Valentine's Day, birthdays, Baby Showers, anniversaries, graduations and more.",
  descriptionEs:
    "Cuadros personalizados con rosas de papel para el Día de la Madre, San Valentín, cumpleaños, Baby Shower, aniversarios, graduaciones y más.",
  priceFrom: 65,
}
