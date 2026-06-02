import { NextResponse } from "next/server"
import Stripe from "stripe"
import nodemailer from "nodemailer"

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "we.mark026@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const meta = session.metadata || {}
      const totalPaid = (session.amount_total ?? 0) / 100

      const itemsRowsHtml = lineItems.data
        .map(
          (item) =>
            `<tr>
              <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;color:#555">${item.description}</td>
              <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:center;color:#888">x${item.quantity}</td>
              <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:right;font-weight:bold">${((item.amount_total ?? 0) / 100).toFixed(2)} USD</td>
            </tr>`
        )
        .join("")

      const transporter = createTransporter()

      // ── Email to store owner ──────────────────────────────────────────────
      const ownerHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
          <div style="background:#D49B9B;padding:24px;border-radius:8px 8px 0 0;text-align:center">
            <h1 style="color:white;margin:0;font-size:24px">🎉 Nueva Venta en WeMark</h1>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #f0e8e8;border-top:none;border-radius:0 0 8px 8px">
            <h2 style="color:#D49B9B;margin-top:0">Datos del Cliente</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:4px 0;color:#888;width:140px">Nombre</td><td>${meta.firstName} ${meta.lastName}</td></tr>
              <tr><td style="padding:4px 0;color:#888">Email</td><td>${session.customer_email ?? "—"}</td></tr>
              <tr><td style="padding:4px 0;color:#888">Teléfono</td><td>${meta.phone || "—"}</td></tr>
            </table>
            <h2 style="color:#D49B9B;margin-top:24px">Dirección de Envío</h2>
            <p style="margin:0;line-height:1.6">
              ${meta.address}${meta.address2 ? `, ${meta.address2}` : ""}<br>
              ${meta.city}, ${meta.state} ${meta.zip}<br>
              ${meta.country}
            </p>
            <h2 style="color:#D49B9B;margin-top:24px">Productos</h2>
            <table style="width:100%;border-collapse:collapse">
              <thead>
                <tr style="color:#888;font-size:12px;text-transform:uppercase">
                  <th style="text-align:left;padding-bottom:8px">Producto</th>
                  <th style="text-align:center;padding-bottom:8px">Cant.</th>
                  <th style="text-align:right;padding-bottom:8px">Total</th>
                </tr>
              </thead>
              <tbody>${itemsRowsHtml}</tbody>
            </table>
            <div style="margin-top:16px;text-align:right">
              <span style="font-size:20px;font-weight:bold;color:#D49B9B">Total: $${totalPaid.toFixed(2)} USD</span>
            </div>
            ${(() => {
              const photos = Object.entries(meta)
                .filter(([k]) => k.startsWith("photo_"))
                .map(([, v]) => v)
              if (!photos.length) return ""
              return `
                <h2 style="color:#D49B9B;margin-top:24px">📷 Fotos del cliente (${photos.length})</h2>
                <div style="display:flex;flex-wrap:wrap;gap:8px">
                  ${photos.map((url, i) => `<a href="${url}" target="_blank" style="display:inline-block;padding:6px 12px;background:#fdf8f8;border:1px solid #f0e8e8;border-radius:6px;color:#D49B9B;text-decoration:none;font-size:12px">📷 Foto ${i + 1}</a>`).join("")}
                </div>`
            })()}
            <div style="margin-top:24px;padding:16px;background:#fdf8f8;border-radius:8px;font-size:12px;color:#aaa">
              Stripe session: ${session.id}
            </div>
          </div>
        </div>`

      await transporter.sendMail({
        from: '"WeMark Orders" <we.mark026@gmail.com>',
        to: "we.mark026@gmail.com",
        subject: `🛍️ Nueva orden — $${totalPaid.toFixed(2)} USD — ${meta.firstName} ${meta.lastName}`,
        html: ownerHtml,
        text: `Nueva orden WeMark\n\nCliente: ${meta.firstName} ${meta.lastName}\nEmail: ${session.customer_email}\nTeléfono: ${meta.phone || "—"}\n\nEnvío:\n${meta.address}, ${meta.city}, ${meta.state} ${meta.zip}, ${meta.country}\n\nTotal: $${totalPaid.toFixed(2)} USD`,
      })

      // ── Confirmation email to customer ────────────────────────────────────
      if (session.customer_email) {
        const customerHtml = `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#333;background:#fff">
            <div style="background:#D49B9B;padding:32px;text-align:center">
              <h1 style="color:white;margin:0;font-size:28px;letter-spacing:2px">WeMark</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;letter-spacing:1px">HANDCRAFTED PERSONALIZED GIFTS</p>
            </div>
            <div style="padding:40px 32px">
              <h2 style="color:#D49B9B;margin-top:0;font-size:22px">¡Gracias por tu pedido, ${meta.firstName}! 🌸</h2>
              <p style="line-height:1.7;color:#555">
                Hemos recibido tu orden y ya estamos comenzando a preparar tu shadow box personalizado con todo el cariño del mundo.
                Nos comunicaremos contigo en las próximas 24 horas para confirmar los detalles de personalización.
              </p>
              <div style="background:#fdf8f8;border-radius:8px;padding:24px;margin:24px 0">
                <h3 style="margin-top:0;color:#D49B9B;font-size:15px;text-transform:uppercase;letter-spacing:1px">Tu pedido</h3>
                <table style="width:100%;border-collapse:collapse">
                  ${lineItems.data.map((item) => `
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;color:#555">${item.description}</td>
                      <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:center;color:#888">x${item.quantity}</td>
                      <td style="padding:8px 0;border-bottom:1px solid #f0e8e8;text-align:right;font-weight:bold;color:#333">$${((item.amount_total ?? 0) / 100).toFixed(2)}</td>
                    </tr>
                  `).join("")}
                  <tr>
                    <td colspan="2" style="padding:12px 0 0;font-weight:bold;color:#333">Total pagado</td>
                    <td style="padding:12px 0 0;text-align:right;font-size:18px;font-weight:bold;color:#D49B9B">$${totalPaid.toFixed(2)} USD</td>
                  </tr>
                </table>
              </div>
              <div style="background:#fdf8f8;border-radius:8px;padding:24px;margin:24px 0">
                <h3 style="margin-top:0;color:#D49B9B;font-size:15px;text-transform:uppercase;letter-spacing:1px">Dirección de envío</h3>
                <p style="margin:0;color:#555;line-height:1.7">
                  ${meta.address}${meta.address2 ? `, ${meta.address2}` : ""}<br>
                  ${meta.city}, ${meta.state} ${meta.zip}<br>
                  ${meta.country}
                </p>
              </div>
              <p style="line-height:1.7;color:#555">
                Tu pedido será enviado en <strong>3–5 días hábiles</strong> una vez confirmados los detalles. ¡Estamos emocionados de crear algo especial para ti!
              </p>
              <div style="border-top:1px solid #f0e8e8;padding-top:24px;margin-top:32px;text-align:center">
                <p style="color:#888;font-size:13px;margin:0 0 8px">¿Tienes preguntas? Con gusto te ayudamos:</p>
                <p style="margin:4px 0"><a href="mailto:we.mark026@gmail.com" style="color:#D49B9B;text-decoration:none">we.mark026@gmail.com</a></p>
                <p style="margin:4px 0">📞 +1 (754) 332-8861</p>
                <p style="margin:4px 0"><a href="https://www.instagram.com/we_mark26" style="color:#D49B9B;text-decoration:none">@we_mark26</a></p>
              </div>
            </div>
            <div style="background:#f9f3f3;padding:16px;text-align:center">
              <p style="color:#aaa;font-size:12px;margin:0">© 2025 WeMark · Handcrafted with love 🌸</p>
            </div>
          </div>`

        await transporter.sendMail({
          from: '"WeMark" <we.mark026@gmail.com>',
          to: session.customer_email,
          subject: `¡Tu pedido de WeMark está confirmado! — #${session.id.slice(-8).toUpperCase()}`,
          html: customerHtml,
          text: `¡Gracias por tu pedido, ${meta.firstName}!\n\nHemos recibido tu orden y ya estamos preparando tu shadow box personalizado.\n\nNos comunicaremos contigo en las próximas 24 horas.\n\nTotal pagado: $${totalPaid.toFixed(2)} USD\n\n¿Preguntas? Escríbenos a we.mark026@gmail.com o llámanos al +1 (754) 332-8861.\n\nCon cariño,\nEl equipo de WeMark`,
        })
      }
    } catch (err) {
      console.error("Error processing order:", err)
    }
  }

  return NextResponse.json({ received: true })
}
