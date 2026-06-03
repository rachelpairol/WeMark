import { NextResponse } from "next/server"
import { google } from "googleapis"
import { PassThrough } from "stream"

function getDrive() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })
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

    console.log(`Uploading ${files.length} files to folder ${folderId}`)

    // Upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(`Uploading file ${i + 1}: ${file.name} (${file.size} bytes, ${file.type})`)
      try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = file.name.split(".").pop() || "jpg"
        const stream = new PassThrough()
        stream.end(buffer)
        const result = await drive.files.create({
          requestBody: {
            name: `foto_${String(i + 1).padStart(2, "0")}.${ext}`,
            parents: [folderId],
          },
          media: {
            mimeType: file.type || "image/jpeg",
            body: stream,
          },
          fields: "id,name",
        })
        console.log(`Uploaded: ${result.data.name} (id: ${result.data.id})`)
      } catch (fileErr) {
        console.error(`Failed to upload file ${i + 1}:`, fileErr)
        throw fileErr
      }
    }

    const folderUrl = `https://drive.google.com/drive/folders/${folderId}`
    return NextResponse.json({ folderUrl, folderName })
  } catch (err) {
    console.error("Drive upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
