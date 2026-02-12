import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export const metadata = {
  title: "Checkout | WeMark",
  description: "Complete your WeMark order.",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
