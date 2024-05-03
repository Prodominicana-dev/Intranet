import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      opensans: ["OpenSans", "sans-serif"],
      noctura: ["Noctura", "georgia"],
      adelia: ["Adelia", "normal"],
      gotham: ["Gotham", "medium"],
      glancyr: ["Glancyr", "regular"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
});
export default config;
