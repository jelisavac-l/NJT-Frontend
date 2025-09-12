/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ppp-primary": "#1d3557",
        "ppp-secondary": "#457b9d",
        "ppp-accent": "#F0C735",
        "ppp-white": "#fBfbfe",
        "ppp-hl": "#a8dadc",
        "ppp-lmuted": "#E1E1F0",
        "ppp-muted": "#6C757D"

      },
      fontFamily: {
        Lexend: ["Lexend, ui-sans-serif, system-ui"],
      }
    },
    fontFamily: {
      sans: ['Lexend']
    }
    
  },
  plugins: [],
}

