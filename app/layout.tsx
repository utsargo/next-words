import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextWords",
  description: "A Next.js app to learn new words.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-300 dark:bg-gray-900 text-black dark:text-white">
        <Header />
        <main className="container mx-auto px-4 pb-4 pt-2 flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
