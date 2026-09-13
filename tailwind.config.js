/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0ebff',
          200: '#bad2ff',
          300: '#8fb5ff',
          400: '#5c8eff',
          500: '#3b6cf6',
          600: '#254deb',
          700: '#1d3bcc',
          800: '#1e33a6',
          900: '#1e2e82',
          950: '#141d52',
        },
        dark: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          card: 'rgb(var(--color-card) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          hover: 'rgb(var(--color-hover) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 35px -5px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}
