/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#08090B",
          surface: "#0F1113",
          elevated: "#15171A",
          border: "#1F2226",
        },
        ink: {
          DEFAULT: "#F3F4F6",
          muted: "#9A9DA6",
          faint: "#5C5F68",
        },
        signal: {
          blue: "#4C7CF7",
          violet: "#8B6BF2",
          green: "#3ECF8E",
        },
      },
      fontFamily: {
        display: ["'Instrument Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grad-signal": "linear-gradient(120deg, #4C7CF7 0%, #8B6BF2 100%)",
        "grad-radial-fade": "radial-gradient(circle at center, rgba(76,124,247,0.15) 0%, rgba(0,0,0,0) 70%)",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.35)",
        glow: "0 0 40px rgba(76,124,247,0.25)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
