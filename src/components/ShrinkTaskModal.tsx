// ABOUTME: Modal for breaking tasks into micro-steps.
// ABOUTME: Shows suggestions and accepts user input for first tiny step.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'
import { getShrinkingMessage, getSuggestedMicroSteps } from '../data/taskShrinkingMessages'
import type { SpicyLevel } from '../data/taskShrinkingMessages'

interface ShrinkTaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  onSubmit: (microStep: string) => void
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
}

export default function ShrinkTaskModal({
  isOpen,
  onClose,
  taskTitle,
  onSubmit,
  spicyLevel,
  theme,
}: ShrinkTaskModalProps) {
  const [customStep, setCustomStep] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const isHinged = theme === 'hinged'

  useEffect(() => {
    if (isOpen) {
      setSuggestions(getSuggestedMicroSteps(taskTitle))
      setMessage(getShrinkingMessage('initial_prompt', spicyLevel))
      setCustomStep('')
    }
  }, [isOpen, taskTitle, spicyLevel])

  const handleSuggestionClick = (suggestion: string) => {
    onSubmit(suggestion)
    onClose()
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customStep.trim()) {
      onSubmit(customStep.trim())
      onClose()
    }
  }

  if (!isOpen) return null

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
          {/* Header with Tick */}
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="concerned" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Shrink This Task</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-hinged-text-secondary hover:text-hinged-text"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Task title */}
          <div className="text-sm text-hinged-text-secondary mb-4 p-2 bg-hinged-bg rounded">
            <span className="font-medium">Task:</span> {taskTitle}
          </div>

          {/* Suggestions */}
          <div className="mb-4">
            <p className="text-xs text-hinged-text-secondary uppercase tracking-wide mb-2">
              Quick suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-sm text-hinged-text border border-hinged-border rounded-full hover:border-hinged-accent hover:bg-hinged-bg transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Custom input */}
          <form onSubmit={handleCustomSubmit}>
            <label className="text-xs text-hinged-text-secondary uppercase tracking-wide mb-2 block">
              Or type your own
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customStep}
                onChange={(e) => setCustomStep(e.target.value)}
                placeholder="What's the tiniest first step?"
                className="flex-1 px-3 py-2 text-sm bg-hinged-bg border border-hinged-border rounded-md text-hinged-text placeholder:text-hinged-text-secondary focus:outline-none focus:ring-2 focus:ring-hinged-accent"
              />
              <button
                type="submit"
                disabled={!customStep.trim()}
                className="px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" onClick={onClose} />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-md w-full mx-4 -rotate-1">
        {/* Header with Tick */}
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="concerned" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">SHRINK IT!</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-dusty-purple hover:text-hot-pink transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Task title */}
        <div className="text-sm font-mono text-clock-black mb-4 p-2 bg-clock-ivory border-2 border-clock-black">
          <span className="text-clock-brass">TASK:</span> {taskTitle}
        </div>

        {/* Suggestions */}
        <div className="mb-4">
          <p className="text-xs font-pixel text-clock-brass uppercase mb-2">
            QUICK PICKS
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-sm font-mono text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Custom input */}
        <form onSubmit={handleCustomSubmit}>
          <label className="text-xs font-pixel text-clock-brass uppercase mb-2 block">
            OR YOUR OWN
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customStep}
              onChange={(e) => setCustomStep(e.target.value)}
              placeholder="Tiniest step..."
              className="flex-1 px-3 py-2 text-sm font-mono bg-clock-ivory border-2 border-clock-black text-clock-black placeholder:text-clock-brass/60 focus:outline-none focus:ring-2 focus:ring-hot-pink"
            />
            <button
              type="submit"
              disabled={!customStep.trim()}
              className="px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              GO!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
