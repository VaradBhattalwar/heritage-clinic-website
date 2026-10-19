import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f7',
          500: '#0c87eb',
          600: '#006bc9', // Primary healthcare blue
          700: '#0156a3',
          800: '#054885',
          900: '#0b2d52', // Deep healthcare blue/navy
          950: '#061a30',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#0e243f',
          900: '#07162c', // Deep rich navy
          950: '#030b17',
        },
        warm: {
          50: '#fdfefe',
          100: '#f8fafc',
          200: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(11, 45, 82, 0.06), 0 2px 4px -1px rgba(11, 45, 82, 0.04)',
        'card-hover': '0 12px 24px -4px rgba(11, 45, 82, 0.1), 0 4px 6px -2px rgba(11, 45, 82, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
