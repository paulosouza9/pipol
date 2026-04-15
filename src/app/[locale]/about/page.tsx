import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import styles from '../../about/about.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={`${styles.heroText} ${styles.animateIn} ${styles.delay1}`}>
          {t.rich('heroText', {
            bold1: (chunks) => <span>{chunks}</span>,
            bold2: (chunks) => <span>{chunks}</span>,
            bold3: (chunks) => <span>{chunks}</span>,
          })}
        </h1>
      </section>

      <section className={styles.splitSection}>
        <div className={`${styles.imageWrapper} ${styles.animateIn} ${styles.delay2}`}>
          <Image
            src="/images/pipol1.jpg"
            alt={t('imageAlt1')}
            fill
            className={styles.image}
          />
        </div>
        <div className={`${styles.splitText} ${styles.animateIn} ${styles.delay3}`}>
          <p>{t('splitText')}</p>
        </div>
      </section>

      <section className={styles.statementSection}>
        <h2 className={`${styles.finalStatement} ${styles.animateIn} ${styles.delay1}`}>
          {t.rich('statement', {
            bold: (chunks) => <span>{chunks}</span>,
          })}
        </h2>
        <div className={`${styles.statementImageWrapper} ${styles.animateIn} ${styles.delay2}`}>
          <Image
            src="/images/pipol4.jpg"
            alt={t('imageAlt2')}
            fill
            className={styles.image}
          />
        </div>
      </section>
    </main>
  );
}
