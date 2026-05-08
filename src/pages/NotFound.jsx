import { Terminal } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <main className="page-shell">
      <Seo title="404" description="The requested page could not be found." />
      <section className="grid min-h-[70vh] place-items-center px-5 py-20">
        <Reveal className="max-w-2xl text-center">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)]">
            <Terminal size={26} className="text-[color:var(--accent)]" />
          </div>
          <p className="mb-4 text-sm font-semibold uppercase text-[color:var(--accent)]">404</p>
          <h1 className="text-4xl font-semibold md:text-6xl">This route does not exist in the system.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[color:var(--muted)]">
            The page is missing, moved, or never shipped. Head back to the portfolio and continue from a stable route.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton to="/">Return home</MagneticButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
