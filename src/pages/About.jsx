import { Brain, Compass, Cpu, Hammer, ShieldCheck, Target } from "lucide-react";
import { createElement } from "react";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { profile } from "../data/portfolio";

const values = [
  {
    icon: Target,
    title: "Outcome-first engineering",
    text: "I start with the user and business reason, then choose the smallest architecture that can grow without becoming fragile.",
  },
  {
    icon: ShieldCheck,
    title: "Production respect",
    text: "Validation, failure states, rate limits, uploads, performance, and empty states are part of the product, not cleanup work.",
  },
  {
    icon: Hammer,
    title: "Craft without clutter",
    text: "Motion and visuals must clarify intent. I avoid random effects and keep the interface focused on hierarchy and flow.",
  },
  {
    icon: Brain,
    title: "Learning loop",
    text: "Every build teaches a stronger pattern for architecture, UX, AI behavior, and the way teams actually use software.",
  },
];

export default function About() {
  return (
    <main className="page-shell">
      <Seo
        title="About"
        description="Shikhar's developer story, mindset, values, and product engineering approach."
      />
      <section className="section-pad pt-10">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="sticky top-28 hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow lg:block">
            <p className="text-sm font-semibold uppercase text-[color:var(--accent)]">Personal brand</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight">{profile.name}</h1>
            <p className="mt-5 text-base leading-8 text-[color:var(--muted)]">{profile.headline}</p>
            <div className="mt-6 grid gap-3">
              {["Builder", "Designer-minded", "Systems thinker", "AI product learner"].map((item) => (
                <span key={item} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--muted)]">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <div>
            <SectionHeader
              eyebrow="About"
              title="I build because the gap between idea and product is where the interesting work lives."
              description="The goal is not to decorate software. The goal is to make complex systems feel understandable, fast, and worth trusting."
            />

            <div className="grid gap-5">
              {[
                "I am drawn to products where interface quality and engineering quality have to meet. That includes AI tools, realtime systems, developer workflows, data-heavy apps, and personal brand sites where the first impression matters.",
                "My mindset is practical: ship the thing, test the experience, remove friction, then harden the parts that matter. I care about clean components, strong data boundaries, validation, and motion that earns its place.",
                "Long term, I want to become the kind of engineer who can take an ambiguous product problem and turn it into a polished, maintainable system that a team can confidently build on.",
              ].map((text) => (
                <Reveal key={text} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                  <p className="text-lg leading-9 text-[color:var(--text)]">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl">
          <SectionHeader
            eyebrow="How I think"
            title="Strong products come from taste, constraints, and clean execution."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.05} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
                {createElement(Icon, {
                  size: 22,
                  className: "mb-5 text-[color:var(--accent)]",
                })}
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
            <Cpu size={24} className="mb-5 text-[color:var(--accent)]" />
            <h2 className="text-3xl font-semibold">Currently building</h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              Better AI product interfaces, safer output patterns, more intentional motion systems, and full-stack products that make technical depth obvious without making the UI loud.
            </p>
          </Reveal>
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
            <Compass size={24} className="mb-5 text-[color:var(--accent-2)]" />
            <h2 className="text-3xl font-semibold">What I am learning</h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
              System design, AI evaluation loops, advanced frontend performance, better information architecture, and how to make product decisions that survive real usage.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
