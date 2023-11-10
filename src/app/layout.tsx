import clsx from 'clsx';
import { Arvo, Lato, Fira_Code } from 'next/font/google';
import Link from 'next/link';
import { ThemeSwitcher, script } from '../components/ThemeSwitcher';
import './globals.css';

const arvo = Arvo({
  variable: '--font-arvo',
  subsets: ['latin'],
  weight: ['400'],
  style: 'normal',
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
});

const fira = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400'],
  style: 'normal',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(arvo.variable, lato.variable, fira.variable)}
      suppressHydrationWarning // Necessary to preserve theme selection
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: script }}
        />
      </head>
      <body>
        <nav>
          <Link href="/">Posts</Link>
          <Link href="/about">About</Link>
          <ThemeSwitcher />
        </nav>
        {children}
        <footer>
          Copyright © 2023 <Link href="/about">Satyajit Sahoo</Link>. All
          rights reserved.
        </footer>
      </body>
    </html>
  );
}

export const metadata = {
  title: "@satya164's blog",
  description: 'A blog about web development, react native, and open source',
};
