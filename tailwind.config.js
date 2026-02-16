/** @type {import('tailwindcss').Config} */


// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         luxuryBlack: "#0f0f0f",
//         luxuryGold: "#c6a75e",
//         luxuryIvory: "#f8f5f0",
//         luxuryBrown: "#8b6f47",
//         softGray: "#ededed"
//       },
//       fontFamily: {
//         luxury: ["Playfair Display", "serif"],
//         body: ["Inter", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f0f0f",      // Primary background
          gold: "#c6a75e",      // Accent color
          ivory: "#f8f5f0",     // Soft background
          brown: "#8b6f47",     // Secondary accent
          gray: "#ededed",      // Light neutral
          muted: "#a8a29e",     // Text subtle
        },
      },
      fontFamily: {
        luxury: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 40px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

