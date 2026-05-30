"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "12+", label: "Years of craft" },
  { value: "240", label: "Projects delivered" },
  { value: "98%", label: "Client retention" },
  { value: "34", label: "Global awards" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate paragraph lines in
    gsap.fromTo(
      section.querySelectorAll(".reveal-line"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate metrics count up
    section.querySelectorAll(".metric-value").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-value") || "0");
      const isPercent = el.getAttribute("data-suffix") === "%";
      const isPlus = el.getAttribute("data-suffix") === "+";

      gsap.fromTo(
        { val: 0 },
        { val: target },
        {
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent =
              Math.round(this.targets()[0].val) +
              (isPercent ? "%" : isPlus ? "+" : "");
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Horizontal rule reveal
    gsap.fromTo(
      section.querySelectorAll(".rule-reveal"),
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power4.inOut",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-obsidian py-40 px-8 overflow-hidden"
    >
      {/* Subtle background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] text-white/[0.015] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontWeight: 300, fontStyle: "italic" }}
        aria-hidden="true"
      >
        ABOUT
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left column */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden mb-3">
              <p className="reveal-line font-mono text-[10px] tracking-[0.45em] uppercase text-gold opacity-0">
                — About the Studio
              </p>
            </div>
            <hr className="rule-reveal border-none h-px bg-white/10 mb-12" />

            <div className="overflow-hidden">
              <h2
                className="reveal-line font-display text-[clamp(36px,4.5vw,72px)] leading-[1.05] text-ivory opacity-0"
                style={{ fontWeight: 300, fontStyle: "italic" }}
              >
                We believe luxury
                <br />
                is a language.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-10" ref={metricsRef}>
              {metrics.map((m) => {
                const numericVal = parseFloat(m.value);
                const suffix = m.value.replace(/[0-9.]/g, "");
                return (
                  <div key={m.label} className="group">
                    <hr className="rule-reveal border-none h-px bg-white/10 mb-4" />
                    <div
                      className="metric-value font-display text-5xl text-gold leading-none mb-2"
                      style={{ fontWeight: 300 }}
                      data-value={numericVal}
                      data-suffix={suffix}
                    >
                      {m.value}
                    </div>
                    <p className="font-body text-[11px] tracking-[0.2em] uppercase text-platinum/40">
                      {m.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 lg:pt-20">
            <div className="space-y-6">
              {[
                "Founded at the intersection of artistry and technology, our studio exists to serve those who refuse to compromise — brands, visionaries, and institutions that understand the transformative power of exceptional design.",
                "Every project begins with a single question: what does excellence look like here? We immerse ourselves in your world, study your audience, and construct experiences that speak directly to those who recognise quality without being told.",
                "From cinematic identities to digital sanctuaries, we work at the highest register of the craft — where every detail is intentional, every interaction considered, and every pixel placed with purpose.",
              ].map((text, i) => (
                <div key={i} className="overflow-hidden">
                  <p
                    className="reveal-line font-body text-[15px] leading-[1.8] text-platinum/60 opacity-0"
                    style={{ fontWeight: 300 }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden mt-16">
              <a
                href="#work"
                className="reveal-line inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.35em] uppercase text-gold group opacity-0"
              >
                View our work
                <span className="w-12 h-px bg-gold transition-all duration-500 group-hover:w-20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
