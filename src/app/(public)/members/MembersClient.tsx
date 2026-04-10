"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ParallaxHero from "@/components/ParallaxHero";
import type { MemberRow } from "@/lib/supabase";

// ─── Static fallback categories ───────────────────────────────────────────────
const ALL_CATEGORIES = [
  "All",
  "Brand & Communication Agency",
  "Civil Constructions & Builders",
  "Civil Contractor",
  "Commercial Furniture",
  "Electrical Panel",
  "Fire Fighting",
  "Home Appliances Dealer",
  "Home Automation",
  "IT & Home Automation",
  "Insurance",
  "Interior Contractor",
  "LED Lighting",
  "Loans",
  "MEP Consultant",
  "Pest Control",
  "Photography & Videography",
  "Property Consultant",
  "Pumps",
  "STP",
  "Sand Supplier",
  "Solar Power",
  "UPVC Window",
];

// ─── Local photo map ──────────────────────────────────────────────────────────
const MEMBER_PHOTOS: Record<string, string> = {
  "Mr. S. Virapan":           "/members-pics/S. VIRAPAN.jpeg",
  "Mr. V. Ramesh Kumar":      "/members-pics/V. RAMESH KUMAR .jpeg",
  "Mr. S. Dinesh":            "/members-pics/S. DINESH.jpeg",
  "Mr. P. Manohar":           "/members-pics/P. MANOHAR.jpeg",
  "Mr. Sudharrson Raj":       "/members-pics/SUDHARSON  RAJ.jpeg",
  "Mr. G M Muthu":            "/members-pics/G M Muthu.webp",
  "Mr. A. Perumal":           "/members-pics/A. PERUMAL.jpeg",
  "Mr. M. Ravi":              "/members-pics/M. RAVI.jpeg",
  "Mr. Sathish Ganasekar":    "/members-pics/SATHISH GANASEKAR.jpeg",
  "Mr. G. Subramani":         "/members-pics/SUBRAMANI .G.jpeg",
  "Mr. N. Sakthivel":         "/members-pics/SAKTHIVEL.N.jpeg",
  "Mr. R. Rajesh":            "/members-pics/R.RAJESH.jpeg",
  "Mr. Vinoth Suren Raj":     "/members-pics/VINOTH SUREN RAJ.jpeg",
  "Mr. V. M. Mathiarasu":     "/members-pics/MATHIARASU.V.M.webp",
  "Mr. R. Ashokan":           "/members-pics/R.Ashokan.jpeg",
  "Ms. D. Vijayalakshmi":     "/members-pics/D.Vijayalakshmi.jpeg",
  "Mr. Gokul Sridharan":      "/members-pics/Gokul Sridharan.jpeg",
  "Mr. Suresh Purushothaman": "/members-pics/SURESH PURUSHOTHAMAN.jpeg",
  "Mr. Sathish Kumar I":      "/members-pics/SATHISH KUMAR.I.jpeg",
  "Mr. B. Ravindran":         "/members-pics/B.RAVINDRAN.jpeg",
};

function getMemberPhoto(member: MemberRow): string | null {
  return member.photo ?? MEMBER_PHOTOS[member.name] ?? null;
}

function getInitials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Ar\.)/i, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MembersClient({ members }: { members: MemberRow[] }) {
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilter, setShowFilter]         = useState(false);
  const filterRef                           = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const liveCategories = Array.from(new Set(members.map((m) => m.category))).sort();
  const categories     = Array.from(new Set([...ALL_CATEGORIES, ...liveCategories]));

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.business.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">
      <ParallaxHero
        breadcrumbs={[{ label: "Members" }]}
        title={<>Our <span className="text-[#01acac]">Members</span></>}
        subtitle="Meet the business leaders behind BRO Forum. Click any member to visit their business."
      />

      {/* ── Search & Filter ── */}
      <section className="bg-white py-5 border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6">
          <div className="relative" ref={filterRef}>

            {/* Search row */}
            <div className="flex items-center gap-2">

              {/* Search input */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search member or business..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-9 py-3 rounded-xl border border-slate-200 focus:border-[#002284] focus:ring-4 focus:ring-[#002284]/8 outline-none text-slate-700 text-sm transition-all placeholder-slate-400 bg-white"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter button */}
              <button
                onClick={() => setShowFilter((v) => !v)}
                className={`relative flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 shrink-0 ${
                  showFilter || activeCategory !== "All"
                    ? "bg-[#002284] border-[#002284] text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                <SlidersHorizontal size={15} />
                <span className="hidden sm:inline">Filter</span>
                {/* Active indicator dot */}
                {activeCategory !== "All" && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#01acac] border-2 border-white" />
                )}
              </button>
            </div>

            {/* ── Dropdown ── */}
            <AnimatePresence>
              {showFilter && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/80 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Filter by Industry
                    </p>
                    <div className="flex items-center gap-4">
                      {activeCategory !== "All" && (
                        <button
                          onClick={() => setActiveCategory("All")}
                          className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => setShowFilter(false)}
                        className="text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="py-1.5 max-h-72 overflow-y-auto">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setShowFilter(false); }}
                          className={`w-full flex items-center justify-between px-5 py-2.5 text-sm text-left transition-colors ${
                            isActive
                              ? "text-[#002284] font-semibold bg-[#002284]/5"
                              : "text-slate-600 font-normal hover:bg-slate-50"
                          }`}
                        >
                          <span>{cat}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#002284] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60">
                    <p className="text-xs text-slate-400">
                      {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active filter tag */}
          <AnimatePresence>
            {activeCategory !== "All" && (
              <motion.div
                key="tag"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="flex items-center gap-2 mt-3"
              >
                <span className="text-xs text-slate-400">Showing:</span>
                <span className="inline-flex items-center gap-1.5 bg-[#002284]/8 text-[#002284] text-xs font-semibold px-3 py-1 rounded-full">
                  {activeCategory}
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="hover:opacity-60 transition-opacity"
                  >
                    <X size={11} />
                  </button>
                </span>
                <span className="text-xs text-slate-400">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Members Grid ── */}
      <section className="pt-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-xl font-semibold">No members found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          ) : (
            <>
              <p className="text-slate-400 text-sm mb-8">
                {filtered.length} member{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {filtered.map((member, i) => (
                  <motion.a
                    key={member.id}
                    href={member.website ?? "#"}
                    target={member.website && member.website !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div
                      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 flex items-center justify-center group-hover:shadow-xl transition-all"
                      style={{ backgroundColor: "#e8edf5" }}
                    >
                      {getMemberPhoto(member) ? (
                        <Image
                          src={getMemberPhoto(member)!}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <span className="text-[#002284] font-black text-5xl tracking-tight select-none relative z-10">
                          {getInitials(member.name)}
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <h3 className="font-bold text-[#01acac] text-base leading-tight mb-1 group-hover:text-[#002284] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-snug">{member.business}</p>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#002284]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want to be Listed Here?</h2>
          <p className="text-white/70 mb-8">
            Join BRO Forum and grow your business through structured referrals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#01acac] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#01acac]/90 transition-all"
          >
            Apply for Membership
          </a>
        </div>
      </section>
    </div>
  );
}
