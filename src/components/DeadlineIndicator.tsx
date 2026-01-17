// ABOUTME: Visual countdown display that changes with urgency.
// ABOUTME: Shows relative time with escalating drama in unhinged mode.

import { useState, useEffect } from 'react'
import {
  getDeadlineUrgency,
  getUrgencyTextColor,
  formatTimeRemaining,
} from '../lib/deadlineUrgency'
import type { DeadlineUrgency } from '../types/timeTools'

interface DeadlineIndicatorProps {
  dueDate: Date
  theme: 'hinged' | 'unhinged'
  compact?: boolean
}

export default function DeadlineIndicator({
  dueDate,
  theme,
  compact = false,
}: DeadlineIndicatorProps) {
  const [now, setNow] = useState(new Date())
  const isHinged = theme === 'hinged'

  // Update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const urgency = getDeadlineUrgency(dueDate, now)
  const timeRemaining = formatTimeRemaining(dueDate, now)
  const textColor = getUrgencyTextColor(urgency, isHinged)

  // Get icon/indicator based on urgency
  const getIndicator = (): string => {
    if (urgency === 'overdue') return isHinged ? '!' : '🔥'
    if (urgency === 'critical') return isHinged ? '!!' : '⚡'
    if (urgency === 'high') return isHinged ? '!' : '⏰'
    return ''
  }

  if (compact) {
    return (
      <span className={`text-xs ${textColor}`}>
        {getIndicator()} {timeRemaining}
      </span>
    )
  }

  if (isHinged) {
    return (
      <div className={`flex items-center gap-1 text-sm ${textColor}`}>
        <ClockIcon urgency={urgency} />
        <span>
          {urgency === 'overdue' ? 'Overdue' : `Due in ${timeRemaining}`}
        </span>
      </div>
    )
  }

  // Unhinged theme
  return (
    <div className={`flex items-center gap-1 text-sm font-mono ${textColor}`}>
      <span>
        {urgency === 'overdue' && '🔥 OVERDUE 🔥'}
        {urgency === 'critical' && `⚡ ${timeRemaining} ⚡`}
        {urgency === 'high' && `⏰ ${timeRemaining}`}
        {urgency === 'medium' && timeRemaining}
        {urgency === 'low' && timeRemaining}
        {urgency === 'none' && timeRemaining}
      </span>
    </div>
  )
}

// Simple clock icon that changes based on urgency
function ClockIcon({ urgency }: { urgency: DeadlineUrgency }) {
  const fill = urgency === 'overdue' || urgency === 'critical' ? 'currentColor' : 'none'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill={fill}
      stroke="currentColor"
      strokeWidth={fill === 'none' ? 2 : 0}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  )
}
