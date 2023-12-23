import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/maps/*.svg'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      strokeWidth: {
        '1': '0.4',
        '23': '9.2',
      },
      colors: {
        'lightmap': '#bef2d5',
        'darkmap': '#203e42'
      }
    },
  },
  plugins: [],
}
export default config
