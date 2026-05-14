import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, PawPrint } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Detect scroll for background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Execution", href: "#pinpoint" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Max", href: "#Max", icon: true }, // 🐾
  ];

  // Custom smooth scroll
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-[100] flex justify-center px-4 pt-5 md:pt-6 pointer-events-none"
      >
        {/* Navbar container */}
        <motion.div
          className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl rounded-full border transition-all duration-500 
            ${
              scrolled
                ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] px-5 md:px-6 py-2.5 md:py-3"
                : "bg-black/30 backdrop-blur-sm border-white/5 px-4 md:px-6 py-2 md:py-3"
            }`}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleSmoothScroll(e, "#top")}
            className="flex items-center gap-2 group cursor-pointer z-50 flex-shrink-0"
          >
            <Terminal
              size={18}
              className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors"
            />
            <span className="text-white font-extrabold text-base sm:text-lg md:text-xl tracking-tighter whitespace-nowrap">
              Shikhar
              <span className="text-cyan-400 group-hover:text-fuchsia-400 transition-colors">
                .
              </span>
              x
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3 lg:px-5 py-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 cursor-pointer
                    ${activeSection === link.href.replace("#", "") ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
                >
                  {/* Pill background for hover / active */}
                  {(hoveredLink === link.name ||
                    activeSection === link.href.replace("#", "")) && (
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
                  <span className="relative z-20 flex items-center gap-1">
                    {link.icon && (
                      <PawPrint size={14} className="text-amber-400" />
                    )}
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: version + hamburger */}
          <div className="flex items-center gap-3 z-50">
            <a
              href="https://shikharx2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] cursor-pointer whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse hidden lg:block" />
              v2.0.1
            </a>

            <button
              className="md:hidden text-white p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Fullscreen Menu */}
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

            <div className="flex flex-col gap-6 w-full px-6 sm:px-12 relative z-10">
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
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="flex items-center justify-between text-white group cursor-pointer"
                  >
                    <span className="text-3xl sm:text-4xl font-black uppercase tracking-tighter group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {link.icon && (
                        <PawPrint size={24} className="text-amber-400" />
                      )}
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
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="mt-6 flex justify-center items-center gap-2 py-4 w-full bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer"
              >
                Execute Connection
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
