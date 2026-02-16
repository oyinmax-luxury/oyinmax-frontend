/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxuryBlack: "#0f0f0f",
        luxuryGold: "#c6a75e",
        luxuryIvory: "#f8f5f0",
        luxuryBrown: "#8b6f47",
        softGray: "#ededed"
      },
      fontFamily: {
        luxury: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};