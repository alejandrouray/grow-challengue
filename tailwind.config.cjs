/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/hero-pattern.jpeg')",
        'footer-texture': "url('/img/footer-texture.png')"
      },
      colors: {
        test: 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'
      },
      fontFamily: {
        jedi: ['Star Jedi']
      },
      screens: {
        xs: { max: '300px' },
        ...defaultTheme.screens
      }
    }
  },
  plugins: []
}
