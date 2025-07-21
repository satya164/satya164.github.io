'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import metadata from '../../metadata.json';
import styles from './styles.module.css';

export function SocialLinks() {
  const [title, setTitle] = useState<string | undefined>();
  const pathname = usePathname();

  useEffect(() => {
    const title = document.title.split(' · ')[0];

    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setTitle(title);
  }, []);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;

  return (
    <ul className={styles.social}>
      <li>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            title ?? metadata.title
          )}&url=${encodeURIComponent(url)}&via=${metadata.author.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
      </li>
      <li>
        <a
          href={`https://x.com/search?q=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on X
        </a>
      </li>
    </ul>
  );
}
