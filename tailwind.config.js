const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/src/assets/bg-moncarnet.svg')",
      },
      boxShadow: {
        main: '0 0 10px 2px rgba(0, 0, 0, 0.3)',
        second: '0 0 5px 1px rgba(0, 0, 0, 0.3)',
      },

      colors: {
        primary: {
          DEFAULT: '#009B9B',
          hovered: '#006666',
          focus: '#00E0E0',
        },
        background: '#F6F8FF',
        text: {
          DEFAULT: '#272D2D',
          darker: '#131616',
        },
        error: colors.red,
        warning: colors.amber,
        valid: colors.green,
      },
      container: {
        center: true,
      },
      screens: {
        lg: '1024px',
      },
      fontFamily: {
        inter: ['Inter', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
};
