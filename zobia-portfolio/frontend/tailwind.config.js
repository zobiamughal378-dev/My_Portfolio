/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070d24",
        navy: "#0b1536",
        blue: "#5b8cff",
        cyan: "#6fd3f0",
        purple: "#b79cff",
        pink: "#ff9ec4",
        card: "#0f1b3f",
        line: "rgba(111,211,240,0.15)",
        muted: "#a9b4d6",
        accent: "#6fd3f0",
        butter: "#ffd77a",
        blush: "#ffe3ef",
        ice: "#dff3ff",
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "orb-float": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.05)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
      },
      animation: {
        "orb-float": "orb-float 8s ease-in-out infinite",
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [],
};
