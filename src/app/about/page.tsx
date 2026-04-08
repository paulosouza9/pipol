import Image from "next/image";
import styles from "./about.module.css";

export default function About() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={`${styles.heroText} ${styles.animateIn} ${styles.delay1}`}>
          Pipol es una serie de esculturas minimalistas que exploran la{" "}
          <span>simplicidad</span>, el <span>equilibrio</span> y la{" "}
          <span>presencia</span>.
        </h1>
      </section>

      {/* Split Section */}
      <section className={styles.splitSection}>
        <div className={`${styles.imageWrapper} ${styles.animateIn} ${styles.delay2}`}>
          <Image
            src="/images/pipol1.jpg"
            alt="Detalle escultura Pipol"
            fill
            className={styles.image}
          />
        </div>
        <div className={`${styles.splitText} ${styles.animateIn} ${styles.delay3}`}>
          <p>
            Nacidas a partir de un objeto cotidiano, las figuras anónimas y de
            cabeza cuadrada funcionan como símbolos de una manera directa y sin
            ruido de estar en el mundo.
          </p>
        </div>
      </section>

      {/* Statement Section */}
      <section className={styles.statementSection}>
        <h2 className={`${styles.finalStatement} ${styles.animateIn} ${styles.delay1}`}>
          Entre lo artesanal y lo industrial, Pipol reivindica la belleza de
          lo simple y la importancia del <span>gesto</span>.
        </h2>
        <div className={`${styles.statementImageWrapper} ${styles.animateIn} ${styles.delay2}`}>
          <Image
            src="/images/pipol4.jpg"
            alt="Ambiente Pipol"
            fill
            className={styles.image}
          />
        </div>
      </section>
    </main>
  );
}
