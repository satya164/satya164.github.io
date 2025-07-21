import clsx from 'clsx';
import type { Metadata } from 'next';
import { Arvo, Fira_Code, Lato } from 'next/font/google';
import { Footer } from '../components/Footer';
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
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{ __html: script }}
        />
        <StyleRegistry />
      </head>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: `%s · ${meta.title}`,
    default: meta.title,
  },
  description: meta.description,
};
