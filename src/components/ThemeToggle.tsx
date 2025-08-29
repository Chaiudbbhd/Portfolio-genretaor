import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react"; // icons
import { motion, AnimatePresence } from "framer-motion";

const themes = ["light", "dark"] as const;

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="rounded-full px-4 py-2 flex items-center justify-center relative overflow-hidden transition-colors duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Sun className="h-5 w-5 text-yellow-500" />
            <span>Light</span>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <Moon className="h-5 w-5 text-blue-400" />
            <span>Dark</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
