'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import avatar from '../../assets/images/avatar-small.jpg';
import { SearchBar } from '../SearchBar';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './styles.module.css';

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        {pathname === '/' ? (
          <Link href="/about" className={clsx(styles.logo, styles.item)}>
            <Image src={avatar} alt="About" priority />
          </Link>
        ) : (
          <Link
            href="/"
            className={clsx(styles.item, styles.back)}
            aria-label="Posts"
          >
            <svg
              role="img"
              className={styles.icon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}
      </div>
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
      <div className={styles.right}>
        <Link href="/rss.xml" title="RSS" className={styles.item}>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </Link>
        <ThemeSwitcher className={styles.item} />
      </div>
    </nav>
  );
}
