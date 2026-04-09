"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ParallaxHero from "@/components/ParallaxHero";

const categories = ["All", "Meetings", "Events", "Awards", "Networking"];

const galleryItems = [
  { id: 1, src: "/hero-image.png", title: "Chapter Weekly Meeting", category: "Meetings", date: "March 2025" },
  { id: 2, src: "/features-image.png", title: "Business Networking Session", category: "Networking", date: "March 2025" },
  { id: 3, src: "/tertiary-image.png", title: "Annual Gala 2025", category: "Events", date: "February 2025" },
  { id: 4, src: "/hero-image.png", title: "Referral Celebration", category: "Awards", date: "January 2025" },
  { id: 5, src: "/features-image.png", title: "Chapter Launch – Coimbatore", category: "Events", date: "January 2025" },
  { id: 6, src: "/tertiary-image.png", title: "Power Breakfast – Chennai", category: "Meetings", date: "December 2024" },
  { id: 7, src: "/hero-image.png", title: "Member of the Month Award", category: "Awards", date: "December 2024" },
  { id: 8, src: "/features-image.png", title: "International Delegation – Dubai", category: "Events", date: "November 2024" },
  { id: 9, src: "/tertiary-image.png", title: "Women in Business Lunch", category: "Networking", date: "November 2024" },
  { id: 10, src: "/hero-image.png", title: "Business Growth Masterclass", category: "Events", date: "October 2024" },
  { id: 11, src: "/features-image.png", title: "Chapter Meeting – Mumbai", category: "Meetings", date: "October 2024" },
  { id: 12, src: "/tertiary-image.png", title: "Top Referrer Award Ceremony", category: "Awards", date: "September 2024" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  const currentIndex = lightbox !== null ? filtered.findIndex(g => g.id === lightbox) : -1;

  const prev = () => {
    if (currentIndex > 0) setLightbox(filtered[currentIndex - 1].id);
  };
  const next = () => {
    if (currentIndex < filtered.length - 1) setLightbox(filtered[currentIndex + 1].id);
  };

  const activeLightboxItem = lightbox !== null ? filtered.find(g => g.id === lightbox) : null;

  return (
    <div className="flex flex-col w-full">

      <ParallaxHero
        breadcrumbs={[{ label: "Gallery" }]}
        title={<>Our <span className="text-[#01acac]">Gallery</span></>}
        subtitle="Moments from BRO Forum meetings, events, and celebrations across all our chapters."
      />

      {/* Filter */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex gap-3 flex-wrap justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#002284] text-white shadow-lg shadow-[#002284]/20"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#01acac]/40 hover:text-[#01acac]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-400 text-sm mb-8">{filtered.length} photo{filtered.length !== 1 ? "s" : ""}</p>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-square bg-slate-100 shadow-sm hover:shadow-xl transition-shadow"
                  onClick={() => setLightbox(item.id)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#002284]/0 group-hover:bg-[#002284]/60 transition-all duration-300 flex flex-col items-center justify-center gap-2 p-4">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-white text-sm font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                      {item.title}
                    </p>
                    <span className="text-[#01acac] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.category} · {item.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            {currentIndex > 0 && (
              <button
                onClick={e => { e.stopPropagation(); prev(); }}
                className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ paddingBottom: "60%" }}>
                <Image
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.title}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              {/* Caption */}
              <div className="bg-[#002284] px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{activeLightboxItem.title}</h3>
                  <p className="text-white/60 text-sm">{activeLightboxItem.category} · {activeLightboxItem.date}</p>
                </div>
                <span className="text-white/40 text-sm">{currentIndex + 1} / {filtered.length}</span>
              </div>
            </motion.div>

            {/* Next */}
            {currentIndex < filtered.length - 1 && (
              <button
                onClick={e => { e.stopPropagation(); next(); }}
                className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
