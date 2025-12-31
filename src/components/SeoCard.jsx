import React from 'react';
import styles from './MiddleCards.module.css';

import groupIcon from '../assets/logos/Group Icon.png';
import seoIcon from '../assets/logos/Seo.png';
import statsIcon from '../assets/logos/Stats Icon.png';

export const SeoCard = () => {
  const features = [
    { icon: groupIcon, text: 'Drive consistent, high-quality organic traffic.' },
    { icon: seoIcon, text: "Boost your website's Google rankings and visibility." },
    { icon: statsIcon, text: 'Improve website conversions through rate optimization.' },
  ];

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>seo</h2>
      
      {/* Simple SEO Illustration */}
      <div className={styles.illustrationWrapper}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="url(#seo-grad)" stroke="#505FAA" strokeWidth="2"/>
          <text x="40" y="48" textAnchor="middle" fill="white" fontFamily="Caveat" fontSize="24" fontWeight="600">SEO</text>
          <defs>
            <linearGradient id="seo-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#505FAA"/>
              <stop offset="1" stopColor="#2C3C91"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Feature Cards */}
      <div className={styles.featureCarousel}>
        <div className={styles.featureTrack}>
          {[...features, ...features].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img src={feature.icon} alt="" />
              </div>
              <p className={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoCard;
