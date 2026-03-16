'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyUsSection.module.css';

gsap.registerPlugin(ScrollTrigger);



/* ── dot‑pattern svg ── */
function DotPattern({ rows = 9, cols = 9 }: { rows?: number; cols?: number }) {
  const gap = 13;
  const r = 1.5;
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      className={styles.dotPattern}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).map((_, ri) =>
        Array.from({ length: cols }).map((_, ci) => (
          <circle key={`${ri}-${ci}`} cx={ci * gap + gap / 2} cy={ri * gap + gap / 2} r={r} fill="currentColor" />
        ))
      )}
    </svg>
  );
}

/* ── count‑up stat component ── */
function CountStat({
  target,
  suffix,
  label,
  triggerRef,
}: {
  target: number;
  suffix: string;
  label: string;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const trigger = triggerRef.current;
    if (!el || !trigger) return;

    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
        });
      },
    });
    return () => st.kill();
  }, [target, suffix, triggerRef]);

  return (
    <div className={`${styles.card} ${styles.statCard}`}>
      <span className={styles.statNum} ref={numRef}>0{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function WhyUsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const bentoRef    = useRef<HTMLDivElement>(null);

  /* stagger all direct card children */
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* header fade‑up */
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%' } }
      );

      /* each row fades up slightly staggered */
      [row1Ref, row2Ref, row3Ref, row4Ref].forEach((r, i) => {
        gsap.fromTo(r.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: r.current, start: 'top 90%' },
            delay: i * 0.06
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.whyUs} ref={sectionRef} id="why-us">
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header} ref={headerRef}>
          <div className={styles.asterisk}>✳</div>
          <p className={`${styles.subLabel} mono`}>
            WE DON'T JUST DELIVER.<br />WE BUILD LIKE IT'S OUR OWN.
          </p>
          <div className={styles.titleRow}>
            <span className={styles.bracket}>[</span>
            <h2 className={styles.title}>Engineering Experts.</h2>
            <span className={styles.bracket}>]</span>
          </div>
        </div>

        {/* ── Bento ── */}
        <div className={styles.bento} ref={bentoRef}>

          {/* ── ROW 1: Specialists | Collective ── */}
          <div className={styles.row1} ref={row1Ref}>

            {/* SPECIALISTS */}
            <div className={`${styles.card} ${styles.specialists}`}>
              <span className={`${styles.chip} mono`}>SPECIALISTS</span>
              <h3 className={styles.cardTitle}>
                Tech experts.<br />Not generalists.
              </h3>
              <p className={styles.cardDesc}>
                Great software isn't built by committees — it's crafted by specialists. We deploy senior engineers and AI experts, zero juniors, zero filler.
              </p>
              <DotPattern rows={10} cols={10} />
            </div>

            {/* INNOVATION */}
            <div className={`${styles.card} ${styles.collective}`}>
              <span className={`${styles.chip} mono`}>EXPERTISE</span>
              <h3 className={styles.cardTitle}>
                High-stakes<br />proficiency.
              </h3>
              <p className={styles.cardDesc}>
                We don&apos;t do &quot;basic.&quot; We solve the technical puzzles that others avoid. From autonomous AI systems to ultra-scalable cloud clusters, we bring a level of mastery that turns complex problems into assets.
              </p>
              <div className={styles.collectiveDots}>
                <DotPattern rows={10} cols={10} />
              </div>
            </div>
          </div>

          {/* ── ROW 2: [Stat col] | [Results card] ── */}
          <div className={styles.row2} ref={row2Ref}>
            <div className={styles.statCol}>
              <CountStat target={98} suffix="%" label="Clients see uplift"  triggerRef={sectionRef} />
              <CountStat target={50} suffix="+" label="Projects"             triggerRef={sectionRef} />
            </div>

            {/* RESULTS */}
            <div className={`${styles.card} ${styles.resultsCard}`}>
              <span className={`${styles.chip} mono`}>RESULTS</span>
              <h3 className={styles.cardTitle}>
                Engineered for<br />measurable impact
              </h3>
              <p className={styles.cardDesc}>
                Technology is only powerful when it moves your metrics. Everything we build is engineered to perform, scale, and deliver ROI.
              </p>
              <div className={styles.resultsDots}>
                <DotPattern rows={12} cols={12} />
              </div>
            </div>
          </div>

          {/* ── ROW 3: [Partner card] | [Stat col] ── */}
          <div className={styles.row3} ref={row3Ref}>

            {/* PARTNER */}
            <div className={`${styles.card} ${styles.partnerCard}`}>
              <span className={`${styles.chip} mono`}>PARTNERSHIP</span>
              <h3 className={styles.cardTitle}>
                Long-term tech<br />partner, not vendor
              </h3>
              <p className={styles.cardDesc}>
                We're your engineering team for version 1 and version 10. Continuous improvements. No complacency. Built to evolve with your roadmap.
              </p>
              <div className={styles.partnerDots}>
                <DotPattern rows={10} cols={10} />
              </div>
            </div>

            <div className={styles.statCol}>
              <CountStat target={10} suffix="+" label="Years experience" triggerRef={sectionRef} />
              <CountStat target={12} suffix="+" label="Specialists"      triggerRef={sectionRef} />
            </div>
          </div>

          {/* ── ROW 4: Agency wide card ── */}
          <div className={`${styles.card} ${styles.agencyCard}`} ref={row4Ref}>
            <div className={styles.agencyIcon}>
              <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="Vsmart Logo" />
            </div>
            <h3 className={styles.agencyTitle}>We are not<br />just a vendor</h3>
            <div className={styles.agencyDivider} />
            <p className={styles.agencyDesc}>
              We're a dedicated technology partner — lean, senior, and fully invested in your success. No account managers. No handoffs. Just expertise.
            </p>
          </div>

        </div>{/* /bento */}
      </div>
    </section>
  );
}
