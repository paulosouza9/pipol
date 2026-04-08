import Image from "next/image";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <Image
          src="/images/pipol3.jpg"
          alt="Pipol Contact Background"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.glassCard} ${styles.animateIn}`}>
          <div className={styles.infoSection}>
            <h1 className={styles.title}>Contacta con nosotros.</h1>
            <p className={styles.subtitle}>

            </p>

            <div className={styles.contactDetails}>
              <div className={`${styles.contactItem} ${styles.delay1}`}>
                <span>Email</span>
                <a href="mailto:info@pipolart.com">info@pipolart.com</a>
              </div>
              <div className={`${styles.contactItem} ${styles.delay2}`}>
                <span>Teléfono</span>
                <a href="tel:+34634792860">+34 634 792 860</a>
              </div>
            </div>
          </div>

          <div className={`${styles.mapSection} ${styles.delay3}`}>
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0739385024167!2d1.3818675766483366!3d38.899424471723535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1299460b3d1fdbe9%3A0xd921b8adf61a4f5e!2sDE%20MOTA%20.!5e0!3m2!1ses!2ses!4v1775583934119!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
