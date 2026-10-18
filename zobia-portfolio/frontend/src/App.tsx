import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import ScrollColorOverlay from "./components/ScrollColorOverlay";
import { ParticleField } from "./components/fx/ParticleField";
import GardenSky from "./components/GardenSky";
import ColorGlowBackground from "./components/ColorGlowBackground";
import CursorSpotlight from "./components/CursorSpotlight";
import CommandPalette from "./components/CommandPalette";
import NovaBot from "./components/NovaBot";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Skills from "./components/Skills";
import SkillsMarquee from "./components/SkillsMarquee";
import Projects3D from "./components/Projects3D";
import Certificates from "./components/Certificates";
import Competitive from "./components/Competitive";
import Experience from "./components/Experience";
import SketchGallery from "./components/SketchGallery";
import Currently from "./components/Currently";
import Internship from "./components/Internship";
import SketchesPage from "./components/SketchesPage";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isSketches = () => window.location.hash === "#/sketches";
  const [route, setRoute] = useState<"home" | "sketches">(isSketches() ? "sketches" : "home");

  useEffect(() => {
    const onHash = () => setRoute(isSketches() ? "sketches" : "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (route === "sketches") {
      window.scrollTo(0, 0);
      return;
    }
    const h = window.location.hash;
    if (h && h.length > 1) {
      const t = setTimeout(() => {
        try {
          document.querySelector(h)?.scrollIntoView();
        } catch {
          /* ignore invalid hash */
        }
      }, 60);
      return () => clearTimeout(t);
    }
  }, [route]);

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ColorGlowBackground />
      <ParticleField />
      <GardenSky />
      <ScrollProgress />
      <ScrollColorOverlay />
      <CursorSpotlight />
      <CommandPalette />
      {!loading && <NovaBot />}
      <Nav route={route} />
      {route === "sketches" ? (
        <SketchesPage />
      ) : (
        <>
      <Hero start={!loading} />
      <Services />
      <About />
      <Currently />
      <Skills />
      <SkillsMarquee />
      <Projects3D />
      <Certificates />
      <Competitive />
      <Experience />
      <Internship />
      <SketchGallery />
      <Contact />
        </>
      )}
      <Footer />
    </>
  );
}
