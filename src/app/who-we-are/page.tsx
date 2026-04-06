"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, Target, Shield, Handshake, TrendingUp, Star, Award } from "lucide-react";

const values = [
  { icon: Handshake, title: "Givers Gain", desc: "Our core philosophy — those who give referrals receive them. Generosity is the engine of our network." },
  { icon: Shield, title: "Trust & Accountability", desc: "Every member is vetted. We maintain strict standards so you know every connection is trustworthy." },
  { icon: Target, title: "One Seat Per Category", desc: "Only one member per business category per chapter — zero competition, maximum collaboration." },
  { icon: TrendingUp, title: "Structured Growth", desc: "Weekly structured meetings with proven agendas ensure every session generates real business value." },
];

const leadership = [
  { name: "Rajesh Nair", role: "Founder & President", chapter: "Chennai HQ", img: "/hero-image.png" },
  { name: "Priya Sharma", role: "Director of Growth", chapter: "Bangalore", img: "/features-image.png" },
  { name: "Arjun Mehta", role: "Regional Director", chapter: "Mumbai", img: "/hero-image.png" },
  { name: "Sunita Reddy", role: "Head of Chapters", chapter: "Hyderabad", img: "/features-image.png" },
];

const milestones = [
  { year: "2018", event: "BRO Forum Founded", desc: "Started with 12 founding members in Chennai." },
  { year: "2019", event: "5 Chapters Launched", desc: "Expanded to Bangalore, Mumbai, Delhi, and Hyderabad." },
  { year: "2021", event: "$10M Business Generated", desc: "Members crossed the first major milestone in referral value." },
  { year: "2023", event: "International Expansion", desc: "Chapters opened in Dubai and Singapore." },
  { year: "2025", event: "2,500+ Members", desc: "45 active chapters across 12 countries." },
];

export default function WhoWeArePage() {
  return (
    <div className="flex flex-col w-full">

      {/* Hero */}
      <section className="relative bg-[#002284] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/map-bg.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#01acac]/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#01acac]" />
              About BRO Forum
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              We Build <span className="text-[#01acac]">Businesses</span><br /> Through Relationships
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              BRO Forum — Business Relationship Organisation — is a structured, referral-based business networking community built on the belief that the right relationships are the most powerful business tool you'll ever have.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002284] leading-tight">
              Connecting people who mean business
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              BRO Forum was founded on a simple but powerful idea: when business professionals support each other with qualified referrals, everyone grows. We've built an ecosystem where trust is currency and relationships are the product.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Unlike casual networking, BRO Forum is structured, accountable, and results-driven. Our members don't just exchange cards — they exchange revenue.
            </p>
            <Link href="/membership" className="inline-flex items-center gap-2 bg-[#002284] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#002284]/90 transition-all">
              Explore Membership <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/features-image.png" alt="BRO Forum Meeting" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
                {[{ v: "2,500+", l: "Members" }, { v: "45+", l: "Chapters" }, { v: "$150M+", l: "Referrals" }].map(s => (
                  <div key={s.l} className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
                    <div className="text-2xl font-bold text-white">{s.v}</div>
                    <div className="text-white/70 text-xs">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002284] mt-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 bg-[#002284]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#002284] transition-colors">
                  <v.icon size={24} className="text-[#002284] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#002284] mb-3">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002284] mt-4">How We Got Here</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#002284] via-[#01acac] to-[#002284]" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-8 pl-24 relative"
                >
                  <div className="absolute left-0 w-16 h-16 bg-[#002284] rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {m.year}
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 flex-1 border border-slate-100">
                    <h3 className="text-xl font-bold text-[#002284] mb-1">{m.event}</h3>
                    <p className="text-slate-600 text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">The Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002284] mt-4">Leadership</h2>
            <p className="text-slate-600 mt-4 max-w-xl mx-auto">Experienced leaders committed to growing your business and expanding the BRO Forum community globally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 shadow-md">
                  <Image src={l.img} alt={l.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002284]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-[#002284]">{l.name}</h3>
                <p className="text-[#01acac] text-sm font-semibold">{l.role}</p>
                <p className="text-slate-500 text-xs mt-1">{l.chapter}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#002284] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><Image src="/map-bg.png" alt="" fill className="object-cover" /></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to Join the Network?</h2>
          <p className="text-white/70 text-xl mb-10">Become part of a community that actively works to grow your business every single week.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="bg-[#01acac] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#01acac]/90 transition-all inline-flex items-center gap-2">
              Apply for Membership <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
