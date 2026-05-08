import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

export default function Timeline({ items }) {
  return (
    <div className="relative grid gap-6">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-[color:var(--line)] md:block" />
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.05} className="relative md:pl-12">
          <div className="absolute left-0 top-7 hidden h-8 w-8 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] md:grid">
            <CheckCircle2 size={16} className="text-[color:var(--accent)]" />
          </div>
          <article className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5 premium-shadow md:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-[color:var(--surface-strong)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                {item.period}
              </span>
              <span className="text-sm text-[color:var(--muted)]">{item.company}</span>
            </div>
            <h3 className="text-xl font-semibold md:text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] md:text-base">
              {item.description}
            </p>
            <div className="mt-5 grid gap-3">
              {item.points.map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-6 text-[color:var(--muted)]">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-[color:var(--accent)]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
