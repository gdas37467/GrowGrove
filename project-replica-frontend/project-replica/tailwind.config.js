/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
