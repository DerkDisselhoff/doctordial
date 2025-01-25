import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        transparent: 'transparent',
        current: 'currentColor',
        mint: {
          DEFAULT: '#10B981',
          light: '#6EE7B7',
          'light/5': 'rgba(16, 185, 129, 0.05)',
          'light/10': 'rgba(16, 185, 129, 0.1)',
          '20': 'rgba(16, 185, 129, 0.2)',
          '30': 'rgba(16, 185, 129, 0.3)',
        },
        blue: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          '20': 'rgba(59, 130, 246, 0.2)',
          '40': 'rgba(59, 130, 246, 0.4)',
        },
        gray: {
          DEFAULT: '#6B7280',
          light: '#D1D5DB',
          dark: '#374151',
          muted: '#E5E7EB',
        },
        red: {
          DEFAULT: '#EF4444',
        },
        orange: {
          DEFAULT: '#F97316',
        },
        yellow: {
          DEFAULT: '#FBBF24',
        },
        green: {
          DEFAULT: '#22C55E',
        },
        forest: {
          light: '#D1FAE5',
        },
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-mobile': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
        },
        'float-delayed-mobile': {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(-25px)' },
          '50%': { transform: 'translateY(5px)' },
        },
        'float-slow-mobile': {
          '0%, 100%': { transform: 'translateY(-15px)' },
          '50%': { transform: 'translateY(5px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
        'float-mobile': 'float-mobile 4s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
        'float-delayed-mobile': 'float-delayed-mobile 5s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-slow-mobile': 'float-slow-mobile 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;