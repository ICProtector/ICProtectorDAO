/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  options: {
    safelist: [
      'text-red-700', 'bg-red-100', 'dark:bg-red-200', 'dark:text-red-800',
      'text-green-700', 'bg-green-100', 'dark:bg-green-200', 'dark:text-green-800'
    ]
  },
  theme: {
    extend: {
      gradientColorStopPositions: {
        33: '33%',
      }
    },
  },
  plugins: [],
}

