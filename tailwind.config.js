/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '680px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '2560px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        colorPrimary: "var(--colorPrimary)",
        colorSecond: "var(--colorSecond)"
      }
    }
  },
  plugins: [],
}

