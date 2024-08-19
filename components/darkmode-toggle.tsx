"use client";

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-slate-700 dark:bg-gray-600 text-white hover:bg-slate-600 dark:hover:bg-gray-500 focus:outline-none relative md:fixed md:top-4 md:right-4"
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 md:h-6 md:w-6" />
      ) : (
        <MoonIcon className="h-5 w-5 md:h-6 md:w-6" />
      )}
    </button>
  );
}
