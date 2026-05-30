import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#080808",
        onyx: "#111111",
        graphite: "#1a1a1a",
        smoke: "#2a2a2a",
        ash: "#3d3d3d",
        platinum: "#e8e8e8",
        ivory: "#f5f0e8",
        gold: "#c9a84c",
        "gold-light": "#e8c96d",
        "gold-dark": "#8b6914",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        "ultra-wide": "0.3em",
        "mega-wide": "0.5em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.png')",
      },
    },
  },
  plugins: [],
};

export default config;
