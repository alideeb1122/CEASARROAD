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
        brand: {
          bg: "#2E314D",
          section: "#3A3F63",
          text: "#E8E8E8",
          muted: "#A6A9B8",
          cta: "#C2A96B",
          "cta-hover": "#D4BC84",
        },
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#253563",
          dark: "#111B30",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#D4B86A",
          dark: "#A8872A",
        },
        surface: "#F7F7F5",
        background: "#FAFAF8",
        "text-primary": "#1C1C2E",
        "text-muted": "#64748B",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        english: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
