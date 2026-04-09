"use server";

import { createServerClient, type EventRow } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const db = () => createServerClient();

export async function getEvents(): Promise<EventRow[]> {
  const { data, error } = await db()
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addEvent(
  form: Omit<EventRow, "id" | "created_at">
): Promise<EventRow> {
  const { data, error } = await db()
    .from("events")
    .insert(form)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/events");
  return data;
}

export async function updateEvent(
  id: number,
  form: Partial<Omit<EventRow, "id" | "created_at">>
): Promise<EventRow> {
  const { data, error } = await db()
    .from("events")
    .update(form)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/events");
  return data;
}

export async function deleteEvent(id: number): Promise<void> {
  const { error } = await db().from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/events");
}
