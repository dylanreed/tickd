// ABOUTME: Tests for the lie calculation algorithm.
// ABOUTME: Verifies fake due dates are calculated correctly based on real dates and reliability.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calculateFakeDueDate, formatTimeRemaining } from './lieCalculator'

describe('calculateFakeDueDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-08T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns real date when more than 7 days away', () => {
    const realDue = new Date('2026-01-20T12:00:00Z') // 12 days away
    const result = calculateFakeDueDate(realDue, 50)
    expect(result.toISOString()).toBe(realDue.toISOString())
  })

  it('shaves off 1 day when 4-7 days away', () => {
    const realDue = new Date('2026-01-13T12:00:00Z') // 5 days away
    const result = calculateFakeDueDate(realDue, 50)
    const expected = new Date('2026-01-12T12:00:00Z') // 4 days away (1 day shaved)
    expect(result.toISOString()).toBe(expected.toISOString())
  })

  it('shaves off 30-50% when 2-4 days away', () => {
    const realDue = new Date('2026-01-11T12:00:00Z') // 3 days away
    const result = calculateFakeDueDate(realDue, 50)
    // At 50% reliability, shave ~40% of 3 days = ~1.2 days
    // Fake should show ~1.8 days away
    const daysUntilFake = (result.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    expect(daysUntilFake).toBeGreaterThan(1.5)
    expect(daysUntilFake).toBeLessThan(2.5)
  })

  it('shows tomorrow when 1-2 real days away', () => {
    const realDue = new Date('2026-01-09T18:00:00Z') // ~1.25 days away
    const result = calculateFakeDueDate(realDue, 50)
    // Should show as due very soon (within ~18 hours or so)
    const hoursUntilFake = (result.getTime() - Date.now()) / (1000 * 60 * 60)
    expect(hoursUntilFake).toBeLessThan(24)
  })

  it('lies more aggressively with lower reliability score', () => {
    const realDue = new Date('2026-01-13T12:00:00Z') // 5 days away
    const highReliability = calculateFakeDueDate(realDue, 80)
    const lowReliability = calculateFakeDueDate(realDue, 20)
    expect(lowReliability.getTime()).toBeLessThan(highReliability.getTime())
  })

  it('never returns a date in the past', () => {
    const realDue = new Date('2026-01-09T12:00:00Z') // 1 day away
    const result = calculateFakeDueDate(realDue, 10) // Very unreliable
    expect(result.getTime()).toBeGreaterThanOrEqual(Date.now())
  })
})

describe('formatTimeRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-08T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows days for dates more than 24 hours away', () => {
    const date = new Date('2026-01-11T12:00:00Z') // 3 days away
    expect(formatTimeRemaining(date)).toBe('3 days')
  })

  it('shows hours for dates less than 24 hours away', () => {
    const date = new Date('2026-01-09T06:00:00Z') // 18 hours away
    expect(formatTimeRemaining(date)).toBe('18 hours')
  })

  it('shows overdue for past dates', () => {
    const date = new Date('2026-01-07T12:00:00Z') // 1 day ago
    expect(formatTimeRemaining(date)).toBe('overdue')
  })
})
