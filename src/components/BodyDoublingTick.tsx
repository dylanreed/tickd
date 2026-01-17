// ABOUTME: Animated Tick for body doubling sessions.
// ABOUTME: Simulates active co-working presence with varied expressions.

import { useState, useEffect } from 'react'
import TickSprite from './TickSprite'
import type { TickExpression } from './TickSprite'
import type { BodyDoublingIntensity } from '../types/paralysisTools'

interface BodyDoublingTickProps {
  intensity: BodyDoublingIntensity
  isPaused: boolean
  isActive: boolean
}

// Different expressions based on activity state
const WORKING_EXPRESSIONS: TickExpression[] = ['happy', 'eager', 'relaxed', 'smug']
const IDLE_EXPRESSIONS: TickExpression[] = ['idle', 'relaxed', 'happy']
const PAUSED_EXPRESSIONS: TickExpression[] = ['concerned', 'suspicious', 'confused']

// How often to change expression based on intensity
const EXPRESSION_INTERVALS: Record<BodyDoublingIntensity, number> = {
  passive: 30000, // 30 seconds
  checkins: 15000, // 15 seconds
  activity_aware: 10000, // 10 seconds
  coworking: 8000, // 8 seconds
}

export default function BodyDoublingTick({
  intensity,
  isPaused,
  isActive,
}: BodyDoublingTickProps) {
  const [expression, setExpression] = useState<TickExpression>('happy')

  // Cycle through expressions
  useEffect(() => {
    if (!isActive) return

    const interval = EXPRESSION_INTERVALS[intensity]

    const cycleExpression = () => {
      if (isPaused) {
        // Pick from paused expressions
        const randomIndex = Math.floor(Math.random() * PAUSED_EXPRESSIONS.length)
        setExpression(PAUSED_EXPRESSIONS[randomIndex])
      } else {
        // Pick from working expressions
        const expressions = intensity === 'passive' ? IDLE_EXPRESSIONS : WORKING_EXPRESSIONS
        const randomIndex = Math.floor(Math.random() * expressions.length)
        setExpression(expressions[randomIndex])
      }
    }

    // Initial expression
    cycleExpression()

    // Set up interval
    const intervalId = setInterval(cycleExpression, interval)
    return () => clearInterval(intervalId)
  }, [isActive, isPaused, intensity])

  if (!isActive) return null

  return (
    <div className="transition-all duration-300">
      <TickSprite expression={expression} size="lg" />
    </div>
  )
}
