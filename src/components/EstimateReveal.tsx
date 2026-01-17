// ABOUTME: Component showing estimate vs actual time on task completion.
// ABOUTME: Displays comparison with appropriate Tick commentary.

import { getEstimateContext, getEstimationMessage } from '../data/estimationMessages'
import type { SpicyLevel } from '../data/estimationMessages'
import TickSprite, { type TickExpression } from './TickSprite'

interface EstimateRevealProps {
  estimatedMinutes: number
  actualMinutes: number
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
}

export default function EstimateReveal({
  estimatedMinutes,
  actualMinutes,
  spicyLevel,
  theme,
}: EstimateRevealProps) {
  const isHinged = theme === 'hinged'
  const context = getEstimateContext(estimatedMinutes, actualMinutes)
  const message = getEstimationMessage(context, spicyLevel)

  const ratio = actualMinutes / estimatedMinutes
  const percentDiff = Math.round((ratio - 1) * 100)
  const isOver = percentDiff > 0
  const isSpotOn = Math.abs(percentDiff) <= 10

  // Determine Tick expression based on result
  const getExpression = (): TickExpression => {
    if (isSpotOn) return 'celebrating'
    if (context === 'way_under') return 'shocked'
    if (context === 'under') return 'happy'
    if (context === 'over_3x') return 'judgmental'
    if (context === 'over_2x') return 'suspicious'
    return 'idle'
  }

  if (isHinged) {
    return (
      <div className="border-t border-hinged-border pt-4 mt-4">
        <div className="flex items-start gap-3">
          <TickSprite expression={getExpression()} size="sm" />
          <div className="flex-1">
            <h4 className="font-medium text-hinged-text mb-2">Time Estimate Check</h4>

            <div className="flex gap-4 mb-3 text-sm">
              <div>
                <span className="text-hinged-text-secondary">Estimated:</span>{' '}
                <span className="font-medium text-hinged-text">{formatDuration(estimatedMinutes)}</span>
              </div>
              <div>
                <span className="text-hinged-text-secondary">Actual:</span>{' '}
                <span className="font-medium text-hinged-text">{formatDuration(actualMinutes)}</span>
              </div>
            </div>

            {!isSpotOn && (
              <div className={`text-sm font-medium mb-2 ${
                isOver ? 'text-orange-600' : 'text-green-600'
              }`}>
                {isOver ? `${percentDiff}% over estimate` : `${Math.abs(percentDiff)}% faster`}
              </div>
            )}

            <p className="text-sm text-hinged-text-secondary italic">
              "{message}"
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="border-t-4 border-lavender pt-4 mt-4">
      <div className="flex items-start gap-3">
        <TickSprite expression={getExpression()} size="sm" />
        <div className="flex-1">
          <h4 className="font-pixel text-xs text-charcoal mb-2">TIME CHECK</h4>

          <div className="flex gap-4 mb-3 text-sm font-mono">
            <div>
              <span className="text-dusty-purple">thought:</span>{' '}
              <span className="font-bold text-charcoal">{formatDuration(estimatedMinutes)}</span>
            </div>
            <div>
              <span className="text-dusty-purple">reality:</span>{' '}
              <span className="font-bold text-charcoal">{formatDuration(actualMinutes)}</span>
            </div>
          </div>

          {!isSpotOn && (
            <div className={`text-sm font-bold mb-2 ${
              isOver ? 'text-hot-pink' : 'text-mint'
            }`}>
              {isOver
                ? `${percentDiff}% OVER (classic)`
                : `${Math.abs(percentDiff)}% FASTER (wow)`}
            </div>
          )}

          {isSpotOn && (
            <div className="text-sm font-bold text-mint mb-2 animate-pulse">
              SPOT ON?! WHO ARE YOU?!
            </div>
          )}

          <div className="bg-lavender/30 rounded-lg p-3">
            <p className="text-sm text-charcoal font-mono">
              "{message}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) {
    return `${hours}h`
  }
  return `${hours}h ${mins}m`
}
