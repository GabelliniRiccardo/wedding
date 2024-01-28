/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        'w-yellow': {
          lightest: '#ffedd8',
          lighter: '#fae7c2',
          light: '#ffd284',
          default: '#ffc34f',
          dark: '#ffb520',
          darker: '#ffa900',
          darkest: '#de9200',
        },
      },
    },
  },
  plugins: [],
}
