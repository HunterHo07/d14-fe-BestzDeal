'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './page.module.css';
import FuturisticButton from '../components/FuturisticButton';
import FuturisticCard from '../components/FuturisticCard';

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRef = useRef(null);

  const slides = [
    {
      title: "BestzDeal",
      subtitle: "The Reverse Marketplace",
      content: "Shop/seller come to find you — users post what they want, shops compete to offer best deals.",
      image: "images/pitch-slide1.svg",
    },
    {
      title: "The Problem",
      subtitle: "Current Shopping Experience",
      content: [
        "Buyers waste time searching and comparing prices across multiple sites",
        "Small/local sellers struggle to find direct leads",
        "Marketplace apps favor big sellers; local options hidden",
        "No reverse marketplace for buyer-driven demand"
      ],
      image: "images/pitch-slide2.svg",
    },
    {
      title: "The Solution",
      subtitle: "Reverse the Shopping Experience",
      content: [
        "Buyer posts product request (name, budget, location, delivery/pickup preference)",
        "Verified sellers respond with offers (price, ETA, bonuses)",
        "Buyer reviews offers and accepts best deal",
        "Optional: rating, chat, secure payment system"
      ],
      image: "images/pitch-slide3.svg",
    },
    {
      title: "Market Opportunity",
      subtitle: "Untapped Potential",
      content: [
        "$5.7 trillion global e-commerce market",
        "78% of consumers compare prices before purchasing",
        "31.7 million small businesses in US struggle with customer acquisition",
        "89% of small retailers would pay for qualified leads"
      ],
      image: "images/pitch-slide4.svg",
    },
    {
      title: "Business Model",
      subtitle: "Revenue Streams",
      content: [
        "Free basic listings for buyers and sellers",
        "Premium seller subscriptions ($19.99/month)",
        "5% commission on transactions (lower than industry average)",
        "Featured listings and promotional opportunities"
      ],
      image: "images/pitch-slide5.svg",
    },
    {
      title: "Phased Rollout",
      subtitle: "Strategic Implementation",
      content: [
        "Phase 1: MVP - Web app for buyers to post, sellers reply manually",
        "Phase 2: Add chat, auto-matching, seller dashboard, notifications",
        "Phase 3: Secure in-app payment, delivery tracking, buyer protection",
        "Phase 4: Mobile app, subscription model for premium sellers, AI deal matcher"
      ],
      image: "images/pitch-slide6.svg",
    },
    {
      title: "The Team",
      subtitle: "Experienced Founders",
      content: [
        "Jane Doe - CEO (Ex-Amazon, 10+ years e-commerce)",
        "John Smith - CTO (Ex-Shopify, Full-stack developer)",
        "Sarah Johnson - COO (Ex-eBay, Operations expert)",
        "Michael Brown - CMO (Ex-Etsy, Digital marketing specialist)"
      ],
      image: "images/pitch-slide7.svg",
    },
    {
      title: "Join Us",
      subtitle: "Investment Opportunity",
      content: "We're raising $1.5M seed round to build the future of shopping. Be part of the revolution that puts buyers in control and helps small businesses thrive.",
      image: "images/pitch-slide8.svg",
    }
  ];

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.pitch-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.pitch-subtitle',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 500);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className={styles.pitchDeckPage}>
      <div className={styles.pitchHeader}>
        <h1 className="pitch-title">BestzDeal Pitch Deck</h1>
        <p className="pitch-subtitle">Our vision for revolutionizing the shopping experience</p>
      </div>

      <div className={styles.slideContainer} ref={slideRef}>
        <div className={styles.slideControls}>
          <button
            className={styles.arrowButton}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.slideIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.slideIndicator} ${currentSlide === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.arrowButton}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.slideContent}>
          <AnimatePresence initial={false} custom={currentSlide}>
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={styles.slide}
            >
              <FuturisticCard className={styles.slideCard}>
                <div className={styles.slideCardContent}>
                  <div className={styles.slideInfo}>
                    <h2>{slides[currentSlide].title}</h2>
                    <h3>{slides[currentSlide].subtitle}</h3>

                    {Array.isArray(slides[currentSlide].content) ? (
                      <ul className={styles.slideList}>
                        {slides[currentSlide].content.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1) }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <motion.p
                        className={styles.slideText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {slides[currentSlide].content}
                      </motion.p>
                    )}

                    {currentSlide === slides.length - 1 && (
                      <motion.div
                        className={styles.slideCta}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <FuturisticButton href="/signup">
                          Get Started Now
                        </FuturisticButton>
                      </motion.div>
                    )}
                  </div>

                  <div className={styles.slideImageContainer}>
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      width={400}
                      height={300}
                      className={styles.slideImage}
                      priority
                    />
                  </div>
                </div>
              </FuturisticCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.slideProgress}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
          <span className={styles.slideCounter}>
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      <div className={styles.pitchCta}>
        <FuturisticCard className={styles.ctaCard} interactive={false}>
          <h2>Ready to Transform Shopping?</h2>
          <p>Join us in building the future of e-commerce where buyers are in control.</p>
          <div className={styles.ctaButtons}>
            <FuturisticButton href="/signup" size="large">
              Sign Up Now
            </FuturisticButton>
            <FuturisticButton href="/demo" variant="secondary" size="large">
              See Demo
            </FuturisticButton>
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
}
