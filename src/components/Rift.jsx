import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Sparkles, TerminalSquare } from "lucide-react";

export default function Rift() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Tracking setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for the liquid drag effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 15 });

  // Dynamically generate the CSS clip-path based on the spring values
  // Expands to 300px on hover, shrinks to 40px when idle
  const maskSize = useSpring(isHovered ? 300 : 40, {
    stiffness: 100,
    damping: 20,
  });
  const clipPath = useMotionTemplate`circle(${maskSize}px at ${springX}px ${springY}px)`;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    // Center the mask initially
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-screen w-full relative overflow-hidden bg-[#030303] cursor-none"
    >
      {/* =========================================
          LAYER 1: THE VOID (Dark Base Layer)
          ========================================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#030303]">
        {/* Subtle wireframe background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 text-center flex flex-col items-center pointer-events-none">
          <TerminalSquare
            className="text-neon-cyan mb-8 opacity-50"
            size={48}
          />
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none mb-6">
            The Code
            <br />
            Is <span className="text-neon-cyan/30">Static.</span>
          </h2>
          <p className="text-gray-600 tracking-[0.5em] uppercase text-xs md:text-sm font-bold">
            Seek beyond the terminal.
          </p>
        </div>

        {/* Floating Void Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-neon-cyan/20 blur-[2px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-neon-magenta/20 blur-[2px]" />
      </div>

      {/* =========================================
          LAYER 2: THE RIFT (Bright X-Ray Layer)
          ========================================= */}
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 bg-[#e2e8f0] flex flex-col items-center justify-center p-6 z-20 pointer-events-none"
      >
        {/* High contrast dot grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000015_2px,transparent_2px)] bg-[size:20px_20px]" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <Sparkles className="text-black mb-8" size={48} />
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-black leading-none mb-6">
            The Vision
            <br />
            Is{" "}
            <span className="text-neon-magenta drop-shadow-[0_0_10px_#f0f]">
              Alive.
            </span>
          </h2>
          <p className="text-black tracking-[0.5em] uppercase text-xs md:text-sm font-black">
            Let's build something incredible.
          </p>
        </div>

        {/* Solid Floating Rift Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-neon-cyan shadow-[0_0_50px_#0ff]" />
      </motion.div>

      {/* =========================================
          GLOBAL OVERLAY: Footer & Call to Action
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between z-30 pointer-events-none mix-blend-difference text-white">
        <div className="text-xs uppercase tracking-widest font-black flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          End of Transmission
        </div>

        <a
          href="mailto:your.email@example.com"
          className="pointer-events-auto mt-4 md:mt-0 text-sm md:text-base font-black uppercase tracking-[0.2em] hover:text-neon-cyan transition-colors"
        >
          Initiate Contact -&gt;
        </a>
      </div>
    </section>
  );
}
