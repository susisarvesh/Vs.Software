'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../context/ModalContext';
import styles from './FooterCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = ({ rotate }: { rotate?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={rotate ? { transform: 'rotate(180deg)' } : undefined}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

export default function FooterCTA() {
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([textRef.current, ctaRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      const arrows = arrowsRef.current?.querySelectorAll(`.${styles.arrowItem}`);
      if (arrows) {
        gsap.fromTo(
          arrows,
          { opacity: 0 },
          {
            opacity: 0.25,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );

        // Pulse animation
        gsap.to(arrows, {
          opacity: 0.07,
          duration: 1.8,
          stagger: { each: 0.12, repeat: -1, yoyo: true },
          ease: 'power2.inOut',
          delay: 0.8,
        });
      }

      // Animate Year 2025
      if (yearRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 95%',
          onEnter: () => {
             const obj = { val: 2000 };
             gsap.to(obj, {
               val: 2026,
               duration: 1.5,
               ease: 'power2.out',
               onUpdate: () => {
                 if (yearRef.current) yearRef.current.innerText = Math.floor(obj.val).toString();
               }
             });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.footer} ref={sectionRef} id="contact">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.container}>
        <h2 className={styles.heading} ref={textRef}>
          Let&apos;s build something intelligent,<br />
          scalable, and genuinely<br />
          impactful.
        </h2>

        {/* Arrows + CTA */}
        <div className={styles.ctaRow} ref={arrowsRef}>
          <div className={styles.arrowGroup}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={styles.arrowItem}>
                <ArrowIcon rotate />
              </span>
            ))}
          </div>

          <div ref={ctaRef}>
            <button className={styles.ctaButton} onClick={openModal}>
              <span className={styles.ctaAvatar}>
                <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="VS" width={30} height={30} />
              </span>
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>Book a free consultation</span>
                <span className={styles.ctaSub}>Let&apos;s talk about your project</span>
              </div>
            </button>
          </div>

          <div className={styles.arrowGroup}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={styles.arrowItem}>
                <ArrowIcon />
              </span>
            ))}
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.topLinks}>
             {/* <a href="#" className={`${styles.footerLink} mono`}>PRIVACY POLICY</a> */}
            <a href="https://www.linkedin.com/company/vsmart-technologies-pvt-ltd/" className={`${styles.footerLink} mono`} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
          
          <div className={styles.giantTextContainer}>
            <span className={styles.giantText}>Vsmart</span>
          </div>

          <div className={styles.footerBrandRow}>
            <div className={styles.footerLogo}>
              <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="Vsmart Logo" />
              <span className={styles.footerBrand}>Vsmart Technologies</span>
            </div>
            <span className={`${styles.footerCopy} mono`}>
              © <span ref={yearRef}>2026</span> ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
