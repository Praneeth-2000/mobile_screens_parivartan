import React from 'react';
import styles from './MiddleCards.module.css';

import managementImg from '../assets/images/Management.png';
import thumbIcon from '../assets/images/Thumb.png';
import monitorIcon from '../assets/images/Monitor.png';
import dealIcon from '../assets/images/Deal.png';

export const ReputationCard = () => {
  const features = [
    { icon: thumbIcon, text: 'Build and maintain a positive brand image across digital platforms.' },
    { icon: monitorIcon, text: 'Monitor reviews and feedback to protect your online reputation.' },
    { icon: dealIcon, text: 'Increase trust with authentic engagement and timely responses.' },
  ];

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>online reputation management</h2>
      
      <div className={styles.illustrationWrapper}>
        <img src={managementImg} alt="Reputation Management" className={styles.illustration} />
      </div>

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

export default ReputationCard;
