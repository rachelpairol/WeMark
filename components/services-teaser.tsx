"use client"

import Link from "next/link"
import { ArrowRight, Scissors, CreditCard, Shirt, Package, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const servicesList = [
  { icon: CreditCard, nameEn: "Business Cards", nameEs: "Tarjetas de Presentación" },
  { icon: Shirt,      nameEn: "Custom T-Shirts", nameEs: "Camisetas Personalizadas" },
  { icon: Package,    nameEn: "Gift Boxes", nameEs: "Cajas de Regalo" },
  { icon: Scissors,   nameEn: "Logos, Vinyl & Stickers", nameEs: "Logos, Vinyl y Stickers" },
  { icon: FileText,   nameEn: "Creative Stationery", nameEs: "Papelería Creativa" },
]

export function ServicesTeaser() {
  const { locale } = useI18n()
  const es = locale === "es"

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {es ? "Más que Shadow Boxes" : "More Than Shadow Boxes"}
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {es ? "Estudio Creativo Completo" : "Full Creative Studio"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed sm:text-lg">
              {es
                ? "Con nuestra máquina Cricut creamos mucho más — vinyl textil, papelería, logos, tarjetas y cajas de regalo. Cuéntanos tu idea y te damos el precio."
                : "With our Cricut machine we create much more — textile vinyl, stationery, logos, business cards and gift boxes. Tell us your idea and we'll quote you."}
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 border-primary/30 font-semibold hover:bg-primary/10 hover:text-primary shrink-0">
            <Link href="/services">
              {es ? "Ver todos los servicios" : "View all services"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {servicesList.map(({ icon: Icon, nameEn, nameEs }) => (
            <Link
              key={nameEn}
              href="/services"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">
                {es ? nameEs : nameEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
