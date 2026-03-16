'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SolutionsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Icon components ── */
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const WebIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MobileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const BotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
    <line x1="12" y1="7" x2="12" y2="11" /><line x1="8" y1="15" x2="8" y2="17" /><line x1="16" y1="15" x2="16" y2="17" />
  </svg>
);
const GearIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const MLIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);

/* ── dot‑pattern svg ── */
function DotPattern({ rows = 8, cols = 8 }: { rows?: number; cols?: number }) {
  const gap = 14;
  const r = 1.5;
  return (
    <svg width={cols * gap} height={rows * gap} viewBox={`0 0 ${cols * gap} ${rows * gap}`}
      className={styles.dotPattern} aria-hidden="true">
      {Array.from({ length: rows }).map((_, ri) =>
        Array.from({ length: cols }).map((_, ci) => (
          <circle key={`${ri}-${ci}`} cx={ci * gap + gap / 2} cy={ri * gap + gap / 2} r={r} fill="currentColor" />
        ))
      )}
    </svg>
  );
}

const solutions = [
  {
    id: 'software',
    chip: 'SOFTWARE DEV',
    icon: <CodeIcon />,
    title: 'Custom Software\nDevelopment',
    desc: "End-to-end software engineered around your business logic — scalable, secure, and production-ready from day one. We don't template. We architect.",
    tags: ['Full-Stack', 'API Design', 'Cloud-Native', 'Microservices'],
    accent: 'blue',
  },
  {
    id: 'web',
    chip: 'WEB DEV',
    icon: <WebIcon />,
    title: 'Website\nDevelopment',
    desc: 'High-performance websites and web applications built to convert. Every pixel intentional. Every interaction purposeful.',
    tags: ['Next.js / React', 'CMS Integration', 'SEO Optimised', 'PWA'],
    accent: 'purple',
  },
  {
    id: 'mobile',
    chip: 'MOBILE',
    icon: <MobileIcon />,
    title: 'Mobile App\nDevelopment',
    desc: 'Cross-platform and native apps that feel premium on every device. Built for performance, polished for people.',
    tags: ['React Native', 'iOS & Android', 'App Store Ready', 'Offline-First'],
    accent: 'green',
  },
  {
    id: 'chatbot',
    chip: 'AI CHATBOT',
    icon: <BotIcon />,
    title: 'Chatbot\nIntegration',
    desc: 'Intelligent conversational interfaces that handle enquiries, qualify leads, and delight users — around the clock, without fatigue.',
    tags: ['GPT-Powered', 'Multi-Channel', 'CRM Integration', 'Analytics'],
    accent: 'orange',
  },
  {
    id: 'agent',
    chip: 'AI AGENTS',
    icon: <GearIcon />,
    title: 'AI Agent\nDevelopment',
    desc: 'Autonomous AI agents that reason, plan, and execute complex workflows — turning what once required a team into a single intelligent system.',
    tags: ['LangChain / LangGraph', 'RAG Pipelines', 'Tool Use', 'Orchestration'],
    accent: 'pink',
  },
  {
    id: 'ml',
    chip: 'MACHINE LEARNING',
    icon: <MLIcon />,
    title: 'ML Model\nDeployment',
    desc: 'From raw data to production-grade predictive systems. We design, train, and deploy machine learning models tailored to your specific business problem.',
    tags: ['Predictive Modelling', 'NLP', 'Computer Vision', 'MLOps'],
    accent: 'teal',
  },
];

export default function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%' },
        }
      );

      /* ── Cards stagger ── */
      const validCards = cardRefs.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.solutions} ref={sectionRef} id="solutions">
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header} ref={headerRef}>
          <div className={styles.asterisk}>◈</div>
          <p className={`${styles.subLabel} mono`}>
            TAILORED FOR YOUR GOALS.<br />ENGINEERED FOR RESULTS.
          </p>
          <div className={styles.titleRow}>
            <span className={styles.bracket}>[</span>
            <h2 className={styles.title}>What we build.</h2>
            <span className={styles.bracket}>]</span>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {solutions.map((sol, i) => (
            <div
              key={sol.id}
              className={`${styles.card} ${styles[`accent_${sol.accent}`]}`}
              ref={el => { cardRefs.current[i] = el; }}
            >
              <div className={styles.cardTop}>
                <span className={`${styles.chip} mono`}>{sol.chip}</span>
                <span className={styles.iconWrap}>{sol.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>
                {sol.title.split('\n').map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </h3>
              <p className={styles.cardDesc}>{sol.desc}</p>
              <div className={styles.tags}>
                {sol.tags.map(tag => (
                  <span key={tag} className={`${styles.tag} mono`}>{tag}</span>
                ))}
              </div>
              <DotPattern rows={7} cols={7} />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className={styles.customStrip}>
          <div className={styles.stripIcon}>
            <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="Vsmart Logo" />
          </div>
          <div className={styles.stripContent}>
            <h3 className={styles.stripTitle}>Need something unique?</h3>
            <div className={styles.stripDivider} />
            <p className={styles.stripDesc}>
              If your challenge doesn't fit a box, good — that's exactly where we thrive. We craft fully bespoke solutions for complex, one-of-a-kind problems.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
