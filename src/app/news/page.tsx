import Image from "next/image";
import Markdown from "react-markdown";
import { getNews } from "@/lib/api";
import styles from "../gallery.module.css";

export default function News() {
    const news = getNews();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.breadcrumb}>
                    Home / <span>Novedades</span>
                </div>
                <h1 className={styles.title}>Novedades</h1>
            </header>

            <div className={styles.grid}>
                {news.length === 0 ? (
                    <p style={{ marginTop: "2rem" }}>Próximamente nuevas esculturas.</p>
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
                            <div className={styles.productInfo} style={{ flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
                                <span className={styles.productName}>{item.title}</span>
                                <time style={{ fontSize: "0.85rem", color: "var(--gray-dark)" }}>
                                    {new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                                <div style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
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
