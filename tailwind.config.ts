module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: {
          DEFAULT: '#0960bd',
        },
      },
      screens: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      spacing: {},
      backgroundImage: {
        'login-bg': 'linear-gradient(140.02deg, #f9f9fa, #f7f8ff)',
      },
      lineHeight: {
        '20': '5rem',
      },
    },
  },
  plugins: [],
}
