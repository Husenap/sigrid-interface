import Providers from "@/components/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { site } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

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
      alt: "The AI are taking over!",
    },
    locale: "sv",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main className="container relative">
            <div className="absolute top-0 right-0 h-screen -z-10 flex items-center">
              <Image
                src="/logo.png"
                width={1024}
                height={1024}
                className="max-h-screen w-auto opacity-50"
                alt="Sigridpunk is taking over"
              />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
