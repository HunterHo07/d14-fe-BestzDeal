'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import FuturisticButton from '../components/FuturisticButton';
import FuturisticCard from '../components/FuturisticCard';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userRequest, setUserRequest] = useState(null);
  const [sellerResponses, setSellerResponses] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [demoMode, setDemoMode] = useState('guided'); // 'guided' or 'interactive'
  const demoRef = useRef(null);

  const steps = [
    {
      title: "Post Your Request",
      description: "Describe what you want to buy, set your budget, and specify your location preferences.",
      image: "/d14-fe-BestzDeal/images/demo-step1.svg",
      color: "primary"
    },
    {
      title: "Sellers Respond",
      description: "Verified local and online sellers compete to offer you their best deals.",
      image: "/d14-fe-BestzDeal/images/demo-step2.svg",
      color: "secondary"
    },
    {
      title: "Compare Offers",
      description: "Review all offers based on price, seller ratings, and delivery options.",
      image: "/d14-fe-BestzDeal/images/demo-step3.svg",
      color: "accent"
    },
    {
      title: "Choose & Complete",
      description: "Select the best deal and finalize your purchase directly with the seller.",
      image: "/d14-fe-BestzDeal/images/demo-step4.svg",
      color: "primary"
    }
  ];

  useEffect(() => {
    // Initialize GSAP animations
    gsap.fromTo('.demo-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.demo-subtitle',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    gsap.fromTo('.demo-controls',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      }
    );

    // Check if user has created a demo request
    const checkForUserRequest = () => {
      try {
        const requests = JSON.parse(localStorage.getItem('bestzDealRequests') || '[]');
        if (requests.length > 0) {
          setUserRequest(requests[requests.length - 1]);
          setDemoMode('interactive');

          // Generate seller responses after a delay
          setTimeout(() => {
            const mockResponses = [
              {
                id: Date.now() + 1,
                sellerId: 'seller1',
                sellerName: 'TechHaven',
                rating: 4.8,
                price: userRequest ? `$${Math.floor(Math.random() * 300) + 900}` : '$1,149',
                deliveryTime: '2-3 days',
                description: `Great deal on ${userRequest ? userRequest.productName : 'this product'}!`,
                createdAt: new Date().toISOString()
              },
              {
                id: Date.now() + 2,
                sellerId: 'seller2',
                sellerName: 'GamersDepot',
                rating: 4.2,
                price: userRequest ? `$${Math.floor(Math.random() * 200) + 850}` : '$1,099',
                deliveryTime: '3-5 days',
                description: `Best price for ${userRequest ? userRequest.productName : 'this product'} in town!`,
                createdAt: new Date(Date.now() + 60000).toISOString()
              },
              {
                id: Date.now() + 3,
                sellerId: 'seller3',
                sellerName: 'MegaComputers',
                rating: 4.9,
                price: userRequest ? `$${Math.floor(Math.random() * 400) + 950}` : '$1,189',
                deliveryTime: '1-2 days',
                description: `Premium ${userRequest ? userRequest.productName : 'product'} with warranty!`,
                createdAt: new Date(Date.now() + 120000).toISOString()
              }
            ];

            setSellerResponses(mockResponses);
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking for user request:', error);
      }
    };

    checkForUserRequest();
  }, [userRequest]);

  const nextStep = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 500);
  };

  const prevStep = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };

  const goToStep = (index) => {
    if (isAnimating || index === currentStep) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setIsAnimating(false);
    }, 500);
  };

  const selectOffer = (offer) => {
    setSelectedOffer(offer);

    // Store the selection in localStorage
    try {
      const transactions = JSON.parse(localStorage.getItem('bestzDealTransactions') || '[]');
      transactions.push({
        id: Date.now(),
        requestId: userRequest?.id,
        offerId: offer.id,
        sellerName: offer.sellerName,
        price: offer.price,
        status: 'completed',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('bestzDealTransactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
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
    <div className={styles.demoPage}>
      <div className={styles.demoHeader}>
        <h1 className="demo-title">See How BestzDeal Works</h1>
        <p className="demo-subtitle">A step-by-step guide to finding the best deals on anything you want to buy</p>

        {demoMode === 'interactive' && userRequest && (
          <div className={styles.demoModeSwitch}>
            <button
              className={`${styles.demoModeButton} ${demoMode === 'guided' ? styles.active : ''}`}
              onClick={() => setDemoMode('guided')}
            >
              Guided Demo
            </button>
            <button
              className={`${styles.demoModeButton} ${demoMode === 'interactive' ? styles.active : ''}`}
              onClick={() => setDemoMode('interactive')}
            >
              Interactive Demo
            </button>
          </div>
        )}
      </div>

      {demoMode === 'guided' ? (
        <div className={styles.demoContainer} ref={demoRef}>
          <div className={styles.demoControls + " demo-controls"}>
            <button
              className={styles.arrowButton}
              onClick={prevStep}
              aria-label="Previous step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.stepIndicators}>
              {steps.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.stepIndicator} ${currentStep === index ? styles.active : ''} ${styles[steps[index].color]}`}
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.arrowButton}
              onClick={nextStep}
              aria-label="Next step"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.demoContent}>
            <AnimatePresence initial={false} custom={currentStep}>
              <motion.div
                key={currentStep}
                custom={currentStep}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={styles.demoStep}
              >
                <div className={styles.demoStepContent}>
                  <div className={styles.demoStepInfo}>
                    <div className={`${styles.stepNumber} ${styles[steps[currentStep].color]}`}>
                      {currentStep + 1}
                    </div>
                    <h2>{steps[currentStep].title}</h2>
                    <p>{steps[currentStep].description}</p>

                    {userRequest ? (
                      <FuturisticButton
                        onClick={() => setDemoMode('interactive')}
                        variant={currentStep === steps.length - 1 ? "primary" : "secondary"}
                      >
                        {currentStep === steps.length - 1 ? "Try Your Demo" : "See Your Demo"}
                      </FuturisticButton>
                    ) : (
                      <FuturisticButton
                        href="/signup"
                        variant={currentStep === steps.length - 1 ? "primary" : "secondary"}
                      >
                        {currentStep === steps.length - 1 ? "Post Your Request" : "Next Step"}
                      </FuturisticButton>
                    )}
                  </div>

                  <div className={styles.demoStepImage}>
                    <Image
                      src={steps[currentStep].image}
                      alt={steps[currentStep].title}
                      width={500}
                      height={400}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className={styles.interactiveDemoContainer}>
          {userRequest && (
            <div className={styles.interactiveDemoSteps}>
              <div className={styles.interactiveStep}>
                <div className={styles.interactiveStepHeader}>
                  <div className={`${styles.stepNumber} ${styles.primary}`}>1</div>
                  <h2>Your Request</h2>
                </div>

                <FuturisticCard className={styles.requestCard}>
                  <div className={styles.requestDetails}>
                    <h3>{userRequest.productName}</h3>
                    <div className={styles.requestInfo}>
                      <div className={styles.requestInfoItem}>
                        <span className={styles.requestInfoLabel}>Budget:</span>
                        <span className={styles.requestInfoValue}>{userRequest.budget}</span>
                      </div>
                      <div className={styles.requestInfoItem}>
                        <span className={styles.requestInfoLabel}>Location:</span>
                        <span className={styles.requestInfoValue}>{userRequest.location}</span>
                      </div>
                      <div className={styles.requestInfoItem}>
                        <span className={styles.requestInfoLabel}>Details:</span>
                        <span className={styles.requestInfoValue}>{userRequest.details}</span>
                      </div>
                      <div className={styles.requestInfoItem}>
                        <span className={styles.requestInfoLabel}>Status:</span>
                        <span className={`${styles.requestInfoValue} ${styles.statusActive}`}>Active</span>
                      </div>
                    </div>
                  </div>
                </FuturisticCard>
              </div>

              <div className={styles.interactiveStep}>
                <div className={styles.interactiveStepHeader}>
                  <div className={`${styles.stepNumber} ${styles.secondary}`}>2</div>
                  <h2>Seller Responses</h2>
                </div>

                {sellerResponses.length === 0 ? (
                  <div className={styles.loadingResponses}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Waiting for seller responses...</p>
                  </div>
                ) : (
                  <div className={styles.sellerResponses}>
                    {sellerResponses.map((response, index) => (
                      <FuturisticCard
                        key={index}
                        className={`${styles.sellerResponseCard} ${selectedOffer?.id === response.id ? styles.selectedOffer : ''}`}
                      >
                        <div className={styles.sellerResponseHeader}>
                          <div className={styles.sellerInfo}>
                            <h3>{response.sellerName}</h3>
                            <div className={styles.sellerRating}>
                              {Array(5).fill(0).map((_, i) => (
                                <span key={i} className={i < Math.floor(response.rating) ? styles.starFilled : styles.starEmpty}>★</span>
                              ))}
                              <span className={styles.ratingValue}>{response.rating}</span>
                            </div>
                          </div>
                          <div className={styles.offerPrice}>{response.price}</div>
                        </div>

                        <div className={styles.offerDetails}>
                          <div className={styles.offerDetailItem}>
                            <span className={styles.offerDetailLabel}>Delivery:</span>
                            <span className={styles.offerDetailValue}>{response.deliveryTime}</span>
                          </div>
                          <div className={styles.offerDetailItem}>
                            <span className={styles.offerDetailLabel}>Description:</span>
                            <span className={styles.offerDetailValue}>{response.description}</span>
                          </div>
                        </div>

                        {!selectedOffer ? (
                          <button
                            className={styles.selectOfferButton}
                            onClick={() => selectOffer(response)}
                          >
                            Select This Offer
                          </button>
                        ) : selectedOffer.id === response.id ? (
                          <div className={styles.selectedOfferBadge}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 8L7 12L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Selected Offer
                          </div>
                        ) : null}
                      </FuturisticCard>
                    ))}
                  </div>
                )}
              </div>

              {selectedOffer && (
                <div className={styles.interactiveStep}>
                  <div className={styles.interactiveStepHeader}>
                    <div className={`${styles.stepNumber} ${styles.accent}`}>3</div>
                    <h2>Transaction Complete</h2>
                  </div>

                  <FuturisticCard className={styles.transactionCard}>
                    <div className={styles.transactionSuccess}>
                      <div className={styles.transactionSuccessIcon}>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="30" cy="30" r="30" fill="#63FFDA" fillOpacity="0.2"/>
                          <path d="M20 30L27 37L40 24" stroke="#63FFDA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3>Deal Confirmed!</h3>
                      <p>You've successfully purchased {userRequest.productName} from {selectedOffer.sellerName} for {selectedOffer.price}.</p>

                      <div className={styles.transactionDetails}>
                        <div className={styles.transactionDetailItem}>
                          <span className={styles.transactionDetailLabel}>Seller:</span>
                          <span className={styles.transactionDetailValue}>{selectedOffer.sellerName}</span>
                        </div>
                        <div className={styles.transactionDetailItem}>
                          <span className={styles.transactionDetailLabel}>Price:</span>
                          <span className={styles.transactionDetailValue}>{selectedOffer.price}</span>
                        </div>
                        <div className={styles.transactionDetailItem}>
                          <span className={styles.transactionDetailLabel}>Delivery:</span>
                          <span className={styles.transactionDetailValue}>{selectedOffer.deliveryTime}</span>
                        </div>
                        <div className={styles.transactionDetailItem}>
                          <span className={styles.transactionDetailLabel}>Status:</span>
                          <span className={`${styles.transactionDetailValue} ${styles.statusCompleted}`}>Completed</span>
                        </div>
                      </div>

                      <div className={styles.transactionActions}>
                        <FuturisticButton href="/">
                          Back to Home
                        </FuturisticButton>
                      </div>
                    </div>
                  </FuturisticCard>
                </div>
              )}
            </div>
          )}
        </div>
      )}


      <div className={styles.demoExamples}>
        <h2>Real-World Examples</h2>

        <div className={styles.examplesGrid}>
          <FuturisticCard className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <div className={styles.exampleIcon}>💻</div>
              <h3>Electronics</h3>
            </div>
            <p className={styles.exampleRequest}>"Looking for a gaming laptop under $1200 with RTX 3060, 16GB RAM. Prefer local pickup in Seattle area."</p>
            <div className={styles.exampleResults}>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$1,149</span>
                <span className={styles.exampleSeller}>TechHaven</span>
                <span className={styles.exampleRating}>★★★★★</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$1,099</span>
                <span className={styles.exampleSeller}>GamersDepot</span>
                <span className={styles.exampleRating}>★★★★☆</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$1,189</span>
                <span className={styles.exampleSeller}>MegaComputers</span>
                <span className={styles.exampleRating}>★★★★★</span>
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <div className={styles.exampleIcon}>🛋️</div>
              <h3>Furniture</h3>
            </div>
            <p className={styles.exampleRequest}>"Need a mid-century modern sofa, preferably in blue or gray, budget $800-1000. Must deliver to Portland."</p>
            <div className={styles.exampleResults}>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$899</span>
                <span className={styles.exampleSeller}>ModernHome</span>
                <span className={styles.exampleRating}>★★★★☆</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$949</span>
                <span className={styles.exampleSeller}>UrbanLiving</span>
                <span className={styles.exampleRating}>★★★★★</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$799</span>
                <span className={styles.exampleSeller}>FurnitureOutlet</span>
                <span className={styles.exampleRating}>★★★☆☆</span>
              </div>
            </div>
          </FuturisticCard>

          <FuturisticCard className={styles.exampleCard}>
            <div className={styles.exampleHeader}>
              <div className={styles.exampleIcon}>📱</div>
              <h3>Smartphones</h3>
            </div>
            <p className={styles.exampleRequest}>"Want iPhone 13 Pro, 256GB, any color. Budget $800 max. Prefer unlocked. NYC area."</p>
            <div className={styles.exampleResults}>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$779</span>
                <span className={styles.exampleSeller}>PhoneWorld</span>
                <span className={styles.exampleRating}>★★★★☆</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$799</span>
                <span className={styles.exampleSeller}>AppleReseller</span>
                <span className={styles.exampleRating}>★★★★★</span>
              </div>
              <div className={styles.exampleResult}>
                <span className={styles.examplePrice}>$749</span>
                <span className={styles.exampleSeller}>MobileDeals</span>
                <span className={styles.exampleRating}>★★★☆☆</span>
              </div>
            </div>
          </FuturisticCard>
        </div>
      </div>

      <div className={styles.demoCta}>
        <FuturisticCard className={styles.ctaCard} interactive={false}>
          <h2>Ready to Find Your Best Deal?</h2>
          <p>Join thousands of smart shoppers who are saving time and money with BestzDeal.</p>
          <FuturisticButton href="/signup" size="large">
            Post Your Request Now
          </FuturisticButton>
        </FuturisticCard>
      </div>
    </div>
  );
}
