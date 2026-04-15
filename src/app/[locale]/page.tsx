import { setRequestLocale } from 'next-intl/server';
import HeroCarousel from '@/components/HeroCarousel';
import styles from '../home.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
