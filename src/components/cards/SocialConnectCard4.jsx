import React from 'react';
import styles from '../SocialConnect.module.css';

import managementImg from '../../assets/images/Management.png';
import thumbIcon from '../../assets/images/Thumb.png';
import monitorIcon from '../../assets/images/Monitor.png';
import dealIcon from '../../assets/images/Deal.png';

const SocialConnectCard4 = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {/* Online Reputation Management Section */}
        <div className={styles.adCampaignsSection}>
          <h2 className={styles.adCampaignsTitle}>online reputation management</h2>
          
          {/* Illustration */}
          <div className={styles.adCampaignsIllustration}>
            <img src={managementImg} alt="Management" className={styles.adCampaignImg} />
          </div>
          
          {/* Feature Cards Carousel */}
          <div className={styles.adCampaignsCarousel}>
            <div className={styles.adCampaignsTrack}>
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={thumbIcon} alt="Thumb" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Build and maintain a positive brand image across digital platforms.
                    </p>
                  </div>
                  
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={monitorIcon} alt="Monitor" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Monitor reviews and feedback to protect your online reputation.
                    </p>
                  </div>
                  
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={dealIcon} alt="Deal" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Increase trust with authentic engagement and timely responses.
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnectCard4;
