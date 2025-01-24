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
        // Primary Colors
        primary: {
          DEFAULT: "#0077CC", // Primary Blue
          dark: "#005FA8",    // Darker Blue for hover
          light: "#E5F4FF",   // Light Blue for hover backgrounds
        },
        healthcare: {
          DEFAULT: "#28A745", // Healthcare Green
          dark: "#1E7D34",    // Darker Green for hover
          light: "#3BC85E",   // Light Green for hover/tints
        },
        text: {
          primary: "#333333", // Dark Gray for primary text
          secondary: "#666666", // Medium Gray for secondary text
        },
        surface: {
          DEFAULT: "#FFFFFF", // White background
          divider: "#EEEEEE", // Light Gray for dividers
          input: "#CCCCCC",   // Light Gray for input borders
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
