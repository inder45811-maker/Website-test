"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Wait for video metadata to load
    const initScrollScrub = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // Pin the section and scrub video via scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          video.currentTime = progress * duration;

          // Progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress * 100}%`;
          }

          // Overlay fades in as video scrubs
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              opacity: 0.3 + progress * 0.45,
            });
          }

          // Text parallax out
          if (headlineRef.current && subRef.current) {
            gsap.set([headlineRef.current, subRef.current], {
              y: progress * -120,
              opacity: 1 - progress * 2.5,
            });
          }

          // Scroll indicator fades out
          if (scrollIndicatorRef.current) {
            gsap.set(scrollIndicatorRef.current, {
              opacity: 1 - progress * 6,
            });
          }
        },
      });
    };

    if (video.readyState >= 1) {
      initScrollScrub();
    } else {
      video.addEventListener("loadedmetadata", initScrollScrub);
    }

    // Entrance animation for hero text
    const tl = gsap.timeline({ delay: 0.8 });
    tl.fromTo(
      ".hero-line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", stagger: 0.15 }
    )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    // Floating scroll arrow
    gsap.to(".scroll-arrow", {
      y: 8,
      duration: 1.4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      video.removeEventListener("loadedmetadata", initScrollScrub);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-obsidian"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Cinematic vignette overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-radial from-transparent via-obsidian/20 to-obsidian/90"
        style={{ opacity: 0.3 }}
      />

      {/* Side vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian/80 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />

      {/* Hero Text */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8"
      >
        <div className="overflow-hidden mb-2">
          <p className="hero-line font-mono text-[10px] tracking-[0.5em] uppercase text-gold mb-8 opacity-0">
            Est. 2024 — Creative Studio
          </p>
        </div>

        <div className="overflow-hidden">
          <h1
            className="hero-line font-display text-[clamp(56px,9vw,160px)] leading-[0.9] tracking-tight text-ivory opacity-0 text-center"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            The Art of
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="hero-line font-display text-[clamp(56px,9vw,160px)] leading-[0.9] tracking-tight text-gradient-gold opacity-0 text-center"
            style={{ fontWeight: 300 }}
          >
            Distinction
          </h1>
        </div>

        <p
          ref={subRef}
          className="font-body text-[13px] tracking-[0.2em] uppercase text-platinum/60 mt-10 opacity-0 text-center max-w-sm"
        >
          Crafting experiences that transcend the ordinary
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-platinum/40">
          Scroll
        </span>
        <div className="scroll-arrow text-gold/60">
          <ArrowDown size={16} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-20">
        <div
          ref={progressBarRef}
          className="h-full bg-gold/60 transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* Corner marks — cinematic framing */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((classes, i) => (
        <div
          key={i}
          className={`absolute w-8 h-8 ${classes} border-gold/25 pointer-events-none z-10`}
        />
      ))}
    </section>
  );
}
