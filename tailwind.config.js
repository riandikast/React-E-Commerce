/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'playfair': 'Playfair Display',
        'jost': 'Jost'
      },
      backgroundColor: {
        'dark-plain': '#E5E5E5',
        'plain': '#FDFBF8',
        'lightgreen': '#e5e9e6',
      },
      colors: {
        'darkgreen': '#07484A',
        'green': '#70908B',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
