'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.2em] relative">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
              duration: 0.8
            }}
            className="inline-block"
          >
            {word}
            {showAsterisk && i === words.length - 1 && word.endsWith('a') && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export interface MultiStyleSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: MultiStyleSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  // Flatten segments into an array of { word, className, index }
  const allWords: { word: string; className: string; index: number }[] = [];
  let globalIndex = 0;

  segments.forEach((segment) => {
    const segmentWords = segment.text.split(' ');
    segmentWords.forEach((word) => {
      if (word.length > 0) {
        allWords.push({
          word,
          className: segment.className || '',
          index: globalIndex++
        });
      }
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map((item) => (
        <div key={item.index} className="overflow-hidden mr-[0.2em]">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              delay: item.index * 0.08,
              ease: [0.16, 1, 0.3, 1],
              duration: 0.8
            }}
            className={`inline-block ${item.className}`}
          >
            {item.word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
