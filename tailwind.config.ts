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
      // Typography System
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        base: ['1rem', { lineHeight: '1.75', letterSpacing: '0.02em' }],
        lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em', fontWeight: '600' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.02em', fontWeight: '600' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      // Spacing System
      spacing: {
        '4xs': '0.125rem',
        '3xs': '0.25rem',
        '2xs': '0.375rem',
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;