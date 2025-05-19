/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');

export default {
  content: [
    './node_modules/@nextui-org/theme/dist/components/(modal|drawer|progress).js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          100: '#D9D9D9',
          200: '#F5F5F5',
          300: '#ADADAD',
          400: '#A5A5A5',
          500: '#BCBCBC',
          600: '#838383',
          700: '#3C3C43',
          800: '#454545',
        },
        ultraviolet: '#A79BF2',
        mint: '#D3E8D6',
        mintNeon: '#79F4C5',
        error: '#F44336',
        success: '#3DC03C',
      },
      fontFamily: {
        nunito: ['var(--font-nunito)'],
      },
    },
  },
  plugins: [nextui()],
};
