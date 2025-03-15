/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // adjust the paths to your content
  ],
  theme: {
    extend: {
      colors: {
        fridgePrimary: '#333',
        fridgeSecondary: 'black',
      },
    },
  },
  plugins: [],
};
