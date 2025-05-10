'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import FuturisticButton from '../components/FuturisticButton';
import FuturisticCard from '../components/FuturisticCard';

function SignupForm() {
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState(searchParams.get('type') || 'buyer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    productInterest: '',
    agreeTerms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.signup-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.signup-subtitle',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    gsap.fromTo('.signup-tabs',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      }
    );

    gsap.fromTo('.signup-form',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.productInterest.trim()) {
      errors.productInterest = 'Product interest is required';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage (for demo purposes)
      const userData = {
        ...formData,
        userType,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('bestzDealUser', JSON.stringify(userData));

      // Also store a demo request if user is a buyer
      if (userType === 'buyer') {
        const demoRequest = {
          id: Date.now(),
          userId: userData.id,
          productName: formData.productInterest,
          budget: userType === 'buyer' ? '$500-$1500' : null,
          location: formData.location,
          details: `Looking for the best deal on ${formData.productInterest}`,
          createdAt: new Date().toISOString(),
          status: 'active'
        };

        const existingRequests = JSON.parse(localStorage.getItem('bestzDealRequests') || '[]');
        existingRequests.push(demoRequest);
        localStorage.setItem('bestzDealRequests', JSON.stringify(existingRequests));
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        location: '',
        productInterest: '',
        agreeTerms: false
      });
    }, 1500);
  };

  const benefits = {
    buyer: [
      {
        title: "Save Time",
        description: "No more endless searching across multiple sites",
        icon: "⏱️"
      },
      {
        title: "Get Better Deals",
        description: "Sellers compete to offer you their best prices",
        icon: "💰"
      },
      {
        title: "Discover Local Shops",
        description: "Connect with nearby businesses you might have missed",
        icon: "🏪"
      }
    ],
    seller: [
      {
        title: "Qualified Leads",
        description: "Connect with buyers actively looking for your products",
        icon: "🎯"
      },
      {
        title: "Reduced Marketing Costs",
        description: "No need for expensive ads to reach potential customers",
        icon: "📊"
      },
      {
        title: "Competitive Edge",
        description: "Stand out based on your unique offerings and service",
        icon: "🏆"
      }
    ]
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupHeader}>
        <h1 className="signup-title">Join <span className="gradient-text">BestzDeal</span></h1>
        <p className="signup-subtitle">Create your account and start {userType === 'buyer' ? 'finding the best deals' : 'connecting with buyers'}</p>
      </div>

      <div className={styles.signupContainer}>
        <div className={`${styles.signupTabs} signup-tabs`}>
          <button
            className={`${styles.signupTab} ${userType === 'buyer' ? styles.active : ''}`}
            onClick={() => setUserType('buyer')}
          >
            I'm a Buyer
          </button>
          <button
            className={`${styles.signupTab} ${userType === 'seller' ? styles.active : ''}`}
            onClick={() => setUserType('seller')}
          >
            I'm a Seller
          </button>
        </div>

        <div className={styles.signupContent}>
          <FuturisticCard className={styles.signupFormCard}>
            {isSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="30" fill="#63FFDA" fillOpacity="0.2"/>
                    <path d="M20 30L27 37L40 24" stroke="#63FFDA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2>Registration Successful!</h2>
                <p>Thank you for joining BestzDeal. Your demo account has been created successfully.</p>
                <div className={styles.successActions}>
                  <FuturisticButton href="/demo" size="large">
                    Try the Demo Now
                  </FuturisticButton>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="signup-form">
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? styles.inputError : ''}
                  />
                  {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? styles.inputError : ''}
                  />
                  {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="productInterest">What are you looking for?</label>
                  <input
                    type="text"
                    id="productInterest"
                    name="productInterest"
                    placeholder={userType === 'buyer' ? "e.g., Gaming Laptop, 4K TV, Smartphone" : "e.g., Electronics, Furniture, Clothing"}
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    className={formErrors.productInterest ? styles.inputError : ''}
                  />
                  {formErrors.productInterest && <span className={styles.errorMessage}>{formErrors.productInterest}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location">Location (City, State)</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={formErrors.location ? styles.inputError : ''}
                  />
                  {formErrors.location && <span className={styles.errorMessage}>{formErrors.location}</span>}
                </div>

                <div className={styles.formGroup}>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="agreeTerms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                  </div>
                  {formErrors.agreeTerms && <span className={styles.errorMessage}>{formErrors.agreeTerms}</span>}
                </div>

                <div className={styles.formActions}>
                  <FuturisticButton type="submit" size="large" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </FuturisticButton>
                </div>

                <div className={styles.loginLink}>
                  This is a demo - no real account is created
                </div>
              </form>
            )}
          </FuturisticCard>

          <div className={styles.benefitsContainer}>
            <h2>{userType === 'buyer' ? 'Buyer Benefits' : 'Seller Benefits'}</h2>

            <div className={styles.benefitsList}>
              {benefits[userType].map((benefit, index) => (
                <motion.div
                  key={index}
                  className={styles.benefitItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <div className={styles.benefitContent}>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.earlyAccessBadge}>
              <div className={styles.badgeIcon}>🚀</div>
              <div className={styles.badgeContent}>
                <h3>Early Access Perks</h3>
                <p>Join now and get premium features free for 3 months!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
