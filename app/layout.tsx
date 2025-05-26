import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/shared/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ramen Road',
  description: 'Discover your ramen road through interactive experiences and knowledge collection.',
  keywords: ['ramen', 'japanese food', 'ramen road', 'ramen exploration', 'ramen education'],
  openGraph: {
    title: 'Ramen Road',
    description: 'Discover your ramen road through interactive experiences and knowledge collection.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ramen Road',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramen Road',
    description: 'Discover your ramen road through interactive experiences and knowledge collection.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
