'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import styles from './Logo.module.css';

const Logo = ({ size = 'medium' }) => {
  const logoRef = useRef(null);
  
  useEffect(() => {
    if (!logoRef.current) return;
    
    // Create a GSAP timeline for logo animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    
    // Animate the arrows
    tl.to('.logo-arrow-up', {
      y: -3,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to('.logo-arrow-up', {
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to('.logo-arrow-down', {
      y: 3,
      duration: 0.5,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to('.logo-arrow-down', {
      y: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, '-=0.25');
    
    // Pulse the logo background
    gsap.to('.logo-bg', {
      scale: 1.05,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    return () => {
      tl.kill();
      gsap.killTweensOf('.logo-bg');
    };
  }, []);
  
  return (
    <Link href="/" className={styles.logoLink}>
      <div className={`${styles.logo} ${styles[size]}`} ref={logoRef}>
        <div className={`${styles.logoBg} logo-bg`}></div>
        <div className={styles.logoSquare}>
          <div className={`${styles.logoArrowUp} logo-arrow-up`}></div>
          <div className={`${styles.logoArrowDown} logo-arrow-down`}></div>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTextBestz}>Bestz</span>
          <span className={styles.logoTextDeal}>Deal</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
