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
        green: {
          DEFAULT: "#10B981",  // Success, CTA
          light: "#D1FAE5",    // Success background
          dark: "#059669",     // Hover state for CTAs
          muted: "#10B98140",  // Transparent green for subtle emphasis
        },
        // Semantic Text Colors
        text: {
          primary: "var(--text-primary)",      // Main content text
          secondary: "var(--text-secondary)",   // Less important text
          muted: "var(--text-muted)",          // Subtle text
          inverse: "var(--text-inverse)",       // Text on dark backgrounds
          accent: "var(--text-accent)",         // Highlighted text
          success: "var(--text-success)",       // Success messages
          warning: "var(--text-warning)",       // Warning messages
          error: "var(--text-error)",          // Error messages
          link: "var(--text-link)",            // Links
          'link-hover': "var(--text-link-hover)", // Link hover state
          disabled: "var(--text-disabled)",     // Disabled text
          placeholder: "var(--text-placeholder)", // Placeholder text
        },
      },
      // Typography System
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter var",
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