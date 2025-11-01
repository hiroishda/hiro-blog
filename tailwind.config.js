import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'beige': '#fffaf0',
        'warm-gray': '#8b8680',
        'charcoal': '#2d2d2d',
      },
      fontFamily: {
        'sans': ['Libre Baskerville', 'Georgia', 'serif'],
        'mono': ['SF Mono', 'Monaco', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: theme('colors.charcoal'),
            lineHeight: '1.7',
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
}