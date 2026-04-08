import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import styles from "./product.module.css";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.breadcrumb} ${styles.animateIn}`}>
          <Link href="/">Home</Link> / <Link href="/gallery">Galería</Link> / <span className={styles.activeBreadcrumb}>{product.name}</span>
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
              <p>{product.description}</p>
            </div>

            <div className={`${styles.actions} ${styles.animateIn} ${styles.delay4}`}>
              <Link href="/contact" className={styles.secondaryBtn}>
                Consultar pieza
              </Link>
            </div>
            
            <div className={`${styles.details} ${styles.animateIn} ${styles.delay5}`}>
              <h3>Detalles técnicos</h3>
              <ul>
                <li><strong>Material:</strong> <span>{product.details.material}</span></li>
                <li><strong>Acabado:</strong> <span>{product.details.finish}</span></li>
                <li><strong>Dimensiones:</strong> <span>{product.details.dimensions}</span></li>
                <li><strong>Autenticidad:</strong> <span>{product.details.authenticity}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
