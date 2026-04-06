"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Trophy, Globe, Zap, Target, TrendingUp, BarChart3 } from "lucide-react";

const stats = [
  { label: "Active Members", value: "2,500+", icon: Users },
  { label: "Global Chapters", value: "45+", icon: Globe },
  { label: "Business Generated", value: "$150M+", icon: Zap },
  { label: "Success Stories", value: "1,200+", icon: Trophy },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8 lg:col-span-1"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-light/10 text-brand-light px-4 py-2 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-light"></span>
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">Premium Business Network</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-brand-dark leading-[1.1]">
              Strategy That <span className="text-brand-light underline decoration-brand-accent/50 underline-offset-8">Scales</span>,<br />
              Growth That Lasts.
            </h1>

            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              Scaling is not about growing faster; it's about growing smarter.
              Connect with high-caliber business leaders and transform your vision into an unstoppable legacy.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/join"
                className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-brand-dark px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent/20"
              >
                <span>Apply for Membership</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="text-brand-dark font-semibold hover:text-brand-light transition-colors group flex items-center space-x-2"
              >
                <span>How it Works</span>
                <div className="w-8 h-[2px] bg-brand-accent group-hover:w-12 transition-all"></div>
              </Link>
            </div>
          </motion.div>

          {/* Spacer column — image is absolutely positioned */}
          <div className="hidden lg:block" />
        </div>

        {/* Hero Image — absolutely pinned flush to right & top of section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden lg:block absolute top-8 bottom-8 right-0 w-[50%] overflow-hidden rounded-l-[2rem] shadow-2xl z-0"
        >
          <Image
            src="/hero-image.png"
            alt="Premium Business Leader"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent"></div>
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-light/5 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[30%] h-[40%] bg-brand-accent/5 rounded-full blur-3xl -z-0"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-dark py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-2 border-l border-white/10 pl-6"
              >
                <div className="bg-brand-accent/10 p-3 rounded-xl w-fit">
                  <stat.icon className="text-brand-accent" size={24} />
                </div>
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-slate-400 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <Image
                src="/features-image.png"
                alt="Business collaboration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Decorative back element */}
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-brand-accent/20 rounded-[2rem] -z-0"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-brand-light font-bold uppercase tracking-widest text-sm">Innovating Business Success</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark leading-tight">
                We walk data-driven Marketing in simple and basic Innovative IT industry course
              </h2>
              <p className="text-lg text-slate-600">
                Our approach combines traditional networking values with cutting-edge data analytics to ensure every connection is a growth opportunity.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: "Strategy", desc: "Expertly crafted business roadmaps that align with your long-term goals.", icon: Target },
                { title: "Branding", desc: "Building premium brand identities that resonate with your target market.", icon: TrendingUp },
                { title: "Analytics", desc: "Real-time performance tracking to optimize every stage of your scaling journey.", icon: BarChart3 },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start space-x-4 p-6 rounded-2xl border border-slate-100 hover:border-brand-light/20 hover:bg-slate-50/50 transition-all group">
                  <div className="bg-brand-light/10 p-3 rounded-xl text-brand-light group-hover:bg-brand-light group-hover:text-white transition-colors">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Empower People Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 text-center lg:text-left">
            <div className="flex-1 space-y-6">
              <span className="text-brand-light font-bold uppercase tracking-widest text-sm">Empower People with growth</span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight">
                Strategies That Scale<br /> Your Business
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl px-6 lg:px-0">
                We believe that the heart of every successful business is its people. Our network provides the mentors, tools, and connections needed to empower your team and scale your operations sustainably.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark/90 transition-all shadow-lg"
              >
                <span>Read More</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="flex-1 w-full">
               <div className="relative h-[400px] w-full rounded-[2rem] overflow-hidden shadow-xl">
                  <Image
                    src="/hero-image.png"
                    alt="Network focus"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-dark/30 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link href="/join" className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0 animate-bounce">
                      <ArrowRight size={32} className="text-brand-dark" />
                    </Link>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Marketing Strategy", desc: "Tailored campaigns designed to reach your ideal audience.", icon: Zap },
              { title: "Brand Identity", desc: "Creating a lasting impression through visual excellence.", icon: Users },
              { title: "Business Analysis", desc: "Deep dives into your data to find hidden opportunities.", icon: Trophy },
              { title: "Digital Solutions", desc: "Leveraging tech to automate and streamline your growth.", icon: Globe },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-brand-accent/20 rounded-2xl flex items-center justify-center mb-6 text-brand-dark font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{card.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tertiary Section - Your Vision */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tertiary-image.png"
            alt="Premium Office"
            fill
            sizes="100vw"
            className="object-cover brightness-[0.3]"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Your Vision, Our Expertise,<br />
              <span className="text-brand-accent italic">Unstoppable Growth</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We provide the framework, you provide the ambition. Together, we build businesses that don't just survive the market—they lead it.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { label: "Elite Mentorship", value: "Direct access to industry titans." },
                { label: "Strategic Alliances", value: "Partnerships that drive revenue." },
                { label: "Global Reach", value: "Connecting you to 45+ chapters." },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center">
                  <h3 className="text-brand-accent font-bold text-xl mb-2">{item.label}</h3>
                  <p className="text-slate-400 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
          <div className="max-w-4xl mb-16">
             <span className="text-brand-light font-bold uppercase tracking-widest text-sm">Our Solution Approach</span>
             <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mt-4 leading-tight">
                At BRO Forum, our solution approach is tech centered with a focus on 100% client satisfaction
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Innovative Networking",
                desc: "A New Method for Success in the digital age.",
                img: "/features-image.png",
                date: "March 20, 2026"
              },
              {
                title: "Scale Your Team",
                desc: "Hiring the Right Talent for sustainable growth.",
                img: "/hero-image.png",
                date: "April 05, 2026"
              },
              {
                title: "Global Expansion",
                desc: "Entering New Markets Safely and effectively.",
                img: "/features-image.png",
                date: "May 12, 2026"
              }
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-md transition-shadow group-hover:shadow-xl">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-brand-dark">
                    Article
                  </div>
                </div>
                <span className="text-brand-light font-semibold text-sm">{post.date}</span>
                <h3 className="text-2xl font-bold text-brand-dark mt-2 group-hover:text-brand-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 mt-2">{post.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
             <div className="lg:w-2/3 space-y-8">
                <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center">
                   <Users className="text-brand-dark" size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-dark leading-tight italic">
                  "Thanks to BRO Forum, our revenue has doubled in just 12 months. The network is unparalleled."
                </h2>
                <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                       <Image
                         src="/avatar-1.png"
                         alt="Testimonial User"
                         fill
                         sizes="64px"
                         className="object-cover"
                       />
                    </div>
                   <div>
                      <h4 className="font-bold text-brand-dark text-xl">Jonathan Reed</h4>
                      <p className="text-slate-500">CEO, Tech Ventures</p>
                   </div>
                </div>
             </div>
             
             <div className="lg:w-1/3 w-full">
                <div className="bg-brand-dark rounded-3xl p-8 text-white space-y-6">
                   <h3 className="text-2xl font-bold">Ready to scale?</h3>
                   <p className="text-slate-300">Join 2,500+ leaders already growing their business with us.</p>
                   <Link href="/join" className="block w-full bg-brand-accent text-brand-dark text-center py-4 rounded-full font-bold hover:scale-105 transition-transform">
                      Get Started Today
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Global Map Section */}
      <section className="relative py-32 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-20 z-0">
          <Image
            src="/map-bg.png"
            alt="World Map"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 text-white">
             <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Ready to Elevate Your Brand with<br />
                <span className="text-brand-accent">Strategic Global Design?</span>
             </h2>
             <Link
                href="/join"
                className="inline-block mt-10 bg-brand-accent text-brand-dark px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg shadow-brand-accent/20"
             >
                Join the Network
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { city: "New York", country: "USA", members: "120+ Members" },
              { city: "London", country: "UK", members: "95+ Members" },
              { city: "Singapore", country: "SG", members: "80+ Members" },
              { city: "Dubai", country: "UAE", members: "110+ Members" },
            ].map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                      <Globe className="text-brand-accent" size={20} />
                   </div>
                   <ArrowRight className="text-white/20 group-hover:text-brand-accent transition-colors" size={20} />
                </div>
                <h4 className="text-2xl font-bold text-white">{chapter.city}</h4>
                <p className="text-brand-accent text-sm font-medium">{chapter.country}</p>
                <p className="text-slate-400 text-sm mt-4">{chapter.members}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
