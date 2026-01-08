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
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
      title={`Switch to ${theme === 'hinged' ? 'unhinged' : 'hinged'} mode`}
    >
      <span className="text-sm">{theme === 'hinged' ? '😌' : '🤪'}</span>
      <span className="text-sm font-medium text-gray-700">{theme === 'hinged' ? 'Hinged' : 'Unhinged'}</span>
    </button>
  )
}
