/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{html,js}",
    "./public/**/*.{html,js}",
    "./src/components/*.html",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeOut: 'fadeOut 7s ease-in-out forwards',
      },
      screens: {

      }
    },
  },
  plugins: [],
}

