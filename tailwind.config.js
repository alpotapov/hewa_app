/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cornflower': {
          DEFAULT: '#9BB0E9',
        },
        'seashell': {
          DEFAULT: '#F1F1F1',
        },
      },
    },
  },
  plugins: [],
}
