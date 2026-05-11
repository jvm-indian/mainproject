'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedLetterProps {
  children: string;
  charProgress: number; // Center of the animation for this character (0 to 1)
  scrollYProgress: any; // The scroll progress from the parent
}

export function AnimatedLetter({ children, charProgress, scrollYProgress }: AnimatedLetterProps) {
  // We want the character to fade in when scrollYProgress crosses charProgress
  // We'll give it a small range [charProgress - 0.1, charProgress + 0.05]
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');
  
  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => {
        const charProgress = index / chars.length;
        return (
          <AnimatedLetter 
            key={index} 
            charProgress={charProgress} 
            scrollYProgress={scrollYProgress}
          >
            {char}
          </AnimatedLetter>
        );
      })}
    </p>
  );
}
