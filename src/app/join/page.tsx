"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle, Users, Globe, TrendingUp, Zap, ChevronDown } from "lucide-react";

const benefits = [
  { icon: Users, text: "Access to 45+ chapters across 12 countries" },
  { icon: Globe, text: "One exclusive seat per business category" },
  { icon: TrendingUp, text: "Structured weekly referral meetings" },
  { icon: Zap, text: "First referral within 60 days — guaranteed" },
];

const steps = [
  { num: "01", title: "Fill the Form", desc: "Tell us about you and your business." },
  { num: "02", title: "We Review", desc: "Our team reviews your application within 48 hours." },
  { num: "03", title: "Meet the Chapter", desc: "Attend a meeting as a guest — no commitment." },
  { num: "04", title: "Join & Grow", desc: "Get your seat and start receiving referrals." },
];

const experienceOptions = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const referralOptions = ["Existing BRO Forum Member", "Social Media", "Google Search", "Event or Seminar", "Friend or Colleague", "Other"];

// Custom themed dropdown component
function CustomSelect({ label, placeholder, options, value, onChange }: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">{label}</label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-left flex items-center justify-between transition-all outline-none ${
            open ? "border-[#01acac]" : "border-slate-200 hover:border-slate-300"
          } ${value ? "text-slate-800" : "text-slate-400"}`}
        >
          <span>{value || placeholder}</span>
          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-[#01acac]" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
            >
              {options.map((opt) => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      value === opt
                        ? "bg-[#002284] text-white font-semibold"
                        : "text-slate-700 hover:bg-[#01acac]/10 hover:text-[#002284]"
                    }`}
                  >
                    {value === opt && <span className="mr-2">✓</span>}
                    {opt}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", business: "",
    category: "", city: "", experience: "", referral: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">

      {/* Hero */}
      <section className="relative bg-[#002284] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/map-bg.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#01acac]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#01acac] animate-pulse" />
              Limited Seats Available
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Apply to Join<br /><span className="text-[#01acac]">BRO Forum</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Take the first step towards a business network that actively works to grow your revenue every single week.
            </p>

            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="w-8 h-8 bg-[#01acac]/20 rounded-lg flex items-center justify-center shrink-0">
                    <b.icon size={15} className="text-[#01acac]" />
                  </div>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {steps.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="text-[#01acac] font-black text-lg mb-1">{s.num}</div>
                  <div className="text-white font-semibold text-sm">{s.title}</div>
                  <div className="text-white/50 text-xs mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {submitted ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-[#01acac] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#002284]">Application Received!</h2>
                <p className="text-slate-600 leading-relaxed">
                  Thank you for applying to BRO Forum. Our membership team will review your application and reach out within <strong>48 business hours</strong>.
                </p>
                <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 text-sm text-slate-600">
                  <p className="font-semibold text-[#002284]">What happens next?</p>
                  <p>✦ You'll receive a confirmation email shortly</p>
                  <p>✦ A membership advisor will call you within 48 hrs</p>
                  <p>✦ You'll be invited to a guest chapter meeting</p>
                </div>
                <Link href="/" className="inline-flex items-center gap-2 text-[#01acac] font-semibold hover:underline">
                  Back to Home <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 space-y-5 shadow-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-[#002284]">Membership Application</h2>
                  <p className="text-slate-500 text-sm mt-1">Fill in your details and we'll be in touch within 48 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Full Name *</label>
                    <input required type="text" placeholder="John Smith" autoComplete="off"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Email Address *</label>
                    <input required type="email" placeholder="john@company.com" autoComplete="off"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Phone Number *</label>
                    <input required type="tel" placeholder="+91 98765 43210" autoComplete="off"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Business Name *</label>
                    <input required type="text" placeholder="Your Business" autoComplete="off"
                      value={form.business} onChange={e => setForm({ ...form, business: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Business Category *</label>
                    <input required type="text" placeholder="e.g. CA, IT, Real Estate" autoComplete="off"
                      value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Your City *</label>
                    <input required type="text" placeholder="Chennai, Mumbai..." autoComplete="off"
                      value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                  </div>
                </div>

                <CustomSelect
                  label="Years in Business"
                  placeholder="Select..."
                  options={experienceOptions}
                  value={form.experience}
                  onChange={v => setForm({ ...form, experience: v })}
                />

                <CustomSelect
                  label="How did you hear about us?"
                  placeholder="Select..."
                  options={referralOptions}
                  value={form.referral}
                  onChange={v => setForm({ ...form, referral: v })}
                />

                <button type="submit"
                  className="w-full bg-[#002284] hover:bg-[#002284]/90 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 group">
                  Submit Application
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-slate-400 text-center">
                  By submitting, you agree to be contacted by our membership team. No spam — ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50" />
      </section>

      {/* Trust bar */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-10">Trusted by business leaders across industries</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,500+", label: "Active Members" },
              { value: "45+", label: "Global Chapters" },
              { value: "₹150Cr+", label: "Business Generated" },
              { value: "60 Days", label: "Avg. First Referral" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-[#002284]">{s.value}</div>
                <div className="text-slate-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
