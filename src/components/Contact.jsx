import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Gamepad2,
} from "lucide-react";

// Highly interactive physics-based button
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth magnetic pull and snap-back
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4); // Magnetic strength
    y.set(middleY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href="mailto:your.email@example.com"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="relative group px-12 md:px-20 py-8 md:py-10 rounded-full border border-white/20 overflow-hidden cursor-none flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      {/* Liquid Fill Effect */}
      <div className="absolute inset-0 bg-neon-cyan translate-y-[100%] rounded-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-all duration-700 ease-in-out z-0" />

      <span className="relative z-10 text-white group-hover:text-black font-black uppercase tracking-[0.2em] text-xl md:text-4xl flex items-center gap-4 transition-colors duration-300">
        Initiate Transmission{" "}
        <Mail size={32} className="group-hover:animate-bounce" />
      </span>
    </motion.a>
  );
};

export default function Contact() {
  const containerRef = useRef(null);

  // Background Spotlight Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-[#030303] relative py-32 md:py-48 font-sans min-h-screen flex flex-col items-center justify-center overflow-hidden z-10"
    >
      {/* Dynamic Background Spotlight */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-neon-magenta/10 via-neon-cyan/5 to-transparent blur-[100px] rounded-full pointer-events-none z-0"
      />

      {/* Grid Floor Effect */}
      <div
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-neon-cyan shadow-neon-cyan" />
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-neon-cyan">
              Connection Established
            </h2>
            <div className="w-12 h-[2px] bg-neon-cyan shadow-neon-cyan" />
          </div>

          <h3 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase tracking-tighter text-white leading-none mb-6 mix-blend-difference">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
              Build.
            </span>
          </h3>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Currently stationed in Kanpur, UP. Whether you have a challenging
            backend logic problem, need a highly animated frontend, or just want
            to swap PC gaming recommendations, my terminal is always open.
          </p>
        </motion.div>

        {/* The Giant Magnetic Button */}
        <div className="py-12 md:py-20 w-full flex justify-center cursor-crosshair">
          <MagneticButton />
        </div>

        {/* Minimalist Footer / Socials */}
        <div className="w-full mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
            <MapPin size={14} className="text-neon-lime" /> Base: Kanpur, India
          </div>

          <div className="flex gap-8">
            {[Github, Linkedin, Twitter, Gamepad2].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{
                  y: -5,
                  color: "#0ff",
                  filter: "drop-shadow(0 0 10px #0ff)",
                }}
                className="text-gray-500 transition-colors duration-300"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>

          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
            System Online{" "}
            <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
