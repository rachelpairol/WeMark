import React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Nunito } from "next/font/google"

import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { I18nProvider } from "@/lib/i18n"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
})

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "WeMark | Handcrafted Personalized Gifts",
  description:
    "Beautiful handcrafted shadow boxes with paper roses for Mother's Day, Valentine's Day, and special celebrations. Made just for you.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${nunito.variable} font-sans antialiased`}>
        <I18nProvider>
          <CartProvider>{children}</CartProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
