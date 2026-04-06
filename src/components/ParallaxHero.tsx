"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Crumb {
  label: string;
  href?: string;
}

interface ParallaxHeroProps {
  breadcrumbs: Crumb[];
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}

export default function ParallaxHero({ breadcrumbs, title, subtitle, align = "center" }: ParallaxHeroProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "340px" }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        <Image
          src="/heros-images.jpg"
          alt="BRO Forum Hero"
          fill
          sizes="100vw"
          className="object-cover object-top"
          quality={90}
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#001144]/55" />
      </motion.div>

      {/* Content */}
      <motion.div
        className={`relative z-10 max-w-7xl mx-auto px-6 py-14 ${align === "center" ? "text-center" : "text-left"}`}
        style={{ y: textY, opacity }}
      >
        {/* Breadcrumbs */}
        <nav className={`flex items-center gap-1.5 text-sm mb-6 ${align === "center" ? "justify-center" : ""}`}>
          <Link href="/" className="flex items-center gap-1 text-white/50 hover:text-white transition-colors">
            <Home size={13} />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="text-white/30" />
              {crumb.href && i < breadcrumbs.length - 1 ? (
                <Link href={crumb.href} className="text-white/50 hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#01acac] font-semibold">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Title & subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className={`text-3xl md:text-5xl font-bold text-white leading-tight ${align === "center" ? "mx-auto" : ""}`}>
            {title}
          </div>

          {subtitle && (
            <p className={`text-lg text-white/80 leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
