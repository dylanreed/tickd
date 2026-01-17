// ABOUTME: Pre-work environment checklist modal.
// ABOUTME: Helps user prepare their workspace before starting.

import { useState } from 'react'
import TickSprite from './TickSprite'

interface EnvironmentCheckProps {
  isOpen: boolean
  checklist: string[]
  theme: 'hinged' | 'unhinged'
  onComplete: () => void
  onSkip: () => void
}

export default function EnvironmentCheck({
  isOpen,
  checklist,
  theme,
  onComplete,
  onSkip,
}: EnvironmentCheckProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  if (!isOpen) return null

  const allChecked = checkedItems.size >= checklist.length
  const isHinged = theme === 'hinged'

  const toggleItem = (index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleComplete = () => {
    setCheckedItems(new Set())
    onComplete()
  }

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="eager" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Environment Check</h3>
              <p className="text-sm text-hinged-text-secondary">
                Quick setup before you begin.
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {checklist.map((item, index) => (
              <button
                key={index}
                onClick={() => toggleItem(index)}
                className={`w-full text-left p-3 rounded border transition-colors flex items-center gap-3 ${
                  checkedItems.has(index)
                    ? 'border-hinged-accent bg-hinged-accent/10'
                    : 'border-hinged-border hover:border-hinged-accent'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    checkedItems.has(index)
                      ? 'border-hinged-accent bg-hinged-accent'
                      : 'border-hinged-border'
                  }`}
                >
                  {checkedItems.has(index) && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    checkedItems.has(index)
                      ? 'text-hinged-text'
                      : 'text-hinged-text-secondary'
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onSkip}
              className="flex-1 px-4 py-2 text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleComplete}
              disabled={!allChecked}
              className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                allChecked
                  ? 'bg-hinged-accent text-white hover:bg-hinged-accent-hover'
                  : 'bg-hinged-bg text-hinged-text-secondary cursor-not-allowed'
              }`}
            >
              All set!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="eager" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">ENV CHECK</h3>
            <p className="text-sm text-charcoal font-mono">
              QUICK SETUP!
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {checklist.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className={`w-full text-left p-3 font-mono text-sm text-clock-black border-2 border-clock-black shadow-[2px_2px_0_0_#1c1917] transition-all flex items-center gap-3 ${
                checkedItems.has(index)
                  ? 'bg-mint'
                  : 'bg-clock-ivory hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5'
              }`}
            >
              <div
                className={`w-5 h-5 border-2 border-clock-black flex items-center justify-center ${
                  checkedItems.has(index) ? 'bg-clock-black' : 'bg-cloud'
                }`}
              >
                {checkedItems.has(index) && (
                  <span className="text-cloud text-sm font-bold">✓</span>
                )}
              </div>
              <span className={checkedItems.has(index) ? 'line-through' : ''}>
                {item}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-brass hover:text-hot-pink border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            SKIP
          </button>
          <button
            onClick={handleComplete}
            disabled={!allChecked}
            className={`flex-1 px-4 py-2 font-mono text-sm border-2 border-clock-black shadow-[2px_2px_0_0_#1c1917] transition-all ${
              allChecked
                ? 'text-clock-black bg-mint hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5'
                : 'text-clock-brass bg-clock-parchment cursor-not-allowed opacity-50'
            }`}
          >
            ALL SET!
          </button>
        </div>
      </div>
    </div>
  )
}
