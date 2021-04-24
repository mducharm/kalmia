const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.svelte"],

  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      bluegray: colors.blueGray,
      emerald: colors.emerald,
      green: colors.green,
      amber: colors.amber,
      orange: colors.orange,
      white: colors.white
    }
  },
  variants: {},
  plugins: []
};