'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProcessBentoGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Software Development',
    description: 'We architect custom software that aligns precisely with your workflows — built for scale, resilience, and long-term ownership. Zero off-the-shelf compromise.',
    tags: ['Custom Architecture', 'API-First', 'Scalable Systems'],
    icon: '{ }',
  },
  {
    id: '02',
    title: 'Website Development',
    description: 'Performance-obsessed, conversion-optimised websites that make your brand impossible to ignore. Beautiful by design. Effective by intention.',
    tags: ['Next.js / Webflow', 'SEO Optimised', 'CRO Focused'],
    icon: '⊞',
  },
  {
    id: '03',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile experiences that feel entirely native. Shipped to both stores with an interface your users will actually enjoy using.',
    tags: ['React Native', 'iOS & Android', 'App Store Ready'],
    icon: '◻',
  },
  {
    id: '04',
    title: 'Chatbot Integration',
    description: 'Intelligent, context-aware chatbots that handle enquiries, qualify leads, and delight users — 24/7, without fatigue or fluctuation.',
    tags: ['GPT-4 Powered', 'CRM Connected', 'Multi-Channel'],
    icon: '◈',
  },
  {
    id: '05',
    title: 'AI Agent Development',
    description: 'Autonomous agents that reason, plan, and execute multi-step workflows — compressing hours of human effort into seconds of machine intelligence.',
    tags: ['LangGraph / CrewAI', 'Tool-Use & RAG', 'Workflow Orchestration'],
    icon: '△',
  },
  {
    id: '06',
    title: 'ML Model Deployment',
    description: 'From training datasets to production-ready predictive systems. We design, validate, and operationalise machine learning for measurable business outcomes.',
    tags: ['Predictive Analytics', 'NLP & Vision', 'MLOps Pipeline'],
    icon: '◎',
  },
];

export default function ProcessBentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const idRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const featuredRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%' },
        }
      );

      /* ── Cards stagger ── */
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 90%',
            onEnter: () => {
              // Animate each ID number
              idRefs.current.filter(Boolean).forEach((el, i) => {
                if (!el) return;
                const targetNum = i + 1;
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: targetNum,
                  duration: 1.5,
                  delay: 0.2 + (i * 0.1),
                  ease: 'power2.out',
                  onUpdate: () => {
                    const rounded = Math.floor(obj.val);
                    el.innerText = rounded < 10 ? `0${rounded}` : `${rounded}`;
                  }
                });
              });
            }
          },
        }
      );

      /* ── Featured strip ── */
      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.process} ref={sectionRef} id="process">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <span className={`${styles.label} mono`}>Our services</span>
          <h2 className={styles.title}>
            Six capabilities.<br />One partner.
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={styles.card}
              ref={el => { cardsRef.current[i] = el; }}
            >
              <div className={styles.cardHeader}>
                <span 
                  className={`${styles.phaseId} mono`}
                  ref={el => { idRefs.current[i] = el; }}
                >
                  0{i + 1}
                </span>
                <span className={styles.icon}>{svc.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.description}</p>
              <div className={styles.tags}>
                {svc.tags.map(tag => (
                  <span key={tag} className={`${styles.tag} mono`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke strip */}
        <div className={styles.featured} ref={featuredRef}>
          <div className={styles.featuredLogo}>
            <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="Vsmart Logo" />
          </div>
          <div className={styles.featuredContent}>
            <h3 className={styles.featuredTitle}>Need something bespoke?</h3>
            <div className={styles.featuredDivider} />
            <p className={styles.featuredDesc}>
              Every great product starts with an unusual problem. If your challenge doesn't fit a predefined category, we'll design a tailored solution from the ground up — together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
