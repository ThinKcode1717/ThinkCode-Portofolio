import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SeoSchema from '@/components/seo/SeoSchema';
import { AppProvider } from '@/context/AppContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ThinkCode | Full Stack Developer & Submarine Tech Specialist',
  description: 'Portofolio resmi ThinkCode - Lead Full Stack Engineer spesialis Next.js, WebGL, Go, dan Sistem Terdistribusi Beban Tinggi dengan tema visual kedalaman laut.',
  keywords: [
    'ThinkCode',
    'Full Stack Developer',
    'Next.js Developer',
    'WebGL Engineer',
    'Go Developer',
    'Portofolio Developer Indonesia',
    'Underwater Portfolio',
    'React 19',
    'TypeScript'
  ],
  authors: [{ name: 'ThinkCode' }],
  creator: 'ThinkCode',
  metadataBase: new URL('https://thinkcode.dev'),
  openGraph: {
    title: 'ThinkCode | Full Stack Developer',
    description: 'Portofolio resmi ThinkCode - Full Stack Engineer spesialis Next.js, WebGL, dan Sistem Kedalaman Terdistribusi.',
    url: 'https://thinkcode.dev',
    siteName: 'ThinkCode Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'ThinkCode Profile Avatar'
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkCode | Full Stack Developer',
    description: 'Full Stack Engineer & WebGL Specialist',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <SeoSchema />
      </head>
      <body className="bg-[#000308] text-slate-100 antialiased selection:bg-[#00f0ff] selection:text-[#000308] font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
