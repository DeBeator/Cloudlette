import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: false,
      padding: "0",
    },
    extend: {
      colors: {
        // Cloudlette Brand Rebuild Palette (Beige, Soft Ivory, Butter, Deep Warm Black, Muted Taupe)
        brand: {
          beige: "#F1DFC7",
          "beige-light": "#F8EDE0",
          "beige-dark": "#DEC4A6",
          ivory: "#FFF9F0",
          butter: "#FFF2D3",
          "butter-light": "#FFFBF2",
          "butter-dark": "#F6DEAC",
          black: "#281D18",
          "black-light": "#3C2E27",
          taupe: "#B8A693",
          "taupe-light": "#D4C7B8",
          "taupe-dark": "#7C6B5A",
        },
        // Mapped existing token sets for backwards compatibility with existing sub-pages
        cream: {
          DEFAULT: "#FFF2D3",
          light: "#FFF9F0",
          dark: "#F1DFC7",
        },
        "off-white": "#FFF9F0",
        dark: {
          DEFAULT: "#281D18",
          light: "#3C2E27",
          muted: "#78675F",
        },
        gold: {
          DEFAULT: "#281D18",
          hover: "#43322A",
          light: "#FFF2D3",
          accent: "#D49B42",
        },
        blush: {
          DEFAULT: "#F1DFC7",
          light: "#FAF4EB",
          border: "#E2D1BC",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        handwriting: ["'Balsamiq Sans'", "Caveat", "var(--font-handwriting)", "cursive", "sans-serif"],
        heading: ["'Balsamiq Sans'", "Caveat", "var(--font-handwriting)", "cursive", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
