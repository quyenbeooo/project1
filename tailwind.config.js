/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "custom-dropdown-margin": "186px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
