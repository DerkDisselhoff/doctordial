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
        blue: {
          DEFAULT: "#33C3F0",
          light: "#D3E4FD",
          dark: "#0FA0CE",
        },
        green: {
          DEFAULT: "#22C55E",
          light: "#F2FCE2",
        },

        // Neutral Colors
        gray: {
          100: "#F1F1F1",
          200: "#F3F3F3",
          300: "#EEEEEE",
          400: "#CCCCCC",
          500: "#999999",
          600: "#8E9196",
          700: "#8A898C",
          800: "#AAADB0",
        },

        // Status Colors
        success: {
          light: "#F2FCE2",
          DEFAULT: "#22C55E",
        },
        warning: {
          light: "#FEF7CD",
          DEFAULT: "#F59E0B",
        },
        error: {
          light: "#FFDEE2",
          DEFAULT: "#EA384C",
        },
        info: {
          light: "#D3E4FD",
          DEFAULT: "#0EA5E9",
        },

        // UI Colors
        surface: {
          light: "#FFFFFF",
          DEFAULT: "#F6F6F7",
          dark: "#221F26",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-down": "fadeDown 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.2s ease-out",
        "scale-out": "scaleOut 0.2s ease-out",
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
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;