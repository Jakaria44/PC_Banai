'use client'

import { Button } from "@/components/ui/button";
import { ExpertiseLevel, ThemeType } from '@/types';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import React, { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<ThemeType>("light");
  const [expertise, setExpertise] = React.useState<ExpertiseLevel>("beginner");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <MonitorIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold">BuildMaster Pro</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <Button variant="ghost" className="text-lg">
                Build Now
              </Button>
              <Button variant="ghost" className="text-lg">
                Community Builds
              </Button>
              <Button variant="ghost" className="text-lg">
                Benchmarks
              </Button>
            </div>

            {/* Right Section: Expertise Level & Theme Toggle */}
            <div className="flex items-center space-x-6">

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto px-8 py-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-8 py-6">
        <div className="text-center text-gray-600 dark:text-gray-400">
          BuildMaster Pro - Your Trusted PC Building Companion © 2024
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;