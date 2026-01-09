// ABOUTME: TailwindCSS configuration file.
// ABOUTME: Configures content paths for class purging and theme extensions.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette (Neutral theme - see src/data/palettes.ts for all themes)
        'lavender': '#F7F5F3',      // Main background (warm off-white)
        'peach': '#EDE9E4',         // Secondary background
        'mint': '#B8E0D2',          // Success/positive accent
        'cloud': '#FFFFFF',         // Card background
        // Accent colors
        'hot-pink': '#E85D4C',      // Primary accent (matches Tick's red)
        'coral': '#D14B3A',         // Accent hover state
        'golden': '#FFD166',        // Warning/medium accent
        // Text colors
        'charcoal': '#3D3D3D',      // Primary text
        'dusty-purple': '#6B6B6B',  // Secondary text
        'warm-gray': '#9E9E9E',     // Muted text
        // Tick colors (kept for reference)
        'tick-body': '#818FAA',
        'tick-face': '#FEFCF8',
        'tick-accent': '#FD6D64',
        'tick-details': '#2E3C56',
        'tick-outline': '#00001E',
        // Hinged mode (standard UI) colors
        'hinged-bg': '#F9FAFB',
        'hinged-card': '#FFFFFF',
        'hinged-border': '#E5E7EB',
        'hinged-text': '#111827',
        'hinged-text-secondary': '#6B7280',
        'hinged-accent': '#10B981',
        'hinged-accent-hover': '#059669',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'body': ['Nunito', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-in': 'bounceIn 0.3s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

