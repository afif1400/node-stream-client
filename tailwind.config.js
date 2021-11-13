module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'neon-pink': '#ccff02'
     }),
     fontFamily: {
       'raleway': ["raleway"]
     },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
