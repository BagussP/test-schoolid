/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#cf1e49",
        primary: "#179778", //warna sebenarnya
        body_color: "#FAFAFA",
        font_color: "#96DAC9",
      },
      margin: {
        25: "100px",
      },
      height: {
        25: "100px",
        58: "232px",
      },
      width: {
        25: "100px",
        58: "232px",
      },
    },
  },
  plugins: [],
};
