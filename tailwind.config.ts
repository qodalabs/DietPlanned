import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        ink: {
          900: '#0b0b0c',
          800: '#111112',
          700: '#18181b',
        }
      },
      backgroundImage: {
        'grid': 'radial-gradient(currentColor 1px, transparent 1px)',
        'orange-glow': 'radial-gradient(600px 200px at 0% 0%, rgba(249,115,22,0.25), transparent 60%), radial-gradient(600px 200px at 100% 0%, rgba(249,115,22,0.25), transparent 60%)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      boxShadow: {
        'glow-orange': '0 10px 30px rgba(249, 115, 22, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config
