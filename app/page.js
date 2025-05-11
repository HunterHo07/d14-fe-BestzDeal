'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import styles from './page.module.css';

// Components
import HeroBackground from './components/HeroBackground';
import FuturisticButton from './components/FuturisticButton';
import FuturisticCard from './components/FuturisticCard';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.hero-main-title',
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    gsap.fromTo('.hero-title span',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7
      }
    );

    gsap.fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 1.4
      }
    );

    gsap.fromTo('.hero-buttons',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 1.7
      }
    );
  }, []);

  const features = [
    {
      icon: '🔄',
      title: 'Reverse Marketplace',
      description: 'Buyers post what they want, sellers compete to offer the best deals'
    },
    {
      icon: '💰',
      title: 'Save Time & Money',
      description: 'No more endless searching and comparing prices across multiple sites'
    },
    {
      icon: '🏪',
      title: 'Support Local Sellers',
      description: 'Connect directly with local businesses for faster delivery and pickup'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Safe communication and optional secure payment system'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Post Your Request',
      description: 'Describe what you want to buy, your budget, and location preferences',
      color: 'primary'
    },
    {
      step: '02',
      title: 'Receive Offers',
      description: 'Verified sellers respond with their best deals tailored to your request',
      color: 'secondary'
    },
    {
      step: '03',
      title: 'Choose the Best Deal',
      description: 'Compare offers based on price, seller ratings, and delivery options',
      color: 'accent'
    },
    {
      step: '04',
      title: 'Complete Transaction',
      description: 'Finalize your purchase directly with the seller of your choice',
      color: 'primary'
    }
  ];

  return (
    <>
      <motion.section
        ref={heroRef}
        className={styles.heroSection}
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY
        }}
      >
        <HeroBackground />

        <div className={styles.heroContent}>
          <div className={styles.heroMainTitle}>
            <span className="hero-main-title gradient-text">BestzDeal</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className="hero-title">Shop</span>{' '}
            <span className="hero-title">Smarter,</span>{' '}
            <span className="hero-title">Not</span>{' '}
            <span className="hero-title">Harder</span>
          </h1>

          <p className={`${styles.heroSubtitle} hero-subtitle`}>
            Let sellers compete for your business. Post what you want, get the best deals.
          </p>

          <div className={`${styles.heroButtons} hero-buttons`}>
            <FuturisticButton href="/signup" size="large">
              Post Your Request
            </FuturisticButton>

            <FuturisticButton href="/demo" variant="secondary" size="large">
              See How It Works
            </FuturisticButton>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.mouseIcon}>
            <div className={styles.mouseWheel}></div>
          </div>
          <p>Scroll to explore</p>
        </div>
      </motion.section>

      <section className={`${styles.section} ${styles.featuresSection}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose <span className="gradient-text">BestzDeal</span></h2>
            <p>A revolutionary approach to online shopping that puts you in control</p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FuturisticCard key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FuturisticCard>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.howItWorksSection}`} id="how-it-works">
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>How It <span className="gradient-text">Works</span></h2>
            <p>Four simple steps to find the best deals on anything you want to buy</p>
          </motion.div>

          <div className={styles.stepsContainer}>
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`${styles.stepNumber} ${styles[step.color]}`}>{step.step}</div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FuturisticButton href="/signup" size="large">
              Post Your Request
            </FuturisticButton>
          </motion.div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialsSection}`} id="testimonials">
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Success <span className="gradient-text">Stories</span></h2>
            <p>See how BestzDeal is changing the way people shop</p>
          </motion.div>

          <div className={styles.testimonialsGrid}>
            <FuturisticCard className={styles.testimonialCard} glowColor="primary">
              <div className={styles.testimonialContent}>
                <p>"I saved over $300 on a new laptop by letting sellers compete for my business. The best part was discovering a local shop I didn't even know existed!"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>JD</div>
                  <div>
                    <h4>John Doe</h4>
                    <p>Tech Enthusiast</p>
                  </div>
                </div>
              </div>
            </FuturisticCard>

            <FuturisticCard className={styles.testimonialCard} glowColor="secondary">
              <div className={styles.testimonialContent}>
                <p>"As a small electronics store owner, BestzDeal has brought me customers I would never have reached through traditional advertising. It's been a game-changer."</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>MS</div>
                  <div>
                    <h4>Maria Smith</h4>
                    <p>Store Owner</p>
                  </div>
                </div>
              </div>
            </FuturisticCard>

            <FuturisticCard className={styles.testimonialCard} glowColor="accent">
              <div className={styles.testimonialContent}>
                <p>"I needed a specific camera lens urgently for a shoot. Posted my request and within hours had multiple offers, including same-day delivery options!"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>AJ</div>
                  <div>
                    <h4>Alex Johnson</h4>
                    <p>Photographer</p>
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className="container">
          <FuturisticCard className={styles.ctaCard} interactive={false}>
            <div className={styles.ctaContent}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to <span className="gradient-text">Transform</span> Your Shopping Experience?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of smart shoppers who are saving time and money with BestzDeal.
              </motion.p>

              <motion.div
                className={styles.ctaButtons}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FuturisticButton href="/signup" size="large">
                  Post Your Request Now
                </FuturisticButton>

                <FuturisticButton href="/demo" variant="secondary" size="large">
                  Watch Demo
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </div>
      </section>
    </>
  );
}
