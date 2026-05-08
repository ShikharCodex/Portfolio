import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, GraduationCap, Flame, Bone } from "lucide-react";

export default function Vault() {
  const targetRef = useRef(null);

  // Track the scroll progress of this massive 400vh section
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Complex physics: Mapping vertical scroll to 3D fan-out movements
  // Mobile uses smaller spread values (vw/vh) than desktop to stay on screen
  const spreadYTop = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ["0vh", "-28vh"],
  );
  const spreadYBottom = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    ["0vh", "28vh"],
  );
  const spreadXLeft = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    [
      "0vw",
      typeof window !== "undefined" && window.innerWidth < 768
        ? "-15vw"
        : "-25vw",
    ],
  );
  const spreadXRight = useTransform(
    scrollYProgress,
    [0.1, 0.5],
    [
      "0vw",
      typeof window !== "undefined" && window.innerWidth < 768
        ? "15vw"
        : "25vw",
    ],
  );

  const rotate1 = useTransform(scrollYProgress, [0.1, 0.5], [0, -15]);
  const rotate2 = useTransform(scrollYProgress, [0.1, 0.5], [0, 15]);
  const rotate3 = useTransform(scrollYProgress, [0.1, 0.5], [0, -10]);
  const rotate4 = useTransform(scrollYProgress, [0.1, 0.5], [0, 10]);

  // Center text reveals after the cards have fanned out
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.4, 1], [0.8, 1.2]);

  const cards = [
    {
      id: 1,
      title: "Foundations",
      desc: "I focus on building strong fundamentals and understanding how software works from the ground up.",
      icon: GraduationCap,
      color: "text-neon-cyan",
      border: "border-neon-cyan/30",
      glow: "shadow-[0_0_40px_rgba(0,255,255,0.2)]",
      x: spreadXLeft,
      y: spreadYTop,
      rotate: rotate1,
      zIndex: 40,
    },
    {
      id: 2,
      title: "What I Build",
      desc: "I create web applications and interactive projects that are simple, functional, and reliable.",
      icon: Terminal,
      color: "text-neon-magenta",
      border: "border-neon-magenta/30",
      glow: "shadow-[0_0_40px_rgba(255,0,255,0.2)]",
      x: spreadXRight,
      y: spreadYTop,
      rotate: rotate2,
      zIndex: 30,
    },
    {
      id: 3,
      title: "Work Style",
      desc: "I focus on writing clean code, staying consistent, and building things step by step with clarity.",
      icon: Flame,
      color: "text-orange-500",
      border: "border-orange-500/30",
      glow: "shadow-[0_0_40px_rgba(249,115,22,0.2)]",
      x: spreadXLeft,
      y: spreadYBottom,
      rotate: rotate3,
      zIndex: 20,
    },
    {
      id: 4,
      title: "The Companion",
      desc: "When the terminal is closed, you'll find me debugging offline logic with the ultimate companion—my Labrador.",
      icon: Bone,
      color: "text-neon-lime",
      border: "border-neon-lime/30",
      glow: "shadow-[0_0_40px_rgba(0,255,0,0.2)]",
      x: spreadXRight,
      y: spreadYBottom,
      rotate: rotate4,
      zIndex: 10,
    },
  ];

  return (
    <section
      ref={targetRef}
      className="hidden lg:block h-[400vh] bg-[#030303] relative z-10"
    >
      {/* Sticky container that locks the viewport in place while scrolling */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[1000px]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-gradient-radial from-neon-magenta/5 via-neon-cyan/5 to-transparent blur-[100px] rounded-full pointer-events-none" />

        {/* Hidden Center Text that reveals when cards fan out */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute z-0 flex flex-col items-center justify-center text-center px-4"
        >
          <div className="w-16 h-[2px] bg-white mb-6 shadow-[0_0_15px_#fff]" />
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-white leading-[0.85] mix-blend-overlay">
            Beyond
            <br />
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta mix-blend-normal">
              Code.
            </span>
          </h2>
        </motion.div>

        {/* The Fanning Cards */}
        {cards.map((card) => (
          <motion.div
            key={card.id}
            style={{
              x: card.x,
              y: card.y,
              rotateZ: card.rotate,
              zIndex: card.zIndex,
            }}
            className={`absolute w-[280px] md:w-[350px] aspect-[4/5] bg-[#0a0a0a]/90 backdrop-blur-xl rounded-3xl border ${card.border} ${card.glow} p-8 flex flex-col justify-between shadow-2xl origin-center will-change-transform`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-1 rounded-full backdrop-blur-md">
                0{card.id}
              </span>
              <card.icon size={28} className={card.color} />
            </div>

            <div className="mt-auto">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                {card.desc}
              </p>
            </div>

            {/* Glossy Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-3xl pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
