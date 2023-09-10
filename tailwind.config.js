/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
// color: dark["101010"] gray: [242424, 303030]

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      gray: '#666666',
      primary: '#2B6B76',
      secondary: '#2F3742',
      accent: '#75471E',
      canvas: '#F9EFE8',
      dust: '#F2E4DC',
      black: '#000',
      white: '#fff',
      alert: '#DC3F41',
      highlight: '#FFBE0B',
      transparent: colors.transparent
    }
  },
  plugins: []
}
