import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gruvbox color scheme - comprehensive palette
        gruvbox: {
          // Dark theme (default)
          dark: {
            bg0: '#282828',
            bg1: '#3c3836',
            bg2: '#504945',
            bg3: '#665c54',
            bg4: '#7c6f64',
            fg0: '#fbf1c7',
            fg1: '#ebdbb2',
            fg2: '#d5c4a1',
            fg3: '#bdae93',
            fg4: '#a89984',
          },
          // Light theme
          light: {
            bg0: '#fbf1c7',
            bg1: '#ebdbb2',
            bg2: '#d5c4a1',
            bg3: '#bdae93',
            bg4: '#a89984',
            fg0: '#282828',
            fg1: '#3c3836',
            fg2: '#504945',
            fg3: '#665c54',
            fg4: '#7c6f64',
          },
          // Accent colors
          red: {
            bright: '#fb4934',
            neutral: '#cc241d',
            faded: '#9d0006',
          },
          green: {
            bright: '#b8bb26',
            neutral: '#98971a',
            faded: '#79740e',
          },
          yellow: {
            bright: '#fabd2f',
            neutral: '#d79921',
            faded: '#b57614',
          },
          blue: {
            bright: '#83a598',
            neutral: '#458588',
            faded: '#076678',
          },
          purple: {
            bright: '#d3869b',
            neutral: '#b16286',
            faded: '#8f3f71',
          },
          aqua: {
            bright: '#8ec07c',
            neutral: '#689d6a',
            faded: '#427b58',
          },
          orange: {
            bright: '#fe8019',
            neutral: '#d65d0e',
            faded: '#af3a03',
          },
          gray: {
            neutral: '#928374',
          }
        },
        // shadcn/ui compatible colors
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config