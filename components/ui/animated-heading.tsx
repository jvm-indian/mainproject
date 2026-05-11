'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export function AnimatedHeading({ text, className = '' }: AnimatedHeadingProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\\n');
  const charDelay = 30;
  let totalCharIndex = 0;

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split('').map((char, charIndex) => {
            const delay = totalCharIndex * charDelay;
            totalCharIndex++;
            return (
              <span
                key={charIndex}
                className="inline-block transition-all ease-out"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: '500ms',
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
