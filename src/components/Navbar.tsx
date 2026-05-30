"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Work", href: "#selected-work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Scroll-based style change
    ScrollTrigger.create({
      start: "top -60px",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "glassmorphism py-4" : "py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl tracking-[0.2em] text-ivory hover:text-gold transition-colors duration-500"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            LUMIÈRE
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[11px] tracking-[0.25em] uppercase text-ash hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#contact"
              className="font-body text-[11px] tracking-[0.25em] uppercase border border-gold/30 text-gold px-6 py-2.5 hover:bg-gold hover:text-obsidian transition-all duration-400"
            >
              Inquire
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-platinum p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian flex flex-col justify-center items-center transition-all duration-700 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl text-ivory hover:text-gold transition-colors duration-300"
              style={{ fontStyle: "italic", fontWeight: 300 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
