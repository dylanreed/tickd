// ABOUTME: Offers warmup mode when user is stuck on a big task.
// ABOUTME: Shows "Want to warm up first?" prompt with task context.

import TickSprite from './TickSprite'
import { getMomentumMessage } from '../data/momentumMessages'
import type { SpicyLevel } from '../data/momentumMessages'

interface WarmupOfferProps {
  isOpen: boolean
  taskTitle: string
  quickWinCount: number
  streakSize: number
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onAccept: () => void
  onDecline: () => void
}

export default function WarmupOffer({
  isOpen,
  taskTitle,
  quickWinCount,
  streakSize,
  spicyLevel,
  theme,
  onAccept,
  onDecline,
}: WarmupOfferProps) {
  if (!isOpen) return null

  const message = getMomentumMessage('warmup_offer', spicyLevel)
  const isHinged = theme === 'hinged'
  const actualStreakSize = Math.min(streakSize, quickWinCount)

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onDecline} />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="concerned" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Warm Up First?</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <div className="text-sm text-hinged-text-secondary mb-4 p-2 bg-hinged-bg rounded">
            <span className="font-medium">Big task:</span> {taskTitle}
          </div>

          {actualStreakSize > 0 ? (
            <p className="text-sm text-hinged-text mb-4">
              Complete {actualStreakSize} quick win{actualStreakSize !== 1 ? 's' : ''} to build momentum, then tackle the big one.
            </p>
          ) : (
            <p className="text-sm text-hinged-text-secondary mb-4">
              No quick wins available right now.
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="flex-1 px-4 py-2 text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
            >
              Just start it
            </button>
            {actualStreakSize > 0 && (
              <button
                onClick={onAccept}
                className="flex-1 px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
              >
                Warm up first
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" onClick={onDecline} />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 -rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="concerned" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">WARM UP?</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <div className="text-sm font-mono text-clock-black mb-4 p-2 bg-clock-ivory border-2 border-clock-black">
          <span className="text-clock-brass">BIG TASK:</span> {taskTitle}
        </div>

        {actualStreakSize > 0 ? (
          <p className="text-sm font-mono text-charcoal mb-4">
            KNOCK OUT {actualStreakSize} QUICK WIN{actualStreakSize !== 1 ? 'S' : ''} FIRST!
          </p>
        ) : (
          <p className="text-sm font-mono text-clock-brass mb-4">
            NO QUICK WINS AVAILABLE...
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            NAH, START IT
          </button>
          {actualStreakSize > 0 && (
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              WARM UP!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
