/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#FF5841',
        'red-violet': '#C53678',
      }
    },
  },
  plugins: [],
}
