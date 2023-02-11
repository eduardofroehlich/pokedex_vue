/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt323: ["VT323", "sans-serif"],
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(150px, 1fr))',
      }
    },
  },
  plugins: [],
}
