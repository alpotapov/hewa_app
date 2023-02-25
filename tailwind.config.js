/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amaranth: {
          DEFAULT: '#EC2A58',
        },
        cornflower: {
          DEFAULT: '#9BB0E9',
        },
        'pacific-blue': {
          DEFAULT: '#00AEC1',
        },
        seashell: {
          DEFAULT: '#F1F1F1',
        },
        alabaster: {
          DEFAULT: '#F9F9F9',
        },
        'dull-lavender': {
          DEFAULT: '#91A8E5',
        },
        'dusty-gray': {
          DEFAULT: '#969696',
        },
        mercury: {
          DEFAULT: '#E3E3E3',
        },
      },
    },
  },
  plugins: [],
};
