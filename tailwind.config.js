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
        orange: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          dark: "#C2410C",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        orange: "0 0 40px -10px rgba(249, 115, 22, 0.35)",
      },
    },
  },
  plugins: [],
};
