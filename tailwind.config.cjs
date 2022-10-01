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
        mobiles: { min: '320px', max: '374px' },
        mobilem: { min: '375px', max: '639px' },
        prevsm: { max: '640px' },
        ...defaultTheme.screens
      }
    }
  },
  plugins: []
}
