/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2D2F36",
        secondary: "#3A3C42", //sidebar,card
        // text
        main: "#F0F0F5", //text,title,content
        submain: "#A1A1B5", //description, label
        links: "#FFC857",
      },
    },
  },
  plugins: [],
};
