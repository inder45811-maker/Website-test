"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem, Layers, Zap, Globe, Eye, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Every asset, every interaction, every frame is held to the same exacting standard — the one you set when you chose to work with us.",
    size: "large",
  },
  {
    icon: Eye,
    title: "Visual Storytelling",
    description:
      "We compose narratives through motion, type, and negative space — language that speaks before a word is read.",
    size: "small",
  },
  {
    icon: Layers,
    title: "Systems Thinking",
    description:
      "Design systems that scale without losing their soul. Identity that travels across every surface.",
    size: "small",
  },
  {
    icon: Zap,
    title: "Performance-First",
    description:
      "Cinematic visuals that load in milliseconds. We never sacrifice speed for beauty — we engineer both.",
    size: "small",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "Working with clients across five continents, our sensibility is both locally attuned and globally fluent.",
    size: "small",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognised by Awwwards, FWA, and D&AD — not for the accolades, but for what they say about the work.",
    size: "large",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".feature-card"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      }
    );

    // Hover magnetic effect on cards
    section.querySelectorAll<HTMLElement>(".feature-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-obsidian py-40 px-8 overflow-hidden"
    >
      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${(i + 1) * (100 / 7)}%` }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 gap-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase text-gold mb-4">
              — Our Philosophy
            </p>
            <h2
              className="font-display text-[clamp(40px,5vw,80px)] leading-[1.0] text-ivory"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              What we bring
              <br />
              to the table
            </h2>
          </div>
          <p className="font-body text-[13px] leading-[1.8] text-platinum/40 max-w-sm" style={{ fontWeight: 300 }}>
            Six principles that define how we approach every brief, every client, every line of code.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            return (
              <div
                key={feature.title}
                className={`feature-card group relative bg-obsidian p-10 opacity-0 cursor-default overflow-hidden transition-colors duration-500 hover:bg-graphite ${
                  isLarge && i === 0 ? "lg:col-span-2" : ""
                } ${isLarge && i === 5 ? "lg:col-span-2" : ""}`}
                style={{ perspective: "800px", transformStyle: "preserve-3d" }}
              >
                {/* Top-left number */}
                <span className="absolute top-6 right-8 font-mono text-[10px] tracking-widest text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Gold accent line that grows on hover */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold/60 transition-all duration-700 group-hover:w-full" />

                <div className="mb-8">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold/60 group-hover:border-gold/50 group-hover:text-gold transition-all duration-500">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                </div>

                <h3
                  className="font-display text-2xl text-ivory mb-4 leading-tight"
                  style={{ fontWeight: 400 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-body text-[13px] leading-[1.8] text-platinum/40 group-hover:text-platinum/60 transition-colors duration-500"
                  style={{ fontWeight: 300 }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
