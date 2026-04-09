"use server";

import { createServerClient, type GalleryRow } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const db = () => createServerClient();

export async function getGallery(): Promise<GalleryRow[]> {
  const { data, error } = await db()
    .from("gallery")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addGalleryItem(
  form: Omit<GalleryRow, "id" | "created_at">
): Promise<GalleryRow> {
  const { data, error } = await db()
    .from("gallery")
    .insert(form)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/gallery");
  return data;
}

export async function deleteGalleryItem(id: number): Promise<void> {
  const { error } = await db().from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/gallery");
}

/** Upload an image file to Supabase Storage and return the public URL */
export async function uploadGalleryImage(
  fileName: string,
  fileBase64: string,
  mimeType: string
): Promise<string> {
  const client = db();
  const buffer = Buffer.from(fileBase64, "base64");

  const { data, error } = await client.storage
    .from("gallery")
    .upload(`photos/${Date.now()}_${fileName}`, buffer, {
      contentType: mimeType,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: urlData } = client.storage
    .from("gallery")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
