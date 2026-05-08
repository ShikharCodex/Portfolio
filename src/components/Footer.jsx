<<<<<<< HEAD
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Terminal, MapPin, Zap, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function SpatialHUDFooter() {
  const [time, setTime] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  // FIXED: Locked exactly to Indian Standard Time (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${formatter.format(now)} IST`);
    };

    updateTime(); // Set immediately on mount
    const interval = setInterval(updateTime, 1000); // Update every exact second
    return () => clearInterval(interval);
  }, []);

  const blobX = useMotionValue(0);
  const blobY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX1 = useSpring(blobX, { stiffness: 30, damping: 20 });
  const springY1 = useSpring(blobY, { stiffness: 30, damping: 20 });
  const springX2 = useSpring(blobX, { stiffness: 20, damping: 25 });
  const springY2 = useSpring(blobY, { stiffness: 20, damping: 25 });
  const springX3 = useSpring(blobX, { stiffness: 10, damping: 30 });
  const springY3 = useSpring(blobY, { stiffness: 10, damping: 30 });

  const hudSpringX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const hudSpringY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    blobX.set(clientX - left - 250);
    blobY.set(clientY - top - 250);
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const marqueeVariants = {
    animate: {
      x: [0, -2000],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  };

  const contactLinks = [
    {
      name: "INITIATE_HANDSHAKE",
      desc: "Email",
      href: "mailto:your@email.com",
    },
    {
      name: "PROTOCOL_DUMP",
      desc: "GitHub",
      href: "https://github.com/ShikharBit",
    },
    {
      name: "NEURAL_LINK",
      desc: "X",
      href: "https://x.com/ShikharByte",
    },
  ];

  return (
    <footer
      id="execution"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative bg-[#030303] min-h-screen md:h-screen md:max-h-[900px] flex flex-col justify-between overflow-hidden border-t border-white/5 z-10 select-none md:cursor-none"
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ x: hudSpringX, y: hudSpringY }}
            className="hidden md:block absolute top-0 left-0 z-50 pointer-events-none origin-center"
          >
            <svg
              width="60"
              h="60"
              viewBox="0 0 60 60"
              fill="none"
              className="drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] -translate-x-1/2 -translate-y-1/2"
            >
              <path d="M1 15V1H15" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M59 15V1H45" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M1 45V59H15" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M59 45V59H45" stroke="#22d3ee" strokeWidth="1.5" />
              <circle cx="30" cy="30" r="1.5" fill="#22d3ee" />
            </svg>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute -top-[110px] -left-[110px] w-[220px] h-[220px]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-md tracking-widest uppercase">
                NODE_TARGET
              </div>
              <Zap
                size={12}
                className="absolute bottom-0 right-1/2 translate-x-1/2 text-fuchsia-400 animate-pulse"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          style={{ x: springX1, y: springY1 }}
          className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          style={{ x: springX2, y: springY2 }}
          className="absolute w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[140px] mix-blend-screen"
        />
        <motion.div
          style={{ x: springX3, y: springY3 }}
          className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] mix-blend-screen"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-[#030303]/60 backdrop-blur-[80px] pointer-events-none" />

      <div className="relative z-20 flex-1 w-full flex items-center justify-center px-4 md:px-12 py-20 md:py-0 overflow-hidden">
        <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-12 md:gap-20 text-center">
          <div className="flex flex-col z-30 pointer-events-none">
            <h2 className="text-[15vw] md:text-[9rem] lg:text-[11rem] font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">
              EXECUTE_ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-[#030303]">
                CONTACT
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl z-30">
            {contactLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="group relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/50 rounded-2xl p-5 md:p-6 flex items-center justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] md:cursor-none"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors tracking-widest uppercase">
                    {link.name}
                  </span>
                  <span className="text-sm md:text-base font-bold text-gray-300 group-hover:text-white transition-colors">
                    {link.desc}
                  </span>
                </div>
                <ExternalLink
                  size={18}
                  className="text-gray-600 group-hover:text-cyan-400 group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                />

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
=======
import { Github, Linkedin, Mail, MapPin, Terminal, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: profile.github, Icon: Github },
    { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
    { label: "X", href: profile.twitter, Icon: Twitter },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--bg)] px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link to="/" className="mb-5 inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--text)] text-[color:var(--bg)]">
              <Terminal size={19} />
            </span>
            <span>
              <span className="block font-semibold">{profile.brand}</span>
              <span className="block text-sm text-[color:var(--muted)]">{profile.title}</span>
            </span>
          </Link>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            Premium full-stack engineering across React, Node.js, AI workflows,
            realtime systems, and interfaces that make a strong first impression.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Navigate</h3>
          <div className="grid gap-3 text-sm text-[color:var(--muted)]">
            {[...navLinks, { label: "Resume", path: "/resume" }, { label: "Articles", path: "/articles" }].map(
              (link) => (
                <Link key={link.path} to={link.path} className="transition hover:text-[color:var(--text)]">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Signal</h3>
          <div className="mb-5 flex items-center gap-2 text-sm text-[color:var(--muted)]">
            <MapPin size={16} className="text-[color:var(--accent)]" />
            {profile.location}, {profile.timezone}
          </div>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon: SocialIcon }) => ( // eslint-disable-line no-unused-vars
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <SocialIcon size={17} />
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
              </a>
            ))}
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="relative z-20 w-full overflow-hidden py-4 md:py-6 border-y border-white/5 bg-[#030303]/80 backdrop-blur-md">
        <motion.div
          className="flex whitespace-nowrap items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[10vw] md:text-[4vw] font-black text-white/80 uppercase tracking-tighter leading-none px-6 md:px-12">
                SHIKHAR X
              </span>
              <Terminal size={32} className="text-white/20" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-20 p-6 md:px-12 text-[10px] md:text-xs font-mono text-gray-500 bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 md:cursor-none">
            return <span className="text-cyan-400">STARS_BUILD</span>;
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 tracking-widest text-gray-400">
            <span className="flex items-center gap-2">
              <MapPin size={12} className="text-orange-500" /> EARTH_NODE
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
              {time}
            </span>
            <span>© {new Date().getFullYear()} Shikharx v0.1</span>
          </div>
        </div>
=======
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>Copyright {year} {profile.brand}. Built with React, Tailwind, Framer Motion, GSAP, and Lenis.</span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
          Available for serious builds
        </span>
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
      </div>
    </footer>
  );
}
