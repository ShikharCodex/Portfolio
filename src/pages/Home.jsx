import { createElement, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowDown,
  BadgeCheck,
  Braces,
  Code2,
  Github,
  Linkedin,
  Sparkles,
  Twitter,
} from "lucide-react";
import LiquidMetalScene from "../components/LiquidMetalScene";
import HeroScene from "../components/HeroScene";
import MagneticButton from "../components/MagneticButton";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import {
  experience,
  profile,
  projects,
  roles,
  services,
  skillGroups,
  stack,
  stats,
  testimonials,
} from "../data/portfolio";

const MotionSpan = motion.span;

function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % roles.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex min-h-9 items-center overflow-hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm font-semibold text-[color:var(--accent)]">
      <AnimatePresence mode="wait">
        <MotionSpan
          key={roles[index]}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {roles[index]}
        </MotionSpan>
      </AnimatePresence>
    </span>
  );
}

function HomeHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const staticPreview = new URLSearchParams(window.location.search).has("static");
    if (staticPreview) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 42, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden px-5 pt-32">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        autoPlay
        muted
        loop
        playsInline
        src="/bg.mp4"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,6,0.42),var(--bg)_86%)]" />
      {/* <HeroScene /> */}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-[calc(100vw-40px)] min-w-0 items-center gap-10 py-10 lg:max-w-7xl lg:grid-cols-[1.08fr_0.92fr]">
        <div className="min-w-0 max-w-full">
          <div className="hero-reveal mb-6 flex flex-wrap items-center gap-3">
            <RoleTicker />
            <span className="inline-flex min-h-9 items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] px-3 text-sm text-[color:var(--muted)]">
              Based in {profile.location}
            </span>
          </div>

          <h1 className="hero-reveal max-w-full break-words text-4xl font-semibold leading-tight text-[color:var(--text)] sm:max-w-5xl sm:text-5xl md:text-7xl">
            {profile.name} builds digital products with calm interfaces and serious engineering.
          </h1>

          <p className="hero-reveal mt-6 max-w-[20rem] text-base leading-8 text-[color:var(--muted)] sm:max-w-full md:max-w-2xl md:text-xl">
            {profile.subline}
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <MagneticButton to="/projects">Explore work</MagneticButton>
            <MagneticButton href={profile.resume} download icon="download" variant="secondary">
              Download resume
            </MagneticButton>
          </div>

          <div className="hero-reveal mt-8 flex items-center gap-3">
            {[
              { href: profile.github, label: "GitHub", icon: Github },
              { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
              { href: profile.twitter, label: "X", icon: Twitter },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
              >
                {createElement(Icon, { size: 18 })}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-reveal relative min-w-0 max-w-full">
          <div className="relative mx-auto h-[400px] w-full max-w-md md:h-[500px]">
            <LiquidMetalScene />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Currently building", "AI interfaces with safer product boundaries"],
              ["Learning", "System design, evaluation loops, and better motion craft"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-4">
                <p className="text-xs font-semibold uppercase text-[color:var(--accent)]">{label}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#featured-work"
        aria-label="Scroll to featured work"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm text-[color:var(--muted)] md:flex"
      >
        <ArrowDown size={16} className="animate-bounce" />
        Scroll
      </a>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
            <div className="text-3xl font-semibold text-[color:var(--text)]">{stat.value}</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Seo
        title="Premium Full-Stack Developer Portfolio"
        description="Shikhar builds premium full-stack products with React, Node.js, AI workflows, polished UX, and production-minded engineering."
      />
      <HomeHero />
      <StatsSection />

      <section id="featured-work" className="section-pad">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Featured projects"
            title="Case studies that show product judgment, not just screenshots."
            description="Each build is framed around the problem, architecture, interface decisions, and production thinking behind the work."
          />
          <div className="grid gap-8">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Engineering range"
            title="A product-focused stack for frontend polish and backend discipline."
            description="The work sits between visual craft and practical systems: fast React interfaces, clean Node APIs, AI workflows, data models, and deployable product surfaces."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--surface-strong)] text-[color:var(--accent)]">
                  {index % 2 === 0 ? <Code2 size={20} /> : <Braces size={20} />}
                </div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{group.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-lg border border-[color:var(--line)] px-3 py-2 text-xs text-[color:var(--muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Journey"
            title="Built through execution, polish, and repeated product reps."
            description="The path is practical: build, deploy, refine, learn from friction, then raise the quality bar on the next system."
          />
          <div className="grid gap-4">
            {experience.slice(0, 2).map((item) => (
              <Reveal key={item.title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                <div className="mb-3 text-sm font-semibold text-[color:var(--accent)]">{item.period}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Services"
            title="For teams and founders who need the product to feel engineered."
            description="Focused collaboration areas with a premium finish and clean delivery habits."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                <Sparkles size={20} className="mb-4 text-[color:var(--accent)]" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Proof signals"
              title="Trusted for clarity, speed, and the details that make software feel complete."
            />
            <div className="grid gap-4">
              {testimonials.slice(0, 2).map((item) => (
                <Reveal key={item.name} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                  <p className="text-lg leading-8 text-[color:var(--text)]">"{item.quote}"</p>
                  <p className="mt-4 text-sm font-semibold">{item.name}</p>
                  <p className="text-sm text-[color:var(--muted)]">{item.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
            <BadgeCheck size={24} className="mb-5 text-[color:var(--accent)]" />
            <h3 className="text-2xl font-semibold">Tech stack preview</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
              A practical toolchain for building, animating, validating, shipping, and iterating modern web products.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2 text-xs text-[color:var(--muted)]">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24">
        <Reveal className="mx-auto max-w-7xl rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[color:var(--accent)]">Availability</p>
              <h2 className="text-3xl font-semibold md:text-5xl">Have a serious build in mind?</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
                {profile.availability}
              </p>
            </div>
            <MagneticButton to="/contact">Open a conversation</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
