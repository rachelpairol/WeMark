import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const customerName = (formData.get("customerName") as string)
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, "")
      .trim()
    const files = formData.getAll("files") as File[]

    if (!files.length) {
      return NextResponse.json({ folderUrl: null })
    }

    const date = new Date().toISOString().split("T")[0]
    const folder = `wemark-orders/${customerName} - ${date}`

    const uploadedUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const buffer = Buffer.from(await file.arrayBuffer())
      const base64 = buffer.toString("base64")
      const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`

      const result = await cloudinary.uploader.upload(dataUrl, {
        folder,
        public_id: `foto_${String(i + 1).padStart(2, "0")}`,
        overwrite: true,
      })

      uploadedUrls.push(result.secure_url)
    }

    const folderUrl = `https://console.cloudinary.com/console/media_library/search?q=${encodeURIComponent(folder)}`

    return NextResponse.json({ folderUrl, photoUrls: uploadedUrls })
  } catch (err) {
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
