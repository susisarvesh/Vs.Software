'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import FloatingNavbar from '@/components/FloatingNavbar';
import LenisProvider from '@/components/LenisProvider';
import PageLoader from '@/components/PageLoader';

// Dynamic imports for GSAP-heavy components to avoid SSR issues
const MarqueeSection = dynamic(() => import('@/components/MarqueeSection'), { ssr: false });
const SolutionsSection = dynamic(() => import('@/components/SolutionsSection'), { ssr: false });
const TrustSection = dynamic(() => import('@/components/TrustSection'), { ssr: false });
const PhilosophySection = dynamic(() => import('@/components/PhilosophySection'), { ssr: false });
const WhyUsSection = dynamic(() => import('@/components/WhyUsSection'), { ssr: false });
const ProcessBentoGrid = dynamic(() => import('@/components/ProcessBentoGrid'), { ssr: false });
const FooterCTA = dynamic(() => import('@/components/FooterCTA'), { ssr: false });

export default function Home() {
  return (
    <LenisProvider>
      <PageLoader />
      <main>
        <HeroSection />
        <MarqueeSection />
        <SolutionsSection />
        <TrustSection />
        <PhilosophySection />
        <WhyUsSection />
        <ProcessBentoGrid />
        <FooterCTA />
      </main>
      <FloatingNavbar />
    </LenisProvider>
  );
}

