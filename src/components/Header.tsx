"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Menu, X, CreditCard } from "lucide-react";
import { AuthDialog } from "@/components/AuthDialog";
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
  const [credits, setCredits] = useState(0);
  const [buying, setBuying] = useState(false);

  // Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch Credits
  const fetchCredits = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setCredits(data.credits);
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Handle Buying Plan
  const handleBuyCredits = async (plan: "monthly" | "semiannual" | "annual") => {
    if (!user) return alert("Please sign in to buy credits");
    setBuying(true);
    try {
      const res = await fetch("/api/payment/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, plan }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Purchased ${plan} plan!`);
        setCredits(data.credits);
      } else {
        alert(`❌ Purchase failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    } finally {
      setBuying(false);
    }
  };

  const CreditsDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-1">
          <CreditCard className="w-4 h-4" /> 
          <span>Credits: {credits}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Buy Credits</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleBuyCredits("monthly")} disabled={buying}>
          Monthly - 2 Credits
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleBuyCredits("semiannual")} disabled={buying}>
          Semiannual - 6 Credits
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleBuyCredits("annual")} disabled={buying}>
          Annual - 12 Credits
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <motion.header
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 transition-colors"
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
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#templates" className="text-gray-600 hover:text-purple-600 transition-colors">Templates</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
          </nav>

          {/* Right Side (Auth/Profile) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <CreditsDropdown />
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
                    <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
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
                  <Button variant="ghost" className="text-gray-600">Sign In</Button>
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
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-purple-600">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600">FAQ</a>

              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <CreditsDropdown />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-3 px-2">
                          <img
                            src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full border border-gray-300"
                          />
                          <span className="text-gray-600">
                            {user.user_metadata?.full_name || user.email}
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
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
                      <Button variant="ghost" className="justify-start">Sign In</Button>
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
