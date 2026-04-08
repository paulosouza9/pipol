import styles from "../gallery.module.css";

export default function News() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Novedades</h1>
            <p>Próximamente nuevas esculturas.</p>
        </div>
    );
}
