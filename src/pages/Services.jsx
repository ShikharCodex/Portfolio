import { Check, Layers, Rocket, Shield, Sparkles } from "lucide-react";
import { createElement } from "react";
import MagneticButton from "../components/MagneticButton";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { services } from "../data/portfolio";

const process = [
  "Clarify the product outcome and constraints",
  "Map the system, data, and interface structure",
  "Build the core experience with clean components",
  "Polish motion, responsiveness, and failure states",
  "Prepare deployment, documentation, and next iteration",
];

export default function Services() {
  return (
    <main className="page-shell">
      <Seo title="Services" description="Premium full-stack engineering, AI product interface, motion system, and developer portfolio services by Shikhar." />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Services"
            title="Build support for products that need to feel premium and work reliably."
            description="Focused engagements for founders, teams, and personal brands that need more than a basic template or demo."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = [Sparkles, Rocket, Shield, Layers][index];

              return (
                <Reveal key={service.title} delay={index * 0.05} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
                  {createElement(Icon, {
                    size: 24,
                    className: "mb-5 text-[color:var(--accent)]",
                  })}
                  <h2 className="text-2xl font-semibold">{service.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{service.description}</p>
                  <div className="mt-6 grid gap-3">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                        <Check size={16} className="text-[color:var(--accent)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Process"
            title="A clean delivery rhythm from idea to production surface."
            description="The process is designed to keep momentum high while preserving enough structure for maintainable code."
            className="mb-0"
          />
          <div className="grid gap-3">
            {process.map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="flex items-center gap-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[color:var(--surface-strong)] text-sm font-semibold text-[color:var(--accent)]">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-[color:var(--muted)]">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <Reveal className="mx-auto max-w-7xl rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-8 premium-shadow md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase text-[color:var(--accent)]">Collaboration</p>
              <h2 className="text-3xl font-semibold md:text-5xl">Need a product that looks senior and behaves like one?</h2>
            </div>
            <MagneticButton to="/contact">Book the first conversation</MagneticButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
