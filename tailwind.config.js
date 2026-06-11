/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf3ef',
          100: '#fae3d8',
          200: '#f5c4ab',
          300: '#ee9f76',
          400: '#e67340',
          500: '#c0392b',
          600: '#a83224',
          700: '#8c2a1e',
          800: '#72221a',
          900: '#5e1d17',
        },
        sidebar: {
          bg: '#1e1e1e',
          hover: '#2a2a2a',
          active: '#2e2e2e',
          border: '#333333',
          text: '#a0a0a0',
          textActive: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
