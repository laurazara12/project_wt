/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        gray: {
          200: '#f6f6f6', 
          300: '#b0b0b0', 
          400: '#8c8c8c', 
          500: '#707070', 
          600: '#545454',
          700: '#383838',
          800: '#1c1c1c',
          900: '#0f0f0f', 
        },
        green: {
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
};