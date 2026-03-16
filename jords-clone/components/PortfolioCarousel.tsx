'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PortfolioCarousel.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

gsap.registerPlugin(ScrollTrigger);

/* ── Service showcase items ── */
const showcases = [
  {
    id: 1,
    name: 'Enterprise SaaS Portal',
    tags: ['SOFTWARE DEV', 'CLOUD-NATIVE', 'FULL-STACK'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    description: 'Scalable multi-tenant platform for enterprise workflow automation',
    color: '#60a5fa',
  },
  {
    id: 2,
    name: 'E-Commerce Website',
    tags: ['WEB DEV', 'CRO OPTIMISED', 'NEXT.JS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
    description: 'High-converting storefront with seamless checkout experience',
    color: '#a78bfa',
  },
  {
    id: 3,
    name: 'HealthCare Mobile App',
    tags: ['MOBILE', 'IOS & ANDROID', 'REACT NATIVE'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    description: 'Patient-first app streamlining appointments and health records',
    color: '#4ade80',
  },
  {
    id: 4,
    name: 'AI Support Chatbot',
    tags: ['AI CHATBOT', 'GPT-POWERED', 'MULTI-CHANNEL'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    description: '24/7 intelligent assistant reducing support tickets by 68%',
    color: '#fb923c',
  },
  {
    id: 5,
    name: 'Autonomous Sales Agent',
    tags: ['AI AGENTS', 'LANGCHAIN', 'ORCHESTRATION'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    description: 'AI agent that qualifies leads and books demos autonomously',
    color: '#f472b6',
  },
  {
    id: 6,
    name: 'Predictive Analytics Engine',
    tags: ['MACHINE LEARNING', 'NLP', 'MLOPS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    description: 'Revenue forecasting model with 94% accuracy across 12M rows',
    color: '#2dd4bf',
  },
];

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);

export default function PortfolioCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const swiperWrapRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Title ── */
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      /* ── Swiper wrapper ── */
      gsap.fromTo(
        swiperWrapRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: swiperWrapRef.current, start: 'top 88%' },
          delay: 0.15,
        }
      );

      /* ── Controls ── */
      gsap.fromTo(
        controlsRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: controlsRef.current, start: 'top 92%' },
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.portfolio} ref={sectionRef} id="portfolio">
      <div className={styles.header} ref={titleRef}>
        <span className={`${styles.sectionLabel} mono`}>What we deliver</span>
        <h2 className={styles.sectionTitle}>Built for impact, designed to last.</h2>
        <p className={styles.sectionSubtitle}>
          From intelligent software to AI-powered agents — explore how we've helped businesses like yours move faster and think smarter.
        </p>
      </div>

      <div className={styles.swiperWrapper} ref={swiperWrapRef}>
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            el: `.${styles.pagination}`,
          }}
          navigation={{
            prevEl: `.${styles.prevBtn}`,
            nextEl: `.${styles.nextBtn}`,
          }}
          className={styles.swiper}
          initialSlide={1}
        >
          {showcases.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.cardImage} style={{ '--card-accent': item.color } as React.CSSProperties}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardBadge} style={{ background: item.color }}>
                    <span className={`mono`}>{item.tags[0]}</span>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardName}>{item.name}</span>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                  <div className={styles.cardTags}>
                    {item.tags.slice(1).map(tag => (
                      <span key={tag} className={`${styles.tag} mono`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.controls} ref={controlsRef}>
        <div className={styles.pagination} />
        <div className={styles.navButtons}>
          <button className={styles.prevBtn} aria-label="Previous">
            <ArrowLeft />
          </button>
          <button className={styles.nextBtn} aria-label="Next">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
