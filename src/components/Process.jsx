import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Network, Layers, Zap } from "lucide-react";

const processSteps = [
  {
    id: "01",
    title: "System Architecture",
    subtitle: "The Foundation",
    icon: Network,
    color: "text-neon-cyan",
    border: "border-neon-cyan/20",
    glow: "shadow-[0_0_30px_rgba(0,255,255,0.2)]",
    desc: "Every scalable application begins with robust logic. Drawing from my academic foundation in computer applications, I map out clean backend data flows before writing a single line of UI code.",
  },
  {
    id: "02",
    title: "Philosophy of Interaction",
    subtitle: "The Experience",
    icon: Layers,
    color: "text-neon-magenta",
    border: "border-neon-magenta/20",
    glow: "shadow-[0_0_30px_rgba(255,0,255,0.2)]",
    desc: "focus on building applications that behave predictably and feel the same across every interaction.",
  },
  {
    id: "03",
    title: "Ruthless Optimization",
    subtitle: "The Performance",
    icon: Zap,
    color: "text-neon-lime",
    border: "border-neon-lime/20",
    glow: "shadow-[0_0_30px_rgba(0,255,0,0.2)]",
    desc: "Performance is a feature, not an afterthought. From optimizing game rendering loops in Canvas to configuring lightning-fast build tools, I ensure maximum frame rates and zero layout shifts.",
  },
];

export default function Process() {
  const targetRef = useRef(null);

  // Track the scroll progress of the massive 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map the vertical scroll progress (0 to 1) to a horizontal translation
  // Since we have 3 screens, we want to move the container left by 66.66% of its width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="h-[300vh] bg-[#030303] relative z-10">
      {/* Sticky container that locks onto the screen */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Subtle Background Text linking the section */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
          <span className="text-[25vw] font-black whitespace-nowrap">
            WORKFLOW
          </span>
        </div>

        {/* The horizontally moving track */}
        <motion.div
          style={{ x }}
          className="flex w-[300vw] h-full items-center relative z-10"
        >
          {processSteps.map((step) => (
            <div
              key={step.id}
              className="w-screen h-full flex items-center justify-center px-6 md:px-24"
            >
              <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                {/* Visual Graphic Side */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div
                    className={`relative w-64 h-64 md:w-96 md:h-96 rounded-full border ${step.border} flex items-center justify-center backdrop-blur-sm bg-white/[0.01] ${step.glow}`}
                  >
                    {/* Rotating Dashed Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className={`absolute inset-4 rounded-full border border-dashed ${step.border}`}
                    />
                    <step.icon
                      size={80}
                      className={`${step.color} opacity-80`}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030303] px-4 text-sm font-mono text-gray-500">
                      STEP_{step.id}
                    </div>
                  </div>
                </div>

                {/* Text Content Side */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className={`text-xs uppercase tracking-[0.4em] font-extrabold ${step.color}`}
                    >
                      {step.subtitle}
                    </span>
                    <div
                      className={`h-[1px] w-12 ${step.color.replace("text-", "bg-")} opacity-50`}
                    />
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.9]">
                    {step.title}
                  </h2>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed border-l border-white/10 pl-6">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
