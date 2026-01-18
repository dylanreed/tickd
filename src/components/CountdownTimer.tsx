// ABOUTME: Visual countdown before starting work.
// ABOUTME: Provides mental runway for task transition.

import { useState, useEffect, useRef } from 'react'
import TickSprite from './TickSprite'

interface CountdownTimerProps {
  isOpen: boolean
  seconds: number // 5, 10, or 30
  theme: 'hinged' | 'unhinged'
  onComplete: () => void
  onCancel: () => void
}

export default function CountdownTimer({
  isOpen,
  seconds,
  theme,
  onComplete,
  onCancel,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const [isComplete, setIsComplete] = useState(false)

  // Use ref for callback to avoid effect re-running on every render
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setRemaining(seconds)
      setIsComplete(false)
    }
  }, [isOpen, seconds])

  // Countdown logic
  useEffect(() => {
    if (!isOpen || isComplete) return

    if (remaining <= 0) {
      setIsComplete(true)
      // Small delay before calling onComplete for dramatic effect
      const timeout = setTimeout(() => {
        onCompleteRef.current()
      }, 500)
      return () => clearTimeout(timeout)
    }

    const interval = setInterval(() => {
      setRemaining(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, remaining, isComplete])

  if (!isOpen) return null

  const isHinged = theme === 'hinged'
  const progress = ((seconds - remaining) / seconds) * 100

  // Get expression based on countdown
  const getExpression = () => {
    if (isComplete) return 'celebrating'
    if (remaining <= 2) return 'eager'
    if (remaining <= seconds / 2) return 'happy'
    return 'idle'
  }

  if (isHinged) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative bg-hinged-card border border-hinged-border rounded-xl shadow-xl p-8 max-w-xs w-full mx-4 text-center">
          <TickSprite expression={getExpression()} size="lg" />

          {/* Countdown number */}
          <div className="my-6">
            <div
              className={`text-7xl font-mono font-bold transition-all duration-300 ${
                isComplete ? 'text-hinged-accent scale-110' : 'text-hinged-text'
              }`}
            >
              {isComplete ? 'GO!' : remaining}
            </div>
          </div>

          {/* Progress ring (simplified as bar) */}
          <div className="h-2 bg-hinged-bg rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-hinged-accent transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!isComplete && (
            <button
              onClick={onCancel}
              className="text-sm text-hinged-text-secondary hover:text-hinged-text transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative bg-cloud border-4 border-clock-black rounded-2xl shadow-[8px_8px_0_0_#1c1917] p-8 max-w-xs w-full mx-4 text-center animate-pulse-slow">
        <TickSprite expression={getExpression()} size="lg" />

        {/* Countdown number */}
        <div className="my-6">
          <div
            className={`font-pixel transition-all duration-300 ${
              isComplete
                ? 'text-hot-pink text-6xl animate-bounce'
                : remaining <= 3
                  ? 'text-hot-pink text-8xl animate-pulse'
                  : 'text-clock-black text-7xl'
            }`}
          >
            {isComplete ? 'GO!' : remaining}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-clock-parchment border-2 border-clock-black overflow-hidden mb-4">
          <div
            className="h-full bg-mint transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!isComplete && (
          <button
            onClick={onCancel}
            className="font-mono text-sm text-clock-brass hover:text-hot-pink transition-colors"
          >
            CANCEL
          </button>
        )}
      </div>
    </div>
  )
}
