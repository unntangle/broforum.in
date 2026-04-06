"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxHero from "@/components/ParallaxHero";
import { ArrowRight, Calendar, MapPin, Clock, Users, Filter } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "BRO Forum National Summit 2025",
    type: "National",
    date: "April 25, 2025",
    time: "9:00 AM – 6:00 PM",
    location: "The Leela Palace, Chennai",
    attendees: 320,
    img: "/tertiary-image.png",
    tag: "flagship",
    desc: "Our biggest annual gathering bringing together 300+ members from all chapters for a full day of keynotes, networking, and business pitches.",
    price: "₹2,500",
  },
  {
    id: 2,
    title: "Chapter Launch – Coimbatore",
    type: "Chapter",
    date: "May 10, 2025",
    time: "10:00 AM – 1:00 PM",
    location: "Residency Towers, Coimbatore",
    attendees: 60,
    img: "/features-image.png",
    tag: "launch",
    desc: "We're opening our newest chapter in Coimbatore. Attend as a guest to meet founding members and explore membership opportunities.",
    price: "Free",
  },
  {
    id: 3,
    title: "Power Breakfast – Mumbai",
    type: "Chapter",
    date: "May 17, 2025",
    time: "7:30 AM – 9:30 AM",
    location: "ITC Grand Central, Mumbai",
    attendees: 45,
    img: "/hero-image.png",
    tag: "weekly",
    desc: "Weekly structured meeting for Mumbai chapter members. 60-second business pitches, referral passing, and one featured speaker.",
    price: "Members Only",
  },
  {
    id: 4,
    title: "Business Growth Masterclass",
    type: "Workshop",
    date: "June 5, 2025",
    time: "2:00 PM – 5:00 PM",
    location: "Online – Zoom",
    attendees: 150,
    img: "/features-image.png",
    tag: "workshop",
    desc: "An intensive half-day workshop on scaling your business using referral systems. Led by BRO Forum's top revenue-generating members.",
    price: "₹999",
  },
  {
    id: 5,
    title: "International Delegation – Dubai",
    type: "International",
    date: "June 20, 2025",
    time: "All Day",
    location: "Dubai World Trade Centre",
    attendees: 80,
    img: "/tertiary-image.png",
    tag: "international",
    desc: "A curated delegation trip for Power Members to connect with BRO Forum's Dubai chapter and explore cross-border business opportunities.",
    price: "₹45,000",
  },
  {
    id: 6,
    title: "Women in Business Networking Lunch",
    type: "Special",
    date: "July 8, 2025",
    time: "12:00 PM – 3:00 PM",
    location: "Taj Coromandel, Chennai",
    attendees: 90,
    img: "/hero-image.png",
    tag: "special",
    desc: "A dedicated networking lunch celebrating women entrepreneurs in BRO Forum. Open to all female members and guests.",
    price: "₹1,200",
  },
];

const tagColors: Record<string, string> = {
  flagship: "bg-[#002284] text-white",
  launch: "bg-[#002284] text-white",
  weekly: "bg-slate-700 text-white",
  workshop: "bg-[#01acac] text-white",
  international: "bg-purple-600 text-white",
  special: "bg-amber-500 text-white",
};

const filters = ["All", "National", "Chapter", "Workshop", "International", "Special"];

export default function EventsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? events : events.filter(e => e.type === active);

  return (
    <div className="flex flex-col w-full">

      <ParallaxHero
        breadcrumbs={[{ label: "Events" }]}
        title={<>Where Business<br /><span className="text-[#01acac]">Relationships Begin</span></>}
        subtitle="From weekly chapter meetings to national summits — every BRO Forum event is designed to generate real business value, not just handshakes."
      />

      {/* Events List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Filter Bar */}
          <div className="flex items-center gap-3 flex-wrap mb-12">
            <Filter size={16} className="text-slate-400" />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === f
                    ? "bg-[#002284] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Featured Event */}
          {filtered[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-slate-100"
            >
              <div className="relative h-72 lg:h-auto min-h-[300px]">
                <Image src={filtered[0].img} alt={filtered[0].title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#002284]/60 to-transparent" />
                <div className={`absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-black uppercase ${tagColors[filtered[0].tag]}`}>
                  {filtered[0].tag}
                </div>
              </div>
              <div className="bg-white p-10 flex flex-col justify-center">
                <span className="text-[#01acac] font-bold text-sm uppercase tracking-widest mb-3">Featured Event</span>
                <h2 className="text-3xl font-bold text-[#002284] mb-4">{filtered[0].title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{filtered[0].desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Calendar size={16} className="text-[#01acac]" />{filtered[0].date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Clock size={16} className="text-[#01acac]" />{filtered[0].time}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin size={16} className="text-[#01acac]" />{filtered[0].location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <Users size={16} className="text-[#01acac]" />{filtered[0].attendees} attending
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#002284]">{filtered[0].price}</span>
                  <Link href="/contact" className="bg-[#002284] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#002284]/90 transition-all inline-flex items-center gap-2">
                    Register <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="relative h-48">
                  <Image src={event.img} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/60 to-transparent" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase ${tagColors[event.tag]}`}>
                    {event.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-[#002284]">
                    {event.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#002284] mb-3 group-hover:text-[#01acac] transition-colors">{event.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.desc}</p>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Calendar size={13} className="text-[#01acac]" />{event.date} · {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <MapPin size={13} className="text-[#01acac]" />{event.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Users size={13} className="text-[#01acac]" />{event.attendees} attending
                    </div>
                  </div>
                  <Link href="/contact" className="w-full block text-center bg-slate-50 hover:bg-[#002284] hover:text-white text-[#002284] py-2.5 rounded-xl text-sm font-bold transition-all">
                    Register →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host an Event */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">For Members</span>
            <h2 className="text-4xl font-bold text-[#002284]">Want to Host a Chapter Event?</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              BRO Forum members can propose and host local events, workshops, and industry-specific networking sessions. We provide the platform, you bring the expertise.
            </p>
            <ul className="space-y-3">
              {["Full logistical support from BRO Forum", "Promoted to all local chapter members", "Counted towards your leadership score", "Access to our venue partner network"].map(b => (
                <li key={b} className="flex items-center gap-3 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-[#01acac] shrink-0" />{b}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#002284] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#002284]/90 transition-all">
              Propose an Event <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/features-image.png" alt="Event" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/70 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-white font-bold text-xl mb-1">12 events per month</div>
                <div className="text-white/70 text-sm">across all active BRO Forum chapters</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#002284]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Never Miss a BRO Forum Event</h2>
          <p className="text-white/70 mb-8">Subscribe to our events calendar and get early-bird access to registrations.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-[#01acac]" />
            <button className="bg-[#01acac] text-white px-6 py-3.5 rounded-xl font-bold whitespace-nowrap hover:bg-[#01acac]/90 transition-all">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}
