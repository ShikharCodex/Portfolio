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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  // Slightly larger base size for better mobile tap target visibility
  const maskSize = useSpring(isHovered ? 260 : 80, {
    stiffness: 120,
    damping: 20,
  });

  const clipPath = useMotionTemplate`circle(${maskSize}px at ${springX}px ${springY}px)`;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  // onPointerMove handles both Mouse AND Touch natively
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      // touch-none ensures smooth dragging on mobile without scrolling the page
      style={{ touchAction: "none" }}
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
        style={{ clipPath }}
        // pointer-events-none prevents this layer from blocking touch events
        className="absolute inset-0 bg-[#e2e8f0] flex flex-col items-center justify-center px-4 text-center z-20 pointer-events-none"
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
      {/* pointer-events-none on parent, auto on link, to keep links clickable while letting background track touches */}
      <div className="absolute bottom-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row items-center justify-between z-30 text-white gap-4 pointer-events-none">
        <div className="text-[10px] uppercase tracking-widest font-black flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          End of Transmission
        </div>

        <a
          href="mailto:your.email@example.com"
          className="text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:text-cyan-400 transition pointer-events-auto"
        >
          Initiate Contact →
        </a>
      </div>
    </section>
  );
}
