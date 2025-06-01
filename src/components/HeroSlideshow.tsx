'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/HeroSlideshow.module.css';

interface HeroSlideshowProps {
  images: string[];
  interval?: number; // seconds
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  images,
  interval = 5, // Default 5 seconds
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className={styles.slideshowContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
        >
          <Image
            src={image}
            alt={`Slideshow image ${index + 1}`}
            fill
            priority={index === 0} // Prioritize loading the first image
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
};

export default HeroSlideshow; 