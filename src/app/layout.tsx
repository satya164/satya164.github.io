import clsx from 'clsx';
import { Arvo, Fira_Code, Lato } from 'next/font/google';
import Link from 'next/link';
import { NavBar } from '../components/NavBar';
import { script } from '../components/ThemeSwitcher';
import meta from '../metadata.json';
import './globals.css';
import StyleRegistry from './registry';

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
        <StyleRegistry />
      </head>
      <body>
        <NavBar />
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
  title: {
    template: `%s · ${meta.title}`,
    default: meta.title,
  },
  description: meta.description,
};
