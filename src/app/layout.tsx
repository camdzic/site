import Header from '@/components/header';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'camdzic.dev',
  description:
    'Your favorite full-stack developer. Thank you for visiting my website!'
};

export const viewport: Viewport = {
  themeColor: '#2d271d'
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers attribute="class">
          <Header />

          {children}

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
