/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        inputCreate: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        showShop: {
          '0%': { height: 0 },
          '100%': { height: '100%' }
        }
      }
    }
  },
  plugins: []
}
