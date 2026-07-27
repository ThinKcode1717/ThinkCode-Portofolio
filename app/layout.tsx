import type { Metadata } from 'next';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SeoSchema from '@/components/seo/SeoSchema';
import { AppProvider } from '@/context/AppContext';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

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
  metadataBase: new URL('https://thinkcode.dev'),
  icons: {
    icon: '/logo_nobg.png',
    shortcut: '/logo_nobg.png',
    apple: '/logo_nobg.png',
  },
  openGraph: {
    title: 'ThinkCode | Senior Full Stack Web Developer & AI Data Analyst',
    description: 'Portofolio resmi Yoga Adi Pratama (ThinkCode) - Senior Full Stack Web Developer & AI Data Analyst.',
    url: 'https://thinkcode.dev',
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
    <html lang="id" className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
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
