/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  // These paths are just examples, customize them to match your project structure
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        "body-background": "url('./src/assets/main_bg.png')",
      },
    },
  },
  plugins: [],
};
