import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { Sparkles, TerminalSquare, UnfoldHorizontal } from "lucide-react";

export default function DualReality() {
  const containerRef = useRef(null);

  // Center starting position
  const mouseX = useMotionValue(50);

  // Ultra-smooth physics: lower mass and tuned damping prevent "jitter"
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18, mass: 0.8 });

  // 15vw instead of 20vw prevents the angle from getting too extreme on narrow mobile screens
  const clipPath = useMotionTemplate`polygon(calc(${springX}% + 15vw) 0%, 100% 0%, 100% 100%, calc(${springX}% - 15vw) 100%)`;

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;

    // Clamp the value strictly between 0 and 100 to prevent off-screen rendering bugs
    mouseX.set(Math.max(0, Math.min(percent, 100)));
  };

  const handlePointerLeave = () => {
    // Smoothly return to center
    mouseX.set(50);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // pan-y allows normal scrolling on mobile; none prevents pull-to-refresh glitches
      style={{ touchAction: "pan-y" }}
      className="h-[100svh] w-full relative overflow-hidden bg-[#050505] flex items-center justify-center cursor-ew-resize group select-none"
    >
      {/* ================= BACKGROUND: THE STATIC CODE ================= */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-24 lg:px-32">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:50px_50px]" />

        <div className="relative z-10 flex flex-col items-start w-full max-w-7xl">
          <TerminalSquare
            className="text-cyan-500 mb-4 md:mb-6 opacity-60"
            size={32}
          />
          {/* text-rendering-optimizeLegibility ensures crisp fonts during animation */}
          <h2
            className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-zinc-800 leading-[0.85] mb-4 md:mb-6"
            style={{ textRendering: "optimizeLegibility" }}
          >
            System
            <br />
            <span className="text-cyan-500/40">Static.</span>
          </h2>
          <p className="text-gray-500 tracking-[0.3em] md:tracking-[0.4em] uppercase text-[9px] md:text-xs font-bold max-w-xs md:max-w-sm leading-relaxed">
            The architecture is bound by rules. Logic dictates the boundaries of
            what is possible.
          </p>
        </div>
      </div>

      {/* ================= FOREGROUND: THE ALIVE VISION ================= */}
      <motion.div
        style={{ clipPath }}
        // will-change-transform and will-change-[clip-path] force hardware acceleration (GPU) for maximum FPS
        className="absolute inset-0 bg-[#f4f4f5] flex items-center justify-end px-6 md:px-24 lg:px-32 z-20 pointer-events-none will-change-[clip-path] transform-gpu"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:24px_24px]" />

        <div className="relative z-10 flex flex-col items-end w-full max-w-7xl text-right">
          <Sparkles className="text-pink-600 mb-4 md:mb-6" size={32} />
          <h2
            className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tighter text-black leading-[0.85] mb-4 md:mb-6"
            style={{ textRendering: "optimizeLegibility" }}
          >
            Vision
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 drop-shadow-sm">
              Alive.
            </span>
          </h2>
          <p className="text-gray-800 tracking-[0.3em] md:tracking-[0.4em] uppercase text-[9px] md:text-xs font-black max-w-xs md:max-w-sm leading-relaxed">
            Break the grid. Creativity flows beyond the terminal. Let's build
            something unforgettable.
          </p>
        </div>
      </motion.div>

      {/* ================= CENTER DRAG INDICATOR ================= */}
      <motion.div
        style={{ left: useMotionTemplate`${springX}%` }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none will-change-transform"
      >
        <div className="w-[1px] h-16 md:h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent mix-blend-difference" />
        <div className="bg-white/10 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-white/20 my-3 md:my-4 mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <UnfoldHorizontal size={16} />
        </div>
        <div className="w-[1px] h-16 md:h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent mix-blend-difference" />
      </motion.div>

      {/* ================= FOOTER ================= */}
      <div className="absolute bottom-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex flex-row items-center justify-between z-40 gap-4 mix-blend-difference pointer-events-none">
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-widest font-black flex items-center gap-2 md:gap-3 text-white">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
          <span className="hidden sm:inline">Interaction Required</span>
          <span className="sm:hidden">Swipe</span>
        </div>

        <a
          href="mailto:your.email@example.com"
          className="text-[10px] md:text-sm font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-white hover:text-pink-400 transition-colors pointer-events-auto"
        >
          Initiate Contact →
        </a>
      </div>
    </section>
  );
}
