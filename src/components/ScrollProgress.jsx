import { motion, useScroll, useSpring } from "framer-motion";

const MotionDiv = motion.div;

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <MotionDiv
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]"
    />
  );
}
