// ABOUTME: Calculate visual urgency level from deadline proximity.
// ABOUTME: Used by DeadlineIndicator and TaskCard for color and animation.

import type { DeadlineUrgency } from '../types/timeTools'

/**
 * Calculate urgency level based on hours until deadline
 */
export function getDeadlineUrgency(dueDate: Date, now: Date = new Date()): DeadlineUrgency {
  const hoursRemaining = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 4) return 'critical'
  if (hoursRemaining < 24) return 'high'
  if (hoursRemaining < 72) return 'medium'  // 3 days
  if (hoursRemaining < 168) return 'low'    // 7 days
  return 'none'
}

/**
 * Get CSS classes for hinged mode urgency display
 */
export function getHingedUrgencyClasses(urgency: DeadlineUrgency): string {
  const classes: Record<DeadlineUrgency, string> = {
    none: '',
    low: 'border-l-4 border-l-amber-200',
    medium: 'border-l-4 border-l-amber-400',
    high: 'border-l-4 border-l-orange-500',
    critical: 'border-l-4 border-l-red-500',
    overdue: 'border-l-4 border-l-red-700 bg-red-50',
  }
  return classes[urgency]
}

/**
 * Get CSS classes for unhinged mode urgency display (dramatic)
 */
export function getUnhingedUrgencyClasses(urgency: DeadlineUrgency): string {
  const classes: Record<DeadlineUrgency, string> = {
    none: '',
    low: '',
    medium: 'scale-[1.01] shadow-lg',
    high: 'scale-[1.02] shadow-xl',
    critical: 'scale-[1.03] shadow-2xl animate-pulse',
    overdue: 'scale-[1.05] ring-2 ring-hot-pink animate-pulse',
  }
  return classes[urgency]
}

/**
 * Get text color class for urgency display
 */
export function getUrgencyTextColor(urgency: DeadlineUrgency, isHinged: boolean): string {
  if (isHinged) {
    const colors: Record<DeadlineUrgency, string> = {
      none: 'text-hinged-text-secondary',
      low: 'text-amber-600',
      medium: 'text-amber-700',
      high: 'text-orange-600',
      critical: 'text-red-600',
      overdue: 'text-red-700 font-bold',
    }
    return colors[urgency]
  } else {
    const colors: Record<DeadlineUrgency, string> = {
      none: 'text-dusty-purple',
      low: 'text-peach',
      medium: 'text-coral',
      high: 'text-hot-pink',
      critical: 'text-hot-pink font-bold',
      overdue: 'text-hot-pink font-bold animate-pulse',
    }
    return colors[urgency]
  }
}

/**
 * Format time remaining as human-readable string
 */
export function formatTimeRemaining(dueDate: Date, now: Date = new Date()): string {
  const msRemaining = dueDate.getTime() - now.getTime()

  if (msRemaining < 0) {
    const msOverdue = Math.abs(msRemaining)
    const hoursOverdue = Math.floor(msOverdue / (1000 * 60 * 60))
    const daysOverdue = Math.floor(hoursOverdue / 24)

    if (daysOverdue > 0) {
      return `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`
    }
    if (hoursOverdue > 0) {
      return `${hoursOverdue} hour${hoursOverdue > 1 ? 's' : ''} overdue`
    }
    return 'overdue'
  }

  const minutesRemaining = Math.floor(msRemaining / (1000 * 60))
  const hoursRemaining = Math.floor(minutesRemaining / 60)
  const daysRemaining = Math.floor(hoursRemaining / 24)

  if (daysRemaining > 0) {
    return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`
  }
  if (hoursRemaining > 0) {
    return `${hoursRemaining} hour${hoursRemaining > 1 ? 's' : ''}`
  }
  if (minutesRemaining > 0) {
    return `${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}`
  }
  return 'moments'
}
