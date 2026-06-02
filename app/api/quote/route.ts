import { NextResponse } from "next/server"
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
  try {
    const body = await request.json()
    const { service, name, email, phone, fields } = body

    const fieldsHtml = Object.entries(fields as Record<string, string>)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 0;color:#888;width:200px;text-transform:capitalize">${k.replace(/([A-Z])/g, " $1")}</td><td>${v}</td></tr>`)
      .join("")

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#D49B9B;padding:24px;border-radius:8px 8px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">📋 Nueva Solicitud de Cotización</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px">${service}</p>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #f0e8e8;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="color:#D49B9B;margin-top:0">Datos de Contacto</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:4px 0;color:#888;width:200px">Nombre</td><td>${name}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Email</td><td>${email}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Teléfono / WhatsApp</td><td>${phone || "—"}</td></tr>
          </table>
          <h2 style="color:#D49B9B;margin-top:24px">Detalles del Pedido</h2>
          <table style="width:100%;border-collapse:collapse">
            ${fieldsHtml}
          </table>
        </div>
      </div>`

    const text = `Nueva cotización: ${service}\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || "—"}\n\n${Object.entries(fields as Record<string, string>).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}`

    const transporter = createTransporter()
    await transporter.sendMail({
      from: '"WeMark Quotes" <we.mark026@gmail.com>',
      to: "we.mark026@gmail.com",
      replyTo: email,
      subject: `📋 Cotización: ${service} — ${name}`,
      html,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Quote email error:", err)
    return NextResponse.json({ error: "Failed to send quote request" }, { status: 500 })
  }
}
