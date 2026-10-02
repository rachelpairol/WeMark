import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomizeHero } from "@/components/configurators/customize-hero"
import { ShadowBoxConfigurator } from "@/components/configurators/shadow-box-configurator"
import { TshirtConfigurator } from "@/components/configurators/tshirt-configurator"
import { SurpriseGiftConfigurator } from "@/components/configurators/surprise-gift-configurator"
import { BusinessCardConfigurator } from "@/components/configurators/business-card-configurator"

const CONFIGURATORS = {
  "shadow-boxes": {
    badge: "Shadow Box · 12×12 in",
    badgeEs: "Shadow Box · 12×12 pulg",
    title: "Customize Yours",
    titleEs: "Personaliza el Tuyo",
    description: "Choose your shape, flower color, phrase and add-ons. The price updates as you build it.",
    descriptionEs: "Elige la forma, el color de las flores, la frase y los extras. El precio se actualiza mientras lo armas.",
    metaTitle: "Customize Your Shadow Box | WeMark",
    metaDescription: "Build your personalized shadow box — choose shape, color, phrase, lights and photos.",
    Component: ShadowBoxConfigurator,
  },
  "custom-tshirts": {
    badge: "Custom T-Shirts",
    badgeEs: "Camisetas Personalizadas",
    title: "Customize Yours",
    titleEs: "Personaliza la Tuya",
    description: "Choose the color, size and the name or phrase you want in vinyl. The price updates as you build it.",
    descriptionEs: "Elige el color, la talla y el nombre o frase que quieres en vinyl. El precio se actualiza mientras lo armas.",
    metaTitle: "Customize Your T-Shirt | WeMark",
    metaDescription: "Build your personalized t-shirt — choose color, size and your name or phrase.",
    Component: TshirtConfigurator,
  },
  "surprise-gifts": {
    badge: "Surprise Gifts",
    badgeEs: "Regalos Sorpresa",
    title: "Customize Yours",
    titleEs: "Personaliza el Tuyo",
    description: "Choose the occasion, add a plush toy or breakfast tray, and personalize your message.",
    descriptionEs: "Elige la ocasión, agrega un peluche o bandeja de desayuno, y personaliza tu mensaje.",
    metaTitle: "Customize Your Surprise Gift | WeMark",
    metaDescription: "Build your personalized surprise gift — balloons, plush toys and breakfast trays.",
    Component: SurpriseGiftConfigurator,
  },
  "business-cards": {
    badge: "Business Cards",
    badgeEs: "Tarjetas de Presentación",
    title: "Create Your Business Cards",
    titleEs: "Crea Tus Tarjetas de Presentación",
    description: "Choose your card style, quantity and design options to create the perfect cards for your business.",
    descriptionEs: "Elige el estilo de tarjeta, la cantidad y las opciones de diseño para crear las tarjetas perfectas para tu negocio.",
    metaTitle: "Create Your Business Cards | WeMark",
    metaDescription: "Choose your card style, quantity and design options to create the perfect business cards for your brand.",
    Component: BusinessCardConfigurator,
  },
} as const

type CustomizeCategory = keyof typeof CONFIGURATORS

export function generateStaticParams() {
  return Object.keys(CONFIGURATORS).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const config = CONFIGURATORS[category as CustomizeCategory]
  if (!config) return {}
  return {
    title: config.metaTitle,
    description: config.metaDescription,
  }
}

export default async function CustomizeCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const config = CONFIGURATORS[category as CustomizeCategory]

  if (!config) {
    notFound()
  }

  const { badge, badgeEs, title, titleEs, description, descriptionEs, Component } = config

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CustomizeHero
          badge={badge}
          badgeEs={badgeEs}
          title={title}
          titleEs={titleEs}
          description={description}
          descriptionEs={descriptionEs}
        />
        <Component />
      </main>
      <Footer />
    </div>
  )
}
