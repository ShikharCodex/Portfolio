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
      <Rift />
      <About />
      <Process />
      
      <Skills />
      <Focus />

      <Projects />
      {/* <Sandbox/> */}

      <Vault />
      
      <Playground />
      <Footer />
    </div>
  );
}

export default App;
