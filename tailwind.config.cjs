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
        'hero-pattern': "url('/hero-pattern.jpeg')"
      },
      fontFamily: {
        jedi: ['Star Jedi']
      },
      screens: {
        xs: { max: '300px' },
        mobiles: '320px',
        mobilest: '375px',
        prevsm: { max: '640px' },
        ...defaultTheme.screens
      }
    }
  },
  plugins: []
}
