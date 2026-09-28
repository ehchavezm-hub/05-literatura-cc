/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Atkinson Hyperlegible"', 'sans-serif'],
      },
      colors: {
        'blg-bg': '#F2F2F7',
        'blg-card': '#FFFFFF',
        'blg-dark': '#1C1C1E',
        'blg-blue': '#007AFF',
        'blg-purple': '#AF52DE',
        'blg-green': '#34C759',
        'blg-orange': '#FF9500',
        'blg-gray': '#8E8E93',
        'blg-border': '#E5E5EA',
        'blg-red': '#FF3B30',
      },
    },
  },
  plugins: [],
};
