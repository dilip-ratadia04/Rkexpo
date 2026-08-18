import { NextResponse } from "next/server";
import { getCmsDatabase, getMediaBucket } from "@/lib/cms";
import { isCmsUser } from "@/lib/cms-auth";

export const dynamic = "force-dynamic";
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isCmsUser())) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) throw new Error("Choose a valid image file.");
    if (file.size > MAX_BYTES) throw new Error("Image must be smaller than 8 MB.");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-|-$/g, "") || "image";
    const id = crypto.randomUUID();
    const objectKey = `uploads/${Date.now()}-${id}-${safeName}`;
    await getMediaBucket().put(objectKey, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    await getCmsDatabase().prepare("INSERT INTO cms_media (id, object_key, filename, mime_type, size, created_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, objectKey, file.name, file.type, file.size, Date.now()).run();
    return NextResponse.json({ url: `/media/${objectKey}`, filename: file.name });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed" }, { status: 400 });
  }
}
