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
        'hinged-accent': '#FD6D64',
        'hinged-accent-hover': '#E85D4C',
        // Pixel O'Clock palette (landing page)
        'clock-black': '#1c1917',       // Clock hands, authoritative
        'clock-ivory': '#faf7f2',       // Aged clock face
        'clock-parchment': '#f5f0e8',   // Warm background
        'clock-red': '#FD6D64',         // Matches Tick's accent color
        'clock-brass': '#ca8a04',       // Bell patina
        'clock-dark': '#292524',        // Deep stone
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'body': ['Nunito', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-in': 'bounceIn 0.3s ease-out',
        'tick-in': 'tickIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'tick-shake': 'tickShake 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'clock-hand': 'clockHand 2s ease-in-out infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        tickIn: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        tickShake: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        clockHand: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
      },
    },
  },
  plugins: [],
}

