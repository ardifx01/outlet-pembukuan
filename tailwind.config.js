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
      },
      keyframes: {
        stretch: {
          '0%,20%,100%': {width: '16px', transform: 'scale(1)'},
          '10%': {transform: 'scale(1.3)', width: '12px'},
        },
        stretch2: {
          '0%,10%,30%,100%': {width: '16px', transform: 'scale(1)'},
          '20%': {transform: 'scale(1.3)', width: '12px'},
        },
        stretch3: {
          '0%,20%,40%,100%': {width: '16px', transform: 'scale(1)'},
          '30%': {transform: 'scale(1.3)', width: '12px'},
        },
      },
      animation: {
        stretch: 'stretch 1s ease-in-out infinite',
        stretch2: 'stretch2 1s ease-in-out infinite',
        stretch3: 'stretch3 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
