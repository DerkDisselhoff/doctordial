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
      colors: {
        // Primary Brand Colors
        primary: {
          DEFAULT: "#0EA5E9", // Professional blue
          light: "#D3E4FD",   // Soft blue
          dark: "#0284C7",    // Darker blue for hover states
        },
        background: {
          DEFAULT: "#FFFFFF", // Pure white
          alt: "#F8FAFC",     // Slightly off-white for alternating sections
          subtle: "#F1F5F9",  // Very light gray for subtle backgrounds
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        accent: {
          green: {
            DEFAULT: "#22C55E",
            light: "#F0FDF4",
          },
        },
        // Status Colors
        success: {
          DEFAULT: "#22C55E",
          light: "#F0FDF4",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
        },
        info: {
          DEFAULT: "#0EA5E9",
          light: "#D3E4FD",
        },
      },
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
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '4xs': '0.125rem',  // 2px
        '3xs': '0.25rem',   // 4px
        '2xs': '0.375rem',  // 6px
        'xs': '0.5rem',     // 8px
        'sm': '0.75rem',    // 12px
        'md': '1rem',       // 16px
        'lg': '1.25rem',    // 20px
        'xl': '1.5rem',     // 24px
        '2xl': '2rem',      // 32px
        '3xl': '2.5rem',    // 40px
        '4xl': '3rem',      // 48px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',    // 4px
        DEFAULT: '0.375rem', // 6px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(14, 165, 233, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(14, 165, 233, 0.1), 0 1px 2px -1px rgba(14, 165, 233, 0.1)',
        'md': '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -2px rgba(14, 165, 233, 0.1)',
        'lg': '0 10px 15px -3px rgba(14, 165, 233, 0.1), 0 4px 6px -4px rgba(14, 165, 233, 0.1)',
        'xl': '0 20px 25px -5px rgba(14, 165, 233, 0.1), 0 8px 10px -6px rgba(14, 165, 233, 0.1)',
        'inner': 'inset 0 2px 4px 0 rgba(14, 165, 233, 0.05)',
        'none': 'none',
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-down": "fadeDown 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        'gradient-soft': 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.05), transparent 70%), radial-gradient(circle at 0% 50%, rgba(14, 165, 233, 0.025), transparent 50%), radial-gradient(circle at 100% 50%, rgba(14, 165, 233, 0.025), transparent 50%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;