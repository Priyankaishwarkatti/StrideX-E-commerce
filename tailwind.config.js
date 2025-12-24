/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
    "./login.html",
    "./signup.html",
    "./src/pages/**/*.html",   // (safe if any remain)
    "./src/components/**/*.html",
    "./src/js/**/*.js"
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

