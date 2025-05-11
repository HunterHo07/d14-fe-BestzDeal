'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './page.module.css';
import FuturisticButton from '../components/FuturisticButton';
import FuturisticCard from '../components/FuturisticCard';

export default function WhyUsPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.whyus-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.whyus-subtitle',
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

  const competitors = [
    {
      name: "Amazon",
      founded: "1994",
      model: "Seller-focused marketplace",
      pros: ["Vast inventory", "Fast shipping", "Established brand"],
      cons: ["Favors large sellers", "Overwhelming options", "Impersonal experience"],
      fee: "8-15% commission + $39.99/mo",
      color: "primary"
    },
    {
      name: "eBay",
      founded: "1995",
      model: "Auction & fixed-price marketplace",
      pros: ["Auction format", "Wide variety", "Established platform"],
      cons: ["Declining relevance", "Seller-initiated only", "Limited local focus"],
      fee: "10-12% commission + listing fees",
      color: "secondary"
    },
    {
      name: "Etsy",
      founded: "2005",
      model: "Handmade & vintage marketplace",
      pros: ["Niche focus", "Creative products", "Community feel"],
      cons: ["Limited to specific categories", "Seller-initiated only", "Higher prices"],
      fee: "6.5% commission + $0.20/listing",
      color: "accent"
    },
    {
      name: "BestzDeal",
      founded: "2023",
      model: "Reverse marketplace",
      pros: ["Buyer-initiated", "Competitive offers", "Local seller focus", "Time-saving"],
      cons: ["Newer platform", "Building seller network", "Limited categories (initially)"],
      fee: "5% commission, optional $19.99/mo premium",
      color: "primary",
      highlight: true
    }
  ];

  const advantages = [
    {
      title: "Time Efficiency",
      description: "Save 5+ hours weekly that average consumers spend comparison shopping",
      icon: "⏱️",
      color: "primary"
    },
    {
      title: "Better Prices",
      description: "Sellers compete directly for your business, offering their best deals",
      icon: "💰",
      color: "secondary"
    },
    {
      title: "Local Discovery",
      description: "Connect with local businesses you might never have found otherwise",
      icon: "🏪",
      color: "accent"
    },
    {
      title: "Personalized Offers",
      description: "Receive deals tailored specifically to your request and preferences",
      icon: "🎯",
      color: "primary"
    },
    {
      title: "Transparent Competition",
      description: "See all offers side-by-side with clear pricing and terms",
      icon: "👁️",
      color: "secondary"
    },
    {
      title: "No More FOMO",
      description: "Stop wondering if you missed a better deal somewhere else",
      icon: "✅",
      color: "accent"
    }
  ];

  const testimonials = [
    {
      quote: "I've been using BestzDeal for 3 months and have saved over $500 on electronics purchases. The best part is discovering local shops with amazing service.",
      author: "Michael T.",
      role: "Tech Enthusiast",
      image: "images/testimonial1.svg"
    },
    {
      quote: "As a small business owner, BestzDeal has transformed how I find new customers. I'm getting qualified leads directly from people looking for exactly what I sell.",
      author: "Sarah L.",
      role: "Boutique Owner",
      image: "images/testimonial2.svg"
    }
  ];

  return (
    <div className={styles.whyUsPage}>
      <div className={styles.whyUsHeader} ref={headerRef}>
        <motion.h1
          className="whyus-title"
          style={{
            transform: isHeaderInView ? "none" : "translateY(50px)",
            opacity: isHeaderInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          Why Choose <span className="gradient-text">BestzDeal</span>
        </motion.h1>
        <motion.p
          className="whyus-subtitle"
          style={{
            transform: isHeaderInView ? "none" : "translateY(30px)",
            opacity: isHeaderInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
          }}
        >
          See how we're revolutionizing online shopping compared to traditional marketplaces
        </motion.p>
      </div>

      <section className={styles.competitorsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Competitive <span className="gradient-text">Landscape</span></h2>
            <p>How BestzDeal compares to traditional marketplaces</p>
          </div>

          <div className={styles.competitorsGrid}>
            {competitors.map((competitor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FuturisticCard
                  className={`${styles.competitorCard} ${competitor.highlight ? styles.highlightCard : ''}`}
                  glowColor={competitor.color}
                >
                  <div className={styles.competitorHeader}>
                    <h3>{competitor.name}</h3>
                    <span className={styles.founded}>Est. {competitor.founded}</span>
                  </div>

                  <div className={styles.competitorModel}>
                    {competitor.model}
                  </div>

                  <div className={styles.competitorDetails}>
                    <div className={styles.competitorSection}>
                      <h4>Pros</h4>
                      <ul className={styles.competitorList}>
                        {competitor.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.competitorSection}>
                      <h4>Cons</h4>
                      <ul className={styles.competitorList}>
                        {competitor.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.competitorFee}>
                    <span>Fee Structure:</span> {competitor.fee}
                  </div>

                  {competitor.highlight && (
                    <div className={styles.highlightBadge}>
                      Our Solution
                    </div>
                  )}
                </FuturisticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.advantagesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>The BestzDeal <span className="gradient-text">Advantage</span></h2>
            <p>Key benefits that set us apart from traditional shopping experiences</p>
          </div>

          <div className={styles.advantagesGrid}>
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FuturisticCard className={styles.advantageCard} glowColor={advantage.color}>
                  <div className={`${styles.advantageIcon} ${styles[advantage.color]}`}>
                    {advantage.icon}
                  </div>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </FuturisticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Users <span className="gradient-text">Say</span></h2>
            <p>Real experiences from buyers and sellers on BestzDeal</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.testimonialContainer}
              >
                <FuturisticCard className={styles.testimonialCard}>
                  <div className={styles.testimonialContent}>
                    <div className={styles.testimonialQuote}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20C10 15.5817 13.5817 12 18 12V16C15.7909 16 14 17.7909 14 20V28H6V20H10Z" fill="#6C63FF" fillOpacity="0.5"/>
                        <path d="M26 20C26 15.5817 29.5817 12 34 12V16C31.7909 16 30 17.7909 30 20V28H22V20H26Z" fill="#6C63FF" fillOpacity="0.5"/>
                      </svg>
                      <p>{testimonial.quote}</p>
                    </div>

                    <div className={styles.testimonialAuthor}>
                      <div className={styles.testimonialImage}>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className={styles.testimonialInfo}>
                        <h4>{testimonial.author}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </FuturisticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <FuturisticCard className={styles.ctaCard} interactive={false}>
            <div className={styles.ctaContent}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to Experience the <span className="gradient-text">Difference</span>?
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
                  See How It Works
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </div>
      </section>
    </div>
  );
}
