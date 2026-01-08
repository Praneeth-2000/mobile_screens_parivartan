import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ServicesShowcase.css';
import ExplorePopup from './ExplorePopup';
import andhraLogoV2 from '../../assets/images/andhra-logo-v2.png';
import sudhaLogoV2 from '../../assets/images/sudha-logo-v2.png';
import alley91LogoV2 from '../../assets/images/alley91-logo-v2.png';
import alley91Grid1V2 from '../../assets/images/alley91-grid-1-v2.png';
import alley91Grid2V2 from '../../assets/images/alley91-grid-2-v2.png';
import alley91Grid3V2 from '../../assets/images/alley91-grid-3-v2.png';
import alley91Grid4V2 from '../../assets/images/alley91-grid-4-v2.png';
import alley91Grid5V2 from '../../assets/images/alley91-grid-5-v2.png';
import alley91Grid6V2 from '../../assets/images/alley91-grid-6-v2.png';
import summerGreenLogoV2 from '../../assets/images/summer-green-logo-v2.png';
import summerGreenResortV2 from '../../assets/images/summer-green-resort-v2.png';
import sudhaBrochureV2 from '../../assets/images/sudha-brochure-v2.png';

const servicesData = [
    {
        id: 'branding',
        subtitle: 'corporate branding',
        images: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000',
            'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
        ],
        logo: andhraLogoV2,
        logoAlt: 'Andhra Canteen Logo',
        pill: 'in-store branding  •  print collateral  •  menu designs  •  website',
        type: 'gallery'
    },
    {
        id: 'sudha',
        subtitle: 'print, media, design',
        images: [
            sudhaBrochureV2,
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000',
            'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1000'
        ],
        logo: sudhaLogoV2,
        logoAlt: 'Sudha Analyticals Logo',
        pill: 'brochure  •  poster  •  leaflets  •  visiting card',
        type: 'gallery'
    },
    {
        id: 'photoshoot',
        subtitle: 'corporate photoshoot',
        images: [alley91Grid1V2, alley91Grid2V2, alley91Grid3V2, alley91Grid4V2, alley91Grid5V2, alley91Grid6V2],
        logo: alley91LogoV2,
        logoAlt: "Alley Photo shoot",
        pill: 'photography  •  event  •  branding',
        type: 'gallery'
    },
    {
        id: 'summer-green',
        subtitle: 'print, media, design',
        images: [
            summerGreenResortV2,
            'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000'
        ],
        logo: summerGreenLogoV2,
        logoAlt: 'Summer Green Resort Logo',
        pill: 'print  •  media  •  design',
        type: 'gallery'
    }
];

const ServicesShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [imageIndex, setImageIndex] = useState(0); // Track current image within service

    // Refs for state access inside event listeners
    const activeIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const sectionRef = useRef(null);
    const wheelDeltaAccumulatorRef = useRef(0);
    const lastInteractionTimeRef = useRef(0);

    // Touch tracking
    const touchStartY = useRef(0);
    const touchStartX = useRef(0);

    // Sync refs with state
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

    // Handlers for BUTTON navigation (cycle images within current service)
    const handleNext = useCallback(() => {
        if (isAnimatingRef.current) return;

        const currentService = servicesData[activeIndexRef.current];

        // Only cycle through images within the current service, don't switch cards
        if (currentService.images) {
            setImageIndex(prev => (prev + 1) % currentService.images.length);
        }
    }, []);

    const handlePrev = useCallback(() => {
        if (isAnimatingRef.current) return;

        const currentService = servicesData[activeIndexRef.current];

        // Only cycle through images within the current service, don't switch cards
        if (currentService.images) {
            setImageIndex(prev => {
                const newIndex = prev - 1;
                return newIndex < 0 ? currentService.images.length - 1 : newIndex;
            });
        }
    }, []);

    // Handlers for SCROLL/SWIPE navigation (switch between service cards)
    const handleNextService = useCallback(() => {
        const now = Date.now();
        if (isAnimatingRef.current || (now - lastInteractionTimeRef.current < 800)) return;
        if (activeIndexRef.current >= servicesData.length - 1) return;

        isAnimatingRef.current = true;
        lastInteractionTimeRef.current = now;
        activeIndexRef.current += 1; // Immediate update
        setDirection('up');
        setPrevIndex(activeIndexRef.current - 1);
        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
    }, []);

    const handlePrevService = useCallback(() => {
        const now = Date.now();
        if (isAnimatingRef.current || (now - lastInteractionTimeRef.current < 800)) return;
        if (activeIndexRef.current <= 0) return;

        isAnimatingRef.current = true;
        lastInteractionTimeRef.current = now;
        activeIndexRef.current -= 1; // Immediate update
        setDirection('down');
        setPrevIndex(activeIndexRef.current + 1);
        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
    }, []);

    // Animation reset timer
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
                isAnimatingRef.current = false;
                setDirection(null);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    // Reset image index when service changes (via scroll/swipe)
    useEffect(() => {
        setImageIndex(0);
    }, [activeIndex]);

    // Touch Start Handler (passive is fine here, we just need start coords)
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
    };

    const isLockedRef = useRef(false);

    // Intersection Observer for Locking
    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const wasLocked = isLockedRef.current;
                isLockedRef.current = entry.isIntersecting;

                // Direction-aware entry: Set index if we just locked
                if (entry.isIntersecting && !wasLocked) {
                    const rect = entry.boundingClientRect;

                    // Reset accumulator
                    wheelDeltaAccumulatorRef.current = 0;

                    // If the element's top is < -50, it's entering from bottom
                    if (rect.top < -50) {
                        const lastIndex = servicesData.length - 1;
                        setActiveIndex(lastIndex);
                        activeIndexRef.current = lastIndex;
                    } else {
                        setActiveIndex(0);
                        activeIndexRef.current = 0;
                    }
                }
            },
            {
                threshold: 0.8,
                rootMargin: "-5% 0px -5% 0px"
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Window level wheel listener
    useEffect(() => {
        const onScroll = (e) => {
            if (!isLockedRef.current) return;

            const now = Date.now();
            const isCoolingDown = (now - lastInteractionTimeRef.current) < 800;

            if (isAnimatingRef.current || isCoolingDown) {
                // While animating or cooling down, strictly block and discard
                if (e.cancelable) e.preventDefault();
                wheelDeltaAccumulatorRef.current = 0;
                return;
            }

            const currentIndex = activeIndexRef.current;
            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            // Handle Page Scroll Release at Boundaries (with a tiny threshold to prevent accidental jump)
            const atBottomBoundary = currentIndex === servicesData.length - 1 && isScrollingDown;
            const atTopBoundary = currentIndex === 0 && isScrollingUp;

            if (atBottomBoundary || atTopBoundary) {
                wheelDeltaAccumulatorRef.current = 0;
                return; // Let the page scroll naturally
            }

            // Lock and step
            if (e.cancelable) e.preventDefault();

            // Accumulate wheel delta
            wheelDeltaAccumulatorRef.current += e.deltaY;

            // Higher threshold (50) for the initial "flick" to ensure intentionality
            if (Math.abs(wheelDeltaAccumulatorRef.current) >= 50) {
                if (wheelDeltaAccumulatorRef.current > 0) {
                    handleNextService();
                } else {
                    handlePrevService();
                }
                wheelDeltaAccumulatorRef.current = 0; // Reset immediately after triggering
            }
        };

        window.addEventListener('wheel', onScroll, { passive: false });
        return () => window.removeEventListener('wheel', onScroll);
    }, [handleNextService, handlePrevService]);

    // Touch Move Handler for scroll locking
    const handleTouchMove = (e) => {
        if (!isLockedRef.current || isAnimatingRef.current) return;

        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const deltaY = touchStartY.current - touchY;
        const deltaX = touchStartX.current - touchX;

        // Directional Locking: Only care if mostly vertical swipe
        if (Math.abs(deltaY) < Math.abs(deltaX) || Math.abs(deltaY) < 5) return;

        const currentIndex = activeIndexRef.current;
        const isSwipingUp = deltaY > 0;
        const isSwipingDown = deltaY < 0;

        // Boundary Checks for Release
        const atBottomBoundary = currentIndex === servicesData.length - 1 && isSwipingUp;
        const atTopBoundary = currentIndex === 0 && isSwipingDown;

        if (!atBottomBoundary && !atTopBoundary) {
            if (e.cancelable) e.preventDefault();
        }
    };

    // Touch End Handler for triggering service change
    const handleTouchEnd = (e) => {
        if (!isLockedRef.current || isAnimatingRef.current) return;

        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;
        const currentIndex = activeIndexRef.current;

        if (Math.abs(deltaY) > 40) { // Minimum swipe distance
            if (deltaY > 0 && currentIndex < servicesData.length - 1) {
                handleNextService();
            } else if (deltaY < 0 && currentIndex > 0) {
                handlePrevService();
            }
        }
    };

    // The core logic for scroll locking and interaction (Legacy effect removed)
    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleNextService, handlePrevService]);

    const currentService = servicesData[activeIndex];
    const previousService = prevIndex !== null ? servicesData[prevIndex] : null;

    return (
        <section
            ref={sectionRef}
            className="services-showcase"
            onTouchStart={handleTouchStart}
        >
            <div className="services-header-fixed">
                <h2 className="services-title">
                    <span className="title-line">while delivering</span>
                    <span className="title-line highlighted">
                        outstanding branding
                        <svg className="header-underline" width="198" height="26" viewBox="0 0 198 26" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0.752181 24.3648C24.2033 10.7729 96.3954 -10.9965 197.555 10.6615" stroke="#73BF44" strokeWidth="3" />
                        </svg>
                    </span>
                </h2>
                <p className="services-description">
                    From corporate identity to presentation design, we ensure every visual tells your story with clarity and creativity.
                </p>
            </div>

            <div className="showcase-content-fixed">
                {/* Content Layer (Subtitle, Image, Pill) */}
                <div className={`service-content-wrapper ${isAnimating ? `animating-${direction}` : ''}`}>
                    {/* Previous Content (Exiting) */}
                    {isAnimating && previousService && (
                        <div className="content-layer exit">
                            <h3 className="service-subtitle">{previousService.subtitle}</h3>
                            <div className="featured-work-container">
                                <div className="work-image-wrapper">
                                    <img src={previousService.images[0]} alt={`${previousService.subtitle}`} className="featured-image" />
                                </div>
                                <div className={`logo-display-static ${previousService.id}-logo`}>
                                    {previousService.logo && (
                                        <img src={previousService.logo} alt={previousService.logoAlt || 'Client logo'} className="client-logo" />
                                    )}
                                </div>
                            </div>
                            <div className="services-pill-bar">
                                <p className="pill-content">{previousService.pill}</p>
                            </div>
                        </div>
                    )}

                    {/* Active Content (Entering/Stationary) */}
                    <div className={`content-layer ${isAnimating ? 'enter' : 'active'}`}>
                        <h3 className="service-subtitle">{currentService.subtitle}</h3>
                        <div className="featured-work-container">
                            <div className="work-image-wrapper">
                                <img src={currentService.images[imageIndex]} alt={`${currentService.subtitle} ${imageIndex + 1}`} className="featured-image" />
                            </div>
                            <div className="logo-carousel-static">
                                <button className="nav-arrow left" aria-label="Previous image" onClick={handlePrev}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <div className={`logo-display-static ${currentService.id}-logo`}>
                                    {currentService.logo && (
                                        <img
                                            src={currentService.logo}
                                            alt={currentService.logoAlt || 'Client logo'}
                                            className="client-logo"
                                        />
                                    )}
                                </div>

                                <button className="nav-arrow right" aria-label="Next image" onClick={handleNext}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                        <div className="services-pill-bar">
                            <p className="pill-content">{currentService.pill}</p>
                        </div>
                        <button className="explore-button" onClick={() => setShowPopup(true)}>explore</button>
                    </div>
                </div>
            </div>

            {showPopup && <ExplorePopup onClose={() => setShowPopup(false)} />}
        </section>
    );
};

export default ServicesShowcase;
