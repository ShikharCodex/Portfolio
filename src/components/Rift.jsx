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
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once (no resize spam)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics (better tuned)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  // Mask size (responsive)
  const maskSize = useSpring(isHovered ? 260 : 60, {
    stiffness: 120,
    damping: 20,
  });

  const clipPath = useMotionTemplate`circle(${maskSize}px at ${springX}px ${springY}px)`;

  // Center initial position
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  // Optimized mouse handler (local, not window)
  const handleMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Clamp inside container (prevents edge glitch)
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={!isMobile ? handleMove : undefined}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="h-[100svh] w-full relative overflow-hidden bg-[#030303] flex items-center justify-center"
    >
      {/* ================= BASE LAYER ================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 flex flex-col items-center">
          <TerminalSquare className="text-cyan-400 mb-6 opacity-50" size={40} />

          <h2 className="text-[clamp(2.2rem,8vw,7rem)] font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none mb-4">
            The Code
            <br />
            Is <span className="text-cyan-400/30">Static.</span>
          </h2>

          <p className="text-gray-600 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
            Seek beyond the terminal.
          </p>
        </div>
      </div>

      {/* ================= RIFT LAYER ================= */}
      <motion.div
        style={{
          clipPath: isMobile
            ? "circle(120px at 50% 50%)" // fallback for mobile
            : clipPath,
        }}
        className="absolute inset-0 bg-[#e2e8f0] flex flex-col items-center justify-center px-4 text-center z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000015_2px,transparent_2px)] bg-[size:20px_20px]" />

        <div className="relative z-10 flex flex-col items-center">
          <Sparkles className="text-black mb-6" size={40} />

          <h2 className="text-[clamp(2.2rem,8vw,7rem)] font-black uppercase tracking-tight text-black leading-none mb-4">
            The Vision
            <br />
            Is{" "}
            <span className="text-pink-500 drop-shadow-[0_0_10px_#f0f]">
              Alive.
            </span>
          </h2>

          <p className="text-black tracking-[0.3em] uppercase text-[10px] md:text-xs font-black">
            Let's build something incredible.
          </p>
        </div>
      </motion.div>

      {/* ================= FOOTER ================= */}
      <div className="absolute bottom-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between z-30 text-white gap-4">
        <div className="text-[10px] uppercase tracking-widest font-black flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          End of Transmission
        </div>

        <a
          href="mailto:your.email@example.com"
          className="text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:text-cyan-400 transition"
        >
          Initiate Contact →
        </a>
      </div>
    </section>
  );
}
