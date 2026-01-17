// ABOUTME: Button to start "Just 5 Minutes" commitment on a task.
// ABOUTME: Shows encouraging message on click with themed styling.

import TickSprite from './TickSprite'
import { getFiveMinutesMessage } from '../data/fiveMinutesMessages'
import type { SpicyLevel } from '../data/fiveMinutesMessages'

interface FiveMinutesButtonProps {
  taskId: string
  taskTitle: string
  onStart: (taskId: string) => void
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  disabled?: boolean
}

export default function FiveMinutesButton({
  taskId,
  onStart,
  spicyLevel,
  theme,
  disabled = false,
}: FiveMinutesButtonProps) {
  const isHinged = theme === 'hinged'

  const handleClick = () => {
    if (!disabled) {
      onStart(taskId)
    }
  }

  if (isHinged) {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-hinged-accent hover:text-hinged-accent-hover border border-hinged-border hover:border-hinged-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={getFiveMinutesMessage('starting', spicyLevel)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>5 min</span>
      </button>
    )
  }

  // Unhinged theme
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-mono text-clock-black bg-mint border-2 border-clock-black shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      title={getFiveMinutesMessage('starting', spicyLevel)}
    >
      <span className="text-xs">⏱️</span>
      <span>5 MIN</span>
    </button>
  )
}

interface FiveMinutesPromptProps {
  taskTitle: string
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onConfirm: () => void
  onCancel: () => void
}

export function FiveMinutesPrompt({
  taskTitle,
  spicyLevel,
  theme,
  onConfirm,
  onCancel,
}: FiveMinutesPromptProps) {
  const message = getFiveMinutesMessage('starting', spicyLevel)
  const isHinged = theme === 'hinged'

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression="eager" size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">Just 5 Minutes</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <p className="text-sm text-hinged-text mb-4">
            Task: <span className="font-medium">{taskTitle}</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
            >
              Not now
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              Start 5 minutes
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" onClick={onCancel} />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 -rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression="eager" size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">JUST 5 MINUTES</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <p className="text-sm text-clock-black font-mono mb-4 border-2 border-clock-black bg-clock-ivory p-2">
          <span className="text-clock-brass">TASK:</span> {taskTitle}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            NAH
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            LET'S GO!
          </button>
        </div>
      </div>
    </div>
  )
}
