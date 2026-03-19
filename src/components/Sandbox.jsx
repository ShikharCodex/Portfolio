import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Terminal, Activity, Disc, X, Minus, Square, Cpu } from "lucide-react";

// Draggable Window Component
const Window = ({
  title,
  icon: Icon,
  children,
  defaultX,
  defaultY,
  zIndex,
  bringToFront,
  color,
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onPointerDown={bringToFront}
      initial={{ x: defaultX, y: defaultY, opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{ zIndex }}
      className={`absolute w-[320px] md:w-[400px] flex flex-col rounded-xl overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
    >
      {/* OS Window Header */}
      <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2 text-gray-400">
          <Icon size={14} className={color} />
          <span className="text-[10px] font-mono uppercase tracking-widest">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Minus
            size={12}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          />
          <Square
            size={10}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          />
          <X
            size={14}
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          />
        </div>
      </div>

      {/* Window Content */}
      <div className="p-6 relative">
        <div
          className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${color.replace("text-", "")} to-transparent opacity-50`}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default function Sandbox() {
  const containerRef = useRef(null);
  const [order, setOrder] = useState(["terminal", "metrics", "media"]);
  const [terminalText, setTerminalText] = useState("");
  const fullText =
    "> INITIALIZING CORE SYSTEMS...\n> BYPASSING MAINFRAME...\n> LOCATING FUEL SOURCE...\n> LOCAL PANIPURI VENDOR FOUND.\n> SYSTEM RECHARGE IMMINENT.\n> READY FOR DEPLOYMENT.";

  // Simulate typing effect for the terminal
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  const bringToFront = (id) => {
    setOrder((prev) => {
      const newOrder = prev.filter((item) => item !== id);
      return [...newOrder, id];
    });
  };

  return (
    <section
      id="sandbox"
      ref={containerRef}
      className="bg-[#030303] relative py-32 font-sans min-h-[120vh] overflow-hidden z-10"
    >
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 relative z-0 mb-10 pointer-events-none">
        <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-white/10 leading-none">
          Interactive <br /> Workspace.
        </h2>
        <p className="text-neon-cyan text-sm font-mono tracking-widest mt-4 uppercase animate-pulse">
          Drag windows to interact
        </p>
      </div>

      {/* The Draggable Area */}
      <div className="relative w-full h-[800px] max-w-[95rem] mx-auto px-6 md:px-12">
        {/* WINDOW 1: The Terminal */}
        <Window
          title="engine.exe"
          icon={Terminal}
          color="text-neon-cyan"
          defaultX={20}
          defaultY={20}
          zIndex={order.indexOf("terminal")}
          bringToFront={() => bringToFront("terminal")}
        >
          <div className="h-[200px] font-mono text-xs md:text-sm text-neon-cyan whitespace-pre-wrap leading-relaxed">
            {terminalText}
            <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-pulse" />
          </div>
        </Window>

        {/* WINDOW 2: Core Metrics */}
        <Window
          title="sys_metrics.app"
          icon={Activity}
          color="text-neon-lime"
          defaultX={
            typeof window !== "undefined" && window.innerWidth > 768 ? 400 : 40
          }
          defaultY={150}
          zIndex={order.indexOf("metrics")}
          bringToFront={() => bringToFront("metrics")}
        >
          <div className="h-[200px] flex flex-col justify-between">
            <div className="flex justify-between items-end h-32 gap-2 border-b border-white/10 pb-4">
              {[40, 70, 45, 90, 60, 85, 30, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="w-full bg-neon-lime/80 shadow-[0_0_10px_#0f0] rounded-t-sm"
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase mt-4">
              <span>CPU Load: 24%</span>
              <span className="flex items-center gap-1">
                <Cpu size={12} className="text-neon-lime" /> Optimal
              </span>
            </div>
          </div>
        </Window>

        {/* WINDOW 3: Vibe Module */}
        <Window
          title="vibe_module.sys"
          icon={Disc}
          color="text-neon-magenta"
          defaultX={
            typeof window !== "undefined" && window.innerWidth > 768 ? 200 : 60
          }
          defaultY={350}
          zIndex={order.indexOf("media")}
          bringToFront={() => bringToFront("media")}
        >
          <div className="h-[200px] flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-neon-magenta/50 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,255,0.2)]"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-magenta/20 to-transparent flex items-center justify-center border border-neon-magenta/30">
                <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-neon-magenta/50" />
              </div>
            </motion.div>
            <div className="absolute bottom-0 left-0 w-full text-center">
              <p className="text-[10px] font-mono text-neon-magenta tracking-widest uppercase animate-pulse">
                Playing: Lo-Fi Beats
              </p>
            </div>
          </div>
        </Window>
      </div>
    </section>
  );
}
