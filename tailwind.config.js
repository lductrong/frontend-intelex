/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-color': '#FFCC33',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'dosis': ['Dosis', 'sans-serif'],
      },
      zIndex: {
        '9999': '9999',
      }
    },
  },
  plugins: [],
  // Important: Don't purge original template classes
  safelist: [
    'typer',
    'cursor',
    'theme-color',
    'text-white',
    'button',
    'button-border',
    'feature-text',
    'box-shadow',
    'white-bg',
    'feature-icon',
    'fature-info',
    'text-back',
    'counter',
    'big-counter',
    'timer',
    'slider-content',
    'slider-content-middle',
    'business-banner-05',
    'bg-overlay-black-50',
    'jarallax',
    'page-section-ptb',
    'dark-theme-bg',
    'pos-r',
    'title-effect',
  ],
}