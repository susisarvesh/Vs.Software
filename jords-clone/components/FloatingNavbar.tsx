'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import styles from './FloatingNavbar.module.css';

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

export default function FloatingNavbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className={styles.navLinks}>
          <button onClick={() => scrollTo('why-us')} className={styles.navLink}>Why us</button>
          <button onClick={() => scrollTo('process')} className={styles.navLink}>What we do</button>
        </div>

        <button className={styles.navCta} onClick={openModal}>
          <span className={styles.ctaAvatar}>
            <img src="https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png" alt="VS" width={22} height={22} />
          </span>
          <span>Book an intro call</span>
        </button>

        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <GridIcon />
        </button>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button onClick={() => scrollTo('why-us')}>Why us</button>
          <button onClick={() => scrollTo('process')}>What we do</button>
          <button onClick={() => { openModal(); setMenuOpen(false); }}>Book a call</button>
        </div>
      )}
    </>
  );
}
