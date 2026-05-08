import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { profile } from "../data/portfolio";

const MotionDiv = motion.div;

export default function LoadingScreen({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const fallback = window.setTimeout(onDone, 1400);
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".loader-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8 })
        .fromTo(".loader-mark", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 }, 0.12)
        .to(ref.current, {
          opacity: 0,
          duration: 0.35,
          delay: 0.18,
          onComplete: () => {
            window.clearTimeout(fallback);
            onDone();
          },
        });
    }, ref);

    return () => {
      window.clearTimeout(fallback);
      context.revert();
    };
  }, [onDone]);

  return (
    <MotionDiv
      ref={ref}
      className="fixed inset-0 z-[100] grid place-items-center bg-[color:var(--bg)]"
    >
      <div className="w-64">
        <div className="loader-mark mb-4 flex items-center justify-between text-sm font-semibold">
          <span>{profile.brand}</span>
          <span className="text-[color:var(--accent)]">BUILDING SIGNAL</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[color:var(--surface-strong)]">
          <div className="loader-line h-full origin-left rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]" />
        </div>
      </div>
    </MotionDiv>
  );
}
