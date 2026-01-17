// ABOUTME: Active timer display for "Just 5 Minutes" sessions.
// ABOUTME: Shows elapsed time, phase progress, and controls.

import type { FiveMinutePhase } from '../types/paralysisTools'

interface FiveMinutesTimerProps {
  elapsedMs: number
  phase: FiveMinutePhase
  isPaused: boolean
  taskTitle: string
  theme: 'hinged' | 'unhinged'
  onPause: () => void
  onResume: () => void
  onStop: () => void
}

export default function FiveMinutesTimer({
  elapsedMs,
  phase,
  isPaused,
  taskTitle,
  theme,
  onPause,
  onResume,
  onStop,
}: FiveMinutesTimerProps) {
  const isHinged = theme === 'hinged'

  // Format time as MM:SS
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  // Progress within current 5-minute window
  const phaseMinutes = minutes % 5
  const progressPercent = ((phaseMinutes * 60 + seconds) / 300) * 100

  // Phase labels
  const phaseLabels: Record<FiveMinutePhase, { hinged: string; unhinged: string }> = {
    first_five: { hinged: 'First 5 minutes', unhinged: 'FIRST 5' },
    five_to_ten: { hinged: 'Building momentum', unhinged: 'ROLLING!' },
    ten_to_fifteen: { hinged: 'Great progress', unhinged: 'ON FIRE!' },
    flow_state: { hinged: 'Flow state', unhinged: 'UNSTOPPABLE!' },
  }

  if (isHinged) {
    return (
      <div className="bg-hinged-card border border-hinged-border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-hinged-text-secondary uppercase tracking-wide">
              {phaseLabels[phase].hinged}
            </div>
            <div className="text-3xl font-mono text-hinged-text">
              {timeDisplay}
            </div>
          </div>
          <div className="flex gap-2">
            {isPaused ? (
              <button
                onClick={onResume}
                className="p-2 text-hinged-accent hover:bg-hinged-bg rounded-md transition-colors"
                aria-label="Resume"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onPause}
                className="p-2 text-hinged-text-secondary hover:text-hinged-text hover:bg-hinged-bg rounded-md transition-colors"
                aria-label="Pause"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            )}
            <button
              onClick={onStop}
              className="p-2 text-hinged-text-secondary hover:text-clock-red hover:bg-hinged-bg rounded-md transition-colors"
              aria-label="Stop"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-hinged-bg rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-hinged-accent transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-xs text-hinged-text-secondary truncate">
          {taskTitle}
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="bg-clock-ivory border-3 border-clock-black p-4 shadow-[4px_4px_0_0_#1c1917]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs font-pixel text-clock-brass uppercase">
            {phaseLabels[phase].unhinged}
          </div>
          <div className="text-4xl font-pixel text-clock-black">
            {timeDisplay}
          </div>
        </div>
        <div className="flex gap-2">
          {isPaused ? (
            <button
              onClick={onResume}
              className="p-2 border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              aria-label="Resume"
            >
              <svg className="w-5 h-5 text-clock-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onPause}
              className="p-2 border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              aria-label="Pause"
            >
              <svg className="w-5 h-5 text-clock-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          )}
          <button
            onClick={onStop}
            className="p-2 border-2 border-clock-black bg-clock-red shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            aria-label="Stop"
          >
            <svg className="w-5 h-5 text-clock-ivory" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-clock-parchment border-2 border-clock-black overflow-hidden mb-2">
        <div
          className={`h-full transition-all duration-1000 ${
            phase === 'flow_state' ? 'bg-hot-pink animate-pulse' : 'bg-clock-brass'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="text-xs font-mono text-clock-black truncate">
        {taskTitle}
      </div>
    </div>
  )
}
