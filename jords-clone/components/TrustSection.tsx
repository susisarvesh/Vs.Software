'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TrustSection.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Stats ── */
const stats = [
  { target: 50, suffix: '+', label: 'Projects Delivered',    sub: 'Across web, mobile & AI'       },
  { target: 98, suffix: '%', label: 'Client Satisfaction',   sub: 'Based on post-project surveys'  },
  { target: 10, suffix: '+', label: 'Years of Experience',   sub: 'Building production systems'    },
  { target: 3,  suffix: '×', label: 'Faster Time-to-Market', sub: 'Vs. traditional agencies'       },
];

/* ── Workflow Timeline ── */
const timelineSteps = [
  {
    step: '01',
    title: 'Discovery Call',
    duration: 'Day 1',
    description: 'We start with a focused 60-minute session to understand your goals, constraints, and vision. No generic questions — just a sharp diagnosis.',
    tags: ['Goals Alignment', 'Scope Definition', 'Budget Planning'],
  },
  {
    step: '02',
    title: 'Proposal & Architecture',
    duration: 'Day 2–3',
    description: 'You receive a detailed proposal with a technical architecture blueprint, timeline, and milestone-based pricing. Clear. Transparent. No surprises.',
    tags: ['Tech Blueprint', 'Milestone Map', 'Fixed-Price Quote'],
  },
  {
    step: '03',
    title: 'Design & Prototyping',
    duration: 'Week 1–2',
    description: "High-fidelity prototypes and interactive designs are built first — so you see exactly what's being built before a single line of code is written.",
    tags: ['UI/UX Design', 'Interactive Prototype', 'Feedback Loop'],
  },
  {
    step: '04',
    title: 'Agile Development',
    duration: 'Week 2–6',
    description: 'Development happens in tight sprint cycles with weekly demos. You see progress, give feedback, and stay in control throughout the entire build.',
    tags: ['Weekly Sprints', 'Live Demos', 'Continuous Review'],
  },
  {
    step: '05',
    title: 'QA & Launch',
    duration: 'Final Week',
    description: 'Rigorous testing across devices and environments before a coordinated launch. We monitor performance post-launch and handle any critical issues immediately.',
    tags: ['Cross-Device Testing', 'Performance Audit', 'Go-Live Support'],
  },
  {
    step: '06',
    title: 'Ongoing Support',
    duration: 'Post-Launch',
    description: "We don't disappear after shipping. Retainer-based support keeps your product healthy — new features, optimisations, and rapid fixes on demand.",
    tags: ['Retainer Plans', 'Feature Additions', 'Priority Support'],
  },
];

/* ── Professional SVG Icons ── */
const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconRefreshCw = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

/* ── Promises ── */
const promises = [
  {
    Icon: IconZap,
    title: 'Fast Turnaround',
    desc: 'Most projects kick off within 48 hours of scoping. No waiting rooms, no intake queues.',
  },
  {
    Icon: IconShield,
    title: 'Full IP Ownership',
    desc: 'Everything we build belongs to you. Code, designs, data — no licensing lock-in.',
  },
  {
    Icon: IconLayers,
    title: 'Milestone-Based',
    desc: 'Pay as you progress. Clear deliverables at every stage. No surprises at the end.',
  },
  {
    Icon: IconRefreshCw,
    title: 'Ongoing Support',
    desc: "We don't disappear after launch. Retainer-based support available for every client.",
  },
];

export default function TrustSection() {
  const sectionRef       = useRef<HTMLElement>(null);
  const headerRef        = useRef<HTMLDivElement>(null);
  const statsRef         = useRef<HTMLDivElement>(null);
  const timelineRef      = useRef<HTMLDivElement>(null);
  const promisesRef      = useRef<HTMLDivElement>(null);
  const statCardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const promiseCardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const statValueRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef          = useRef<HTMLDivElement>(null);
  const lastDotRef       = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      /* ── Set line height to stop at last dot center ── */
      const calculateHeight = () => {
        if (lineRef.current && lastDotRef.current && timelineRef.current) {
          const lineRect = lineRef.current.getBoundingClientRect();
          const dotRect = lastDotRef.current.getBoundingClientRect();
          const fullHeight = (dotRect.top + dotRect.height / 2) - lineRect.top;
          gsap.set(lineRef.current, { height: fullHeight, bottom: 'auto' });
          ScrollTrigger.refresh();
        }
      };

      // Initial calc
      setTimeout(calculateHeight, 100); // Small delay to ensure layout

      /* ── Timeline line scrub + color change ── */
      const ORANGE = '#f97316';
      const BLUE   = '#3b82f6';
      
      const wrapper = timelineRef.current?.querySelector(`.${styles.timelineWrapper}`);

      // Line Growth - end when the wrapper's bottom (last card) reaches viewport center
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            end: 'bottom 50%', 
            scrub: 0.5,
          }
        }
      );

      // Color Transition - uses the last dot as trigger for pinpoint accuracy
      gsap.fromTo(lineRef.current,
        { background: BLUE },
        {
          background: ORANGE,
          scrollTrigger: {
            trigger: lastDotRef.current,
            start: 'top 85%', 
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      // Last dot turning orange state change
      ScrollTrigger.create({
        trigger: lastDotRef.current,
        start: 'top 55%', // Triggers just before growth completion
        onEnter: () => {
          if (lastDotRef.current) {
            lastDotRef.current.style.background = ORANGE;
            lastDotRef.current.style.boxShadow = `0 0 0 2.5px var(--card-bg), 0 0 0 4.5px ${ORANGE}`;
          }
        },
        onLeaveBack: () => {
          if (lastDotRef.current) {
            lastDotRef.current.style.background = BLUE;
            lastDotRef.current.style.boxShadow = `0 0 0 2.5px var(--card-bg), 0 0 0 4.5px ${BLUE}`;
          }
        }
      });

      /* ── Header ── */
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease,
          scrollTrigger: { trigger: headerRef.current, start: 'top 92%' } }
      );

      /* ── Stats ── */
      const validStatCards = statCardRefs.current.filter(Boolean);
      const validStatValues = statValueRefs.current.filter(Boolean);

      gsap.fromTo(validStatCards,
        { opacity: 0, y: 36, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.09, ease,
          scrollTrigger: { 
            trigger: statsRef.current, 
            start: 'top 90%',
            onEnter: () => {
              // Start incrementing numbers
              validStatValues.forEach((el, i) => {
                if (!el) return;
                const target = stats[i].target;
                const suffix = stats[i].suffix;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: target,
                  duration: 2.5,
                  delay: 0.2 + (i * 0.1),
                  ease: 'power3.out',
                  onUpdate: () => {
                    if (el) el.innerText = Math.floor(obj.val) + suffix;
                  }
                });
              });
            }
          } 
        }
      );

      /* ── Timeline cards ── */
      timelineItemRefs.current.filter(Boolean).forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.65, ease,
            scrollTrigger: { trigger: item, start: 'top 92%' } }
        );
      });

      /* ── Promises ── */
      gsap.fromTo(promiseCardRefs.current.filter(Boolean),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease,
          scrollTrigger: { trigger: promisesRef.current, start: 'top 90%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.trust} ref={sectionRef} id="trust">
      <div className={styles.gradientOrb} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header} ref={headerRef}>
          <span className={`${styles.sectionLabel} mono`}>Why teams trust us</span>
          <h2 className={styles.sectionTitle}>
            Built for confidence.<br />Backed by outcomes.
          </h2>
          <p className={styles.sectionDesc}>
            We may be lean, but our track record speaks clearly. Every project we take on is treated with the same seriousness — whether it&apos;s a weekend MVP or a full enterprise platform.
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className={styles.statsGrid} ref={statsRef}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={styles.statCard}
              ref={el => { statCardRefs.current[i] = el; }}
            >
              <span 
                className={styles.statValue}
                ref={el => { statValueRefs.current[i] = el; }}
              >
                0{stats[i].suffix}
              </span>
              <span className={styles.statLabel}>{stats[i].label}</span>
              <span className={styles.statSub}>{stats[i].sub}</span>
            </div>
          ))}
        </div>

        {/* ── Workflow Timeline ── */}
        <div className={styles.timelineBlock} ref={timelineRef}>
          <p className={`${styles.blockLabel} mono`}>OUR WORKFLOW</p>
          <h3 className={styles.timelineHeading}>
            From first call to final launch —<br />here&apos;s exactly how we work.
          </h3>

          <div className={styles.timelineWrapper}>
            {/* Vertical line — lives as a true absolute positioned line */}
            <div className={styles.timelineLine} ref={lineRef} />

            {/* Steps */}
            {timelineSteps.map((item, i) => {
              const isLast = i === timelineSteps.length - 1;
              return (
                <div
                  key={i}
                  className={`${styles.timelineItem}${isLast ? ' ' + styles.timelineItemLast : ''}`}
                  ref={el => { timelineItemRefs.current[i] = el; }}
                >
                  {/* Dot — perfectly centred on the line via CSS */}
                  <div
                    className={styles.timelineDot}
                    ref={isLast ? lastDotRef : undefined}
                  />

                  {/* Card */}
                  <div className={styles.timelineCard}>
                    <div className={styles.timelineCardTop}>
                      <span className={`${styles.timelineStep} mono`}>{item.step}</span>
                      <span className={`${styles.timelineDuration} mono`}>{item.duration}</span>
                    </div>
                    <h4 className={styles.timelineTitle}>{item.title}</h4>
                    <p className={styles.timelineDesc}>{item.description}</p>
                    <div className={styles.timelineTags}>
                      {item.tags.map(tag => (
                        <span key={tag} className={`${styles.timelineTag} mono`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Promises ── */}
        <div className={styles.promisesBlock} ref={promisesRef}>
          <p className={`${styles.blockLabel} mono`}>OUR COMMITMENTS</p>
          <div className={styles.promisesGrid}>
            {promises.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className={styles.promiseCard}
                ref={el => { promiseCardRefs.current[i] = el; }}
              >
                <div className={styles.promiseIconWrap}>
                  <Icon />
                </div>
                <h3 className={styles.promiseTitle}>{title}</h3>
                <p className={styles.promiseDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
