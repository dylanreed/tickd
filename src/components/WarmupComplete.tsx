// ABOUTME: Modal shown when warmup streak is complete.
// ABOUTME: Celebrates progress and prompts to tackle target task.

import TickSprite from './TickSprite'
import { getMomentumMessage } from '../data/momentumMessages'
import type { SpicyLevel } from '../data/momentumMessages'

interface WarmupCompleteProps {
  isOpen: boolean
  completedCount: number
  targetTaskTitle: string
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onGoToTarget: () => void
  onDone: () => void
}

export default function WarmupComplete({
  isOpen,
  completedCount,
  targetTaskTitle,
  spicyLevel,
  theme,
  onGoToTarget,
  onDone,
}: WarmupCompleteProps) {
  if (!isOpen) return null

  const message = getMomentumMessage('warmup_complete', spicyLevel)
  const isHinged = theme === 'hinged'

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 animate-bounce-in">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="celebrating" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Warmed Up!</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-3xl font-mono text-hinged-accent mb-1">
              {completedCount}
            </div>
            <div className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              Quick wins completed
            </div>
          </div>

          <div className="text-sm text-hinged-text-secondary mb-4 p-2 bg-hinged-bg rounded text-center">
            <span className="font-medium">Ready for:</span> {targetTaskTitle}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onDone}
              className="flex-1 px-4 py-2 text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
            >
              Maybe later
            </button>
            <button
              onClick={onGoToTarget}
              className="flex-1 px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              Let's do it!
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
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 animate-bounce-in rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="celebrating" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">WARMED UP!</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl font-pixel text-hot-pink animate-pulse mb-1">
            {completedCount}
          </div>
          <div className="text-xs font-pixel text-clock-brass uppercase">
            QUICK WINS CRUSHED
          </div>
        </div>

        <div className="text-sm font-mono text-clock-black mb-4 p-2 bg-clock-ivory border-2 border-clock-black text-center">
          <span className="text-clock-brass">TIME FOR:</span> {targetTaskTitle}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDone}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            LATER...
          </button>
          <button
            onClick={onGoToTarget}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            ATTACK!
          </button>
        </div>
      </div>
    </div>
  )
}
