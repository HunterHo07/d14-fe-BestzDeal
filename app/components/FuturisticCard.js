'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FuturisticCard.module.css';

const FuturisticCard = ({ 
  children, 
  className = '', 
  glowColor = 'primary',
  interactive = true,
  ...props 
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!interactive) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation based on mouse position
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -5;
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 5;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${styles[glowColor]} ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <div className={styles.cardGlow}></div>
      <div className={styles.cardBorder}></div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </motion.div>
  );
};

export default FuturisticCard;
