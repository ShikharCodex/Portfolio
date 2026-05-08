import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiExternalLink, FiDownload, FiGlobe } from "react-icons/fi";
import { useState, useEffect, useCallback, useMemo } from "react";

// ---- DESKTOP SNIPPETS (carousel) ----
const desktopSnippets = [
  {
    label: "Hello Fefe",
    lines: ['fe message = "Hello, Fefe!";', "bork message;"],
  },
  {
    label: "Variables & Logic",
    lines: [
      "fe count = 10;",
      "fe isReady = yes;",
      "sniff (isReady and count > 5) {",
      '    bork "Ready to go!";',
      "} woof {",
      '    bork "Not yet...";',
      "}",
    ],
  },
  {
    label: "Loop & Function",
    lines: [
      "boop greet() {",
      "    fe i = 0;",
      "    zoom (i < 3) {",
      '        bork "Hi " + i;',
      "        i = i + 1;",
      "    }",
      '    yip "Done";',
      "}",
      "bork greet();",
    ],
  },
];

// ---- MOBILE SNIPPET (all keywords showcased) ----
const mobileSnippet = {
  label: "FeFe Overview",
  lines: [
    'fe name = "FeFe";',
    "fe isReady = yes;",
    'sniff (isReady and name == "FeFe") {',
    '    bork "Welcome!";',
    "    fe i = 0;",
    "    zoom (i < 3) {",
    '        bork "Count: " + i;',
    "        i = i + 1;",
    "    }",
    "} woof {",
    '    bork "Not ready";',
    "}",
    "boop greet(user) {",
    '    yip "Hi, " + user;',
    "}",
    "bork greet(name);",
  ],
};

// ---- KEYWORD HIGHLIGHTING CONFIG ----
const keywords = ["fe", "bork", "sniff", "woof", "zoom", "boop", "yip"];
const booleans = ["yes", "nope"];
const operators = ["and", "or", "not"];

// ---- SYNTAX HIGHLIGHTING HELPER ----
const tokenizeLine = (line) => {
  const tokens = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    // comments
    if (remaining.startsWith("//")) {
      const idx = remaining.length;
      tokens.push({
        text: remaining.substring(0, idx),
        style: "text-gray-500 italic",
      });
      remaining = "";
      continue;
    }

    // strings (double quotes)
    const stringMatch = remaining.match(/^"([^"\\]|\\.)*"/);
    if (stringMatch) {
      tokens.push({ text: stringMatch[0], style: "text-green-400" });
      remaining = remaining.substring(stringMatch[0].length);
      continue;
    }

    // numbers
    const numMatch = remaining.match(/^\d+/);
    if (numMatch) {
      tokens.push({ text: numMatch[0], style: "text-amber-400" });
      remaining = remaining.substring(numMatch[0].length);
      continue;
    }

    // booleans
    const boolMatch = remaining.match(/^(yes|nope)\b/);
    if (boolMatch) {
      tokens.push({ text: boolMatch[0], style: "text-blue-400" });
      remaining = remaining.substring(boolMatch[0].length);
      continue;
    }

    // operators
    const opMatch = remaining.match(/^(and|or|not)\b/);
    if (opMatch) {
      tokens.push({ text: opMatch[0], style: "text-amber-400" });
      remaining = remaining.substring(opMatch[0].length);
      continue;
    }

    // keywords
    const kwMatch = remaining.match(/^(fe|bork|sniff|woof|zoom|boop|yip)\b/);
    if (kwMatch) {
      tokens.push({ text: kwMatch[0], style: "text-pink-400 font-semibold" });
      remaining = remaining.substring(kwMatch[0].length);
      continue;
    }

    // default
    const nextSpace = remaining.search(/\s|"|$/);
    const slice =
      nextSpace === -1 ? remaining : remaining.substring(0, nextSpace);
    const trimmed = slice.length > 0 ? slice : remaining.substring(0, 1);
    tokens.push({ text: trimmed, style: "text-gray-100" });
    remaining = remaining.substring(trimmed.length);
  }

  return tokens;
};

// ---- COLORIZED LINE COMPONENT ----
const ColorizedLine = ({ line, desktop = false, typewriterDone = true }) => {
  const tokens = useMemo(() => tokenizeLine(line), [line]);

  const content = (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={token.style}>
          {token.text}
        </span>
      ))}
    </>
  );

  return <>{content}</>;
};

// ---- floating orbs ----
const FloatingOrbs = () => {
  const orbs = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: 150 + Math.random() * 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 dark:opacity-30"
          style={{
            width: orb.size,
            height: orb.size,
            background:
              orb.id % 2 === 0
                ? "linear-gradient(135deg, #818cf8, #c084fc)"
                : "linear-gradient(135deg, #34d399, #a78bfa)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{ left: `${orb.x}%`, top: `${orb.y}%` }}
        />
      ))}
    </div>
  );
};

// ---- typewriter hook (desktop only) ----
const useTypewriter = (text, speed = 20) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  const reset = useCallback(() => {
    setDisplayed("");
    setIndex(0);
  }, []);

  return { displayed, reset, isTyping: index < text.length };
};

// ---- typewriter line component (desktop only) ----
const TypewriterLine = ({ text, lineIndex, resetTrigger }) => {
  const [visible, setVisible] = useState(false);
  const { displayed, isTyping } = useTypewriter(text, 20);

  useEffect(() => {
    setVisible(false);
  }, [resetTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), lineIndex * 400);
    return () => clearTimeout(timer);
  }, [lineIndex, resetTrigger]);

  if (!visible) return <div className="h-5 md:h-6" />;

  const tokens = tokenizeLine(displayed);

  return (
    <div className="flex items-center">
      <span className="whitespace-nowrap">
        {tokens.map((token, i) => (
          <span key={i} className={token.style}>
            {token.text}
          </span>
        ))}
      </span>
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="ml-1 w-2 h-4 md:h-5 bg-green-400 inline-block"
        />
      )}
    </div>
  );
};

// ---- install commands ----
const installCommands = [
  { label: "Install compiler", code: "npm install -g fefe-script" },
  { label: "Add VS Code extension", code: "ext install Shikharx.fefe-script" },
];

export default function Language() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [snippetKey, setSnippetKey] = useState(0);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto‑rotate on desktop
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % desktopSnippets.length);
      setSnippetKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Decide which lines to render
  const displayedLines = isMobile
    ? mobileSnippet.lines
    : desktopSnippets[currentSnippet].lines;
  const displayedLabel = isMobile
    ? mobileSnippet.label
    : desktopSnippets[currentSnippet].label;

  return (
    <section className="relative py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden">
      <FloatingOrbs />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        {/* ---- hero ---- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/30 dark:bg-white/10 backdrop-blur border border-white/20 text-gray-800 dark:text-gray-200 shadow-sm"
          >
            Custom Programming Language
          </motion.span>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          >
            FeFe Script
          </motion.h2>

          {/* Official website link */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-3"
          >
            <a
              href="https://fefescript.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
            >
              <FiGlobe className="w-4 h-4" />
              <span>fefescript.official.site</span>
              <FiExternalLink className="w-3 h-3" />
            </a>
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300"
          >
            A modern, high‑performance language built for speed, clarity, and a
            first‑class developer experience – powered by a full CLI toolchain
            and dedicated VS Code extension.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <a
              href="https://www.npmjs.com/package/fefe-script"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 md:px-7 md:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-gray-500/20 text-sm md:text-base"
            >
              <FiDownload className="w-4 h-4" />
              NPM Package
            </a>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=Shikharx.fefe-script-vscode"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 md:px-7 md:py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25 text-sm md:text-base"
            >
              <FiExternalLink className="w-4 h-4" />
              VS Code Extension
            </a>
          </motion.div>
        </motion.div>

        {/* ---- terminal + install grid ---- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
        >
          {/* ---- TERMINAL CARD ---- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="lg:col-span-3 bg-gray-900 dark:bg-black rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/30 border border-gray-800 flex flex-col"
          >
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 md:py-3 bg-gray-800/80 border-b border-gray-700">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs md:text-sm text-gray-400 font-mono truncate">
                {displayedLabel}.fe
              </span>
            </div>

            {/* Code area */}
            <div className="p-3 md:p-4 lg:p-5 flex-1 overflow-x-auto">
              {isMobile ? (
                /* Mobile: static code, no typewriter, fully colorized */
                <div className="text-xs font-mono leading-relaxed">
                  {mobileSnippet.lines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-gray-500 mr-2 select-none w-5 text-right flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="whitespace-pre-wrap break-words">
                        <ColorizedLine line={line} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Desktop: typewriter carousel */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={snippetKey}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {desktopSnippets[currentSnippet].lines.map((line, i) => (
                      <div
                        key={i}
                        className="flex text-xs md:text-sm font-mono text-gray-100 leading-relaxed"
                      >
                        <span className="text-gray-500 mr-2 md:mr-4 select-none w-5 text-right flex-shrink-0">
                          {i + 1}
                        </span>
                        <TypewriterLine
                          text={line}
                          lineIndex={i}
                          resetTrigger={snippetKey}
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Navigation dots – only on desktop */}
            {!isMobile && (
              <div className="flex justify-center gap-2 pt-2 pb-3 md:pb-4 bg-gray-900 dark:bg-black">
                {desktopSnippets.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSnippet(idx);
                      setSnippetKey((k) => k + 1);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentSnippet
                        ? "bg-indigo-500 w-4"
                        : "bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* ---- INSTALL COMMANDS ---- */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="lg:col-span-2 space-y-4"
          >
            {installCommands.map((cmd, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800/70 backdrop-blur rounded-2xl p-4 md:p-5 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                    {cmd.label}
                  </span>
                  <button
                    onClick={() => copyToClipboard(cmd.code, idx)}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <span className="text-xs text-green-500">Copied!</span>
                    ) : (
                      <FiCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg px-3 py-2 md:px-4 md:py-3 font-mono text-xs md:text-sm text-pink-600 dark:text-pink-400 overflow-x-auto">
                  {cmd.code}
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <a
                href="https://github.com/ShikharBit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
