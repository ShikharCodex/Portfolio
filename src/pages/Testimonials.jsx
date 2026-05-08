import { Quote, Star } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { testimonials } from "../data/portfolio";

export default function Testimonials() {
  return (
    <main className="page-shell">
      <Seo title="Testimonials" description="Testimonials and trust signals for Shikhar's full-stack product engineering work." />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Testimonials"
            title="Signal from collaborators who value product judgment and execution."
            description="The common thread is not just speed. It is the ability to make an idea feel like a real, considered product."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
                <Quote size={26} className="mb-6 text-[color:var(--accent)]" />
                <p className="text-lg leading-8 text-[color:var(--text)]">"{item.quote}"</p>
                <div className="mt-6 border-t border-[color:var(--line)] pt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{item.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-5 md:grid-cols-3">
          {[
            ["Clarity", "Ambiguous ideas become scoped screens, flows, APIs, and tradeoffs."],
            ["Speed", "Fast prototypes stay organized enough to become production foundations."],
            ["Polish", "Motion, responsive behavior, copy, and visual hierarchy are treated seriously."],
          ].map(([title, text]) => (
            <Reveal key={title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
              <Star size={21} className="mb-5 text-[color:var(--accent)]" />
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
