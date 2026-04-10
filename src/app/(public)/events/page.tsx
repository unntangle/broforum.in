"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxHero from "@/components/ParallaxHero";
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle } from "lucide-react";

// Generate next N Thursdays from today in IST
function getUpcomingThursdays(count: number) {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = ist.getDay(); // 0=Sun, 4=Thu
  const daysUntilThursday = (4 - day + 7) % 7 || 7;

  const thursdays = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(ist);
    d.setDate(ist.getDate() + daysUntilThursday + i * 7);
    thursdays.push(d);
  }
  return thursdays;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function formatShortDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

const meetingFormat = [
  { time: "8:30 AM", activity: "Arrival & Networking", desc: "Members arrive, exchange business cards, informal networking." },
  { time: "8:40 AM", activity: "Welcome & Announcements", desc: "Chapter President opens the meeting and shares chapter updates." },
  { time: "8:45 AM", activity: "60-Second Introductions", desc: "Every member delivers their weekly business pitch in 60 seconds." },
  { time: "9:00 AM", activity: "Featured Speaker", desc: "One member presents a 10-minute deep dive into their business." },
  { time: "9:10 AM", activity: "Referral Passing", desc: "Members formally pass qualified referrals to each other." },
  { time: "9:20 AM", activity: "Testimonials", desc: "Members share results from referrals received." },
  { time: "9:25 AM", activity: "1-to-1 Scheduling", desc: "Members schedule one-on-one meetings for the coming week." },
  { time: "9:30 AM", activity: "Close", desc: "Chapter President closes with the BRO Forum motto." },
];

const benefits = [
  "Structured referral passing every week",
  "One exclusive seat per business category",
  "60-second pitch to 15+ business owners",
  "Accountability and follow-up built in",
  "Access to member directory and contacts",
  "Visitors welcome — paid entry applies",
];

export default function EventsPage() {
  const thursdays = getUpcomingThursdays(8);
  const nextThursday = thursdays[0];

  return (
    <div className="flex flex-col w-full">

      <ParallaxHero
        breadcrumbs={[{ label: "Events" }]}
        title={<>Every <span className="text-[#01acac]">Thursday</span><br />We Mean Business</>}
        subtitle="BRO Forum meets every Thursday morning — a structured, referral-driven session where members actively grow each other's businesses."
      />

      {/* Next Meeting Hero Card */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001a6e] via-[#002284] to-[#003399]" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#01acac]/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

            <div className="relative p-8 md:p-12">
              {/* Top label */}
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#01acac] animate-pulse" />
                <span className="text-[#01acac] text-xs font-black uppercase tracking-[0.2em]">Next Meeting</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Left — title + details */}
                <div className="lg:col-span-3 space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                      BRO Forum <span className="text-[#01acac]">Weekly</span><br />Chapter Meeting
                    </h2>
                  </div>

                  {/* Detail pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: Calendar, label: "Date", value: formatDate(nextThursday) },
                      { icon: Clock, label: "Time", value: "8:30 AM – 9:30 AM IST" },
                      { icon: MapPin, label: "Venue", value: "Chennai Chapter (shared on registration)" },
                      { icon: Users, label: "Who", value: "Members + Visitors (paid)" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
                        <div className="w-8 h-8 rounded-lg bg-[#01acac]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={15} className="text-[#01acac]" />
                        </div>
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">{label}</p>
                          <p className="text-white text-sm font-semibold leading-snug">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#01acac] hover:bg-[#01acac]/90 text-white px-7 py-3 rounded-xl font-bold text-sm transition-all">
                      Register to Attend <ArrowRight size={15} />
                    </Link>
                    <Link href="/join" className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 text-white px-7 py-3 rounded-xl font-bold text-sm transition-all">
                      Join as Member
                    </Link>
                  </div>
                </div>

                {/* Right — open to + cost */}
                <div className="lg:col-span-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5">
                  <h3 className="text-white font-bold text-base">Open to</h3>
                  <ul className="space-y-2.5">
                    {[
                      "Active BRO Forum members",
                      "Visitors & guests (paid entry)",
                      "Prospective members (paid entry)",
                      "Business owners from any industry",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-white/75 text-sm">
                        <CheckCircle size={14} className="text-[#01acac] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-1">Entry</p>
                    <p className="text-[#01acac] font-black text-lg">Paid Entry</p>
                    <p className="text-white/50 text-xs mt-0.5">Contact us for fee details</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Thursdays */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[#01acac] font-bold uppercase tracking-widest text-xs">Mark Your Calendar</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#002284] mt-2">Upcoming Thursday Meetings</h2>
            </div>
            <p className="text-slate-400 text-sm">8:30 – 9:30 AM IST · Chennai</p>
          </div>

          {/* Next up — featured row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between bg-gradient-to-r from-[#002284] to-[#003399] rounded-2xl px-6 py-5 mb-4 shadow-lg"
          >
            <div className="flex items-center gap-5">
              <div className="text-center bg-[#01acac] rounded-xl px-4 py-2 shrink-0">
                <div className="text-white font-black text-2xl leading-none">
                  {thursdays[0].toLocaleDateString("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" })}
                </div>
                <div className="text-white/80 text-xs font-semibold">
                  {thursdays[0].toLocaleDateString("en-IN", { month: "short", timeZone: "Asia/Kolkata" })}
                </div>
              </div>
              <div>
                <span className="inline-block bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest mb-1">Next Up</span>
                <p className="text-white font-bold">
                  {thursdays[0].toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}
                </p>
                <p className="text-white/50 text-xs mt-0.5">8:30 AM – 9:30 AM IST</p>
              </div>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#01acac] hover:bg-[#01acac]/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
              Register <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Remaining dates — compact list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {thursdays.slice(1).map((thursday, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl px-5 py-4 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    <span className="text-[#002284] font-black text-sm">
                      {thursday.toLocaleDateString("en-IN", { day: "numeric", timeZone: "Asia/Kolkata" })}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#002284] font-semibold text-sm">
                      {thursday.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata" })}
                    </p>
                    <p className="text-slate-400 text-xs">{thursday.toLocaleDateString("en-IN", { year: "numeric", timeZone: "Asia/Kolkata" })} · 8:30 AM IST</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 text-xs font-bold text-[#002284] border border-[#002284]/30 hover:bg-[#002284] hover:text-white px-4 py-1.5 rounded-lg transition-all"
                >
                  Register
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Format */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">What to Expect</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002284] mt-3">Meeting Format</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">Every BRO Forum Thursday meeting follows the same structured agenda — so every minute counts.</p>
          </div>
          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#002284] to-[#01acac] hidden md:block" />
            <div className="space-y-4">
              {meetingFormat.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-[#01acac] font-black text-sm">{item.time}</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#002284] border-2 border-white shadow-md shrink-0 mt-1 hidden md:block" />
                  <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-[#01acac]/30 transition-colors">
                    <h3 className="font-bold text-[#002284] mb-1">{item.activity}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Why Attend</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002284]">60 Minutes That Grow Your Business</h2>
            <p className="text-slate-600 leading-relaxed">
              Unlike casual networking events, BRO Forum meetings are structured, accountable, and results-driven. Every member has a seat, a voice, and a responsibility to give referrals — not just collect them.
            </p>
            <ul className="space-y-3">
              {benefits.map(b => (
                <li key={b} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle size={18} className="text-[#01acac] shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-[#002284] text-[#002284] hover:bg-[#002284]/10 px-8 py-3 rounded-xl font-bold transition-all duration-200">
              Register for Next Thursday <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-[#002284] rounded-3xl p-8 space-y-6">
            <h3 className="text-white font-bold text-xl">Meeting Details</h3>
            <div className="space-y-4">
              {[
                { label: "Frequency", value: "Every Thursday" },
                { label: "Time", value: "8:30 AM – 9:30 AM IST" },
                { label: "Duration", value: "1 hour (structured)" },
                { label: "Location", value: "No.14A, West Club Road, Shenoy Nagar, Chennai" },
                { label: "Format", value: "In-person" },
                { label: "Language", value: "English / Tamil" },
                { label: "Member Cost", value: "Membership fee applies" },
                { label: "Visitor / Guest", value: "Paid entry — contact us" },
              ].map(item => (
                <div key={item.label} className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-white/60 text-sm">{item.label}</span>
                  <span className="text-white font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-[#002284] relative overflow-hidden">
        {/* Background dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Diagonal stripe overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #01acac 0px, #01acac 1px, transparent 1px, transparent 20px)`,
          }}
        />
        {/* Glow orbs */}
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#01acac]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#01acac]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: text */}
            <div>
              <p className="text-[#01acac] text-xs font-black uppercase tracking-widest mb-1">Next Meeting</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">Join Us This Thursday</h2>
              <p className="text-white/60 text-sm mt-1">{formatDate(nextThursday)} · 8:30 – 9:30 AM IST · Chennai</p>
            </div>
            {/* Right: buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#01acac] hover:bg-[#01acac]/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
                Register Now <ArrowRight size={15} />
              </Link>
              <Link href="/join" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
