import { NextResponse } from "next/server"
import { google } from "googleapis"
import { Readable } from "stream"

function getDrive() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set")
  const credentials = JSON.parse(key)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  })
  return google.drive({ version: "v3", auth })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const customerName = formData.get("customerName") as string
    const files = formData.getAll("files") as File[]

    if (!files.length) {
      return NextResponse.json({ folderUrl: null })
    }

    const drive = getDrive()
    const parentId = process.env.GOOGLE_DRIVE_FOLDER_ID

    const date = new Date().toISOString().split("T")[0]
    const folderName = `${customerName} - ${date}`

    // Create customer folder
    const folder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentId ? [parentId] : undefined,
      },
      fields: "id",
    })

    const folderId = folder.data.id!

    // Upload files sequentially to avoid stream conflicts
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const buffer = Buffer.from(await file.arrayBuffer())
      const ext = file.name.split(".").pop() || "jpg"
      const stream = new Readable({
        read() {
          this.push(buffer)
          this.push(null)
        },
      })
      await drive.files.create({
        requestBody: {
          name: `foto_${String(i + 1).padStart(2, "0")}.${ext}`,
          parents: [folderId],
        },
        media: {
          mimeType: file.type || "image/jpeg",
          body: stream,
        },
      })
    }

    const folderUrl = `https://drive.google.com/drive/folders/${folderId}`
    return NextResponse.json({ folderUrl, folderName })
  } catch (err) {
    console.error("Drive upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
