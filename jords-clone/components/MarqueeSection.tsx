'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MarqueeSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const items = [
  'Software Development',
  'AI-Powered Agents',
  'Website Development',
  'Mobile Applications',
  'Chatbot Integration',
  'Machine Learning',
  'End-to-End Solutions',
  'Results-Driven Tech',
];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 92%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.marqueeSection} aria-hidden="true" ref={sectionRef}>
      <div className={styles.track} ref={trackRef}>
        {/* Duplicated for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot}>◆</span>
            <span className={styles.text}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
