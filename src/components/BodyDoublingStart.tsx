// ABOUTME: Entry point for starting a body doubling session.
// ABOUTME: Shows "Work with me?" prompt with intensity selection.

import TickSprite from './TickSprite'
import { getBodyDoublingMessage } from '../data/bodyDoublingMessages'
import type { SpicyLevel } from '../data/momentumMessages'
import type { BodyDoublingIntensity } from '../types/paralysisTools'

interface BodyDoublingStartProps {
  isOpen: boolean
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onStart: (intensity: BodyDoublingIntensity) => void
  onClose: () => void
}

const INTENSITY_LABELS: Record<BodyDoublingIntensity, { title: string; desc: string }> = {
  passive: {
    title: 'Silent company',
    desc: 'Just be there. No interruptions.',
  },
  checkins: {
    title: 'Gentle check-ins',
    desc: 'Occasional "still going?" prompts',
  },
  activity_aware: {
    title: 'Notice pauses',
    desc: 'Check in when you seem stuck',
  },
  coworking: {
    title: 'Full coworking',
    desc: 'Active presence with celebrations',
  },
}

export default function BodyDoublingStart({
  isOpen,
  spicyLevel,
  theme,
  onStart,
  onClose,
}: BodyDoublingStartProps) {
  if (!isOpen) return null

  const message = getBodyDoublingMessage('session_start', spicyLevel)
  const isHinged = theme === 'hinged'

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="eager" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Work Together?</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              Choose your vibe
            </p>
            {(Object.entries(INTENSITY_LABELS) as [BodyDoublingIntensity, { title: string; desc: string }][]).map(
              ([intensity, { title, desc }]) => (
                <button
                  key={intensity}
                  onClick={() => onStart(intensity)}
                  className="w-full text-left p-3 rounded border border-hinged-border hover:border-hinged-accent hover:bg-hinged-bg transition-colors"
                >
                  <span className="text-sm font-medium text-hinged-text">
                    {title}
                  </span>
                  <span className="block text-xs text-hinged-text-secondary mt-0.5">
                    {desc}
                  </span>
                </button>
              )
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-hinged-text-secondary hover:text-hinged-text text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" onClick={onClose} />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="eager" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">WORK BUDDY?</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-xs font-pixel text-clock-brass uppercase">
            PICK YOUR VIBE
          </p>
          {(Object.entries(INTENSITY_LABELS) as [BodyDoublingIntensity, { title: string; desc: string }][]).map(
            ([intensity, { title, desc }]) => (
              <button
                key={intensity}
                onClick={() => onStart(intensity)}
                className="w-full text-left p-3 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-ivory shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <span className="font-bold">{title.toUpperCase()}</span>
                <span className="block text-xs text-clock-brass mt-0.5">
                  {desc}
                </span>
              </button>
            )
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 font-mono text-sm text-clock-brass hover:text-hot-pink transition-colors"
        >
          MAYBE LATER...
        </button>
      </div>
    </div>
  )
}
