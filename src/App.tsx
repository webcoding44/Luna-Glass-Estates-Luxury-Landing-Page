import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/gsap";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Philosophy from "./components/Philosophy";
import SmartHome from "./components/SmartHome";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Effects from "./components/Effects";

export default function App() {
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    window.scrollTo(0, 0);
  }, [gone]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if ("fonts" in document) document.fonts.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="noise relative min-h-screen bg-ink font-sans">
      {!gone && (
        <Preloader
          onExit={() => setReady(true)}
          onDone={() => {
            setGone(true);
            setTimeout(() => ScrollTrigger.refresh(), 100);
          }}
        />
      )}
      <Effects />
      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <Brands />
        <Philosophy />
        <SmartHome />
        <Projects />
        <Process />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
