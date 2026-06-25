/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
      },
      screens: {
        'mobile': '950px',
        'tablet': '1213px',
        'desktop': '1400px',
      },
    },
  },
  plugins: [],
};
