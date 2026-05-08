import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import ProjectVisual from "./ProjectVisual";
import Reveal from "./Reveal";

export default function ProjectCard({ project, featured = false }) {
  return (
    <Reveal
      className={[
        "grid gap-6 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-4 premium-shadow md:p-5",
        featured ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : "",
      ].join(" ")}
    >
      <ProjectVisual project={project} compact={!featured} />
      <div className="grid gap-5 p-1 md:p-2">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-[color:var(--muted)]">
            <span style={{ color: project.accent }}>{project.type}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--muted)]" />
            <span>{project.year}</span>
          </div>
          <h3 className="text-2xl font-semibold md:text-3xl">{project.name}</h3>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)] md:text-base">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, featured ? 8 : 5).map((item) => (
            <span
              key={item}
              className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-3 py-2 text-xs text-[color:var(--muted)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <MagneticButton to={`/projects/${project.slug}`} variant="primary">
            Case study
          </MagneticButton>
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[color:var(--line)] px-4 text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
          >
            Live <ExternalLink size={16} />
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
            aria-label={`${project.name} GitHub`}
          >
            <Github size={17} />
          </a>
        </div>

        {!featured && (
          <Link
            to={`/projects/${project.slug}`}
            className="text-sm font-semibold text-[color:var(--accent)]"
          >
            Read the build notes
          </Link>
        )}
      </div>
    </Reveal>
  );
}
