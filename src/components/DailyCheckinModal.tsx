// ABOUTME: Modal for daily brain state check-in.
// ABOUTME: Quick selection with Tick commentary and themed styling.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'
import type { BrainState } from '../types/timeTools'
import { BRAIN_STATE_LABELS } from '../types/timeTools'
import { getCheckinGreeting, getCheckinResponse } from '../data/dailyCheckinMessages'
import type { SpicyLevel } from '../data/timeAlertMessages'

interface DailyCheckinModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (brainState: BrainState) => void
  theme: 'hinged' | 'unhinged'
  spicyLevel: SpicyLevel
}

export default function DailyCheckinModal({
  isOpen,
  onClose,
  onSelect,
  theme,
  spicyLevel,
}: DailyCheckinModalProps) {
  const [greeting] = useState(() => getCheckinGreeting(spicyLevel))
  const [selectedState, setSelectedState] = useState<BrainState | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  const isHinged = theme === 'hinged'

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedState(null)
      setResponse(null)
      setIsExiting(false)
    }
  }, [isOpen])

  const handleSelect = (state: BrainState) => {
    setSelectedState(state)
    setResponse(getCheckinResponse(state, spicyLevel))

    // Auto-close after showing response
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onSelect(state)
        onClose()
      }, 300)
    }, 1500)
  }

  if (!isOpen) return null

  const brainStates: BrainState[] = [1, 2, 3, 4, 5]

  // Get Tick expression based on state
  const getExpression = () => {
    if (response) {
      if (selectedState === 1) return 'concerned'
      if (selectedState === 5) return 'celebrating'
      return 'happy'
    }
    return 'eager'
  }

  if (isHinged) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />

        {/* Modal */}
        <div className={`relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-md w-full mx-4 transition-transform duration-300 ${
          isExiting ? 'scale-95' : 'scale-100'
        }`}>
          {/* Header with Tick */}
          <div className="flex items-start gap-4 mb-6">
            <TickSprite expression={getExpression()} size="md" />
            <div className="flex-1">
              <h2 className="text-lg font-medium text-hinged-text mb-1">
                Daily Check-in
              </h2>
              <p className="text-hinged-text-secondary">
                {response || greeting}
              </p>
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

          {/* Brain state options */}
          {!selectedState && (
            <div className="space-y-2">
              {brainStates.map((state) => (
                <button
                  key={state}
                  onClick={() => handleSelect(state)}
                  className="w-full p-3 rounded-lg border border-hinged-border hover:border-hinged-accent hover:bg-hinged-bg transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-4 rounded-sm ${
                            i <= state ? 'bg-hinged-accent' : 'bg-hinged-border'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-hinged-text">
                      {BRAIN_STATE_LABELS[state].hinged}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Selected state confirmation */}
          {selectedState && (
            <div className="text-center py-4">
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-6 rounded-sm transition-colors ${
                      i <= selectedState ? 'bg-hinged-accent' : 'bg-hinged-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-hinged-text-secondary text-sm">
                {BRAIN_STATE_LABELS[selectedState].hinged}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isExiting ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-md w-full mx-4 transition-transform duration-300 ${
        isExiting ? 'scale-95 rotate-1' : 'scale-100 -rotate-1'
      }`}>
        {/* Header with Tick */}
        <div className="flex items-start gap-4 mb-6">
          <TickSprite expression={getExpression()} size="md" />
          <div className="flex-1">
            <h2 className="font-pixel text-sm text-clock-black mb-2">
              BRAIN CHECK
            </h2>
            <p className="text-charcoal font-mono text-sm">
              {response || greeting}
            </p>
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

        {/* Brain state options */}
        {!selectedState && (
          <div className="space-y-3">
            {brainStates.map((state) => {
              const colors = [
                'border-clock-red bg-clock-red/10 hover:bg-clock-red/20',
                'border-peach bg-peach/20 hover:bg-peach/30',
                'border-clock-brass bg-clock-brass/10 hover:bg-clock-brass/20',
                'border-mint bg-mint/20 hover:bg-mint/30',
                'border-hot-pink bg-hot-pink/10 hover:bg-hot-pink/20',
              ]
              return (
                <button
                  key={state}
                  onClick={() => handleSelect(state)}
                  className={`w-full p-3 rounded-lg border-3 transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[3px_3px_0_0_#1c1917] text-left ${colors[state - 1]}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-3 h-5 rounded-sm border-2 border-clock-black ${
                            i <= state ? 'bg-clock-brass' : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-clock-black font-mono text-sm">
                      {BRAIN_STATE_LABELS[state].unhinged}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Selected state confirmation */}
        {selectedState && (
          <div className="text-center py-4">
            <div className="flex justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-8 rounded-sm border-2 border-clock-black transition-all ${
                    i <= selectedState ? 'bg-hot-pink animate-pulse' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
            <p className="text-charcoal font-mono text-sm">
              {BRAIN_STATE_LABELS[selectedState].unhinged}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
