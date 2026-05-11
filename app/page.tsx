import React from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';
import { AnimatedHeading } from '@/components/ui/animated-heading';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
      />

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col h-screen w-full">
        {/* Navbar */}
        <nav className="w-full px-6 md:px-12 lg:px-16 pt-6">
          <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-semibold tracking-tight">
              VEX
            </div>
            
            {/* Links (Hidden on mobile) */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              <Link href="#" className="hover:text-gray-300 transition-colors">Story</Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">Investing</Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">Building</Link>
              <Link href="#" className="hover:text-gray-300 transition-colors">Advisory</Link>
            </div>

            {/* CTA Button */}
            <div>
              <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Start a Chat
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content Area */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:items-end w-full">
            
            {/* Left Column */}
            <div className="w-full">
              <AnimatedHeading 
                text={"Shaping tomorrow\nwith vision and action."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4"
                style={{ letterSpacing: '-0.04em' }}
              />
              
              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>
              
              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Start a Chat
                  </button>
                  <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="flex items-end justify-start mt-10 lg:mt-0 lg:justify-end w-full">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <span className="text-lg md:text-xl lg:text-2xl font-light">
                    Investing. Building. Advisory.
                  </span>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
