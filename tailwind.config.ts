import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Color System
      colors: {
        // Primary Colors
        white: "#FFFFFF",
        blue: {
          DEFAULT: "#E8F1FE",  // Soft professional blue
          light: "#F5F9FF",    // Lighter shade for hover states
          dark: "#2563EB",     // Darker blue for emphasis
          muted: "#E8F1FE40",  // Transparent blue for subtle backgrounds
        },
        gray: {
          DEFAULT: "#4B5563",  // Main text color
          light: "#9CA3AF",    // Secondary text
          dark: "#1F2937",     // Headings
          muted: "#F3F4F6",    // Subtle backgrounds, dividers
        },
        // Healthcare Green System
        mint: {
          DEFAULT: "#10B981",  // Primary green for success and CTAs
          light: "#D1FAE5",    // Light backgrounds
          dark: "#059669",     // Hover states
          muted: "#10B98140",  // Transparent accents
        },
        sage: {
          DEFAULT: "#84CC16",  // Secondary green for indicators
          light: "#ECFCCB",    // Light accents
          dark: "#65A30D",     // Emphasis
          muted: "#84CC1640",  // Subtle backgrounds
        },
        emerald: {
          DEFAULT: "#059669",  // Deep professional green
          light: "#A7F3D0",    // Light accents
          dark: "#047857",     // Strong emphasis
          muted: "#05966940",  // Subtle backgrounds
        },
        forest: {
          DEFAULT: "#065F46",  // Rich dark green
          light: "#D1FAE5",    // Light accents
          dark: "#064E3B",     // Deep emphasis
          muted: "#065F4640",  // Subtle backgrounds
        },
        // Dashboard-specific colors (Option 1)
        dashboard: {
          primary: "#0A1F2F",    // Dark Blue
          secondary: "#64FFDA",  // Mint
          accent: "#F97316",     // Orange
          background: "#FFFFFF", 
          text: "#1F2937",
          muted: "#9CA3AF",
        },
        // Semantic Text Colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
          accent: "var(--text-accent)",
          success: "var(--text-success)",
          warning: "var(--text-warning)",
          error: "var(--text-error)",
          link: "var(--text-link)",
          'link-hover': "var(--text-link-hover)",
          disabled: "var(--text-disabled)",
          placeholder: "var(--text-placeholder)",
        },
      },
      // Animation System for Dashboard
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
