import HeroCarousel from "@/components/HeroCarousel";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.galleryContainer}>
        <div className={styles.heroContainer}>
          <HeroCarousel />
        </div>
      </div>
    </main>
  );
}
//asdd