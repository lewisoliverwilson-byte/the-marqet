/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        accent: '#3B82F6',
        muted: '#AAAAB8',
        surface: '#F7F7F9',
        'dark-mid': '#55556A',
        border: '#E4E4E9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.20em',
        widest3: '0.28em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

