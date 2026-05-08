import { useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MotionDiv = motion.div;

export default function CursorAura() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Main cursor position (fast, precise)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 600, damping: 40, mass: 0.15 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 40, mass: 0.15 });

  // Outer ring (slower, laggy follow for organic feel)
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 26, mass: 0.4 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 26, mass: 0.4 });

  // Scale up on hovering interactive elements
  const ringScale = useSpring(hovering ? 1.8 : 1, { stiffness: 300, damping: 22 });
  const dotScale = useSpring(hovering ? 0.5 : 1, { stiffness: 300, damping: 22 });

  // Rotation based on horizontal velocity for a dynamic feel
  const rotate = useTransform(springX, (latest) => (latest % 360) * 0.15);

  const checkHover = useCallback((target) => {
    if (!target) return false;
    const el = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='grow']");
    return Boolean(el);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return undefined;

    const move = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setVisible(true);
      setHovering(checkHover(event.target));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY, checkHover]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      {/* Outer crosshair frame — slow follow with subtle rotation */}
      <MotionDiv
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          rotate,
        }}
        className="absolute -left-5 -top-5 h-10 w-10"
      >
        {/* Crosshair lines */}
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--accent)] to-transparent opacity-50" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent opacity-50" />

        {/* Corner brackets */}
        <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-[color:var(--accent)] opacity-70" />
        <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-[color:var(--accent)] opacity-70" />
        <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[color:var(--accent)] opacity-70" />
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-[color:var(--accent)] opacity-70" />
      </MotionDiv>

      {/* Glow halo — soft ambient light behind cursor */}
      <MotionDiv
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
        className="absolute -left-16 -top-16 h-32 w-32 rounded-full opacity-[0.12] blur-2xl"
      />

      {/* Center dot — fast, precise tracking */}
      <MotionDiv
        style={{
          x: springX,
          y: springY,
          scale: dotScale,
        }}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[color:var(--accent)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--accent)] opacity-30" />
      </MotionDiv>
    </div>
  );
}
