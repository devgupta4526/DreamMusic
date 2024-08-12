/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#0E0E0E',
        'custom-red': 'rgba(107, 0, 0, 1)', 
      },
      boxShadow: {
        'custom-shadow': '0px 0px 10px 0px rgba(0, 0, 0, 0.25)', // Custom shadow name
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

