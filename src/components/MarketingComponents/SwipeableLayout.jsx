import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './SwipeableLayout.module.css';
import { InstagramIcon, FacebookIcon, GoogleAdsIcon, MetaIcon } from '../common/Icons';

// Import assets
import underlineStroke from '../../assets/Vector76.svg';
import emailMarketingLogo from '../../assets/logos/Email Marketing.png';

const SwipeableLayout = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const touchEndY = useRef(0);
  const touchEndX = useRef(0);
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const wheelDeltaAccumulatorRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const minSwipeDistance = 40; // Aligned with ServicesShowcase

  const goToNext = useCallback(() => {
    const now = Date.now();
    if (currentIndexRef.current < totalCards - 1 && !isTransitioningRef.current && (now - lastInteractionTimeRef.current > 800)) {
      isTransitioningRef.current = true;
      lastInteractionTimeRef.current = now;
      currentIndexRef.current += 1;
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }, 600);
    }
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    const now = Date.now();
    if (currentIndexRef.current > 0 && !isTransitioningRef.current && (now - lastInteractionTimeRef.current > 800)) {
      isTransitioningRef.current = true;
      lastInteractionTimeRef.current = now;
      currentIndexRef.current -= 1;
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }, 600);
    }
  }, []);

  const isLockedRef = useRef(false);

  useEffect(() => {
    const onScroll = (e) => {
      // Use ref to check lock state without re-running effect
      if (!isLockedRef.current) return;

      const now = Date.now();
      const isCoolingDown = (now - lastInteractionTimeRef.current) < 800;

      if (isTransitioningRef.current || isCoolingDown) {
        // While animating or cooling down, strictly block and discard
        if (e.cancelable) e.preventDefault();
        wheelDeltaAccumulatorRef.current = 0;
        return;
      }

      const currentIndex = currentIndexRef.current;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Handle Page Scroll Release at Boundaries (with a tiny threshold to prevent accidental jump)
      const atBottomBoundary = currentIndex === totalCards - 1 && isScrollingDown;
      const atTopBoundary = currentIndex === 0 && isScrollingUp;

      if (atBottomBoundary || atTopBoundary) {
        wheelDeltaAccumulatorRef.current = 0;
        return; // Allow page scroll
      }

      // If we are here, we are locked in and NOT in cooldown
      if (e.cancelable) e.preventDefault();

      // Accumulate wheel delta
      wheelDeltaAccumulatorRef.current += e.deltaY;

      // Higher threshold (50) for the initial "flick" to ensure intentionality
      if (Math.abs(wheelDeltaAccumulatorRef.current) >= 50) {
        if (wheelDeltaAccumulatorRef.current > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        wheelDeltaAccumulatorRef.current = 0; // Reset immediately after triggering
      }
    };

    window.addEventListener('wheel', onScroll, { passive: false });
    return () => window.removeEventListener('wheel', onScroll);
  }, [goToNext, goToPrev, totalCards]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasLocked = isLockedRef.current;
        isLockedRef.current = entry.isIntersecting;

        // Direction-aware entry: Set index if we just locked
        if (entry.isIntersecting && !wasLocked) {
          const rect = entry.boundingClientRect;

          // Re-set accumulator on entry
          wheelDeltaAccumulatorRef.current = 0;

          // If the element's top is < -50, it's entering from bottom
          if (rect.top < -50) {
            setCurrentIndex(totalCards - 1);
            currentIndexRef.current = totalCards - 1;
          } else {
            setCurrentIndex(0);
            currentIndexRef.current = 0;
          }
        }
      },
      {
        threshold: 0.8, // Slightly relaxed to work with margin
        rootMargin: "-5% 0px -5% 0px" // Creates a "sweet spot" to trigger lock
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [totalCards]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isLockedRef.current || isTransitioningRef.current) return;

    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = touchStartY.current - currentY;
    const deltaX = touchStartX.current - currentX;

    // Directional Locking: Mostly vertical swipe
    if (Math.abs(deltaY) < Math.abs(deltaX) || Math.abs(deltaY) < 5) return;

    const currentIndex = currentIndexRef.current;
    const isSwipingUp = deltaY > 0;
    const isSwipingDown = deltaY < 0;

    // Boundary Checks for Release
    const atBottomBoundary = currentIndex === totalCards - 1 && isSwipingUp;
    const atTopBoundary = currentIndex === 0 && isSwipingDown;

    if (!atBottomBoundary && !atTopBoundary) {
      if (e.cancelable) e.preventDefault();
    }

    touchEndY.current = currentY;
    touchEndX.current = currentX;
  }, [totalCards]);

  const handleTouchEnd = useCallback(() => {
    if (!isLockedRef.current || isTransitioningRef.current) return;

    const swipeDistance = touchStartY.current - touchEndY.current;
    const currentIndex = currentIndexRef.current;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex < totalCards - 1) {
        goToNext();
      } else if (swipeDistance < 0 && currentIndex > 0) {
        goToPrev();
      }
    }
    touchStartY.current = 0;
    touchEndY.current = 0;
  }, [goToNext, goToPrev, totalCards]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <section className={styles.pinnedWrapper}>
      <div
        className={styles.pinnedContainer}
        ref={containerRef}
      >
        <header className={styles.fixedHeader}>
          <div className={styles.headingBlock}>
            <h1 className={styles.heading}>
              <span className={styles.line1}>
                get socially connected like
                <svg className={styles.underlineImage} width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3" />
                </svg>
              </span>
              <span className={styles.line2}>never before</span>
            </h1>
          </div>
          <p className={styles.description}>
            Through integrated digital marketing, email campaigns, and ad strategies,
            we help you grow your brand's voice across platforms.
          </p>
        </header>

        <div className={styles.swipeArea}>
          <div className={styles.cardsWrapper}>
            {childrenArray.map((child, index) => {
              const offset = index - currentIndex;
              return (
                <div
                  key={index}
                  className={`${styles.card} ${offset === 0 ? styles.active : ''}`}
                  style={{
                    transform: `translateY(${offset * 100}%)`,
                    opacity: offset === 0 ? 1 : 0,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                >
                  {child}
                </div>
              );
            })}
          </div>

        </div>

        <footer className={styles.fixedFooter}>
          <div className={styles.footerLine}>
            <span className={styles.footerText}>we get you social on</span>
            <div className={styles.footerIcons}>
              <div className={styles.socialIcon}><InstagramIcon /></div>
              <div className={styles.socialIcon}><FacebookIcon /></div>
            </div>
          </div>
          <div className={styles.footerLine}>
            <span className={styles.footerText}>& promote you using</span>
            <div className={styles.footerIcons}>
              <div className={styles.toolIcon}><GoogleAdsIcon /></div>
              <div className={styles.toolIcon}><MetaIcon /></div>
              <div className={styles.toolIcon}>
                <img src={emailMarketingLogo} alt="Email Marketing" className={styles.footerIconImg} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default SwipeableLayout;
