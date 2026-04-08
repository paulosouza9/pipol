"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./HeroCarousel.module.css";

const IMAGES = [
  { src: "/images/pipol1.jpg", alt: "Escultura 1" },
  { src: "/images/pipol2.jpg", alt: "Escultura 2" },
  { src: "/images/pipol3.jpg", alt: "Escultura 3" },
  { src: "/images/pipol4.jpg", alt: "Escultura 4" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      {IMAGES.map((img, index) => (
        <div
          key={img.src}
          className={`${styles.imageContainer} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={1000}
            height={1200}
            style={{ width: "100%", height: "auto" }}
            priority={index === 0}
          />
        </div>
      ))}
      <div className={styles.indicators}>
        {IMAGES.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
