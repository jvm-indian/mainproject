'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

interface CardProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
}

function AnimatedCard({ children, delay, className = '' }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.8, ease }}
      className={`rounded-2xl overflow-hidden relative flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
      
      {/* Card 1 - Video Card */}
      <AnimatedCard delay={0} className="col-span-1 min-h-[400px] lg:min-h-0 bg-[#212121]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="relative z-10 p-6 sm:p-8 mt-auto">
          <p className="text-[#E1E0CC] font-medium text-lg">Your creative canvas.</p>
        </div>
      </AnimatedCard>

      {/* Card 2 - Project Storyboard */}
      <AnimatedCard delay={0.15} className="col-span-1 bg-[#212121] p-6 sm:p-8 justify-between min-h-[400px] lg:min-h-0">
        <div>
          <img 
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" 
            alt="Icon" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6"
          />
          <h3 className="text-xl sm:text-2xl text-[#DEDBC8] mb-6 flex items-baseline gap-2">
            Project Storyboard. <span className="text-gray-500 text-sm">(01)</span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Visual narrative planning</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Shot-by-shot timeline</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Moodboard integration</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Asset management</span>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-[#DEDBC8] hover:text-white transition-colors text-sm font-medium group">
            Learn more 
            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </AnimatedCard>

      {/* Card 3 - Smart Critiques */}
      <AnimatedCard delay={0.3} className="col-span-1 bg-[#212121] p-6 sm:p-8 justify-between min-h-[400px] lg:min-h-0">
        <div>
          <img 
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" 
            alt="Icon" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6"
          />
          <h3 className="text-xl sm:text-2xl text-[#DEDBC8] mb-6 flex items-baseline gap-2">
            Smart Critiques. <span className="text-gray-500 text-sm">(02)</span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">AI-driven frame analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Actionable creative notes</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Direct tool integrations</span>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-[#DEDBC8] hover:text-white transition-colors text-sm font-medium group">
            Learn more 
            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </AnimatedCard>

      {/* Card 4 - Immersion Capsule */}
      <AnimatedCard delay={0.45} className="col-span-1 bg-[#212121] p-6 sm:p-8 justify-between min-h-[400px] lg:min-h-0">
        <div>
          <img 
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" 
            alt="Icon" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6"
          />
          <h3 className="text-xl sm:text-2xl text-[#DEDBC8] mb-6 flex items-baseline gap-2">
            Immersion Capsule. <span className="text-gray-500 text-sm">(03)</span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Notification silencing</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Ambient soundscapes</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#DEDBC8] shrink-0 mt-0.5" />
              <span className="text-gray-400 text-sm">Schedule syncing</span>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-[#DEDBC8] hover:text-white transition-colors text-sm font-medium group">
            Learn more 
            <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </AnimatedCard>

    </div>
  );
}
