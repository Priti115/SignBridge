/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#09090F",
        surface: "#131320",
        elevated: "#1C1C2B",
        border: "#2A2A3A",

        primary: "#7C3AED",
        "primary-hover": "#8B5CF6",

        secondary: "#06B6D4",
        glow: "#67E8F9",

        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",

        text: "#F8FAFC",
        secondaryText: "#CBD5E1",
        muted: "#94A3B8",
      },

      boxShadow: {
        glow: "0 0 25px rgba(124, 58, 237, 0.35)",
        soft: "0 10px 30px rgba(0,0,0,0.35)",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSlow: "pulse 4s infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },

  plugins: [],
};