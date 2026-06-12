import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CostCalculator } from "@/components/cost-calculator"

export const metadata = {
  title: "Pricing Calculator | WeMark",
  description: "Internal cost calculator for WeMark products.",
}

export default function PricingCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-secondary/20 py-10 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Internal Tool
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Pricing Calculator
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Calculate product costs and get a suggested selling price based on your materials, labor and margin.
          </p>
        </div>
        <CostCalculator />
      </main>
      <Footer />
    </div>
  )
}
