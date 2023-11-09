import { Arvo, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ThemeSwitcher, { script } from '../components/ThemeSwitcher';

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

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['italic', 'normal'],
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
      className={`${arvo.variable} ${lato.variable} ${playfair.variable}`}
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
