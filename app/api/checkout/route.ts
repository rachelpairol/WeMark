import { NextResponse } from "next/server"
import Stripe from "stripe"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  customization?: string
}

export async function POST(request: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const { items, customerInfo, driveFolderUrl } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

    const photoMetadata: Record<string, string> = {}
    let photoIndex = 1
    for (const item of items) {
      if (item.photos?.length) {
        for (const url of item.photos) {
          photoMetadata[`photo_${String(photoIndex).padStart(2, "0")}`] = url
          photoIndex++
          if (photoIndex > 30) break
        }
      }
    }

    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          ...(item.customization && { description: `Custom message: ${item.customization}` }),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const subtotal = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    )

    if (subtotal < 100) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Standard Shipping" },
          unit_amount: 1200,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customerInfo.email,
      metadata: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone || "",
        address: customerInfo.address,
        address2: customerInfo.address2 || "",
        city: customerInfo.city,
        state: customerInfo.state,
        zip: customerInfo.zip,
        country: customerInfo.country,
        drive_folder: driveFolderUrl || "",
        ...photoMetadata,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    console.error("Stripe checkout error:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
