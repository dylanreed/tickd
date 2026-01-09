// ABOUTME: Tests for notification message content selection.
// ABOUTME: Verifies correct messages returned for tier and theme.

import { describe, it, expect } from 'vitest'
import {
  getBrowserPushContent,
  getEmailSubject,
  getEmailBody,
} from './notificationMessages'

describe('getBrowserPushContent', () => {
  it('returns hinged 4_day message with task title', () => {
    const result = getBrowserPushContent('4_day', 'hinged', 'Buy groceries')
    expect(result.title).toContain('Tick')
    expect(result.body).toContain('Buy groceries')
    expect(result.body).toContain('4 days')
  })

  it('returns unhinged overdue message with caps', () => {
    const result = getBrowserPushContent('overdue', 'unhinged', 'Pay rent')
    expect(result.body.toUpperCase()).toBe(result.body)
  })

  it('returns different messages for same tier (variety)', () => {
    const messages = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const result = getBrowserPushContent('day_of', 'unhinged', 'Task')
      messages.add(result.body)
    }
    expect(messages.size).toBeGreaterThan(1)
  })
})

describe('getEmailSubject', () => {
  it('returns hinged subject without caps', () => {
    const result = getEmailSubject('1_day', 'hinged', 'Submit report')
    expect(result).not.toBe(result.toUpperCase())
    expect(result).toContain('Submit report')
  })

  it('returns unhinged subject with personality', () => {
    const result = getEmailSubject('overdue', 'unhinged', 'Task')
    expect(result.length).toBeGreaterThan(10)
  })
})

describe('getEmailBody', () => {
  it('returns hinged body with professional tone', () => {
    const result = getEmailBody('4_day', 'hinged', 'Complete TPS report')
    expect(result).toContain('Complete TPS report')
    expect(result.length).toBeGreaterThan(20)
  })

  it('returns unhinged body with dramatic personality', () => {
    const result = getEmailBody('overdue', 'unhinged', 'File taxes')
    expect(result).toContain('FILE TAXES')
    expect(result.length).toBeGreaterThan(20)
  })

  it('returns different messages for same tier (variety)', () => {
    const messages = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const result = getEmailBody('1_day', 'unhinged', 'Task')
      messages.add(result)
    }
    expect(messages.size).toBeGreaterThan(1)
  })
})
