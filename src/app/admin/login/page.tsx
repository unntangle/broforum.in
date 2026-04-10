"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Invalid credentials. Please try again.");
      } else {
        window.location.href = "/admin";
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#002284] flex-col items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#01acac]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#01acac]/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-12">
          <div className="relative h-16 w-52">
            <Image src="/BRO-logo.webp" alt="BRO Forum" fill className="object-contain brightness-0 invert" priority />
          </div>
          <div className="w-px h-16 bg-white/20" />
          <div className="text-center space-y-3">
            <h2 className="text-white font-bold text-2xl leading-snug">
              Business Relationship<br />Organisation
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Chennai's premier structured business referral network — growing businesses every Thursday.
            </p>
          </div>
          <div className="flex gap-8 mt-4">
            {[{ v: "22+", l: "Members" }, { v: "4+", l: "Years" }, { v: "Weekly", l: "Meetings" }].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-[#01acac] font-black text-xl">{s.v}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="absolute bottom-6 text-white/20 text-xs">© 2026 BRO Forum</p>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px" style={{ background: "linear-gradient(to bottom, transparent, #01acac40, transparent)" }} />

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 bg-[#001a6e] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#002284]/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#01acac]/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-sm space-y-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <div className="relative h-12 w-40">
              <Image src="/BRO-logo.webp" alt="BRO Forum" fill className="object-contain brightness-0 invert" priority />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-white font-bold text-3xl tracking-tight">Welcome</h1>
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">
              Please login to Admin Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/8 border border-white/10 hover:border-white/20 focus:border-[#01acac]/60 focus:bg-white/10 rounded-xl outline-none text-white text-sm placeholder-white/25 transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 bg-white/8 border border-white/10 hover:border-white/20 focus:border-[#01acac]/60 focus:bg-white/10 rounded-xl outline-none text-white text-sm placeholder-white/25 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium px-4 py-3 rounded-xl">
                <AlertCircle size={14} className="shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#01acac] hover:bg-[#01acac]/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#01acac]/20"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : "Login"}
            </button>
          </form>

          <p className="text-center text-white/20 text-xs uppercase tracking-widest">
            Authorised Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
