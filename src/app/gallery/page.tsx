
import Image from "next/image";
import Link from "next/link";
import styles from "../gallery.module.css";
import { getProducts } from "@/lib/api";

export default function Gallery() {
    const products = getProducts();
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    Home / Hombre / <span>pipol</span>
                </div>
                <h1 className={styles.title}>Colección pipol</h1>

                <div className={styles.controls}>
                    <button className={styles.filterBtn}>
                        Todos los filtros
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="21" x2="4" y2="14"></line>
                            <line x1="4" y1="10" x2="4" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12" y2="3"></line>
                            <line x1="20" y1="21" x2="20" y2="16"></line>
                            <line x1="20" y1="12" x2="20" y2="3"></line>
                            <line x1="1" y1="14" x2="7" y2="14"></line>
                            <line x1="9" y1="8" x2="15" y2="8"></line>
                            <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                    </button>

                    <button className={styles.sortBtn}>
                        Ordenar por
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
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
                            <div className={styles.wishlistIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
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
