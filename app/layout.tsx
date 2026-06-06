import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { profile } from './data/profile';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.metadataAbout
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F4EE' },
    { media: '(prefers-color-scheme: dark)', color: '#1F1E1B' }
  ]
};

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);

    if (isDark) document.documentElement.classList.add('dark');
  } catch {}
})();`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={clsx(
        geistSans.variable,
        geistMono.variable,
        fraunces.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="https://i.scdn.co" rel="preconnect" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
