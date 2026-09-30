/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hologram: {
          cyan: '#00f7ff',
          neon: '#0df',
          purple: '#b026ff',
          pink: '#ff007f',
          glitch: '#ff0055',
          dark: '#030712'
        }
      },
      animation: {
        'mist-slow': 'mistFlow 24s ease-in-out infinite alternate',
        'mist-reverse': 'mistFlowReverse 18s ease-in-out infinite alternate',
        'hologram-float': 'hologramFloat 4s ease-in-out infinite',
        'scanlines': 'scanlinesMove 8s linear infinite',
        'flicker': 'hologramFlicker 3s infinite',
        'glitch-subtle': 'glitchSubtle 6s infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'evasive-jitter': 'evasiveJitter 0.2s ease-in-out infinite',
      },
      keyframes: {
        mistFlow: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(8%, 5%) scale(1.12)' },
          '100%': { transform: 'translate(-6%, 8%) scale(1.05)' },
        },
        mistFlowReverse: {
          '0%': { transform: 'translate(0%, 0%) rotate(0deg) scale(1.1)' },
          '50%': { transform: 'translate(-10%, -6%) rotate(3deg) scale(0.95)' },
          '100%': { transform: 'translate(6%, -10%) rotate(-2deg) scale(1.08)' },
        },
        hologramFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(-1.5deg)' },
          '75%': { transform: 'translateY(6px) rotate(1deg)' },
        },
        scanlinesMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        hologramFlicker: {
          '0%, 100%': { opacity: '0.96' },
          '8%': { opacity: '0.72' },
          '10%': { opacity: '0.98' },
          '28%': { opacity: '0.85' },
          '30%': { opacity: '0.6' },
          '32%': { opacity: '0.95' },
          '74%': { opacity: '0.92' },
          '76%': { opacity: '0.45' },
          '78%': { opacity: '0.96' },
        },
        glitchSubtle: {
          '0%, 94%, 100%': { transform: 'translate(0, 0)' },
          '95%': { transform: 'translate(-2px, 1px) skewX(-1.5deg)' },
          '96%': { transform: 'translate(2px, -1px) skewX(2deg)' },
          '97%': { transform: 'translate(-1px, 2px)' },
          '98%': { transform: 'translate(1px, -1px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(0, 247, 255, 0.45))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(176, 38, 255, 0.65))' },
        },
        evasiveJitter: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-1px, 1px)' },
          '75%': { transform: 'translate(1px, -1px)' },
        }
      }
    },
  },
  plugins: [],
}
