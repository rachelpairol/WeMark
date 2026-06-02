"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { products } from "@/lib/products"
import { services } from "@/lib/services"
import { useI18n } from "@/lib/i18n"
import type { Product } from "@/components/cart-context"

type FeaturedItem =
  | { kind: "product"; data: Product }
  | { kind: "service"; data: (typeof services)[0] }

export function FeaturedProducts() {
  const { addToCart } = useCart()
  const { t, locale } = useI18n()
  const es = locale === "es"

  // Hand-picked mix: 1 shadow box, 1 stationery, 1 gift box
  const featured: FeaturedItem[] = [
    { kind: "product",  data: products[0] },                                        // MOM Shadow Box
    { kind: "service",  data: services.find(s => s.id === "stationery")! },         // Papelería
    { kind: "service",  data: services.find(s => s.id === "gift-boxes")! },         // Cajas de regalo
  ]

  return (
    <section className="bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {es ? "Lo Más Popular" : "Our Best Sellers"}
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight text-balance">
              {es ? "Creaciones que enamoran" : "Creations you'll love"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {es
                ? "Shadow boxes, papelería, cajas de regalo y más — todo hecho a mano con amor para hacer cada momento especial."
                : "Shadow boxes, stationery, gift boxes and more — all handcrafted with love to make every moment special."}
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Button asChild variant="outline" className="gap-2 border-primary/30 bg-transparent font-semibold hover:bg-primary/10 hover:text-primary">
              <Link href="/shop">
                {es ? "Ver tienda" : "Shop all"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 border-primary/30 bg-transparent font-semibold hover:bg-primary/10 hover:text-primary">
              <Link href="/services">
                {es ? "Ver servicios" : "Our services"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mixed grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => {
            if (item.kind === "product") {
              const p = item.data
              return (
                <div key={p.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl">
                  <Link href={`/product/${p.id}`} className="relative aspect-[4/4.2] overflow-hidden bg-muted">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {p.category}
                    </span>
                    <Link href={`/product/${p.id}`}>
                      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground transition-colors hover:text-primary">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="text-2xl font-serif font-bold text-foreground">${p.price}</span>
                      <Button size="sm" onClick={() => addToCart(p)} className="gap-2 font-semibold transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg">
                        <ShoppingBag className="h-4 w-4" />
                        {t("product.addToCart")}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            }

            const s = item.data
            return (
              <div key={s.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl">
                <Link href="/services" className="relative aspect-[4/4.2] overflow-hidden bg-muted">
                  <Image
                    src={s.image}
                    alt={es ? s.nameEs : s.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/Images/mom-shadow-box-roses.jpeg"
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {es ? "Servicio" : "Service"}
                  </span>
                  <Link href="/services">
                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground transition-colors hover:text-primary">
                      {es ? s.nameEs : s.name}
                    </h3>
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {es ? s.descriptionEs : s.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="text-sm text-muted-foreground font-medium">
                      {es ? "Precio según pedido" : "Price on request"}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
