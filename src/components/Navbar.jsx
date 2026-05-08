import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navLinks, profile } from "../data/portfolio";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

const MotionNav = motion.nav;
const MotionDiv = motion.div;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    [
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-[color:var(--surface-strong)] text-[color:var(--text)]"
        : "text-[color:var(--muted)] hover:text-[color:var(--text)]",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-4 z-[70] px-4">
      <MotionNav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "mx-auto flex w-full max-w-[calc(100vw-32px)] items-center justify-between rounded-lg px-3 py-3 transition-all md:max-w-7xl md:px-4",
          scrolled ? "glass-line" : "border border-transparent bg-transparent",
        ].join(" ")}
      >
        <NavLink to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--text)] text-[color:var(--bg)]">
            <Terminal size={18} />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold">{profile.brand}</span>
            <span className="hidden text-xs text-[color:var(--muted)] sm:block">
              Product engineer
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <MagneticButton to="/contact" className="min-h-10 px-4 py-2">
            Start a project
          </MagneticButton>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </MotionNav>

      <AnimatePresence>
        {open && (
          <MotionDiv
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-7xl rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-3 shadow-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/resume"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Resume
              </NavLink>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-[color:var(--line)] px-3 py-2">
                <span className="text-sm font-medium text-[color:var(--muted)]">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
}
