import Providers from "@/components/providers/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigridpunk",
  description: "Take your labbhandledning to the next level! 🚀",
  openGraph: {
    title: "Sigridpunk",
    description: "Take your labbhandledning to the next level! 🚀",
    siteName: "Sigridpunk",
    url: "https://sigrid-interface.vercel.app",
    images: {
      url: "https://sigrid-interface.vercel.app/logo.jpg",
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
