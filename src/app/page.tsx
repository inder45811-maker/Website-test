import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import About from "@/components/About";
import Features from "@/components/Features";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-obsidian">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <HeroVideo />
      <About />
      <Features />
      <Work />
      <Testimonials />
      <Contact />

      {/* Footer */}
      <footer className="bg-obsidian border-t border-white/5 py-16 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="font-display text-xl tracking-[0.2em] text-ivory/40"
            style={{ fontStyle: "italic", fontWeight: 300 }}
          >
            LUMIÈRE
          </span>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
            © 2024 — All rights reserved
          </p>
          <div className="flex gap-8">
            {["Privacy", "Legal", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20 hover:text-gold/60 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
