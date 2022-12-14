module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spblue': '#5186CB',
        'inputwrong': 'rgba(255, 75, 75, 0.1)',
        'createFinding': 'rgba(81, 134, 203, 0.1)'
      },
      animation: {
        fadeInAnimate: 'fadeIn .2s ease-in-out',
        iconOpacity: 'opacityIcon 2s ease-in-out infinite',
        titleOpacity: 'opacityTitle 2s ease-in-out infinite',
        descOpacity: 'opacityDesc 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1.0 }
        },
        opacityIcon: {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.3 }
        },
        opacityTitle: {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.3 }
        },
        opacityDesc: {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.3 }
        }
      },
    },
    screens: {
      'mobileL': { 'max': '425px' },
      'mobileM': { 'max': '375px' },
      'mobileS': { 'max': '320px' }
    }
  },
  plugins: [],
}
