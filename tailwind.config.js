/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chakki: {
          bg: '#FDFBF7',         // Off-white / cream background
          surface: '#FAF4E8',    // Surface container
          pill: '#F6EFE3',       // Feature pill container
          card: '#FFFFFF',       // Card background
          text: '#4A2B18',       // Dark warm brown primary text
          muted: '#7C5C43',      // Muted brown text
          primary: '#9A6B29',    // Ochre / Medium warm brown CTA
          'primary-hover': '#80561F',
          gold: '#C59A3F',       // Golden accent / stars / badge
          border: '#E8DCCB',     // Soft border color
          dark: '#351D0F',       // Deepest brown header accent
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'pill': '0 8px 30px rgba(74, 43, 24, 0.08)',
        'card': '0 4px 20px rgba(74, 43, 24, 0.05)',
        'floating': '0 12px 40px rgba(74, 43, 24, 0.12)',
      }
    },
  },
  plugins: [],
}
