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
        '1fr1fr':'repeat(2,1fr)',
        'autoRow':'auto',
        'dashboard':'max-content 490px 490px 490px'
      },
      boxShadow:{
        'custom-lg':'0 0px 20px rgba(40,40,40,0.15)'
      },
      animation:{
        'appear':'appear 200ms ease-in 1',
      },
      keyframes:{
        'appear':{
          from:{
            transform:"scale(1.5)",
            opacity:"0",
          },
          to:{
            transform:"scale(1)",
            opacity:"1",
          }
        }
      }
    },
  },
  plugins: [],
}
