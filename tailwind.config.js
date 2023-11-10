/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      source_sans: ['Source Sans Pro', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      //fira_sans: ['Fira Sans', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
}

