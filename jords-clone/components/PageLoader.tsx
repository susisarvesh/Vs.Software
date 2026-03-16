'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setHidden(true),
    });

    // Hold briefly then fade the loader out
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.5,
    });
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <img 
        src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" 
        alt="Vsmart Logo" 
        width="60" 
        height="60" 
        style={{ animation: 'loaderPulse 0.9s ease infinite alternate' }}
      />
    </div>
  );
}
