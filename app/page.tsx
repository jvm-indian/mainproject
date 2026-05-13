import React from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { LiveHeatmap } from '@/components/ecochain/live-heatmap';
import { InstitutionalLeaderboard } from '@/components/ecochain/institutional-leaderboard';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        />

        {/* Navbar */}
        <nav className="relative z-20 w-full px-6 md:px-12 lg:px-16 pt-6">
          <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-semibold tracking-tight">
              EcoChainAI
            </div>
            
            {/* Links */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#dashboard" className="hover:text-gray-300 transition-colors">Dashboard</a>
              <Link href="/story" className="text-white hover:text-gray-300 transition-colors font-semibold">Story</Link>
              <Link href="/products" className="text-white hover:text-gray-300 transition-colors font-semibold text-green-400">Marketplace</Link>
              <a href="#rankings" className="hover:text-gray-300 transition-colors">Rankings</a>
              <a href="#technology" className="hover:text-gray-300 transition-colors">Technology</a>
              <a href="#impact" className="hover:text-gray-300 transition-colors">Impact</a>
              <a href="#network" className="hover:text-gray-300 transition-colors">Network</a>
            </div>

            {/* CTA Button */}
            <div>
              <Link href="/auth/login">
                <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Login to Portal
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:items-end w-full">
            {/* Left Column */}
            <div className="w-full">
              <AnimatedHeading 
                text={"Intelligent recovery\nfor a circular tomorrow."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
              />
              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                  We empower institutions to automatically segregate, track, and monetize waste at the source using AI & IoT.
                </p>
              </FadeIn>
              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <a href="#dashboard">
                    <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Open Dashboard
                    </button>
                  </a>
                  <a href="#network">
                    <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                      Explore Network
                    </button>
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="flex items-end justify-start mt-10 lg:mt-0 lg:justify-end w-full">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light">
                    AI-Powered. Automated. Transparent.
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD SECTION (Live Heatmap) */}
      <section id="dashboard" className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn delay={200} duration={800}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Live Dashboard</h2>
              <p className="text-gray-400 text-lg max-w-2xl">Real-time edge-node telemetry and active IoT smart bins monitoring across the institutional network.</p>
            </div>
            <div className="h-[600px] w-full bg-black/50 border border-white/10 rounded-2xl overflow-hidden p-6">
              <LiveHeatmap />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. RANKINGS SECTION (Institutional Leaderboard) */}
      <section id="rankings" className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn delay={200} duration={800}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Institutional Rankings</h2>
              <p className="text-gray-400 text-lg max-w-2xl">Leaderboard of top performing institutions actively maximizing waste recovery and sustainability scores.</p>
            </div>
            <div className="w-full bg-black/50 border border-white/10 rounded-2xl overflow-hidden p-6">
              <InstitutionalLeaderboard />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. TECHNOLOGY SECTION */}
      <section id="technology" className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-16 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn delay={200} duration={800}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Core Technology</h2>
              <p className="text-gray-400 text-lg max-w-2xl">The engine behind our intelligent recovery framework. Driven by edge AI and secure transparent tracking.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="liquid-glass border border-white/10 rounded-2xl p-10 flex flex-col justify-between min-h-[300px]">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4">AI Segregation Bins</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Smart edge-nodes that identify, classify, and sort incoming waste with 94% accuracy, eliminating manual segregation and ensuring pure recovery streams.
                  </p>
                </div>
                <div className="mt-8 text-white/50 text-sm uppercase tracking-widest">Hardware Layer</div>
              </div>

              <div className="liquid-glass border border-white/10 rounded-2xl p-10 flex flex-col justify-between min-h-[300px]">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4">Live Telemetry & Tracking</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Real-time analytics tracking waste generation, pickup routing, and recovery metrics across the entire network. Every bin reports its status to the central ledger.
                  </p>
                </div>
                <div className="mt-8 text-white/50 text-sm uppercase tracking-widest">Software Layer</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. IMPACT SECTION */}
      <section id="impact" className="w-full py-32 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn delay={200} duration={800}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="liquid-glass border border-white/10 p-8 rounded-2xl flex flex-col justify-center text-center">
                <div className="text-5xl font-light mb-2">94%</div>
                <div className="text-gray-400">Segregation Accuracy</div>
              </div>
              <div className="liquid-glass border border-white/10 p-8 rounded-2xl flex flex-col justify-center text-center">
                <div className="text-5xl font-light mb-2">1.2M</div>
                <div className="text-gray-400">Tons Recovered</div>
              </div>
              <div className="liquid-glass border border-white/10 p-8 rounded-2xl flex flex-col justify-center text-center">
                <div className="text-5xl font-light mb-2">85+</div>
                <div className="text-gray-400">Active Institutions</div>
              </div>
              <div className="liquid-glass border border-white/10 p-8 rounded-2xl flex flex-col justify-center text-center">
                <div className="text-5xl font-light mb-2">$4.5M</div>
                <div className="text-gray-400">Value Generated</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. NETWORK SECTION */}
      <section id="network" className="w-full min-h-[60vh] py-24 px-6 md:px-12 lg:px-16 bg-[#0a0a0a] flex flex-col justify-center items-center text-center">
        <FadeIn delay={200} duration={800}>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Join the Network</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Deploy our intelligent infrastructure within your campus or city to eliminate waste management inefficiencies instantly.
          </p>
          <Link href="/auth/sign-up">
            <button className="bg-white text-black px-10 py-4 rounded-xl text-lg font-medium hover:bg-gray-200 transition-colors">
              Request Deployment
            </button>
          </Link>
        </FadeIn>
      </section>

    </main>
  );
}
