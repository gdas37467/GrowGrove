/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",


"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        opsans : ['Open Sans'],
        russone : ['Russo One'],
      georgia : ['EB Garamond']
      } 
    },
  },
  plugins: [],
}

