"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Maison Beaumont",
    category: "Brand Identity · Web",
    year: "2024",
    color: "#1c1a14",
    accent: "#c9a84c",
  },
  {
    title: "Celestial Interiors",
    category: "Digital Experience",
    year: "2024",
    color: "#14181c",
    accent: "#6d9ec9",
  },
  {
    title: "Aldridge & Co.",
    category: "Art Direction · Motion",
    year: "2023",
    color: "#1c1414",
    accent: "#c96d6d",
  },
  {
    title: "Ferretti Group",
    category: "Brand System · E-commerce",
    year: "2023",
    color: "#141c16",
    accent: "#6dc98a",
  },
  {
    title: "Atelier Noir",
    category: "Identity · Packaging",
    year: "2022",
    color: "#18141c",
    accent: "#a86dc9",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".w-reveal"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );

    gsap.fromTo(
      section.querySelectorAll(".project-row"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".project-list", start: "top 80%" },
      }
    );

    // Floating preview follows cursor (desktop)
    const moveHandler = (e: MouseEvent) => {
      if (previewRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative bg-obsidian py-40 px-8 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          <div>
            <p className="w-reveal font-mono text-[10px] tracking-[0.45em] uppercase text-gold mb-4 opacity-0">
              — Selected Work
            </p>
            <h2
              className="w-reveal font-display text-[clamp(40px,5vw,80px)] leading-[1.0] text-ivory opacity-0"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              A curated
              <br />
              portfolio
            </h2>
          </div>
          <p
            className="w-reveal font-body text-[13px] leading-[1.8] text-platinum/40 max-w-xs opacity-0"
            style={{ fontWeight: 300 }}
          >
            A selection of recent collaborations with brands who refuse the ordinary.
          </p>
        </div>

        {/* Project list */}
        <div className="project-list border-t border-white/10">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href="#contact"
              className="project-row group relative flex items-center justify-between py-10 border-b border-white/10 opacity-0 transition-all duration-500 hover:px-6"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover fill */}
              <span className="absolute inset-0 bg-graphite/40 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />

              <div className="flex items-baseline gap-8">
                <span className="font-mono text-[10px] tracking-widest text-gold/50 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-display text-[clamp(28px,4vw,56px)] text-ivory/80 group-hover:text-ivory transition-colors duration-400 leading-none"
                  style={{ fontWeight: 300 }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-10">
                <span className="hidden md:block font-body text-[11px] tracking-[0.2em] uppercase text-platinum/40">
                  {project.category}
                </span>
                <span className="hidden sm:block font-mono text-[11px] text-platinum/30">
                  {project.year}
                </span>
                <span className="text-gold/40 group-hover:text-gold group-hover:rotate-45 transition-all duration-400">
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Floating cursor preview */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-30 pointer-events-none hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className="w-[280px] h-[200px] -ml-[140px] -mt-[100px] flex items-center justify-center transition-all duration-500 overflow-hidden"
          style={{
            opacity: hovered !== null ? 1 : 0,
            scale: hovered !== null ? "1" : "0.8",
            backgroundColor: hovered !== null ? projects[hovered].color : "#111",
          }}
        >
          {hovered !== null && (
            <>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${projects[hovered].accent}40, transparent 70%)`,
                }}
              />
              <span
                className="font-display text-3xl italic relative z-10"
                style={{ color: projects[hovered].accent, fontWeight: 300 }}
              >
                {projects[hovered].title}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
