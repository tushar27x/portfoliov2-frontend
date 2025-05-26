import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translate(-50%, -50%) translate(0, 0)' },
          '25%': { transform: 'translate(-50%, -50%) translate(20px, -20px)' },
          '50%': { transform: 'translate(-50%, -50%) translate(0, -40px)' },
          '75%': { transform: 'translate(-50%, -50%) translate(-20px, -20px)' },
          '100%': { transform: 'translate(-50%, -50%) translate(0, 0)' },
        },
        'float-slow': {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-20px, 20px)' },
          '50%': { transform: 'translate(0, 40px)' },
          '75%': { transform: 'translate(20px, 20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config; 