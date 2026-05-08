import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const MotionSpan = motion.span;

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--text)] transition hover:border-[color:var(--accent)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <MotionSpan
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </MotionSpan>
      </AnimatePresence>
    </button>
  );
}
