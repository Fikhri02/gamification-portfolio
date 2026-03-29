/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        os: {
          bg: '#080810',
          surface: '#0d1117',
          border: '#00ff8820',
          glow: '#00ff88',
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#f72585',
          text: '#c8ffd4',
          muted: '#4a7c59',
          warning: '#ffd60a',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 3s infinite',
        'scan': 'scan 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'type': 'type 0.5s steps(1) forwards',
        'flicker': 'flicker 0.15s infinite',
        'xp-fill': 'xpFill 0.8s ease-out forwards',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
        glitch: {
          '0%, 100%': { textShadow: '2px 0 #00ff88, -2px 0 #f72585' },
          '20%': { textShadow: '-2px 0 #00ff88, 2px 0 #f72585', transform: 'translate(-1px)' },
          '40%': { textShadow: '2px 0 #00d4ff, -2px 0 #a855f7', transform: 'translate(1px)' },
          '60%': { textShadow: 'none', transform: 'translate(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #00ff8840, 0 0 10px #00ff8820' },
          '50%': { boxShadow: '0 0 15px #00ff8880, 0 0 30px #00ff8840' },
        },
        flicker: {
          '0%': { opacity: 1 }, '5%': { opacity: 0.8 }, '10%': { opacity: 1 },
          '15%': { opacity: 0.9 }, '20%': { opacity: 1 },
        },
        xpFill: {
          from: { width: 'var(--xp-from)' },
          to: { width: 'var(--xp-to)' },
        },
      },
    },
  },
  plugins: [],
}
