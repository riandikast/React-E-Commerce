/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'playfair': 'Playfair Display'
      },
      backgroundColor: {
        'dark-plain': '#E5E5E5',
        'plain': '#FDFBF8',
        'nude': '#FFF4E7',
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
