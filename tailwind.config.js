module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.1)',
        'indigo': '#3F51B5',
        'blue': '#60a5fa',
        'green': '#4CAF50',
        'pink': '#E91E63',
        'yellow': '#FFEB3B',
        'purple': '#9C27B0',
        'red': '#F44336',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
}
