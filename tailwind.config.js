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
        // Primary palette
        'lavender': '#C4B7EB',
        'peach': '#FFCDB2',
        'mint': '#B8E0D2',
        'cloud': '#FFF8F0',
        // Accent colors
        'hot-pink': '#FF5E8A',
        'coral': '#FF7F6B',
        'golden': '#FFD166',
        // Text colors
        'charcoal': '#3D3D3D',
        'dusty-purple': '#6B5B7A',
        'warm-gray': '#9E9494',
        // Tick colors
        'tick-body': '#8B6B4F',
        'tick-face': '#F5F0E1',
        'tick-nose': '#6B4423',
        'tick-cheeks': '#E8A0A0',
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

