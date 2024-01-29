/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './tray.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}',
    './src/renderer/traysrc/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
