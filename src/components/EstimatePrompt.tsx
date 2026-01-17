// ABOUTME: Component for entering time estimates on task creation.
// ABOUTME: Shows quick presets and custom input for estimated duration.

import { useState } from 'react'
import { ESTIMATE_PRESETS } from '../types/timeTools'

interface EstimatePromptProps {
  value: number | null
  onChange: (minutes: number | null) => void
  theme: 'hinged' | 'unhinged'
}

export default function EstimatePrompt({ value, onChange, theme }: EstimatePromptProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const isHinged = theme === 'hinged'

  const handlePresetClick = (minutes: number) => {
    if (value === minutes) {
      onChange(null) // Toggle off if already selected
    } else {
      onChange(minutes)
      setShowCustom(false)
    }
  }

  const handleCustomSubmit = () => {
    const minutes = parseInt(customValue, 10)
    if (!isNaN(minutes) && minutes > 0) {
      onChange(minutes)
      setShowCustom(false)
    }
  }

  const handleSkip = () => {
    onChange(null)
    setShowCustom(false)
    setCustomValue('')
  }

  if (isHinged) {
    return (
      <div className="space-y-2">
        <label className="block text-sm text-hinged-text-secondary">
          How long will this take? (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {ESTIMATE_PRESETS.map(preset => (
            <button
              key={preset.value}
              type="button"
              onClick={() => handlePresetClick(preset.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                value === preset.value
                  ? 'bg-hinged-accent text-white'
                  : 'bg-hinged-card text-hinged-text border border-hinged-border hover:border-hinged-accent'
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustom(!showCustom)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              showCustom
                ? 'bg-hinged-accent text-white'
                : 'bg-hinged-card text-hinged-text border border-hinged-border hover:border-hinged-accent'
            }`}
          >
            Custom
          </button>
        </div>
        {showCustom && (
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Minutes"
              min="1"
              className="w-24 px-3 py-1.5 rounded-md bg-hinged-card text-hinged-text border border-hinged-border focus:border-hinged-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCustomSubmit}
              className="px-3 py-1.5 bg-hinged-accent text-white rounded-md text-sm font-medium hover:bg-hinged-accent-hover"
            >
              Set
            </button>
          </div>
        )}
        {value && (
          <div className="flex items-center gap-2 text-sm text-hinged-text-secondary">
            <span>Estimated: {formatDuration(value)}</span>
            <button
              type="button"
              onClick={handleSkip}
              className="text-hinged-accent hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="space-y-2">
      <label className="block text-sm text-dusty-purple font-mono">
        how long you think? (lol)
      </label>
      <div className="flex flex-wrap gap-2">
        {ESTIMATE_PRESETS.map(preset => (
          <button
            key={preset.value}
            type="button"
            onClick={() => handlePresetClick(preset.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
              value === preset.value
                ? 'bg-mint text-charcoal scale-105'
                : 'bg-lavender text-dusty-purple hover:bg-peach hover:scale-102'
            }`}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
            showCustom
              ? 'bg-hot-pink text-cloud scale-105'
              : 'bg-lavender text-dusty-purple hover:bg-peach hover:scale-102'
          }`}
        >
          idk, custom
        </button>
      </div>
      {showCustom && (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="mins"
            min="1"
            className="w-24 px-3 py-1.5 rounded-full bg-cloud text-charcoal border-2 border-lavender focus:border-mint focus:outline-none text-center font-mono"
          />
          <button
            type="button"
            onClick={handleCustomSubmit}
            className="px-4 py-1.5 bg-mint text-charcoal rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            k
          </button>
        </div>
      )}
      {value && (
        <div className="flex items-center gap-2 text-sm text-dusty-purple font-mono">
          <span>you said: {formatDuration(value)}</span>
          <button
            type="button"
            onClick={handleSkip}
            className="text-hot-pink hover:underline"
          >
            (nvm)
          </button>
        </div>
      )}
    </div>
  )
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  }
  return `${hours}h ${mins}m`
}
