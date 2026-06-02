import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShadowBoxConfigurator } from "@/components/shadow-box-configurator"

export const metadata = {
  title: "Customize Your Shadow Box | WeMark",
  description: "Build your personalized shadow box — choose shape, color, phrase, lights and photos.",
}

export default function CustomizePage() {
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
