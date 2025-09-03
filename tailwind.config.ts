import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Gruvbox color scheme
        background: {
          dark: '#282828',
          light: '#fbf1c7',
        },
        foreground: {
          dark: '#ebdbb2',
          light: '#3c3836',
        },
        primary: {
          DEFAULT: '#d79921',
          foreground: '#282828',
        },
        secondary: {
          DEFAULT: '#689d6a',
          foreground: '#282828',
        },
        muted: {
          DEFAULT: '#3c3836',
          foreground: '#a89984',
        },
        accent: {
          DEFAULT: '#cc241d',
          foreground: '#fbf1c7',
        },
        card: {
          DEFAULT: '#3c3836',
          foreground: '#ebdbb2',
        },
        border: '#504945',
        input: '#504945',
        ring: '#d79921',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config