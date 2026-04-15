import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { getNewsLocalized } from '@/lib/api';
import styles from '../../gallery.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function News({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, news] = await Promise.all([
    getTranslations('news'),
    getNewsLocalized(locale),
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          {t('breadcrumbHome')} / <span>{t('breadcrumbNews')}</span>
        </div>
        <h1 className={styles.title}>{t('title')}</h1>
      </header>

      <div className={styles.grid}>
        {news.length === 0 ? (
          <p style={{ marginTop: '2rem' }}>{t('empty')}</p>
        ) : (
          news.map((item) => (
            <article key={item.slug} className={styles.productCard}>
              {item.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.productImage}
                  />
                </div>
              )}
              <div
                className={styles.productInfo}
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}
              >
                <span className={styles.productName}>{item.title}</span>
                {item.date && (
                  <time style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
                    {new Date(item.date).toLocaleDateString(
                      locale === 'en' ? 'en-GB' : 'es-ES',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </time>
                )}
                <div style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <Markdown>{item.body}</Markdown>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
