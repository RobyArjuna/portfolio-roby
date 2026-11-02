/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme tokens: values live in src/index.css (light + .dark)
        bg: v('bg'),
        surface: v('surface'),
        'surface-2': v('surface-2'),
        ink: v('ink'),
        muted: v('muted'),
        line: v('line'),
        accent: v('accent'),
        'accent-ink': v('accent-ink'),
        'accent-soft': v('accent-soft'),

        // Legacy aliases still used by src/ai components
        background: v('bg'),
        primary: v('ink'),
        'primary-container': v('accent'),
        'on-primary': v('accent-ink'),
        secondary: v('accent'),
        'on-surface': v('ink'),
        'on-surface-variant': v('muted'),
        'surface-container': v('surface-2'),
        'surface-container-low': v('surface-2'),
        'glass-surface': v('surface'),
        'glass-border': v('line'),
        'aurora-cyan': v('accent-soft'),
        'status-error': '#dc2626',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        // Legacy aliases still used by src/ai components
        'headline-md': ['"Playfair Display"', 'Georgia', 'serif'],
        'label-code': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
