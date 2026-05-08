import { Github, Linkedin, Mail, MapPin, Terminal, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: profile.github, Icon: Github },
    { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
    { label: "X", href: profile.twitter, Icon: Twitter },
    { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--bg)] px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link to="/" className="mb-5 inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--text)] text-[color:var(--bg)]">
              <Terminal size={19} />
            </span>
            <span>
              <span className="block font-semibold">{profile.brand}</span>
              <span className="block text-sm text-[color:var(--muted)]">{profile.title}</span>
            </span>
          </Link>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            Premium full-stack engineering across React, Node.js, AI workflows,
            realtime systems, and interfaces that make a strong first impression.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Navigate</h3>
          <div className="grid gap-3 text-sm text-[color:var(--muted)]">
            {[...navLinks, { label: "Resume", path: "/resume" }, { label: "Articles", path: "/articles" }].map(
              (link) => (
                <Link key={link.path} to={link.path} className="transition hover:text-[color:var(--text)]">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase">Signal</h3>
          <div className="mb-5 flex items-center gap-2 text-sm text-[color:var(--muted)]">
            <MapPin size={16} className="text-[color:var(--accent)]" />
            {profile.location}, {profile.timezone}
          </div>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon: SocialIcon }) => ( // eslint-disable-line no-unused-vars
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                <SocialIcon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[color:var(--line)] pt-6 text-xs text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>Copyright {year} {profile.brand}. Built with React, Tailwind, Framer Motion, GSAP, and Lenis.</span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
          Available for serious builds
        </span>
      </div>
    </footer>
  );
}
