import { useState, useEffect } from "react";

/* ---------------- TYPEWRITER PARAGRAPH ---------------- */
const TypeWriter = ({ text, speed = 40 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayText}</span>;
};

/* ---------------- SKILLS TYPEWRITER ---------------- */
const SkillsTypewriter = ({ skills, speed = 80 }) => {
  const [text, setText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = skills[skillIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);

          if (charIndex + 1 === current.length) {
            setDeleting(true);
          }
        } else {
          setText(current.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);

          if (charIndex === 0) {
            setDeleting(false);
            setSkillIndex((prev) => (prev + 1) % skills.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, skillIndex, skills, speed]);

  return (
    <span className="text-gray-300 font-semibold tracking-wide">
      {text}
      <span className="animate-pulse ml-1 text-gray-500">|</span>
    </span>
  );
};

export default function Hero() {
  return (
    <section
      id="pinpoint"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 h-full min-h-screen flex flex-col justify-between">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col justify-between h-full min-h-screen">
          {/* TOP SECTION */}
          <div className="flex-1 flex flex-col justify-center">
            {/* BIG TEXT */}
            <h1 className="font-extrabold uppercase tracking-tight leading-[0.85] text-[clamp(3rem,8vw,9rem)]">
              <span className="block text-gray-200">Shikhar</span>
              <span className="block text-gray-300">don't </span>
              <span className="block text-gray-400">like Homo</span>
              <span className="block text-gray-500">Sapiens</span>
            </h1>

            {/* ✅ FIXED ALIGNMENT + CLEAN COLOR */}
            <div className="mt-4 ml-2 text-lg md:text-xl font-medium">
              <SkillsTypewriter
                skills={[
                  "React Developer",
                  "Node.js Developer",
                  "Java Programmer",
                  "Tech Enthusiast",
                  "Full Stack Builder",
                ]}
              />
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-6">
            <div className="max-w-md text-sm md:text-base text-gray-400 leading-relaxed">
              <TypeWriter text="I build immersive digital experiences that blur the line between design and development." />
            </div>

            <button className="px-6 py-3 rounded-full border border-white/20 text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 w-fit">
              Plant Trees
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
