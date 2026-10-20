import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono, Unbounded } from 'next/font/google';
import './globals.css';
import SeoSchema from '@/components/seo/SeoSchema';
import { AppProvider } from '@/context/AppContext';
import { SITE_URL } from '@/lib/site';

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ThinkCode | Senior Full Stack Web Developer & AI Data Analyst',
  description: 'Portofolio resmi Yoga Adi Pratama (ThinkCode) - Senior Full Stack Web Developer & AI Data Analyst spesialis React, Next.js, Node.js, Laravel, Python AI, dan Otomasi Web Scraping.',
  keywords: [
    'ThinkCode',
    'Yoga Adi Pratama',
    'Full Stack Developer',
    'AI Data Analyst',
    'Next.js Developer',
    'React Developer',
    'Laravel Developer',
    'Web Scraping Specialist',
    'Portofolio Developer Indonesia'
  ],
  authors: [{ name: 'Yoga Adi Pratama (ThinkCode)' }],
  creator: 'ThinkCode',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'MqabyjNS-apoUDncq7Cb2TbyU6Yd-0qpskAxTT0g6c0',
  },
  icons: {
    icon: '/logo_nobg.png',
    shortcut: '/logo_nobg.png',
    apple: '/logo_nobg.png',
  },
  openGraph: {
    title: 'ThinkCode | Senior Full Stack Web Developer & AI Data Analyst',
    description: 'Portofolio resmi Yoga Adi Pratama (ThinkCode) - Senior Full Stack Web Developer & AI Data Analyst.',
    url: SITE_URL,
    siteName: 'ThinkCode Portfolio',
    images: [
      {
        url: '/logo_nobg.png',
        width: 512,
        height: 512,
        alt: 'ThinkCode Logo'
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkCode | Senior Full Stack Web Developer',
    description: 'Senior Full Stack Web Developer & AI Data Analyst',
    images: ['/logo_nobg.png'],
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
    <html lang="id" className={`${unbounded.variable} ${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}>
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
