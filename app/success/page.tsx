import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SuccessContent } from "./success-content"

export const metadata = {
  title: "Order Confirmed | WeMark",
  description: "Your WeMark order has been confirmed.",
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
