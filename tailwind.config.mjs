/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        capri: {
          50:  '#e6f3ff',
          100: '#cce7ff',
          200: '#99ceff',
          300: '#66b5ff',
          400: '#339cff',
          500: '#007FFF',
          600: '#0066cc',
          700: '#004d99',
          800: '#003366',
          900: '#001a33',
        },
        lemon: {
          50:  '#fffef0',
          100: '#fffce0',
          200: '#fff9c0',
          300: '#fff599',
          400: '#fff166',
          500: '#FFF44F',
          600: '#e6d900',
          700: '#b3a800',
          800: '#807800',
          900: '#4d4800',
        },
        charcoal: '#333333',
        offwhite: '#FAFAF8',
        'med-blue':       '#005B96',
        'med-gold':       '#D4AF37',
        'med-cream':      '#FDFBF7',
        'med-terracotta': '#E2725B',
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero':    ['clamp(1.8rem, 4vw, 3.5rem)', { lineHeight: '1.15' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'editorial': '72rem',
        'text':      '65ch',
      },
    },
  },
  plugins: [],
};
