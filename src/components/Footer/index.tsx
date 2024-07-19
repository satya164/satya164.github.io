import Link from 'next/link';
import styles from './styles.module.css';

export function Footer() {
  return (
    <div className={styles.container}>
      <footer>
        Copyright © {new Date().getFullYear()}{' '}
        <Link href="/about">Satyajit Sahoo</Link>. All rights reserved.
      </footer>
    </div>
  );
}
