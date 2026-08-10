// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: 'var(--color-editorial-bg)',
          accent1: 'var(--color-editorial-accent-1)',
          accent2: 'var(--color-editorial-accent-2)',
          text: 'var(--color-editorial-text)',
          border: 'var(--color-editorial-border)',
        },
        dashboard: {
          bg: 'var(--color-dashboard-bg)',
          accent1: 'var(--color-dashboard-accent-1)',
          accent2: 'var(--color-dashboard-accent-2)',
          text: 'var(--color-dashboard-text)',
          border: 'var(--color-dashboard-border)',
        },
        spatial: {
          bg: 'var(--color-spatial-bg)',
          accent1: 'var(--color-spatial-accent-1)',
          accent2: 'var(--color-spatial-accent-2)',
          text: 'var(--color-spatial-text)',
          border: 'var(--color-spatial-border)',
        },
        status: {
          live: 'var(--color-status-live)',
          warning: 'var(--color-status-warning)',
          critical: 'var(--color-status-critical)',
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s infinite',
        pulse: 'pulse 2.4s infinite',
        ping: 'ping 2.4s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
