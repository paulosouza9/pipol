import styles from './Footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul className={styles.links}>
                <li>MAILING LIST</li>
                <li>TERMS</li>
                <li>FAQ</li>
                <li>MY ORDER</li>
                <li>DO NOT SELL MY PERSONAL INFORMATION</li>
            </ul>
            <div className={styles.brand}>
                <Image src="/images/logo.png" alt="Pipol" width={300} height={100} style={{ objectFit: 'contain' }} />
            </div>
        </footer>
    );
};

export default Footer;
