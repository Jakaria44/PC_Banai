"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExpertiseLevel, ThemeType } from "@/types";
import { LayoutDashboardIcon, LogOutIcon, MonitorIcon, MoonIcon, SunIcon, UserCircleIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

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
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "dark bg-gray-950 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <MonitorIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <Link href={"/"}>
                <span className="text-2xl font-bold">PCBanabo</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <Link href="/">
                <Button variant="ghost" className="text-lg">
                  Build Now
                </Button>
              </Link>
              <Link href="/admin/add-comp">
                <Button variant="ghost" className="text-lg">
                  Add Component
                </Button>
              </Link>
              {/* <Button variant="ghost" className="text-lg">
                Community Builds
              </Button>
              <Button variant="ghost" className="text-lg">
                Benchmarks
              </Button> */}
            </div>

            {/* Right Section: Profile, Theme Toggle */}
            <div className="flex items-center space-x-6">
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-5 w-5" />
                ) : (
                  <SunIcon className="h-5 w-5" />
                )}
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback>
                        <UserIcon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Username</p>
                      <p className="text-sm text-muted-foreground">
                        username@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex items-center">
                      <UserCircleIcon className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/build/saved" className="cursor-pointer flex items-center">
                      <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                      <span>My Builds</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 dark:text-red-400"
                    onClick={() => {
                      // Add your logout logic here
                      console.log("Logging out...");
                    }}
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          PCBanabo - Your Trusted PC Building Companion © 2024
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;