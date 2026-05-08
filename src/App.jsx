<<<<<<< HEAD
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Playground from "./components/Playground";
import Skills from "./components/Skills";
import Vault from "./components/Vault"; // Import the cinematic fan-out vault
import Rift from "./components/Rift";
import Process from "./components/Process";
import Footer from "./components/Footer";
import About from "./components/About";
import Sandbox from "./components/Sandbox";
import Focus from "./components/Focus";
import LanguageSection from "./components/Language";
import Max from "./components/Max";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Max />
      <Process />

      <Skills />
      <Rift />
      <Focus />

      <Projects />
      <LanguageSection />
      {/* <Sandbox/> */}

      <Vault />

      <Playground />
      <Footer />
=======
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
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
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
>>>>>>> 4c49be3997eb32e141649200546dfc75e1d01f56
