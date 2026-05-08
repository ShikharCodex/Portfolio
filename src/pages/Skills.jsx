import { Activity, Code2, Database, Gauge, Github, Layers3 } from "lucide-react";
import { createElement } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { profile, skillGroups, stack } from "../data/portfolio";

const MotionDiv = motion.div;

const depth = [
  { label: "React architecture", value: 92 },
  { label: "Frontend animation", value: 90 },
  { label: "Node API design", value: 86 },
  { label: "MongoDB modeling", value: 82 },
  { label: "AI product flows", value: 80 },
  { label: "Performance polish", value: 78 },
];

const codingProfiles = [
  { label: "GitHub", value: "Public product builds", href: profile.github, icon: Github },
  { label: "LeetCode", value: "Problem-solving practice", href: "https://leetcode.com/u/ShikharBit/", icon: Activity },
  { label: "System design", value: "Growing production depth", href: "/experience", icon: Gauge },
];

export default function Skills() {
  return (
    <main className="page-shell">
      <Seo title="Skills" description="Shikhar's full-stack developer skills, tech stack, AI product experience, and coding profile signals." />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Skills and stack"
            title="A stack shaped around premium interfaces and real product delivery."
            description="Strong frontend craft, practical backend architecture, AI workflows, and a habit of thinking through what happens after the demo."
          />

          <div className="grid gap-5 lg:grid-cols-4">
            {skillGroups.map((group, index) => {
              const Icon = [Code2, Database, Layers3, Gauge][index];

              return (
                <Reveal key={group.title} delay={index * 0.04} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
                  {createElement(Icon, {
                    size: 23,
                    className: "mb-5 text-[color:var(--accent)]",
                  })}
                  <h2 className="text-xl font-semibold">{group.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{group.detail}</p>
                  <div className="mt-5 grid gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2 text-sm text-[color:var(--muted)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Depth map"
            title="Strength is measured by how confidently a tool can be used under constraints."
            description="These bars are not vanity ratings. They represent the areas where the portfolio work shows repeated, practical execution."
            className="mb-0"
          />
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
            <div className="grid gap-5">
              {depth.map((item, index) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-[color:var(--muted)]">{item.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[color:var(--surface-strong)]">
                    <MotionDiv
                      className="h-full rounded-full bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl">
          <SectionHeader eyebrow="Toolchain" title="The working set." />
          <Reveal className="flex flex-wrap gap-3 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
            {stack.map((item) => (
              <span key={item} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-4 py-3 text-sm font-semibold text-[color:var(--muted)]">
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl">
          <SectionHeader eyebrow="Coding profile" title="External signals and growth tracks." />
          <div className="grid gap-4 md:grid-cols-3">
            {codingProfiles.map(({ label, value, href, icon: Icon }) => (
              <Reveal key={label} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
                {createElement(Icon, {
                  size: 22,
                  className: "mb-5 text-[color:var(--accent)]",
                })}
                <h3 className="text-xl font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{value}</p>
                <a className="mt-5 inline-flex text-sm font-semibold text-[color:var(--accent)]" href={href}>
                  View signal
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
