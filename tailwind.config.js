/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080808",
          900: "#111111",
          800: "#181818",
        },
        paper: "#F5F5F5",
        gold: {
          DEFAULT: "#F5B800",
          light: "#FFC928",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(245, 184, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
