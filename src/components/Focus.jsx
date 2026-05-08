import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  TerminalSquare,
  Gamepad2,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const domains = [
  {
    id: 1,
    title: "Frontend Architecture",
    subtitle: "The Visual Layer",
    icon: Layers,
    color: "#22d3ee",
    gradient: "from-[#22d3ee]/15 via-[#22d3ee]/5 to-transparent",
    desc: "Crafting pixel-perfect, highly animated user interfaces. I build component-driven systems in React that prioritize fluid motion and immaculate design.",
  },
  {
    id: 2,
    title: "Backend Logic",
    subtitle: "The Engine",
    icon: TerminalSquare,
    color: "#ffffff",
    gradient: "from-white/10 via-white/5 to-transparent",
    desc: "Structuring robust data flows and asynchronous operations. I design clean, scalable server-side architecture that powers complex web applications.",
  },
  {
    id: 3,
    title: "Interactive Gaming",
    subtitle: "The Canvas",
    icon: Gamepad2,
    color: "#e879f9",
    gradient: "from-[#e879f9]/15 via-[#e879f9]/5 to-transparent",
    desc: "Pushing the browser to its limits. From precise collision detection to optimized loops, I build browser-based interactive experiences.",
  },
  {
    id: 4,
    title: "System Optimization",
    subtitle: "The Performance",
    icon: Zap,
    color: "#a3e635",
    gradient: "from-[#a3e635]/15 via-[#a3e635]/5 to-transparent",
    desc: "Zero layout shifts. Lightning-fast load times. I rigorously audit build tools to ensure a seamless, high-frame-rate experience.",
  },
];

export default function Focus() {
  const [active, setActive] = useState(domains[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="bg-[#030303] relative py-16 md:py-32 font-sans min-h-screen flex flex-col justify-center overflow-hidden z-10">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      {/* Header Area */}
      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 mb-10 md:mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
              System_Capabilities
            </span>
          </div>
        </div>
        <h3 className="text-[clamp(2.5rem,8vw,7rem)] font-black uppercase tracking-tighter text-white leading-[0.9] md:leading-[0.8]">
          Areas of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white/10 italic">
            Expertise.
          </span>
        </h3>
      </div>

      {/* Main Container */}
      <div className="max-w-[95rem] w-full mx-auto px-4 md:px-12 flex flex-col md:flex-row gap-3 md:gap-4 md:h-[550px] relative z-10">
        {domains.map((domain) => {
          const isActive = active === domain.id;
          const Icon = domain.icon;

          return (
            <motion.div
              key={domain.id}
              onClick={() => setActive(domain.id)}
              onMouseEnter={() => !isMobile && setActive(domain.id)}
              layout
              initial={false}
              animate={{
                flex: isMobile ? "none" : isActive ? 5 : 1,
                // Exact 76px height for collapsed mobile bars, auto for expanded
                height: isMobile ? (isActive ? "auto" : "76px") : "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
              }}
              className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer border transition-colors duration-700 flex-shrink-0 ${
                isActive
                  ? "border-white/20 bg-[#0a0a0a]"
                  : "border-white/5 bg-[#050505] hover:border-white/10"
              }`}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} transition-opacity duration-1000 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* INACTIVE STATE - Redesigned for mobile clarity */}
              <div
                className={`absolute inset-0 flex items-center px-6 md:px-0 md:justify-center transition-all duration-500 ${
                  isActive
                    ? "opacity-0 scale-95 blur-md pointer-events-none"
                    : "opacity-100 delay-150"
                }`}
              >
                {/* Horizontal on mobile, vertical on desktop */}
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-6 w-full md:w-auto">
                  <Icon
                    size={24}
                    style={{ color: domain.color }}
                    className="opacity-50 flex-shrink-0"
                  />
                  <span className="text-white/40 font-bold tracking-[0.15em] md:tracking-[0.3em] uppercase md:-rotate-90 md:translate-y-24 text-xs md:text-sm truncate">
                    {domain.title}
                  </span>
                </div>
              </div>

              {/* ACTIVE STATE */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative w-full h-full p-6 md:p-12 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start mb-6 md:mb-0">
                      <div className="p-3 md:p-5 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                        <Icon
                          size={24}
                          md:size={32}
                          style={{ color: domain.color }}
                        />
                      </div>
                      <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                        Mod_0{domain.id}
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div className="space-y-1 md:space-y-2">
                        <span
                          className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] font-black opacity-80"
                          style={{ color: domain.color }}
                        >
                          {domain.subtitle}
                        </span>
                        <h4 className="text-[1.75rem] md:text-[clamp(2rem,4vw,3.75rem)] font-black text-white uppercase tracking-tight md:tracking-tighter leading-none">
                          {domain.title}
                        </h4>
                      </div>

                      <p className="text-sm md:text-xl text-gray-400 leading-relaxed max-w-lg font-medium tracking-tight">
                        {domain.desc}
                      </p>

                      <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-4">
                        <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute inset-0"
                            style={{ backgroundColor: domain.color }}
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
                          <ArrowRight
                            size={12}
                            style={{ color: domain.color }}
                          />
                          <span className="hidden sm:inline">Secure_Link_</span>
                          Est.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
