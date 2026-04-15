import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getProductsLocalized } from '@/lib/api';
import styles from '../../gallery.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, products] = await Promise.all([
    getTranslations('gallery'),
    getProductsLocalized(locale),
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.breadcrumb} />
        <h1 className={styles.title}>{t('title')}</h1>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <span className={styles.productName}>{product.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
