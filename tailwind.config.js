/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'main':'280px 1fr',
        'mx1fr':'max-content 1fr',
      },
      gridTemplateRows:{
        'header':'max-content 1fr',
        'maxmax':'repeat(2,max-content)',
        'autoRow':'auto',
      },
      boxShadow:{
        'custom-lg':'0 0 20px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}
