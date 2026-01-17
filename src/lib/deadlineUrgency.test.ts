// ABOUTME: Tests for deadline urgency calculation.
// ABOUTME: Verifies urgency levels and formatting work correctly.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getDeadlineUrgency,
  getHingedUrgencyClasses,
  getUnhingedUrgencyClasses,
  getUrgencyTextColor,
  formatTimeRemaining,
} from './deadlineUrgency'

describe('getDeadlineUrgency', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-17T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns overdue for past deadlines', () => {
    const pastDue = new Date('2026-01-17T11:00:00Z') // 1 hour ago
    expect(getDeadlineUrgency(pastDue)).toBe('overdue')
  })

  it('returns critical for deadlines within 4 hours', () => {
    const soon = new Date('2026-01-17T14:00:00Z') // 2 hours away
    expect(getDeadlineUrgency(soon)).toBe('critical')
  })

  it('returns high for deadlines within 24 hours', () => {
    const tomorrow = new Date('2026-01-18T06:00:00Z') // 18 hours away
    expect(getDeadlineUrgency(tomorrow)).toBe('high')
  })

  it('returns medium for deadlines within 3 days', () => {
    const fewDays = new Date('2026-01-19T12:00:00Z') // 2 days away
    expect(getDeadlineUrgency(fewDays)).toBe('medium')
  })

  it('returns low for deadlines within 7 days', () => {
    const nextWeek = new Date('2026-01-22T12:00:00Z') // 5 days away
    expect(getDeadlineUrgency(nextWeek)).toBe('low')
  })

  it('returns none for deadlines more than 7 days away', () => {
    const farAway = new Date('2026-01-30T12:00:00Z') // 13 days away
    expect(getDeadlineUrgency(farAway)).toBe('none')
  })

  it('handles edge cases at boundaries', () => {
    // Exactly 4 hours - should be critical (less than 4 is critical, at 4 is high)
    const atFourHours = new Date('2026-01-17T16:00:00Z')
    expect(getDeadlineUrgency(atFourHours)).toBe('high')

    // Just under 4 hours
    const underFourHours = new Date('2026-01-17T15:59:00Z')
    expect(getDeadlineUrgency(underFourHours)).toBe('critical')
  })
})

describe('getHingedUrgencyClasses', () => {
  it('returns empty string for none', () => {
    expect(getHingedUrgencyClasses('none')).toBe('')
  })

  it('returns border classes for low', () => {
    expect(getHingedUrgencyClasses('low')).toContain('border-l-amber-200')
  })

  it('returns border and background for overdue', () => {
    const classes = getHingedUrgencyClasses('overdue')
    expect(classes).toContain('border-l-red-700')
    expect(classes).toContain('bg-red-50')
  })
})

describe('getUnhingedUrgencyClasses', () => {
  it('returns empty string for none', () => {
    expect(getUnhingedUrgencyClasses('none')).toBe('')
  })

  it('returns scale and shadow for high', () => {
    const classes = getUnhingedUrgencyClasses('high')
    expect(classes).toContain('scale-[1.02]')
    expect(classes).toContain('shadow-xl')
  })

  it('returns ring and animation for overdue', () => {
    const classes = getUnhingedUrgencyClasses('overdue')
    expect(classes).toContain('ring-2')
    expect(classes).toContain('animate-pulse')
  })
})

describe('getUrgencyTextColor', () => {
  it('returns hinged colors when isHinged is true', () => {
    expect(getUrgencyTextColor('critical', true)).toContain('text-red-600')
  })

  it('returns unhinged colors when isHinged is false', () => {
    expect(getUrgencyTextColor('critical', false)).toContain('text-hot-pink')
  })

  it('adds font-bold for critical and overdue', () => {
    expect(getUrgencyTextColor('overdue', true)).toContain('font-bold')
    expect(getUrgencyTextColor('overdue', false)).toContain('font-bold')
  })
})

describe('formatTimeRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-17T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats overdue days', () => {
    const twoDaysAgo = new Date('2026-01-15T12:00:00Z')
    expect(formatTimeRemaining(twoDaysAgo)).toBe('2 days overdue')
  })

  it('formats overdue hours', () => {
    const fiveHoursAgo = new Date('2026-01-17T07:00:00Z')
    expect(formatTimeRemaining(fiveHoursAgo)).toBe('5 hours overdue')
  })

  it('formats days remaining', () => {
    const threeDaysLater = new Date('2026-01-20T12:00:00Z')
    expect(formatTimeRemaining(threeDaysLater)).toBe('3 days')
  })

  it('formats hours remaining', () => {
    const sixHoursLater = new Date('2026-01-17T18:00:00Z')
    expect(formatTimeRemaining(sixHoursLater)).toBe('6 hours')
  })

  it('formats minutes remaining', () => {
    const thirtyMinutesLater = new Date('2026-01-17T12:30:00Z')
    expect(formatTimeRemaining(thirtyMinutesLater)).toBe('30 minutes')
  })

  it('uses singular for 1 unit', () => {
    const oneHourLater = new Date('2026-01-17T13:00:00Z')
    expect(formatTimeRemaining(oneHourLater)).toBe('1 hour')

    const oneDayLater = new Date('2026-01-18T12:00:00Z')
    expect(formatTimeRemaining(oneDayLater)).toBe('1 day')
  })

  it('returns moments for very short times', () => {
    const almostNow = new Date('2026-01-17T12:00:30Z') // 30 seconds
    expect(formatTimeRemaining(almostNow)).toBe('moments')
  })
})
