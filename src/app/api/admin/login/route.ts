import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "BROadmin@!23";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "bro-forum-secret-key-change-in-production";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set("admin_session", SESSION_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
