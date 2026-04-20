import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        sage: {
          50: "#f6f7f4",
          100: "#e8eae2",
          200: "#d2d6c6",
          300: "#b3baa1",
          400: "#95a07e",
          500: "#788563",
          600: "#5e6a4d",
          700: "#4a533e",
          800: "#3d4434",
          900: "#353b2e",
          950: "#1b1f17",
        },
        sand: {
          50: "#fdf8ef",
          100: "#faeed9",
          200: "#f4dab2",
          300: "#edc181",
          400: "#e5a04e",
          500: "#df882d",
          600: "#d07023",
          700: "#ad561f",
          800: "#8a4520",
          900: "#703a1e",
          950: "#3c1c0e",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;
