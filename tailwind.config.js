/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'main':'250px 1fr',
      },
      gridTemplateRows:{
        'header':'max-content 1fr',
      }
    },
  },
  plugins: [],
}
