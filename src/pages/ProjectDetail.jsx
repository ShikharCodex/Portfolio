import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";
import ProjectVisual from "../components/ProjectVisual";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { projects } from "../data/portfolio";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="page-shell">
        <section className="section-pad">
          <div className="container-xl">
            <SectionHeader title="Project not found." description="The case study you requested does not exist." />
            <MagneticButton to="/projects">Back to projects</MagneticButton>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <Seo
        title={`${project.name} Case Study`}
        description={`${project.name} project case study by Shikhar covering problem, features, challenges, stack, and production thinking.`}
      />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase" style={{ color: project.accent }}>
                {project.type} / {project.status}
              </p>
              <h1 className="text-5xl font-semibold leading-tight md:text-7xl">{project.name}</h1>
              <p className="mt-6 text-lg leading-8 text-[color:var(--muted)]">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href={project.links.live}>Open live</MagneticButton>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[color:var(--line)] px-4 text-sm font-semibold text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
                >
                  GitHub <Github size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal>
              <ProjectVisual project={project} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Problem"
            title="The product reason behind the build."
            description={project.problem}
            className="mb-0"
          />
          <Reveal className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                <p className="text-sm font-semibold text-[color:var(--accent)]">Signal</p>
                <p className="mt-3 text-lg font-semibold">{metric}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-xl grid gap-8 lg:grid-cols-3">
          {[
            ["Features built", project.features],
            ["Challenges faced", project.challenges],
            ["Tech stack", project.stack],
          ].map(([title, items]) => (
            <Reveal key={title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <div className="mt-5 grid gap-3">
                {items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-[color:var(--muted)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ background: project.accent }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <SectionHeader
              eyebrow="Production thinking"
              title="The work is shaped to evolve beyond the demo."
              description={project.production}
              className="mb-0"
            />
            <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-6">
              <h3 className="text-xl font-semibold">Case study actions</h3>
              <div className="mt-5 grid gap-3">
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-[color:var(--line)] p-4 text-sm font-semibold transition hover:border-[color:var(--accent)]"
                >
                  View live product <ExternalLink size={16} />
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-between rounded-lg border border-[color:var(--line)] p-4 text-sm font-semibold transition hover:border-[color:var(--accent)]"
                >
                  Discuss a similar build <ExternalLink size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
