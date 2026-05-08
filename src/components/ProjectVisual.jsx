import { motion } from "framer-motion";

const MotionDiv = motion.div;

const rows = {
  code: ["const share = await mesh.create(snippet)", "router.get('/p/:id', resolvePaste)", "return secureResponse(payload)"],
  ai: ["memory.sync(context)", "evaluate.intent(input)", "respond.withPersonality()"],
  medical: ["symptoms.map(signal)", "risk.level = triage(data)", "explain.nextSteps()"],
  vision: ["image.detect(ingredients)", "recipe.rank(matches)", "nutrition.estimate(plan)"],
  map: ["case.index(location)", "community.report(item)", "notify.nearbyUsers()"],
  notes: ["limit.consume(request)", "note.persist(changes)", "sync.cleanState()"],
};

export default function ProjectVisual({ project, compact = false }) {
  const lines = rows[project.visual] || rows.code;

  return (
    <div
      className={[
        "scanline relative overflow-hidden rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] premium-shadow",
        compact ? "min-h-64" : "min-h-[420px]",
      ].join(" ")}
      style={{ "--project-accent": project.accent }}
    >
      <div className="absolute inset-0 grid-mask opacity-70" />
      <div className="relative flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff6b4a]" />
          <span className="h-3 w-3 rounded-full bg-[#f5a524]" />
          <span className="h-3 w-3 rounded-full bg-[#3ddc97]" />
        </div>
        <span className="text-xs font-semibold text-[color:var(--muted)]">{project.status}</span>
      </div>

      <div className="relative grid gap-5 p-5 md:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase" style={{ color: project.accent }}>
              {project.type}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
          </div>
          <div className="rounded-lg border border-[color:var(--line)] px-3 py-2 text-right text-xs text-[color:var(--muted)]">
            <span className="block font-semibold text-[color:var(--text)]">{project.year}</span>
            shipped
          </div>
        </div>

        <div className="grid gap-3">
          {lines.map((line, index) => (
            <MotionDiv
              key={line}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-4 py-3 font-mono text-xs text-[color:var(--muted)]"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
              <span>{line}</span>
            </MotionDiv>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric}
              className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4"
            >
              <span className="text-xs leading-5 text-[color:var(--muted)]">{metric}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
