'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    // Sync lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const gsapTick = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
