"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxHero from "@/components/ParallaxHero";
import { Mail, Phone, MapPin, Clock, ArrowRight, Globe, ChevronDown } from "lucide-react";
import { useState, useTransition } from "react";
import { submitEnquiry } from "@/app/admin/actions/enquiries";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5 cursor-pointer" onClick={() => setOpen((v) => !v)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className={`text-base font-semibold transition-colors ${
          open ? "text-[#002284]" : "text-[#002284]"
        }`}>{q}</h3>
        <ChevronDown
          size={20}
          className={`text-slate-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-[#01acac]" : ""
          }`}
        />
      </div>
      {open && (
        <p className="mt-3 text-slate-500 text-sm leading-relaxed pr-8">{a}</p>
      )}
    </div>
  );
}

const faqs = [
  { q: "Can I attend a chapter meeting before joining?", a: "Absolutely. Every prospective member gets a complimentary guest pass to attend one chapter meeting. This helps you experience the format before committing." },
  { q: "How are referrals tracked?", a: "BRO Forum uses a proprietary referral tracking platform where members log every referral passed and received. You can view your ROI dashboard at any time." },
  { q: "Is there a lock-in period for membership?", a: "Memberships are billed monthly with a minimum 3-month commitment. Annual memberships get a 15% discount and additional benefits." },
  { q: "Can two people from the same industry join the same chapter?", a: "No. Our one-seat-per-category policy means only one member per business type per chapter — ensuring zero conflict and maximum referral exclusivity." },
  { q: "How quickly can I expect referrals?", a: "Most members receive their first warm referral within 30–60 days of joining. Results scale significantly with active participation and 1-to-1 meetings." },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", interest: "General Enquiry", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        await submitEnquiry(form);
        setSubmitted(true);
      } catch (err: any) {
        setError(err.message ?? "Failed to send. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col w-full">

      <ParallaxHero
        breadcrumbs={[{ label: "Contact" }]}
        title={<>Let's Start a<br /><span className="text-[#01acac]">Conversation</span></>}
        subtitle="Whether you're ready to join, exploring a chapter in your city, or want to partner with us — our team typically responds within 4 business hours."
        align="left"
      />

      {/* Contact Form + Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Contact Info</span>
              <h2 className="text-3xl font-bold text-[#002284] mt-2">We're Here to Help</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">Reach out for membership queries, chapter information, event registrations, or partnership opportunities.</p>
            </div>
            <div className="space-y-5">
              {[
                { icon: Mail,  label: "Email",         value: "brochennai.connect@gmail.com", href: "mailto:brochennai.connect@gmail.com" },
                { icon: Phone, label: "Phone",         value: "+91 94440 36627",              href: "tel:+919444036627" },
                { icon: Globe, label: "Website",       value: "www.broforum.in",               href: "https://www.broforum.in" },
                { icon: Clock, label: "Response Time", value: "Within 4 business hours",       href: null },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#002284]/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-[#002284]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-[#002284] font-semibold hover:text-[#01acac] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#002284] font-semibold">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-[#002284]">Quick Actions</h3>
              {[
                { label: "Apply for Membership", href: "/members" },
                { label: "Browse Upcoming Events", href: "/events" },
                { label: "Find a Chapter Near You", href: "/who-we-are" },
              ].map(l => (
                <Link key={l.label} href={l.href} className="flex items-center justify-between py-2 text-slate-700 hover:text-[#01acac] transition-colors text-sm font-medium group">
                  {l.label}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center bg-[#002284]/5 rounded-3xl p-16 border border-[#002284]/10">
                <div className="w-20 h-20 bg-[#01acac] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-[#002284] mb-3">Message Sent!</h3>
                <p className="text-slate-600 max-w-sm leading-relaxed">Thank you for reaching out. Our team will get back to you within 4 business hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-[#01acac] font-semibold hover:underline">Send another message</button>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit}
                className="bg-slate-50 rounded-3xl p-8 space-y-5 border border-slate-100">
                <h3 className="text-2xl font-bold text-[#002284]">Send us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "John Smith", required: true },
                    { label: "Email Address *", key: "email", type: "email", placeholder: "john@company.com", required: true },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210", required: false },
                    { label: "Business / Company", key: "business", type: "text", placeholder: "Your Business Name", required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">{f.label}</label>
                      <input required={f.required} type={f.type} placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">I'm Interested In</label>
                  <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all">
                    <option>General Enquiry</option>
                    <option>Membership Application</option>
                    <option>Chapter Information</option>
                    <option>Event Registration</option>
                    <option>Partnership / Sponsorship</option>
                    <option>Press / Media</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Message *</label>
                  <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about yourself and what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm outline-none focus:border-[#01acac] transition-all resize-none" />
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button type="submit" disabled={isPending} className="w-full bg-[#002284] hover:bg-[#002284]/90 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 group">
                  {isPending ? "Sending…" : "Send Message"}
                  {!isPending && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                <p className="text-xs text-slate-400 text-center">We respect your privacy. Your information is never shared or sold.</p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#01acac] font-bold uppercase tracking-widest text-sm">Our Office</span>
            <h2 className="text-4xl font-bold text-[#002284] mt-4">Find Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-slate-100">

            {/* Info card */}
            <div className="bg-white p-10 flex flex-col justify-center space-y-6">
              <div className="w-12 h-12 bg-[#002284] rounded-2xl flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#002284]">Chennai</h3>
                <p className="text-[#01acac] text-sm font-bold mt-0.5">India (HQ)</p>
              </div>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#01acac] shrink-0 mt-0.5" />
                  <a
                    href="https://maps.google.com/?q=No.14A,+West+Club+Road,+Shenoy+Nagar,+Chennai,+Tamil+Nadu+600030"
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-[#01acac] transition-colors leading-relaxed"
                  >
                    No.14A, West Club Road, Shenoy Nagar,<br />Chennai, Tamil Nadu – 600 030
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#01acac] shrink-0" />
                  <a href="tel:+919444036627" className="hover:text-[#01acac] transition-colors font-medium">
                    +91 94440 36627
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#01acac] shrink-0" />
                  <a href="mailto:brochennai.connect@gmail.com" className="hover:text-[#01acac] transition-colors">
                    brochennai.connect@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#01acac] shrink-0" />
                  <span>Mon–Fri, 9:00 AM – 6:00 PM</span>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=No.14A,+West+Club+Road,+Shenoy+Nagar,+Chennai,+Tamil+Nadu+600030"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#002284] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#002284]/90 transition-all w-fit"
              >
                <MapPin size={15} /> Get Directions
              </a>
            </div>

            {/* Google Map */}
            <div className="h-80 md:h-auto min-h-[360px]">
              <iframe
                title="BRO Forum Chennai Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.3!2d80.2318!3d13.0785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzQyLjYiTiA4MMKwMTMnNTQuNSJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin&q=West+Club+Road,+Shenoy+Nagar,+Chennai+600030"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "360px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#002284]">FAQs</h2>
            <div className="w-16 h-1 bg-[#01acac] mx-auto mt-4 rounded-full" />
          </div>
          <div className="divide-y divide-slate-200">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
