import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as] || motion.div;
  const staticPreview =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("static");

  if (staticPreview) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
