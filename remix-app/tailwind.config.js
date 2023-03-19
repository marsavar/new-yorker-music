/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-12': 'repeat(auto-fill, minmax(12rem, 1fr))',
        'fill-16': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },

    },
  },
  plugins: [],
}
