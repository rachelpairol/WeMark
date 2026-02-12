import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShopContent } from "@/components/shop-content"

export const metadata = {
  title: "Shop | WeMark - Handcrafted Shadow Boxes",
  description: "Browse our collection of handcrafted shadow boxes with paper roses for every special occasion.",
}

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <ShopContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
