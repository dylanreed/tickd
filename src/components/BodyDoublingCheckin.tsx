// ABOUTME: Check-in toast during body doubling sessions.
// ABOUTME: Periodic prompts asking if user is still working.

import TickSprite from './TickSprite'
import { getBodyDoublingMessage } from '../data/bodyDoublingMessages'
import type { SpicyLevel } from '../data/momentumMessages'

interface BodyDoublingCheckinProps {
  isOpen: boolean
  isPauseTriggered: boolean
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onDismiss: () => void
  onEndSession: () => void
}

export default function BodyDoublingCheckin({
  isOpen,
  isPauseTriggered,
  spicyLevel,
  theme,
  onDismiss,
  onEndSession,
}: BodyDoublingCheckinProps) {
  if (!isOpen) return null

  const message = isPauseTriggered
    ? getBodyDoublingMessage('pause_detected', spicyLevel)
    : getBodyDoublingMessage('encouragement', spicyLevel)

  const isHinged = theme === 'hinged'

  if (isHinged) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
        <div className="bg-hinged-card border border-hinged-border rounded-lg shadow-lg p-4">
          <div className="flex items-start gap-3">
            <TickSprite
              expression={isPauseTriggered ? 'concerned' : 'happy'}
              size="sm"
            />
            <div className="flex-1">
              <p className="text-sm text-hinged-text">{message}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={onDismiss}
                  className="flex-1 px-3 py-1.5 text-sm bg-hinged-accent text-white rounded hover:bg-hinged-accent-hover transition-colors"
                >
                  {isPauseTriggered ? "I'm back!" : 'Still going!'}
                </button>
                <button
                  onClick={onEndSession}
                  className="px-3 py-1.5 text-sm text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded transition-colors"
                >
                  End session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-clock-ivory border-3 border-clock-black shadow-[4px_4px_0_0_#1c1917] p-4 -rotate-1">
        <div className="flex items-start gap-3">
          <TickSprite
            expression={isPauseTriggered ? 'concerned' : 'happy'}
            size="sm"
          />
          <div className="flex-1">
            <p className="text-sm font-mono text-clock-black">{message}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={onDismiss}
                className="flex-1 px-3 py-1.5 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {isPauseTriggered ? "BACK!" : 'GOING!'}
              </button>
              <button
                onClick={onEndSession}
                className="px-3 py-1.5 font-mono text-sm text-clock-brass hover:text-hot-pink border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
