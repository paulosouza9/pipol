"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = () => {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const currentLocale = (params.locale as string) ?? 'es';

    const switchLocale = (locale: string) => {
        router.replace(pathname, { locale });
    };

    return (
        <nav className={`${styles.nav} ${pathname === '/contact' ? styles.transparentNav : ''}`}>
            <div className={styles.topBar}>
                <Link href="/" className={styles.logo}>
                    <Image src="/images/logo.png" alt="Pipol" width={300} height={100} priority style={{ objectFit: 'contain' }} />
                </Link>
                <div className={styles.topBarRight}>
                    <div className={styles.localeSwitcher}>
                        <button
                            onClick={() => switchLocale('es')}
                            className={`${styles.localeBtn} ${currentLocale === 'es' ? styles.localeBtnActive : ''}`}
                        >
                            ES
                        </button>
                        <span className={styles.localeDivider}>|</span>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`${styles.localeBtn} ${currentLocale === 'en' ? styles.localeBtnActive : ''}`}
                        >
                            EN
                        </button>
                    </div>
                    <Link href="/contact" className={styles.contactBtn}>
                        {t('contact')}
                    </Link>
                </div>
            </div>
            <div className={styles.links}>
                <Link
                    href="/news"
                    className={`${styles.link} ${pathname === '/news' ? styles.activeLink : ''}`}
                >
                    {t('news')}
                </Link>
                <Link
                    href="/gallery"
                    className={`${styles.link} ${pathname === '/gallery' ? styles.activeLink : ''}`}
                >
                    {t('gallery')}
                </Link>
                <Link
                    href="/about"
                    className={`${styles.link} ${pathname === '/about' ? styles.activeLink : ''}`}
                >
                    {t('about')}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
