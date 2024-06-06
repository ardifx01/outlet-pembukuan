/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sourceSansPro: ['SourceSansPro'],
        sourceSansProSemiBold: ['SourceSansProSemiBold'],
      },
      colors: {
        primary: '#1F187A',
        secondary: '#867DFB',
        accent: '#4032FA',
        shadow: '#413D7A',
        interaction: '#3228C7',
        err: '#FA3232',
        main: '#EEF9FB',
        placeholder: '#5A719D',
        border: '#E6EEFF',
        success: '#10b986',
        warning: '#ffc107',
      },
    },
  },
  plugins: [],
};
