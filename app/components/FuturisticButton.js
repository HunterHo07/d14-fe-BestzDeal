'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './FuturisticButton.module.css';

const FuturisticButton = ({
  href,
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const buttonElement = buttonRef.current;

    const updateMousePosition = (e) => {
      const rect = buttonElement.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    buttonElement.addEventListener('mousemove', updateMousePosition);

    return () => {
      buttonElement.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0 rgba(108, 99, 255, 0)'
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(108, 99, 255, 0.3)'
    },
    tap: {
      scale: 0.98,
      boxShadow: '0 5px 15px rgba(108, 99, 255, 0.2)'
    }
  };

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.2,
    },
    hover: {
      opacity: 0.7,
      scale: 1.5,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonContent = (
    <motion.span
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      ref={buttonRef}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {isHovered && (
        <motion.div
          className={styles.glow}
          variants={glowVariants}
          initial="initial"
          animate="hover"
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        />
      )}
      <span className={styles.border}></span>
      <span className={styles.content}>{children}</span>
    </motion.span>
  );

  return href ? (
    <Link href={href} className={styles.buttonLink}>
      {buttonContent}
    </Link>
  ) : buttonContent;
};

export default FuturisticButton;
