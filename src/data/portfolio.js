export const profile = {
  name: "Shikhar",
  brand: "Shikhar.x",
  initials: "SX",
  title: "Full-Stack Product Engineer",
  headline:
    "I build high-performance web products with serious engineering, sharp interfaces, and a bias for shipping.",
  subline:
    "React, Node.js, AI systems, realtime apps, developer tools, and production-minded UX for teams that need more than a template.",
  location: "Kanpur, India",
  timezone: "IST",
  email: "hello@shikharx.xyz",
  resume: "/Shikhar-Resume.txt",
  github: "https://github.com/ShikharBit",
  linkedin: "https://www.linkedin.com/in/shikharx/",
  twitter: "https://x.com/ShikharByte",
  website: "https://www.shikharx.xyz/",
  availability:
    "Available for selective full-stack roles, AI product builds, and complex frontend systems.",
};

export const navLinks = [
  { label: "Work", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Journey", path: "/experience" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export const stats = [
  { value: "10+", label: "product-grade builds" },
  { value: "7", label: "core stacks shipped" },
  { value: "4", label: "AI and realtime systems" },
  { value: "99", label: "focus on UX polish" },
];

export const roles = [
  "Full-stack engineer",
  "React motion specialist",
  "Node.js API builder",
  "AI product developer",
  "Systems-minded UI engineer",
];

export const projects = [
  {
    slug: "codemesh",
    name: "CodeMesh",
    type: "Developer Tool",
    year: "2026",
    status: "Live",
    accent: "#3ddc97",
    summary:
      "A fast paste-and-share platform built for developers who need clean code transfer without account friction.",
    problem:
      "Developers often move snippets through chats, screenshots, or heavy tools. CodeMesh makes the handoff fast, readable, and disposable while keeping the experience focused.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Vite"],
    links: {
      live: "https://www.codemesh.space/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Sub-second sharing flow", "Clean paste UX", "API-first architecture"],
    features: [
      "Instant snippet creation with clean routing",
      "Readable code presentation with low-friction sharing",
      "Mongo-backed persistence and simple expiry-ready data shape",
      "Responsive interface tuned for mobile and desktop handoffs",
    ],
    challenges: [
      "Balancing speed with enough structure for future privacy controls",
      "Keeping the interface calm while supporting long code payloads",
      "Designing a backend model that can evolve into teams and workspaces",
    ],
    production:
      "The product is structured as a lightweight service with a clear API boundary, deployable frontend, and future-ready room for rate limits, expiry policies, and private links.",
    visual: "code",
  },
  {
    slug: "elariax",
    name: "Elariax",
    type: "AI Companion",
    year: "2026",
    status: "Live",
    accent: "#52b6ff",
    summary:
      "A customizable AI companion concept with realtime learning loops, examination flows, and personality control.",
    problem:
      "Most AI companions feel generic. Elariax explores a more personal system where context, testing, and controlled adaptation shape the assistant over time.",
    stack: ["React", "Node.js", "Express", "MongoDB", "LLM APIs"],
    links: {
      live: "https://elariax.vercel.app/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Custom memory model", "Learning flow design", "Realtime UI patterns"],
    features: [
      "Conversational shell with identity-driven response behavior",
      "Learning and examination paths for controlled feedback",
      "Configurable companion logic and prompt architecture",
      "Frontend interaction model designed for long-running sessions",
    ],
    challenges: [
      "Controlling AI behavior without making the product feel rigid",
      "Separating experimental logic from stable user-facing flows",
      "Making an AI interface feel personal without becoming noisy",
    ],
    production:
      "The system is organized around clear AI boundaries: prompt context, user interaction, learning checkpoints, and durable data storage remain separately understandable.",
    visual: "ai",
  },
  {
    slug: "mediva",
    name: "Mediva",
    type: "Medical AI Analyzer",
    year: "2026",
    status: "Prototype",
    accent: "#f5a524",
    summary:
      "An AI clinical assistant concept that explains symptoms, labs, and imaging signals through a cautious triage-first interface.",
    problem:
      "Medical information is often hard to interpret. Mediva focuses on making complex inputs understandable while keeping the product framed as preliminary support, not diagnosis.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Cloudinary", "OpenAI"],
    links: {
      live: "https://mediva-one.vercel.app/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Multi-input analysis", "Risk-aware UX", "Document-ready output"],
    features: [
      "Symptom and lab interpretation flows",
      "Imaging upload path with Cloudinary-backed asset handling",
      "Clear output sections for risks, explanations, and next actions",
      "Interface language designed for caution and user comprehension",
    ],
    challenges: [
      "Designing around sensitive user expectations",
      "Separating educational explanation from medical certainty",
      "Handling uploads and summaries in a coherent clinical-like workflow",
    ],
    production:
      "The product thinking emphasizes disclaimers, structured outputs, upload hygiene, and a user experience that does not overstate model confidence.",
    visual: "medical",
  },
  {
    slug: "vizor",
    name: "Vizor",
    type: "Vision AI Kitchen",
    year: "2026",
    status: "Live",
    accent: "#ff6b4a",
    summary:
      "A computer-vision cooking assistant that turns ingredient scans into recipes, nutrition context, and waste-reducing meal plans.",
    problem:
      "People waste time deciding what to cook with available ingredients. Vizor converts the kitchen inventory moment into immediate, useful suggestions.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Cloudinary", "Vision AI"],
    links: {
      live: "https://vizorai.vercel.app/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Vision-first workflow", "Recipe generation", "Nutrition context"],
    features: [
      "Ingredient image upload and AI-assisted recognition",
      "Recipe suggestions based on detected food items",
      "Nutrition breakdown and practical substitutions",
      "Waste-conscious meal planning paths",
    ],
    challenges: [
      "Making image-based input feel trustworthy and editable",
      "Designing fallbacks for uncertain visual recognition",
      "Keeping the interface fast despite AI and upload latency",
    ],
    production:
      "The architecture separates media upload, inference, and recommendation output so each step can be monitored, cached, or replaced as the product matures.",
    visual: "vision",
  },
  {
    slug: "locofy",
    name: "Locofy",
    type: "Community Platform",
    year: "2025",
    status: "Live",
    accent: "#9b8cff",
    summary:
      "A community-powered lost-and-found database designed to make recovery workflows easier to search, share, and act on.",
    problem:
      "Lost-item and missing-person style information often becomes fragmented across posts and groups. Locofy centralizes discovery and community reporting.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    links: {
      live: "https://Locofy.xyz/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Searchable records", "Community reports", "Media-backed cases"],
    features: [
      "Report creation with media upload support",
      "Searchable listing and case-style presentation",
      "Community-first information structure",
      "Responsive dashboard and public discovery surfaces",
    ],
    challenges: [
      "Designing data capture that stays useful under stress",
      "Balancing privacy, visibility, and fast sharing",
      "Keeping listings scannable as record count grows",
    ],
    production:
      "The project is modeled around clear record schemas, media handling, and future moderation paths that are necessary for trust-heavy community software.",
    visual: "map",
  },
  {
    slug: "rooter",
    name: "Rooter",
    type: "Productivity Tool",
    year: "2025",
    status: "Live",
    accent: "#2ec4b6",
    summary:
      "A note-taking application with abuse prevention, rate limiting, and a backend that treats reliability as a feature.",
    problem:
      "Simple tools are often built without resilience. Rooter adds rate limiting and backend discipline to a focused note product.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redis"],
    links: {
      live: "https://rooter-37q2.onrender.com/",
      github: "https://github.com/ShikharBit",
    },
    metrics: ["Redis rate limits", "Clean note flows", "Reliable API design"],
    features: [
      "Create, update, and organize note records",
      "Redis-backed rate limiting for abuse control",
      "Express API structure with clear route responsibilities",
      "Minimal UI designed for repeated use",
    ],
    challenges: [
      "Adding resilience without overengineering the product",
      "Protecting public endpoints while preserving speed",
      "Designing simple state flows that stay predictable",
    ],
    production:
      "The product treats operational behavior as part of the UX: predictable limits, clear failures, and clean API responsibilities make the app easier to trust.",
    visual: "notes",
  },
];

export const skillGroups = [
  {
    title: "Frontend Systems",
    detail: "Interfaces that feel precise, animated, accessible, and production-ready.",
    skills: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    title: "Backend Engineering",
    detail: "APIs, data models, realtime behavior, auth boundaries, and reliability.",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "Socket.io", "REST APIs"],
  },
  {
    title: "AI Products",
    detail: "LLM workflows, vision input, prompt architecture, and user-safe outputs.",
    skills: ["OpenAI", "Vision AI", "Prompt Design", "RAG-ready Flows", "Cloudinary"],
  },
  {
    title: "Delivery",
    detail: "Deployment, performance thinking, clean structure, and practical iteration.",
    skills: ["Vercel", "Render", "GitHub", "SEO", "Validation", "Performance"],
  },
];

export const stack = [
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Redis",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Socket.io",
  "OpenAI",
  "Cloudinary",
  "Vite",
  "Git",
  "Zod",
];

export const experience = [
  {
    period: "2026",
    title: "AI Product and Motion-Focused Full-Stack Builds",
    company: "Independent Product Engineering",
    description:
      "Built AI-assisted products across medical explanation, vision-based cooking, companion systems, and premium developer-facing experiences.",
    points: [
      "Designed full-stack architectures with React, Node.js, MongoDB, and AI services",
      "Created polished frontend motion systems using Framer Motion, GSAP, and Tailwind",
      "Focused on product framing, safety language, and UX clarity for AI-heavy workflows",
    ],
  },
  {
    period: "2025",
    title: "Realtime and Community Web Applications",
    company: "Product Lab",
    description:
      "Shipped realtime chat, community data platforms, code tools, and productivity systems with practical backend constraints.",
    points: [
      "Implemented API-first apps with Express, MongoDB, Socket.io, Redis, and Cloudinary",
      "Added operational thinking through rate limits, upload handling, and clear failures",
      "Improved interface hierarchy so tools remained readable under real content",
    ],
  },
  {
    period: "Earlier",
    title: "Foundation in Programming, Systems, and UI Craft",
    company: "Continuous Build Track",
    description:
      "Built the technical base across Java, Python, frontend engineering, problem solving, and product taste.",
    points: [
      "Practiced algorithmic thinking through Java and coding profiles",
      "Explored AI/ML with image classification and Python tooling",
      "Developed a signature style around high-impact interactive interfaces",
    ],
  },
];

export const services = [
  {
    title: "Premium Portfolio and Brand Systems",
    description:
      "High-end personal sites, recruiter-ready project stories, performance-minded builds, and design systems that feel distinct.",
    deliverables: ["Multi-page React portfolio", "Motion system", "CMS-ready structure", "SEO pass"],
  },
  {
    title: "Full-Stack MVP Engineering",
    description:
      "From idea to deployable product with APIs, database design, polished UI, validation, and a maintainable folder structure.",
    deliverables: ["React frontend", "Node API", "MongoDB schema", "Deployment handoff"],
  },
  {
    title: "AI Product Interfaces",
    description:
      "AI-first experiences with careful UX, structured outputs, file/image workflows, and model interaction patterns users can trust.",
    deliverables: ["LLM workflow", "Vision upload flow", "Prompt architecture", "Safety UX"],
  },
  {
    title: "Frontend Animation Systems",
    description:
      "Motion, scroll storytelling, microinteractions, and responsive layouts that look premium without damaging performance.",
    deliverables: ["Framer Motion", "GSAP moments", "Lenis scrolling", "Interaction polish"],
  },
];

export const testimonials = [
  {
    quote:
      "Shikhar thinks like a builder and a designer at the same time. The work feels intentionally engineered, not decorated.",
    name: "Product Founder",
    role: "AI SaaS collaborator",
  },
  {
    quote:
      "The strongest part is how quickly rough ideas become something you can actually use, test, and show to people.",
    name: "Startup Operator",
    role: "MVP partner",
  },
  {
    quote:
      "He pays attention to the details that separate a demo from a product: empty states, motion, API shape, and responsiveness.",
    name: "Engineering Peer",
    role: "Full-stack developer",
  },
];

export const articles = [
  {
    slug: "premium-developer-portfolio",
    title: "What Makes a Developer Portfolio Feel Senior",
    excerpt:
      "A practical breakdown of hierarchy, proof, motion, project storytelling, and why most portfolios fail to communicate engineering maturity.",
    category: "Design Engineering",
    readTime: "6 min read",
  },
  {
    slug: "ai-ux-boundaries",
    title: "Designing AI Interfaces That Do Not Overpromise",
    excerpt:
      "How to shape outputs, disclaimers, review loops, and confidence signals for AI products people can actually trust.",
    category: "AI Product",
    readTime: "8 min read",
  },
  {
    slug: "rate-limits-as-ux",
    title: "Rate Limits Are a User Experience Feature",
    excerpt:
      "Reliability decisions show up in the interface. Good systems explain constraints before users feel punished by them.",
    category: "Backend",
    readTime: "5 min read",
  },
];

export const achievements = [
  "Built and deployed multiple public full-stack products across AI, productivity, community, and developer tooling.",
  "Created realtime and upload-heavy workflows with Socket.io, Cloudinary, MongoDB, and Redis-backed protections.",
  "Developed a personal brand direction around premium motion, product storytelling, and clean full-stack execution.",
  "Continuously expanding AI product craft across LLMs, vision inputs, evaluation flows, and safer user output design.",
];

export const certifications = [
  "Full-stack JavaScript project track",
  "AI product prototyping and prompt systems",
  "Data structures, Java fundamentals, and applied problem solving",
  "Frontend animation systems with Framer Motion and GSAP",
];
