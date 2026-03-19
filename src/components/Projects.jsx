import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "CodeMesh",
    category: "Web Development",
    description:
      "CodeMesh is the SuperFast Code Sharing Platform, just, COPY, PASTE and GO.",
    tech: ["Node", "Express", "MongoDB", "React"],
    glow: "from-neon-cyan/30 via-neon-cyan/15 to-transparent",
    accent: "stroke-neon-cyan",
    link: "https://www.codemesh.space/",
  },
  {
    id: "02",
    title: "Chat Application",
    category: "Interactive Logic",
    description: "A modern reimagining Chat Application.",
    tech: ["Socket.io", "Node", "Express", "MongoDB", "React"],
    glow: "from-neon-lime/30 via-neon-lime/15 to-transparent",
    accent: "stroke-neon-lime",
    link: "https://xchat-ei43.onrender.com/",
  },
  {
    id: "03",
    title: "Image Classifier Model",
    category: "Artificial Intelligence",
    description:
      "A Image Classifier Model using Convolutional Neural Network and Transfer Learning.",
    tech: ["Scikit Learn", "Python", "MatplotLIB - for data visualization"],
    glow: "from-neon-magenta/30 via-neon-magenta/15 to-transparent",
    accent: "stroke-neon-magenta",
    link: "https://github.com/ShikharBit",
  },
];

const FloatingParticles = ({ color }) => {
  const particles = useMemo(() => Array.from({ length: 30 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${color} shadow-[0_0_8px_currentColor]`}
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: color.includes("cyan")
              ? "#0ff"
              : color.includes("lime")
                ? "#0f0"
                : "#f0f",
          }}
          animate={{
            y: [0, (Math.random() - 0.7) * 120],
            opacity: [0.1, 1, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
};

const ProjectWireframe = ({ projectIndex, accentClass }) => {
  const paths = [
    "M 10 10 L 90 10 L 90 90 L 10 90 Z M 10 30 L 90 30 M 10 50 L 90 50 M 10 70 L 90 70 M 30 10 L 30 90",
    "M 10 50 Q 25 20, 40 50 T 70 50 T 100 50 M 10 10 L 10 90 M 30 10 L 30 90",
    "M 10 90 L 30 40 L 50 60 L 70 20 L 90 70 L 90 90 Z",
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] opacity-20 group-hover:opacity-100 transition-all duration-700 z-10 ${accentClass}`}
      preserveAspectRatio="none"
      style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
    >
      <motion.path
        d={paths[projectIndex % paths.length]}
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative px-6 md:px-24 overflow-hidden"
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] sm:text-[25vw] md:text-[18vw] lg:text-[25vw] font-black pointer-events-none z-0 ${project.accent.replace("stroke", "text")}`}
        style={{ opacity: 0.04, filter: "blur(2px)" }}
      >
        {project.id}
      </div>
      <div
        className={`w-full max-w-[95rem] mx-auto flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"} items-center gap-10 md:gap-14 lg:gap-28`}
      >
        <motion.div
          style={{ y: yText }}
          className="w-full lg:w-1/2 relative z-10 flex flex-col"
        >
          <div className="flex items-center gap-5 mb-7">
            <span
              className={`${project.accent.replace("stroke", "text")} font-black text-sm shadow-neon`}
            >
              {project.id}
            </span>
            <div className="h-[2px] w-14 bg-gray-800" />
            <span className="text-gray-300 uppercase tracking-[0.25em] text-[11px] font-bold">
              {project.category}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter text-white mb-9 leading-[0.85] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {project.title}
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-12 max-w-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 mb-14">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full border border-gray-800 text-[10px] uppercase tracking-widest text-gray-200 backdrop-blur-md bg-white/5 hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 10 }}
            className="flex items-center gap-6 group cursor-pointer w-fit"
          >
            <div
              className={`w-12 h-[3px] ${project.accent.replace("stroke", "bg")} transition-all duration-500 ease-out`}
              style={{
                boxShadow: `0 0 15px currentColor`,
                color: project.accent.includes("cyan")
                  ? "#0ff"
                  : project.accent.includes("lime")
                    ? "#0f0"
                    : "#f0f",
              }}
            />
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold group-hover:text-white transition-colors text-gray-200">
              View Projects 🔭
            </span>
          </motion.a>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] relative overflow-hidden rounded-3xl group border border-white/10 bg-[#070707] z-10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          whileHover={{
            borderColor: project.accent.includes("cyan")
              ? "rgba(0,255,255,0.3)"
              : project.accent.includes("lime")
                ? "rgba(0,255,0,0.3)"
                : "rgba(255,0,255,0.3)",
          }}
          transition={{ duration: 0.5 }}
        >
          {/* 🎥 VIDEO BACKGROUND (NEW) */}

          {/* DARK OVERLAY FOR READABILITY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* EXISTING EFFECTS (UNCHANGED) */}
          <motion.div
            style={{ y: yImage }}
            className={`absolute inset-[-30%] bg-gradient-to-br ${project.glow} opacity-60 group-hover:opacity-90 blur-[100px] transition-opacity duration-1000 ease-out`}
          />

          <div
            className={`absolute inset-0 border-2 ${project.accent.replace(
              "stroke",
              "border",
            )} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px] pointer-events-none`}
          />

          <FloatingParticles color={project.accent.replace("stroke", "bg")} />
          <ProjectWireframe projectIndex={index} accentClass={project.accent} />

          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:35px_35px]" />
        </motion.div>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-[#030303] relative z-10 pt-24 sm:pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden font-sans"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-radial from-neon-magenta/15 via-transparent to-transparent blur-[100px] pointer-events-none" />
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6"
        >
          <div className="w-16 h-[4px] bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-neon-cyan" />
          <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-extrabold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700/50 leading-none">
            Digital
            <br />
            Craft<span className="text-neon-cyan opacity-50">.</span>
          </h2>
        </motion.div>
      </div>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
