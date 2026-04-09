import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Browser / client-side client (uses publishable key)
export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Server-side client (uses secret key — only import in server components / actions)
export function createServerClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY!;
  return createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false },
  });
}

// DB row types (mirror Supabase tables)
export type MemberRow = {
  id: number;
  name: string;
  business: string;
  category: string;
  email: string | null;
  phone: string | null;
  status: "active" | "inactive";
  website: string | null;
  created_at: string;
};

export type EventRow = {
  id: number;
  title: string;
  date: string;       // YYYY-MM-DD
  time: string;
  venue: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
  registrations: number;
  created_at: string;
};

export type GalleryRow = {
  id: number;
  title: string;
  category: string;
  date: string;
  src: string;        // public URL from Supabase Storage
  created_at: string;
};

export type EnquiryRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  interest: string;
  message: string;
  status: "new" | "contacted" | "resolved";
  created_at: string;
};
