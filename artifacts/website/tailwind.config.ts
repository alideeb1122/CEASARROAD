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
        background: "#FAFAF8",
        "text-primary": "#1B2A4A",
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
