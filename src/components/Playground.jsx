import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const GRID_SIZE = 15;
const INITIAL_SPEED = 150;

export default function Playground() {
  const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
  const [food, setFood] = useState({ x: 10, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const dirRef = useRef(dir);
  const gameBoardRef = useRef(null);

  // Prevent rapid double-key presses causing instant death
  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Ensure food doesn't spawn on the snake
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const startGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setDir({ x: 0, y: -1 });
    setScore(0);
    setFood(generateFood([{ x: 7, y: 7 }]));
    setIsGameOver(false);
    setIsStarted(true);
  };

  const handleInput = useCallback((newX, newY) => {
    if (!isStarted || isGameOver) return;
    // Prevent 180-degree turns
    if (dirRef.current.x === -newX && dirRef.current.y === -newY && snake.length > 1) return;
    setDir({ x: newX, y: newY });
  }, [isStarted, isGameOver, snake.length]);

  // Desktop Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default scrolling when using arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowUp': case 'w': handleInput(0, -1); break;
        case 'ArrowDown': case 's': handleInput(0, 1); break;
        case 'ArrowLeft': case 'a': handleInput(-1, 0); break;
        case 'ArrowRight': case 'd': handleInput(1, 0); break;
        case ' ': if (!isStarted || isGameOver) startGame(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, isStarted, isGameOver]);

  // The Main Game Loop
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };

        // Wall Collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setIsGameOver(true);
          setHighScore(s => Math.max(s, score));
          return prev;
        }

        // Self Collision
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          setHighScore(s => Math.max(s, score));
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    // Speed increases slightly as score goes up
    const currentSpeed = Math.max(60, INITIAL_SPEED - (score * 0.5));
    const intervalId = setInterval(moveSnake, currentSpeed);
    return () => clearInterval(intervalId);
  }, [isStarted, isGameOver, food, score, generateFood]);

  return (
    <section className="bg-[#030303] relative py-20 md:py-32 font-sans min-h-screen flex flex-col justify-center overflow-hidden z-10">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-neon-cyan/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[95rem] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Context & Narrative */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-neon-cyan shadow-neon-cyan" />
            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-neon-cyan flex items-center gap-2">
              <Gamepad2 size={16} /> Interactive Logic
            </h2>
          </div>
          
          <h3 className="text-[3rem] md:text-[5rem] font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
            Why read it <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-lime">When you can play it?</span>
          </h3>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 border-l border-white/10 pl-6">
            I like building things that actually work. No unnecessary complexity, just clean logic and real problem solving.
          </p>

          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Current Score</span>
              <span className="text-4xl font-black text-white">{score}</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-8">
              <span className="text-[10px] uppercase tracking-widest text-neon-lime font-bold mb-1 flex items-center gap-2">
                <Trophy size={12} /> High Score
              </span>
              <span className="text-4xl font-black text-neon-lime">{highScore}</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Arcade Cabinet (Game Board) */}
        <div className="w-full lg:w-7/12 flex flex-col items-center">
          <div className="relative p-2 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.1)] backdrop-blur-xl">
            
            {/* The Actual Grid */}
            <div 
              ref={gameBoardRef}
              className="grid bg-[#050505] rounded-xl overflow-hidden relative border border-white/5"
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: 'min(90vw, 400px)',
                height: 'min(90vw, 400px)'
              }}
            >
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />

              {/* Render Grid Cells */}
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                const x = i % GRID_SIZE;
                const y = Math.floor(i / GRID_SIZE);
                const isSnake = snake.some(s => s.x === x && s.y === y);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;

                return (
                  <div 
                    key={i} 
                    className={`
                      border-[0.5px] border-white/[0.02] transition-all duration-75
                      ${isHead ? 'bg-neon-lime shadow-[0_0_15px_#0f0] z-10 scale-110 rounded-sm' : ''}
                      ${isSnake && !isHead ? 'bg-neon-lime/80 shadow-[0_0_8px_#0f0] rounded-sm' : ''}
                      ${isFood ? 'bg-neon-magenta shadow-[0_0_15px_#f0f] rounded-full scale-75 animate-pulse' : ''}
                    `}
                  />
                );
              })}

              {/* Game Over / Start Screen Overlays */}
              <AnimatePresence>
                {!isStarted && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-30"
                  >
                    <Gamepad2 size={48} className="text-neon-cyan mb-4 animate-bounce" />
                    <button 
                      onClick={startGame}
                      className="px-8 py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-black uppercase tracking-widest text-sm rounded-full hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                    >
                      Initialize Game
                    </button>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-4">Use WASD, Arrows, or D-Pad</p>
                  </motion.div>
                )}

                {isGameOver && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center z-30 border border-red-500"
                  >
                    <h3 className="text-4xl font-black text-red-500 uppercase tracking-widest mb-2 shadow-red-500 drop-shadow-lg">System Failure</h3>
                    <p className="text-white text-sm uppercase tracking-widest mb-6">Final Score: {score}</p>
                    <button 
                      onClick={startGame}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      <RotateCcw size={16} /> Reboot Sequence
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile D-Pad Controls (Only visible on smaller screens or to click) */}
          <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
            <div />
            <button onClick={(e) => { e.preventDefault(); handleInput(0, -1); }} className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-neon-cyan active:text-black transition-colors text-gray-400"><ArrowUp /></button>
            <div />
            <button onClick={(e) => { e.preventDefault(); handleInput(-1, 0); }} className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-neon-cyan active:text-black transition-colors text-gray-400"><ArrowLeft /></button>
            <button onClick={(e) => { e.preventDefault(); handleInput(0, 1); }} className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-neon-cyan active:text-black transition-colors text-gray-400"><ArrowDown /></button>
            <button onClick={(e) => { e.preventDefault(); handleInput(1, 0); }} className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:bg-neon-cyan active:text-black transition-colors text-gray-400"><ArrowRight /></button>
          </div>

        </div>
      </div>
    </section>
  );
}