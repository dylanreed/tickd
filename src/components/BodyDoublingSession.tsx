// ABOUTME: Active body doubling session overlay.
// ABOUTME: Shows Tick presence and session controls.

import { useState } from 'react'
import BodyDoublingTick from './BodyDoublingTick'
import BodyDoublingCheckin from './BodyDoublingCheckin'
import { getBodyDoublingMessage } from '../data/bodyDoublingMessages'
import type { SpicyLevel } from '../data/momentumMessages'
import type { BodyDoublingIntensity } from '../types/paralysisTools'

interface SessionSummary {
  durationSeconds: number
  tasksTouched: number
  pausesDetected: number
  checkinsDismissed: number
}

interface BodyDoublingSessionProps {
  isActive: boolean
  intensity: BodyDoublingIntensity
  isPaused: boolean
  showCheckin: boolean
  durationSeconds: number
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onDismissCheckin: () => void
  onEndSession: () => SessionSummary | null
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

const INTENSITY_NAMES: Record<BodyDoublingIntensity, string> = {
  passive: 'Silent',
  checkins: 'Check-ins',
  activity_aware: 'Aware',
  coworking: 'Coworking',
}

export default function BodyDoublingSession({
  isActive,
  intensity,
  isPaused,
  showCheckin,
  durationSeconds,
  spicyLevel,
  theme,
  onDismissCheckin,
  onEndSession,
}: BodyDoublingSessionProps) {
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState<SessionSummary | null>(null)

  const handleEndSession = () => {
    const sessionSummary = onEndSession()
    if (sessionSummary) {
      setSummary(sessionSummary)
      setShowSummary(true)
    }
  }

  const closeSummary = () => {
    setShowSummary(false)
    setSummary(null)
  }

  const isHinged = theme === 'hinged'

  // Session summary modal
  if (showSummary && summary) {
    const summaryMessage = getBodyDoublingMessage('session_end', spicyLevel)

    if (isHinged) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <div className="text-center mb-4">
              <BodyDoublingTick intensity={intensity} isPaused={false} isActive={true} />
              <h3 className="font-medium text-hinged-text mt-3 mb-2">Session Complete!</h3>
              <p className="text-sm text-hinged-text-secondary">{summaryMessage}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-hinged-bg rounded-lg">
                <div className="text-2xl font-mono text-hinged-accent">
                  {formatDuration(summary.durationSeconds)}
                </div>
                <div className="text-xs text-hinged-text-secondary uppercase">Duration</div>
              </div>
              <div className="text-center p-3 bg-hinged-bg rounded-lg">
                <div className="text-2xl font-mono text-hinged-accent">
                  {summary.tasksTouched}
                </div>
                <div className="text-xs text-hinged-text-secondary uppercase">Tasks</div>
              </div>
            </div>

            {summary.pausesDetected > 0 && (
              <p className="text-xs text-hinged-text-secondary text-center mb-4">
                {summary.pausesDetected} pause{summary.pausesDetected !== 1 ? 's' : ''} detected — totally normal!
              </p>
            )}

            <button
              onClick={closeSummary}
              className="w-full px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )
    }

    // Unhinged summary
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 animate-bounce-in rotate-1">
          <div className="text-center mb-4">
            <BodyDoublingTick intensity={intensity} isPaused={false} isActive={true} />
            <h3 className="font-pixel text-sm text-clock-black mt-3 mb-2">SESSION COMPLETE!</h3>
            <p className="text-sm text-charcoal font-mono">{summaryMessage}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-clock-ivory border-2 border-clock-black">
              <div className="text-2xl font-pixel text-hot-pink animate-pulse">
                {formatDuration(summary.durationSeconds)}
              </div>
              <div className="text-xs font-pixel text-clock-brass uppercase">DURATION</div>
            </div>
            <div className="text-center p-3 bg-clock-ivory border-2 border-clock-black">
              <div className="text-2xl font-pixel text-mint">
                {summary.tasksTouched}
              </div>
              <div className="text-xs font-pixel text-clock-brass uppercase">TASKS</div>
            </div>
          </div>

          {summary.pausesDetected > 0 && (
            <p className="text-xs font-mono text-clock-brass text-center mb-4">
              {summary.pausesDetected} PAUSE{summary.pausesDetected !== 1 ? 'S' : ''} — BRAINS DO THAT!
            </p>
          )}

          <button
            onClick={closeSummary}
            className="w-full px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            DONE!
          </button>
        </div>
      </div>
    )
  }

  if (!isActive) return null

  // Active session indicator
  if (isHinged) {
    return (
      <>
        {/* Floating indicator */}
        <div className="fixed bottom-4 left-4 z-40">
          <div className="bg-hinged-card border border-hinged-border rounded-full shadow-lg px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8">
              <BodyDoublingTick intensity={intensity} isPaused={isPaused} isActive={true} />
            </div>
            <div className="text-sm">
              <span className="text-hinged-text font-medium">
                {formatDuration(durationSeconds)}
              </span>
              <span className="text-hinged-text-secondary ml-2">
                {INTENSITY_NAMES[intensity]}
              </span>
            </div>
            <button
              onClick={handleEndSession}
              className="ml-2 text-hinged-text-secondary hover:text-hinged-text text-xs"
            >
              End
            </button>
          </div>
        </div>

        {/* Check-in overlay */}
        <BodyDoublingCheckin
          isOpen={showCheckin}
          isPauseTriggered={isPaused}
          spicyLevel={spicyLevel}
          theme={theme}
          onDismiss={onDismissCheckin}
          onEndSession={handleEndSession}
        />
      </>
    )
  }

  // Unhinged active session
  return (
    <>
      {/* Floating indicator */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-clock-ivory border-3 border-clock-black shadow-[4px_4px_0_0_#1c1917] px-4 py-2 flex items-center gap-3 -rotate-1">
          <div className="w-8 h-8">
            <BodyDoublingTick intensity={intensity} isPaused={isPaused} isActive={true} />
          </div>
          <div>
            <span className="font-pixel text-hot-pink text-sm">
              {formatDuration(durationSeconds)}
            </span>
            <span className="font-mono text-clock-brass text-xs ml-2">
              {INTENSITY_NAMES[intensity].toUpperCase()}
            </span>
          </div>
          <button
            onClick={handleEndSession}
            className="ml-2 font-mono text-xs text-dusty-purple hover:text-hot-pink"
          >
            END
          </button>
        </div>
      </div>

      {/* Check-in overlay */}
      <BodyDoublingCheckin
        isOpen={showCheckin}
        isPauseTriggered={isPaused}
        spicyLevel={spicyLevel}
        theme={theme}
        onDismiss={onDismissCheckin}
        onEndSession={handleEndSession}
      />
    </>
  )
}
