import { Download, FileText } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import Timeline from "../components/Timeline";
import { achievements, experience, profile, skillGroups } from "../data/portfolio";

export default function Resume() {
  return (
    <main className="page-shell">
      <Seo title="Resume" description="Downloadable resume and professional summary for Shikhar, full-stack product engineer." />
      <section className="section-pad pt-10">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow lg:sticky lg:top-28 lg:self-start">
            <FileText size={26} className="mb-5 text-[color:var(--accent)]" />
            <h1 className="text-4xl font-semibold md:text-5xl">{profile.name}</h1>
            <p className="mt-3 text-lg text-[color:var(--muted)]">{profile.title}</p>
            <p className="mt-5 text-sm leading-7 text-[color:var(--muted)]">{profile.headline}</p>
            <div className="mt-6 grid gap-3 text-sm text-[color:var(--muted)]">
              <span>{profile.email}</span>
              <span>{profile.location}</span>
              <span>{profile.github}</span>
            </div>
            <MagneticButton href={profile.resume} download icon="download" className="mt-7 w-full">
              Download resume
            </MagneticButton>
          </Reveal>

          <div>
            <SectionHeader
              eyebrow="Resume"
              title="A concise view of skills, experience, and project proof."
              description="The resume page is structured for recruiters, clients, and technical reviewers who want signal quickly."
            />
            <Timeline items={experience} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[color:var(--surface)]">
        <div className="container-xl grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Core strengths" title="What I bring." />
            <div className="grid gap-3">
              {achievements.map((item) => (
                <Reveal key={item} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5 text-sm leading-7 text-[color:var(--muted)]">
                  {item}
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="Skill areas" title="Practical stack coverage." />
            <div className="grid gap-4">
              {skillGroups.map((group) => (
                <Reveal key={group.title} className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-5">
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{group.skills.join(", ")}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <Reveal className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-semibold">Need the downloadable version?</h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">A lightweight resume file is included in the public assets.</p>
          </div>
          <a
            href={profile.resume}
            download
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[color:var(--text)] px-5 py-3 text-sm font-semibold text-[#07100b] transition hover:bg-[color:var(--accent)]"
          >
            Download <Download size={17} />
          </a>
        </Reveal>
      </section>
    </main>
  );
}
