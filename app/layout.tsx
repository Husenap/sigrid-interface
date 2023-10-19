import Providers from '@/components/providers/providers';
import { Toaster } from '@/components/ui/toaster';
import { site } from '@/config/site';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layouts/site-header';
import SiteFooter from '@/components/layouts/site-footer';

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

export const preferredRegion = 'arn1';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex flex-1 border-b pb-12">
              <main className="container relative px-4 lg:px-8">{children}</main>
            </div>
            <SiteFooter />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
