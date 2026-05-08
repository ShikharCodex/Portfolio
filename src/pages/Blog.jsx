import { ArrowRight, BookOpen } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { articles } from "../data/portfolio";

export default function Blog() {
  return (
    <main className="page-shell">
      <Seo title="Articles" description="Developer articles by Shikhar on portfolio quality, AI UX, backend reliability, and product engineering." />
      <section className="section-pad pt-10">
        <div className="container-xl">
          <SectionHeader
            eyebrow="Articles"
            title="Writing that turns engineering taste into reusable thinking."
            description="A premium portfolio benefits from proof of thought. These article concepts frame the way Shikhar thinks about product quality, AI UX, and backend reliability."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.05} className="group rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-6 premium-shadow">
                <BookOpen size={22} className="mb-5 text-[color:var(--accent)]" />
                <p className="mb-3 text-sm font-semibold text-[color:var(--accent)]">{article.category}</p>
                <h2 className="text-2xl font-semibold leading-tight">{article.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{article.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[color:var(--line)] pt-5 text-sm">
                  <span className="text-[color:var(--muted)]">{article.readTime}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-[color:var(--accent)]">
                    Draft <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
