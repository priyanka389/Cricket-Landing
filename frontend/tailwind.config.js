/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#141414',
        secondary: '#1e1e1e',
        accent: '#3ac968',
        danger: '#f20505',
        'text-primary': '#ffffff',
        'text-secondary': '#e0e0e0',
        'text-muted': '#999999',
        border: '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
