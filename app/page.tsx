import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { WordsPullUp, WordsPullUpMultiStyle } from '@/components/ui/words-pull-up';
import { ScrollRevealText } from '@/components/ui/animated-letter';
import { FeaturesGrid } from '@/components/sections/features-grid';
import { InstitutionalLeaderboard } from '@/components/ecochain/institutional-leaderboard';

export default function HomePage() {
  return (
    <main className="w-full bg-black text-[#E1E0CC] font-sans overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen p-4 md:p-6">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          />
          <div className="noise-overlay opacity-[0.7] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>
          
          {/* Navbar */}
          <div className="absolute top-0 left-0 right-0 flex justify-center z-50">
            <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              <Link href="#" className="text-[10px] sm:text-xs md:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-colors" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Our story</Link>
              <Link href="#" className="text-[10px] sm:text-xs md:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-colors" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Collective</Link>
              <Link href="#" className="text-[10px] sm:text-xs md:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-colors" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Workshops</Link>
              <Link href="#" className="text-[10px] sm:text-xs md:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-colors" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Programs</Link>
              <Link href="#" className="text-[10px] sm:text-xs md:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-colors" style={{ color: 'rgba(225, 224, 204, 0.8)' }}>Inquiries</Link>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 z-10 w-full">
            <div className="grid grid-cols-12 gap-6 items-end w-full">
              <div className="col-span-12 lg:col-span-8">
                <WordsPullUp 
                  text="Prisma" 
                  showAsterisk={true}
                  className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]" 
                />
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col items-start lg:pb-8 lg:pl-12">
                <p 
                  className="text-[#DEDBC8]/70 text-xs sm:text-sm md:text-base mb-8 max-w-sm"
                  style={{ lineHeight: 1.2, animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}
                >
                  Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
                </p>
                <button 
                  className="group bg-[#DEDBC8] text-black rounded-full flex items-center pl-6 pr-1 py-1 font-medium text-sm sm:text-base transition-all hover:gap-3"
                  style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}
                >
                  Join the lab
                  <div className="ml-4 bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-6">
        <div className="bg-[#101010] rounded-3xl p-8 md:p-16 lg:p-24 max-w-6xl mx-auto flex flex-col items-center text-center">
          <span className="text-[#DEDBC8] text-[10px] sm:text-xs uppercase tracking-wider mb-8 sm:mb-12">Visual arts</span>
          
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] mb-16 sm:mb-24">
            <WordsPullUpMultiStyle segments={[
              { text: "I am Marcus Chen, " },
              { text: "a self-taught director. ", className: "font-serif italic" },
              { text: "I have skills in color grading, visual effects, and narrative design." }
            ]} />
          </div>

          <div className="max-w-2xl mx-auto">
            <ScrollRevealText 
              text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
              className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed text-justify sm:text-center"
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="relative min-h-screen bg-black py-24 md:py-32 px-4 md:px-6">
        <div className="bg-noise opacity-[0.15]"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <WordsPullUpMultiStyle segments={[
              { text: "Studio-grade workflows for visionary creators. ", className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal block mb-2" },
              { text: "Built for pure vision. Powered by art.", className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 block" }
            ]} />
          </div>
          
          <FeaturesGrid />
        </div>
      </section>

      {/* SECTION 4: INSTITUTIONAL RANKINGS */}
      <section className="relative bg-black pb-24 md:pb-32 px-4 md:px-6">
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <InstitutionalLeaderboard />
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
