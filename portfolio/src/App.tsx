import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Software from "./sections/Software";
import VisualDesign from "./sections/VisualDesign";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  // ── Cursor ──────────────────────────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100, rx: -100, ry: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button,[data-hover]"))
        ringRef.current?.classList.add("is-hovering");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a,button,[data-hover]"))
        ringRef.current?.classList.remove("is-hovering");
    };
    const tick = () => {
      const m = mouse.current;
      m.rx += (m.x - m.rx) * 0.14;
      m.ry += (m.y - m.ry) * 0.14;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${m.x}px`;
        cursorRef.current.style.top = `${m.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${m.rx}px`;
        ringRef.current.style.top = `${m.ry}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Nav scroll ──────────────────────────────────────────────────────────────
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Active section ──────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "projects", "design", "skills", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ── Scroll reveal ───────────────────────────────────────────────────────────
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <Navbar
        scrolled={navScrolled}
        activeSection={activeSection}
        onNav={scrollTo}
      />

      <main>
        <Hero onScrollDown={() => scrollTo("about")} />
        <About />
        <Software />
        <VisualDesign />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
