'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PhilosophySection.module.css';

gsap.registerPlugin(ScrollTrigger);

const paragraph1 = "We materialize the future of business through intelligent design and uncompromising engineering. We don't just build products that work—we craft resilient systems that dominate their category and scale effortlessly.".split(' ');
const paragraph2: string[] = [];

export default function PhilosophySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const wordRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const iconRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validWords = wordRefs.current.filter(Boolean);

      // Start all words dimmed
      gsap.set(validWords, { opacity: 0.22 });

      // Label + icon fade in when section enters viewport
      gsap.fromTo([iconRef.current, labelRef.current],
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // ── Pinned word reveal ──────────────────────────────────
      // Pin the section, use 180% extra scroll-height so every word
      // gets a portion of the scroll distance to animate through.
      gsap.fromTo(validWords,
        { opacity: 0.22, color: 'var(--text-secondary)' },
        {
          opacity: 1,
          color: 'var(--text-primary)',
          stagger: { each: 0.6 },   // 0.6 "units" apart in the scrub timeline
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',        // pin starts as section hits top
            end: `+=${validWords.length * 28}`,   // extra scroll height = words × 28px
            scrub: 0.4,
            pin: stickyRef.current,  // pin the inner sticky div, not the whole section
            anticipatePin: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let wordIndex = 0;

  return (
    <section className={styles.philosophy} ref={sectionRef} id="philosophy">
      {/* The pinned inner container */}
      <div className={styles.sticky} ref={stickyRef}>
        <div className={styles.container}>
          <div className={styles.topMeta}>
            <div className={styles.icon} ref={iconRef}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <span ref={labelRef} className={`${styles.label} mono`}>THE INDEPENDENT TECHNOLOGY &amp; AI SOLUTIONS STUDIO</span>
          </div>

          <div className={styles.textBlock}>
            <p className={styles.text}>
              {paragraph1.map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={`p1-${idx}`}
                    ref={el => { wordRefs.current[idx] = el; }}
                    className={styles.word}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>
            <p className={styles.text}>
              {paragraph2.map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={`p2-${idx}`}
                    ref={el => { wordRefs.current[idx] = el; }}
                    className={styles.word}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
