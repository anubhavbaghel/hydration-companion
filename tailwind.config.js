/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GoogleSans", "sans-serif"],
        "sans-medium": ["GoogleSans-Medium", "sans-serif"],
        "sans-semibold": ["GoogleSans-SemiBold", "sans-serif"],
        "sans-bold": ["GoogleSans-Bold", "sans-serif"],
        "sans-italic": ["GoogleSans-Italic", "sans-serif"],
        "sans-semibold-italic": ["GoogleSans-SemiBoldItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};