'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <Logo size="medium" />
        </div>

        <div className={styles.mobileMenuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`${styles.menuBar} ${isMenuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.menuBar} ${isMenuOpen ? styles.open : ''}`}></div>
          <div className={`${styles.menuBar} ${isMenuOpen ? styles.open : ''}`}></div>
        </div>

        <motion.div
          className={styles.desktopMenu}
          variants={navVariants}
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/demo" className={styles.navLink}>Demo</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/pitch-deck" className={styles.navLink}>Pitch Deck</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/why-us" className={styles.navLink}>Why Us</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/future-plan" className={styles.navLink}>Future Plan</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/signup" className={styles.signupButton}>Post Your Request</Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.mobileMenu}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link href="/demo" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Demo</Link>
        <Link href="/pitch-deck" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Pitch Deck</Link>
        <Link href="/why-us" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Why Us</Link>
        <Link href="/future-plan" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Future Plan</Link>
        <Link href="/signup" className={styles.mobileSignupButton} onClick={() => setIsMenuOpen(false)}>Post Your Request</Link>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
