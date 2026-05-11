'use client';

import React, { useRef, useEffect } from 'react';

interface FadeVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export function FadeVideo(props: FadeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let opacity = 0;
    video.style.opacity = '0';

    const animateFade = (target: number, duration: number, callback?: () => void) => {
      const start = performance.now();
      const startOpacity = opacity;
      
      const animate = (time: number) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        opacity = startOpacity + (target - startOpacity) * progress;
        video.style.opacity = opacity.toString();
        
        if (progress < 1) {
          fadeRef.current = requestAnimationFrame(animate);
        } else if (callback) {
          callback();
        }
      };
      
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      fadeRef.current = requestAnimationFrame(animate);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateFade(1, 500);
    };

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.55 && opacity > 0.5) {
        animateFade(0, 500);
      }
    };

    const handleEnded = () => {
      opacity = 0;
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateFade(1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  return <video ref={videoRef} {...props} />;
}
