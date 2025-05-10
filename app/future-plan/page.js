'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './page.module.css';
import FuturisticButton from '../components/FuturisticButton';
import FuturisticCard from '../components/FuturisticCard';

export default function FuturePlanPage() {
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.future-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.future-subtitle',
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

  const phases = [
    {
      title: "Phase 1: MVP Launch",
      timeline: "Q2 2023",
      description: "Our initial launch focuses on the core functionality of the reverse marketplace concept.",
      features: [
        "Web app for buyers to post product requests",
        "Manual seller response system",
        "Basic user profiles and authentication",
        "Local storage for data persistence",
        "Simple messaging between buyers and sellers"
      ],
      image: "images/phase1.svg",
      color: "primary",
      status: "Completed"
    },
    {
      title: "Phase 2: Enhanced Platform",
      timeline: "Q4 2023",
      description: "Building on our MVP success, we'll add features to improve user experience and engagement.",
      features: [
        "Real-time chat functionality",
        "Automated seller matching algorithm",
        "Comprehensive seller dashboard",
        "Push notifications for new requests and offers",
        "Advanced search and filtering options"
      ],
      image: "images/phase2.svg",
      color: "secondary",
      status: "In Progress"
    },
    {
      title: "Phase 3: Full Marketplace",
      timeline: "Q2 2024",
      description: "Transforming into a complete marketplace with secure transactions and expanded features.",
      features: [
        "Secure in-app payment processing",
        "Escrow system for buyer protection",
        "Delivery tracking integration",
        "Comprehensive review and rating system",
        "Mobile-responsive design improvements"
      ],
      image: "images/phase3.svg",
      color: "accent",
      status: "Planned"
    },
    {
      title: "Phase 4: Platform Expansion",
      timeline: "Q4 2024",
      description: "Expanding our reach and capabilities to become the leading reverse marketplace globally.",
      features: [
        "Native mobile applications (iOS & Android)",
        "AI-powered deal matching and recommendations",
        "Premium seller subscription tiers",
        "Advanced analytics dashboard",
        "API for third-party integrations"
      ],
      image: "images/phase4.svg",
      color: "primary",
      status: "Planned"
    }
  ];

  const futureFeatures = [
    {
      title: "AI Deal Matcher",
      description: "Advanced AI that learns user preferences and automatically matches buyers with the most relevant sellers",
      icon: "🤖",
      color: "primary"
    },
    {
      title: "AR Product Preview",
      description: "Augmented reality feature allowing buyers to visualize products in their space before purchase",
      icon: "👓",
      color: "secondary"
    },
    {
      title: "Blockchain Verification",
      description: "Secure product authenticity verification using blockchain technology for high-value items",
      icon: "🔗",
      color: "accent"
    },
    {
      title: "Voice Shopping",
      description: "Post requests and browse offers using voice commands for hands-free shopping experience",
      icon: "🎤",
      color: "primary"
    },
    {
      title: "Group Buying Power",
      description: "Combine requests with other buyers to unlock bulk discounts and special offers",
      icon: "👥",
      color: "secondary"
    },
    {
      title: "Global Expansion",
      description: "Localized versions of BestzDeal for international markets with region-specific features",
      icon: "🌎",
      color: "accent"
    }
  ];

  return (
    <div className={styles.futurePlanPage}>
      <div className={styles.futurePlanHeader} ref={headerRef}>
        <h1 className="future-title">Future <span className="gradient-text">Roadmap</span></h1>
        <p className="future-subtitle">Our vision and development plan for BestzDeal's evolution</p>
      </div>

      <section className={styles.timelineSection} ref={timelineRef}>
        <div className="container">
          <div className={styles.timelineContainer}>
            <motion.div
              className={styles.timelineLine}
              style={{ height: timelineHeight }}
            />

            {phases.map((phase, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`${styles.timelinePoint} ${styles[phase.color]}`}>
                  <span>{index + 1}</span>
                </div>

                <div className={`${styles.timelineContent} ${index % 2 === 0 ? styles.left : styles.right}`}>
                  <FuturisticCard className={styles.phaseCard} glowColor={phase.color}>
                    <div className={styles.phaseHeader}>
                      <div>
                        <h2>{phase.title}</h2>
                        <p className={styles.phaseTimeline}>{phase.timeline}</p>
                      </div>
                      <div className={`${styles.phaseStatus} ${styles[phase.status.toLowerCase()]}`}>
                        {phase.status}
                      </div>
                    </div>

                    <p className={styles.phaseDescription}>{phase.description}</p>

                    <div className={styles.phaseFeatures}>
                      <h3>Key Features:</h3>
                      <ul>
                        {phase.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.phaseImage}>
                      <Image
                        src={phase.image}
                        alt={phase.title}
                        width={300}
                        height={200}
                      />
                    </div>
                  </FuturisticCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.futureFeaturesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Future <span className="gradient-text">Innovations</span></h2>
            <p>Exciting features on our long-term roadmap</p>
          </div>

          <div className={styles.featuresGrid}>
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FuturisticCard className={styles.featureCard} glowColor={feature.color}>
                  <div className={`${styles.featureIcon} ${styles[feature.color]}`}>
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </FuturisticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.visionSection}>
        <div className="container">
          <FuturisticCard className={styles.visionCard} interactive={false}>
            <div className={styles.visionContent}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our <span className="gradient-text">Vision</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={styles.visionText}
              >
                At BestzDeal, we envision a future where shopping is effortless, transparent, and truly buyer-centric. We're building a platform that not only saves time and money but also creates meaningful connections between consumers and businesses.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={styles.visionText}
              >
                Our goal is to become the world's leading reverse marketplace, revolutionizing how people shop online and empowering small businesses to thrive in the digital economy.
              </motion.p>

              <motion.div
                className={styles.visionCta}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <FuturisticButton href="/signup" size="large">
                  Join Our Journey
                </FuturisticButton>
              </motion.div>
            </div>
          </FuturisticCard>
        </div>
      </section>
    </div>
  );
}
