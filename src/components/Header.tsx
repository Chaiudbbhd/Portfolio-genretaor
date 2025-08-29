"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Menu, X } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  // --- Theme handling with localStorage ---
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // --- Supabase Auth handling ---
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <motion.header
      className="fixed top-0 w-full bg-white/90 dark:bg-background/90 neon:bg-background/90 backdrop-blur-md border-b border-gray-200 dark:border-border z-50 transition-colors"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PortfolioForge
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 dark:hover:text-primary transition-colors">
              Features
            </a>
            <a href="#templates" className="text-gray-600 hover:text-purple-600 dark:hover:text-primary transition-colors">
              Templates
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 dark:hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600 dark:hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Side (Theme + Auth/Profile) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Keep your custom ThemeToggle + button toggle */}
            <ThemeToggle />
            <button
              onClick={toggleTheme}
              className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <img
                      src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    {user.user_metadata?.full_name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <AuthDialog>
                  <Button variant="ghost" className="text-gray-600 dark:text-foreground">
                    Sign In
                  </Button>
                </AuthDialog>
                <AuthDialog>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Get Started
                  </Button>
                </AuthDialog>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="text-gray-600 dark:text-foreground hover:text-purple-600 dark:hover:text-primary">
                Features
              </a>
              <a href="#templates" className="text-gray-600 dark:text-foreground hover:text-purple-600 dark:hover:text-primary">
                Templates
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-foreground hover:text-purple-600 dark:hover:text-primary">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 dark:text-foreground hover:text-purple-600 dark:hover:text-primary">
                FAQ
              </a>

              {/* Theme Toggle in Mobile Menu */}
              <div className="pt-4 flex space-x-2 items-center">
                <ThemeToggle />
                <button
                  onClick={toggleTheme}
                  className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>

              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-3 px-2">
                          <img
                            src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full border border-gray-300"
                          />
                          <span className="text-gray-600 dark:text-foreground">
                            {user.user_metadata?.full_name || user.email}
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <AuthDialog>
                      <Button variant="ghost" className="justify-start">
                        Sign In
                      </Button>
                    </AuthDialog>
                    <AuthDialog>
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 justify-start">
                        Get Started
                      </Button>
                    </AuthDialog>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};
