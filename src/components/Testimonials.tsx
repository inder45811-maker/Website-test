"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Working with Lumière was the single best decision we made in our rebrand. They didn't just execute — they elevated every expectation we had.",
    author: "Victoria Laurent",
    role: "CEO, Maison Beaumont",
    location: "Paris, FR",
  },
  {
    quote:
      "The attention to detail is extraordinary. Our digital presence now genuinely reflects who we are — which is something we'd been trying to achieve for years.",
    author: "James Ashworth",
    role: "Creative Director, Aldridge & Co.",
    location: "London, UK",
  },
  {
    quote:
      "They understand that luxury isn't about excess — it's about precision. Our platform performs as beautifully as it looks.",
    author: "Sophia Chen",
    role: "Founder, Celestial Interiors",
    location: "New York, US",
  },
  {
    quote:
      "Lumière brought a level of strategic thinking we didn't expect from a design studio. They shaped the story before they touched the visuals.",
    author: "Marco Ferretti",
    role: "Brand Director, Ferretti Group",
    location: "Milan, IT",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header reveal
    gsap.fromTo(
      section.querySelectorAll(".t-reveal"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    // Cards staggered reveal
    gsap.fromTo(
      section.querySelectorAll(".t-card"),
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-onyx py-40 px-8 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-8">
          <div>
            <p className="t-reveal font-mono text-[10px] tracking-[0.45em] uppercase text-gold mb-4 opacity-0">
              — Client Voices
            </p>
            <h2
              className="t-reveal font-display text-[clamp(40px,5vw,80px)] leading-[1.0] text-ivory opacity-0"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Those who've
              <br />
              experienced it
            </h2>
          </div>

          {/* Active indicator */}
          <div className="t-reveal flex items-center gap-3 opacity-0">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-400 ${
                  active === i
                    ? "w-8 h-px bg-gold"
                    : "w-3 h-px bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`t-card group relative bg-onyx p-12 opacity-0 cursor-pointer transition-all duration-500 ${
                active === i ? "bg-graphite" : "hover:bg-graphite/50"
              }`}
              onClick={() => setActive(i)}
            >
              {/* Quote icon */}
              <div className="mb-8 text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                <Quote size={28} strokeWidth={1} />
              </div>

              {/* Quote text */}
              <blockquote
                className="font-display text-[clamp(16px,1.4vw,22px)] leading-[1.6] text-ivory/80 mb-10"
                style={{ fontWeight: 300, fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div
                className={`h-px mb-8 transition-all duration-700 ${
                  active === i ? "bg-gold/50 w-12" : "bg-white/10 w-8 group-hover:w-12 group-hover:bg-gold/30"
                }`}
              />

              {/* Attribution */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-body text-[13px] text-ivory tracking-wide mb-1">
                    {t.author}
                  </p>
                  <p className="font-body text-[11px] tracking-[0.15em] uppercase text-platinum/30">
                    {t.role}
                  </p>
                </div>
                <p className="font-mono text-[9px] tracking-[0.3em] text-platinum/20">
                  {t.location}
                </p>
              </div>

              {/* Active gold border */}
              {active === i && (
                <div className="absolute inset-0 border border-gold/15 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-16">
          <p
            className="font-display text-[clamp(24px,3vw,48px)] text-ivory leading-tight"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Ready to begin
            <br />
            your story?
          </p>
          <a
            href="#contact"
            id="contact"
            className="group inline-flex items-center gap-5 font-mono text-[10px] tracking-[0.35em] uppercase border border-gold/30 text-gold px-10 py-5 hover:bg-gold hover:text-obsidian transition-all duration-500"
          >
            Start a project
            <span className="w-8 h-px bg-current transition-all duration-400 group-hover:w-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
