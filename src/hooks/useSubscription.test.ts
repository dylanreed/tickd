// ABOUTME: Tests for useSubscription hook.
// ABOUTME: Verifies subscription status checks and lock behavior.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSubscription } from './useSubscription'

const mockProfile = {
  id: 'user-123',
  email: 'test@example.com',
  reliability_score: 75,
  theme: 'hinged' as const,
  notification_preferences: 'none' as const,
  subscription_status: 'trialing' as const,
  trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  stripe_customer_id: null,
  subscription_id: null,
}

vi.mock('./useProfile', () => ({
  useProfile: vi.fn(() => ({
    profile: mockProfile,
    loading: false,
  })),
}))

import { useProfile } from './useProfile'
const mockUseProfile = useProfile as ReturnType<typeof vi.fn>

describe('useSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseProfile.mockReturnValue({ profile: mockProfile, loading: false })
  })

  it('returns not locked when trialing with time remaining', () => {
    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(false)
    expect(result.current.status).toBe('trialing')
    expect(result.current.isTrialing).toBe(true)
  })

  it('returns locked when trial has expired', () => {
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'trialing',
        trial_ends_at: new Date(Date.now() - 1000).toISOString(), // expired
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(true)
    expect(result.current.isTrialing).toBe(false)
  })

  it('returns not locked when subscription is active', () => {
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'active',
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(false)
    expect(result.current.status).toBe('active')
    expect(result.current.isTrialing).toBe(false)
  })

  it('returns locked when subscription is canceled', () => {
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'canceled',
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(true)
    expect(result.current.status).toBe('canceled')
  })

  it('returns locked when subscription is expired', () => {
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'expired',
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(true)
    expect(result.current.status).toBe('expired')
  })

  it('returns not locked when subscription is past_due (grace period)', () => {
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'past_due',
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.isLocked).toBe(false)
    expect(result.current.status).toBe('past_due')
  })

  it('calculates days remaining in trial', () => {
    const trialEndsAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    mockUseProfile.mockReturnValue({
      profile: {
        ...mockProfile,
        subscription_status: 'trialing',
        trial_ends_at: trialEndsAt.toISOString(),
      },
      loading: false,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.trialDaysRemaining).toBe(3)
  })

  it('returns loading state from profile', () => {
    mockUseProfile.mockReturnValue({
      profile: null,
      loading: true,
    })

    const { result } = renderHook(() => useSubscription())

    expect(result.current.loading).toBe(true)
    expect(result.current.isLocked).toBe(false) // not locked while loading
  })
})
