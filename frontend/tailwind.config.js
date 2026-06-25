/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        movia: {
          purple: "#7C3AED",
          pink: "#EC4899",
          dark: "#0F0F1A",
          card: "#1A1A2E",
        },
      },
      backgroundImage: {
        "movia-gradient": "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
