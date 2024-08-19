import DarkModeToggle from "@/components/darkmode-toggle";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex md:justify-center justify-between items-center p-4 bg-slate-300 dark:bg-gray-900 gap-4">
      <Image
        src="/images/nextword-logo.svg"
        alt="NextWords Logo"
        width={200}
        height={25}
        className="dark:bg-slate-50/80 p-2 rounded-lg max-w-[150px] h-auto md:w-[200px] md:h-auto"
      />
      <DarkModeToggle />
    </header>
  );
}
