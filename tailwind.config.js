/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        colors: {
          "redc": '#F82E2E',
          "navbar-text": "#0D1821DE",
          "back-first-home": "#F0F0F0",
          "gray-second": "#EAEAEA",
          "custom-blue": "#1263C1",
          "yellow": "#FEB900",
          "grey-form" : "#EEEEEE",
          "drag-and-drop-text" : "#C4C4C4",
          "checkbox" : "#F82E2E",
          "save_draft_color" : "#0085FF"
        },
      transitionDuration: {
        3000: '3000ms',
      },
      zIndex: {
        75: 75,
        100: 100,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
