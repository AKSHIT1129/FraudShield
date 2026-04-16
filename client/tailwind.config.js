/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fs-dark': '#0B0F19',
        'fs-card': '#151A2D',
        'fs-blue': '#3B82F6',
        'fs-neon': '#00F0FF',
        'fs-black': '#05070A',
        'fs-red': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
