// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   // prefix: "tw-",
//   important: true,
// };
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         white: "#ffffff", // Ensures 'white' is explicitly defined in the theme
//       },
//     },
//   },
//   plugins: [],
//   important: true,  // Ensures all tailwind classes are given high specificity
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode using a "class" strategy
  theme: {
    extend: {
      colors: {
        // Custom dark theme colors
        primary: "#1a1a1a", // Dark background
        secondary: "#333333", // Darker shade
        accent: "#0196e3", // Accent color
        textLight: "#ffffff", // Light text color
        textMuted: "#a3a3a3", // Muted text color
      },
      boxShadow: {
        dark: "0 4px 6px rgba(0, 0, 0, 0.6)", // Custom shadow for dark mode
      },
    },
  },
  plugins: [],
  important: true, // Makes Tailwind CSS rules take precedence
};
