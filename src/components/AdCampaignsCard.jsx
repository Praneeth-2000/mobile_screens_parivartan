import React from 'react';
import styles from './MiddleCards.module.css';

import adCampaignImg from '../assets/images/Ad campaign.png';
import groupIcon from '../assets/logos/Group Icon.png';
import rupeeIcon from '../assets/images/Rupee.png';
import filterIcon from '../assets/images/Filter.png';

export const AdCampaignsCard = () => {
  const features = [
    { icon: groupIcon, text: 'Reach the right audience with precisely targeted campaigns.' },
    { icon: rupeeIcon, text: 'Maximize ROI through data-driven ad strategy and optimization.' },
    { icon: filterIcon, text: 'Generate quality leads that convert into real customers.' },
  ];

  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.sectionTitle}>ad campaigns</h2>
      
      <div className={styles.illustrationWrapper}>
        <img src={adCampaignImg} alt="Ad Campaigns" className={styles.illustration} />
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

export default AdCampaignsCard;
