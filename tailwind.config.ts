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
          DEFAULT: "#D3E4FD",
          light: "#E8F1FE",
          dark: "#A1C6FA",
          muted: "#D3E4FD40",
        },
        gray: {
          DEFAULT: "#555555",
          light: "#8A898C",
          dark: "#333333",
          muted: "#C8C8C9",
        },
        green: {
          DEFAULT: "#4CAF50",
          light: "#F2FCE2",
          dark: "#388E3C",
          muted: "#4CAF5040",
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