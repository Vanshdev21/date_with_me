/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pinkTheme: '#ff7597',
        purpleTheme: '#b57cff',
        peachTheme: '#ffaa85',
      }
    },
  },
  plugins: [],
}
