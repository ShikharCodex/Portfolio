import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import {
  Code2,
  Braces,
  Wand2,
  Server,
  Zap,
  LayoutTemplate,
  ChevronDown,
} from "lucide-react";

const skillsData = [
  {
    id: "01",
    name: "Java",
    category: "My favourite and Best Programming Language ever",
    color: "text-neon-magenta",
    glow: "shadow-[0_0_30px_#f0f]",
    icon: Wand2,
    desc: "Java the best programming language for me, Thank You Java and Love you 💗",
  },
  {
    id: "02",
    name: "Node.js",
    category: "Backend Runtime",
    color: "text-neon-lime",
    glow: "shadow-[0_0_30px_#0f0]",
    icon: Server,
    desc: "Developing server-side logic, RESTful APIs, and handling asynchronous event-driven architecture.",
  },
  {
    id: "03",
    name: "React.js",
    category: "Frontend Architecture",
    color: "text-neon-cyan",
    glow: "shadow-[0_0_30px_#0ff]",
    icon: Code2,
    desc: "Building scalable, component-driven user interfaces with optimized state management and custom hooks.",
  },
  {
    id: "04",
    name: "Machine Learning",
    category: "The Neural Network",
    color: "text-neon-cyan",
    glow: "shadow-[0_0_30px_#0ff]",
    icon: LayoutTemplate,
    desc: "Utilizing state-of-the-art machine learning algorithms for optimizing user experience and performance.",
  },

  {
    id: "05",
    name: "JavaScript",
    category: "Core Logic",
    color: "text-neon-lime",
    glow: "shadow-[0_0_30px_#0f0]",
    icon: Braces,
    desc: "Writing clean, asynchronous ES6+ logic, DOM manipulation, and interacting with modern web APIs.",
  },

  {
    id: "06",
    name: "MongoDB and Mongoose",
    category: "Build Robust Backends",
    color: "text-neon-magenta",
    glow: "shadow-[0_0_30px_#f0f]",
    icon: Zap,
    desc: "MongoDB and Mongoose are my go-to tools for building robust, scalable databases and models.",
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);

  // Smooth Cursor Tracking Physics (Desktop Only)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });
  const springY = useSpring(cursorY, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });

  useEffect(() => {
    // Only track mouse if user has a pointing device (ignores touch screens)
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [cursorX, cursorY]);

  // Handle click for mobile toggle functionality
  const handleInteraction = (skill) => {
    setActiveSkill(activeSkill?.id === skill.id ? null : skill);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setActiveSkill(null);
      }}
      className="bg-[#030303] relative py-20 md:py-32 font-sans min-h-screen flex flex-col justify-center overflow-hidden z-10 md:cursor-crosshair"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 md:gap-16">
        {/* Left: Minimalist Header */}
        <div className="lg:w-1/4 flex flex-col justify-start lg:justify-between py-4 lg:py-8">
          <div>
            <div className="w-12 h-[2px] bg-white mb-6" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.4em] font-bold text-gray-400">
              Technical
              <br />
              <span className="text-white">Proficiency</span>
            </h2>
          </div>
          <p className="hidden lg:block text-xs text-gray-500 uppercase tracking-widest max-w-[200px] leading-relaxed">
            Hover over the index to reveal technical specifications and core
            competencies.
          </p>
        </div>

        {/* Right: The Massive Responsive List */}
        <div className="lg:w-3/4 flex flex-col w-full relative group">
          {skillsData.map((skill) => {
            const isActive = activeSkill?.id === skill.id;

            return (
              <motion.div
                key={skill.id}
                onMouseEnter={() =>
                  window.matchMedia("(pointer: fine)").matches &&
                  setActiveSkill(skill)
                }
                onClick={() => handleInteraction(skill)}
                className="relative border-b border-gray-800/50 py-5 md:py-10 cursor-pointer flex flex-col justify-center"
                initial="initial"
                whileHover="hover"
              >
                {/* Animated Background Gradient on Hover (Desktop) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 hidden md:block ${isActive ? "opacity-100" : ""}`}
                />

                <div className="flex items-center justify-between relative z-10 w-full">
                  <div className="flex items-center gap-4 md:gap-12 w-full">
                    <span
                      className={`text-xs md:text-sm font-mono transition-colors duration-300 ${isActive ? skill.color : "text-gray-500"}`}
                    >
                      {skill.id}
                    </span>

                    {/* FIXED: Strong Outline (Border Text) that stays visible */}
                    <h3
                      className="text-[clamp(1.8rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none transition-all duration-500 w-full"
                      style={{
                        WebkitTextStroke: isActive
                          ? "0px transparent"
                          : "1px rgba(255, 255, 255, 0.4)", // The visible outline
                        color: isActive ? "#ffffff" : "transparent", // Hollow when inactive, filled when active
                        textShadow: isActive
                          ? "0 0 30px rgba(255,255,255,0.4)"
                          : "none",
                        transform: isActive
                          ? "translateX(20px)"
                          : "translateX(0px)",
                        opacity: 1, // Keeps the outline completely visible at all times
                      }}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  {/* Mobile Chevron Indicator */}
                  <div className="md:hidden text-gray-500">
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={20}
                        className={isActive ? skill.color : ""}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile Only Accordion Description */}
                <div
                  className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[250px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
                >
                  <div
                    className={`pl-4 border-l-2 ${skill.color.replace("text-", "border-")} py-2 mb-2`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <skill.icon size={16} className={skill.color} />
                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold ${skill.color}`}
                      >
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* The Floating Custom Cursor Card (Strictly Desktop Only) */}
      <motion.div
        className="hidden lg:flex fixed top-0 left-0 w-[340px] pointer-events-none z-50 flex-col overflow-hidden rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{
          x: springX,
          y: springY,
          opacity: isHovering && activeSkill ? 1 : 0,
          scale: isHovering && activeSkill ? 1 : 0.8,
          translateX: "20px",
          translateY: "-50%",
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {activeSkill && (
          <>
            <div
              className={`h-1 w-full ${activeSkill.color.replace("text-", "bg-")} ${activeSkill.glow}`}
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] uppercase tracking-[0.3em] font-extrabold ${activeSkill.color}`}
                >
                  {activeSkill.category}
                </span>
                <activeSkill.icon className={activeSkill.color} size={20} />
              </div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                {activeSkill.name}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {activeSkill.desc}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
