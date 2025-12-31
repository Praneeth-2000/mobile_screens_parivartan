import React from 'react';
import styles from '../SocialConnect.module.css';
import style from '../SeoOptimized.module.css';

import groupIcon from '../../assets/logos/Group Icon.png';
import seoIcon from '../../assets/logos/Seo.png';
import statsIcon from '../../assets/logos/Stats Icon.png';

const SocialConnectCard2 = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        {/* SEO Illustration - minimal inline SVG */}
        <div className={style.illustrationSection}>
          <span className={style.seoLabel}>seo</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="104" height="111" viewBox="0 0 104 111" fill="none">
            <path d="M50.8474 110.901C78.9297 110.901 101.695 101.571 101.695 90.0624C101.695 78.5536 78.9297 69.2239 50.8474 69.2239C22.7652 69.2239 0 78.5536 0 90.0624C0 101.571 22.7652 110.901 50.8474 110.901Z" fill="url(#paint0_linear)"/>
            <defs>
              <linearGradient id="paint0_linear" x1="83.1775" y1="90.0624" x2="10.1792" y2="90.0624" gradientUnits="userSpaceOnUse">
                <stop stopColor="#505FAA"/>
                <stop offset="1" stopColor="#2C3C91"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Feature Grid - Auto-scrolling Carousel */}
        <div className={style.featureGrid}>
          <div className={style.carouselTrack}>
            {/* First set */}
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={groupIcon} alt="Group" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Drive consistent, <br /> high-quality organic traffic.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={seoIcon} alt="SEO" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Boost your website's <br /> Google rankings and visibility.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={statsIcon} alt="Stats" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Improve website <br /> conversions through rate optimization.
              </p>
            </div>

            {/* Second set for seamless loop */}
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={groupIcon} alt="Group" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Drive consistent, <br /> high-quality organic traffic.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={seoIcon} alt="SEO" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Boost your website's <br /> Google rankings and visibility.
              </p>
            </div>
            <div className={style.featureCard}>
              <div className={style.iconPlaceholder}><img src={statsIcon} alt="Stats" className={style.cardIcon} /></div>
              <p className={style.featureText}>
                Improve website <br /> conversions through rate optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnectCard2;
