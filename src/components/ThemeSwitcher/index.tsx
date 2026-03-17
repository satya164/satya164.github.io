'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import styles from './styles.module.css';

type Props = {
  className?: string;
};

const LOCAL_STORAGE_KEY = 'selected-theme';

function getNextMode(current: string | null) {
  return current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
}

export function ThemeSwitcher({ className }: Props) {
  const onClick = () => {
    const nextMode = getNextMode(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (nextMode === 'auto') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      document.documentElement.dataset.theme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
        ? 'dark'
        : 'light';
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, nextMode);
      document.documentElement.dataset.theme = nextMode;
    }

    document.documentElement.dataset.themeMode = nextMode;
  };

  useEffect(() => {
    const onColorSchemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedTheme) {
        return;
      }

      document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', onColorSchemeChange);

    return () => {
      mediaQuery.removeEventListener('change', onColorSchemeChange);
    };
  }, []);

  return (
    <button
      type="button"
      title="Toggle theme"
      className={clsx(styles.button, className)}
      onClick={onClick}
    >
      <span className={styles.icons}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.sun}
        >
          <path
            fill="currentColor"
            d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.moon}
        >
          <path
            fill="currentColor"
            d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-2 -2 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.auto}
        >
          <path d="m21.64 3.64-1.28-1.28a1.71 1.71 0 0 0-2.42 0L1.66 18.64a1.71 1.71 0 0 0 0 2.42l1.28 1.28a1.71 1.71 0 0 0 2.42 0L21.64 6.06a1.71 1.71 0 0 0 0-2.42Z" />
          <path d="M8 0v4M10 2H6M3 8v4M5 10H1M19 17v4M21 19h-4" />
        </svg>
      </span>
    </button>
  );
}

function getInitialTheme() {
  // This function is stringified so can't refer outside scope
  const savedTheme = localStorage.getItem('selected-theme');

  const resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light';

  return {
    mode: savedTheme ?? 'auto',
    theme:
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : resolvedTheme,
  };
}

export const script = `
  const { mode, theme } = (${getInitialTheme.toString()})();

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themeMode = mode;
`;
