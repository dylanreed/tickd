// ABOUTME: Modal shown at phase transitions in "Just 5 Minutes" sessions.
// ABOUTME: Offers clean exit or continuation with Tick commentary.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'
import type { FiveMinutePhase } from '../types/paralysisTools'
import { getFiveMinutesMessage } from '../data/fiveMinutesMessages'
import type { SpicyLevel } from '../data/fiveMinutesMessages'

interface FiveMinutesCheckpointProps {
  isOpen: boolean
  phase: FiveMinutePhase
  elapsedMinutes: number
  spicyLevel: SpicyLevel
  theme: 'hinged' | 'unhinged'
  onContinue: () => void
  onStop: () => void
}

export default function FiveMinutesCheckpoint({
  isOpen,
  phase,
  elapsedMinutes,
  spicyLevel,
  theme,
  onContinue,
  onStop,
}: FiveMinutesCheckpointProps) {
  const [message, setMessage] = useState('')
  const isHinged = theme === 'hinged'

  useEffect(() => {
    if (isOpen) {
      // Get appropriate message based on phase
      let context: 'first_five_complete' | 'ten_min_soft_push' | 'fifteen_min_continuation' = 'first_five_complete'
      if (phase === 'five_to_ten') {
        context = 'first_five_complete'
      } else if (phase === 'ten_to_fifteen') {
        context = 'ten_min_soft_push'
      } else if (phase === 'flow_state') {
        context = 'fifteen_min_continuation'
      }
      setMessage(getFiveMinutesMessage(context, spicyLevel))
    }
  }, [isOpen, phase, spicyLevel])

  if (!isOpen) return null

  // Get Tick expression based on phase and spiciness
  const getExpression = () => {
    if (phase === 'five_to_ten') return 'celebrating'
    if (phase === 'ten_to_fifteen') return 'happy'
    return 'eager'
  }

  // Phase-specific copy
  const getPhaseTitle = () => {
    switch (phase) {
      case 'five_to_ten':
        return isHinged ? '5 Minutes Complete!' : '5 MINUTES DONE!'
      case 'ten_to_fifteen':
        return isHinged ? '10 Minutes!' : '10 MINUTES!'
      case 'flow_state':
        return isHinged ? '15 Minutes!' : '15 MINUTES!'
      default:
        return isHinged ? 'Checkpoint' : 'CHECKPOINT'
    }
  }

  const getStopButtonText = () => {
    if (phase === 'five_to_ten') {
      return isHinged ? "I'm done" : "I'M DONE"
    }
    return isHinged ? 'Stop here' : 'STOP'
  }

  const getContinueButtonText = () => {
    return isHinged ? 'Keep going' : 'KEEP GOING!'
  }

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 animate-bounce-in">
          <div className="flex items-start gap-4 mb-4">
            <TickSprite expression={getExpression()} size="md" />
            <div className="flex-1">
              <h3 className="font-medium text-hinged-text mb-1">{getPhaseTitle()}</h3>
              <p className="text-sm text-hinged-text-secondary">{message}</p>
            </div>
          </div>

          <div className="text-center text-2xl font-mono text-hinged-text mb-4">
            {elapsedMinutes} minutes
          </div>

          <div className="flex gap-3">
            <button
              onClick={onStop}
              className="flex-1 px-4 py-2 text-hinged-text-secondary hover:text-hinged-text border border-hinged-border rounded-md transition-colors"
            >
              {getStopButtonText()}
            </button>
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2 bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover transition-colors"
            >
              {getContinueButtonText()}
            </button>
          </div>

          {phase === 'five_to_ten' && (
            <p className="text-xs text-hinged-text-secondary text-center mt-3">
              You kept your promise. Stopping is valid!
            </p>
          )}
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-6 max-w-sm w-full mx-4 animate-bounce-in -rotate-1">
        <div className="flex items-start gap-4 mb-4">
          <TickSprite expression={getExpression()} size="md" />
          <div className="flex-1">
            <h3 className="font-pixel text-sm text-clock-black mb-2">{getPhaseTitle()}</h3>
            <p className="text-sm text-charcoal font-mono">{message}</p>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl font-pixel text-hot-pink animate-pulse">
            {elapsedMinutes}
          </div>
          <div className="text-xs font-pixel text-clock-brass">MINUTES</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onStop}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-clock-parchment shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {getStopButtonText()}
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-2 font-mono text-sm text-clock-black border-2 border-clock-black bg-mint shadow-[2px_2px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            {getContinueButtonText()}
          </button>
        </div>

        {phase === 'five_to_ten' && (
          <p className="text-xs font-mono text-clock-brass text-center mt-3">
            PROMISE KEPT. STOPPING = WIN!
          </p>
        )}
      </div>
    </div>
  )
}
