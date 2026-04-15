import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { getProducts, getProductByIdLocalized } from '@/lib/api';
import { Link } from '@/i18n/navigation';
import styles from '../../../product/[id]/product.module.css';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  const products = getProducts();
  return products.flatMap((product) =>
    ['es', 'en'].map((locale) => ({ locale, id: product.id }))
  );
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [t, product] = await Promise.all([
    getTranslations('product'),
    getProductByIdLocalized(id, locale),
  ]);

  if (!product) notFound();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.breadcrumb} ${styles.animateIn}`}>
          <Link href="/">{t('breadcrumbHome')}</Link> /{' '}
          <Link href="/gallery">{t('breadcrumbGallery')}</Link> /{' '}
          <span className={styles.activeBreadcrumb}>{product.name}</span>
        </div>

        <div className={styles.productLayout}>
          <div className={`${styles.imageSection} ${styles.animateIn} ${styles.delay1}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h1 className={`${styles.title} ${styles.animateIn} ${styles.delay2}`}>
              {product.name}
            </h1>

            <div className={`${styles.description} ${styles.animateIn} ${styles.delay3}`}>
              <Markdown>{product.description}</Markdown>
            </div>

            <div className={`${styles.actions} ${styles.animateIn} ${styles.delay4}`}>
              <Link href="/contact" className={styles.secondaryBtn}>
                {t('inquire')}
              </Link>
            </div>

            <div className={`${styles.details} ${styles.animateIn} ${styles.delay5}`}>
              <h3>{t('technicalDetails')}</h3>
              <ul>
                <li><strong>{t('material')}:</strong> <span>{product.details.material}</span></li>
                <li><strong>{t('finish')}:</strong> <span>{product.details.finish}</span></li>
                <li><strong>{t('dimensions')}:</strong> <span>{product.details.dimensions}</span></li>
                <li><strong>{t('authenticity')}:</strong> <span>{product.details.authenticity}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
