import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextWords",
  description: "A next.js app to learn new words.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center bg-slate-300">
          <Image
            src="/images/nextword-logo.svg"
            alt="NextWords Logo"
            width={200}
            height={200}
            className="mb-8"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
