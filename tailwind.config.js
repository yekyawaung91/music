import animatePlugin from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a855f7",
      },
      animation: {
        "slide-in-right": "slideInRight 5s ease-out forwards",
        "slide-out-right": "slideOutRight 5s ease-out forwards",
        "fade-in": "fadeIn 5s ease-out forwards",
        "fade-out": "fadeOut 5s ease-out forwards",
      },
    },
  },
  plugins: [animatePlugin],
};
