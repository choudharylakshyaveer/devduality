/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#735c00",
        "primary-container": "#f5d061",
        secondary: "#546066",
        background: "#fbf9f9",
        surface: "#fbf9f9",
        "on-primary": "#ffffff",
        "on-background": "#1b1c1c",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans"],
        body: ["Manrope"],
      },
    },
  },
  plugins: [],
};