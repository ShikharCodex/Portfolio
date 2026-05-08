import { Award, BadgeCheck, Map, Trophy } from "lucide-react";
import { createElement } from "react";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import Timeline from "../components/Timeline";
import { achievements, certifications, experience } from "../data/portfolio";

export default function Experience() {
  return (
    <main className="page-shell">
      <Seo title="Experience" description="Shikhar's developer journey, timeline, achievements, certifications, and professional growth." />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Experience and journey"
            title="A build path shaped by full-stack products, AI interfaces, and practical engineering reps."
            description="This journey is presented as evidence of how the work has evolved: more product thinking, stronger UI systems, cleaner backend habits, and better production instincts."
          />
          <Timeline items={experience} />
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Achievements" title="Proof of momentum." />
            <div className="grid gap-4">
              {achievements.map((item, index) => (
                <Reveal key={item} delay={index * 0.04} className="flex gap-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                  <Trophy size={20} className="mt-1 shrink-0 text-[color:var(--accent)]" />
                  <p className="text-sm leading-7 text-[color:var(--muted)]">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Certifications and learning" title="Structured growth areas." />
            <div className="grid gap-4">
              {certifications.map((item, index) => (
                <Reveal key={item} delay={index * 0.04} className="flex gap-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                  <Award size={20} className="mt-1 shrink-0 text-[color:var(--accent-2)]" />
                  <p className="text-sm leading-7 text-[color:var(--muted)]">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-5 md:grid-cols-3">
          {[
            { icon: Map, title: "Direction", text: "Move toward senior product engineering with stronger system design and AI reliability." },
            { icon: BadgeCheck, title: "Operating style", text: "Prototype quickly, then raise standards around data, UX, validation, and maintainability." },
            { icon: Trophy, title: "Differentiator", text: "Blend serious full-stack engineering with memorable, premium interface direction." },
          ].map(({ icon: Icon, title, text }) => (
            <Reveal key={title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
              {createElement(Icon, {
                size: 22,
                className: "mb-5 text-[color:var(--accent)]",
              })}
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
