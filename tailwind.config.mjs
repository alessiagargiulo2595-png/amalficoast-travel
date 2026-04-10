/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sea: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        amalfi: {
          yellow: '#f59e0b',
          terracotta: '#c2410c',
          lemon: '#fde68a',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      }
    },
  },
  plugins: [],
};
