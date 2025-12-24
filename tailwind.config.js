/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.html",
    "./src/js/**/*.js",
    "./src/components/**/*.html",
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

