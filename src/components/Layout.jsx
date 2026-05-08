import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Outlet, useLocation } from "react-router-dom";
import CursorAura from "./CursorAura";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";

const MotionDiv = motion.div;

export default function Layout() {
  const location = useLocation();
  const staticPreview = new URLSearchParams(window.location.search).has("static");
  const [loaded, setLoaded] = useState(() => new URLSearchParams(window.location.search).has("skipLoader"));
  const finishLoading = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.toggle("reduced-motion", prefersReduced);

    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (value) => 1 - Math.pow(1 - value, 3),
      smoothWheel: true,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const pageContent = (
    <>
      <Outlet />
      <Footer />
    </>
  );

  return (
    <>
      <ScrollProgress />
      <CursorAura />
      <Navbar />
      <AnimatePresence>{!loaded && <LoadingScreen onDone={finishLoading} />}</AnimatePresence>
      {staticPreview ? (
        <div key={location.pathname}>{pageContent}</div>
      ) : (
        <AnimatePresence mode="wait">
          <MotionDiv
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {pageContent}
          </MotionDiv>
        </AnimatePresence>
      )}
    </>
  );
}
