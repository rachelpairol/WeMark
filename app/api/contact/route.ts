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
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#D49B9B;padding:24px;border-radius:8px 8px 0 0;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">✉️ Nuevo Mensaje de Contacto</h1>
          <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px">${subject}</p>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #f0e8e8;border-top:none;border-radius:0 0 8px 8px">
          <h2 style="color:#D49B9B;margin-top:0">Datos de Contacto</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:4px 0;color:#888;width:200px">Nombre</td><td>${name}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Email</td><td>${email}</td></tr>
          </table>
          <h2 style="color:#D49B9B;margin-top:24px">Mensaje</h2>
          <p style="white-space:pre-wrap;line-height:1.6">${message}</p>
        </div>
      </div>`

    const text = `Nuevo mensaje de contacto\n\nNombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\n${message}`

    const transporter = createTransporter()
    await transporter.sendMail({
      from: '"WeMark Contact" <we.mark026@gmail.com>',
      to: "we.mark026@gmail.com",
      replyTo: email,
      subject: `✉️ Contacto: ${subject} — ${name}`,
      html,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact email error:", err)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
