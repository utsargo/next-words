import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
        <Link
          href="https://github.com/utsargo/next-words/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded p-2 fixed left-4 bottom-4 text-slate-50 bg-slate-600"
        >
          <DocumentTextIcon className="h-5 w-5 md:h-6 md:w-6" />
        </Link>
      </body>
    </html>
  );
}
