import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { projects } from "../data/portfolio";

const filters = ["All", "AI", "Developer Tool", "Community", "Productivity"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visibleProjects = useMemo(() => {
    if (filter === "All") return projects;
    if (filter === "AI") return projects.filter((project) => project.type.includes("AI"));
    return projects.filter((project) => project.type.includes(filter));
  }, [filter]);

  return (
    <main className="page-shell">
      <Seo
        title="Projects"
        description="Premium case studies for Shikhar's full-stack projects, AI products, developer tools, realtime apps, and production-minded web systems."
      />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Project database"
            title="Work presented like product case studies."
            description="Not a gallery of cards. Each project explains the problem, decisions, feature depth, challenges, and production thinking behind the interface."
          />

          <Reveal className="mb-8 flex flex-wrap items-center gap-2 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-2">
            <span className="mr-2 inline-flex items-center gap-2 px-3 text-sm font-semibold text-[color:var(--muted)]">
              <Filter size={16} /> Filter
            </span>
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-semibold transition",
                  filter === item
                    ? "bg-[color:var(--text)] text-[#07100b]"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)]",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </Reveal>

          <div className="grid gap-8">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
