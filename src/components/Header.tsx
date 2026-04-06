"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function getNextThursday(): string {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay();
  const daysUntil = (4 - day + 7) % 7 || 7;
  const next = new Date(ist);
  next.setDate(ist.getDate() + daysUntil);
  return next.toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short",
    timeZone: "Asia/Kolkata",
  });
}

const navLinks = [
  { name: "Who we are", href: "/who-we-are" },
  { name: "Members", href: "/members" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const pathname = usePathname();
  const nextThursday = getNextThursday();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {barVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-[#002284] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#01acac] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest shrink-0">
                  Every Thursday
                </span>
                <span className="text-white/80 text-xs">
                  Next meeting: <span className="text-white font-bold">{nextThursday}</span>
                  <span className="text-white/50 mx-2">·</span>
                  <span className="text-white/70">8:30 – 9:30 AM IST · Chennai</span>
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 bg-[#01acac] hover:bg-[#01acac]/90 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all"
                >
                  Register <ArrowRight size={12} />
                </Link>
                <button
                  onClick={() => setBarVisible(false)}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 hidden md:flex items-stretch transition-all duration-300 overflow-visible",
          barVisible ? "top-[36px]" : "top-0",
          scrolled
            ? "bg-white/90 backdrop-blur-3xl border-b border-white/60 shadow-sm"
            : "bg-white/75 backdrop-blur-3xl border-b border-white/40"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#010755]/5 via-transparent to-[#03adad]/8 pointer-events-none" />

        <div className="relative flex items-center w-full px-6 xl:px-12">

          {/* Logo */}
          <Link href="/" className="flex items-center pr-8 shrink-0 py-1">
            <div className="relative h-16 w-[160px]">
              <Image
                src="/BRO-logo.webp"
                alt="BRO Forum"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Red divider */}
          <div className="w-[2px] h-8 bg-[#c90c19] shrink-0 rounded-full" />

          {/* Nav */}
          <nav className="flex items-center gap-0.5 px-6 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[13.5px] font-semibold rounded-xl transition-colors duration-200 select-none",
                  pathname === link.href
                    ? "text-[#002284] font-bold after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[#03adad] after:rounded-full"
                    : "text-slate-500 hover:text-[#03adad]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-px h-7 bg-gradient-to-b from-transparent via-slate-300/70 to-transparent shrink-0" />

          {/* CTA */}
          <div className="pl-6 py-3 shrink-0">
            <Link
              href="/join"
              className="relative flex items-center gap-2 px-6 py-2.5 overflow-hidden group bg-[#03adad] hover:bg-[#04c4c4] transition-colors duration-200 rounded-xl"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12" />
              <span className="relative text-white text-[13px] font-black tracking-wide whitespace-nowrap">JOIN BRO</span>
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#002284]">
                <ArrowUpRight size={11} className="text-white transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={cn("fixed left-0 right-0 z-50 md:hidden transition-all duration-300", barVisible ? "top-[36px]" : "top-0")}>
        <div className="flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-3xl border-b border-white/50 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl">
              <div className="relative h-6 w-[72px]">
                <Image src="/BRO-logo.webp" alt="BRO Forum" fill className="object-contain" priority />
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/join" className="flex items-center gap-1 bg-[#03adad] text-white px-4 py-1.5 rounded-xl text-xs font-black">
              Join <ArrowUpRight size={11} />
            </Link>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-[0_8px_32px_rgba(1,7,85,0.12)]"
            >
              <div className="flex flex-col px-4 py-3 gap-0.5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 font-semibold text-sm hover:bg-white/70 transition-colors",
                        pathname === link.href && "text-[#002284] bg-white/60"
                      )}
                    >
                      <span>{link.name}</span>
                      {pathname === link.href
                        ? <span className="w-1.5 h-1.5 rounded-full bg-[#03adad]" />
                        : <ArrowUpRight size={14} className="text-slate-400" />}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Dynamic spacer — pushes page content below fixed header + bar */}
      <div style={{ height: barVisible ? "112px" : "76px" }} className="transition-all duration-300" />
    </>
  );
}
