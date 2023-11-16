'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export function SocialLinks() {
  const [title, setTitle] = useState<string | undefined>();
  const pathname = usePathname();

  useEffect(() => {
    const title = document.title.split(' · ')[0];

    setTitle(title);
  }, []);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`;

  return (
    <ul className={styles.social}>
      <li>
        <a
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            title ?? "satya164's blog"
          )}&url=${encodeURIComponent(url)}&via=satya164`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
      </li>
      <li>
        <a
          href={`https://twitter.com/search?q=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on X
        </a>
      </li>
    </ul>
  );
}
