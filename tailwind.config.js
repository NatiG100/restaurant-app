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
        'dashboard':'max-content 450px 450px 450px'
      },
      boxShadow:{
        'custom-lg':'0 0px 20px rgba(40,40,40,0.15)'
      }
    },
  },
  plugins: [],
}
