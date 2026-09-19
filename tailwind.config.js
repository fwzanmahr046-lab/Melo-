/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Tajawal', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#faf8f5', 100: '#f5f0e8', 200: '#e8ddc9',
          300: '#d4bf9a', 400: '#b99b6b', 500: '#a17d4c',
          600: '#8a663d', 700: '#6f4f32', 800: '#5c412c',
          900: '#4d3827', 950: '#2a1e14',
        },
        ink: { 900: '#0a0a0a', 800: '#171717', 700: '#262626' },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
        elegant: '0 4px 32px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
