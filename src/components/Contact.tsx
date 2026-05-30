"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "submitting" | "success";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelectorAll(".c-reveal"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: section, start: "top 70%" },
      }
    );

    // Giant marquee word parallax
    gsap.to(".contact-marquee", {
      xPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    // Simulated submission (no backend)
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3500);
    }, 1400);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-obsidian pt-40 pb-24 px-8 overflow-hidden"
    >
      {/* Giant background word */}
      <div
        className="contact-marquee absolute top-10 left-0 font-display text-[24vw] text-white/[0.02] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontWeight: 300, fontStyle: "italic" }}
        aria-hidden="true"
      >
        Let&rsquo;s create together
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — intro + details */}
          <div className="lg:col-span-5">
            <p className="c-reveal font-mono text-[10px] tracking-[0.45em] uppercase text-gold mb-6 opacity-0">
              — Get in Touch
            </p>
            <h2
              className="c-reveal font-display text-[clamp(40px,5.5vw,88px)] leading-[0.95] text-ivory mb-12 opacity-0"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Begin the
              <br />
              conversation
            </h2>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "studio@lumiere.design" },
                { icon: Phone, label: "Telephone", value: "+33 1 84 88 00 12" },
                { icon: MapPin, label: "Studio", value: "12 Rue Saint-Honoré, Paris" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="c-reveal flex items-center gap-5 opacity-0">
                    <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold/60">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-platinum/30 mb-1">
                        {item.label}
                      </p>
                      <p className="font-body text-[14px] text-ivory/80">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="c-reveal opacity-0 space-y-10">
              {[
                { name: "name", label: "Your Name", type: "text", placeholder: "Victoria Laurent" },
                { name: "email", label: "Email Address", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <div key={field.name} className="group">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-platinum/40 mb-4">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.name as "name" | "email"]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 py-4 text-ivory text-lg font-display placeholder:text-white/15 focus:border-gold focus:outline-none transition-colors duration-400"
                    style={{ fontWeight: 300 }}
                  />
                </div>
              ))}

              <div className="group">
                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-platinum/40 mb-4">
                  Tell us about your project
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="We're looking to reimagine our brand for a discerning audience…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/15 py-4 text-ivory text-lg font-display placeholder:text-white/15 focus:border-gold focus:outline-none transition-colors duration-400 resize-none"
                  style={{ fontWeight: 300 }}
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="group relative inline-flex items-center gap-5 font-mono text-[10px] tracking-[0.35em] uppercase border border-gold/30 text-gold px-10 py-5 hover:bg-gold hover:text-obsidian transition-all duration-500 disabled:opacity-60"
              >
                {status === "idle" && (
                  <>
                    Send Inquiry
                    <span className="w-8 h-px bg-current transition-all duration-400 group-hover:w-12" />
                  </>
                )}
                {status === "submitting" && (
                  <>
                    Sending
                    <Loader2 size={14} className="animate-spin" />
                  </>
                )}
                {status === "success" && (
                  <>
                    Message Received
                    <Check size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
