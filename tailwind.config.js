/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Alegreya Sans", "Sans"],
    },
    extend: {
      gridTemplateColumns:{
        '1fr1fr':'1fr 1fr',
        'main':'280px 1fr',
        'mx1fr':'max-content 1fr',
        'autoCol':'auto',
        'orders':"repeat(5, minmax(150px, 1fr))",
        'qr':"repeat(2,1fr)"
      },
      gridTemplateRows:{
        'header':'max-content 1fr',
        'maxmax':'repeat(2,max-content)',
        'mx1fr':'max-content 1fr',
        'mx1frmx':'max-content 1fr max-content',
        '1fr1fr':'repeat(2,1fr)',
        'autoRow':'auto',
        'dashboard':'max-content repeat(3,480px)',
        'qr':"repeat(3,1fr)",
      },
      boxShadow:{
        'custom-lg':'0 0px 20px rgba(40,40,40,0.15)'
      },
      animation:{
        'appear':'appear 200ms ease-in 1',
        'disappear':'disappear 200ms ease-in 1 forwards',
        'zoom-fade-in':'zoom-fade-in 100ms ease-in 1',
        'zood-fade-out':'zoom-fade-out 100ms ease-in 1 forwards',
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
        },
        'disappear':{
          from:{
            transform:"scale(1)",
            opacity:"1",
          },
          to:{
            transform:"scale(1.5)",
            opacity:"0",
          }
        },
        'zoom-fade-in':{
          from:{
            transform:"scale(0)",
            opacity:"0",
          },
          to:{
            transform:"scale(1)",
            opacity:"1",
          }
        },
        'zoom-fade-out':{
          from:{
            transform:"scale(1)",
            opacity:"1",
          },
          to:{
            transform:"scale(0)",
            opacity:"0",
          },
        }
      },
      maxHeight:{
        "192":"42rem"
      }
    },
  },
  plugins: [],
}
