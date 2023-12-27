/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors:{
        "orange":"#FFBE00",
        "red":"#FF6868",
        "secondary":"#555",
        "primaryBG":"#FCFCFC"
      } ,
      fontFamily:{
        "iransans":['IRANSans', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

