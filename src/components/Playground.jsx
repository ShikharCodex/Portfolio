import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, RotateCcw, Activity, ArrowUpCircle } from "lucide-react";
import confetti from "canvas-confetti";

const GRID_COLS = 6;
const GRID_ROWS = 6;

// Emoji Theme with custom glowing glassmorphism backgrounds & particle colors
const ELEMENTS = [
  {
    id: "fire",
    char: "🔥",
    colorHex: "#ef4444",
    glow: "shadow-[0_0_25px_rgba(239,68,68,0.8)] bg-red-500/30 border-red-500/50 ring-2 ring-red-400",
  },
  {
    id: "water",
    char: "💧",
    colorHex: "#3b82f6",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.8)] bg-blue-500/30 border-blue-500/50 ring-2 ring-blue-400",
  },
  {
    id: "nature",
    char: "🍃",
    colorHex: "#39ff14",
    glow: "shadow-[0_0_25px_rgba(57,255,20,0.8)] bg-green-500/30 border-green-500/50 ring-2 ring-green-400",
  },
  {
    id: "electric",
    char: "⚡",
    colorHex: "#facc15",
    glow: "shadow-[0_0_25px_rgba(250,204,21,0.8)] bg-yellow-400/30 border-yellow-400/50 ring-2 ring-yellow-300",
  },
  {
    id: "magic",
    char: "🔮",
    colorHex: "#a855f7",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.8)] bg-purple-500/30 border-purple-500/50 ring-2 ring-purple-400",
  },
];

export default function Playground() {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [movesLeft, setMovesLeft] = useState(20);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [shake, setShake] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]);

  const gridRef = useRef(null);

  const initializeBoard = useCallback(() => {
    const newGrid = Array.from({ length: GRID_COLS * GRID_ROWS }).map(
      () => ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)],
    );
    setGrid(newGrid);
    setScore(0);
    setLevel(1);
    setMovesLeft(20);
    setIsGameOver(false);
    setSelectedPath([]);
    setFloatingTexts([]);
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const handlePointerDown = (index) => {
    if (isGameOver) return;
    setIsDragging(true);
    setSelectedPath([index]);
  };

  const handlePointerEnter = (index) => {
    if (!isDragging || isGameOver) return;

    const lastIndex = selectedPath[selectedPath.length - 1];
    if (grid[index].id !== grid[lastIndex].id) return;

    if (selectedPath.includes(index)) {
      if (selectedPath[selectedPath.length - 2] === index) {
        setSelectedPath((prev) => prev.slice(0, -1));
      }
      return;
    }

    const isAdjacent =
      (index === lastIndex - 1 && lastIndex % GRID_COLS !== 0) ||
      (index === lastIndex + 1 && index % GRID_COLS !== 0) ||
      index === lastIndex - GRID_COLS ||
      index === lastIndex + GRID_COLS;

    if (isAdjacent) {
      setSelectedPath((prev) => [...prev, index]);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || isGameOver) return;
    setIsDragging(false);

    if (selectedPath.length > 1) {
      processMatch(selectedPath);
    } else {
      setSelectedPath([]);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !gridRef.current) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.dataset.index) {
      handlePointerEnter(parseInt(element.dataset.index));
    }
  };

  const triggerParticles = (colorHex) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x, y },
      colors: [colorHex, "#ffffff"],
      disableForReducedMotion: true,
      zIndex: 100,
    });
  };

  const processMatch = (path) => {
    const chain = path.length;
    const basePoints = chain * chain * 15;
    const levelMultiplier = 1 + level * 0.1;
    const totalPoints = Math.floor(basePoints * levelMultiplier);
    const elementType = grid[path[0]];

    setScore((s) => s + totalPoints);

    const textId = Date.now();
    setFloatingTexts((prev) => [
      ...prev,
      { id: textId, text: `+${totalPoints}`, isBig: chain >= 6 },
    ]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== textId));
    }, 1000);

    triggerParticles(elementType.colorHex);
    if (chain >= 5) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }

    let newGrid = [...grid];
    path.forEach((idx) => {
      newGrid[idx] = null;
    });

    for (let col = 0; col < GRID_COLS; col++) {
      let colItems = [];
      for (let row = 0; row < GRID_ROWS; row++) {
        let item = newGrid[row * GRID_COLS + col];
        if (item !== null) colItems.push(item);
      }
      while (colItems.length < GRID_ROWS) {
        colItems.unshift(ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]);
      }
      for (let row = 0; row < GRID_ROWS; row++) {
        newGrid[row * GRID_COLS + col] = colItems[row];
      }
    }

    setGrid(newGrid);
    setSelectedPath([]);

    const nextLevel = Math.floor((score + totalPoints) / 1000) + 1;
    let earnedMoves = 0;

    if (nextLevel > level) {
      setLevel(nextLevel);
      earnedMoves = 5;
      setFloatingTexts((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: `LEVEL UP! +5 Moves`,
          isBig: true,
          color: "text-blue-400",
        },
      ]);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        zIndex: 100,
      });
    }

    if (chain >= 7) {
      earnedMoves += 2;
      setFloatingTexts((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: `GREAT CHAIN! +2 Moves`,
          isBig: true,
          color: "text-blue-400",
        },
      ]);
    }

    setMovesLeft((m) => {
      const remaining = m - 1 + earnedMoves;
      if (remaining <= 0) {
        setIsGameOver(true);
        setHighScore((prev) => Math.max(prev, score + totalPoints));
      }
      return Math.max(0, remaining);
    });
  };

  return (
    <section className="bg-[#020617] relative py-20 md:py-32 font-sans min-h-screen flex flex-col justify-center overflow-hidden z-10 select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-blue-500 flex items-center gap-2">
              <Activity size={16} /> Elemental Flow
            </h2>
          </div>

          <h3 className="text-[3rem] md:text-[5rem] font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
            Chroma <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Nexus
            </span>
          </h3>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 border-l border-white/10 pl-6">
            Drag to link elements. High combos trigger screen shakes, particle
            bursts, and massive score multipliers. Reach new levels to earn
            extra moves and extend your run.
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                Score
              </span>
              <span className="text-4xl font-black text-white">{score}</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-8">
              <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1 flex items-center gap-2">
                <ArrowUpCircle size={12} /> Level
              </span>
              <span className="text-4xl font-black text-blue-400">{level}</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col items-center">
          {/* CORRECTED TAG: Closed with </motion.div> below */}
          <motion.div
            animate={
              shake ? { x: [-8, 8, -8, 8, 0], y: [8, -8, 8, -8, 0] } : {}
            }
            transition={{ duration: 0.3 }}
            className="relative p-2 rounded-2xl bg-[#0a0f1c] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)] backdrop-blur-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center px-4 py-4 bg-[#050810] rounded-t-xl border-b border-white/5">
              <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
                <span className="text-gray-500">Energy:</span>
                <span
                  className={
                    movesLeft <= 5
                      ? "text-red-500 animate-pulse font-black"
                      : "text-blue-400"
                  }
                >
                  {movesLeft}
                </span>
              </div>

              <div className="min-w-[80px] text-right">
                {selectedPath.length > 1 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-end"
                  >
                    <span className="text-xs font-black text-cyan-300 flex items-center gap-1">
                      <Zap size={10} /> +
                      {Math.floor(
                        selectedPath.length *
                          selectedPath.length *
                          15 *
                          (1 + level * 0.1),
                      )}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400">
                      {selectedPath.length} Combo
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            <div
              ref={gridRef}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onTouchMove={handleTouchMove}
              className="grid bg-[#020408] rounded-b-xl overflow-hidden relative border border-white/5 p-3 gap-2 touch-none"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                aspectRatio: "1 / 1",
              }}
            >
              <AnimatePresence>
                {floatingTexts.map((ft) => (
                  <motion.div
                    key={ft.id}
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{
                      opacity: 0,
                      y: -80,
                      scale: ft.isBig ? 1.8 : 1.2,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none z-40 font-black text-2xl drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] ${ft.color || "text-white"}`}
                  >
                    {ft.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {grid.map((cell, i) => {
                const isSelected = selectedPath.includes(i);
                const isDimmed = isDragging && !isSelected;

                return (
                  <motion.div
                    key={`${i}-${cell?.id || "empty"}`}
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: isSelected ? 0.85 : 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    data-index={i}
                    onPointerDown={() => handlePointerDown(i)}
                    onPointerEnter={() => handlePointerEnter(i)}
                    className={`
                      w-full h-full rounded-2xl flex items-center justify-center text-3xl md:text-4xl cursor-pointer
                      transition-all duration-200 border
                      ${cell && !isSelected ? "bg-white/5 border-white/5 hover:bg-white/10 shadow-inner" : ""}
                      ${isSelected ? cell?.glow : ""}
                      ${isDimmed ? "opacity-20 grayscale blur-[2px] scale-90" : "opacity-100"}
                      ${isSelected ? "z-10" : "z-0"}
                    `}
                  >
                    {cell?.char}
                  </motion.div>
                );
              })}

              <AnimatePresence>
                {isGameOver && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-b-xl"
                  >
                    <h3 className="text-4xl font-black text-white uppercase tracking-widest mb-2 shadow-black drop-shadow-2xl">
                      System Locked
                    </h3>
                    <div className="flex flex-col items-center gap-1 mb-8">
                      <p className="text-cyan-400 font-black text-3xl">
                        Score: {score}
                      </p>
                      <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Level Reached: {level}
                      </p>
                      <p className="text-blue-500 text-sm uppercase tracking-widest mt-2">
                        Best: {highScore}
                      </p>
                    </div>
                    <button
                      onClick={initializeBoard}
                      className="flex items-center gap-2 px-8 py-4 bg-blue-500/20 border border-blue-500 text-blue-400 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 hover:text-black transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
                    >
                      <RotateCcw size={16} /> Reboot Core
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
