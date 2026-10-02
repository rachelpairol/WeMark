import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShadowBoxConfigurator } from "@/components/configurators/shadow-box-configurator"
import { TshirtConfigurator } from "@/components/configurators/tshirt-configurator"
import { SurpriseGiftConfigurator } from "@/components/configurators/surprise-gift-configurator"
import { BusinessCardConfigurator } from "@/components/configurators/business-card-configurator"

const CONFIGURATORS = {
  "shadow-boxes": {
    badge: "Shadow Box · 12×12 in",
    title: "Customize Yours",
    description: "Choose your shape, flower color, phrase and add-ons. The price updates as you build it.",
    metaTitle: "Customize Your Shadow Box | WeMark",
    metaDescription: "Build your personalized shadow box — choose shape, color, phrase, lights and photos.",
    Component: ShadowBoxConfigurator,
  },
  "custom-tshirts": {
    badge: "Camisetas Personalizadas",
    title: "Customize Yours",
    description: "Choose the color, size and the name or phrase you want in vinyl. The price updates as you build it.",
    metaTitle: "Customize Your T-Shirt | WeMark",
    metaDescription: "Build your personalized t-shirt — choose color, size and your name or phrase.",
    Component: TshirtConfigurator,
  },
  "surprise-gifts": {
    badge: "Regalos Sorpresa",
    title: "Customize Yours",
    description: "Choose the occasion, add a plush toy or breakfast tray, and personalize your message.",
    metaTitle: "Customize Your Surprise Gift | WeMark",
    metaDescription: "Build your personalized surprise gift — balloons, plush toys and breakfast trays.",
    Component: SurpriseGiftConfigurator,
  },
  "business-cards": {
    badge: "Tarjetas de Presentación",
    title: "Customize Yours",
    description: "Choose first time or reprint, pick a quantity and tell us about your business.",
    metaTitle: "Customize Your Business Cards | WeMark",
    metaDescription: "Order personalized business cards — design included on first orders, cheaper reprints after.",
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

  const { badge, title, description, Component } = config

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/20 py-10 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {badge}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            {description}
          </p>
        </div>
        <Component />
      </main>
      <Footer />
    </div>
  )
}
