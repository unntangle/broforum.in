"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Who we are", href: "/who-we-are" },
  { name: "Members", href: "/membership" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Desktop Header ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden md:flex items-stretch transition-all duration-300 overflow-visible",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-white/50"
            : "bg-white/60 backdrop-blur-2xl border-b border-white/30"
        )}
      >
        {/* Subtle gradient shimmer across the full width */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010755]/5 via-transparent to-[#03adad]/8 pointer-events-none" />

        {/* Inner content: max-width container */}
        <div className="relative flex items-center w-full px-6 xl:px-12">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center pr-8 shrink-0 py-1"
            onClick={() => setActiveLink("")}
          >
            <div className="relative h-16 w-[160px]">
              <Image
                src="/BRO-logo.webp"
                alt="BRO Forum"
                fill
                sizes="(max-width: 768px) 100vw, 160px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Vertical divider — red accent from logo */}
          <div className="w-[2px] h-8 bg-[#c90c19] shrink-0 rounded-full" />
          {/* Nav — right aligned */}
          <nav className="flex items-center gap-0.5 px-6 flex-1 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                className={cn(
                  "relative px-4 py-2 text-[13.5px] font-semibold rounded-xl transition-colors duration-200 select-none",
                  activeLink === link.name
                    ? "text-[#002284] font-bold after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[#03adad] after:rounded-full"
                    : "text-slate-500 hover:text-[#03adad]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Vertical divider */}
          <div className="w-px h-7 bg-gradient-to-b from-transparent via-slate-300/70 to-transparent shrink-0" />

          {/* CTA */}
          <div className="pl-6 py-3 shrink-0">
            <Link
              href="/join"
              className={cn(
                "relative flex items-center gap-2 px-6 py-2.5 overflow-hidden group",
                "bg-[#03adad] hover:bg-[#04c4c4] transition-colors duration-200",
                "rounded-xl"
              )}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12" />
              <span className="relative text-white text-[13px] font-black tracking-wide whitespace-nowrap">
                JOIN BRO
              </span>
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#002284] transition-colors">
                <ArrowUpRight size={11} className="text-white transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            "bg-white/70 backdrop-blur-2xl",
            "border-b border-white/40",
            "shadow-[0_4px_24px_rgba(1,7,85,0.10)]"
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl">
              <div className="relative h-6 w-[72px]">
                <Image
                  src="/BRO-logo.webp"
                  alt="BRO Forum"
                  fill
                  sizes="72px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/join"
              className="flex items-center gap-1 bg-[#03adad] text-white px-4 py-1.5 rounded-xl text-xs font-black"
            >
              Join
              <ArrowUpRight size={11} />
            </Link>
            <button
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-xl",
                "bg-white/60 backdrop-blur-sm border border-slate-200/60",
                "text-slate-600 transition-colors hover:bg-white"
              )}
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

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "overflow-hidden",
                "bg-white/80 backdrop-blur-2xl",
                "border-b border-white/40",
                "shadow-[0_8px_32px_rgba(1,7,85,0.12)]"
              )}
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
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded-xl",
                        "text-slate-700 font-semibold text-sm",
                        "hover:bg-white/70 transition-colors",
                        activeLink === link.name && "text-[#010755] bg-white/60"
                      )}
                      onClick={() => { setActiveLink(link.name); setIsOpen(false); }}
                    >
                      <span>{link.name}</span>
                      {activeLink === link.name
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
    </>
  );
}
