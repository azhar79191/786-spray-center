/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          50: '#1E293B',
          100: '#334155',
          200: '#475569',
          300: '#64748B',
          400: '#94A3B8',
          500: '#CBD5E1',
          600: '#E2E8F0',
          700: '#F1F5F9',
          800: '#F8FAFC',
        },
        gold: {
          DEFAULT: '#D4A017',
          50: '#FEF9E7',
          100: '#FCF3CF',
          200: '#F9E79F',
          300: '#F7DC6F',
          400: '#F4D03F',
          500: '#D4A017',
          600: '#B8860B',
          700: '#9A7D0A',
          800: '#7D6608',
          900: '#604907',
        },
        surface: '#F8FAFC',
        'surface-dark': '#1E293B',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 160, 23, 0.39)',
        'gold-lg': '0 10px 25px -5px rgba(212, 160, 23, 0.4)',
        'premium': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4A017 0%, #F4D03F 50%, #D4A017 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient-gold': {
          'background': 'linear-gradient(135deg, #D4A017 0%, #F4D03F 50%, #D4A017 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.border-gradient-gold': {
          'border-image': 'linear-gradient(135deg, #D4A017, #F4D03F, #D4A017) 1',
        },
      })
    }
  ],
}
