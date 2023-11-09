'use client';

import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.css';

type Props = {
  preRef: React.RefObject<HTMLPreElement>;
};

export function CopyButton({ preRef }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    // Get the code from the `code` element inside the `pre` element.
    const content = preRef.current?.firstChild?.textContent;

    if (!content) {
      return;
    }

    await navigator.clipboard.writeText(content);

    setIsCopied(true);

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        title="Copy code to clipboard"
        className={styles.button}
        disabled={isCopied}
        onClick={copy}
      >
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(styles.copy, {
            [styles.visible!]: !isCopied,
          })}
        >
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="m16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9h-4.2c-3.5 0-4.9-1.4-4.9-4.9v-4.2c0-3.5 1.4-4.9 4.9-4.9h4.2c3.5 0 4.9 1.4 4.9 4.9z" />
            <path d="m22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9h-1.1v-3.1c0-3.5-1.4-4.9-4.9-4.9h-3.1v-1.1c0-3.5 1.4-4.9 4.9-4.9h4.2c3.5 0 4.9 1.4 4.9 4.9z" />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={clsx(styles.check, {
            [styles.visible!]: isCopied,
          })}
        >
          <path
            fill="currentColor"
            d="m504 256c0 136.967-111.033 248-248 248s-248-111.033-248-248 111.033-248 248-248 248 111.033 248 248zm-276.686 131.314 184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0l-150.059 150.058-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          />
        </svg>
      </button>
    </div>
  );
}
