import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Code2, Gamepad2, Coffee } from "lucide-react";

// Helper: Mouse-tracking glowing card
const BentoCard = ({ children, className, mousePos }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate mouse position relative to this specific card
  const x = mousePos.x - (cardRef.current?.getBoundingClientRect().left || 0);
  const y = mousePos.y - (cardRef.current?.getBoundingClientRect().top || 0);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] ${className}`}
    >
      {/* Spotlight Glow Effect */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 255, 0.08), transparent 40%)`,
        }}
      />
      {/* Inner Content */}
      <div className="relative z-10 h-full p-8 flex flex-col">{children}</div>
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#030303] relative py-32 font-sans min-h-screen flex flex-col items-center justify-center z-10"
    >
      {/* Section Header */}
      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-[3rem] md:text-[5rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
          The <span className="text-neon-cyan">Identity.</span>
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[300px]">
        {/* CARD 1: The Bio (Spans 2 columns) */}
        <BentoCard mousePos={mousePos} className="md:col-span-2 group">
          <div className="flex items-center gap-4 mb-6">
            <Code2 className="text-neon-magenta" size={24} />
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">
              Software Developer
            </h3>
          </div>
          <p className="text-2xl md:text-3xl font-bold leading-tight text-gray-200 mb-6 group-hover:text-white transition-colors">
            Bridging the gap between{" "}
            <span className="text-neon-cyan">complex backend logic</span> and
            highly animated, seamless digital experiences.
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            I like building things with code. From web applications to
            interactive features, I focus on creating smooth and reliable
            experiences. I believe in keeping things simple, clear, and
            well-structured.
          </p>
        </BentoCard>

        {/* CARD 2: The Radar / Location */}
        <BentoCard
          mousePos={mousePos}
          className="relative flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {/* Animated Radar Sweep */}
            <div className="w-[400px] h-[400px] rounded-full border border-neon-lime/20 absolute" />
            <div className="w-[300px] h-[300px] rounded-full border border-neon-lime/30 absolute" />
            <div className="w-[200px] h-[200px] rounded-full border border-neon-lime/40 absolute" />
            <div
              className="w-full h-full absolute animate-[spin_4s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 70%, rgba(0, 255, 0, 0.4) 100%)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <MapPin className="text-neon-lime mb-4" size={32} />
            <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
              Earth
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-neon-lime/70">
              Universe, Singularity
            </p>
          </div>
        </BentoCard>

        {/* CARD 3: Off-screen Life (Draggable Playground) */}
        <BentoCard mousePos={mousePos} className="relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6 z-10 relative">
            <Gamepad2 className="text-neon-cyan" size={24} />
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">
              System Recharge
            </h3>
          </div>
          <p className="text-sm text-gray-300 relative z-10 pointer-events-none">
            When the terminal is closed, you'll find me immersed in PC gaming,
            hanging out with my Labrador, or hunting down the perfect food which
            not mess my hand while playing Call of Duty.
          </p>

          {/* Interactive Floating/Draggable Elements */}
          <div className="absolute inset-0 p-4 pt-32 pointer-events-auto">
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 200, top: 0, bottom: 50 }}
              className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 backdrop-blur-md absolute top-24 left-10 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            >
              <span className="text-2xl">🕹️</span>
            </motion.div>
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
              className="w-14 h-14 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 backdrop-blur-md absolute bottom-10 right-10 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(255,0,255,0.2)]"
            >
              <span className="text-xl">🐕</span>
            </motion.div>
          </div>
        </BentoCard>

        {/* CARD 4: The Marquee / Philosophy (Spans 2 columns) */}
        <BentoCard
          mousePos={mousePos}
          className="md:col-span-2 flex items-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#111]"
        >
          <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none">
            {/* Infinite Scrolling Text */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap text-[8rem] font-black uppercase tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              BUILD. DESTROY. REBUILD. OPTIMIZE. BUILD. DESTROY. REBUILD.
              OPTIMIZE.
            </motion.div>
          </div>
          <div className="relative z-10 w-full flex justify-between items-end">
            <div>
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">
                Philosophy
              </h3>
              <p className="text-4xl font-extrabold text-white flex items-center gap-4">
                Solve Problem using Code.{" "}
                <span className="w-3 h-3 rounded-full bg-neon-lime animate-pulse shadow-[0_0_10px_#0f0]" />
              </p>
            </div>
            <Coffee className="text-white/20" size={80} />
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
