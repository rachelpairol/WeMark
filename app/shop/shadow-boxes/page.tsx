import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShadowBoxesContent } from "@/components/shadow-boxes-content"

export const metadata = {
  title: "Shadow Boxes | WeMark - Handcrafted Shadow Boxes",
  description: "Browse our collection of handcrafted shadow boxes with paper roses for every special occasion, or build your own.",
}

export default function ShadowBoxesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <ShadowBoxesContent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
