"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";

const members = [
  { name: "Dr. S. Virapan", business: "SanVir Associates Pvt. Ltd.", category: "MEP Consultant", website: "#" },
  { name: "Mr. V. Ramesh Kumar", business: "Srushti - SRRE Communications", category: "Brand & Communication Agency", website: "#" },
  { name: "Ar. S. Dinesh", business: "RSD Foundations", category: "Real Estate Promoter", website: "#" },
  { name: "Mr. P. Manohar", business: "Aqua Eco Green Technology Pvt. Ltd.", category: "Pumps", website: "#" },
  { name: "Mr. Sudharson Raj", business: "Sri Kaligambal Industries", category: "Fasteners Manufacturing", website: "#" },
  { name: "Mr. G M Muthu", business: "GM Modular", category: "Interior Contractor", website: "#" },
  { name: "Mr. A. Perumal", business: "V for U Financial Services", category: "Loans", website: "#" },
  { name: "Mr. M. Ravi", business: "VTECH - O-MATE SOLAR", category: "Solar Power", website: "#" },
  { name: "Mr. R. Deenadhayalan", business: "Classical Pest Control", category: "Pest Control", website: "#" },
  { name: "Mr. G. Sathish", business: "Oli Av Tech", category: "Home Automation", website: "#" },
  { name: "Mr. G. Subramani", business: "SJ Window", category: "UPVC Window", website: "#" },
  { name: "Mr. Sakthivel N", business: "Growth Way Developers", category: "Real Estate", website: "#" },
  { name: "Mr. R. Rajesh", business: "Sss Cool Power Systems", category: "Home Appliances Dealer", website: "#" },
  { name: "Mr. Vinoth Suren Raj", business: "Fotophactory", category: "Photography & Videography", website: "#" },
  { name: "Mr. Mathiarasu V M", business: "Techmaxx Engineering", category: "Fire Fighting", website: "#" },
];

// Generate initials from name
function getInitials(name: string) {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Ar\.)/i, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");
}

const bgColors = ["#e8edf5"];

const categories = ["All", ...Array.from(new Set(members.map(m => m.category))).sort()];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = members.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.business.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full">

      {/* Hero */}
      <section className="relative bg-[#002284] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/map-bg.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#01acac]/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#01acac] animate-pulse" />
              {members.length} Active Members
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Our <span className="text-[#01acac]">Members</span>
            </h1>
            <p className="text-base text-white/70 max-w-xl mx-auto">
              Meet the business leaders behind BRO Forum. Click any member to visit their business.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent" />
      </section>

      {/* Search & Filter */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search bar — centered, large, minimal */}
          <div className="relative max-w-2xl mx-auto mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#002284]/10 via-[#01acac]/10 to-[#002284]/10 rounded-2xl blur-xl" />
            <div className="relative flex items-center bg-white border-2 border-slate-100 hover:border-[#01acac]/50 focus-within:border-[#01acac] rounded-2xl px-5 py-4 transition-all shadow-sm">
              <Search size={20} className="text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Search member or business..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-slate-800 text-base outline-none placeholder-slate-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-700 ml-3 text-xs font-semibold">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category filter — horizontal scrollable chips with icons */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#002284] text-white shadow-lg shadow-[#002284]/20"
                    : "bg-slate-50 text-slate-600 hover:bg-[#01acac]/10 hover:text-[#01acac] border border-slate-200 hover:border-[#01acac]/30"
                }`}
              >
                {activeCategory === cat && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#002284] to-[#01acac] -z-10" />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-xl font-semibold">No members found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-8">{filtered.length} member{filtered.length !== 1 ? "s" : ""} found</p>
              <div className="grid grid-cols-4 gap-5">
                {filtered.map((member, i) => (
                  <motion.a
                    key={member.name}
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    {/* Avatar placeholder */}
                    <div
                      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 flex items-center justify-center group-hover:shadow-xl transition-all"
                      style={{ backgroundColor: "#e8edf5" }}
                    >
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                          backgroundSize: "30px 30px"
                        }}
                      />
                      {/* Initials */}
                      <span className="text-[#002284] font-black text-5xl tracking-tight select-none relative z-10">
                        {getInitials(member.name)}
                      </span>
                      {/* Bottom gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-[#01acac] text-base leading-tight mb-1 group-hover:text-[#002284] transition-colors">
                      {member.name}
                    </h3>

                    {/* Business */}
                    <p className="text-slate-500 text-sm leading-snug">
                      {member.business}
                    </p>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#002284]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want to be Listed Here?</h2>
          <p className="text-white/70 mb-8">Join BRO Forum and get your business in front of 2,500+ professionals.</p>
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
