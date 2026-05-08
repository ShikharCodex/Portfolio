import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { createElement, lazy, Suspense } from "react";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Seo from "../components/Seo";
import { profile } from "../data/portfolio";

const ContactForm = lazy(() => import("../components/ContactForm"));

export default function Contact() {
  const socials = [
    { label: "GitHub", href: profile.github, icon: Github },
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    { label: "X", href: profile.twitter, icon: Twitter },
  ];

  return (
    <main className="page-shell">
      <Seo title="Contact" description="Contact Shikhar for full-stack roles, AI product builds, frontend animation systems, and premium web projects." />
      <section className="section-pad pt-10">
        <div className="container-xl grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="Bring a serious brief. I will bring product focus and full-stack execution."
              description="Recruiters, founders, and teams can use this page for role conversations, freelance builds, AI product work, or premium portfolio systems."
            />
            <div className="grid gap-4">
              <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                  <Mail size={18} className="text-[color:var(--accent)]" />
                  <a href={`mailto:${profile.email}`} className="font-semibold text-[color:var(--text)]">
                    {profile.email}
                  </a>
                </div>
              </Reveal>
              <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                  <MapPin size={18} className="text-[color:var(--accent)]" />
                  {profile.location}, open to remote collaboration
                </div>
              </Reveal>
              <Reveal className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
                <p className="mb-3 text-sm font-semibold text-[color:var(--text)]">Availability</p>
                <p className="text-sm leading-7 text-[color:var(--muted)]">{profile.availability}</p>
              </Reveal>
            </div>

            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--text)]"
                >
                  {createElement(Icon, { size: 18 })}
                </a>
              ))}
            </div>
          </div>

          <Reveal>
            <Suspense
              fallback={
                <div className="grid min-h-[540px] place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-sm font-semibold text-[color:var(--muted)]">
                  Loading contact form
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
