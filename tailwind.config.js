/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      // ── Colors — Fresh Kitchen palette ──────────────────────────
      colors: {
        primary: {
          DEFAULT: '#5B7553',
          dark:    '#3F5541',
        },
        accent: {
          DEFAULT: '#B9713F',
          text:    '#9D6035',   // AA on cream/white ✅ 4.6:1
          dark:    '#7A4A2A',   // hover on accent buttons
        },
        bg:      '#F7F4EC',
        surface: '#FFFFFF',
        ink:     '#2E3A2C',
        muted:   '#6B7A66',
        line:    '#D9E2D4',
        success: '#7C9885',     // use INK text on this bg
        warning: {
          DEFAULT: '#C9A25E',   // use INK text on this bg
          text:    '#8F6C30',   // warning text on white/cream ✅ 4.82:1
        },
        danger:  '#B0563B',     // use WHITE text on this bg
      },

      // ── Typography ───────────────────────────────────────────────
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body:    ['Inter',   'sans-serif'],
      },

      // ── Border Radius ────────────────────────────────────────────
      borderRadius: {
        card:   '12px',
        button: '8px',
        chip:   '9999px',
      },

      // ── Shadows — warm-tinted ────────────────────────────────────
      boxShadow: {
        card:       '0 2px 8px rgba(46,58,44,0.08)',
        'card-hover': '0 6px 20px rgba(46,58,44,0.12)',
        modal:      '0 12px 40px rgba(46,58,44,0.16)',
      },

      // ── Keyframes ────────────────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'chip-in': {
          '0%':   { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in':    'fade-in 0.2s ease-out',
        'chip-in':    'chip-in 0.15s ease-out',
        'pulse-soft': 'pulse-soft 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
