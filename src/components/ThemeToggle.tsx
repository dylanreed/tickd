// ABOUTME: Toggle button for switching between hinged and unhinged themes.
// ABOUTME: The fun alternative to boring light/dark mode.

interface ThemeToggleProps {
  theme: 'hinged' | 'unhinged'
  onToggle: (theme: 'hinged' | 'unhinged') => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const handleToggle = () => {
    onToggle(theme === 'hinged' ? 'unhinged' : 'hinged')
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-colors ${
        theme === 'hinged'
          ? 'border-mint bg-mint/20 hover:bg-mint/40'
          : 'border-hot-pink bg-hot-pink/20 hover:bg-hot-pink/40'
      }`}
      title={`Switch to ${theme === 'hinged' ? 'unhinged' : 'hinged'} mode`}
    >
      <span className="text-sm">{theme === 'hinged' ? '😌' : '🤪'}</span>
      <span className="text-sm font-bold text-charcoal">{theme === 'hinged' ? 'Hinged' : 'Unhinged'}</span>
    </button>
  )
}
