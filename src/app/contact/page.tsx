import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.main}>

      {/* Abstract background shapes */}
      <div className={styles.bgCircle1} />
      <div className={styles.bgCircle2} />
      <div className={styles.bgLine} />

      {/* Top eyebrow */}
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <span className={styles.eyebrowText}>Contacto</span>
        <span className={styles.eyebrowLine} />
      </div>

      {/* Hero headline */}
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          <span className={styles.headlineLight}>Hablemos</span>
          <span className={styles.headlineBold}>de arte.</span>
        </h1>
        <p className={styles.tagline}>
          Cada escultura nace de una conversación.
        </p>
      </section>

      {/* Contact info strip */}
      <section className={styles.contactStrip}>
        <a href="mailto:info@pipolart.com" className={styles.contactLink}>
          <span className={styles.contactLabel}>Email</span>
          <span className={styles.contactValue}>info@pipolart.com</span>
          <span className={styles.arrow}>↗</span>
        </a>
        <div className={styles.divider} />
        <a href="tel:+34634792860" className={styles.contactLink}>
          <span className={styles.contactLabel}>Teléfono</span>
          <span className={styles.contactValue}>+34 634 792 860</span>
          <span className={styles.arrow}>↗</span>
        </a>
        <div className={styles.divider} />
        <a href="https://www.instagram.com/pipol______/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
          <span className={styles.contactLabel}>Instagram</span>
          <span className={styles.contactValue}>@pipol______</span>
          <span className={styles.arrow}>↗</span>
        </a>
      </section>

      {/* Map section */}
      <section className={styles.mapSection}>
        <div className={styles.mapLabel}>
          <span>Encuéntranos</span>
        </div>
        <div className={styles.mapFrame}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0739385024167!2d1.3818675766483366!3d38.899424471723535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1299460b3d1fdbe9%3A0xd921b8adf61a4f5e!2sDE%20MOTA%20.!5e0!3m2!1ses!2ses!4v1775583934119!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Footer bar */}
      <div className={styles.footerBar}>
        <span>pipol — Arte contemporáneo</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

    </main>
  );
}
