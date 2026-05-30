"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Lock scroll while preloading
    document.body.style.overflow = "hidden";

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Count 0 -> 100
    tl.to(counter, {
      val: 100,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0");
        }
      },
    });

    // Fade the label/counter
    tl.to([counterRef.current, labelRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
    });

    // Curtain reveal — split panels slide away
    tl.to(
      ".preloader-panel",
      {
        scaleY: 0,
        duration: 1.1,
        ease: "power4.inOut",
        stagger: 0.08,
        transformOrigin: "top",
      },
      "-=0.1"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      {/* Split panels that form the curtain */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="preloader-panel flex-1 bg-obsidian border-r border-white/[0.02]"
          />
        ))}
      </div>

      {/* Counter */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          ref={counterRef}
          className="font-display text-[clamp(80px,14vw,200px)] text-ivory leading-none"
          style={{ fontWeight: 300, fontStyle: "italic" }}
        >
          000
        </span>
        <div
          ref={labelRef}
          className="font-mono text-[10px] tracking-[0.5em] uppercase text-gold mt-6"
        >
          Lumière — Loading Experience
        </div>
      </div>
    </div>
  );
}
