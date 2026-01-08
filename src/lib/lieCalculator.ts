// ABOUTME: The core lying algorithm for fake due dates.
// ABOUTME: Calculates how much to lie based on time remaining and user reliability.

const HOURS_IN_DAY = 24
const MS_IN_HOUR = 1000 * 60 * 60
const MS_IN_DAY = MS_IN_HOUR * HOURS_IN_DAY

export function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number): Date {
  const now = Date.now()
  const realDueMs = realDueDate.getTime()
  const msRemaining = realDueMs - now
  const daysRemaining = msRemaining / MS_IN_DAY

  // Reliability affects how much we lie (0-100)
  // Lower reliability = more aggressive lying
  const lieMultiplier = 1 - (reliabilityScore / 100) // 0 to 1

  let fakeDueMs: number

  if (daysRemaining > 7) {
    // More than 7 days: tell the truth
    fakeDueMs = realDueMs
  } else if (daysRemaining > 4) {
    // 4-7 days: shave off 0.5-1.5 days (scales with lie multiplier)
    // At 50% reliability (lieMultiplier=0.5), shave exactly 1 day
    const shaveMs = MS_IN_DAY * (0.5 + lieMultiplier) // 0.5 to 1.5 days
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 2) {
    // 2-4 days: shave off 30-50% of remaining time
    const shavePercent = 0.3 + (lieMultiplier * 0.2) // 30% to 50%
    const shaveMs = msRemaining * shavePercent
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 1) {
    // 1-2 days: "tomorrow" - show as due within 12-18 hours
    const targetHours = 12 + (reliabilityScore / 100) * 6 // 12-18 hours based on reliability
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else if (daysRemaining > 0) {
    // Less than 1 day: panic mode - show as due in 1-6 hours
    const targetHours = 1 + (reliabilityScore / 100) * 5 // 1-6 hours based on reliability
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else {
    // Already past due
    fakeDueMs = realDueMs
  }

  // Never return a date in the past (unless actually overdue)
  if (fakeDueMs < now && realDueMs > now) {
    fakeDueMs = now + MS_IN_HOUR // Show as due in 1 hour minimum
  }

  return new Date(fakeDueMs)
}

export function formatTimeRemaining(dueDate: Date): string {
  const now = Date.now()
  const dueMs = dueDate.getTime()
  const msRemaining = dueMs - now

  if (msRemaining < 0) {
    return 'overdue'
  }

  const hoursRemaining = Math.floor(msRemaining / MS_IN_HOUR)

  if (hoursRemaining < 24) {
    return `${hoursRemaining} hours`
  }

  const daysRemaining = Math.floor(hoursRemaining / HOURS_IN_DAY)
  return `${daysRemaining} days`
}

export function getUrgencyLevel(fakeDueDate: Date): 'low' | 'medium' | 'high' | 'critical' | 'overdue' {
  const now = Date.now()
  const msRemaining = fakeDueDate.getTime() - now
  const hoursRemaining = msRemaining / MS_IN_HOUR

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 6) return 'critical'
  if (hoursRemaining < 24) return 'high'
  if (hoursRemaining < 72) return 'medium'
  return 'low'
}
