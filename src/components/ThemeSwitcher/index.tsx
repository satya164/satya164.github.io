'use client';

import { useEffect } from 'react';
import styles from './styles.module.css';

const LOCAL_STORAGE_KEY = 'selected-theme';

export default function ThemeSwitcher() {
  const onClick = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem(LOCAL_STORAGE_KEY, newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  useEffect(() => {
    const onColorSchemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedTheme) {
        return;
      }

      const newTheme = e.matches ? 'dark' : 'light';

      document.documentElement.dataset.theme = newTheme;
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', onColorSchemeChange);

    return () => {
      mediaQuery.removeEventListener('change', onColorSchemeChange);
    };
  }, []);

  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        transform="rotate(45)"
      >
        <g className={styles.moon}>
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="12" cy="4" r="9" fill="black" />
          </mask>
          <circle fill="currentColor" cx="12" cy="12" r="9" mask="url(#mask)" />
        </g>
        <g
          className={styles.sun}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}

function getCurrentTheme() {
  const savedTheme = localStorage.getItem('selected-theme'); // This function is stringified so can't refer outside scope

  if (savedTheme) {
    return savedTheme;
  }

  const userPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return userPrefersDark ? 'dark' : 'light';
}

export const script = `
  ${getCurrentTheme.toString()}

  const theme = getCurrentTheme();

  document.documentElement.dataset.theme = theme;
`;
