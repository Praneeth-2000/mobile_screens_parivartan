import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './SwipeCards.module.css';

const SwipeCards = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  
  // Minimum swipe distance to trigger transition
  const minSwipeDistance = 50;
  
  const goToNext = useCallback(() => {
    if (currentIndex < totalCards - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [currentIndex, totalCards, isTransitioning]);
  
  const goToPrev = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [currentIndex, isTransitioning]);
  
  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped up - go to next
        goToNext();
      } else {
        // Swiped down - go to previous
        goToPrev();
      }
    }
    
    // Reset
    touchStartY.current = 0;
    touchEndY.current = 0;
  };
  
  // Mouse wheel handler
  const handleWheel = useCallback((e) => {
    if (isTransitioning) return;
    
    // Prevent default scroll
    e.preventDefault();
    
    if (e.deltaY > 0) {
      // Scrolling down - go to next
      goToNext();
    } else if (e.deltaY < 0) {
      // Scrolling up - go to previous
      goToPrev();
    }
  }, [goToNext, goToPrev, isTransitioning]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);
  
  // Wheel event with passive: false for preventing default
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);
  
  return (
    <div 
      className={styles.swipeContainer}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards Stack */}
      <div className={styles.cardsWrapper}>
        {childrenArray.map((child, index) => {
          const offset = index - currentIndex;
          
          return (
            <div
              key={index}
              className={`${styles.card} ${
                offset === 0 ? styles.active : ''
              } ${offset < 0 ? styles.previous : ''} ${
                offset > 0 ? styles.next : ''
              }`}
              style={{
                '--offset': offset,
                zIndex: totalCards - Math.abs(offset),
              }}
            >
              <div className={styles.cardContent}>
                {child}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation Dots */}
      <div className={styles.pagination}>
        {childrenArray.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 600);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <div className={styles.navArrows}>
        <button 
          className={`${styles.navArrow} ${styles.navUp} ${currentIndex === 0 ? styles.disabled : ''}`}
          onClick={goToPrev}
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <button 
          className={`${styles.navArrow} ${styles.navDown} ${currentIndex === totalCards - 1 ? styles.disabled : ''}`}
          onClick={goToNext}
          disabled={currentIndex === totalCards - 1}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      
      {/* Swipe Hint */}
      {currentIndex === 0 && (
        <div className={styles.swipeHint}>
          <span>Swipe up</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SwipeCards;
