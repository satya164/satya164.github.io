'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './styles.module.css';

const links = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/rss.xml', label: 'RSS' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.container}>
      {links.map(({ href, label }) => {
        return (
          <Link
            key={href}
            href={href}
            className={clsx(styles.item, pathname === href && styles.active)}
          >
            {label}
          </Link>
        );
      })}
      <ThemeSwitcher className={styles.item} />
    </nav>
  );
}
