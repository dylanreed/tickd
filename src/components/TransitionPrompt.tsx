// ABOUTME: Offers transition help when user seems stuck.
// ABOUTME: Entry point to the transition flow: environment check, ritual, countdown.

import TickSprite from './TickSprite'
import { getTransitionMessage } from '../data/transitionMessages'
import type { SpicyLevel } from '../data/momentumMessages'

interface TransitionPromptProps {
  isOpen: boolean
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  hasRitual: boolean
  onStartFull: () => void // Full flow: environment → ritual → countdown
  onQuickStart: () => void // Just countdown
  onDismiss: () => void
}

export default function TransitionPrompt({
  isOpen,
  spicyLevel,
  theme,
  hasRitual,
  onStartFull,
  onQuickStart,
  onDismiss,
}: TransitionPromptProps) {
  if (!isOpen) return null

  const message = getTransitionMessage('stuck_on_list', spicyLevel)
  const isHinged = theme === 'hinged'

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onDismiss} />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="concerned" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Need Help Starting?</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <div className="space-y-2">
            {hasRitual && (
              <button
                onClick={onStartFull}
                className="w-full px-4 py-3 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors text-left"
              >
                <span className="block font-medium">Start my ritual</span>
                <span className="block text-sm opacity-80">
                  Environment check → Steps → Countdown
                </span>
              </button>
            )}
            <button
              onClick={onQuickStart}
              className="w-full px-4 py-3 border border-hinged-border rounded-md hover:bg-hinged-bg transition-colors text-left"
            >
              <span className="block font-medium text-hinged-text">
                {hasRitual ? 'Quick start' : 'Start countdown'}
              </span>
              <span className="block text-sm text-hinged-text-secondary">
                Just the countdown, no ritual
              </span>
            </button>
            <button
              onClick={onDismiss}
              className="w-full px-4 py-2 text-hinged-text-secondary hover:text-hinged-text text-sm transition-colors"
            >
              I'm fine, just browsing
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" onClick={onDismiss} />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 -rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="concerned" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">NEED HELP?</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <div className="space-y-2">
          {hasRitual && (
            <button
              onClick={onStartFull}
              className="w-full px-4 py-3 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-left"
            >
              <span className="block font-bold">START MY RITUAL</span>
              <span className="block text-xs text-clock-brass">
                ENVIRONMENT → STEPS → COUNTDOWN
              </span>
            </button>
          )}
          <button
            onClick={onQuickStart}
            className="w-full px-4 py-3 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-ivory shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-left"
          >
            <span className="block font-bold">
              {hasRitual ? 'QUICK START' : 'START COUNTDOWN'}
            </span>
            <span className="block text-xs text-clock-brass">
              JUST THE COUNTDOWN
            </span>
          </button>
          <button
            onClick={onDismiss}
            className="w-full px-4 py-2 font-mono text-sm text-clock-brass hover:text-hot-pink transition-colors"
          >
            JUST BROWSING...
          </button>
        </div>
      </div>
    </div>
  )
}
