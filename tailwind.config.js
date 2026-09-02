/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontFamily: {
        display: ["BetaniaPatmos-Regular", "sans-serif"],
        body: ["CaacupeOne-Regular", "sans-serif"],
        logo: ["FasterOne", "sans-serif"],
        title: ["CarterOne", "sans-serif"],
      },
    },
  },

  plugins: [],
};
