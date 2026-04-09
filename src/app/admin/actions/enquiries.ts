"use server";

import { createServerClient, type EnquiryRow } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const db = () => createServerClient();

export async function getEnquiries(): Promise<EnquiryRow[]> {
  const { data, error } = await db()
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateEnquiryStatus(
  id: number,
  status: "new" | "contacted" | "resolved"
): Promise<void> {
  const { error } = await db()
    .from("enquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: number): Promise<void> {
  const { error } = await db().from("enquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

/** Called from the public contact form */
export async function submitEnquiry(form: {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  interest: string;
  message: string;
}): Promise<void> {
  const { error } = await db().from("enquiries").insert({
    ...form,
    status: "new",
  });
  if (error) throw new Error(error.message);
}
