import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const MotionAnchor = motion.a;
const MotionSpan = motion.span;

export default function MagneticButton({
  children,
  to,
  href,
  download,
  icon = "arrow",
  variant = "primary",
  className = "",
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 });

  const handleMove = (event) => {
    if (!ref.current || window.matchMedia("(max-width: 768px)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]";
  const variants = {
    primary:
      "bg-[color:var(--text)] text-[#07100b] hover:bg-[color:var(--accent)]",
    secondary:
      "hairline bg-[color:var(--surface)] text-[color:var(--text)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]",
    ghost:
      "text-[color:var(--text)] hover:bg-[color:var(--surface-strong)]",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon === "download" ? (
        <Download size={17} className="transition-transform group-hover:-translate-y-0.5" />
      ) : (
        <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        <MotionSpan
          ref={ref}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          whileTap={{ scale: 0.98 }}
          className={[base, variants[variant], className].join(" ")}
        >
          {content}
        </MotionSpan>
      </Link>
    );
  }

  return (
    <MotionAnchor
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.98 }}
      className={[base, variants[variant], className].join(" ")}
      href={href}
      download={download}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {content}
    </MotionAnchor>
  );
}
