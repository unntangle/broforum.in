import { createServerClient } from "@/lib/supabase";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const db = createServerClient();
  const { data: members } = await db
    .from("members")
    .select("*")
    .eq("status", "active")
    .order("id");

  return <MembersClient members={members ?? []} />;
}
