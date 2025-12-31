import React from 'react';
import styles from '../SocialConnect.module.css';

// Import underline image
import underlineStroke from '../../assets/Vector76.svg';

// Import logo images
import client1Logo from '../../assets/logos/Client 1.png';
import client3Logo from '../../assets/logos/Client 3.png';
import client4Logo from '../../assets/logos/Client 4.png';
import client5Logo from '../../assets/logos/Client 5.png';
import client7Logo from '../../assets/logos/Client 7.png';
import client8Logo from '../../assets/logos/Client 8.png';

const SocialConnectCard1 = () => {
  // Top row logos
  const topLogos = [
    { id: 't1', name: 'Client 1', logo: client1Logo },
    { id: 't2', name: 'Client 2', logo: null, placeholder: 'Client 2' },
    { id: 't3', name: 'Client 3', logo: client3Logo },
    { id: 't4', name: 'Client 4', logo: client4Logo },
    { id: 't5', name: 'Client 5', logo: client5Logo },
  ];

  // Bottom row logos
  const bottomLogos = [
    { id: 'b1', name: 'Client 7', logo: client7Logo },
    { id: 'b2', name: 'Client 8', logo: client8Logo },
    { id: 'b3', name: 'Client 9', logo: null, placeholder: 'Client 9' },
  ];

  return (
    <section className={styles.container}>
      {/* Decorative leaf elements */}
      <span className={`${styles.decorativeLeaf} ${styles.topRight}`}>🍃</span>
      <span className={`${styles.decorativeLeaf} ${styles.bottomLeft}`}>🍃</span>

      <div className={styles.content}>
        <div className={styles.headingBlock}>
          <h1 className={styles.heading}>
            <span className={styles.line1}>get socially connected like</span>
            <img 
              src={underlineStroke} 
              alt="" 
              className={styles.underlineImage}
            />
            <span className={styles.line2}>never before</span>
          </h1>
        </div>

        <p className={styles.description}>
          Through integrated digital marketing, email campaigns, and ad strategies, 
          we help you grow your brand's voice across platforms.
        </p>

        <p className={styles.accent}>digital marketing</p>

        {/* Carousel Section */}
        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {topLogos.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.logoCard} ${styles.topCard}`}
                style={{ '--index': index, '--total': topLogos.length }}
              >
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className={styles.logoImage} />
                ) : (
                  <span className={styles.logoPlaceholder}>{item.placeholder || item.name}</span>
                )}
              </div>
            ))}

            {bottomLogos.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.logoCard} ${styles.bottomCard}`}
                style={{ '--index': index, '--total': bottomLogos.length }}
              >
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className={styles.logoImage} />
                ) : (
                  <span className={styles.logoPlaceholder}>{item.placeholder || item.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnectCard1;
