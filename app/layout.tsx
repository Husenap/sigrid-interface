import Providers from '@/components/providers/providers';
import { site } from '@/config/site';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  metadataBase: new URL(site.baseurl),
  openGraph: {
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.baseurl,
    images: {
      url: `${site.baseurl}logo.jpg`,
      width: 1024,
      height: 1024,
      alt: 'The AI are taking over!',
    },
    locale: 'sv',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="container relative px-2 md:px-4 xl:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
