"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, TrendingUp, CheckCircle, Calendar, MapPin, Clock, Handshake, Star, Shield, Target } from "lucide-react";

const stats = [
  { label: "Active Members", value: "15+", icon: Users },
  { label: "Chapters", value: "1", icon: Globe },
  { label: "Business Referrals", value: "Weekly", icon: TrendingUp },
  { label: "Years Running", value: "7+", icon: Star },
];

const howItWorks = [
  { step: "01", title: "Apply to Join", desc: "Submit your membership application. One seat per business category — no competition, only collaboration." },
  { step: "02", title: "Attend a Meeting", desc: "Visit as a guest on any Thursday, 8:30–9:30 AM IST. Experience the structured referral format firsthand." },
  { step: "03", title: "Get Accepted", desc: "Our chapter reviews your application. Once accepted, you hold the exclusive seat for your category." },
  { step: "04", title: "Give & Receive Referrals", desc: "Every week, members pass qualified referrals. The more you give, the more you receive." },
];

const values = [
  { icon: Handshake, title: "Givers Gain", desc: "Our founding philosophy — members who actively give referrals consistently receive more in return." },
  { icon: Shield, title: "One Seat Per Category", desc: "Only one member per business type per chapter. Zero internal competition, maximum trust." },
  { icon: Target, title: "Structured & Accountable", desc: "Every meeting follows a proven agenda. No small talk — every minute drives real business outcomes." },
  { icon: TrendingUp, title: "Results Driven", desc: "Members track referrals passed and received. Your ROI is measurable from day one." },
];

const members = [
  { name: "Mr. P. Manohar", business: "Aqua Eco Green Technology", category: "Pumps", initials: "PM" },
  { name: "Mr. G. Subramani", business: "SJ Window", category: "UPVC Windows", initials: "GS" },
  { name: "Mr. G M Muthu", business: "GM Modular", category: "Interior Contractor", initials: "GM" },
  { name: "Dr. S. Virapan", business: "SanVir Associates", category: "MEP Consultant", initials: "SV" },
  { name: "Mr. M. Ravi", business: "VTECH O-MATE Solar", category: "Solar Power", initials: "MR" },
  { name: "Mr. A. Perumal", business: "V for U Financial", category: "Loans", initials: "AP" },
];

function getNextThursday(): string {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay();
  const daysUntil = (4 - day + 7) % 7 || 7;
  const next = new Date(ist);
  next.setDate(ist.getDate() + daysUntil);
  return next.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function Home() {
  const nextThursday = getNextThursday();

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center bg-slate-50 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#002284]/3 rounded-l-[4rem] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#01acac]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#002284]/8 text-[#002284] px-4 py-2 rounded-full text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-[#01acac] animate-pulse" />
              Chennai's Premier Business Referral Forum
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#002284] leading-[1.1]">
              Your Network<br />
              Is Your<br />
              <span className="text-[#01acac]">Net Worth.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              BRO Forum — Business Relationship Organisation — is a structured, referral-based networking community. Members meet every Thursday to pass qualified referrals and grow each other's businesses.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/join" className="inline-flex items-center gap-2 bg-[#002284] hover:bg-[#002284]/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all">
                Apply for Membership <ArrowRight size={18} />
              </Link>
              <Link href="/events" className="inline-flex items-center gap-2 border-2 border-[#002284] text-[#002284] hover:bg-[#002284]/8 px-8 py-4 rounded-xl font-bold text-base transition-all">
                Attend a Meeting
              </Link>
            </div>

            {/* Next meeting pill */}
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 bg-[#01acac] rounded-lg flex items-center justify-center shrink-0">
                <Calendar size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Next Meeting</p>
                <p className="text-sm font-bold text-[#002284]">{nextThursday} · 8:30 AM IST</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[560px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/hero-image.png" alt="BRO Forum Members" fill className="object-cover object-center" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/40 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-xl px-6 py-4 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Meetings Held</p>
              <p className="text-3xl font-black text-[#002284]">350+</p>
              <p className="text-xs text-slate-500 mt-0.5">Every Thursday since 2018</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#002284] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center border-r border-white/10 last:border-0 px-4"
              >
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[#01acac] text-sm font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is BRO Forum ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/features-image.png" alt="BRO Forum Meeting" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <p className="text-white font-bold">Every Thursday · 8:30–9:30 AM</p>
                <p className="text-white/70 text-sm mt-0.5">Structured referral passing · Chennai Chapter</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">About BRO Forum</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#002284] mt-3 leading-tight">
                We Build Businesses<br />Through Relationships
              </h2>
              <p className="text-slate-600 mt-4 leading-relaxed text-lg">
                BRO Forum is not casual networking. It's a structured, weekly commitment where members actively refer business to each other — tracked, accountable, and results-driven.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "One exclusive seat per business category — no internal competition",
                "Structured 60-minute meetings every Thursday",
                "Formal referral passing with accountability",
                "Members-only business directory and 1-to-1 meetings",
                "Built on the philosophy: Givers Gain",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle size={18} className="text-[#01acac] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/who-we-are" className="inline-flex items-center gap-2 text-[#002284] font-bold hover:text-[#01acac] transition-colors">
              Learn more about us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">The Process</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#002284] mt-3">How BRO Forum Works</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">From guest to member to referral powerhouse — here's the journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="text-[#01acac] font-black text-4xl mb-4">{step.step}</div>
                <h3 className="text-lg font-bold text-[#002284] mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next Meeting CTA ── */}
      <section className="py-16 bg-[#002284] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#01acac]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-xs">Join Us This Week</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Attend This Thursday's Meeting</h2>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{nextThursday}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />8:30 – 9:30 AM IST</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />Chennai Chapter</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#01acac] hover:bg-[#01acac]/90 text-white px-8 py-3.5 rounded-xl font-bold transition-all">
              Register to Attend <ArrowRight size={16} />
            </Link>
            <Link href="/join" className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold transition-all">
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Why BRO Forum</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#002284] mt-3">Built on Proven Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-7 rounded-3xl border border-slate-100 hover:border-[#01acac]/30 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-[#002284]/8 group-hover:bg-[#002284] rounded-2xl flex items-center justify-center mb-5 transition-colors">
                  <v.icon size={22} className="text-[#002284] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-[#002284] mb-2">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Some Members ── */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[#01acac] font-bold uppercase tracking-widest text-xs">Our Chapter</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002284] mt-2">Meet Some of Our Members</h2>
            </div>
            <Link href="/members" className="inline-flex items-center gap-2 text-[#002284] font-bold hover:text-[#01acac] transition-colors shrink-0">
              View all members <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative carousel-wrapper">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div
            className="flex gap-4 carousel-track"
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
            style={{
              animation: "scroll-members 25s linear infinite",
              width: "max-content",
            }}
          >
            {/* Render members twice for seamless loop */}
            {[...members, ...members, ...members, ...members, ...members, ...members].map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all shrink-0"
                style={{ width: "210px" }}
              >
                {/* Portrait block */}
                <div
                  className="w-full flex items-center justify-center bg-[#e8edf5] relative"
                  style={{ height: "240px" }}
                >
                  <span className="text-[#002284] font-black text-7xl tracking-tight select-none">{m.initials}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#002284]/20 to-transparent" />
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-[#002284] font-bold text-sm leading-tight">{m.name}</p>
                  <p className="text-[#01acac] text-xs font-semibold mt-1">{m.category}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-tight">{m.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes scroll-members {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-210px * 6 - 16px * 6)); }
          }
          .carousel-wrapper:hover .carousel-track {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#002284] to-[#003399] rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
            <div className="relative text-center space-y-6">
              <div className="text-[#01acac] text-6xl font-black leading-none">"</div>
              <p className="text-white text-2xl md:text-3xl font-bold leading-relaxed max-w-3xl mx-auto">
                BRO Forum changed the way I do business. Within 3 months I had more referrals than I'd received in the previous 2 years combined.
              </p>
              <div className="pt-4">
                <div className="w-12 h-12 rounded-full bg-[#01acac] flex items-center justify-center mx-auto mb-3 text-white font-black">MR</div>
                <p className="text-white font-bold">Mr. M. Ravi</p>
                <p className="text-white/60 text-sm">VTECH O-MATE Solar · BRO Forum Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Ready to Grow?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002284] mt-4 mb-6 leading-tight">
            One Seat. One Category.<br />Unlimited Referrals.
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Seats fill fast. Once your category is taken, it's closed. Apply now to secure your exclusive seat in the BRO Forum Chennai Chapter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/join" className="inline-flex items-center gap-2 bg-[#002284] hover:bg-[#002284]/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
              Apply for Membership <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-[#002284] text-[#002284] hover:bg-[#002284]/8 px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
