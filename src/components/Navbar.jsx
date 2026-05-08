<<<<<<< HEAD
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Execution", href: "#pinpoint" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
  ];

  // 1. THE MAGIC FIX: Custom Smooth Scroll Function
  const handleSmoothScroll = (e, href) => {
    e.preventDefault(); // Stops the URL from changing

    // Extract the ID (removes the '#' from the href)
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);

    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }

    // Close the mobile menu if it was open
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-[100] flex justify-center px-4 pt-6 md:pt-8 pointer-events-none"
      >
        <motion.div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 rounded-full border ${
            scrolled
              ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-full max-w-5xl px-6 py-3 md:py-4"
              : "bg-transparent border-transparent w-full max-w-6xl px-4 py-2"
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#top"
            onClick={(e) => handleSmoothScroll(e, "#top")}
            className="flex items-center gap-2 group relative z-50 cursor-pointer"
          >
            <Terminal
              size={18}
              className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300"
            />
            <span className="text-white font-extrabold text-lg md:text-xl tracking-tighter">
              Shikhar
              <span className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300">
                .
              </span>
              x
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative z-10">
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)} // Apply custom scroll here
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-5 py-2 block text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-20">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Connect Button (Desktop) & Hamburger (Mobile) */}
          <div className="flex items-center gap-4 z-50">
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")} // Apply custom scroll here
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse hidden lg:block" />
              {/* <a href="https://github.com/ShikharBit">Github</a> */}
            </a>

            <button
              className="md:hidden text-white p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className="text-fuchsia-400" />
              ) : (
                <Menu size={20} className="text-cyan-400" />
              )}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-[#030303]/95 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-radial from-cyan-500/20 via-fuchsia-500/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-8 w-full px-12 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    type: "spring",
                    damping: 20,
                  }}
                  className="border-b border-white/5 pb-4"
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)} // Apply custom scroll here
                    className="flex items-center justify-between text-white group cursor-pointer"
                  >
                    <span className="text-4xl font-black uppercase tracking-tighter group-hover:text-cyan-400 transition-colors duration-300">
                      {link.name}
                    </span>
                    <span className="text-xs font-mono text-gray-600 group-hover:text-fuchsia-400 transition-colors">
                      0{i + 1}
                    </span>
                  </a>
                </motion.div>
              ))}

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")} // Apply custom scroll here
                className="mt-8 flex justify-center items-center gap-2 py-4 w-full bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer"
              >
                Execute Connection
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
=======
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
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
  );
}
