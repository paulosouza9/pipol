
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

                </div>
                <h1 className={styles.title}>Colección pipol</h1>
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
