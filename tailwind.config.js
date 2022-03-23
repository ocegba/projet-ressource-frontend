const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#9EB5EB',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"),
  ],
}
