// MaxTheme.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ─── CUSTOM DOG CURSOR (no re-renders, ultra‑smooth) ────────────────
const SectionCursor = ({ containerRef }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 28);
      mouseY.set(e.clientY - rect.top - 28);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setClicked(true);
    const onUp = () => setTimeout(() => setClicked(false), 300);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [containerRef, mouseX, mouseY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute top-0 left-0 z-50 will-change-transform"
          style={{ x: springX, y: springY, translateZ: 0 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div
            className={`text-5xl ${clicked ? "scale-75" : "scale-100"} transition-transform duration-200`}
          >
            🖐️
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── PAW PRINT TRAIL (throttled, limited re-renders) ────────────────
const PawTrail = ({ containerRef }) => {
  const [trail, setTrail] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 50) {
          lastPos.current = { x, y };
          const id = Date.now() + Math.random();
          setTrail((prev) => [...prev.slice(-8), { id, x, y }]);
          setTimeout(() => {
            setTrail((prev) => prev.filter((p) => p.id !== id));
          }, 800);
        }
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {trail.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-2xl opacity-40 will-change-transform"
            style={{ left: p.x, top: p.y, translateZ: 0 }}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// ─── INTERACTIVE DOG PORTRAIT (motion values, no re-renders) ────────
const DogPortrait = ({ imageSrc, containerRef }) => {
  const imgRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 10 });

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxMove = 15;
    mouseX.set(x * maxMove);
    mouseY.set(y * maxMove);
  };

  return (
    <div
      className="relative w-full max-w-xl mx-auto group"
      onMouseMove={handleMouseMove}
      ref={imgRef}
    >
      {/* Outer brutalist frame */}
      <div className="absolute inset-0 border-4 border-amber-400 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5" />
      <div className="relative border-4 border-amber-400 overflow-hidden bg-black z-10">
        <img
          src={imageSrc}
          alt="Max My Dog"
          className="w-full h-auto object-cover aspect-[4/3] filter contrast-125 brightness-110"
        />
        {/* Googly eyes overlay – now driven by motion values */}
        <div className="absolute top-[28%] left-[30%] w-[8%] pt-[8%] bg-white rounded-full shadow-inner">
          <motion.div
            className="absolute w-[60%] pt-[60%] bg-black rounded-full top-1/2 left-1/2 will-change-transform"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        </div>
        <div className="absolute top-[28%] right-[30%] w-[8%] pt-[8%] bg-white rounded-full shadow-inner">
          <motion.div
            className="absolute w-[60%] pt-[60%] bg-black rounded-full top-1/2 left-1/2 will-change-transform"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        </div>
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-amber-400" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-amber-400" />
      </div>
      {/* Glow behind image */}
      <div className="absolute -inset-4 bg-amber-500/20 blur-3xl -z-10 opacity-40 group-hover:opacity-70 transition-opacity duration-700" />
    </div>
  );
};

// ─── PET THE DOG GAME ──────────────────────────────────────────────
const PetTheDog = () => {
  const [happiness, setHappiness] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [zoomies, setZoomies] = useState(false);
  const [pawPop, setPawPop] = useState(false);
  const maxHappiness = 10;

  const petDog = () => {
    if (zoomies) return;
    const newHappiness = happiness + 1;
    setHappiness(newHappiness);

    const id = Date.now() + Math.random();
    const x = Math.random() * 200 - 100;
    setHearts((prev) => [...prev, { id, x }]);
    setTimeout(
      () => setHearts((prev) => prev.filter((h) => h.id !== id)),
      1000,
    );

    if (newHappiness >= maxHappiness) {
      setZoomies(true);
      setTimeout(() => {
        setZoomies(false);
        setHappiness(0);
      }, 2500);
    }
  };

  const handleButtonClick = () => {
    setPawPop(true);
    petDog();
    setTimeout(() => setPawPop(false), 200);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-amber-400 text-sm font-mono uppercase tracking-widest mb-1">
          <span>Happiness</span>
          <span>
            {happiness}/{maxHappiness}
          </span>
        </div>
        <div className="h-4 bg-black/60 border-2 border-amber-400 rounded-none overflow-hidden">
          <motion.div
            className="h-full bg-amber-400"
            animate={{ width: `${(happiness / maxHappiness) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      </div>

      {/* Pet button + floating hearts */}
      <div className="relative">
        <motion.button
          onClick={handleButtonClick}
          className="relative bg-amber-400 text-black font-black uppercase text-xl px-10 py-4 border-2 border-black hover:bg-black hover:text-amber-400 transition-colors disabled:opacity-50 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          disabled={zoomies}
        >
          {zoomies ? "🦴🦴🦴" : "PET THE DOG"}
          {pawPop && (
            <motion.span
              className="absolute top-0 left-1/2 text-4xl pointer-events-none"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ translateX: "-50%" }}
            >
              🐾
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute bottom-full left-1/2 text-3xl pointer-events-none"
              initial={{ opacity: 1, y: 0, x: h.x }}
              animate={{ opacity: 0, y: -80 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{ translateX: "-50%" }}
            >
              💤
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoomies && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-amber-400 text-2xl font-black uppercase tracking-widest flex items-center gap-2"
          >
            <span>🐾</span> Fuck You <span>🐾</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN SECTION ──────────────────────────────────────────────────
export default function MaxTheme() {
  const containerRef = useRef(null);
  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section
      ref={containerRef}
      id="Max"
      className="relative min-h-screen bg-[#030303] text-white overflow-hidden font-sans cursor-none"
      style={{ isolation: "isolate" }}
    >
      {/* Custom cursor & trail – hidden on touch devices */}
      {!isTouchDevice && (
        <>
          <SectionCursor containerRef={containerRef} />
          <PawTrail containerRef={containerRef} />
        </>
      )}

      {/* Parallax background decorations */}
      <motion.div
        style={{ y: yBg, scale: scaleBg, rotate: rotateBg, translateZ: 0 }}
        className="absolute inset-0 pointer-events-none z-0 will-change-transform"
      >
        <div className="text-[25rem] md:text-[35rem] absolute -top-20 -left-20 opacity-[0.03] select-none">
          🐕
        </div>
        <div className="text-[15rem] absolute bottom-10 right-0 opacity-[0.02] select-none">
          🦴
        </div>
        <div className="text-[10rem] absolute top-1/3 right-10 opacity-[0.02] select-none">
          🐾
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 py-20">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black uppercase leading-none tracking-tighter text-white drop-shadow-[6px_6px_0px_#111]">
            Meet{" "}
            <span className="text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]">
              Max
            </span>
          </h1>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="h-1 w-16 bg-amber-400" />
            <p className="text-xl md:text-2xl italic text-gray-400">
              Chief Morale Officer
            </p>
            <div className="h-1 w-16 bg-amber-400" />
          </div>
        </motion.div>

        {/* Image & interactive portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full max-w-lg mb-14"
        >
          <DogPortrait imageSrc="/myDog.jpeg" containerRef={containerRef} />
        </motion.div>

        {/* Description & stats */}
        <motion.div
          className="max-w-2xl text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium px-2">
            Max is a master of joy, a connoisseur of treats, and the undisputed
            king of couch cuddles. He’s been known to debug code by sitting on
            the keyboard and can fetch a tennis ball with the grace of a pro
            athlete. 14/10 would recommend as your emotional support developer.
          </p>

          <PetTheDog />

          {/* Dog Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Barks", value: "Selective" },
              { label: "Zoomies", value: "💤💭💤" },
              { label: "Favorite Toy", value: "Rubber Duck" },
              { label: "Happiness", value: "Infinite" },
            ].map((stat, i) => (
              <div
                key={i}
                className="border-2 border-white/10 p-3 bg-black/60 backdrop-blur-sm hover:border-amber-400/60 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-black text-amber-400">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom paw accent */}
      <div className="absolute bottom-4 left-4 text-4xl opacity-20 select-none pointer-events-none">
        🐾
      </div>
    </section>
  );
}
