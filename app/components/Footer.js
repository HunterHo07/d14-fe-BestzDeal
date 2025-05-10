'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import Logo from './Logo';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <motion.div variants={itemVariants} className={styles.logoSection}>
            <div className={styles.footerLogo}>
              <Logo size="large" />
            </div>
            <p className={styles.tagline}>Where sellers compete for your business</p>
          </motion.div>
        </div>

        <div className={styles.footerSection}>
          <motion.h3 variants={itemVariants} className={styles.footerHeading}>Quick Links</motion.h3>
          <motion.ul variants={itemVariants} className={styles.footerLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/demo">Demo</Link></li>
            <li><Link href="/pitch-deck">Pitch Deck</Link></li>
            <li><Link href="/why-us">Why Us</Link></li>
            <li><Link href="/future-plan">Future Plan</Link></li>
          </motion.ul>
        </div>

        <div className={styles.footerSection}>
          <motion.h3 variants={itemVariants} className={styles.footerHeading}>For Buyers</motion.h3>
          <motion.ul variants={itemVariants} className={styles.footerLinks}>
            <li><Link href="/signup">Create Account</Link></li>
            <li><Link href="/#how-it-works">How It Works</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/#testimonials">Success Stories</Link></li>
          </motion.ul>
        </div>

        <div className={styles.footerSection}>
          <motion.h3 variants={itemVariants} className={styles.footerHeading}>For Sellers</motion.h3>
          <motion.ul variants={itemVariants} className={styles.footerLinks}>
            <li><Link href="/signup?type=seller">Seller Registration</Link></li>
            <li><Link href="/#seller-benefits">Benefits</Link></li>
            <li><Link href="/#pricing">Pricing</Link></li>
            <li><Link href="/#seller-faq">Seller FAQ</Link></li>
          </motion.ul>
        </div>
      </div>

      <motion.div
        className={styles.footerBottom}
        variants={itemVariants}
      >
        <p>&copy; {new Date().getFullYear()} BestzDeal. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
