import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- INTERNAL ANIMATION COMPONENTS ---

const InternalWireframe = ({ hex }) => {
  const paths = [
    "M 10 10 L 90 10 L 90 90 L 10 90 Z M 10 30 L 90 30 M 10 50 L 90 50 M 10 70 L 90 70 M 30 10 L 30 90",
    "M 10 50 Q 25 20, 40 50 T 70 50 T 100 50 M 10 10 L 10 90 M 30 10 L 30 90",
    "M 10 90 L 30 40 L 50 60 L 70 20 L 90 70 L 90 90 Z",
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] opacity-20 group-hover:opacity-100 transition-all duration-700 z-10"
      preserveAspectRatio="none"
      style={{ stroke: hex, filter: `drop-shadow(0 0 8px ${hex})` }}
    >
      <motion.path
        d={paths[0]}
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

const InternalParticles = ({ hex }) => {
  const particles = useMemo(() => Array.from({ length: 25 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute border"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderColor: hex,
            backgroundColor: Math.random() > 0.5 ? hex : "transparent",
          }}
          animate={{
            y: [0, (Math.random() - 0.7) * 150],
            rotate: [0, 180, 360],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const InternalGridWave = ({ hex }) => (
  <motion.div
    animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
    className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 z-10"
    style={{
      backgroundImage: `linear-gradient(to right, ${hex} 1px, transparent 1px), linear-gradient(to bottom, ${hex} 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
    }}
  />
);

const InternalScanline = ({ hex }) => (
  <div className="absolute inset-0 overflow-hidden z-10">
    <motion.div
      animate={{ y: ["-100%", "300%"] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-24 opacity-40 group-hover:opacity-80 transition-opacity"
      style={{
        background: `linear-gradient(to bottom, transparent, ${hex}, transparent)`,
      }}
    />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${hex} 2px, ${hex} 4px)`,
      }}
    />
  </div>
);

const InternalPulseRings = ({ hex }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-none border-[3px]"
        style={{ borderColor: hex, width: i * 80, height: i * 80 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0, 0.8],
          rotate: [0, 90],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const InternalBarcode = ({ hex }) => {
  const bars = useMemo(() => Array.from({ length: 18 }), []);
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-20 group-hover:opacity-70 transition-opacity duration-500 z-10">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="bg-current"
          style={{ color: hex, width: Math.random() * 15 + 4 }}
          animate={{ height: ["80%", "20%", "80%"] }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 1.5 + 0.5,
            ease: "circInOut",
          }}
        />
      ))}
    </div>
  );
};

const InternalRadar = ({ hex }) => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center z-10 opacity-30 group-hover:opacity-90 transition-opacity duration-700">
    <div
      className="absolute w-[150%] h-[150%] rounded-full border-4 border-dashed"
      style={{ borderColor: `${hex}40` }}
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className="absolute w-[150%] h-[150%] rounded-full"
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, ${hex} 90deg, transparent 90deg)`,
      }}
    />
  </div>
);

const InternalBlocks = ({ hex }) => {
  const blocks = useMemo(() => Array.from({ length: 8 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-10">
      {blocks.map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-[3px] bg-black/80 backdrop-blur-sm"
          style={{
            borderColor: hex,
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${(i / 8) * 100}%`,
          }}
          animate={{ y: ["110vh", "-30vh"], rotate: [0, 90, 180] }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 6 + 4,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

// --- DATA ---

const projects = [
  {
    id: "01",
    title: "CodeMesh",
    category: "Web Tools and Utilities",
    description:
      "CodeMesh is the SuperFast Code Sharing Platform, just, COPY, PASTE and GO.",
    tech: ["Node", "Express", "MongoDB", "React"],
    hex: "#0ff",
    link: "https://www.codemesh.space/",
    innerAnim: "scanline",
  },
  {
    id: "02",
    title: "Elariax",
    category:
      "Logical Custom AI with Real Time Learning and Examination System",
    description:
      "A Modern Full Customizable AI Companion for Me only But you can make your own too",
    tech: ["LLM AI", "Node", "Express", "MongoDB", "React"],
    hex: "#0f0",
    link: "https://elariax.vercel.app/",
    innerAnim: "particles",
  },
  {
    id: "03",
    title: "Image Classifier",
    category: "Artificial Intelligence",
    description:
      "A Image Classifier Model using Convolutional Neural Network and Transfer Learning.",
    tech: ["Scikit Learn", "Python", "MatplotLIB"],
    hex: "#f0f",
    link: "https://github.com/ShikharBit",
    innerAnim: "wireframe",
  },
  {
    id: "04",
    title: "Locofy",
    category: "Web Community Application",
    description:
      "A website that provides the database of the lost ones and helps to find them using the power of community.",
    tech: ["React", "Nodejs", "Cloudinary", "MongoDB", "Express"],
    hex: "#3b82f6",
    link: "https://Locofy.xyz/",
    innerAnim: "grid",
  },
  {
    id: "02",
    title: "Chat Application",
    category: "Interactive Logic",
    description: "A modern reimagining Chat Application.",
    tech: ["Socket.io", "Node", "Express", "MongoDB", "React"],
    hex: "#0f0",
    link: "https://xchat-ei43.onrender.com/",
    innerAnim: "particles",
  },
  {
    id: "06",
    title: "Rooter",
    category: "Productivity Tools",
    description:
      "A robust note-taking application engineered with rate limiting to prevent abuse and ensure reliable, consistent performance.",
    tech: [
      "Redis",
      "React",
      "MongoDB",
      "Node",
      "Express",
      "Rate Limiting Algorithm",
    ],
    hex: "#a855f7",
    link: "#",
    innerAnim: "radar",
  },
  {
    id: "07",
    title: "AI Teaching Simulation",
    category: "Educational AI",
    description:
      "[⚙️ IN PROGRESS ⚙️] An AI-powered educational platform that simulates real-world teaching scenarios, allowing educators to practice and refine their skills in a risk-free environment.",
    tech: ["", "", ""],
    hex: "#facc15",
    link: "#",
    innerAnim: "rings",
  },
  {
    id: "08",
    title: "Portfolio V1",
    category: "Web Design",
    description:
      "The previous iteration of my personal developer portfolio, focused on complex CSS animations.",
    tech: ["React", "Tailwind CSS", "Lenis", "GSAP", "Framer Motion"],
    hex: "#ef4444",
    link: "https://www.shikharx.xyz/",
    innerAnim: "blocks",
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const renderInnerAnimation = (type, hex) => {
    switch (type) {
      case "scanline":
        return <InternalScanline hex={hex} />;
      case "particles":
        return <InternalParticles hex={hex} />;
      case "wireframe":
        return <InternalWireframe hex={hex} />;
      case "grid":
        return <InternalGridWave hex={hex} />;
      case "barcode":
        return <InternalBarcode hex={hex} />;
      case "radar":
        return <InternalRadar hex={hex} />;
      case "rings":
        return <InternalPulseRings hex={hex} />;
      case "blocks":
        return <InternalBlocks hex={hex} />;
      default:
        return null;
    }
  };

  // Base Brutalist Container + Framer Motion Hover Physics
  const brutalistContainerAnim = {
    initial: { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      x: -8,
      y: -8,
      boxShadow: `16px 16px 0px ${project.hex}`,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative px-6 md:px-24 overflow-hidden"
    >
      {/* Background large numbers */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] sm:text-[25vw] md:text-[18vw] lg:text-[25vw] font-black pointer-events-none z-0`}
        style={{ opacity: 0.03, color: project.hex }}
      >
        {project.id}
      </div>

      <div
        className={`w-full max-w-[95rem] mx-auto flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"} items-center gap-10 md:gap-14 lg:gap-28`}
      >
        {/* TEXT SECTION */}
        <motion.div
          style={{ y: yText }}
          className="w-full lg:w-1/2 relative z-10 flex flex-col"
        >
          <div className="flex items-center gap-5 mb-7">
            <span
              className={`font-black text-sm`}
              style={{
                color: project.hex,
                textShadow: `4px 4px 0px rgba(0,0,0,0.8)`,
              }}
            >
              {project.id}
            </span>
            <div className="h-[4px] w-14 bg-gray-700" />
            <span className="text-gray-300 uppercase tracking-[0.25em] text-[11px] font-bold">
              {project.category}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tighter text-white mb-9 leading-[0.85] drop-shadow-[4px_4px_0px_#111]">
            {project.title}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-lg font-medium">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 mb-14">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-5 py-2 border-2 text-[10px] uppercase tracking-widest font-bold bg-black text-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_currentColor] transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  hover: { color: project.hex },
                }}
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
            className="flex items-center gap-6 group cursor-pointer w-fit bg-black border-2 border-white/10 p-4 hover:border-white/40 transition-colors"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-500`}
              style={{ backgroundColor: project.hex }}
            >
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-black text-gray-200">
              Access Record
            </span>
          </motion.a>
        </motion.div>

        {/* IMAGE/ANIMATION SECTION (ALL BRUTALIST NOW) */}
        <motion.div
          initial={brutalistContainerAnim.initial}
          whileInView={brutalistContainerAnim.whileInView}
          whileHover={brutalistContainerAnim.hover}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] relative overflow-hidden group bg-[#070707] z-10"
          style={{
            border: "4px solid #333",
            borderRadius: "0px", // Strict Brutalist
            boxShadow: "12px 12px 0px #111",
          }}
        >
          {/* DARK OVERLAY FOR DEPTH */}
          <div className="absolute inset-0 bg-black/60 z-0" />

          {/* PARALLAX GLOW FOR DEPTH (Muted for Brutalism, sharp edges) */}
          <motion.div
            style={{ y: yImage }}
            className="absolute inset-[-50%] bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-out z-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, ${project.hex} 0%, transparent 70%)`,
            }}
          />

          {/* DYNAMIC INTERNAL ANIMATION COMPONENT */}
          {renderInnerAnimation(project.innerAnim, project.hex)}

          {/* BASE BRUTALIST GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_2px,transparent_2px),linear-gradient(to_bottom,#ffffff05_2px,transparent_2px)] bg-[size:40px_40px] z-0 pointer-events-none" />

          {/* CORNER ACCENTS */}
          <div
            className="absolute top-4 left-4 w-4 h-4 border-t-4 border-l-4 z-20 transition-colors duration-300"
            style={{ borderColor: project.hex }}
          />
          <div
            className="absolute bottom-4 right-4 w-4 h-4 border-b-4 border-r-4 z-20 transition-colors duration-300"
            style={{ borderColor: project.hex }}
          />
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
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="w-24 h-[6px] bg-white" />
          <h2 className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-white leading-[0.85] drop-shadow-[8px_8px_0px_#111]">
            Project
            <br />
            Database<span className="text-[#0ff]">_</span>
          </h2>
        </motion.div>
      </div>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
