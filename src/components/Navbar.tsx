
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className={`${styles.nav} ${pathname === '/contact' ? styles.transparentNav : ''}`}>
            <div className={styles.topBar}>
                <Link href="/" className={styles.logo}>
                    <Image src="/images/logo.png" alt="Pipol" width={300} height={100} priority style={{ objectFit: 'contain' }} />
                </Link>
                <Link href="/contact" className={styles.contactBtn}>
                    Contacto
                </Link>
            </div>
            <div className={styles.links}>
                <Link
                    href="/news"
                    className={`${styles.link} ${pathname === '/news' ? styles.activeLink : ''} `}
                >
                    Novedades
                </Link>
                <Link
                    href="/gallery"
                    className={`${styles.link} ${pathname === '/gallery' ? styles.activeLink : ''} `}
                >
                    Galería
                </Link>
                <Link
                    href="/about"
                    className={`${styles.link} ${pathname === '/about' ? styles.activeLink : ''} `}
                >
                    Sobre nosotros
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

