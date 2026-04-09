"use server";

import { createServerClient, type MemberRow } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const db = () => createServerClient();

export async function getMembers(): Promise<MemberRow[]> {
  const { data, error } = await db()
    .from("members")
    .select("*")
    .order("id");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addMember(
  form: Omit<MemberRow, "id" | "created_at">
): Promise<MemberRow> {
  const { data, error } = await db()
    .from("members")
    .insert(form)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/members");
  return data;
}

export async function updateMember(
  id: number,
  form: Partial<Omit<MemberRow, "id" | "created_at">>
): Promise<MemberRow> {
  const { data, error } = await db()
    .from("members")
    .update(form)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/members");
  return data;
}

export async function deleteMember(id: number): Promise<void> {
  const { error } = await db().from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/members");
}
