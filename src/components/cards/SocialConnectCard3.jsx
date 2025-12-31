import React from 'react';
import styles from '../SocialConnect.module.css';

import groupIcon from '../../assets/logos/Group Icon.png';
import rupeeIcon from '../../assets/images/Rupee.png';
import filterIcon from '../../assets/images/Filter.png';
import adCampaignImg from '../../assets/images/Ad campaign.png';

const SocialConnectCard3 = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {/* Ad Campaigns Section */}
        <div className={styles.adCampaignsSection}>
          <h2 className={styles.adCampaignsTitle}>ad campaigns</h2>
          
          {/* Illustration */}
          <div className={styles.adCampaignsIllustration}>
            <img src={adCampaignImg} alt="Ad Campaigns" className={styles.adCampaignImg} />
          </div>
          
          {/* Feature Cards Carousel */}
          <div className={styles.adCampaignsCarousel}>
            <div className={styles.adCampaignsTrack}>
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={groupIcon} alt="Group" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Reach the right audience with precisely targeted campaigns.
                    </p>
                  </div>
                  
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={rupeeIcon} alt="Rupee" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Maximize ROI through data-driven ad strategy and optimization.
                    </p>
                  </div>
                  
                  <div className={styles.adCampaignCard}>
                    <div className={styles.adCampaignIcon}>
                      <img src={filterIcon} alt="Filter" className={styles.adCampaignCardIcon} />
                    </div>
                    <p className={styles.adCampaignText}>
                      Generate quality leads that convert into real customers.
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

export default SocialConnectCard3;
