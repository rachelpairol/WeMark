"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuoteDialog } from "@/components/quote-dialog"
import { Button } from "@/components/ui/button"
import { services, type Service } from "@/lib/services"
import { useI18n } from "@/lib/i18n"
import { Heart } from "lucide-react"

export default function ServicesPage() {
  const { locale } = useI18n()
  const es = locale === "es"
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/20 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {es ? "Nuestros Servicios" : "Our Services"}
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl leading-tight">
              {es ? "Creamos lo que imaginas" : "We create what you imagine"}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {es
                ? "Desde tarjetas de presentación hasta camisetas personalizadas — cada proyecto es una oportunidad para hacer algo especial. Cuéntanos qué necesitas y te damos el precio."
                : "From business cards to custom t-shirts — every project is an opportunity to make something special. Tell us what you need and we'll give you a quote."}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
                    <Image
                      src={service.image}
                      alt={es ? service.nameEs : service.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/Images/mom-shadow-box-roses.jpeg"
                      }}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-serif text-xl font-bold text-foreground">
                      {es ? service.nameEs : service.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {es ? service.descriptionEs : service.description}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {(es ? service.detailsEs : service.details).map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Heart className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <Button className="mt-6 w-full" onClick={() => setSelected(service)}>
                      {es ? "Solicitar cotización" : "Request a quote"}
                    </Button>
                  </div>
                </div>
              ))}

              {/* Shadow Boxes — 6th card, links to shop */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
                  <Image
                    src="/Images/mom-shadow-box-roses.jpeg"
                    alt={es ? "Cuadros Shadow Box" : "Shadow Box Frames"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {es ? "Precio fijo" : "Fixed price"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    {es ? "Cuadros Shadow Box" : "Shadow Box Frames"}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {es
                      ? "Cuadros personalizados con rosas de papel para el Día de la Madre, San Valentín, aniversarios y más."
                      : "Personalized frames with paper roses for Mother's Day, Valentine's Day, anniversaries and more."}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {(es
                      ? ["Rosas de papel artesanales", "Cumpleaños, Baby Shower, San Valentín y más", "Desde $65 USD", "Empaque de regalo incluido"]
                      : ["Handcrafted paper roses", "Birthday, Baby Shower, Valentine's & more", "Starting at $65 USD", "Gift packaging included"]
                    ).map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Heart className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full">
                    <Link href="/shop">
                      {es ? "Ver colección" : "View collection"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-primary/5 border-t border-primary/10 py-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {es ? "¿No ves lo que buscas?" : "Don't see what you're looking for?"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {es
                ? "Cuéntanos tu idea y la hacemos realidad. Escríbenos directamente."
                : "Tell us your idea and we'll make it happen. Contact us directly."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.instagram.com/we_mark26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {es ? "Escribenos en Instagram" : "Message us on Instagram"}
              </a>
              <a
                href="https://wa.me/17543328861"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-primary/30 bg-transparent px-6 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <QuoteDialog
        service={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        locale={locale}
      />
    </div>
  )
}
