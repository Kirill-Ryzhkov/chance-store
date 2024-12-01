/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/pages/**/*.{html,js,jsx}',
      './src/components/**/*.{html,js,jsx}'
  ],
  theme: {
    screens: {
      'sm': '680px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '2560px'
    },
    extend: {
      boxShadow: {
        custom: "var(--shadow)"
      },
      colors: {
        background: "var(--background)",
        backgroundDiff: "var(--backgroundDiff)",
        colorPrimary: "var(--colorPrimary)",
        colorSecond: "var(--colorSecond)"
      }
    }
  },
  safelist: [
    'bg-lime-400',
    'bg-green-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-blue-400',
    'bg-lime-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
],
  plugins: [
    require('tailwindcss-textshadow')
  ],
}

