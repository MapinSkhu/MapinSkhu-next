import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'motion 0.8s linear 0s infinite alternate',
      },
      keyframes: {
        motion: {
          '0%': { marginTop: '0px' },
          '100%': { marginTop: '10px' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
      zIndex: {
        '9999': '9999',
      },
    },
  },
  plugins: [],
} satisfies Config;
