import { Suspense, lazy, useEffect, useState } from "react";
import Background3D from "./components/Background3D";
import CursorEffect from "./components/CursorEffect";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function SEOUpdater() {
  useEffect(() => {
    const meta = {
  title: "Ayush Bhardwaj | Full Stack Developer & ECE Engineer",
  description:
    "Ayush Bhardwaj — A passionate Full Stack Developer and ECE student at IIIT Kota. Specializing in Next.js, MERN stack, AI integrations, and RF simulations. Based in Rajasthan, India.",
};
    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://github.com/ayushbhardwaj552");

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://github.com/ayushbhardwaj552");
  }, []);

  return null;
}

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "about", "education", "skills", "projects", "contact"];
    let rafId = null;
    const pickActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.42;
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (sections.length === 0) return;

      let nextSection = "home";
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextSection = section.id;
        }
      });

      setActiveSection(nextSection);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        pickActiveSection();
        rafId = null;
      });
    };

    pickActiveSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      <SEOUpdater />
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen flex flex-col">
          <Background3D activeSection={activeSection} />
          <CursorEffect />
          <Navbar />
          <main className="flex-grow relative z-10">
            <section id="home" className="scroll-mt-20">
              <Home />
            </section>
            <section id="about" className="scroll-mt-20">
              <About />
            </section>
            <section id="education" className="scroll-mt-20">
              <Education />
            </section>
            <section id="skills" className="scroll-mt-20">
              <Skills />
            </section>
            <section id="projects" className="scroll-mt-20">
              <Projects />
            </section>
            <section id="contact" className="scroll-mt-20">
              <Contact />
            </section>
          </main>
          <section id="footer" className="scroll-mt-20 relative z-10">
            <Footer />
          </section>
        </div>
      </Suspense>
    </>
  );
}

export default App;
