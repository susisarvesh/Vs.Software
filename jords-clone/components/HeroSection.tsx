'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useModal } from '../context/ModalContext';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { name: 'healthcare' },
  { name: 'fintech' },
  { name: 'e-commerce' },
  { name: 'logistics' },
  { name: 'education' },
  { name: 'enterprise' },
];

const headingLines = ['Engineering the', 'Future of Software.', 'Built with Precision.'];

export default function HeroSection() {
  const { openModal } = useModal();
  const heroRef      = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const tagRef       = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const bottomTagRef = useRef<HTMLDivElement>(null);
  const logosRef     = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);
  const orb2Ref      = useRef<HTMLDivElement>(null);
  const lineRefs     = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Floating orbs — slow breathing ── */
      gsap.to(orbRef.current, {
        x: 40, y: -30, scale: 1.08,
        duration: 9, ease: 'sine.inOut',
        yoyo: true, repeat: -1,
      });
      gsap.to(orb2Ref.current, {
        x: -35, y: 20, scale: 0.94,
        duration: 11, ease: 'sine.inOut',
        yoyo: true, repeat: -1, delay: 2,
      });

      /* ── Hero entrance — staggered clip-path ── */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.5 });

      // Tag line slide in
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 18, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }
      );

      // Each heading line reveals via clip-path (words slide up from beneath)
      lineRefs.current.forEach((line, i) => {
        tl.fromTo(line,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          i === 0 ? '-=0.5' : '-=0.65'
        );
      });

      // Subtext + CTA + bottom
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 22, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
        '-=0.45'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 18, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        '-=0.45'
      )
      .fromTo(bottomTagRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(
        logosRef.current?.children ? Array.from(logosRef.current.children) : [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
        '-=0.4'
      );

      /* ── Scroll parallax on orbs ── */
      gsap.to(orbRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      /* ── Heading parallax (slow drift up on scroll) ── */
      gsap.to(headingRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
      /* ── Mouse Parallax ── */
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Move orbs with more intensity
        gsap.to(orbRef.current, {
          x: xPos * 60,
          y: yPos * 60,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(orb2Ref.current, {
          x: xPos * -40,
          y: yPos * -40,
          duration: 1.5,
          ease: 'power2.out',
        });

        // Subtly move the grid
        gsap.to(gridRef.current, {
          x: xPos * 20,
          y: yPos * 20,
          duration: 2,
          ease: 'power2.out',
        });

        // Content slight tilt/drift
        gsap.to(headingRef.current, {
          x: xPos * 10,
          y: yPos * 10,
          duration: 1,
          ease: 'power2.out',
        });

        // Mouse glow - direct follow
        gsap.to(glowRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      // Clean up event listener via context
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Mouse Glow Aura */}
      <div className={styles.mouseGlow} ref={glowRef} />

      {/* Animated Grid Background */}
      <div className={styles.gridContainer}>
        <div className={styles.grid} ref={gridRef} />
      </div>

      {/* Background animated orbs */}
      <div className={styles.orbBg} ref={orbRef} />
      <div className={styles.orbBg2} ref={orb2Ref} />

      {/* Subtle noise texture overlay */}
      <div className={styles.noiseOverlay} aria-hidden="true" />

      {/* Logo */}
      <div className={styles.logoTop}>
        <img 
          src="https://ik.imagekit.io/zhf0gkzac/VSmart/Vsmarttechnologies.png?updatedAt=1724834363389" 
          alt="Vsmart Full Logo" 
          className={styles.logoImage}
        />
      </div>

      <div className={styles.heroContent}>
        {/* Top tag */}
        <div className={styles.topTag} ref={tagRef}>
          <span className={styles.arrow}>→</span>
          <span className={`${styles.tagText} mono`}>SOFTWARE · AI AGENTS · WEB &amp; MOBILE · MACHINE LEARNING</span>
          <span className={styles.arrow}>←</span>
        </div>

        {/* Main heading — each line wrapped for clip reveal */}
        <h1 className={styles.heading} ref={headingRef}>
          {headingLines.map((line, i) => (
            <span key={i} className={styles.lineWrap}>
              <span
                className={styles.lineInner}
                ref={el => { lineRefs.current[i] = el; }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p className={styles.subtext} ref={subtextRef as React.RefObject<HTMLParagraphElement>}>
          We are an independent technology studio building intelligent software, AI agents, and high-performance digital products for startups and global enterprises.
        </p>

        {/* CTAs */}
        <div className={styles.ctaGroup} ref={ctaRef}>
          <a
            href="#contact"
            className={styles.primaryCta}
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            <span className={styles.ctaAvatar}>
              <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="VS" width={30} height={30} />
            </span>
            <div className={styles.ctaText}>
              <span className={styles.ctaMain}>Book a free consultation</span>
              <span className={styles.ctaSub}>Let&apos;s talk about your project</span>
            </div>
          </a>
          <button
            className={styles.secondaryCta}
            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore our services
          </button>
        </div>

        {/* Bottom tag */}
        <div className={styles.bottomTag} ref={bottomTagRef}>
          <span className={`${styles.bottomTagText} mono`}>POWERING STARTUPS TO ENTERPRISES · SOFTWARE · AI · WEB · MOBILE</span>
        </div>
      </div>

      {/* Logo cloud */}
      <div className={styles.logoCloud}>
        <div className={styles.logosRow} ref={logosRef}>
          {logos.map((logo, i) => (
            <div key={logo.name} className={styles.logoItem}>
              <span className={styles.logoText}>{logo.name}</span>
              {i < logos.length - 1 && <span className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
