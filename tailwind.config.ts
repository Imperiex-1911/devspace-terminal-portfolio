/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#0a0a0a",
          text: "#00ff41",
          accent: "#00ff41",
          error: "#ff0040",
          warning: "#ffaa00",
          info: "#0080ff",
        },
        neon: {
          green: "#00ff41",
          blue: "#0080ff",
          pink: "#ff0080",
          purple: "#8000ff",
          yellow: "#ffff00",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
        terminal: ["Courier New", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 65, 0.5)",
        "glow-blue": "0 0 20px rgba(0, 128, 255, 0.5)",
        "glow-pink": "0 0 20px rgba(255, 0, 128, 0.5)",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 5px #00ff41" },
          "50%": {
            textShadow:
              "0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        loading: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
        pulse: "pulse 2s infinite",
        glow: "glow 2s infinite",
        float: "float 3s ease-in-out infinite",
        loading: "loading 1.5s infinite",
      },
    },
  },
  plugins: (() => {
    const plugins = [];
    try {
      plugins.push(require("@tailwindcss/typography"));
    } catch (error) {
      console.warn("Plugin @tailwindcss/typography not found, skipping.");
    }
    try {
      plugins.push(require("@tailwindcss/forms"));
    } catch (error) {
      console.warn("Plugin @tailwindcss/forms not found, skipping.");
    }
    try {
      plugins.push(require("@tailwindcss/aspect-ratio"));
    } catch (error) {
      console.warn("Plugin @tailwindcss/aspect-ratio not found, skipping.");
    }
    try {
      plugins.push(require("tailwind-scrollbar")({ nocompatible: true }));
    } catch (error) {
      console.warn("Plugin tailwind-scrollbar not found, skipping.");
    }
    return plugins;
  })(),
};
