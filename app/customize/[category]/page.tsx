import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShadowBoxConfigurator } from "@/components/configurators/shadow-box-configurator"

const VALID_CATEGORIES = ["shadow-boxes"] as const
type CustomizeCategory = (typeof VALID_CATEGORIES)[number]

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (category === "shadow-boxes") {
    return {
      title: "Customize Your Shadow Box | WeMark",
      description: "Build your personalized shadow box — choose shape, color, phrase, lights and photos.",
    }
  }
  return {}
}

export default async function CustomizeCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category as CustomizeCategory)) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/20 py-10 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Shadow Box · 12×12 in
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Customize Yours
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Choose your shape, flower color, phrase and add-ons. The price updates as you build it.
          </p>
        </div>
        <ShadowBoxConfigurator />
      </main>
      <Footer />
    </div>
  )
}
