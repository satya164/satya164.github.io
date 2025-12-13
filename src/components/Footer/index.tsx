import Link from 'next/link';

import metadata from '../../metadata.json';
import styles from './styles.module.css';

export function Footer() {
  return (
    <div className={styles.container}>
      <footer>
        Copyright © {new Date().getFullYear()}{' '}
        <Link href="/about">{metadata.author.name}</Link>. All rights reserved.
      </footer>
    </div>
  );
}
