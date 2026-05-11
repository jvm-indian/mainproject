'use client';

import React from 'react';
import Link from 'next/link';
import { FadeVideo } from '@/components/ui/fade-video';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe, Instagram, Twitter } from 'lucide-react';
import { LiveHeatmap } from '@/components/ecochain/live-heatmap';
import { InstitutionalLeaderboard } from '@/components/ecochain/institutional-leaderboard';

export default function HomePage() {
  return (
    <main className="w-full bg-black text-white font-sans overflow-x-hidden selection:bg-white/20 selection:text-white">
      
      {/* SECTION 1 -- HERO */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <FadeVideo
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6 w-full">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-white" />
              <span className="text-white font-semibold text-lg tracking-tight">EcoChainAI</span>
              
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">The Crisis</a>
                <a href="#approach" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Approach</a>
                <a href="#technology" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Technology</a>
                <a href="#dashboard" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Live Dashboard</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/auth/sign-up" className="hidden sm:block text-white text-sm font-medium hover:text-white/80 transition-colors">
                Request Access
              </Link>
              <Link href="/auth/login" className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white hover:text-black transition-colors">
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Save the <em className="italic font-light">future.</em>
          </h1>
          
          <div className="max-w-xl w-full mb-6">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input 
                type="email" 
                placeholder="Join the intelligent network" 
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 flex-1 text-sm"
              />
              <button className="bg-white rounded-full p-3 text-black hover:scale-105 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-white/80 text-sm md:text-base leading-relaxed px-4 max-w-lg mb-8">
            Every minute, 2,000 tons of plastic enter our oceans. Join the intelligent network to segregate and monetize waste at the source.
          </p>

          <a href="#dashboard" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            View Live Dashboard
          </a>
        </div>

        {/* Social Icons */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Instagram className="w-5 h-5" />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SECTION 2 -- ABOUT SECTION */}
      <section id="about" className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white/40 text-sm tracking-widest uppercase block mb-8">The Crisis</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            We are drowning in our <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic text-white/60">own creation.</span>
            <br className="hidden md:block" />
            Our ecosystems are choking on unregulated, <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic text-white/60">unsegregated waste.</span>
          </motion.h2>
        </div>
      </section>

      {/* SECTION 3 -- FEATURED VIDEO */}
      <section id="approach" className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-video w-full"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
          >
            <video
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
                <div className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  We replace broken municipal systems with autonomous, AI-driven smart bins. By segregating at the source, we turn an environmental crisis into a profitable circular economy.
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium w-full md:w-auto hover:bg-white hover:text-black transition-colors"
              >
                Explore Technology
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 -- PHILOSOPHY */}
      <section id="technology" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Technology <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic text-white/40">x</span> Sustainability
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              className="rounded-3xl overflow-hidden aspect-[4/3] w-full"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <video
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              />
            </motion.div>

            <motion.div
              className="flex flex-col justify-center gap-12"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Choose your impact</div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Every meaningful breakthrough in waste recovery begins with data. We operate at the intersection of IoT and AI, turning smart bin telemetry into actionable insights.
                </p>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              <div>
                <div className="text-white/40 text-xs tracking-widest uppercase mb-4">Shape the future</div>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  We believe that the best sustainability efforts are automated. Our network does the heavy lifting, allowing institutions to hit zero-waste goals effortlessly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 -- SERVICES */}
      <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          
          <motion.div 
            className="flex items-center justify-between mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl text-white tracking-tight">Intelligent Infrastructure</h2>
            <span className="hidden md:block text-white/40 text-sm tracking-widest uppercase">How it works</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-white/40 text-xs tracking-widest uppercase">Hardware</span>
                  <div className="liquid-glass rounded-full p-2">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl tracking-tight mb-3">AI Segregation Bins</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Smart edge-nodes that identify, classify, and sort incoming waste with 94% accuracy, eliminating manual segregation.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <span className="text-white/40 text-xs tracking-widest uppercase">Software</span>
                  <div className="liquid-glass rounded-full p-2">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl tracking-tight mb-3">Live Telemetry & Tracking</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Real-time analytics tracking waste generation, pickup routing, and recovery metrics across the entire network.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7 -- APPENDED DASHBOARD FEATURES */}
      <section id="dashboard" className="bg-[#050505] py-24 md:py-32 px-6 overflow-hidden border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span className="text-white/40 text-xs tracking-widest uppercase block mb-4">Command Center</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">Active Intelligence</h2>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="liquid-glass rounded-3xl p-6 md:p-8 flex flex-col">
              <h3 className="text-xl font-medium text-white mb-6">Live Network Heatmap</h3>
              <div className="flex-1 bg-black/50 rounded-2xl overflow-hidden min-h-[400px] border border-white/5">
                <LiveHeatmap />
              </div>
            </div>

            <div className="liquid-glass rounded-3xl p-6 md:p-8 flex flex-col">
              <h3 className="text-xl font-medium text-white mb-6">Institutional Rankings</h3>
              <div className="flex-1 bg-black/50 rounded-2xl overflow-hidden border border-white/5">
                <InstitutionalLeaderboard />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
