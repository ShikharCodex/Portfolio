import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Services = lazy(() => import("./pages/Services"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Resume = lazy(() => import("./pages/Resume"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-[color:var(--bg)] text-sm font-semibold text-[color:var(--muted)]">
      Loading page
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="services" element={<Services />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="resume" element={<Resume />} />
            <Route path="articles" element={<Blog />} />
            <Route path="blog" element={<Navigate to="/articles" replace />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
