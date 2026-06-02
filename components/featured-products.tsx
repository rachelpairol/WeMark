"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { services } from "@/lib/services"
import { useI18n } from "@/lib/i18n"

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3)
  const featuredServices = services.slice(0, 3)
  const { t, locale } = useI18n()
  const es = locale === "es"

  return (
    <section className="bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {es ? "Lo Más Popular" : "Our Best Sellers"}
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight text-balance">
              {t("featured.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("featured.subtitle")}
            </p>
          </div>

          <Button asChild variant="outline" className="gap-2 border-primary/30 bg-transparent font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg shrink-0">
            <Link href="/shop">
              {t("featured.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Shadow Boxes */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Services divider */}
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {es ? "Más Servicios" : "More Services"}
            </span>
            <h3 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              {es ? "También hacemos..." : "We also do..."}
            </h3>
          </div>
          <Button asChild variant="outline" className="gap-2 border-primary/30 bg-transparent font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg shrink-0">
            <Link href="/services">
              {es ? "Ver todos los servicios" : "View all services"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl"
            >
              <Link href="/services" className="relative aspect-[4/4.2] overflow-hidden bg-muted">
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
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {es ? "Cotización" : "Quote"}
                </span>

                <Link href="/services">
                  <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground transition-colors hover:text-primary">
                    {es ? service.nameEs : service.name}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {es ? service.descriptionEs : service.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm font-medium text-muted-foreground">
                    {es ? "Precio según tu pedido" : "Price on request"}
                  </span>
                  <Button asChild size="sm" className="gap-2 font-semibold transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg">
                    <Link href="/services">
                      <MessageCircle className="h-4 w-4" />
                      {es ? "Cotizar" : "Get quote"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
